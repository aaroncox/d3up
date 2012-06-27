$(function() {
	function statLabel(k,v) {
		return $("<li/>").html($("<span class='stat-helper'/>").html(k + ": ")).append(v);
	}
	$(".gear-change").click(function() {
		var itemType = $(this).data('item-type'),
				itemDisplay = $("#equipped-" + itemType);
		$.ajax({
			url: '/item/fetch/type/' + itemType,
			cache: false,
			dataType: 'json',
			success: function(data) {
				var gearSelect = $("#available-gear"),
						gearDialog = $("#gear-change");
				// Clear out the List to avoid confusion
				gearSelect.html("");
				// Add a "Nothing" option
				gearSelect.append("<option value=''>Nothing</option>");
				// Loop through all the JSON we recieved and append them as options
				$.each(data, function(k,v) {
					var item = $.parseJSON(v), 
							option = $("<option/>");
					option.attr("value", k);
					option.attr("data-json", v);
					option.html(item.name);
					option.bindTooltip();
					gearSelect.append(option);
				});
				gearDialog.dialog({
					width: 800,
					modal: true,
					buttons: {
						Equip: function() {	
							var dialog = $(this);
							$.ajax({
								data: {
									a: 'equip',
									slot: itemType,
									newItem: gearSelect.val()
								}, 
								success: function(data) {
									if(gearSelect.val() != "") {
										var itemLink = $("<a/>"),
												itemSelected = gearSelect.find(":selected"),
												itemData = $.parseJSON(itemSelected.attr("data-json"));
										itemLink.attr("href", "/i/" + gearSelect.val());
										itemLink.attr("data-json", JSON.stringify(itemData));
										itemLink.addClass("quality-" + itemData.quality);
										itemLink.html(itemData.name);
										itemLink.bindTooltip();
										itemDisplay.html(itemLink);
									} else {
										itemDisplay.html("Nothing");
									}
									dialog.dialog( "close" );		
									calc();							
								}
							});
						},
						Cancel: function() {
							$(this).dialog( "close" );
						}
					}
				});
			}			
		});
	});
	function calc() {
		// Gather ALL stats from all gear
		var stats = [],
				attrs = [],
				attackSpeedIncs = [],
				tabOffense = $("#stats-offense"),
				tabDefense = $("#stats-defense"),
				tabBase = $("#stats-base"),
				tabLife = $("#stats-life"),
				tabMisc = $("#stats-misc"),
				heroClass = $("#character").data("class");
		$(".equipped a").each(function() {
			if($(this).attr("data-json")) {
				var data = $(this).data("json");
				if(data.attrs) {
					$.each(data.attrs, function(k,v) {
						switch(k) {
							case "armor":
								if(data.type == 'ring' || data.type == 'amulet') {
									if(attrs[k]) {
										attrs[k] += parseFloat(v);
									} else {
										attrs[k] = parseFloat(v);
									}
								}
								break;
							case "attack-speed":
								switch(data.type) {
									case "shield":
									case "belt":
									case "boots":
									case "bracers":
									case "chest-armor":
									case "cloak":
									case "gloves":
									case "helm":
									case "pants":
									case "mighty-belt":
									case "shoulder":
									case "spirit-stone":
									case "voodoo-mask":
									case "wizard-hat":
									case "ring":
									case "amulet":
										attackSpeedIncs.push(v/100);
										break;
									default:
										break;
								}
								break;
								default: 
									if(attrs[k]) {
										attrs[k] += parseFloat(v);
									} else {
										attrs[k] = parseFloat(v);
									}
									break;
						}
					});					
				}
				if(data.socketAttrs) {
					$.each(data.socketAttrs, function(k,v) {
						if(attrs[k]) {
							attrs[k] += parseFloat(v);
						} else {
							attrs[k] = parseFloat(v);
						}
					});
				}
				if(data.stats) {
					$.each(data.stats, function(k,v) {
						switch(k) {
							case "damage":
								// console/
								stats[k] = {
									min: v['min'],
									max: v['max']
								};
								break;
							case "block-amount":
								stats[k] = v['min'] + "-" + v['max'];
								break;
							default:
								if(stats[k]) {
									stats[k] += parseFloat(v);
								} else {
									stats[k] = parseFloat(v);
								}					
								break;
						}
					});					
				}
			}
		});
		// Lets start with Base Stats
		tabBase.empty();
		// Add in Level 60 Base Stats
		// 187 in primary stat
    // 67 in secondary stats
    // 127 in vitality
		var primaryAttr = 0;
		switch(heroClass) {
			case "wizard":
			case "witch-doctor":
				attrs['strength'] += 67;
				attrs['dexterity'] += 67;
				attrs['intelligence'] += 187;
				primaryAttr = attrs['intelligence'];
				break;
			case "barbarian":
				attrs['strength'] += 187;
				attrs['dexterity'] += 67;
				attrs['intelligence'] += 67;
				primaryAttr = attrs['strength'];
				break;
			case "demon-hunter":
			case "monk":
				attrs['strength'] += 67;
				attrs['dexterity'] += 187;
				attrs['intelligence'] += 67;
				primaryAttr = attrs['dexterity'];
				break;
		}
		// Grant base vitality to all classes
		attrs['vitality'] += 127;
		// Base Statistics
		tabBase.append(statLabel("Strength", attrs['strength']));
		tabBase.append(statLabel("Dexterity", attrs['dexterity']));
		tabBase.append(statLabel("Intelligence", attrs['intelligence']));
		tabBase.append(statLabel("Vitality", attrs['vitality']));
		// Life Statistics 
		var mathLife = 36 + 4 * 60 + (60 - 25) * attrs['vitality'],
		 		mathLifePlus = (attrs['plus-life']) ? attrs['plus-life'] : 0,
				mathLifeTotal = Math.round(mathLife + (mathLife * (mathLifePlus * 0.01)));
		tabLife.empty();
		tabLife.append(statLabel("Maximum Life", mathLifeTotal));
		tabLife.append(statLabel("Total Life Bonus", mathLifePlus + "%"));
		tabLife.append(statLabel("Life per Second", (attrs['life-regen']) ? attrs['life-regen'] : 0));
		tabLife.append(statLabel("Life Steal", (attrs['life-steal']) ? attrs['life-steal'] : 0 + "%"));
		tabLife.append(statLabel("Life per Kill", (attrs['life-kill']) ? attrs['life-kill'] : 0));
		tabLife.append(statLabel("Life per Hit", (attrs['life-hit']) ? attrs['life-hit'] : 0));
		tabLife.append(statLabel("Health Globe Healing Bonus", (attrs['health-globes']) ? attrs['health-globes'] : 0));
		tabLife.append(statLabel("Bonus to Gold/Globe Radius", (attrs['plus-pickup-radius']) ? attrs['plus-pickup-radius'] : 0));
		
		// Defensive Statistics
		tabDefense.empty();
		var mathArmor = stats['armor'] + attrs['strength'] + ((attrs['armor']) ? attrs['armor'] : 0),
				mathReduction = mathArmor / (50 * 60 + mathArmor),
				mathAllResist = Math.round(attrs['resist-all'] + (attrs['intelligence'] / 10)),
				mathResists = {
					'physical': (mathAllResist + ((attrs['physical-resist']) ? attrs['physical-resist'] : 0)),
					'cold': (mathAllResist + ((attrs['cold-resist']) ? attrs['cold-resist'] : 0)),
					'fire': (mathAllResist + ((attrs['fire-resist']) ? attrs['fire-resist'] : 0)),
					'lightning': (mathAllResist + ((attrs['lightning-resist']) ? attrs['lightning-resist'] : 0)),
					'poison': (mathAllResist + ((attrs['poison-resist']) ? attrs['poison-resist'] : 0)),
					'arcane': (mathAllResist + ((attrs['arcane-resist']) ? attrs['arcane-resist'] : 0))					
				},
				mathResistsPercents = {
					'physical': 	Math.round((mathResists.physical / (5 * 60 + mathResists.physical) * 100) * 100)/100,
					'cold': 			Math.round((mathResists.cold / (5 * 60 + mathResists.cold) * 100) * 100)/100,
					'fire': 			Math.round((mathResists.fire / (5 * 60 + mathResists.fire) * 100) * 100)/100,
					'lightning': 	Math.round((mathResists.lightning / (5 * 60 + mathResists.lightning) * 100) * 100)/100,
					'poison': 		Math.round((mathResists.poison / (5 * 60 + mathResists.poison) * 100) * 100)/100,
					'arcane': 		Math.round((mathResists.arcane / (5 * 60 + mathResists.arcane) * 100) * 100)/100
				}
		tabDefense.append(statLabel("Armor", mathArmor));
		tabDefense.append(statLabel("Block Amount", (stats['block-amount']) ? stats['block-amount'] : '~'));		
		tabDefense.append(statLabel("Block Chance", (stats['block-chance']) ? stats['block-chance'] : 0 + '%'));
		// Calculate Dodge
		var mathDodge = attrs['dexterity'],
				mathDodgePercent = 0,
				mathDodgeBrackets = [[100,0.100], [500,0.025], [1000,	0.020], [8000,0.010]];
		if(mathDodge > 0) {
			$.each(mathDodgeBrackets, function(k,v){
				if(mathDodge > v[0]) {
					mathDodge -= v[0];
					mathDodgePercent += v[0] * v[1];
				} else {
					mathDodgePercent += mathDodge * v[1]; 
					mathDodge = 0;
				}
			});
		}
		tabDefense.append(statLabel("Dodge Chance", (Math.round(mathDodgePercent*10)/10)));
		tabDefense.append(statLabel("Damage Reduction", Math.round(mathReduction * 100 * 100)/100));
		tabDefense.append(statLabel("Physical Resistance", mathResists['physical'] + " (" + mathResistsPercents['physical']+ "%)"));
		tabDefense.append(statLabel("Cold Resistance", mathResists['cold'] + " (" + mathResistsPercents['cold']+ "%)"));
		tabDefense.append(statLabel("Fire Resistance", mathResists['fire'] + " (" + mathResistsPercents['fire']+ "%)"));
		tabDefense.append(statLabel("Lightning Resistance", mathResists['lightning'] + " (" + mathResistsPercents['lightning']+ "%)"));
		tabDefense.append(statLabel("Poison Resistance", mathResists['poison'] + " (" + mathResistsPercents['poison']+ "%)"));
		tabDefense.append(statLabel("Arcane/Holy Resistance", mathResists['arcane'] + " (" + mathResistsPercents['arcane']+ "%)"));
		tabDefense.append(statLabel("Crowd Control Reduction", attrs['cc-reduce'] + "%"));
		tabDefense.append(statLabel("Missile Damage Reduction", attrs['range-reduce'] + "%"));
		tabDefense.append(statLabel("Melee Damage Reduction", attrs['melee-reduce'] + "%"));
		tabDefense.append(statLabel("Thorns", attrs['thorns']));
		// Offensive Statistics
		tabOffense.empty();
		var mathSpeed = stats['speed'],
				mathSpeedAdditive = 1,
				mathDamage = stats['damage'],
				mathDamageAvg = stats['dps'],
				mathDamageAdd = 0,
				mathDps = 0,
				mathCriticalHit = attrs['critical-hit'] + 5,
				mathCriticalHitDamage = attrs['critical-hit-damage'] + 50;
		if(attrs['max-damage'] && attrs['min-damage']) {
			mathDamageAdd = (attrs['max-damage'] + attrs['min-damage']) / 2;
		}
		// Calculate the Attack Speed (Additive)
		$.each(attackSpeedIncs, function(k,v) {
			mathSpeedAdditive += v;
		}); 
		mathSpeed = Math.round(mathSpeed * mathSpeedAdditive * 100)/100;
		// Calculate the DPS
		var preCrit = mathDamageAvg * mathSpeed * (attrs['intelligence'] / 100);
		var critAddition = (preCrit * 1.74) * 0.325;
		mathDps = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * stats['speed']) * mathSpeedAdditive * (primaryAttr / 100 + 1) * 1 * ((mathCriticalHit / 100) * (mathCriticalHitDamage/100)+ 1);
		mathDps = Math.round(mathDps * 100) / 100;
		// (Average Weapon Damage + Non-Weapon Damage Bonuses) x Non-Weapon Attack Speed Modifier x Primary Damage Stat Modifier x Passive Skill Damage Bonus Modifier x Active Skill Damage Bonus Modifier x (Critical Damage Bonus x Critical Chance + 1)
		tabOffense.append(statLabel("DPS", mathDps));
		tabOffense.append("((" + mathDamage.min + "+" + mathDamage.max + ")" + "/ 2 + " + mathDamageAdd + ") * " + stats['speed'] + ") * " + mathSpeedAdditive + ") * " + "(" + primaryAttr + "/ 100 + 1) * 1 * ((" + mathCriticalHit + "/ 100) * (" + mathCriticalHitDamage + "/100)+ 1)");
		tabOffense.append(statLabel("Attacks per Second", mathSpeed));
		tabOffense.append(statLabel("Critical Hit Chance", mathCriticalHit + '%'));
		tabOffense.append(statLabel("Critical Hit Damage", mathCriticalHitDamage + '%'));
	}
	calc();
	$("#character").tabs();
	// $(".calc-stats").tabs();
});
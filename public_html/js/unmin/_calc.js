if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [],
            k;
        for (k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                keys.push(k);
            }
        }
        return keys;
    };
}
var stats = [],
		gearJSON = {},				
		tabOffense = $("#stats-offense"),
		tabDefense = $("#stats-defense"),
		tabBase = $("#stats-base"),
		tabLife = $("#stats-life"),
		tabMisc = $("#stats-misc"),
		tabEHP = $("#stats-ehp"),
		tabEHPGear = ("#stats-ehp-gear"),
		selectVs = $("#vsLevel"),
		heroClass = $("#character").data("class"),
		isOwner = $("#character").data("owner");
			
var skillDisplay = $("#skill-display"),
		activeSelect = $("#actives"),
		activeDisplay = $("#active-display"),
		passiveSelect = $("#passives"),
		passiveDisplay = $("#passive-display");
if(activeSkills && activeSkills[heroClass]) {
	$.each(window.activeSkills[heroClass], function(k,v) {
		var selected = '';
		if(typeof activeActives != "undefined") {
			$.each(activeActives, function(key,active) {
				if(k == active) {
					selected = 'selected="selected"';
				}
			}); 			
		}		
		activeSelect.append($("<option value='"+k+"' "+selected+"/>").html(v.name));			
	});
};
if(passives && passives[heroClass]) {
	$.each(passives[heroClass], function(k,v) {
		var selected = '';
		if(typeof activePassives != "undefined") {
			$.each(activePassives, function(key,active) {
				if(k == active) {
					selected = 'selected="selected"';
				}
			}); 			
		}
		passiveSelect.append($("<option value='"+k+"' "+selected+"/>").html(k.replace(/\-/g," ").capitalize()));			
	});		
};
activeSelect.chosen({
	placeholder: 'Which skills/abilities do you use?',
	allowClear: true
});
passiveSelect.chosen({
	placeholder: 'Which passives skills are you using?',
	allowClear: true
});
activeSelect.bind('change', function() {
	var skills = ($(this).val()) ? $(this).val() : [];
	if(!skills || activeActives.length != skills.length) {
		if(isOwner && skills.length <= 6) {
			$.ajax({
				data: {
					a: 'active-skills',
					actives: skills
				}
			});							
		}
	}
	activeDisplay.empty();
	$.each(skills, function(k,v) {
		skillDisplay.show();
		if(k >= 6) {
			return false;
		}
		var skill = activeSkills[heroClass][v],
				cleaned = v.split("~"),
				icon = "/images/icons/" + heroClass + "-" + cleaned[0] + ".png";
				img = $("<img/>").attr("src", icon);
		img.attr('data-name', skill.name);
		img.attr('title', skill.name);
		if(skill.rune) {
			img.attr('data-tooltip', skill.desc.replace(/  /, "<br/><br/>") + "<br/><br/>" + skill.rune);
		} else { 
			img.attr('data-tooltip', skill.desc);
		}
		activeDisplay.append($("<li/>").html(img));			
		return false;
	});
});
passiveSelect.bind('change', function() {
	var skills = ($(this).val()) ? $(this).val() : [];
	if(!skills || activePassives.length != skills.length) {
		if(isOwner && skills.length <= 3) {
			$.ajax({
				data: {
					a: 'passive-skills',
					passives: skills
				}
			});							
		}
	}
	passiveDisplay.empty();
	$.each(skills, function(k,v) {
		skillDisplay.show();
		var skill = passives[heroClass][v],
				icon = "/images/icons/" + heroClass + "-" + v + ".png";
				img = $("<img/>").attr("src", icon);
		img.attr('data-name', v.replace(/\-/g," ").capitalize());
		img.attr('title', v.replace(/\-/g," ").capitalize());
		img.attr('data-tooltip', skill.desc);
		passiveDisplay.append($("<li/>").html(img));
	});
	calc(".equipped a");
});
activeSelect.trigger('change');
passiveSelect.trigger('change');
selectVs.bind('change', function() {
	calc(".equipped a");
});
function statLabel(k,v,format,math) {
	stats[k] = v;
	switch(format) {
		case "per":
			if(v) {
				v = v + "%";					
			} else {
				v = "0%";
			}
			break;
		case "round":
			v = Math.round(v * 100) / 100;
		default:
			break;
	}
	var cleaned = k.replace(/\s+/g, '-').toLowerCase();
	if(v) {
		v = v.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");			
	}
	var data = $("<li/>").addClass('stat-' + cleaned).html($("<span class='stat-helper'/>").html(k + ": ")).append(v);
	if(math) {
		data.append(" (" + math + "%)");
	}
	return data;
}
if(isOwner) {
	$(".gear-change").click(function() {
		var itemType = $(this).data('item-type'),
				itemDisplay = $("#equipped-" + itemType);
		if(itemType == 'offhand') {
			var mh = $("#equipped-mainhand a").data("json");
			switch(mh.type) {
				case '2h-mace': 
				case '2h-axe': 
				case 'daibo': 
				case '2h-mighty': 
				case 'polearm': 
				case 'staff': 
				case '2h-sword':
					$($("<div style='padding: 20px'/>").html("<p>You're currently wearing a two handed weapon, an offhand isn't allowed.")).dialog({
						modal: true,
						buttons: {
							Ok: function() {
								$( this ).dialog( "close" );
							}
						}
					});
					return false;
					break;
			}
		}
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
									newItem: gearSelect.val(),
									stats: {
										dps: stats['DPS'],
										ehp: stats['EHP']
									}
								}, 
								success: function(data) {
									if(gearSelect.val() != "") {
										var itemLink = $("<a/>"),
												itemSelected = gearSelect.find(":selected"),
												itemData = $.parseJSON(itemSelected.attr("data-json"));
										// Unequip offhand if we're equipping a 2h weapon
										switch(itemData.type) {
											case '2h-mace': 
											case '2h-axe': 
											case 'daibo': 
											case '2h-mighty': 
											case 'polearm': 
											case 'staff': 
											case '2h-sword':
												$("#equipped-offhand").html("Nothing");
												break;
										}
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
									calc(".equipped a");							
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
		return false;
	});		
}
function calc(target, passiveSkills) {
	// ----------------------------------
	// Global Calc Varaibles
	// ----------------------------------
	var stats = [],
			attrs = [],
			attackSpeedIncs = [],
			isDuelWielding = false;
	// If we don't have a hero class, search the target... (used on items page)
	if(!heroClass) {
		// This sucks
		heroClass = $(target).parent().parent().parent().data('class');
		// console.log(heroClass, target);
	}
	// ----------------------------------
	// Loop through equipped gear and gather all statistics from JSON
	// ----------------------------------				
	$(target).each(function() {
		if($(this).attr("data-json")) {
			var data = $(this).data("json"),
					slot = $(this).parent().data("slot");		
			gearJSON[slot] = data;						
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
						case "plus-block":
							if(data.type != 'shield') {
								if(attrs[k]) {
									attrs[k] += parseFloat(v);
								} else {
									attrs[k] = parseFloat(v);
								}									
							}
							break;
						case "max-damage":
						case "min-damage":
							switch(data.type) {
								case "shield":
								case "belt":
								case "boots":
								case "bracers":
								case "chest":
								case "cloak":
								case "gloves":
								case "helm":
								case "pants":
								case "mighty-belt":
								case "shoulders":
								case "spirit-stone":
								case "voodoo-mask":
								case "wizard-hat":
								case "ring":
								case "amulet":
								case "quiver":
								case "mojo":
								case "source":
									if(attrs[k]) {
										attrs[k] += parseFloat(v);
									} else {
										attrs[k] = parseFloat(v);
									}
									break;
								default:
									break;
							}
							break;
						case "attack-speed":
							switch(data.type) {
								case "shield":
								case "belt":
								case "boots":
								case "bracers":
								case "chest":
								case "cloak":
								case "gloves":
								case "helm":
								case "pants":
								case "mighty-belt":
								case "shoulders":
								case "spirit-stone":
								case "voodoo-mask":
								case "wizard-hat":
								case "ring":
								case "amulet":
								case "quiver":
								case "mojo":
								case "source":
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
						case "speed":
							if(slot == "mainhand") {
								stats[k] = parseFloat(v);
							}
							if(slot == "offhand") {
								isDuelWielding = true;
								stats['speed-oh'] = parseFloat(v);
							}
							break;
						case "damage":
							if(slot == "mainhand") {
								stats[k] = {
									min: v['min'],
									max: v['max']
								};
							}							
							if(slot == "offhand") {
								stats['damage-oh'] = {
									min: v['min'],
									max: v['max']
								};
							}							
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
	// ----------------------------------
	// Math for Base Statistics 
	// ----------------------------------
	// Add in Level 60 Base Stats
	// 187 in primary stat
   // 67 in secondary stats
   // 127 in vitality
	var primaryAttr = 0;
	if(!attrs['dexterity']) {
		attrs['dexterity'] = 0;
	}
	if(!attrs['vitality']) {
		attrs['vitality'] = 0;
	}
	if(!attrs['strength']) {
		attrs['strength'] = 0;
	}
	if(!attrs['intelligence']) {
		attrs['intelligence'] = 0;
	}
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
	attrs['vitality'] += 127; // Grant base vitality to all classes
	// ----------------------------------
	// Math for Life Statistics 
	// ----------------------------------
	var mathLife = 36 + 4 * 60 + (60 - 25) * attrs['vitality'],
	 		mathLifePlus = (attrs['plus-life']) ? attrs['plus-life'] : 0,
			mathLifeTotal = Math.round(mathLife + (mathLife * (mathLifePlus * 0.01))),
			vsLevel = (selectVs.val()) ? selectVs.val() : 60;
	// ----------------------------------
	// Math for Defensive Statistics 
	// ----------------------------------
	var mathArmor = ((stats['armor'])?stats['armor']:0) + attrs['strength'] + ((attrs['armor']) ? attrs['armor'] : 0),
			mathReduction = mathArmor / (50 * vsLevel + mathArmor),
			mathAllResist = Math.round(attrs['resist-all'] + (attrs['intelligence'] / 10)),
			mathResists = {
				'physical': (mathAllResist + ((attrs['physical-resist']) ? attrs['physical-resist'] : 0)),
				'cold': (mathAllResist + ((attrs['cold-resist']) ? attrs['cold-resist'] : 0)),
				'fire': (mathAllResist + ((attrs['fire-resist']) ? attrs['fire-resist'] : 0)),
				'lightning': (mathAllResist + ((attrs['lightning-resist']) ? attrs['lightning-resist'] : 0)),
				'poison': (mathAllResist + ((attrs['poison-resist']) ? attrs['poison-resist'] : 0)),
				'arcane': (mathAllResist + ((attrs['arcane-resist']) ? attrs['arcane-resist'] : 0))					
			},
			mathDamageReduce = (Math.round(mathReduction * 100 * 100)/100);			
	// Calculate Dodge
	var mathDodge = attrs['dexterity'],
			mathDodgePercent = 0,
			mathDodgeBrackets = [[100,0.100], [400,0.025], [500,	0.020], [7000,0.010]],
			mathBlockChance = ((stats['block-chance']) ? stats['block-chance'] : 0) + ((attrs['plus-block']) ? attrs['plus-block'] : 0);
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
	// ----------------------------------
	// Vars for Offensive Statistics (Before Passives so we can add)
	// ----------------------------------
	var mathSpeed = stats['speed'],
			mathSpeedAdditive = 0,
			mathDamage = stats['damage'],
			mathDamageAvg = stats['dps'],
			mathDamageAdd = 0,
			mathDamageAddMin = 0,
			mathDamageAddMax = 0,
			mathDps = 0,
			mathDpsSpecial = false,
			mathDpsSpecialName = false,
			mathCriticalHit = 5 + ((attrs['critical-hit']) ? attrs['critical-hit'] : 0),
			mathCriticalHitDamage = 50 + ((attrs['critical-hit-damage']) ? attrs['critical-hit-damage'] : 0), 
			mathPlusDamage = false;
	if(typeof(mathDamage) == 'undefined') {
		mathDamage = {
			min: 0,
			max: 0
		};
	}
	// ----------------------------------
	// Modifications of Attributes/Skills based on passives
	// ----------------------------------
	if(!passiveSkills) {
		var passiveSkills = passiveSelect.val();			
	}
	if(passiveSkills) {
		$.each(passiveSkills, function(k,v) {
			if(typeof passives[heroClass][v]['effect'] != "undefined") {
				$.each(passives[heroClass][v]['effect'], function(effect,value) {
					switch(effect) {
						case "sharpshooter":
							mathDpsSpecialName = 'Sharpshooter';
							mathDpsSpecial = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * stats['speed']) * mathSpeedAdditive * (primaryAttr / 100 + 1) * 1 * ((100 / 100) * (mathCriticalHitDamage/100)+ 1);
							mathDpsSpecial = Math.round(mathDps * 100) / 100;
							break;
						case "plus-armor":
							mathArmor = Math.round(mathArmor * (1 + value) * 100) / 100;
							mathReduction = mathArmor / (50 * vsLevel + mathArmor);
							mathDamageReduce = (Math.round(mathReduction * 100 * 100)/100);
							break;
						case "plus-thorns":
							if(attrs['thorns']) {
								attrs['thorns'] = attrs['thorns'] * (1 + value);
							}
							break;
						case "plus-damage": 
							if(mathPlusDamage) {
								mathPlusDamage += value;
							} else {
								mathPlusDamage = value;
							}
							// mathDps = Math.round(mathDps * (1 + value) * 100) / 100;
							break;
						case "flatten-resists":
							var highest = 0;
							$.each(mathResists, function(r,val) {
								if(val > 0 && val > highest) {
									highest = val;
								}
							});
							$.each(mathResists, function(r,val) {
								mathResists[r] = highest;
							});
							break;
						case "plus-resist-all":
							mathAllResist = mathAllResist * (1 + value);
							mathResists.physical = mathResists.physical * (1 + value);
							mathResists.cold = mathResists.cold * (1 + value);
							mathResists.fire = mathResists.fire * (1 + value);
							mathResists.lightning = mathResists.lightning * (1 + value);
							mathResists.poison = mathResists.poison * (1 + value);
							mathResists.arcane = mathResists.arcane * (1 + value);
							break;
						case "melee-reduce":
						case "plus-movement-speed":
						case "max-spirit":
						case "max-hatred":
						case "max-fury":
						case "life-steal":								
						case "cc-reduce":
							if(attrs[effect]) {
								attrs[effect] += (value * 100); 
							} else {
								attrs[effect] = value * 100;
							}
							break;
						case "reduce-damage":
							mathDamageReduce = mathDamageReduce * (1 + value);
							break;
						case "health-globes":
							if(attrs['health-globes'] && attrs['health-globes'] > 0) {
								attrs['health-globes'] = attrs['health-globes'] * (1 + value);									
							}
							break;								
						case "critical-to-dodge":
							mathDodgePercent = mathDodgePercent + (mathDodgePercent * value);
							
							// mathArmor = mathArmor + (attrs['critical-hit'] * value);
							break;							
						case "dexterity-to-armor":								
							mathArmor = mathArmor + (attrs['dexterity'] * value);
							mathReduction = mathArmor / (50 * vsLevel + mathArmor);
							mathDamageReduce = (Math.round(mathReduction * 100 * 100)/100);
							break;
						case "vitality-to-armor":
							mathArmor = mathArmor + (attrs['vitality'] * value);
							break;
						case "critical-hit-damage":
							mathCriticalHitDamage = mathCriticalHitDamage + (value * 100);
							break;
						case "plus-mana":
							if(attrs['max-mana']) {
								attrs['max-mana'] = attrs['max-mana'] + (attrs['max-mana'] * value);
							}
							break;
						case "critical-hit":
							mathCriticalHit = mathCriticalHit + (value * 100);
							break;
						case "switch":
							if(typeof gearJSON[value.against] != "undefined") {
								$.each(value.cases, function(i, c) {
									var match = false;
									$.each(c.case.split("|"), function(n,l) {
										if(l == gearJSON[value.var][value.lookup]) {
											$.each(c.effect, function(e, eff) {
												switch(e) {
													case 'plus-damage':
														if(mathPlusDamage) {
															mathPlusDamage += eff;
														} else {
															mathPlusDamage = eff;
														}
														break;
													case "critical-hit-damage":
														mathCriticalHitDamage = mathCriticalHitDamage + (eff * 100);
														break;
													case "attack-speed": 
														mathSpeed = mathSpeed * (1 + eff);
														break;
													case "plus-damage":
														mathDps = Math.round(mathDps * (1 + eff) * 100) / 100;
														break;
													case "critical-hit":
														mathCriticalHit = mathCriticalHit + (eff * 100);														
														break;
													default:
													 	console.log("Unhandled Switch: " + e + " [" + eff + "]");
														break;
												}													
											})
										}
									});
								});
							}
							break;
						default:
							console.log("Unhandled Effect: " + effect + "[" + value + "]");
							break;
					}
				});						

			}
		});			
	}	
	// ----------------------------------
	// Math for Actual Offensive Statistics (Before Passives so we can add)
	// ----------------------------------
	if(attrs['max-damage'] || attrs['min-damage']) {
		mathDamageAdd = (((attrs['max-damage'])?attrs['max-damage']:0) + ((attrs['min-damage'])?attrs['min-damage']:0)) / 2;
		if(attrs['min-damage']) {
			mathDamageAddMin = attrs['min-damage'];				
		}
		if(attrs['max-damage']) {
			mathDamageAddMax = attrs['max-damage'];
		}
	}
	// Calculate the Attack Speed (Additive)
	$.each(attackSpeedIncs, function(k,v) {
		mathSpeedAdditive += v;
	}); 
	// Calculate the DPS
	var preCrit = mathDamageAvg * mathSpeed * (attrs['intelligence'] / 100);
	var critAddition = (preCrit * 1.74) * 0.325;
	if(mathDamage) {
		if(isDuelWielding) {
			var mathDamageOH = stats['damage-oh'];
			// var wd1 = (mathDamage.min + mathDamage.max) / 2,
			// 		wd2 = (mathDamageOH.min + mathDamageOH.max) / 2,
			// 		bd = mathDamageAdd,
			// 		bs = mathSpeedAdditive + 0.15,
			// 		as1 = stats['speed'],
			// 		as2 = stats['speed-oh'],
			// 		cd = (mathCriticalHit / 100) * (mathCriticalHitDamage / 100) + 1,
			// 		mathDps = Math.round((wd1+wd2+(bd*2))*((as1+as2)*(bs+1)/4)*cd*(primaryAttr/100) * 100)/100,
			// 		mathSpeed = Math.round(mathSpeed * (1 + mathSpeedAdditive + 0.15) * 100)/100;
			// console.log("Bonus Attack Speed = " + Math.round(mathSpeedAdditive * 100) + "%");
			// console.log("MH Min Damage = " + mathDamage.min);
			// console.log("MH Max Damage = " + mathDamage.max);
			// console.log("OH Min Damage = " + mathDamageOH.min);
			// console.log("OH Max Damage = " + mathDamageOH.max);
			// console.log("AVG Bonus Damage = " + mathDamageAdd);
			// console.log("MH Speed = " + stats['speed']);
			// console.log("OH Speed = " + stats['speed-oh']);
			// console.log("Critical Hit Chance = " + mathCriticalHit);
			// console.log("Critical Hit Damage = " + mathCriticalHitDamage);
			// console.log("Primary Attribute = " + primaryAttr);
			mathSpeedAdditive = Math.round(mathSpeedAdditive * 1000) / 1000;
			// console.log(stats['speed'], stats['speed-oh'], mathSpeedAdditive);
			// stats['speed'] = 1.2;
			// stats['speed-oh'] = 1.3;
			// mathSpeedAdditive = 0.14;
			stats['speed'] = Math.floor(stats['speed'] * 1024) / 1024;
			stats['speed-oh'] = Math.floor(stats['speed-oh'] * 1024) / 1024;
			var mathS = ((mathDamage.min + mathDamage.max + mathDamageOH.min + mathDamageOH.max) / 2 + mathDamageAddMin + mathDamageAddMax) / 2,
					// 		  1/((trunc(Main Hand APS*1024)/1024)*(1+% Attack Speed Bonus+.15)) + 1/((trunc(Off Hand APS*1024)/1024)*(1+% Attack Speed Bonus+.15)) = 1.2428082
					// mathC = (1 / ((Math.floor(stats['speed'] * 1024)/1024) * (1 + mathSpeedAdditive + 0.15))) + (1 / ((Math.floor(stats['speed-oh'] * 1024) / 1024) * (1 + mathSpeedAdditive + 0.15))),
					mathC = (stats['speed'] + stats['speed-oh']) / 2,
					mathR = 1 + 0.15 + mathSpeedAdditive,
					mathA = 1 + primaryAttr / 100,
					mathM = 1 + (mathCriticalHit / 100) * (mathCriticalHitDamage / 100),
					mathDps = Math.round((mathS * mathC * mathR * mathA * mathM) * 100) / 100,
					mathSpeed = Math.round(mathSpeed * (1 + mathSpeedAdditive + 0.15) * 100)/100;

			var orig = (stats['speed'] + stats['speed-oh']) / 2, 
					newMath = 1/((Math.round(stats['speed'] * 1024)/1024) * (1 + mathSpeedAdditive)) + 1/((Math.round(stats['speed-oh'] * 1024) / 1024) * (1 + mathSpeedAdditive));
			
			// console.log(orig, mathC, mathSpeedAdditive);
			
			// console.log(mathDamage.min,mathDamage.max,mathDamageOH.min, mathDamageOH.max, mathDamageAddMin, mathDamageAddMax);
			// console.log(mathS, mathC, mathR, mathA, mathM);
			// var s = ((stats.mhmin + stats.mhmax + stats.ohmin + stats.ohmax) / 2 + 6 + 12) / 2, 
			//     c = (1.4 + 1.4) / 2,
			//     r = 1 + 0.15 + stats.as,
			//     a = 1 + stats.attr / 100,
			//     m = 1 + stats.chc * stats.chd,
			//     dps = a * b * c * d * e;
			// var mathSpeed = Math.round(mathSpeed * (1 + mathSpeedAdditive + 0.15) * 100)/100;
			// 		wda1 = ((mathDamage.min + mathDamage.max) / 2) + mathDamageAdd,
			// 		as1 = stats['speed'],
			// 		cd1 = 1 + ((mathCriticalHit/100) * (mathCriticalHitDamage/100));
			// 		ms1 = (primaryAttr/100),
			// 		av1 = ((stats['speed'] + stats['speed-oh']) / 2) / stats['speed'],
			// 		wda2 = ((mathDamageOH.min + mathDamageOH.max) / 2) + mathDamageAdd,
			// 		as2 = stats['speed-oh'],
			// 		cd2 = 1 + ((mathCriticalHit/100) * (mathCriticalHitDamage/100));
			// 		ms2 = (primaryAttr/100),
			// 		av2 = ((stats['speed'] + stats['speed-oh']) / 2) / stats['speed-oh'],
			// 		mathDps = Math.round(((wda1 * as1 * cd1 * ms1 * av1) + ((wda2 * as2 * cd2 * ms2 * av2) * 0.575)) * 100) / 100;
					// mathDps1 = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * stats['speed']) * (1 + mathSpeedAdditive) * (primaryAttr / 100 ) * 1 * ((mathCriticalHit / 100) * (mathCriticalHitDamage/100) + 1),
					// mathDps2 = (((mathDamageOH.min + mathDamageOH.max) / 2 + mathDamageAdd) * stats['speed']) * (1 + mathSpeedAdditive) * (primaryAttr / 100 ) * 1 * ((mathCriticalHit / 100) * (mathCriticalHitDamage/100) + 1),
					// mathDps = (mathDps1 + mathDps2) / 2 * 1.15;
					// test = 1.15 * ((wda1 * av1 * ms1) + (wda2  * av2 * ms2)) / ((1 / 2.1) + (1 / 2.1));
					// console.log(mathDps, as1, cd1, ms1, av1);
			// console.log(mathDps1, mathDps2, mathDps);
			/* 
			(1 + passive skill boosts)
			(Weapon 1 average damage + ((minimum damage bonus + maximum damage bonus)/2))
			(Weapon Damage Multipliers)
			(Attack Spee)
			(1 + ( crit% * crit damage %))
			( 1 + (main stat / 100))
			(average attack speed of both weapons / weapon 1 attack speed) 
			+ 
			(1 + passive skill boosts)
			(Weapon 2 average damage + ((minimum damage bonus + maximum damage bonus)/2))
			(Weapon Damage Multipliers)
			(Attack Speed)
			(1 + ( crit% * crit damage %))
			( 1 + (main stat / 100))
			(average attack speed of both weapons / weapon 2 attack speed)) 
			* 0.575 
			*/
		} else {
			stats['speed'] = Math.floor(stats['speed'] * 1024) / 1024;
			// var mathS = ((mathDamage.min + mathDamage.max) + (mathDamageAddMin + mathDamageAddMax)) / 2,
			// 		mathC = stats['speed'],
			// 		mathR = 1 + mathSpeedAdditive,
			// 		mathA = 1 + primaryAttr / 100,
			// 		mathM = 1 + (mathCriticalHit / 100) * (mathCriticalHitDamage / 100),
			// 		mathDps = Math.round((mathS * mathC * mathR * mathA * mathM) * 100) / 100,
					// mathSpeed = Math.round(mathSpeed * (1 + mathSpeedAdditive) * 100)/100;
			// console.log(mathDps);
			// Else single weapon, do normally
			mathSpeed = Math.round(mathSpeed * (1 + mathSpeedAdditive) * 100)/100;
			mathDps = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * stats['speed']) * (1 + mathSpeedAdditive) * (primaryAttr / 100 + 1) * 1 * ((mathCriticalHit / 100) * (mathCriticalHitDamage/100)+ 1);
			mathDps = Math.round(mathDps * 100) / 100;	
			// console.log("2h");	
			// tabOffense.append("((" + mathDamage.min + "+" + mathDamage.max + ")" + "/ 2 + " + mathDamageAdd + ") * " + stats['speed'] + ") * " + mathSpeedAdditive + ") * " + "(" + primaryAttr + "/ 100 + 1) * 1 * ((" + mathCriticalHit + "/ 100) * (" + mathCriticalHitDamage + "/100)+ 1)");				
		}
		if(mathPlusDamage) {
			mathDps = Math.round(mathDps * (1 + mathPlusDamage) * 100) / 100;
		}
	}
	// ----------------------------------
	// After all modifications, determine percentages for display
	// ----------------------------------
	var mathResistsPercents = {
		'all': 				Math.round((mathAllResist / (5 * vsLevel + mathAllResist) * 100) * 100)/100,
		'physical': 	Math.round((mathResists.physical / (5 * vsLevel + mathResists.physical) * 100) * 100)/100,
		'cold': 			Math.round((mathResists.cold / (5 * vsLevel + mathResists.cold) * 100) * 100)/100,
		'fire': 			Math.round((mathResists.fire / (5 * vsLevel + mathResists.fire) * 100) * 100)/100,
		'lightning': 	Math.round((mathResists.lightning / (5 * vsLevel + mathResists.lightning) * 100) * 100)/100,
		'poison': 		Math.round((mathResists.poison / (5 * vsLevel + mathResists.poison) * 100) * 100)/100,
		'arcane': 		Math.round((mathResists.arcane / (5 * vsLevel + mathResists.arcane) * 100) * 100)/100
	};
	// ----------------------------------
	// Effective Health Calculations
	// ----------------------------------
	
	var mathDR = (mathDamageReduce/100),
			mathAR = (mathAllResist / (5 * vsLevel + mathAllResist)),
			mathDT = (1 - mathAR) * (1 - mathDR),
			// Get Reduction Values from Attributes
			mathMeleeReduce = (attrs['melee-reduce']) ? (attrs['melee-reduce']) : 0,
			mathRangeReduce = (attrs['range-reduce']) ? (attrs['range-reduce']) : 0,
			mathEliteReduce = (attrs['elite-reduce']) ? (attrs['elite-reduce']) : 0,
			// Calculate the Damage Reduction for each resistance based on the vsLevel
			mathARPhysical = (mathResists.physical / (5 * vsLevel + mathResists.physical)),
			mathARCold = (mathResists.cold / (5 * vsLevel + mathResists.cold)),
			mathARFire = (mathResists.fire / (5 * vsLevel + mathResists.fire)),
			mathARLightning = (mathResists.lightning / (5 * vsLevel + mathResists.lightning)),
			mathARPoison = (mathResists.poison / (5 * vsLevel + mathResists.poison)),
			mathARArcane = (mathResists.arcane / (5 * vsLevel + mathResists.arcane)),
			// Calculate EHP For each resistance individually
			mathEHPPhysical = mathLifeTotal / ((1 - mathDR) * (1 - mathARPhysical)),
			mathEHPCold = mathLifeTotal / ((1 - mathDR) * (1 - mathARCold)),
			mathEHPFire = mathLifeTotal / ((1 - mathDR) * (1 - mathARFire)),
			mathEHPLightning = mathLifeTotal / ((1 - mathDR) * (1 - mathARLightning)),
			mathEHPPoison = mathLifeTotal / ((1 - mathDR) * (1 - mathARPoison)),
			mathEHPArcane = mathLifeTotal / ((1 - mathDR) * (1 - mathARArcane));
	// Are we a Monk or Barbarian?
	if(heroClass == "monk" || heroClass == "barbarian") {
		// console.log("Adding monk/barb bonus");
		// Add the Passive 30% Damage Reduction those two classes get
		mathDT = (1 - mathAR) * (1 - mathDR) * (1 - 0.3);
		// Recalculate the individual resistance EHPs including the 30% Reduction
		mathEHPPhysical = mathLifeTotal / ((1 - mathDR) * (1 - mathARPhysical) * (1 - 0.3));
		mathEHPCold = mathLifeTotal / ((1 - mathDR) * (1 - mathARCold) * (1 - 0.3));
		mathEHPFire = mathLifeTotal / ((1 - mathDR) * (1 - mathARFire) * (1 - 0.3));
		mathEHPLightning = mathLifeTotal / ((1 - mathDR) * (1 - mathARLightning) * (1 - 0.3));
		mathEHPPoison = mathLifeTotal / ((1 - mathDR) * (1 - mathARPoison) * (1 - 0.3));
		mathEHPArcane = mathLifeTotal / ((1 - mathDR) * (1 - mathARArcane) * (1 - 0.3));						
	}	
	// Finally Calculate the EHP
	var	mathEHP = mathLifeTotal / mathDT,
			// Calculate the Damage Taken for special cases (dodge, melee, ranged, elite)
			mathDTDodge = mathDT * (1 - mathDodgePercent / 100),
			mathDTMelee = mathDT * (1 - mathMeleeReduce / 100),
			mathDTRange = mathDT * (1 - mathRangeReduce / 100),
			mathDTElite = mathDT * (1 - mathEliteReduce / 100),
			// Calculate the EHP for special cases (dodge, melee, ranged, elite)
			mathEHPDodge = mathLifeTotal / mathDTDodge,
			mathEHPMelee = mathLifeTotal / mathDTMelee,
			mathEHPRange = mathLifeTotal / mathDTRange,
			mathEHPElite = mathLifeTotal / mathDTElite;

	// Calculate EHP by each piece of gear
	// var slotEHP = {};
	// var originalStats = {},
	// jQuery.extend(original)
	// $(target).each(function() {
	// 	var data = $(this).data("json"),
	// 			slot = $(this).parent().data("slot");
	// 	
	// 	console.log(data, slot); 
		
		// calc(".equipped a");
		// Get the new possible stats
		// var possible = {};
		// jQuery.extend(possible,stats);
				
		// 	slotStats = {
		// 		mathEHP: 0,
		// 		mathReduction: 0,
		// 		resistAll: 0,
		// 		armor: 0,
		// 		intelligence: 0,
		// 		vitality: 127,
		// 		life: 0
		// 	};		
		// 
		// if(data.stats) {
		// 	if(data.stats.armor) {
		// 		slotStats.armor += data.stats.armor;
		// 	}			
		// }
		// if(data.attrs) {
		// 	if(data.attrs['intelligence']) {
		// 		slotStats.intelligence += data.attrs.intelligence;
		// 	}
		// 	if(data.attrs['strength']) {
		// 		slotStats.armor += data.attrs['strength'];
		// 	}
		// 	if(data.attrs['resist-all']) {
		// 		slotStats.resistAll += data.attrs['resist-all'];
		// 	}
		// 	if(data.attrs['vitality']) {
		// 		slotStats.vitality += data.attrs['vitality'];
		// 	}
		// }
		// if(data.socketAttrs) {
		// 	if(data.socketAttrs['vitality']) {
		// 		// slotStats.vitality += data.socketAttrs['vitality'];
		// 	}
		// 	if(data.socketAttrs['intelligence']) {
		// 		slotStats.intelligence += data.socketAttrs.intelligence;
		// 	}
		// 	if(data.socketAttrs['strength']) {
		// 		slotStats.armor += data.socketAttrs['strength'];
		// 	}
		// }
		// 
		// // Calc Life
		// slotStats.life = 36 + 4 * 60 + (60 - 25) * slotStats.vitality;
		// if(data.socketAttrs) {
		// 	if(data.socketAttrs['plus-life']) {
		// 		slotStats.life = slotStats.life * (1 + (data.socketAttrs['plus-life'] / 100));
		// 	}
		// }
		// if(slotStats.armor) {
		// 	slotStats.mathReduction = slotStats.armor / (50 * vsLevel * slotStats.armor);						
		// }
		// slotStats.mathAllResist = Math.round(slotStats.resistAll + (slotStats.intelligence / 10));
		// // Do the EHP Calc
		// slotStats.mathAR = (slotStats.mathAllResist / (5 * parseInt(vsLevel) + slotStats.mathAllResist));
		// slotStats.mathDT = (1 - slotStats.mathAR) * (1 - slotStats.mathReduction);
		// // if(slotStats.mathDT) {
		// 	slotStats.mathEHP = slotStats.life / slotStats.mathDT;			
		// // }
		// slotEHP[slot] = slotStats.mathEHP;			
		// console.log(slotEHP[slot], slotStats.mathAR, slotStats.mathDT, slotStats.mathAllResist, slotStats.life);
		// if(data.stats) {
		// 	$.each(data.stats, function(k,v) {
		// 		switch(k) {
		// 			case "armor":
		// 				slotStats.mathReduction = v / (50 * vsLevel + v);
		// 				break;
		// 		}
		// 	});
		// }
		// if(data.attrs) {
		// 	$.each(data.attrs, function(k,v) {
				
		// 		// console.log(k, v);
		// 	});
		// }


	// });

	// EHP by Gear
	$("#stats-ehp-gear").html('');
	var ehpGear = $("<ul class='resist-specific'/>").append($("<li class='header'/>").html("Gear Based EHP (<a href='/faq/gear-based-ehp'>?</a>)"));
	$.each(slotEHP, function(k,v) {
		if(v && v > 4721) {
			ehpGear.append(statLabel(k + " EHP", v, 'round'));			
		} else {
			ehpGear.append(statLabel(k + " EHP", '~'));			
		}
	});
	$("#stats-ehp-gear").append(ehpGear);
	// tabEHPGear.append(ehpGear);
	// EHP 
	tabEHP.empty();
	tabEHP.append(statLabel("EHP", mathEHP, 'round'));
	tabEHP.append(statLabel("EHP w/ Dodge", mathEHPDodge, 'round'));
	tabEHP.append($("<ul class='resist-specific'/>").append(
		$("<li class='header'/>").html("Damage Type EHP"),
		statLabel("Melee EHP", mathEHPMelee, 'round'),
		statLabel("Ranged EHP", mathEHPRange, 'round'),
		statLabel("Elite EHP", mathEHPElite, 'round')
	));		
	tabEHP.append($("<ul class='resist-specific'/>").append(
		$("<li class='header'/>").html("Elemental EHP"),
		statLabel("Physical EHP", mathEHPPhysical, 'round'),
		statLabel("Cold EHP", mathEHPCold, 'round'),
		statLabel("Fire EHP", mathEHPFire, 'round'),
		statLabel("Lightning EHP", mathEHPLightning, 'round'),
		statLabel("Poison EHP", mathEHPPoison, 'round'),
		statLabel("Arcane/Holy EHP", mathEHPArcane, 'round')
	));
	// ----------------------------------
	// Render the Stasistics below
	// ----------------------------------	
	// Base Statistics Display
	tabBase.empty();
	tabBase.append(statLabel("Strength", attrs['strength']));
	tabBase.append(statLabel("Dexterity", attrs['dexterity']));
	tabBase.append(statLabel("Intelligence", attrs['intelligence']));
	tabBase.append(statLabel("Vitality", attrs['vitality']));
	tabBase.append(statLabel("Magic Find", attrs['plus-magic-find'], 'per'));
	tabBase.append(statLabel("Gold Find", attrs['plus-gold-find'], 'per'));
	// Defensive Statistics Display
	tabDefense.empty();
	tabDefense.append(statLabel("Armor", mathArmor, '', mathDamageReduce));
	tabDefense.append(statLabel("All Resist", mathAllResist, 'round', mathResistsPercents['all']));
	tabDefense.append(statLabel("Block Amount", (stats['block-amount']) ? stats['block-amount'] : '~'));		
	tabDefense.append(statLabel("Block Chance", mathBlockChance, 'per'));
	tabDefense.append(statLabel("Dodge Chance", (Math.round(mathDodgePercent*10)/10), 'per'));
	tabDefense.append(statLabel("Damage Reduction", mathDamageReduce, 'per'));
	tabDefense.append(statLabel("Physical Resistance", mathResists['physical'], 'round', mathResistsPercents['physical']));
	tabDefense.append(statLabel("Cold Resistance", mathResists['cold'], 'round', mathResistsPercents['cold']));
	tabDefense.append(statLabel("Fire Resistance", mathResists['fire'], 'round', mathResistsPercents['fire']));
	tabDefense.append(statLabel("Lightning Resistance", mathResists['lightning'], 'round', mathResistsPercents['lightning']));
	tabDefense.append(statLabel("Poison Resistance", mathResists['poison'], 'round', mathResistsPercents['poison']));
	tabDefense.append(statLabel("Arcane/Holy Resistance", mathResists['arcane'], 'round', mathResistsPercents['arcane']));
	tabDefense.append(statLabel("Crowd Control Reduction", ((attrs['cc-reduce'])?attrs['cc-reduce']:0), 'per'));
	tabDefense.append(statLabel("Missile Damage Reduction", mathRangeReduce, 'per'));
	tabDefense.append(statLabel("Melee Damage Reduction", mathMeleeReduce, 'per'));
	tabDefense.append(statLabel("Elite Damage Reduction", mathEliteReduce, 'per'));
	tabDefense.append(statLabel("Thorns", attrs['thorns']));
	// Offensive Statistics Display
	tabOffense.empty();
	tabOffense.append(statLabel("DPS", mathDps));
	if(mathDpsSpecial) {
		tabOffense.append(statLabel("DPS w/ " + mathDpsSpecialName, mathDps));			
	}
	tabOffense.append(statLabel("Attacks per Second", mathSpeed));
	tabOffense.append(statLabel("Critical Hit Chance", mathCriticalHit, 'per'));
	tabOffense.append(statLabel("Critical Hit Damage", mathCriticalHitDamage, 'per'));
	// Life Stastics Display
	tabLife.empty();
	tabLife.append(statLabel("Maximum Life", mathLifeTotal));
	tabLife.append(statLabel("Total Life Bonus", mathLifePlus, 'per'));
	tabLife.append(statLabel("Life per Second", (attrs['life-regen']) ? attrs['life-regen'] : 0));
	tabLife.append(statLabel("Life Steal", (attrs['life-steal']) ? attrs['life-steal'] : 0, 'per'));
	tabLife.append(statLabel("Life per Kill", (attrs['life-kill']) ? attrs['life-kill'] : 0));
	tabLife.append(statLabel("Life per Hit", (attrs['life-hit']) ? attrs['life-hit'] : 0));
	tabLife.append(statLabel("Health Globe Healing Bonus", (attrs['health-globes']) ? attrs['health-globes'] : 0));
	tabLife.append(statLabel("Bonus to Gold/Globe Radius", (attrs['plus-pickup-radius']) ? attrs['plus-pickup-radius'] : 0));
}
var compareTo = $("#compare-to");
$("#compared-slot").bind('change', function() {
	var itemType = $(this).val();
	$.ajax({
		url: '/item/fetch/type/' + itemType,
		cache: false,
		dataType: 'json',
		success: function(data) {
			// Clear out the List to avoid confusion
			compareTo.html("");
			// Add a "Nothing" option
			compareTo.append("<option value=''>Nothing</option>");
			// Loop through all the JSON we recieved and append them as options
			$.each(data, function(k,v) {
				var item = $.parseJSON(v), 
						option = $("<option/>");
				option.attr("value", k);
				option.attr("data-json", v);
				option.html(item.name);
				option.bindTooltip();
				compareTo.append(option);
			});
		}
	})
});
function calcDiff(currentStats, upgradeItem) {
	var itemType = $("#compared-slot").find(":selected").val(),
			currently = stats;
			itemDisplay = $("#equipped-" + itemType);
	var itemLink = $("<a/>"),
			oldItem = itemDisplay.html(),
			oldOH = false,
			notices = [];
	// Are we replacing a 1h + OH or 2x 1h w/ a 2h?
	switch(upgradeItem.type) {
		case '2h-mace': 
		case '2h-axe': 
		case 'daibo': 
		case '2h-mighty': 
		case 'polearm': 
		case 'staff': 
		case '2h-sword': 
			// Ensure we're using an OH atm
			if($("#equipped-offhand a").length) {
				oldOH = JSON.parse($("#equipped-offhand a").attr("data-json"));
				$("#equipped-offhand").html("");
				notices.push("We notice you're comparing a two-handed weapon vs your currently equipped mainhand + off-hand items. We've adjusted the comparision slightly so you can see the actual stats between your mainhand + offhand VS the two-hander (without the offhand).");					
			}
			break;
	}
	itemLink.attr("href", "/i/" + upgradeItem.id);
	itemLink.attr("data-json", JSON.stringify(upgradeItem));
	itemLink.addClass("quality-" + upgradeItem.quality);
	itemLink.html(upgradeItem.name);
	itemLink.bindTooltip();
	itemDisplay.html(itemLink);
	// Calculate all the stats
	calc(".equipped a");
	// Get the new possible stats
	var possible = {};
	jQuery.extend(possible,stats);
	// Put the old item back in place
	if(oldOH) {
		var replaceOH = $("<a/>").attr("href", "/i/" + oldOH.id).attr("data-json", JSON.stringify(oldOH)).addClass("quality-" + oldOH.quality).html(oldOH.name);
		replaceOH.bindTooltip();
		$("#equipped-offhand").append(replaceOH);
	}
	itemDisplay.html(oldItem);
	itemDisplay.find("a").bindTooltip();
	calc(".equipped a");
	$("#compare-notes").html("");
	if(notices.length > 0) {
		$.each(notices, function(k,v) {
			$("#compare-notes").append(v);
		})
	}
	var items = $("<div/>"),
			oldItems = $("<div/>").append("Old Item: ", oldItem), 
			newItems = $("<div/>").append("New Item: ", itemLink),
			diff = $.diff(currentStats, possible),
			table = $("<table/>");
			header = $("<tr/>").append("<th>Stat</th><th>Diff</th><th>Old</th><th>New</th>");
	if(oldOH) {
		oldItems.append(" (+" + $("#equipped-offhand").html() + ")");
	}
	items.append(oldItems, newItems);
	table.append(header);
	if(Object.keys(diff['mod']).length > 0) {
		$.each(diff['mod'], function(k,v) {
			var diffVal = Math.round((possible[k] - currentStats[k]) * 100) / 100;
			var row = $("<tr/>");
			row.append($("<td/>").html(k));
			var cur = Math.round(currentStats[k] * 100) / 100,
					pos = Math.round(possible[k] * 100) / 100;
			if(cur > 99999) {
				cur = Math.round(cur / 10) / 100 + "k";
			}
			if(pos > 99999) {
				pos = Math.round(pos / 10) / 100 + "k";
			}
			if(diffVal > 0) {
				row.append($("<td/>").html("+"+diffVal).addClass("pos"));
				row.append($("<td class='neg'/>").html(cur));
				row.append($("<td class='pos'/>").html(pos));				
			} else {
				row.append($("<td/>").html(diffVal).addClass("neg"));
				row.append($("<td class='pos'/>").html(cur));
				row.append($("<td class='neg'/>").html(pos));				
			}
			table.append(row);
		});
		table.append("<tr><td colspan='10'><span class='pos'>Green = Increase</span> / <span class='neg'>Red = Decrease</span></td></tr>");
	} else {
		table.append("<tr><td colspan='10' style='text-align: center; font-weight: bold;'>These items are identical.</td></tr>");
	}
	items.find("div a").each(function() {
		$(this).bindTooltip();
	});			
	$(".compare-diff").empty().append(items, table);
	return diff['mod'];
}
compareTo.bind('change', function() {
	var statsCopy = {};
	jQuery.extend(statsCopy,stats);
	var itemType = $("#compared-slot").find(":selected").val(),
			current = $("#equipped-" + itemType + " a").data("json"),
			upgrade = $(this).find(":selected").data("json"),
			diff = calcDiff(statsCopy, upgrade);
});	
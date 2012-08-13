var itemBuilder = {
	// Storage for the Item data
	item: {
		name: null,								// Name of the Item
		type: null,								// Type of Item
		typeName: null, 					// Cleaned Name of Item Type
		quality: null,						// Quality of Item
		attrs: {},								// Storage for Attributes
		stats: {},								// Storage for Stats
		sockets: {},							// Storage for what's in the Sockets
		socketCount: 0,						// Storage for the # of Sockets
		setBonus: null						// Storage for which set this item is part of
	},
	headerElements: [],					// Any additional elements to append to the header					
	footerElements: [],					// Any additional elements to append to the footer
	attrsSelected: [],					// The attributes that have already been selected, to avoid removing/adding additional
	// Bunch of Selectors for Elements used by the Builder
	nameInput: null,				 		// Selector for the Name Input
	qualitySelect: null,		 		// Selector for the Quality 
	attributeSelect: null,	 		// Selector for the Attribute Selector
	itemTypeSelect: null,		 		// Selector for the Item's Type
	socketSelect: null, 				// Selector for the number of sockets
	// Storage for jQuery Objects in the preview
	preview: {},
	itemPreview: null,			 		// Selector for the Item's Preview
	// Item Class <-> Type Mappings
	itemClass: {
		"none": ["amulet", "ring", "mojo", "source", "quiver"],
		"armor": ["belt","boots","bracers","chest","cloak","gloves","helm","pants","mighty-belt","shoulders","spirit-stone","voodoo-mask","wizard-hat"],
		"weapon": ["2h-mace","2h-axe","bow","diabo","crossbow","2h-mighty","polearm","staff","2h-sword","axe","ceremonial-knife","hand-crossbow","dagger","fist-weapon","mace","mighty-weapon","spear","sword","wand"],	
		"shield": ["shield"]
	},
	// Listing of Qualities
	qualityMap: ['Unspecified', 'Inferior', 'Normal', 'Superior', 'Magic', 'Rare', 'Legendary', 'Set'],
	// Listing of Skill Text on Items
	skillText: {
		// Base Attributes
		'strength': '+VVV Strength',
		'intelligence': '+VVV Intelligence',
		'vitality': '+VVV Vitality',
		'dexterity': '+VVV Dexterity',
		// Defense
		'resist-all': '+VVV Resistance to All Elements',
		'armor': '+VVV Armor',
		'plus-life': '+VVV% Life',
		'life-regen': 'Regenerates VVV Life per Second',
		// Percent Reductions
		'cc-reduce': 'Reduces the duration of control impairing effects by VVV%',
		'elite-reduce': 'Reduces damage from elites by VVV%',
		'melee-reduce': 'Reduces damage from melee attacks by VVV%',
		'range-reduce': 'Reduces damage from ranged attacks by VVV%',
		// Shield Attributes
		'plus-block': '+VVV% Chance to Block',
		// Resistances
		'arcane-resist': '+VVV Arcane Resistance',
		'cold-resist': '+VVV Cold Resistance',
		'fire-resist': '+VVV Fire Resistance',
		'lightning-resist': '+VVV Lightning Resistance',
		'physical-resist': '+VVV Physical Resistance',
		'poison-resist': '+VVV Poison Resistance',
		'thorns': 'Melee attackers take VVV damage per hit',
		// Offense
		'attack-speed': 'Attack speed increased by VVV%',
		'plus-attack-speed': 'Attack speed increased by VVV%',
		'critical-hit': 'Critical Hit Chance increased by VVV%',
		'critical-hit-damage': 'Critical Hit Damage increased by VVV%',
		'plus-damage': '+VVV% Damage',
		'min-damage': '+VVV Minimum Damage',
		'max-damage': '+VVV Maximum Damage',
		'life-steal': 'VVV% of Damage Dealt is Converted to Life (Steal)',
		'life-kill': '+VVV Life after each Kill',
		'life-hit': 'Each hit adds +VVV Life',		
		// Weapon Flat damage ranges
		'minmax-damage': '+VVV Damage',
		'arcane-damage': '+VVV Arcane Damage',
		'cold-damage': '+VVV Cold Damage',
		'fire-damage': '+VVV Fire Damage',
		'holy-damage': '+VVV Holy Damage',
		'lightning-damage': '+VVV Lightning Damage',
		'poison-damage': '+VVV Poison Damage',
		// Elemental Bonus Damage
		'plus-arcane-damage': 'Adds +VVV% to Arcane Damage',
		'plus-cold-damage': 'Adds +VVV% to Cold Damage',
		'plus-fire-damage': 'Adds +VVV% to Fire Damage',
		'plus-holy-damage': 'Adds +VVV% to Holy Damage',
		'plus-lightning-damage': 'Adds +VVV% to Lightning Damage',
		'plus-poison-damage': 'Adds +VVV% to Poison Damage',
		// Percent Increases
		'elite-damage': 'Increases Damage against Elites by VVV%',
		'demon-damage': '+VVV% Damage to Demons',
		// Procs
		'chance-bleed': 'VVV% chance to inflict Bleed for VVV damage over 5 seconds',
		'chance-blind': 'VVV% chance to Blind on Hit',
		'chance-chill': 'VVV% chance to Chill on Hit',
		'chance-fear': 'VVV% chance to Fear on Hit',
		'chance-freeze': 'VVV% chance to Freeze on Hit',
		'chance-immobilize': 'VVV% chance to Immobilize on Hit',
		'chance-knockback': 'VVV% chance to Knockback on Hit',
		'chance-slow': 'VVV% chance to Slow on Hit',
		'chance-stun': 'VVV% chance to Stun on Hit',
		// Misc
		'plus-movement': '+VVV% Movement Speed',
		'plus-pickup-radius': 'Increases Gold and Health pickup by VVV yards',
		'plus-experience': 'Monster kills grant +VVV experience',
		'plus-gold-find': '+VVV% Extra Gold from Monsters',
		'plus-magic-find': 'VVV% Better Chance of finding Magic Items',
		'health-globes': 'Health Globes grant +VVV Life',
		'level-reduce': 'Level Requirement reduced by VVV',
		'indestructable': 'Ignores durability loss',
		// Barbarian
		'fury-max': '+VVV Maximum Fury',
		'fury-spent-life': 'Gain VVV Life per Fury Spent',
		'bb-bash': 'Increases bash damage by VVV%',
		'bb-cleave': 'Increases cleave damage by VVV%',
		'bb-frenzy': 'Increases frenzy damage by VVV%',
		'bb-rend': 'Reduces resource cost of Rend by VVV Fury',
		'bb-revenge': 'Increases Critical Hit Chance of Revenge by VVV%',
		'bb-weapon-throw': 'Reduces resource cost of Weapon Throw by VVV Fury',
		'bb-hammer-of-the-ancients': 'Reduces resource cost of Hammer of the Ancients by VVV Fury',
		'bb-whirlwind': 'Increases Critical Hit Chance of Whirlwind by VVV%',
		'bb-overpower': 'Increases Critical Hit Chance of Overpower by VVV%',
		'bb-seismic-slam': 'Increases Critical Hit Chance of Seismic Slam by VVV%',
		// Demon Hunter
		'hatred-regen': 'Increases Hatred Regeneration by VVV per Second',
		'max-discipline': '+VVV Maximum Discipline',
		'discipline-regen': 'Increases Discipline Regeneration by VVV per Second',
		'dh-cluster-arrow': 'Reduces resource cost of Cluster Arrow by VVV Hatred.',
		'dh-chakram': 'Reduces resource cost of Chakram by VVV Hatred',
		'dh-evasive-fire': 'Increases Evasive Fire damage by VVV%',
		'dh-grenades': 'Increases Grenades Damage by [V]%',
		'dh-impale': 'Reduces resource cost of Impale by VVV Hatred',
		'dh-spike-trap': 'Increases Spike Trap damage by VVV%',
		'dh-bola-shot': 'Increases Bola Shot damage by VVV%',
		'dh-elemental-arrow': 'Increases Elemental Arrow damage by VVV%',
		'dh-entangling-shot': 'Increases Entangling Shot damage by VVV%',
		'dh-hungering-arrow': 'Increases Hungering Arrow damage by VVV%',
		'dh-multishot': 'Increases Critical Hit Chance of Multishot by VVV%',
		'dh-rapid-fire': 'Increases Critical Hit Chance of Rapid Fire by VVV%',
		// Monk
		'spirit-spent-life': 'Gain VVV per Spirit Spent',
		'spirit-regen': 'Increases Spirit Regeneration by VVV per Second',
		'mk-crippling-wave': 'Increases Crippling Wave damage by VVV%',
		'mk-cyclone-strike': 'Reduces resource cost of Cyclone Strike by VVV Spirit',
		'mk-deadly-reach': 'Increases Deadly Reach damage by VVV%',
		'mk-exploding-palm': 'Increases Exploding Palm damage by VVV%',
		'mk-fists-of-thunder': 'Increases Fist of Thunder damage by VVV%',
		'mk-sweeping-wind': 'Increases Sweeping Wind damage by VVV%',
		'mk-way-of-the-hundred-fists': 'Increases Way of the Hundred Fists damage by VVV%',
		'mk-lashing-tail-kick': 'Reduces resource cost of Lashing Tail Kick by VVV Spirit',
		'mk-tempest-rush': 'Increases Critical Hit Chance of Tempest Rush by VVV%',
		'mk-wave-of-light': 'Increases Critical Hit Chance of Wave of Light by VVV%',
		// Witch Doctor
		'mana-regen': 'Increases Mana Regeneration by VVV per Second',
		'mana-max': '+VVV Maximum Mana',
		'mana-kill': 'Grants VVV Mana per Kill',
		'wd-firebomb': 'Reduces resource cost of Firebomb by VVV Mana',
		'wd-haunt': 'Increases Haunt Damage by VVV%',
		'wd-acid-clouds': 'Increases Critical Hit Chance of Acid Clouds by VVV%',
		'wd-firebats': 'Reduces resource cost of Firebats by VVV Mana',
		'wd-zombie-dogs': 'Reduces cooldown of Summon Zombie Dogs by VVV Seconds',
		'wd-plague-of-toads': 'Increases Plague of Toads damage by VVV%',
		'wd-poison-darts': 'Increaeses Poison Darts damage by VVV%',
		'wd-spirit-barrage': 'Increases Spirit Barrage damage by VVV%',
		'wd-wall-of-zombies': 'Reduces cooldown of Wall of Zombies by VVV Seconds',
		'wd-zombie-charger': 'Reduces resource cost of Zombie Charger by VVV Mana',
		// Wizard
		'ap-on-crit': 'Critical Hits grant VVV Arcane Power',
		'ap-max': '+VVV Maximum Arcane Power',
		'wz-arcane-torrent': 'Reduces resource cost of Arcane Torrent by VVV Arcane Power',
		'wz-disintegrate': 'Reduces resource cost of Disintegrate by VVV Arcane Power',
		'wz-electrocute': 'Increases Electrocute damage by VVV%',
		'wz-explosive-blast': 'Increases Critical Hit Chance of Explosive Blast by VVV%',
		'wz-hydra': 'Reduces resource cost of Hydra by VVV Arcane Power',
		'wz-ray-of-frost': 'Increases Critical Hit Chance of Ray of Frost by VVV%',
		'wz-energy-twister': 'Increases Critical Hit Chance of Energy Twister by VVV%',
		'wz-magic-missle': 'Increases Magic Missle damage by VVV%',
		'wz-arcane-orb': 'Increases Critical Hit Chance of Arcane Orb by VVV%',
		'wz-blizzard': 'Increases duration of Blizzard by VVV Seconds',
		'wz-meteor': 'Reduces resource cost of Meteor by VVV Arcane Power',
		'wz-shock-pulse': 'Increases Shock Pulse damage by VVV%',
		'wz-spectral-blade': 'Increases Spectral Blade damage by VVV%'
	},
	// Set the Name input 
	setNameInput: function(element) {
		this.nameInput = element;
	},
	// Bind controls on the Name input
	bindNameInput: function() {
		var selector = this.nameInput,
				builder = this;
		if(selector) {
			selector.bind('keyup', function() {
				builder.item.name = $(this).val();
				builder.updatePreview();
			});					
		}
	},
	// Set the Socket Count selector
	setSocketSelect: function(element) {
		this.socketSelect = element;
	},
	// Bind controls on the Socket select
	bindSocketSelect: function() {
		var selector = this.socketSelect,
				builder = this;
		if(selector) {
			selector.bind('change', function() {
				builder.item.socketCount = $(this).val();
				builder.updatePreview();
			});					
		}
	},
	// Set the Quality selector
	setQualitySelect: function(element) {
		this.qualitySelect = element;
	},
	// Bind controls on the Quality selector
	bindQualitySelect: function() {
		var selector = this.qualitySelect,
				builder = this;
		if(selector) {
			selector.bind('change', function() {
				builder.item.quality = $(this).val();
				// Add the SetBonus selector if we're dealing with a set piece
				if(builder.item.quality == 7) {
					builder.addSetBonusSelect();
				} else {
					builder.removeSetBonusSelect();
				}
				builder.updatePreview();
			});			
		}
	},
	removeSetBonusSelect: function() {
		$("dt#setBonus-label").remove();
		$("dd#setBonus-element").remove();
		this.item.setBonus = null;
		this.preview.setBonus.empty();
	},
	addSetBonusSelect: function() {
		var builder = this,
				dt = $("<dt id='setBonus-label'>"),
				dd = $("<dd id='setBonus-element'>"),
				select = $("<select id='setBonus' name='setBonus'>");
		dt.html("Which set is this a part of?");
		select.append("<option value=''>Select a Set</option>");
		_.each(setBonuses, function(v,k) {
			var option = $("<option>");
			option.val(k);
			option.html(v.name);
			if(this.item.setBonus && this.item.setBonus == k) {
				option.attr("selected", "selected");
			}
			select.append(option);
		}, this);
		select.bind('change', function() {
			builder.item.setBonus = $(this).val();
			builder.updatePreview();
		});
		dd.html(select);
		this.qualitySelect.parent().after(dt, dd);
	},
	// Set the Item Type selector
	setItemTypeSelect: function(element) {
		this.itemTypeSelect = element;
	},
	// Bind controls on the Item Type selector
	bindItemTypeSelect: function() {
		var selector = this.itemTypeSelect,
				builder = this;
		selector.bind('change', function() {
			builder.item.type = $(this).val();
			builder.item.typeName = $(this).find(":selected").text();
			_.each(builder.itemClass, function(v,k) {
				if(_.indexOf(v, $(this).val()) >= 0) {
					builder.item.itemClass = k;
					builder.initPreview();	// Not sure why... but I have to rebuild it
					builder.updatePreview();				
				}
			}, this);
		});
	},
	// Set the Attribute Selector
	setAttributeSelect: function(element) {
		this.attributeSelect = element;
	},
	// Bind the Change function to the Attribute selector
	bindAttributeSelect: function() {
		var selector = this.attributeSelect,
				builder = this;
		selector.bind('change', function() {
			var attributes = selector.val();
			// Add all attributes that are chosen
			_.each(attributes, function(v) {
				builder.addAttribute(v);
			}, builder);
			// Check previous attributes to make sure they weren't deselected
			_.each(builder.attrsSelected, function(v) {
				if(_.indexOf(attributes, v) < 0) {
					builder.removeAttribute(v);
				}
			});
			// Set the valid attributes for the next iteration
			builder.attrsSelected = attributes;
			// Update the Preview Pane
			builder.updatePreview();
		});
	},
	// Set the Item Preview Area
	setItemPreview: function(element) {
		this.itemPreview = element;
	},
	// Add a stat to this.item.stats
	addStat: function(name) {
		if(!this.item.stats[name]) {
			this.item.stats[name] = 0;
		}
	},
	// Update the Value of a Stat
	updateStat: function(name, value) {
		this.item.stats[name] = parseFloat(value);
	},
	// Remove a specific stat by name
	removeStat: function(name) {
		delete this.item.stats[name];
	},
	// Remove all existing stats
	removeStats: function(name) {
		this.item.stats = {};
	},
	// Add an Attribute to this.item.attrs
	addAttribute: function(name) {
		if(!this.item.attrs[name]) {
			this.item.attrs[name] = 0;
		}
	},
	// Update the Value of an Attribute
	updateAttribute: function(name, value) {
		this.item.attrs[name] = parseFloat(value);
		// console.log(this.attrs);
	},
	// Remove a specific attribute by name
	removeAttribute: function(name) {
		delete this.item.attrs[name];
	},
	// Remove all existing attributes
	removeAttributes: function(name) {
		this.item.attrs = {};
	},
	// Initialize the Preview
	initPreview: function() {
		// Build a bunch of HTML for the Preview
		var container = this.itemPreview;
		this.preview.header = $("<div class='top'><p></p></div>");
		this.preview.body = $("<div class='item'>");
		this.preview.itemMeta = $("<p class='item-type'>");
		this.preview.itemQuality = $("<span class='quality'>");
		this.preview.itemType = $("<span class='type'>");
		this.preview.statsPrimary = $("<p class='stats stats-primary'>");
		this.preview.statsPrimaryValue = $("<span class='big-stat'>");
		this.preview.statsPrimaryHelper = $("<span class='stat-helper'>");
		this.preview.statsRange = $("<p class='stats stats-extra-range'>");
		this.preview.statsRangeValue = $("<span>");
		this.preview.statsRangeHelper = $("<span class='stat-helper'>");
		this.preview.statsPercent = $("<p class='stats stats-extra-percent'>");
		this.preview.statsPercentValue = $("<span>");
		this.preview.statsPercentHelper = $("<span class='stat-helper'>");
		this.preview.attrs = $("<ul class='attrs'>");
		this.preview.sockets = $("<ul class='sockets'>");
		this.preview.setBonus = $("<div class='setBonus'>");
		this.preview.footer = $("<div class='bottom'>");
		_.each(this.headerElements, function(element) { 
			this.preview.header.append(element);
		}, this);
		_.each(this.footerElements, function(element) { 
			this.preview.footer.append(element);
		}, this);
		this.itemPreview.empty().append(
			this.preview.header, 
			this.preview.body.append(
				this.preview.itemMeta.append(
					this.preview.itemQuality,
					" ", 
					this.preview.itemType
				),
				this.preview.statsPrimary, 
				this.preview.statsRange, 
				this.preview.statsPercent, 
				this.preview.attrs, 
				this.preview.sockets,
				this.preview.setBonus
			), 
			this.preview.footer
		);
	},
	// Update the Item Preview
	updatePreview: function() {
		var builder = this;
		// Update the Name
		this.preview.header.find("p").html(this.item.name);
		// Update the Quality
		if(this.item.quality) {
			this.preview.header.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
			this.preview.header.addClass("quality-" + this.item.quality);
			this.preview.itemMeta.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
			this.preview.itemMeta.addClass("quality-" + this.item.quality);
			this.preview.itemQuality.html(builder.qualityMap[this.item.quality]);
			this.preview.setBonus.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
			this.preview.setBonus.addClass("quality-" + this.item.quality);
		}
		// Update the Type
		if(this.item.type) {
			this.item.typeName = this.itemTypeSelect.find(":selected").text();
			this.preview.itemType.html(this.item.typeName);
		}
		// No sockets? Empty the UL
		if(this.item.socketCount == 0) {
			this.preview.sockets.empty();
		}
		if(this.item.setBonus) {
			this.preview.setBonus.empty();
			var bonusData = this.getBonusHtml(this.item.setBonus);
			this.preview.setBonus.append(
				bonusData.name,
				bonusData.list
			);
		}
		// Update the Selects for the Sockets
		for(i = 0; i < this.item.socketCount; i++) {
			if(!this.preview.sockets.find("#socket"+i).length) {
				var select = $("<select name='socket" + i + "' id='socket" + i + "' tabindex='150'>");
				select.append($("<option value=''>Empty</option>"));
				_.each(gems, function(v,k) {
					var option = $("<option>"),
							idx = 3; // Default to 3 for most items
					// Is this a helm?
					if(_.indexOf(['spirit-stone', 'wizard-hat', 'helm', 'voodoo-mask'], this.item.type) >= 0) {
						idx = 1;
					}
					// Is this a weapon?
					if(this.item.itemClass == "weapon") {
						idx = 2;
					} 
					option.val(k);
					option.html(v[0] + " (" + v[idx] + ")");
					if(this.item.sockets && this.item.sockets[i] && this.item.sockets[i] == k) {
						option.attr("selected", "selected");
					}
					select.append(option);
				}, this);
				this.preview.sockets.append($("<li>").append(select));
			}
		}
		// Update the Attributes if nessicary
		_.each(this.item.attrs, function(v, k) {
			if(!this.preview.attrs.find("input[name=" + k + "]").length) {
				var container = $("<span>"),
						input = "<input type='text' value='" + v + "' name='" + k + "' tabindex='100'>", 
						helper = builder.skillText[k];
				helper = helper.replace(/VVV/, input);					
				container.append(helper);
				if(_.indexOf(['minmax-damage', 'arcane-damage', 'cold-damage', 'fire-damage', 'holy-damage', 'lightning-damage', 'poison-damage'], k) >= 0) {
					if(v == 0) {
						container.find("input").val("0-0").addClass("minmax");
					} else {
						// console.log(v);
						container.find("input").val(v.min + "-" + v.max).addClass("minmax");
					}
				}
				container.find("input").keyup(function() { 
					builder.updateAttribute($(this).attr("name"), $(this).val());
				});
				builder.preview.attrs.append($("<li id='input-" + k + "'>").html(container));				
			}
		}, this);
		// Add stats relevant to the Item's Class
		switch(builder.item.itemClass) {
			case "none":
				builder.preview.statsPrimary.empty();
				builder.preview.statsRange.empty();
				builder.preview.statsPercent.empty();					
				break;
			case "armor":
				if(!builder.preview.statsPrimary.find("input[name=stat_armor]").length || builder.preview.statsPercent.find("input[name=block-chance]").length) {
					var armor = $("<input name='stat_armor' tabindex='50'>");
					if(builder.item.stats.armor) {
						armor.val(builder.item.stats.armor);
					}
					armor.keyup(function() {
						builder.updateStat("armor", $(this).val());
					});
					builder.preview.statsPrimaryValue.empty().append(armor);
					builder.preview.statsPrimaryHelper.html("Armor");
					builder.preview.statsPrimary.empty().append(this.preview.statsPrimaryValue, this.preview.statsPrimaryHelper);
					builder.preview.statsRange.empty();
					builder.preview.statsPercent.empty();					
				}
				break;
			case "weapon":
				if(!builder.preview.statsPrimary.find("input[name=stat_dps]").length) {
					var dps = $("<input name='stat_dps' tabindex='50'>"),
							min = $("<input name='stat_damage-min' tabindex='50'>"),
							max = $("<input name='stat_damage-max' tabindex='50'>"),
							speed = $("<input name='stat_speed' tabindex='50'>");
					if(builder.item.stats.dps) {
						dps.val(builder.item.stats.dps);
					}						
					if(builder.item.stats.damage && builder.item.stats.damage.min) {
						min.val(builder.item.stats.damage.min);
					}						
					if(builder.item.stats.damage && builder.item.stats.damage.max) {
						max.val(builder.item.stats.damage.max);
					}						
					if(builder.item.stats.speed) {
						speed.val(builder.item.stats.speed);
					}						
					dps.keyup(function() {
						builder.updateStat("dps", $(this).val());
					});
					min.keyup(function() {
						builder.updateStat("damage-min", $(this).val());
					});
					max.keyup(function() {
						builder.updateStat("damage-max", $(this).val());
					});
					speed.keyup(function() {
						builder.updateStat("speed", $(this).val());
					});
					builder.preview.statsPrimaryValue.empty().append(dps);
					builder.preview.statsPrimaryHelper.html("DPS");
					builder.preview.statsPrimary.empty().append(this.preview.statsPrimaryValue, this.preview.statsPrimaryHelper);
					builder.preview.statsRangeValue.empty().append(min, "-", max);
					builder.preview.statsRangeHelper.html("Damage");
					builder.preview.statsRange.empty().append(this.preview.statsRangeValue, this.preview.statsRangeHelper);
					builder.preview.statsPercentValue.empty().append(speed);
					builder.preview.statsPercentHelper.html("Attacks per Second");
					builder.preview.statsPercent.empty().append(this.preview.statsPercentValue, this.preview.statsPercentHelper);
				}
				break;
			case "shield":
				if(!builder.preview.statsPercent.find("input[name=stat_block-chance]").length) {
					var tarmor = $("<input name='stat_armor' tabindex='50'>"),
							tmin = $("<input name='stat_block-min' tabindex='50'>"),
							tmax = $("<input name='stat_block-max' tabindex='50'>"),
							tchance = $("<input name='stat_block-chance' tabindex='50'>");
					tarmor.keyup(function() {
						builder.updateStat("armor", $(this).val());
					});
					tmin.keyup(function() {
						builder.updateStat("block-min", $(this).val());
					});
					tmax.keyup(function() {
						builder.updateStat("block-max", $(this).val());
					});
					tchance.keyup(function() {
						builder.updateStat("block-chance", $(this).val());
					});
					builder.preview.statsPrimaryValue.empty().append(tarmor);
					builder.preview.statsPrimaryHelper.html("Armor");
					builder.preview.statsPrimary.empty().append(this.preview.statsPrimaryValue, this.preview.statsPrimaryHelper);
					builder.preview.statsRangeValue.empty().append(tmin, "-", tmax);
					builder.preview.statsRangeHelper.html("Block Value");
					builder.preview.statsRange.empty().append(this.preview.statsRangeValue, this.preview.statsRangeHelper);
					builder.preview.statsPercentValue.empty().append(tchance);
					builder.preview.statsPercentHelper.html("Block Chance");
					builder.preview.statsPercent.empty().append(this.preview.statsPercentValue, this.preview.statsPercentHelper);
				}
				break;
		}
		// Look through the attribute values to see if we need to remove any (deselected)
		this.preview.attrs.find("li").each(function() {
			// Check to see if we're in the attributes
			var nameCheck = $(this).find("input").attr("name").replace("-max", "").replace("-min", "");
			// console.log(builder.attrsSelected, nameCheck);
			if(_.indexOf(builder.attrsSelected, nameCheck) < 0) {
				$(this).remove();
			}
		});
	},
	// Create the Item Preview
	init: function() {
		// Bind the Selects/Inputs on the page
		this.bindNameInput();
		this.bindQualitySelect();
		this.bindItemTypeSelect();
		this.bindAttributeSelect();
		this.bindSocketSelect();
		// Create the Item Preview Area
		this.initPreview();
	}, 
	// Add an element to the header
	addHeader: function(element) {
		this.headerElements.push(element);
		this.preview.header.append(element);
	},
	// Add an element to the footer
	addFooter: function(element) {
		this.footerElements.push(element);
		this.preview.footer.append(element);
	},
	// Sets the Item 
	setItem: function(item) {
		// Set the Item
		this.item = item;
		// Adjust the Socket Count
		if(item.sockets) {
			this.item.socketCount = item.sockets.length;			
		}
		// Adjust the Set
		this.item.setBonus = item.set;
		// Update the Fields
		this.qualitySelect.trigger("change");
		this.itemTypeSelect.trigger("change");
		this.attributeSelect.trigger("change");
		this.updatePreview();
	},
	// Returns the Item Object for parsing
	getItem: function() {
		return this.item;
	},
	getBonusHtml: function(setBonus) {
		var bonuses = $("<ul class='bonuses'>"),
				bonus = setBonuses[setBonus];
		if(!bonus) {
			return '';
		}
		if(bonus.effect) {
			_.each(bonus.effect, function(v,k) {
				if(k) {
					var amountContainer = $("<div class='data-count'>"),
							amountLabel = $("<p>").html("(" + k + ") Set:");
							amountBonus = $("<ul class='amountBonus'>");
					amountContainer.attr("data-count", k);
					_.each(v, function(value, stat) {
						var li = $("<li>"),
								attr = this.skillText[stat];
						if(attr) {
							if(value <= 1) {
								attr = attr.replace(/VVV/, Math.round(value * 100 * 100) / 100);									
							} else {
								attr = attr.replace(/VVV/, value);									
							}
							li.html(attr);
							amountBonus.append(li);							
						}
					}, this);
					amountContainer.append(amountLabel,amountBonus);
					bonuses.append(amountContainer);						
				}
			}, this);				
		}
		return {
			name: $("<p class='bonusName'>").html(bonus.name),
			list: bonuses
		};
	}
};
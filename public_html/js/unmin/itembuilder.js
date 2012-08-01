var itemBuilder = {
	item: {
		type: null,								// Type of Item
		attrs: {},								// Storage for Attributes
		stats: {},								// Storage for Stats
	},
	headerElements: [],
	footerElements: [],
	attrsSelected: [],
	attributeSelect: null,		// Selector for the Attribute Selector
	itemTypeSelect: null,			// Selector for the Item's Type
	preview: {},
	itemPreview: null,				// Selector for the Item's Preview
	itemClass: {
		"none": ["amulet", "ring", "mojo", "source", "quiver"],
		"armor": ["belt","boots","bracers","chest-armor","cloak","gloves","helm","pants","mighty-belt","shoulder","spirit-stone","voodoo-mask","wizard-hat"],
		"weapon": ["2h-mace","2h-axe","bow","diabo","crossbow","2h-mighty","polearm","staff","2h-sword","axe","ceremonial-knife","hand-crossbow","dagger","fist-weapon","mace","mighty-weapon","spear","sword","wand"],	
		"shield": ["shield"],
	},
	skillText: {
		'strength': '+VVV Strength',
		'intelligence': '+VVV Intelligence',
		'vitality': '+VVV Vitality',
		'dexterity': '+VVV Dexterity',
		'resist-all': '+VVV Resistance to All Elements',
		'armor': '+VVV Armor',
		'plus-life': '+VVV% Life',
		'life-regen': 'Regenerates VVV Life per Second',
		'plus-block': '+VVV% Chance to Block',
		'cc-reduce': 'Reduces the duration of control impairing effects by VVV%',
		'elite-reduce': 'Reduces damage from elites by VVV%',
		'melee-reduce': 'Reduces damage from melee attacks by VVV%',
		'range-reduce': 'Reduces damage from ranged attacks by VVV%',
		'arcane-resist': '+VVV Arcane Resistance',
		'cold-resist': '+VVV Cold Resistance',
		'fire-resist': '+VVV Fire Resistance',
		'lightning-resist': '+VVV Lightning Resistance',
		'physical-resist': '+VVV Physical Resistance',
		'poison-resist': '+VVV Poison Resistance',
		'thorns': 'Melee attackers take VVV damage per hit',
		'attack-speed': 'Attack speed increased by VVV%',
		'critical-hit': 'Critical Hit Chance increased by VVV%',
		'critical-hit-damage': 'Critical Hit Damage increased by VVV%',
		'plus-damage': '+VVV% Damage',
		'min-damage': '+VVV Minimum Damage',
		'max-damage': '+VVV Maximum Damage',
		'arcane-damage': '+VVV Arcane Damage',
		'cold-damage': '+VVV Cold Damage',
		'fire-damage': '+VVV Fire Damage',
		'holy-damage': '+VVV Holy Damage',
		'lightning-damage': '+VVV Lightning Damage',
		'poison-damage': '+VVV Poison Damage',
		'elite-damage': 'Increases Damage against Elites by VVV%',
		'chance-bleed': 'VVV% chance to inflict Bleed for VVV damage over 5 seconds',
		'chance-blind': 'VVV% chance to Blind on Hit',
		'chance-chill': 'VVV% chance to Chill on Hit',
		'chance-fear': 'VVV% chance to Fear on Hit',
		'chance-freeze': 'VVV% chance to Freeze on Hit',
		'chance-immobilize': 'VVV% chance to Immobilize on Hit',
		'chance-knockback': 'VVV% chance to Knockback on Hit',
		'chance-slow': 'VVV% chance to Slow on Hit',
		'chance-stun': 'VVV% chance to Stun on Hit',
		'plus-movement': '+VVV% Movement Speed',
		'plus-pickup-radius': 'Increases Gold and Health pickup by VVV yards',
		'plus-experience': 'Monster kills grant +VVV experience',
		'plus-gold-find': '+VVV% Extra Gold from Monsters',
		'plus-magic-find': 'VVV% Better Chance of finding Magic Items',
		'health-globes': 'Health Globes grant +VVV Life',
		'life-steal': 'VVV% of Damage Dealt is Converted to Life (Steal)',
		'life-kill': '+VVV Life after each Kill',
		'life-hit': 'Each hit adds +VVV Life',
		'level-reduce': 'Level Requirement reduced by VVV',
		'indestructable': 'Ignores durability loss',
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
		'fury-max': '+VVV Maximum Fury',
		'hatred-regen': 'Increases Hatred Regeneration by VVV per Second',
		'max-discipline': '+VVV Maximum Discipline',
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
		'mana-regen': 'Increases Mana Regeneration by VVV per Second',
		'mana-max': '+VVV Maximum Mana',
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
	// Set the Item Preview Area
	setItemPreview: function(element) {
		this.itemPreview = element;
	},
	// Set the Item Type selector
	setItemTypeSelect: function(element) {
		this.itemTypeSelect = element;
	},
	bindItemTypeSelect: function() {
		var selector = this.itemTypeSelect,
				builder = this;
		selector.bind('change', function() {
			builder.item.type = $(this).val();
			builder.removeStats();
			_.each(builder.itemClass, function(v,k) {
				if(_.indexOf(v, $(this).val()) >= 0) {
					builder.item.class = k;
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
	// Add a stat to this.item.stats
	addStat: function(name) {
		if(!this.item.stats[name]) {
			this.item.stats[name] = 0;
		}
	},
	// Update the Value of a Stat
	updateStat: function(name, value) {
		console.log(name, value);
		this.item.stats[name] = parseFloat(value);
	},
	removeStat: function(name) {
		delete this.item.stats[name];
	},
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
	removeAttribute: function(name) {
		delete this.item.attrs[name];
	},
	removeAttributes: function(name) {
		delete this.item.attrs = {};
	},
	// Initialize the Preview
	initPreview: function() {
		// Build a bunch of HTML for the Preview
		var container = this.itemPreview;
		this.preview.header = $("<div class='top'><p></p></div>");
		this.preview.body = $("<div class='item'>");
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
				this.preview.statsPrimary, 
				this.preview.statsRange, 
				this.preview.statsPercent, 
				this.preview.attrs, 
				this.preview.sockets
			), 
			this.preview.footer
		);
	},
	// Update the Item Preview
	updatePreview: function() {
		var builder = this;
		_.each(this.item.attrs, function(v, k) {
			if(!this.preview.attrs.find("input[name=" + k + "]").length) {
				var container = $("<span>"),
						input = "<input type='text' value='" + v + "' name='" + k + "'>", 
						helper = builder.skillText[k];
				helper = helper.replace(/VVV/, input);
				container.append(helper);
				container.find("input").keyup(function() { 
					builder.updateAttribute($(this).attr("name"), $(this).val());
				});
				builder.preview.attrs.append($("<li id='input-" + k + "'>").html(container));				
			}
		}, this);
		switch(builder.item.class) {
			case "none":
				builder.removeStats();
				builder.preview.statsPrimary.empty();
				builder.preview.statsRange.empty();
				builder.preview.statsPercent.empty();					
				break;
			case "armor":
				if(!builder.preview.statsPrimary.find("input[name=armor]").length || builder.preview.statsPercent.find("input[name=block-chance]").length) {
					builder.removeStats();
					var armor = $("<input name='armor'>");
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
				if(!builder.preview.statsPrimary.find("input[name=dps]").length) {
					builder.removeStats();
					var dps = $("<input name='dps'>"),
							min = $("<input name='damage-min'>"),
							max = $("<input name='damage-max'>"),
							speed = $("<input name='speed'>");
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
				if(!builder.preview.statsPercent.find("input[name=block-chance]").length) {
					builder.removeStats();
					var armor = $("<input name='armor'>"),
							min = $("<input name='block-min'>"),
							max = $("<input name='block-max'>"),
							chance = $("<input name='block-chance'>");
					armor.keyup(function() {
						builder.updateStat("armor", $(this).val());
					});
					min.keyup(function() {
						builder.updateStat("block-min", $(this).val());
					});
					max.keyup(function() {
						builder.updateStat("block-max", $(this).val());
					});
					chance.keyup(function() {
						builder.updateStat("block-chance", $(this).val());
					});
					builder.preview.statsPrimaryValue.empty().append(armor);
					builder.preview.statsPrimaryHelper.html("Armor");
					builder.preview.statsPrimary.empty().append(this.preview.statsPrimaryValue, this.preview.statsPrimaryHelper);
					builder.preview.statsRangeValue.empty().append(min, "-", max);
					builder.preview.statsRangeHelper.html("Block Value");
					builder.preview.statsRange.empty().append(this.preview.statsRangeValue, this.preview.statsRangeHelper);
					builder.preview.statsPercentValue.empty().append(chance);
					builder.preview.statsPercentHelper.html("Block Chance");
					builder.preview.statsPercent.empty().append(this.preview.statsPercentValue, this.preview.statsPercentHelper);
				}
				break;
		}
		this.preview.attrs.find("li").each(function() {
			if(_.indexOf(builder.attrsSelected, $(this).find("input").attr("name")) < 0) {
				$(this).remove();
			}
		});

	},
	// Create the Item Preview
	init: function() {
		// Bind the Selects on the page
		this.bindItemTypeSelect();
		this.bindAttributeSelect();
		// Create the Item Preview Area
		this.initPreview();
	}, 
	addHeader: function(element) {
		this.headerElements.push(element);
		this.preview.header.append(element);
	},
	addFooter: function(element) {
		this.footerElements.push(element);
		this.preview.footer.append(element);
	},
	getItem: function() {
		return this.item;
	}
}
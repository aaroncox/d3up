var buildCalculator = {
	class: null,					// Hero Class
	gearSelector: null,		// Where is the gear on the page?
	passiveSkills: [],		// What passives are active?
	activeSkills: [],			// Which active skills do we use?
	// Storage
	gear: {},
	attrs: {},
	stats: {},
	bonuses: {},
	values: {},
	// Options
	vsLevel: 60,
	// Flags
	isDuelWielding: false,	
	init: function() {
		this.stats = {
			armor: 0,
			'block-chance': 0,
			'speed': 0
		};
		this.attrs = {
			primary: null,
			strength: 0,
			dexterity: 0,
			intelligence: 0,
			vitality: 0,
			'plus-life': 0,
			armor: 0,
			'cold-resist': 0,
			'lightning-resist': 0,
			'fire-resist': 0,
			'arcane-resist': 0,
			'poison-resist': 0,
			'physical-resist': 0,
			'plus-block': 0, 
			'critical-hit': 5,
			'critical-hit-damage': 50,
			'melee-reduce': 0,
			'range-reduce': 0,
			'elite-reduce': 0,
			'resist-all': 0,
		};
		this.gear = {};
		this.values = {};
		this.bonuses = {
			'plus-resist-all': 0,
			'plus-armor': 0,
			'plus-dodge': 0,
		};
	},
	setClass: function(newClass) {
		// Set Base stats based on class
		switch(newClass) {
			case "wizard":
			case "witch-doctor":
				this.attrs['primary'] = 'intelligence';
				this.attrs['strength'] += 67;
				this.attrs['dexterity'] += 67;
				this.attrs['intelligence'] += 187;
				break;
			case "barbarian":
				this.attrs['primary'] = 'strength';
				this.attrs['strength'] += 187;
				this.attrs['dexterity'] += 67;
				this.attrs['intelligence'] += 67;
				break;
			case "demon-hunter":
			case "monk":
				this.attrs['primary'] = 'dexterity';
				this.attrs['strength'] += 67;
				this.attrs['dexterity'] += 187;
				this.attrs['intelligence'] += 67;
				break;
		}
		this.attrs['vitality'] += 127; // Grant base vitality to all classes
		this.class = newClass;
	},
	getClass: function() {
		return this.class;
	},
	setPassives: function(array) {
		this.passiveSkills = array();
	},
	addBonus: function(effect, value) {
		if(this.bonuses[effect]) {
			this.bonuses[effect] += value;								
		} else {
			this.bonuses[effect] = value;
		}
	},
	setVsLevel: function(level) {
		this.vsLevel = level;
	},
	setGear: function(gearSelector) {
		// Empty object to populate
		var json = {};
		// Set the selector incase we need to reference it
		this.gearSelector = gearSelector;
		// Foreach of the pieces of gear, add the JSON to the array
		$(this.gearSelector).each(function() {
			var slot = $(this).parent().data("slot"),		// Get the slot this gear is in
					data = $(this).data("json");						// Get the JSON for this gear
			json[slot] = data;
		});
		// Assign the JSON to this.gear
		this.gear = json;
		// Parse Item Information into this.stats & this.attrs
		_.each(this.gear, this.parseItem, this);
	},
	getItem: function(slot) {
		return this.gear[slot];
	},
	setPassives: function(passives) {
		this.passiveSkills = passives;
	},
	getItemLink: function(item) {
		if(item == null) {
			return '';
		}
		var link = $("<a href='/i/" + item.id + "' class='quality-" + item.quality + "'/>").attr("data-json", JSON.stringify(item)).html(item.name);
		link.bindTooltip();
		return link;
	},
	applyPassives: function() {
		_.each(this.passiveSkills, function(v,k) {
			if(typeof passives[this.class][v]['effect'] != "undefined") {
				// console.log(k,v);
				_.each(passives[this.class][v]['effect'], function(value, effect) {
					// console.log(value, effect);
					switch(effect) {
						case "sharpshooter":
							this.bonuses['sharpshooter'] = true;
							// TODO
							// mathDpsSpecialName = 'Sharpshooter';
							// mathDpsSpecial = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * this.stats['speed']) * mathSpeedAdditive * (primaryAttr / 100 + 1) * 1 * ((100 / 100) * (mathCriticalHitDamage/100)+ 1);
							// mathDpsSpecial = Math.round(mathDps * 100) / 100;
							break;
						case "plus-thorns":
						case "plus-armor":
						case "plus-resist-all":	
						case "plus-damage": 
							this.addBonus(effect, value);
							break;
						case "flatten-resists":
							var highest = 0, 
									resistArray = ['fire-resist', 'cold-resist', 'arcane-resist', 'lightning-resist', 'poison-resist', 'physical-resist'];
							_.each(resistArray, function(k) {
								if(this.attrs[k] > 0 && this.attrs[k] > highest) {
									highest = this.attrs[k];
								}
							}, this);
							_.each(resistArray, function(r) {
								this.attrs[r] = highest;
							},this);
							// this.attrs['resist-all'] = highest;
							// console.log(this.attrs['resist-all'], highest, this.attrs['resist-all'] + highest);
							this.bonuses['flatten-resists'] = true;
							break;
						case "melee-reduce":
						case "plus-movement-speed":
						case "max-spirit":
						case "max-hatred":
						case "max-fury":
						case "life-steal":								
						case "cc-reduce":
							if(this.attrs[effect]) {
								this.attrs[effect] += (value * 100); 
							} else {
								this.attrs[effect] = value * 100;
							}
							break;
						case "damage-reduce":
							// mathDamageReduce = mathDamageReduce * (1 + value);
							break;
						case "health-globes":
							// if(attrs['health-globes'] && attrs['health-globes'] > 0) {
							// 	attrs['health-globes'] = attrs['health-globes'] * (1 + value);									
							// }
							break;								
						case "critical-to-dodge":
							this.bonuses['critical-to-dodge'] = true;
							break;							
						case "dexterity-to-armor":								
							this.stats['armor'] = this.stats['armor'] + (this.attrs['dexterity'] * value);
							// mathReduction = mathArmor / (50 * vsLevel + mathArmor);
							// mathDamageReduce = (Math.round(mathReduction * 100 * 100)/100);
							break;
						case "vitality-to-armor":
							this.stats['armor'] = this.stats['armor'] + (this.attrs['vitality'] * value);
							break;
						case "critical-hit-damage":
							this.attrs['critical-hit-damage'] = this.attrs['critical-hit-damage'] + (value * 100);
							break;
						case "plus-mana":
							// if(attrs['max-mana']) {
							// 	attrs['max-mana'] = attrs['max-mana'] + (attrs['max-mana'] * value);
							// }
							break;
						case "critical-hit":
							this.attrs['critical-hit'] = this.attrs['critical-hit'] + (value * 100);
							break;
						case "switch":
							if(value.var == 'isDuelWielding') {
								_.each(value.cases, function(c, i) {
									if(c.case == this.isDuelWielding) {
										_.each(c.effect, function(eff, e) {
											switch(e) {
												case "plus-dodge":
													this.bonuses['plus-dodge'] += eff;
													break;
											}
										}, this);
									} 
								}, this);
							}
							// console.log(value.var);
							if(typeof this.gear[value.var] != "undefined") {
								// console.log(value.cases);
								_.each(value.cases, function(c, i) {
									var match = false;
									// console.log(c,i);
									_.each(c.case.split("|"), function(l, n) {
										// console.log("now", value.var, value.lookup, this.gear[value.var][value.lookup], this.gear);
										if(l == this.gear[value.var][value.lookup]) {
											_.each(c.effect, function(eff, e) {
												switch(e) {
													case 'plus-damage':
														if(this.bonuses['plus-damage']) {
															this.bonuses['plus-damage'] += eff;
														} else {
															this.bonuses['plus-damage'] = eff;
														}
														break;
													case "critical-hit-damage":
														this.attrs['critical-hit-damage'] = this.attrs['critical-hit-damage'] + (eff * 100);
														// console.log("up chd" , this.attrs['critical-hit-damage']);
														break;
													case "attack-speed": 
														if(this.attrs['attack-speed-incs']) {
															this.attrs['attack-speed-incs'] += eff;															
														} else {
															this.attrs['attack-speed-incs'] = eff;
														}
														break;
													case "critical-hit":
														this.attrs['critical-hit'] = this.attrs['critical-hit'] + (eff * 100);														
														break;
													default:
													 	console.log("Unhandled Switch: " + e + " [" + eff + "]");
														break;
												}													
											}, this)
										}
									}, this);
								}, this);
							}
							break;
						default:
							console.log("Unhandled Effect: " + effect + "[" + value + "]");
							break;
					}
				}, this);						
			
			}
		}, this);
	},
	run: function() {
		// Apply all of the passive bonuses into the this.bonuses array for use in the math below
		this.applyPassives();
		// ----------------------------------
		// Math for Life Statistics 
		// ----------------------------------
		this.values.life = 36 + 4 * 60 + (60 - 25) * this.attrs['vitality'];
		this.values.lifeTotal = this.values.life + (this.values.life * (this.attrs['plus-life'] * 0.01));
		// ----------------------------------
		// Math for Armor/Resist Statistics 
		// ----------------------------------
		this.values.armor = (this.stats['armor'] + this.attrs['strength'] + this.attrs['armor']) * (1 + this.bonuses['plus-armor']);
		this.values.armorReduction = this.values.armor / (50 * this.vsLevel + this.values.armor);
		this.values.allResist = (this.attrs['resist-all'] + (this.attrs['intelligence'] / 10)) * (1 + this.bonuses['plus-resist-all']);
		this.values['resist-physical'] = (this.values.allResist + this.attrs['physical-resist']);
		this.values['resist-cold'] = (this.values.allResist + this.attrs['cold-resist']);
		this.values['resist-fire'] = (this.values.allResist + this.attrs['fire-resist']);
		this.values['resist-lightning'] = (this.values.allResist + this.attrs['lightning-resist']);
		this.values['resist-poison'] = (this.values.allResist + this.attrs['poison-resist']);
		this.values['resist-arcane'] = (this.values.allResist + this.attrs['arcane-resist']);
		// Adjust All resist to match Flatten Resist
		if(this.bonuses['flatten-resists']) {
			this.values.allResist += this.attrs['physical-resist']; // This could be any, but since they are the same, doesn't matter
		}
		// ----------------------------------
		// After all modifications, determine percentages for display
		// ----------------------------------
		this.values['resper-all'] = this.values.allResist / (5 * this.vsLevel + this.values.allResist);
		this.values['resper-physical'] = this.values['resist-physical'] / (5 * this.vsLevel + this.values['resist-physical']);
		this.values['resper-cold'] = this.values['resist-cold'] / (5 * this.vsLevel + this.values['resist-cold']);
		this.values['resper-fire'] = this.values['resist-fire'] / (5 * this.vsLevel + this.values['resist-fire']);
		this.values['resper-lightning'] = this.values['resist-lightning'] / (5 * this.vsLevel + this.values['resist-lightning']);
		this.values['resper-poison'] = this.values['resist-poison'] / (5 * this.vsLevel + this.values['resist-poison']);
		this.values['resper-arcane'] = this.values['resist-arcane'] / (5 * this.vsLevel + this.values['resist-arcane']);
		// Block Mechanics 
		this.values.blockChance = this.stats['block-chance'] + this.attrs['plus-block'];
		// ----------------------------------
		// Math for Dodge Calculation
		// ----------------------------------
		var dodgeValue = dodge = this.attrs['dexterity'];	// Set DodgeValue = Dexterity
		// Set a base value of 0
		this.values.dodgePercent = 0;
		// Loop through the dodge brackets and add to the dodgePercent
		_.each([[100,0.100], [400,0.025], [500,	0.020], [7000,0.010]], function(v,k){
			// If our dodge is higher than the cap for this bracket, subtract the upper and add the percentage
			if(dodgeValue > v[0]) {
				dodgeValue -= v[0];
				this.values.dodgePercent += v[0] * v[1];
			} else {
				// If we have less than allowed in the bracket, zero out the dogde and add the percentage
				this.values.dodgePercent += dodgeValue * v[1]; 
				dodgeValue = 0;
			}
		}, this);
		if(this.bonuses['critical-to-dodge']) {
			this.values.dodgePercent += this.attrs['critical-hit'] * 0.30;
		}
		this.values.dodgePercent += (this.bonuses['plus-dodge'] * 100);
		// ----------------------------------
		// Effective Health Calculations
		// ----------------------------------
		// Are we a Monk or Barbarian? need to add 30% bonus
		if(this.class == "monk" || this.class == "barbarian") {
			this.values.damageTaken = (1 - this.values['resper-all']) * (1 - this.values.armorReduction) * (1 - 0.3);
			this.values['ehp-physical'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-physical']) * (1 - 0.3));
			this.values['ehp-cold'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-cold']) * (1 - 0.3));
			this.values['ehp-fire'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-fire']) * (1 - 0.3));
			this.values['ehp-lightning'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-lightning']) * (1 - 0.3));
			this.values['ehp-poison'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-poison']) * (1 - 0.3));
			this.values['ehp-arcane'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-arcane']) * (1 - 0.3));
		} else {
			// Do normally for other classes
			this.values.damageTaken = (1 - this.values['resper-all']) * (1 - this.values.armorReduction);
			this.values['ehp-physical'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-physical']));
			this.values['ehp-cold'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-cold']));
			this.values['ehp-fire'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-fire']));
			this.values['ehp-lightning'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-lightning']));
			this.values['ehp-poison'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-poison']));
			this.values['ehp-arcane'] = this.values.lifeTotal / ((1 - this.values.armorReduction) * (1 - this.values['resper-arcane']));			
		}
		// Finally Calculate the EHP for all
		this.values['ehp'] = this.values.lifeTotal / this.values.damageTaken;
		// Calculate the Damage Taken for special cases (dodge, melee, ranged, elite)
		this.values['ehp-dodge'] = this.values.lifeTotal / (this.values.damageTaken * (1 - this.values.dodgePercent / 100));
		this.values['ehp-melee'] = this.values.lifeTotal / (this.values.damageTaken * (1 - this.attrs['melee-reduce'] / 100));
		this.values['ehp-range'] = this.values.lifeTotal / (this.values.damageTaken * (1 - this.attrs['range-reduce'] / 100 / 100));
		this.values['ehp-elite'] = this.values.lifeTotal / (this.values.damageTaken * (1 - this.attrs['elite-reduce'] / 100 / 100));
		// Some Wackyness to calculate EHP without each piece
		_.each(this.gear, function(g, i) {
			var item = i;
			// Unset the Item from the stats
			this.removeItem(i);
			// Grab stats and get things ready for EHP calculations
			var vitality = this.attrs['vitality'], 
					resistAll = this.attrs['resist-all'],
					intelligence = this.attrs['intelligence'],
					armor = this.stats['armor'],
					strength = this.attrs['strength'],
					plusLife = this.attrs['plus-life'], 
					bonusArmor = this.attrs['armor'];
			// Special case for monks flatten resists
			// if(this.bonuses['flatten-resists']) {
			// 	var highest = 0, 
			// 			resistArray = ['fire-resist', 'cold-resist', 'arcane-resist', 'lightning-resist', 'poison-resist', 'physical-resist'];
			// 	_.each(resistArray, function(k) {
			// 		if(this.attrs[k] > 0 && this.attrs[k] > highest) {
			// 			highest = this.attrs[k];
			// 		}
			// 	}, this);
			// 	resistAll = highest;
			// }
			// Do the EHP calculations without those stats
			var life = 36 + 4 * 60 + (60 - 25) * vitality,
					lifeTotal = life + (life * (plusLife / 100)),
					tArmor = (armor + strength + bonusArmor) * (1 + this.bonuses['plus-armor']),
					tArmorReduction = tArmor / (50 * this.vsLevel + tArmor),
					tResistAll = (resistAll + (intelligence / 10)) * (1 + this.bonuses['plus-resist-all']),
					tResistAllPercent = tResistAll / (5 * this.vsLevel + tResistAll), 
					damageTaken = (1 - tResistAllPercent) * (1 - tArmorReduction);
			// Add Barb/Monk Bonuses
			if(this.class == "monk" || this.class == "barbarian") {
				damageTaken = (1 - tResistAllPercent) * (1 - tArmorReduction) * (1 - 0.3);
			}
			// Calculate the difference in EHP if you took this piece off
			this.values['ehp-' + i] = this.values['ehp'] - (lifeTotal / damageTaken);
			// Readd the Item to the set
			this.parseItem(g, i);
			// Reparse Passives
		}, this);
		// ----------------------------------
		// Define Offensive Statistics before Passives so we can add to them
		// ----------------------------------
		this.values['dps-speed'] = this.stats['speed'];
		this.values['dps-damage'] = this.stats['damage'];
		this.values['dps'] = 0;
		// Do we have a weapon?
		if(this.values['dps-damage']) {
			this.values['dps'] = this.calculateDps();
		}
		if(this.isDuelWielding) {
			this.values['dps-speedTotal'] = Math.round(this.values['dps-speed'].mh * (1 + this.values['dps-addAttackSpeed'] + 0.15) * 100)/100;
		} else {
			this.values['dps-speedTotal'] = Math.round(this.values['dps-speed'] * (1 + this.values['dps-addAttackSpeed']) * 100)/100;
		}
		// if(this.bonuses['sharpshooter']) {
		// 	var oldCrit = this.attrs['critical-hit'];
		// 	this.attrs['critical-hit'] = 100;
		// 	this.values['dps-sharpshooter'] = this.calculateDps();
		// 	this.attrs['critical-hit'] = oldCrit;
		// 	console.log(this.values['dps-sharpshooter'])
		// }
		// Some Wackyness to calculate DPS contributions per piece
		_.each(this.gear, function(g, i) {
			var item = i;
			// Unset the Item from the stats
			this.removeItem(i);
			// Don't deal with MH/OH atm
			// if(i != "mainhand" && i != "offhand") {
				// Calculate the difference in DPS if you took this piece off
				if(this.values['dps-damage']) {
					this.values['dps-' + i] = this.values['dps'] - this.calculateDps();				
				}
			// }
			// Readd the Item to the set
			this.parseItem(g, i);
		}, this);
		// Append Attributes into the values
		this.values = jQuery.extend(this.attrs, this.values);
		// Return the values
		return this.values;
	},
	calculateDps: function() {
		var dps = 0; // Value to Return
		this.values['dps-addDamageAvg'] = 0;
		this.values['dps-addDamageMin'] = 0;
		this.values['dps-addDamageMax'] = 0;
		if(this.stats['damage-oh']) {
			this.values['dps-damage-oh'] = this.stats['damage-oh'];
		}
		// Calculate the Average and Min/Max Bonus Damage from other items
		if(this.attrs['max-damage'] || this.attrs['min-damage']) {
			this.values['dps-addDamageAvg'] = (((this.attrs['max-damage'])?this.attrs['max-damage']:0) + ((this.attrs['min-damage'])?this.attrs['min-damage']:0)) / 2;
			if(this.attrs['min-damage']) {
				this.values['dps-addDamageMin'] = this.attrs['min-damage'];				
			}
			if(this.attrs['max-damage']) {
				this.values['dps-addDamageMax'] = this.attrs['max-damage'];
			}
		}
		// Calculate Attack Speed Bonuses
		this.values['dps-addAttackSpeed'] = (this.attrs['attack-speed-incs']) ? this.attrs['attack-speed-incs'] : 0;
		// Are we duel wielding?
		if(this.isDuelWielding) {
			this.values['dps-speed'] = {
				mh: Math.floor(this.stats['speed'] * 1024) / 1024,
				oh: Math.floor(this.stats['speed-oh'] * 1024) / 1024,
			};
			// console.log(this.values['dps-speed'].mh, this.values['dps-speed'].oh);
			var mathS = ((this.values['dps-damage'].min + this.values['dps-damage'].max + this.values['dps-damage-oh'].min + this.values['dps-damage-oh'].max) / 2 + this.values['dps-addDamageMin'] + this.values['dps-addDamageMax']) / 2,
					mathC = (this.values['dps-speed'].mh + this.values['dps-speed'].oh) / 2,
					mathR = 1 + 0.15 + this.values['dps-addAttackSpeed'],
					mathA = 1 + this.attrs[this.attrs.primary] * 0.01,
					mathM = 1 + (this.attrs['critical-hit'] / 100) * (this.attrs['critical-hit-damage'] / 100);
			dps = mathS * mathC * mathR * mathA * mathM;			
			// console.log(mathS, mathC, mathR, mathA, mathM, dps);
		} else {
			this.values['dps-speed'] = Math.floor(this.values['dps-speed'] * 1024) / 1024;
			// console.log(this.values.dps, this.attrs[this.attrs.primary]);
			dps = (((this.values['dps-damage'].min + this.values['dps-damage'].max) / 2 + this.values['dps-addDamageAvg']) * this.values['dps-speed']) * (1 + this.values['dps-addAttackSpeed']) * (this.attrs[this.attrs.primary] / 100 + 1) * 1 * ((this.attrs['critical-hit'] / 100) * (this.attrs['critical-hit-damage']/100) + 1);
			// console.log(this.values.dps.dps);
		}
		// Add any bonus damage onto the damage calculation
		if(this.bonuses['plus-damage']) {
			return dps * (1 + this.bonuses['plus-damage']);
		}
		return dps;
	},
	removeItem: function(slot) {
		var json = this.gear[slot];
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				switch(ak) {
					case "armor":
						if(json.type == 'ring' || json.type == 'amulet') {
							this.attrs[ak] -= parseFloat(av);
						}
						break;
					case "plus-block":
						if(json.type != 'shield') {
							this.attrs[ak] -= parseFloat(av);
						}
						break;
					case "max-damage":
					case "min-damage":
						switch(json.type) {
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
							case "quiver":
							case "mojo":
							case "source":
								this.attrs[ak] -= parseFloat(av);
								break;
							default:
								break;
						}
						break;
					case "attack-speed":
						switch(json.type) {
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
							case "quiver":
							case "mojo":
							case "source":
								// console.log(json.type + " atk speed " + (av/100));
								this.attrs['attack-speed-incs'] -= (av/100);
								break;
							default:
								break;
						}
						break;
					default: 
						this.attrs[ak] -= parseFloat(av);
						break;
				}
			}, this);					
		}
		if(json.socketAttrs) {
			_.each(json.socketAttrs, function(av, ak) {
				this.attrs[ak] -= parseFloat(av);
			}, this);
		}
		if(json.stats) {
			_.each(json.stats, function(av, ak) {
				switch(ak) {
					case "speed":
						if(slot == "mainhand") {
							this.stats[ak] = 0;
						}
						if(slot == "offhand") {
							this.stats['speed-oh'] = 0;
						}
						break;
					case "damage":
						if(slot == "mainhand") {
							this.stats[ak] = {
								min: 0,
								max: 0
							};
						}							
						if(slot == "offhand") {
							this.stats['damage-oh'] = {
								min: 0,
								max: 0
							};
						}							
						break;
					case "block-amount":
						this.stats[ak] = 0;
						break;
					default:
						this.stats[ak] -= parseFloat(av);
						break;
				}
			}, this);					
		}
		this.gear[slot] = false;
		// console.log(this.stats);
	},
	parseItem: function(json, slot) {
		this.gear[slot] = json;
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				switch(ak) {
					case "armor":
						if(json.type == 'ring' || json.type == 'amulet') {
							if(this.attrs[ak]) {
								this.attrs[ak] += parseFloat(av);
							} else {
								this.attrs[ak] = parseFloat(av);
							}
						}
						break;
					case "plus-block":
						if(json.type != 'shield') {
							if(this.attrs[ak]) {
								this.attrs[ak] += parseFloat(av);
							} else {
								this.attrs[ak] = parseFloat(av);
							}									
						}
						break;
					case "max-damage":
					case "min-damage":
						switch(json.type) {
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
							case "quiver":
							case "mojo":
							case "source":
								if(this.attrs[ak]) {
									this.attrs[ak] += parseFloat(av);
								} else {
									this.attrs[ak] = parseFloat(av);
								}
								break;
							default:
								break;
						}
						break;
					case "attack-speed":
						switch(json.type) {
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
							case "quiver":
							case "mojo":
							case "source":
								if(!this.attrs['attack-speed-incs']) {
									this.attrs['attack-speed-incs'] = (av/100);
								} else {
									this.attrs['attack-speed-incs'] += (av/100);										
								}
								break;
							default:
								break;
						}
						break;
					default: 
						if(typeof(this.attrs[ak]) != "undefined") {
							this.attrs[ak] += parseFloat(av);
						} else {
							this.attrs[ak] = parseFloat(av);
						}
						break;
				}
			}, this);					
		}
		if(json.socketAttrs) {
			_.each(json.socketAttrs, function(av, ak) {
				if(typeof(this.attrs[ak]) != "undefined") {
					this.attrs[ak] += parseFloat(av);
				} else {
					this.attrs[ak] = parseFloat(av);
				}
			}, this);
		}
		if(json.stats) {
			_.each(json.stats, function(av, ak) {
				switch(ak) {
					case "speed":
						if(slot == "mainhand") {
							this.stats[ak] = parseFloat(av);
						}
						if(slot == "offhand") {
							this.isDuelWielding = true;
							this.stats['speed-oh'] = parseFloat(av);
						} else {
							this.isDuelWielding = false;
						}
						break;
					case "damage":
						if(slot == "mainhand") {
							this.stats[ak] = {
								min: av['min'],
								max: av['max']
							};
						}							
						if(slot == "offhand") {
							this.stats['damage-oh'] = {
								min: av['min'],
								max: av['max']
							};
						}							
						break;
					case "block-amount":
						this.stats[ak] = av['min'] + "-" + av['max'];
						break;
					default:
						if(this.stats[ak]) {
							this.stats[ak] += parseFloat(av);
						} else {
							this.stats[ak] = parseFloat(av);
						}					
						break;
				}
			}, this);					
		}
	},
	diff: function(s1, s2) {
		var diff = {},
				allowed = {
					'ap-max': 'Max AP', 
					'plus-movement': '+Movement', 
					'plus-magic-find': '+Magic Find', 
					'plus-gold-find': '+Gold Find', 
					'thorns': 'Thorns', 
					'life-hit': 'Life/Hit', 
					'ap-on-crit': 'AP/Crit', 
					'plus-block': '+Block', 
					'dps': 'DPS', 
					'ehp': 'EHP', 
					'intelligence': 'Int', 
					'vitality': 'Vit', 
					'dexterity': 'Dex', 
					'strength': 'Str', 
					'dodgePercent': 'Dodge', 
					'blockChance': 'Block %', 
					'allResist': 'All Resists', 
					'lifeTotal': 'Life', 
					'armorReduction': 'Dmg Reduce', 
					'plus-life': '+Life', 
					'armor': 'Armor', 
					'cold-resist': 'Cold Res', 
					'lightning-resist': 'Lightning Res', 
					'fire-resist': 'Fire Res', 
					'arcane-resist': 'Arcane Res', 
					'poison-resist': 'Poison Res', 
					'physical-resist': 'Physical Res', 
					'critical-hit': 'Crit Hit', 
					'critical-hit-damage': 'Crit Hit Dmg'
				};
		_.each(s1, function(val, key) {
			if(typeof(s2[key]) != "undefined") {
				if(allowed.hasOwnProperty(key)) {
					if(!s1[key]) {
						s1[key] = 0;
					}
					if(!s2[key]) {
						s2[key] = 0;
					}
					if(s2[key] - s1[key] != 0) {
						diff[key] = allowed[key] + "|" + Math.round((s2[key] - s1[key]) * 100) / 100;						
						// console.log(key + " - s2["+s2[key]+"] - s1["+s1[key]+"] = "+diff[allowed[key]]);					
					}
				} else {
					// console.log("disallowed: "+ key);
				}
			}
		});
		return diff;
	}
}
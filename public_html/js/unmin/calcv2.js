var buildCalculator = {
	class: null,					// Hero Class
	gearSelector: null,		// Where is the gear on the page?
	passiveSkills: [],		// What passives are active?
	activeSkills: [],			// Which active skills do we use?
	enabledSkills: [],			// Skills that are ACTIVE
	// Storage
	gear: {},
	attrs: {},
	stats: {},
	sets: {},
	bonuses: {},
	values: {},
	// Options
	vsLevel: 60,
	// Flags
	isDuelWielding: false,	
	init: function() {
		// console.log("===== Clearing =====");
		this.attrs = {
			armor: 0,
			'block-chance': 0,
			'speed': 0
		};
		this.sets = {};
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
			'plus-dodge': [], // Since Dodge is Multiplicative in it's percentage bonuses, we need to collect them
			'plus-damage': 0,
			'plus-attack-speed': 0,
			'plus-damage-reduce': 0
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
	setActives: function(actives) {
		this.activeSkills = actives;
	},
	setEnabledSkills: function(skills) {
		this.enabledSkills = skills;
	},
	setPassives: function(passives) {
		this.passiveSkills = passives;
	},
	addBonus: function(effect, value) {
		if(this.bonuses[effect]) {
			this.bonuses[effect] += value;								
		} else {
			this.bonuses[effect] = value;
		}
	},
	removeBonus: function(effect, value) {
		if(this.bonuses[effect]) {
			this.bonuses[effect] -= value;								
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
		// Parse Item Information into this.attrs & this.attrs
		_.each(this.gear, this.parseItem, this);
	},
	getItem: function(slot) {
		return this.gear[slot];
	},
	setItem: function(slot, item) {
		this.gear[slot] = item;
	},
	getItemLink: function(item) {
		if(item == null) {
			return '';
		}
		var link = $("<a href='/i/" + item.id + "' class='quality-" + item.quality + "'/>").attr("data-json", JSON.stringify(item)).html(item.name);
		link.bindTooltip();
		return link;
	},
	applyEnabledSkill: function(e, i) {
		switch(i) {
			case "plus-dodge":
				var value = e / 100;
				this.bonuses['plus-dodge'].push(value);
				break;
			case "plus-crit-hit":
				this.attrs['critical-hit'] += e;
				break;
			case "plus-damage-reduce":
			case "plus-resist-all":
			case "plus-attack-speed":
			case "plus-damage":
			case "plus-armor":
				var value = e / 100;
				// console.log(i, value);
				this.addBonus(i, value);
				break;
			default:
			 	// console.log("Unhandled Active: " + e + " " + i);
				break;
		}
	},
	applyEnabledSkills: function() {
		// console.log(this.activeSkills);
		_.each(this.enabledSkills, function(v,k) {
			// console.log(v,k);
			_.each(v.effect, function(e,i) {
				switch(i) {
					case "stack":
						_.each(e, function(se, si) {
							this.applyEnabledSkill(se.limit * se.value, si);
						}, this);
						break;
					case "plus-damage-conditional":
						this.applyEnabledSkill((e * 100), 'plus-damage');
						break;
					default:
						this.applyEnabledSkill(e,i)
						break;
				}
			}, this);
		}, this);
	},
	applyPassives: function() {
		_.each(this.passiveSkills, function(v,k) {
			// if(passives[this.class][v] && typeof passives[this.class][v]['effect'] != "undefined") {
			if(v.effect) {
				// console.log(k,v);
				_.each(v.effect, function(value, effect) {
					switch(effect) {
						case "plus-damage-conditional": 
							// Ignore Here
							break;
						case "sharpshooter":
							this.bonuses['sharpshooter'] = true;
							// TODO
							// mathDpsSpecialName = 'Sharpshooter';
							// mathDpsSpecial = (((mathDamage.min + mathDamage.max) / 2 + mathDamageAdd) * this.attrs['speed']) * mathSpeedAdditive * (primaryAttr / 100 + 1) * 1 * ((100 / 100) * (mathCriticalHitDamage/100)+ 1);
							// mathDpsSpecial = Math.round(mathDps * 100) / 100;
							break;
						case "plus-thorns":
						case "plus-armor":
						case "plus-resist-all":	
						case "plus-damage": 
							this.addBonus(effect, value);
							break;
						case "flatten-resists":
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
							this.bonuses['plus-dodge'].push(this.attrs['critical-hit'] * 0.30 / 100);
							break;							
						case "dexterity-to-armor":								
							this.attrs['armor'] = this.attrs['armor'] + (this.attrs['dexterity'] * value);
							// mathReduction = mathArmor / (50 * vsLevel + mathArmor);
							// mathDamageReduce = (Math.round(mathReduction * 100 * 100)/100);
							break;
						case "vitality-to-armor":
							this.attrs['armor'] = this.attrs['armor'] + (this.attrs['vitality'] * value);
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
													this.bonuses['plus-dodge'].push(eff);
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
	// ----------------------------------
	// calcDefenses()
	//
	// Returns: Object
	// 
	// Calculate all defensive statistics and returns them.
	// ----------------------------------
	calcDefenses: function() {
		var rendered = {};	// Storage for Rendered Statistics
		// ----------------------------------
		// Life
		// Formula : (36 + 4 * Level + (Level - 25) * Vitality)
		// ----------------------------------
		rendered.life = 36 + 4 * 60 + (60 - 25) * this.attrs['vitality'];
		// ----------------------------------
		// +% Life Addition
		// Formula : Life + ( Life * ( Plus Life / 100 ) )
		// ----------------------------------		
		rendered.life += (rendered.life * (this.attrs['plus-life'] / 100));
		// ----------------------------------
		// Armor
		// Formula: ( Armor + Strength ) * ( Bonus Armor Percentage )
		// ----------------------------------
		rendered.armor = (this.attrs['armor'] + this.attrs['strength']) * (1 + this.bonuses['plus-armor']);
		// ----------------------------------
		// Damage Reduction
		// Formula: ( Armor / ( 50 * Monster Level + Armor ) )
		// ----------------------------------
		rendered.armorReduction = rendered.armor / (50 * this.vsLevel + rendered.armor);
		// ----------------------------------
		// Resist All
		// Formula: ( Resist All + ( Intelligence / 10 ) ) * ( 1 + Bonus Resist All Percentage )
		// ----------------------------------
		rendered['resist-all'] 				= (this.attrs['resist-all'] + (this.attrs['intelligence'] / 10)) * (1 + this.bonuses['plus-resist-all']);
		// ----------------------------------
		// Individual Resists (Resist + Resist All)
		// Formula: ( Resist All + Individual Resist )
		// ----------------------------------
		rendered['resist-physical'] 	= (rendered['resist-all'] + this.attrs['physical-resist']);
		rendered['resist-cold'] 			= (rendered['resist-all'] + this.attrs['cold-resist']);
		rendered['resist-fire'] 			= (rendered['resist-all'] + this.attrs['fire-resist']);
		rendered['resist-lightning'] 	= (rendered['resist-all'] + this.attrs['lightning-resist']);
		rendered['resist-poison'] 		= (rendered['resist-all'] + this.attrs['poison-resist']);
		rendered['resist-arcane'] 		= (rendered['resist-all'] + this.attrs['arcane-resist']);
		// ----------------------------------
		// Special Case: Monk Skill - One with Everything
		// 
		// Set all Resistances to the highest Resist
		// ----------------------------------
		if(this.bonuses['flatten-resists']) {
			var highest = 0,
					search = ['resist-all', 'resist-physical', 'resist-cold', 'resist-fire', 'resist-lightning', 'resist-poison', 'resist-arcane'];
			// Iterate through each individual resist stat
			_.each(search, function(v) {
				// If the resist is higher than the previous highest, make it the highest
				if(rendered[v] > highest) {
					highest = rendered[v];
				}
			}, this);
			// Iterate through each individual resist and set it to the highest
			_.each(search, function(v) {
				rendered[v] = highest;
			}, this);
		}
		// ----------------------------------
		// Resistance Percentages
		// Formula: ( Resistance / (5 * Monster Level * Resistance ) )
		// ----------------------------------
		rendered['percent-resist-all'] 				= rendered['resist-all'] 				/ (5 * this.vsLevel + rendered['resist-all']);
		rendered['percent-resist-physical'] 	= rendered['resist-physical'] 	/ (5 * this.vsLevel + rendered['resist-physical']);
		rendered['percent-resist-cold'] 			= rendered['resist-cold'] 			/ (5 * this.vsLevel + rendered['resist-cold']);
		rendered['percent-resist-fire'] 			= rendered['resist-fire'] 			/ (5 * this.vsLevel + rendered['resist-fire']);
		rendered['percent-resist-lightning'] 	= rendered['resist-lightning'] 	/ (5 * this.vsLevel + rendered['resist-lightning']);
		rendered['percent-resist-poison'] 		= rendered['resist-poison'] 		/ (5 * this.vsLevel + rendered['resist-poison']);
		rendered['percent-resist-arcane'] 		= rendered['resist-arcane'] 		/ (5 * this.vsLevel + rendered['resist-arcane']);
		// ----------------------------------
		// VS Type Resistances
		// ----------------------------------
		rendered['percent-resist-melee']			= this.attrs['melee-reduce'];
		rendered['percent-resist-range']			= this.attrs['range-reduce'];
		rendered['percent-resist-elite']			= this.attrs['elite-reduce'];		
		// ----------------------------------
		// Block Chance
		// Formula: ( Block Chance + Plus Block Chance )
		rendered['block-chance'] = this.attrs['block-chance'] + this.attrs['plus-block'];
		// ----------------------------------
		// Dodge Chance
		// Formula: Dodge uses Ranges and is more complex, more info here - http://www.clicktoloot.com/p/combat.html#dodge
		// ----------------------------------
		var dexRemaining = this.attrs['dexterity'],	// dexRemaining starts off as your total dex, then decreases as we add dodge rating
				ranges = {
					100: 0.100,	// First 100 Pts of Dex = 0.1% Dodge per Pt
					400: 0.025,	// The next 400 Dex = 0.025% Dodge per Pt
					500: 0.020,	// The next 500 Dex = 0.020% Dodge per Pt
					7000: 0.010		// The next 7000 Dex = 0.010% Dodge per Pt
				};
		// Set a base Dodge Chance of 0
		rendered['dodge-chance'] = 0;
		// Loop through each Dodge Range
		_.each(ranges, function(dodgePercent, range){
			// If our dodge is higher than the cap for this bracket, subtract the upper and add the percentage
			if(dexRemaining > range) {
				dexRemaining -= range;
				rendered['dodge-chance'] += range * dodgePercent;
			} else {
				// If we have less than allowed in the bracket, zero out the dogde and add the percentage
				rendered['dodge-chance'] += dexRemaining * dodgePercent; 
				dexRemaining = 0;
			}
		}, this);
		// ----------------------------------
		// +% Dodge Chance Bonuses
		// Formula: Base Dodge * Bonus Dodge 1 * Bonus Dodge 2 ... etc
		// ----------------------------------
		if(this.bonuses['plus-dodge'].length) {
			var percentage = rendered['dodge-chance'] / 100;
			_.each(this.bonuses['plus-dodge'], function(v) {
				percentage = (1 - percentage) * (1 - v);
			});
			rendered['dodge-chance'] = (1 - percentage) * 100;
		}
		// Return the Values for Defenses
		return rendered;
	},
	// ----------------------------------
	// calcEffectiveHealth()
	//
	// Returns: Object
	// 
	// Calculate all EHP statistics and returns them.
	// ----------------------------------
	calcEffectiveHealth: function(defenses) {
		var rendered = {};	// Storage for Rendered Statistics
		// ----------------------------------
		// Effective Health Calculations
		// ----------------------------------
		// Are we a Monk or Barbarian? 
		if(this.class == "monk" || this.class == "barbarian") {
			// ----------------------------------
			// Damage Taken Percent
			// Formula: ( 1 - Percentage Resist All ) * ( 1 - Percentage Armor Reduction ) * (1 - Bonus Damage Reduction) * (1 - 30% Melee Damage Reduction )
			// ----------------------------------
			rendered.damageTaken 			= ( 1 - defenses['percent-resist-all'] ) * ( 1 - defenses.armorReduction ) * (1 - this.bonuses['plus-damage-reduce']) * ( 1 - 0.3 );
			// ----------------------------------
			// Individual EHP Calculations for each resist
			// Formula: ( Life / ( 1 - Percentage Armor Reduction ) * ( 1 - Percentage Individual Resist ) * (1 - 30% Melee Damage Reduction ) )
			// ----------------------------------
			rendered['ehp-physical'] 	= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-physical']	) * (1 - 0.3) );
			rendered['ehp-cold'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-cold'] 			) * (1 - 0.3) );
			rendered['ehp-fire'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-fire'] 			) * (1 - 0.3) );
			rendered['ehp-lightning']	= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-lightning'] )	* (1 - 0.3) );
			rendered['ehp-poison'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-poison']		) * (1 - 0.3) );
			rendered['ehp-arcane'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-arcane']		) * (1 - 0.3) );
		} else {
			// ----------------------------------
			// Damage Taken Percent
			// Formula: ( 1 - Percentage Resist All ) * ( 1 - Percentage Armor Reduction )
			// ----------------------------------
			rendered.damageTaken 			= ( 1 - defenses['percent-resist-all'] ) * (1 - this.bonuses['plus-damage-reduce']) * ( 1 - defenses.armorReduction );
			// ----------------------------------
			// Individual EHP Calculations for each resist
			// Formula: ( Life / ( 1 - Percentage Armor Reduction ) * ( 1 - Percentage Individual Resist ) )
			// ----------------------------------
			rendered['ehp-physical'] 	= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-physical'] ) );
			rendered['ehp-cold'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-cold'] ) );
			rendered['ehp-fire'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-fire'] ) ) ;
			rendered['ehp-lightning']	= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-lightning'] ) );
			rendered['ehp-poison'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-poison'] ) );
			rendered['ehp-arcane'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-arcane'] ) );
		}
		// ----------------------------------
		// EHP Calculation 
		// Formula: ( Life / Percentage Damage Taken )
		// ----------------------------------
		rendered['ehp'] = defenses.life / rendered.damageTaken;
		// ----------------------------------
		// EHP Calculation by Damage Type
		// Formula: ( Life / (Percentage Damage Taken * Modifier ) )
		// ----------------------------------
		rendered['ehp-dodge'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['dodge-chance'] / 100));
		rendered['ehp-melee'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-resist-melee'] 	/ 100));
		rendered['ehp-range'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-resist-range'] 	/ 100));
		rendered['ehp-elite'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-resist-elite'] 	/ 100));
		// Return the Values for EHP
		return rendered;
	},
	calcGearEhp: function(defenses, ehp) {
		var rendered = {};	// Storage for Rendered Statistics
		// Loop through each piece of gear
		_.each(this.gear, function(g, i) {
			// Store the Item to for restoration
			var item = i;
			// Unset the Item from the stats and gear set
			this.removeItem(i);
			// Do the EHP calculations without that item
			var tDefenses = this.calcDefenses(),
					tEhp = this.calcEffectiveHealth(tDefenses);
			// Calculate the Difference in EHP without the item
			rendered['ehp-' + i] = tEhp['ehp'] - ehp.ehp;				
			// Re-add the Item to the gear set
			this.parseItem(g, i);
		}, this);
		// Calculate EHP per Stat
		var incs = {
			'pt-resist-all': {'resist-all': 1},
			'pt-armor': {'armor': 1},
			'pt-vitality': {'vitality': 1},
			'pt-plus-life': {'plus-life': 1},
			'pt-intelligence': {'intelligence': 1},
			'pt-strength': {'strength': 1},
		};
		_.each(incs, function(v, k) {
			switch(k) {
				case "pt-armor":
					var item = {
						stats: v,
					};
					break;
				default:
					var item = {
						attrs: v
					};
					break;
			}
			this.parseItem(item, 'extra');
			var tDefenses = this.calcDefenses(),
					tEhp = this.calcEffectiveHealth(tDefenses);
			// Calculate the Difference in EHP without the item
			rendered['ehp-' + k] = tEhp['ehp'] - ehp.ehp;				
			// Re-add the Item to the gear set
			this.removeItem('extra');
		}, this)
		// Return rendered EHP Gear values
		return rendered;
	},
	calcOffense: function() {
		var rendered = {}, // Storage for Rendered Statistics
				atkSpeedInc = 0,
				mhMinDamage = 0,
				mhMaxDamage = 0,
				ohMinDamage = 0,
				ohMaxDamage = 0,
				bnMinDamage = 0,
				bnMaxDamage = 0,
				bnAvgDamage = 0; 

		if(this.attrs['damage']) {
			mhMinDamage = this.attrs['damage'].min;
			mhMaxDamage = this.attrs['damage'].max;
			if(this.attrs['damage-oh']) {
				ohMinDamage = this.attrs['damage-oh'].min;
				ohMaxDamage = this.attrs['damage-oh'].max;
			}
		}
		// Calculate the Average and Min/Max Bonus Damage from other items
		if(this.attrs['max-damage']) {
			bnMaxDamage = this.attrs['max-damage'];			
		}
		if(this.attrs['min-damage']) {
			bnMinDamage = this.attrs['min-damage'];				
		}
		if(this.attrs['attack-speed-incs']) {
			atkSpeedInc = this.attrs['attack-speed-incs'];
		}
		bnAvgDamage = (bnMinDamage + bnMaxDamage) / 2;
		// Attempt to calculate +% Elemental damage values
		// if(this.attrs['plus-damage']) {
		// 	var elementalBonus = (bnMinDamage + mhMinDamage) * (this.attrs['plus-damage'] / 100);
		// 	mhMinDamage += elementalBonus;
		// 	// mhMaxDamage += elementalBonus;
		// 	ohMinDamage += elementalBonus;
		// 	// ohMaxDamage += elementalBonus;
		// 	bnMinDamage += elementalBonus;
		// 	// bnMaxDamage += elementalBonus;
		// }
		// Are we duel wielding?
		if(this.isDuelWielding) {
			rendered['dps-speed'] = {
				// mh: this.attrs['speed'],
				// oh: this.attrs['speed-oh'],
				mh: Math.floor(this.attrs['speed'] * 1024) / 1024,
				oh: Math.floor(this.attrs['speed-oh'] * 1024) / 1024,
			};
			// console.log(mhMinDamage, mhMaxDamage, ohMinDamage, ohMaxDamage, bnMinDamage, bnMaxDamage);
			// console.log(this.attrs['speed'], this.attrs['speed-oh']);
			// console.log(rendered['dps-speed'].mh, rendered['dps-speed'].oh);
			var mathS = 1 + this.attrs[this.attrs.primary] * 0.01,
					mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01),
					mathR = (rendered['dps-speed'].mh + rendered['dps-speed'].oh) / 2 * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']),
					mathA = ((mhMinDamage + mhMaxDamage) / 2 + (ohMinDamage + ohMaxDamage) / 2 + bnMinDamage + bnMaxDamage) / 2,
					mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;			
			rendered['dps-speed-display'] = Math.round(mathR * 100) / 100;
			// console.log(mathS, mathC, mathR, mathA, mathM, rendered['dps'], "dw", rendered);
		} else {
			rendered['dps-speed'] = Math.floor(this.attrs['speed'] * 1024) / 1024;
			var mathS = 1 + this.attrs[this.attrs.primary] * 0.01,
					mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01),
					mathR = rendered['dps-speed'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']),
					mathA = (mhMinDamage + mhMaxDamage) / 2 + (bnMinDamage + bnMaxDamage) / 2,
					mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;		
			// console.log(mhMinDamage, mhMaxDamage, bnMinDamage, bnMaxDamage);
			// console.log(mathS, mathC, mathR, mathA, mathM, rendered['dps'], "1w");
			// rendered['dps'] = (((mhMinDamage + mhMaxDamage) / 2 + bnAvgDamage) * rendered['dps-speed']) * (1 + atkSpeedInc) * (this.attrs[this.attrs.primary] / 100 + 1) * 1 * ((this.attrs['critical-hit'] / 100) * (this.attrs['critical-hit-damage']/100) + 1);
			rendered['dps-speed-display'] = Math.round(mathR * 100) / 100;
		}
		// Add any bonus damage onto the damage calculation
		// if(this.bonuses['plus-damage']) {
			// console.log(this.bonuses['plus-damage']);
			// return rendered['dps'] * (1 + this.bonuses['plus-damage']);
		// }
		return rendered;
	},
	calcSAME: function(skill, duration) {
		var rendered = {}, // Storage for Rendered Statistics
				atkSpeedInc = 0,
				mhMinDamage = 0,
				mhMaxDamage = 0,
				ohMinDamage = 0,
				ohMaxDamage = 0,
				bnMinDamage = 0,
				bnMaxDamage = 0,
				bnAvgDamage = 0,
				mathE = skill.effect['weapon-damage'],
				hasCooldown = (skill.effect['cooldown']) ? true : false; 
		if(this.attrs['damage']) {
			mhMinDamage = this.attrs['damage'].min;
			mhMaxDamage = this.attrs['damage'].max;
			if(this.attrs['damage-oh']) {
				ohMinDamage = this.attrs['damage-oh'].min;
				ohMaxDamage = this.attrs['damage-oh'].max;
			}
		}
		if(this.attrs['attack-speed-incs']) {
			atkSpeedInc = this.attrs['attack-speed-incs'];
		}
		// Calculate the Average and Min/Max Bonus Damage from other items
		if(this.attrs['max-damage']) {
			bnMaxDamage = this.attrs['max-damage'];			
		}
		if(this.attrs['min-damage']) {
			bnMinDamage = this.attrs['min-damage'];				
		}
		// console.log(this.attrs);
		bnAvgDamage = (bnMinDamage + bnMaxDamage) / 2;
		// Convert mathE to a percentage
		mathE = mathE / 100;
		// Are we duel wielding?
		if(this.isDuelWielding) {
			rendered['dps-speed'] = {
				// mh: this.attrs['speed'],
				// oh: this.attrs['speed-oh'],
				mh: Math.floor(this.attrs['speed'] * 1024) / 1024,
				oh: Math.floor(this.attrs['speed-oh'] * 1024) / 1024,
			};
			var mathS = 1 + this.attrs[this.attrs.primary] * 0.01,
					mathA = ((mhMinDamage + mhMaxDamage) / 2 + (ohMinDamage + ohMaxDamage) / 2 + bnMinDamage + bnMaxDamage) / 2,
					mathAl = (mhMinDamage + ohMinDamage + bnMinDamage),
					mathAh = (mhMaxDamage + ohMaxDamage + bnMaxDamage),
					mathM = (1 + this.bonuses['plus-damage']);
					mathR = (rendered['dps-speed'].mh + rendered['dps-speed'].oh) / 2 * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']),
					mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01),
					dLow = mathS * mathAl * mathM * mathE;
					dHigh = mathS * mathAh * mathM * mathE;
					// console.log(mathS, mathAl, mathAh, mathM, dLow, dHigh, mathE);
		} else {
			rendered['dps-speed'] = Math.floor(this.attrs['speed'] * 1024) / 1024;
			var mathS = 1 + this.attrs[this.attrs.primary] * 0.01,
					mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01),
					mathR = rendered['dps-speed'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']),
					mathAl = (mhMinDamage + bnMinDamage),
					mathAh = (mhMaxDamage + bnMaxDamage),
					mathM = (1 + this.bonuses['plus-damage']);
					dLow = mathS * mathAl * mathM * mathE;
					dHigh = mathS * mathAh * mathM * mathE;
		}
		dps = Math.round(((dLow + dHigh) / 2 ) * mathR * mathC * 100)/100;
		hit = Math.round(((dLow + dHigh) / 2 ) * mathC * 100)/100;
		if(duration) {
			// dps = Math.round(((dLow + dHigh) / 2 ) * mathC * 100)/100;
			rendered['per-tick'] = Math.round(hit / duration * 100) / 100;
			rendered['total-damage'] = rendered['per-tick'] * duration;
			rendered['damage-tick'] = Math.round(dLow / duration * 100)/100 + " - " + Math.round(dHigh / duration * 100)/100;
			rendered['critical-hit-tick'] = Math.round(dLow / duration * (1 + (this.attrs['critical-hit-damage'] * 0.01)) * 10) / 10 + " - " + Math.round(dHigh / duration * (1 + (this.attrs['critical-hit-damage'] * 0.01)) * 10) / 10;
		} else {
			if(!hasCooldown) {
				rendered['dps'] = dps;							
			}
			rendered['average-hit'] = hit;			
			rendered['damage'] = Math.round(dLow * 100)/100 + " - " + Math.round(dHigh * 100)/100;;
			rendered['critical-hit'] = Math.round(dLow * ((this.attrs['critical-hit-damage'] * 0.01)) * 10) / 10 + " - " + Math.round(dHigh * ((this.attrs['critical-hit-damage'] * 0.01)) * 10) / 10;
		}
		return rendered;
	},
	calcSkills: function() {
		var rendered = {};
		_.each(this.activeSkills, function(v,k) {
			var calcDot = false,
					calcSame = false,
					activate = false,
					bonuses = {};
					// console.log(k,v);
			if(v && v.effect) {
				_.each(v.effect, function(e,i) {
					// console.log(e,i);
					switch(i) {
						case "plus-damage-conditional":
						case "plus-crit-hit":
						case "plus-attack-speed":
						case "plus-damage":
						case "plus-armor":
						case "plus-resist-all":
						case "stack":
							activate = true;
							break;
						default:
							// console.log("not supported ",e,i);
							break;
						case "plus-critical-hit-this":
							bonuses["plus-critical-hit"] = (se.value / 100) * se.limit;
							break;
						case "stack":
							_.each(e, function(se, si) {
								switch(si) {
									case "plus-attack-speed-this":
										bonuses["plus-attack-speed"] = (se.value / 100) * se.limit;
										break;
								}
							}, this);
							break;
						case "weapon-damage":
							calcSame = v; // Pass in the whole skill
							break;
						case "weapon-damage-for":
							calcDot = e; // Pass in duration
							break;
					}
				}, this);	
			}
			if(calcSame) {
				// Add the Skills Bonuses
				_.each(bonuses, function(val,b) {
					this.addBonus(b, val);
				}, this);
				if(calcDot) {
					// This is a dot, pass in the duration
					rendered[k] = this.calcSAME(calcSame, calcDot);					
				} else {
					// Calculate the SAME Damage with these bonuses
					rendered[k] = this.calcSAME(calcSame);					
				}
				// Remove the Skills Bonuses
				_.each(bonuses, function(val,b) {
					this.removeBonus(b, val);
				}, this)	
			}
			// console.log(k, activate);
			if(activate) {
				if(!rendered[k]) {
					rendered[k] = {};
				}
				rendered[k].activate = true;
			}
		}, this);
		_.each(this.passiveSkills, function(v,k) {
			var	activate = false,
					bonuses = {};
					// console.log(k,v);
			if(v && v.effect) {
				_.each(v.effect, function(e,i) {
					// console.log(e,i);
					switch(i) {
						case "plus-damage-conditional":
							activate = true;
							break;
						default:
							// console.log("not supported ",e,i);
							break;
					}
				}, this);	
			}
			if(activate) {
				if(!rendered[k]) {
					rendered[k] = {};
				}
				rendered[k].activate = true;
			}
		}, this);
		// console.log(rendered);
		return {skillData: rendered};
	},
	applySetBonuses: function() {
		_.each(this.sets, function(v,k) {
			if(v > 1) {
				_.each(setBonuses[k].effect, function(list, amount) {
					if(k >= amount) {
						_.each(list, function(value, stat) {
							if(value < 1) {
								value = value * 100;
							}
							if(typeof(this.attrs[stat]) != "undefined") {
								this.attrs[stat] += parseFloat(value);
							} else {
								this.attrs[stat] = parseFloat(value);
							}
						}, this);
					}
				}, this);
			}
		}, this);
	},
	run: function() {
		// Apply all of the passive bonuses into the this.bonuses array for use in the math below
		this.applyPassives();
		// Apply all Set Bonuses
		this.applySetBonuses();
		// Apply all bonuses from the Active skills indicated
		this.applyEnabledSkills();
		// Calculate Defensive Statistics
		var defenses = this.calcDefenses(),
		 		ehp = this.calcEffectiveHealth(defenses), 
				gearEhp = this.calcGearEhp(defenses, ehp),
				dps = this.calcOffense(), 
				skills = this.calcSkills();
		// Add all of our calculated values into the values object for returning
		$.extend(this.values, defenses, ehp, gearEhp, dps, skills);		
		// ----------------------------------
		// Define Offensive Statistics before Passives so we can add to them
		// ----------------------------------
		// this.values['dps'] = 0;
		// Do we have a weapon?
		// this.values['dps-damage'] = this.attrs['damage'];
		// if(this.values['dps-damage']) {
		// 	this.values['dps'] = this.calculateDps();
		// }
		// if(this.isDuelWielding) {
		// 	this.values['dps-speedTotal'] = Math.round(this.values['dps-speed'].mh * (1 + this.values['dps-addAttackSpeed'] + 0.15) * 100)/100;
		// } else {
		// 	this.values['dps-speedTotal'] = Math.round(this.values['dps-speed'] * (1 + this.values['dps-addAttackSpeed']) * 100)/100;
		// }
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
				// if(this.values['dps-damage']) {
					var newDps = this.calcOffense();
					this.values['dps-' + i] = this.values['dps'] - newDps['dps'];				
				// }
			// }
			// Readd the Item to the set
			this.parseItem(g, i);
		}, this);
		// Calculate DPS per Stat
		var incs = {
			'pt-primary': {'stat': 1},
			'pt-critical-hit': {'critical-hit': 1},
			'pt-critical-hit-damage': {'critical-hit-damage': 1},
			'pt-min-damage': {'min-damage': 1},
			'pt-max-damage': {'max-damage': 1},
			'pt-attack-speed': {'attack-speed': 1},
		};
		_.each(incs, function(v, k) {
			switch(k) {
				case "pt-primary":
					var item = { attrs: { } };
					item.attrs[this.attrs.primary] = 1;
					break;
				case "pt-armor":
					var item = {
						stats: v,
					};
					break;
				default:
					var item = {
						type: 'extra',
						attrs: v
					};
					break;
			}
			this.parseItem(item, 'extra');
			var newDps = this.calcOffense();
			this.values['dps-' + k] = newDps['dps'] - this.values['dps'];				
			// Re-add the Item to the gear set
			this.removeItem('extra');
		}, this)
		// Append Attributes into the values
		this.values = jQuery.extend(this.attrs, this.values);
		// Return the values
		return this.values;
	},
	removeItem: function(slot) {
		var json = this.gear[slot];
		this.gear[slot] = false;
		// console.log("Removing Item from ["+slot+"], now: " + this.gear[slot]);
		if(json.set) {
			// console.log("=====", json.set);
			// console.log("-1 for " + slot);
			this.sets[json.set]--;
		}
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				if(typeof(av) != 'object' && isNaN(parseFloat(av))) {
					av = 0;
				}
				switch(ak) {
					case "armor":
						if(json.type == 'ring' || json.type == 'amulet') {
							this.attrs[ak] -= parseFloat(av);
						}
						break;
					// case "plus-block":
					// 	if(json.type != 'shield') {
					// 		this.attrs[ak] -= parseFloat(av);
					// 	}
					// 	break;
					case "minmax-damage":
						switch(json.type) {
							case "extra":
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
								if(this.attrs['min-damage']) {
									this.attrs['min-damage'] -= parseFloat(av.min);
								}
								if(this.attrs['max-damage']) {
									this.attrs['max-damage'] -= parseFloat(av.max);
								}
								break;
							default:
								break;
						}
						break;
					case "max-damage":
					case "min-damage":
					case "plus-damage":
						switch(json.type) {
							case "extra":
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
								this.attrs[ak] -= parseFloat(av);
								break;
							default:
								break;
						}
						break;
					case "attack-speed":
						switch(json.type) {
							case "extra":
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
							this.attrs[ak] = 0;
						}
						if(slot == "offhand") {
							this.attrs['speed-oh'] = 0;
						}
						break;
					case "damage":
						if(slot == "mainhand") {
							this.attrs[ak] = {
								min: 0,
								max: 0
							};
						}							
						if(slot == "offhand") {
							this.attrs['damage-oh'] = {
								min: 0,
								max: 0
							};
						}							
						break;
					case "block-amount":
						this.attrs[ak] = 0;
						break;
					default:
						this.attrs[ak] -= parseFloat(av);
						break;
				}
			}, this);					
		}
		// console.log(this.attrs);
	},
	parseItem: function(json, slot) {
		// console.log(this.gear[slot]);
		this.gear[slot] = json;
		// console.log("Parsing item to slot ["+slot+"], now: " + this.gear[slot].name);
		// Add to SetBonus Counter
		if(json.set) {
			// console.log("=====", json.set);
			// console.log("+1 for " + slot);
			if(!this.sets[json.set]) {
				this.sets[json.set] = 0;
			}
			this.sets[json.set]++;
		}
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				if(typeof(av) != 'object' && isNaN(parseFloat(av))) {
					av = 0;
				}
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
					case "minmax-damage":
						switch(json.type) {
							case "extra":
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
								if(this.attrs['min-damage']) {
									this.attrs['min-damage'] += parseFloat(av.min);
								} else {
									this.attrs['min-damage'] = parseFloat(av.min);
								}
								if(this.attrs['max-damage']) {
									this.attrs['max-damage'] += parseFloat(av.max);
								} else {
									this.attrs['max-damage'] = parseFloat(av.max);
								}
								break;
							default:
								break;
						}
						break;
					case "max-damage":
					case "min-damage":
					case "plus-damage":
						switch(json.type) {
							case "extra":
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
							case "extra":
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
							this.attrs[ak] = parseFloat(av);
						}
						if(slot == "offhand") {
							this.isDuelWielding = true;
							this.attrs['speed-oh'] = parseFloat(av);
						}
						break;
					case "damage":
						if(slot == "mainhand") {
							this.attrs[ak] = {
								min: av['min'],
								max: av['max']
							};
						}							
						if(slot == "offhand") {
							this.attrs['damage-oh'] = {
								min: av['min'],
								max: av['max']
							};
						}							
						break;
					case "block-amount":
						this.attrs[ak] = av['min'] + "-" + av['max'];
						break;
					default:
						if(this.attrs[ak]) {
							this.attrs[ak] += parseFloat(av);
						} else {
							this.attrs[ak] = parseFloat(av);
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
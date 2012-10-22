(function( d3up ) {

function average() {
	var index = 0,
			sum = 0,
			length = arguments.length;
	for ( ; index < length; index++ ) {
		sum += parseFloat(arguments[ index ]) || 0;
	}
	return sum / length;
}

function BuildCalculator() {
	this.init();
}

BuildCalculator.prototype = {
	heroClass: null,				// Hero Class
	gearSelector: null,			// Where is the gear on the page?
	passiveSkills: [],			// What passives do we use?
	activeSkills: [],				// What actives do we use?
	companionSkills: [],    // What companion skills are active?
	enabledSkills: [],			// What actives/passives are conditional and enabled?
	// Options
	vsLevel: 63,
	level: 0,
	paragon: 0,
	// Flags
	isDuelWielding: false,	
	// Reinitialize All Variables required for Math
	init: function() {
		this.stats = {
			'armor': 0,
			'block-chance': 0,
			'speed': 0
		};
		this.sets = {};
		this.attrs = {
			'primary': null,
			'strength': 0,
			'dexterity': 0,
			'intelligence': 0,
			'vitality': 0,
			'plus-life': 0,
			'armor': 0,
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
			'plus-gold-find': 0,
			'plus-magic-find': 0,
		};
		this.gear = {};
		this.values = {};
		this.bonuses = {
			'plus-armor': 0,
			'plus-resist-all': 0,
			'plus-damage': 0,
			'plus-attack-speed': 0,
			'plus-damage-reduce': 0,
			'plus-life': 0,
			'plus-dodge': [], // Since Dodge is Multiplicative in it's percentage bonuses, we need to collect all values
			'3rd-hit-damage': false, // Keep disabled unless it's set
			'percent-non-physical' : 0, // Percentage to reduce non-physical damage (ie superstition)
			'plus-attack-speed-this': 0,
		};
	},
	setClass: function(newClass) {
		// Set Base stats based on class
		var intMult = 1,
				strMult = 1,
				dexMult = 1,
				vitMult = 2;
		switch(newClass) {
			case "wizard":
			case "witch-doctor":
				intMult = 3;
				this.attrs['primary'] = 'intelligence';
				break;
			case "barbarian":
				strMult = 3;
				this.attrs['primary'] = 'strength';
				break;
			case "demon-hunter":
			case "monk":
				dexMult = 3;
				this.attrs['primary'] = 'dexterity';
				break;
		}
		this.attrs['strength'] += 7 + strMult * this.level;
		this.attrs['dexterity'] += 7 + dexMult * this.level;
		this.attrs['intelligence'] += 7 + intMult * this.level;
		this.attrs['vitality'] += 7 + vitMult * this.level;
		if(this.paragon) {
			this.attrs['strength'] += strMult * this.paragon;
			this.attrs['dexterity'] += dexMult * this.paragon;
			this.attrs['intelligence'] += intMult * this.paragon;
			this.attrs['plus-magic-find'] += 3 * this.paragon;
			this.attrs['plus-gold-find'] += 3 * this.paragon;
			this.attrs['vitality'] += vitMult * this.paragon;
		}
		this.attrs['hero-class'] = this.heroClass = newClass;
	},
	getClass: function() {
		return this.heroClass;
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
	setCompanionSkills: function(skills) {
	  this.companionSkills = skills;
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
	setLevel: function(level) {
		this.level = level;
	},
	setParagonLevel: function(level) {
		this.paragon = level;
	},
	getItem: function(slot) {
		return this.gear[slot];
	},
	getGear: function() {
		return this.gear;
	},
	setItem: function(slot, item) {
		// Save the JSON in the proper slot
		this.gear[slot] = item;
		// Parse the stats into appropriate places
		this.parseItem(item, slot);
	},
	getItemLink: function(item) {
		if(item == null || !item.name) {
			return '<a style="color: #ececec">Nothing</a>';
		}
		var link = $("<a href='/i/" + item.id + "' class='quality-" + item.quality + "'/>").attr("data-json", JSON.stringify(item)).html(item.name);
    link.bindTooltip();
		return link;
	},
	getD3BitItemLink: function(item) {
	  if(item == null) {
			return '';
		}
		var link = $("<a href='#' class='quality-" + item.quality + "'/>").attr("data-json", JSON.stringify(item)).html(item.name).attr("onclick", "window.external.OpenLink('http://d3up.com/i/" + item.id + "')");
		return link;	  
	},
	applyEnabledSkill: function(e, i) {
    // console.log(e,i);
		switch(i) {
			case "plus-dodge":
				var value = e / 100;
				this.bonuses['plus-dodge'].push(value);
				break;
			case "plus-crit-hit":
				this.attrs['critical-hit'] += e;
				break;
			case "plus-intelligence-conditional":
				this.attrs['intelligence'] += e;
				break;
			case "plus-attack-speed-this":
        this.bonuses[i] += e;
			  break;
			case "plus-damage-3sec":
				this.bonuses[ 'plus-damage-3sec' ] = e;
				break;
			case "weapon-damage":
			case "generate-fury":
			case "limit":
			  // Do Nothing
			  break;
			case "plus-holy-damage":
				if(this.attrs['plus-holy-damage']) {
					this.attrs['plus-holy-damage'] += e;					
				} else {
					this.attrs['plus-holy-damage'] = e;
				}
				break;
			case "percent-non-physical":
			case "plus-life":
			case "plus-life-regen":
			case "plus-damage-reduce":
			case "plus-resist-all":
			case "plus-attack-speed":
			case "plus-damage":
			case "plus-armor":
			case "plus-intelligence-percent":
				var valueAdd = e / 100;
				this.addBonus(i, valueAdd);
        // console.log("adding " + i + ": " + valueAdd);
				break;
			default:
        // d3up.log("Unhandled Active: " + e + " " + i);
				break;
		}
	},
	applyEnabledSkills: function() {
    // console.log(this.enabledSkills);
		_.each(this.enabledSkills, function(v,k) {
      // d3up.log(v,k);
			_.each(v.effect, function(e,i) {
				switch(i) {
				  case "stackable":
					  _.each(e, function(se, si) {
              // console.log(v.stacks + " stacks");
  				    for(i = 0; i < v.stacks; i++) {
                // console.log(se, si);
  				      this.applyEnabledSkill(se, si);
  				    }
  				  }, this);
				    break;
					case "stack":
						_.each(e, function(se, si) {
							this.applyEnabledSkill(se.limit * se.value, si);
						}, this);
						break;
					case "spirit-combo-strike":
						_.each(this.activeSkills, function(s, i){
							var aSkill = d3up.gameData.actives['monk'][i],
									total = 0;
							if(aSkill.effect && aSkill.effect['generate-spirit']) {
								total += 8;
							}
							this.applyEnabledSkill(total, 'plus-damage');
						}, this);
						break;
					// Monk damage sure is fucked up.
					case "plus-holy-damage-conditional":
						var mhSpeed = this.attrs['speed'],
								mhDamageMin = this.attrs.mhRealDamage.min,
								bnDamageMin = this.attrs['min-damage'],
								mhDamageMax = this.attrs.mhRealDamage.max,
								bnDamageMax = this.attrs['max-damage'];
						this.bonuses['monk-fitl-bonus'] = (mhDamageMin + bnDamageMin + mhDamageMax + bnDamageMax) * 2 * 0.3 * mhSpeed;
						// var mhSpeed = this.attrs['speed'],
						// 		ohSpeed = false,
						// 		ias = this.attrs['attack-speed-incs'],
						// 		incs = 1 + (ias / 100);
						// if(this.attrs['speed-oh']) {
						// 	ohSpeed = this.attrs['speed-oh'];
						// }
						// if(this.attrs['speed-oh']) {
						// 	incs += 0.15;
						// }
						// if(this.bonuses['plus-attack-speed'] && this.bonuses['plus-attack-speed'] > 0) {
						// 	incs += this.bonuses['plus-attack-speed'];
						// }
						// console.log(incs);
						// var	actualSpeedMH = mhSpeed * incs,
						// 		actualSpeedOH = ohSpeed * incs;
						// this.bonuses['monk-fitl-mh'] = e * actualSpeedMH;
						// this.bonuses['monk-fitl-oh'] = e * actualSpeedOH;
						// console.log(actualSpeedMH, actualSpeedOH, this.bonuses['monk-fitl-mh'], this.bonuses['monk-fitl-oh']);
						// this.applyEnabledSkill(strangeDamage, 'plus-holy-damage');
						break;
					case "plus-damage-conditional":
						this.applyEnabledSkill(e, 'plus-damage');
						break;
					case "damage-reduce-conditional":
						this.applyEnabledSkill(e, 'plus-damage-reduce');
						break;
					default:
						this.applyEnabledSkill(e,i);
						break;
				}
			}, this);
		}, this);
	},
	applyPassives: function(reverse) {
		var effects = {
			sharpshooter: function( value ) {
				this.bonuses[ 'sharpshooter' ] = true;
			}
		};
		// d3up.log(reverse);
		effects[ "plus-thorns" ] =
		effects[ "plus-armor" ] =
		effects[ "plus-resist-all" ] =
		effects[ "plus-damage" ] = function( value, effect ) {
			this.addBonus( effect, value );
		};

		_.each(this.passiveSkills, function(v,k) {
		  if(!v) {
		    return false;
		  }
      // console.log(v);
			// if(passives[this.class][v] && typeof passives[this.class][v]['effect'] != "undefined") {
			if(v.effect) {
				// d3up.log(k,v);
				_.each(v.effect, function(value, effect) {
					// If reverse is true, reverse the stat gains to undo passive bonuses.
					if(reverse == true && effect != "switch") {
						value = -value;
					}
					if ( effects[ effect ] ) {
						effects[ effect ].call( this, value, effect )
					} else
					switch(effect) {
						case "melee-reduce":
					  case "elite-reduce":
					  case "range-reduce":
					    if(!this.attrs[effect + '-incs']) {
					      this.attrs[effect + '-incs'] = [];
					    }
				      this.attrs[effect + '-incs'].push(value * 100);
					    break;
						case "flatten-resists":
							// this.attrs['resist-all'] = highest;
							// d3up.log(this.attrs['resist-all'], highest, this.attrs['resist-all'] + highest);
							this.bonuses['flatten-resists'] = true;
							break;
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
						case "reduce-non-physical":
							this.applyEnabledSkill(value, 'percent-non-physical');
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
						case "reduce-non-physical":
							this.applyEnabledSkill(value, 'percent-non-physical');
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
							if(value.against == 'isDuelWielding') {
								_.each(value.cases, function(c, i) {
									if(c.caseOf == this.isDuelWielding) {
										_.each(c.effect, function(eff, e) {
											switch(e) {
												case "plus-dodge":
													if(reverse == true) {
														eff = -eff;
													}
													this.bonuses['plus-dodge'].push(eff);
													break;
											}
										}, this);
									} 
								}, this);
							}
							// d3up.log(value.against);
							if(typeof this.gear[value.against] != "undefined") {
								// d3up.log(value.cases);
								_.each(value.cases, function(c, i) {
									var match = false;
									// d3up.log(c,i);
									_.each(c.caseOf.split("|"), function(l, n) {
										// d3up.log("now", value.against, value.lookup, this.gear[value.against][value.lookup], this.gear);
										if(l == this.gear[value.against][value.lookup]) {
											_.each(c.effect, function(eff, e) {
												if(reverse == true) {
													eff = -eff;
												}
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
														// d3up.log("up chd" , this.attrs['critical-hit-damage']);
														break;
													case "attack-speed": 
														if(this.attrs['attack-speed-incs']) {
															this.attrs['attack-speed-incs'] += (eff * 100);															
														} else {
															this.attrs['attack-speed-incs'] = (eff * 100);
														}
														// console.log(c, i, eff);
														break;
													case "critical-hit":
														this.attrs['critical-hit'] = this.attrs['critical-hit'] + (eff * 100);														
														// d3up.log("up ch" , this.attrs['critical-hit'], eff);
														break;
													default:
													 	// d3up.log("Unhandled Switch: " + e + " [" + eff + "]");
														break;
												}													
											}, this);
										}
									}, this);
								}, this);
							}
							break;
						default:
							// d3up.log("Unhandled Effect: " + effect + "[" + value + "]");
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
		rendered.life += (rendered.life * ((this.attrs['plus-life'] + this.bonuses['plus-life'] * 100) / 100));
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
		rendered['damage-reduction'] = rendered.armorReduction * 100;
		// ----------------------------------
		// Resist All
		// Formula: ( Resist All + ( Intelligence / 10 ) )
		// ----------------------------------
		rendered['resist-all'] 				= (this.attrs['resist-all'] + (this.attrs['intelligence'] / 10));
		// ----------------------------------
		// Individual Resists (Resist + Resist All)
		// Formula: ( Resist All + Individual Resist )  * ( 1 + Bonus Resist All Percentage )
		// ----------------------------------
		rendered['resist-physical'] 	= (rendered['resist-all'] + this.attrs['physical-resist']) * (1 + this.bonuses['plus-resist-all']);
		rendered['resist-cold'] 			= (rendered['resist-all'] + this.attrs['cold-resist']) * (1 + this.bonuses['plus-resist-all']);
		rendered['resist-fire'] 			= (rendered['resist-all'] + this.attrs['fire-resist']) * (1 + this.bonuses['plus-resist-all']);
		rendered['resist-lightning'] 	= (rendered['resist-all'] + this.attrs['lightning-resist']) * (1 + this.bonuses['plus-resist-all']);
		rendered['resist-poison'] 		= (rendered['resist-all'] + this.attrs['poison-resist']) * (1 + this.bonuses['plus-resist-all']);
		rendered['resist-arcane'] 		= (rendered['resist-all'] + this.attrs['arcane-resist']) * (1 + this.bonuses['plus-resist-all']);
		// ----------------------------------
		// Special Case: Monk Skill - One with Everything
		// 
		// Set all Resistances to the highest Resist
		// ----------------------------------
		rendered['resist-all'] 				= (rendered['resist-all']) * (1 + this.bonuses['plus-resist-all']);
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
		_.each(['melee-reduce', 'range-reduce', 'elite-reduce'], function(v,k) {
		  var temp = 1;
		  _.each(this.attrs[v + '-incs'], function(val, idx) {
		    temp = temp * (1 - val / 100);
		  }, this);
      rendered['percent-' + v] = Math.round((1 - temp) * 10000) / 10000;
		}, this);
		// ----------------------------------
		// Block Chance
		// Formula: ( Block Chance + Plus Block Chance )
		rendered['block-chance'] = this.attrs['block-chance'] + this.attrs['plus-block'];
		// console.log(rendered['block-chance'], this.attrs['block-chance'], this.attrs['plus-block']);
		// ----------------------------------
		// Block Value
		if(this.attrs['block-amount']) {
			rendered['block-amount'] = average.apply(null, this.attrs['block-amount'].split("-"));			
		}
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
		if(this.heroClass == "monk" || this.heroClass == "barbarian") {
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
			rendered['ehp-cold'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-cold'] 		) * (1 - this.bonuses['percent-non-physical']) * (1 - 0.3) );
			rendered['ehp-fire'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-fire'] 		) * (1 - this.bonuses['percent-non-physical']) * (1 - 0.3) );
			rendered['ehp-lightning']	= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-lightning'])	* (1 - this.bonuses['percent-non-physical']) * (1 - 0.3) );
			rendered['ehp-poison'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-poison']		) * (1 - this.bonuses['percent-non-physical']) * (1 - 0.3) );
			rendered['ehp-arcane'] 		= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-arcane']		) * (1 - this.bonuses['percent-non-physical']) * (1 - 0.3) );
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
		rendered['total-armor-reduction'] = defenses.armorReduction * 100;
		rendered['total-resist-reduction'] = defenses['percent-resist-all'] * 100;
		rendered['total-damage-reduction'] = (1 - rendered.damageTaken) * 100;
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
		rendered['ehp-melee'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-melee-reduce'] ));
		rendered['ehp-range'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-range-reduce'] ));
		rendered['ehp-elite'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-elite-reduce'] ));
		// ----------------------------------
		// EHP Block Calculation 
		// Formula: 
		// ----------------------------------
		if(defenses['block-chance'] && defenses['block-amount']) {
			var hit = 70000,
					taken = rendered.damageTaken * hit,
					reduced = (defenses['block-chance'] / 100 * defenses['block-amount']),
					change = taken / (taken - reduced);
			// console.log(defenses['block-amount']);
			rendered['ehp-block'] = ( rendered['ehp-dodge']  * change );
			if(rendered['ehp-block'] < 0) {
				rendered['ehp-block'] = "Invulnerable";
			}
		}
		
		// Return the Values for EHP
		return rendered;
	},
	calcGearEhp: function(defenses, ehp) {
		var rendered = {};	// Storage for Rendered Statistics
		// Loop through each piece of gear
		_.each(this.gear, function(g, i) {
			// d3up.log("remove passives");
			this.applyPassives(true); // Reverses Passive Gains
			// Store the Item to for restoration
			var item = i;
			// Unset the Item from the stats and gear set
			this.removeItem(i);
			// d3up.log("add passives");
			this.applyPassives(); // Re-apply the Passive Gains without the Item
			// Do the EHP calculations without that item
			var tDefenses = this.calcDefenses(),
					tEhp = this.calcEffectiveHealth(tDefenses);
			// Calculate the Difference in EHP without the item
			rendered['ehp-' + i] = ehp.ehp - tEhp['ehp'];		
			if(!rendered['ehp-gear-total']) {
			  rendered['ehp-gear-total'] = 0;
			}
			rendered['ehp-gear-total'] += rendered['ehp-' + i];
			// Re-add the Item to the gear set
			this.applyPassives(true); // Reverses Passive Gains
			this.parseItem(g, i);
			this.applyPassives(); // Readd Normal Passive Gains
		}, this);
		// Calculate EHP per Stat
		var incs = {
			'pt-resist-all': {'resist-all': 1},
			'pt-armor': {'armor': 1},
			'pt-vitality': {'vitality': 1},
			'pt-plus-life': {'plus-life': 1},
			'pt-intelligence': {'intelligence': 1},
			'pt-strength': {'strength': 1}
		};
		_.each(incs, function(v, k) {
			var item = {};
			switch(k) {
				case "pt-armor":
					item = {
						stats: v
					};
					break;
				default:
					item = {
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
		}, this);
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
				mhAvgDamage = 0,
				ohAvgDamage = 0,
				bnMaxDamage = 0,
				bnEleDamage = 0,
				bnElePercent = 0,
				bnAvgDamage = 0; 

		if(this.attrs['damage']) {
			rendered['dps-mh-min'] = mhMinDamage = this.attrs['damage'].min;
			rendered['dps-mh-max'] = mhMaxDamage = this.attrs['damage'].max;		
			if(this.attrs['damage-oh']) {
				ohMinDamage = this.attrs['damage-oh'].min;
				ohMaxDamage = this.attrs['damage-oh'].max;
				rendered['dps-oh-min'] = ohMinDamage = this.attrs['damage-oh'].min;
				rendered['dps-oh-max'] = ohMaxDamage = this.attrs['damage-oh'].max;			
				// rendered['dps-oh-avg'] = ohAvgDamage = (ohMinDamage + ohMaxDamage) / 2;
			}
		}
		// Remove the +% Damage Bonus if it exists
    // d3up.log("MH Min/Max (w/ +% Damage): ", mhMinDamage, mhMaxDamage);
    // if(this.attrs.mhRealDamage && this.attrs['mainhand-plus-damage']) {
    //   mhMinDamage = this.attrs.mhRealDamage.min * (1 - (this.attrs['mainhand-plus-damage'] * 0.01)),
    //   mhMaxDamage = this.attrs.mhRealDamage.max * (1 - (this.attrs['mainhand-plus-damage'] * 0.01));
    // }
    // if(this.attrs.ohRealDamage && this.attrs['offhand-plus-damage']) {
    //   ohMinDamage = this.attrs.ohRealDamage.min * (1 - (this.attrs['mainhand-plus-damage'] * 0.01)),
    //   ohMaxDamage = this.attrs.ohRealDamage.max * (1 - (this.attrs['mainhand-plus-damage'] * 0.01));
    // }
    // d3up.log("MH Min/Max: ", mhMinDamage, mhMaxDamage);
    //     d3up.log("Min/Max Damage Bonuses: " + this.attrs['min-damage'] + " - " + this.attrs['max-damage']);
		// Add the Bonus Damage to the values without +% Damage
    if(this.attrs['max-damage']) {
			rendered['plus-max-damage'] = bnMaxDamage = this.attrs['max-damage'];
			mhMaxDamage += this.attrs['max-damage']; // / (1 - (this.attrs['mainhand-plus-damage'] * 0.01));      
			if(ohMaxDamage) {
				ohMaxDamage += this.attrs['max-damage'];              
			}
    }
    if(this.attrs['min-damage']) {
			rendered['plus-min-damage'] = bnMinDamage = this.attrs['min-damage'];
      mhMinDamage += this.attrs['min-damage']; // / (1 - (this.attrs['mainhand-plus-damage'] * 0.01));        
      if(ohMinDamage) {
        ohMinDamage += this.attrs['min-damage'];              
      }
    }
		// Calculate Averages
		rendered['dps-mh-avg'] = mhAvgDamage = (mhMinDamage + mhMaxDamage) / 2;				
		rendered['dps-oh-avg'] = ohAvgDamage = (ohMinDamage + ohMaxDamage) / 2;
		
		rendered['dps-mh-min-total'] = mhMinDamage;
		rendered['dps-mh-max-total'] = mhMaxDamage;
		if(ohMinDamage && ohMaxDamage) {
			rendered['dps-oh-min-total'] = ohMinDamage;
			rendered['dps-oh-max-total'] = ohMaxDamage;
		}
		// rendered['dps-mh-avg'] = ((mhMinDamage + mhMaxDamage) / 2);
    // d3up.log("MH Min/Max after +Min/Max: ", mhMinDamage, mhMaxDamage);
		// Determine Bonus Damage from Elemental Damage Bonuses (without the +% Damage added)
    // if(bnElePercent > 0 && this.attrs.mhRealDamage) {
    //  if(this.isDuelWielding) {
    //    bnEleDamage += ((this.attrs.mhRealDamage.min + bnMinDamage) + (this.attrs.ohRealDamage.min + bnMinDamage)) / 2 * (bnElePercent / 100);
    //  } else {
    //    bnEleDamage += (this.attrs.mhRealDamage.min + bnMinDamage) * (bnElePercent / 100);
    //  }
    // }
		// Re-add the +% Damage Bonus if it exists
    // if(this.attrs.mhRealDamage && this.attrs['mainhand-plus-damage']) {
    //   mhMinDamage = mhMinDamage / (1 - (this.attrs['mainhand-plus-damage'] * 0.01)),
    //   mhMaxDamage = mhMaxDamage / (1 - (this.attrs['mainhand-plus-damage'] * 0.01));
    // }
    // if(this.attrs.ohRealDamage && this.attrs['offhand-plus-damage']) {
    //   ohMinDamage = ohMinDamage * (1 - (this.attrs['mainhand-plus-damage'] * 0.01)),
    //   ohMaxDamage = ohMaxDamage * (1 - (this.attrs['mainhand-plus-damage'] * 0.01));
    // }
    // d3up.log("MH Min/Max after +% Damage again: ", mhMinDamage, mhMaxDamage);
    // _.each(['fire-damage', 'arcane-damage', 'poison-damage', 'cold-damage', 'lightning-damage', 'holy-damage'], function(v,k) {
    //   if(_.has(this.attrs, v)) {
    //         mhMinDamage += this.attrs[v].min;
    //         mhMaxDamage += this.attrs[v].max;
    //   }
    // }, this);
    // d3up.log("MH Min/Max after adding +Ele Damage: ", mhMinDamage, mhMaxDamage);
		if(this.attrs['attack-speed-incs']) {
			atkSpeedInc = this.attrs['attack-speed-incs'] / 100;
		}
		// console.log(this.attrs['attack-speed-incs']);
		// Elemental Damage Bonuses
		// console.log(this.attrs);
		_.each(['plus-fire-damage', 'plus-arcane-damage', 'plus-poison-damage', 'plus-cold-damage', 'plus-lightning-damage', 'plus-holy-damage'], function(v,k) {
			if(_.has(this.attrs, v)) {
				bnElePercent += this.attrs[v];
			}
		}, this);

		// fitl
		
		if(this.attrs.mhRealDamage) {
			rendered['dps-mh-real-min'] = this.attrs.mhRealDamage.min;
			rendered['dps-mh-real-max'] = this.attrs.mhRealDamage.max;
			rendered['dps-mh-real-min-bonus'] = this.attrs.mhRealDamage.min + bnMinDamage;
			rendered['dps-mh-real-max-bonus'] = this.attrs.mhRealDamage.max + bnMaxDamage;
		}
		if(this.attrs.ohRealDamage) {
			rendered['dps-oh-real-min'] = this.attrs.ohRealDamage.min;
			rendered['dps-oh-real-max'] = this.attrs.ohRealDamage.max;
			rendered['dps-oh-real-min-bonus'] = this.attrs.ohRealDamage.min + bnMinDamage;
			rendered['dps-oh-real-max-bonus'] = this.attrs.ohRealDamage.max + bnMaxDamage;
		}
		// Determine Bonus Damage from Elemental Damage Bonuses
		if(bnElePercent > 0 && this.attrs.mhRealDamage) {
			mhAvgDamage += (this.attrs.mhRealDamage.min + bnMinDamage + this.attrs.mhRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			if(this.isDuelWielding) {
				ohAvgDamage += (this.attrs.ohRealDamage.min + bnMinDamage + this.attrs.ohRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			}
		}
		if(this.bonuses['monk-fitl-bonus']) {
			mhAvgDamage += this.bonuses['monk-fitl-bonus'];
			if(this.isDuelWielding) {
				ohAvgDamage += this.bonuses['monk-fitl-bonus'];
			}
		}
		rendered['bonus-elemental-damage'] = bnEleDamage;
		rendered['bonus-elemental-percent'] = bnElePercent;
    // console.log(this.attrs.mhRealDamage.min, bnMinDamage, bnElePercent, bnEleDamage);
		// Are we duel wielding?
    // d3up.log(this.attrs);		
		var mathS, mathC, mathR, mathA, mathM;
		if(this.isDuelWielding) {
 			rendered['dps-speed'] = {
 				mh: Math.floor(this.attrs['speed'] * 1024) / 1024,
 				oh: Math.floor(this.attrs['speed-oh'] * 1024) / 1024
 			};
			// console.log("speed during calc: ", this.attrs['speed'], this.attrs['speed-oh']);
			// d3up.log(mhMinDamage, mhMaxDamage, ohMinDamage, ohMaxDamage, bnMinDamage, bnMaxDamage);
			// d3up.log(this.attrs['speed'], this.attrs['speed-oh']);
			// d3up.log(rendered['dps-speed'].mh, rendered['dps-speed'].oh);
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01);
			mathR = ((rendered['dps-speed'].mh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed'])) + (rendered['dps-speed'].oh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']))) / 2;
			mathA = (mhAvgDamage + ohAvgDamage) / 2;
			mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;			
			rendered['dps-speed-mh'] = rendered['dps-speed'].mh;
			rendered['dps-speed-oh'] = rendered['dps-speed'].oh;
			rendered['scram-a-mh'] = (mhAvgDamage + (this.attrs.mhRealDamage.min + bnMinDamage) * 2 * (bnElePercent / 100)) * mathS * mathM * mathC;
			rendered['scram-a-oh'] = (ohAvgDamage + (this.attrs.ohRealDamage.min + bnMinDamage) * 2 * (bnElePercent / 100)) * mathS * mathM * mathC;
			// console.log(this.bonuses);
			// console.log(mhAvgDamage, bnEleDamage, mathS, mathM, mathC);
			// console.log(mathA, rendered['dps-speed'], (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed']));
			// rendered['dps-speed-mh'] = Math.round(rendered['dps-speed'].mh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed']) * 100) / 100;
			// rendered['dps-speed-oh'] = Math.round(rendered['dps-speed'].oh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed'])  * 100) / 100;
			rendered['dps-speed-display'] = Math.round(rendered['dps-speed'].mh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed']) * 1000) / 1000 + " MH<br/>" + Math.round(rendered['dps-speed'].oh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed'])  * 1000) / 1000 + " OH";
			// d3up.log(mathS, mathC, mathR, mathA, mathM, rendered['dps'], "dw", rendered);
		} else {
			// if(this.attrs['plus-aps']) {
			//         rendered['dps-speed'] = Math.floor((this.attrs['speed'] + this.attrs['plus-aps']) * 1024) / 1024;
			//       } else {
  			rendered['dps-speed-mh'] = Math.floor(this.attrs['speed'] * 1024) / 1024;        
  			// rendered['dps-speed-mh'] = this.attrs['speed'];        
      // }
			// console.log("mathS", this.attrs[this.attrs.primary]);
			// console.log("mathC", this.attrs['critical-hit'] * 0.01, this.attrs['critical-hit-damage'] * 0.01)
			// console.log("mathR", rendered['dps-speed-mh'], atkSpeedInc, this.bonuses['plus-attack-speed']);
			// console.log("mathA", mhAvgDamage, Math.round(bnEleDamage * 10) / 10);
			// console.log("mathM", this.bonuses['plus-damage']);
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01);
			mathR = rendered['dps-speed-mh'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']);
			// console.log(rendered['dps-speed'], atkSpeedInc, this.bonuses['plus-attack-speed']);
			mathA = mhAvgDamage;
			mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;		
      // d3up.log(mhMinDamage, mhMaxDamage, bnMinDamage, bnMaxDamage);
      // d3up.log(mathS, mathC, mathR, mathA, mathM, rendered['dps'], "1w");
			// rendered['dps'] = (((mhMinDamage + mhMaxDamage) / 2 + bnAvgDamage) * rendered['dps-speed']) * (1 + atkSpeedInc) * (this.attrs[this.attrs.primary] / 100 + 1) * 1 * ((this.attrs['critical-hit'] / 100) * (this.attrs['critical-hit-damage']/100) + 1);
			rendered['scram-a-mh'] = mathA * mathM * mathS * mathC;
			// console.log(this.attrs['speed'], atkSpeedInc, this.bonuses['plus-attack-speed'], mathR);
			rendered['dps-speed-display'] = Math.round(mathR * 100) / 100;
		}
		// console.log(mathA);
		rendered['scram-s'] = mathS;
		rendered['scram-c'] = mathC;
		rendered['scram-r'] = mathR;
		rendered['scram-a'] = mathA;
		rendered['scram-m'] = mathM;
		rendered['bonus-damage'] = this.bonuses['plus-damage'];
		// Add any bonus damage onto the damage calculation
		// if(this.bonuses['plus-damage']) {
			// d3up.log(this.bonuses['plus-damage']);
			// return rendered['dps'] * (1 + this.bonuses['plus-damage']);
		// }
    // d3up.log(rendered);
		if(this.attrs['elite-damage']) {
			rendered['dps-elites'] = Math.round(rendered['dps'] * (1 + (this.attrs['elite-damage'] / 100)) * 100) / 100;
		}

		return rendered;
	},
	calcSAME: function(options) {
	  var skill = options.skill, 
	      duration = options.duration, 
	      mhOnly = options.mhOnly, 
	      isStatic = options.isStatic;
	  
		var rendered = {}, // Storage for Rendered Statistics
				atkSpeedInc = 0,
				mhMinDamage = 0,
				mhMaxDamage = 0,
				ohMinDamage = 0,
				ohMaxDamage = 0,
				bnMinDamage = 0,
				bnMaxDamage = 0,
				bnAvgDamage = 0,
				bnEleDamage = 0,
				bnElePercent = 0,
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
			atkSpeedInc = this.attrs['attack-speed-incs'] / 100;
		}
		// Calculate the Average and Min/Max Bonus Damage from other items
		if(this.attrs['max-damage']) {
			bnMaxDamage = this.attrs['max-damage'];			
		}
		if(this.attrs['min-damage']) {
			bnMinDamage = this.attrs['min-damage'];				
		}
		// d3up.log(this.attrs);
		bnAvgDamage = (bnMinDamage + bnMaxDamage) / 2;
		// Convert mathE to a percentage
		mathE = mathE / 100;
		// Elemental Damage Bonuses
		_.each(['plus-fire-damage', 'plus-arcane-damage', 'plus-poison-damage', 'plus-cold-damage', 'plus-lightning-damage', 'plus-holy-damage'], function(v,k) {
			if(_.has(this.attrs, v)) {
				bnElePercent += this.attrs[v];
			}
		}, this);
		// Determine Bonus Damage from Elemental Damage Bonuses
		// Determine Bonus Damage from Elemental Damage Bonuses
		if(bnElePercent > 0 && this.attrs.mhRealDamage) {
			bnEleDamage += (this.attrs.mhRealDamage.min + bnMinDamage + this.attrs.mhRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			if(this.isDuelWielding) {
				bnEleDamage += (this.attrs.ohRealDamage.min + bnMinDamage + this.attrs.ohRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			}
		}
		// d3up.log(this.attrs.mhRealDamage.min, bnMinDamage, bnEleDamage);
		// Are we duel wielding?
		if(this.isDuelWielding && !mhOnly) {
			rendered['dps-speed'] = {
				mh: this.attrs['speed'],
				oh: this.attrs['speed-oh'],
				// mh: Math.floor(this.attrs['speed'] * 1024) / 1024,
				// oh: Math.floor(this.attrs['speed-oh'] * 1024) / 1024
			};
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathA = ((mhMinDamage + mhMaxDamage) / 2 + bnMaxDamage) + ((ohMinDamage + ohMaxDamage) / 2 + bnMinDamage) / 2;
			mathAl = ((mhMinDamage + bnMinDamage) + bnEleDamage) + ((ohMinDamage + bnMinDamage) + bnEleDamage);
			mathAh = ((mhMaxDamage + bnMaxDamage) + bnEleDamage) + ((ohMaxDamage + bnMaxDamage) + bnEleDamage);
			mathM = (1 + this.bonuses['plus-damage']);
			mathR = (rendered['dps-speed'].mh + rendered['dps-speed'].oh) / 2 * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']);
			mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01);
			if(skill.effect['weapon-damage-type']) {
				var dmgType = skill.effect['weapon-damage-type'],
						dmgAttr = 'plus-' + dmgType + '-damage-skills';
				// console.log(dmgAttr, this.attrs);
				// console.log(mathE, this.attrs[dmgAttr]);
				if(this.attrs[dmgAttr]) {
					mathM += this.attrs[dmgAttr] * 0.01;
				}
				// console.log(mathE, this.attrs[dmgAttr]);
			}
			dLow = mathS * mathAl * mathM * mathE;
			dHigh = mathS * mathAh * mathM * mathE;
			// d3up.log(mathS, mathAl, mathAh, mathM, dLow, dHigh, mathE);
		} else {
			rendered['dps-speed'] = Math.floor(this.attrs['speed'] * 1024) / 1024;
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01);
			mathR = rendered['dps-speed'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']);
			mathAl = ((mhMinDamage + bnMinDamage) + bnEleDamage);
			mathAh = ((mhMaxDamage + bnMaxDamage) + bnEleDamage);
			mathM = (1 + this.bonuses['plus-damage']);
			if(skill.effect['weapon-damage-type']) {
				var dmgType = skill.effect['weapon-damage-type'],
						dmgAttr = 'plus-' + dmgType + '-damage-skills';
				// console.log(dmgAttr, this.attrs);
				// console.log(mathE, this.attrs[dmgAttr]);
				if(this.attrs[dmgAttr]) {
					mathM += this.attrs[dmgAttr] * 0.01;
				}
				// console.log(mathE, this.attrs[dmgAttr]);
			}
			dLow = mathS * mathAl * mathM * mathE;
			dHigh = mathS * mathAh * mathM * mathE;
			mhAvg = mathS * ((mathAl + mathAh) / 2) * mathM * mathE;
		}
		// console.log(options.skill.name, dLow, dHigh);
		dps = Math.round(((dLow + dHigh) / 2) * mathR * mathC);
		// d3up.log(atkSpeedInc);
    // d3up.log(options.skill, dLow, dHigh, dps, mathR, mathC, bnEleDamage);
		hit = Math.round(((dLow + dHigh) / 2) * mathC);
		if(duration) {
		  if(isStatic) {
		    var tNorm = Math.round(mhAvg),
		        tCrit = Math.round(mhAvg * (this.attrs['critical-hit-damage'] * 0.01 + 1)); 
        rendered['per-tick-norm'] = Math.round(tNorm / duration); 
        rendered['total-damage-norm'] = tNorm * 2;
        rendered['per-tick-crit'] = Math.round(tCrit / duration); 
        rendered['total-damage-crit'] = tCrit * 2; 
        // d3up.log(rendered, mhAvg);
		  } else {
  			// dps = Math.round(((dLow + dHigh) / 2 ) * mathC * 100)/100;
  			rendered['per-tick'] = Math.round(hit / duration);
  			rendered['total-damage'] = rendered['per-tick'] * duration;
  			rendered['damage-tick'] = Math.round(dLow / duration) + " - " + Math.round(dHigh / duration);
  			rendered['critical-hit-tick'] = Math.round(dLow / duration * (1 + (this.attrs['critical-hit-damage'] * 0.01))) + " - " + Math.round(dHigh / duration * (1 + (this.attrs['critical-hit-damage'] * 0.01)));
		  }
		} else {
			if(!hasCooldown) {
				rendered['dps'] = dps;							
			}
			rendered['average-hit'] = hit;			
  		// Does this get a 3rd hit bonus? (Monks)
			if(this.bonuses['3rd-hit-damage']) {
				var d3Low = mathS * mathAl * (mathM + (this.bonuses['3rd-hit-damage'] / 100)) * mathE,
						d3High = mathS * mathAh * (mathM + (this.bonuses['3rd-hit-damage'] / 100)) * mathE,
						hit3 = Math.round(((d3Low + d3High) / 2 ) * mathC),
						dmgCycle = (((dLow + dHigh) / 2) + ((dLow + dHigh) / 2) + ((d3Low + d3High) / 2)) / 3;
				rendered['dps'] = Math.round(dmgCycle * mathR * mathC);
 				rendered['3rd-hit'] = hit3;
			}
			// d3up.log(dLow, dHigh);
			rendered['damage'] = Math.round(dLow) + " - " + Math.round(dHigh);
			rendered['critical-hit'] = Math.round(dLow * (1+ (this.attrs['critical-hit-damage'] * 0.01))) + " - " + Math.round(dHigh * (1 + (this.attrs['critical-hit-damage'] * 0.01)));
			if(this.bonuses['pierce-bonus']) {
  		  rendered['damage-2nd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dLow) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dHigh);
  		  rendered['critical-hit-2nd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dLow * (1+ (this.attrs['critical-hit-damage'] * 0.01))) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dHigh * (1 + (this.attrs['critical-hit-damage'] * 0.01)));
  		  rendered['damage-3rd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dLow) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dHigh);
  		  rendered['critical-hit-3rd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dLow * (1+ (this.attrs['critical-hit-damage'] * 0.01))) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dHigh * (1 + (this.attrs['critical-hit-damage'] * 0.01)));
  		}
		}
    // d3up.log(rendered);
    return rendered;
	},
	calcSkills: function() {
		var rendered = {};
		// d3up.log(this.activeSkills);
		_.each(this.activeSkills, function(v,k) {
			var options = {},
			    calcDot = false,
					calcSame = false,
					calcStatic = false,
					activate = false,
					stackable = false,
					calcMhOnly = false,
					bonuses = {};
					// d3up.log(k,v);
			if(v && v.effect) {
				_.each(v.effect, function(e,i) {
					switch(i) {
					  case "pierce-bonus":
  						bonuses[i] = e;
					    break;
						case "3rd-hit":
							bonuses['3rd-hit-damage'] = e;
							break;
						case "plus-intelligence-conditional":
						case "plus-holy-damage-conditional":
						case "plus-damage-conditional":
						case "plus-life-conditional":
						case "damage-reduce-conditional":
						case "plus-crit-hit":
						case "plus-life":
						case "plus-attack-speed":
						case "plus-damage":
						case "plus-armor":
						case "plus-resist-all":
						case "plus-dodge":
							activate = true;
							break;
						case "stackable":
						  stackable = e.limit;
							activate = true;
              _.each(e, function(se, si) {
                switch(si) {
                  case "plus-attack-speed-this":
                    if(bonuses['plus-attack-speed']) {
                      bonuses["plus-attack-speed"] += this.bonuses['plus-attack-speed-this'] / 100;
                    } else {
                      bonuses["plus-attack-speed"] = this.bonuses['plus-attack-speed-this'] / 100;                      
                    }
                    break;
                }
              }, this);
							break;
						case "plus-critical-hit-this":
							bonuses["plus-critical-hit"] = e;
							break;
						case "weapon-damage":
							options.skill = v; // Pass in the whole skill
							break;
						case "weapon-damage-for":
							options.duration = e; // Pass in duration
							break;
						case "weapon-damage-mh":
						  options.mhOnly = true;
						  break;
						case "weapon-damage-static":
              options.isStatic = true;
						  break;
						default:
              // d3up.log("not supported ",e,i);
							break;

					}
				}, this);	
			}
			if(options.skill) {
				// Add the Skills Bonuses
				_.each(bonuses, function(val,b) {
					this.addBonus(b, val);
				}, this);
				
			  rendered[k] = this.calcSAME(options);					

				// Remove the Skills Bonuses
				_.each(bonuses, function(val,b) {
					this.removeBonus(b, val);
				}, this);
			}
			if(activate) {
				if(!rendered[k]) {
					rendered[k] = {};
				}
				rendered[k].activate = true;
			}
			if(stackable) {
				if(!rendered[k]) {
					rendered[k] = {};
				}
				rendered[k].stackable = stackable;
			}
		}, this);
		_.each(this.passiveSkills, function(v,k) {
			var	activate = false,
			    stackable = false,
					bonuses = {};
					// d3up.log(k,v);
			if(v && v.effect) {
				_.each(v.effect, function(e,i) {
					// d3up.log(e,i);
					switch(i) {
						case "spirit-combo-strike":
						case "damage-reduce-conditional":
						case "plus-damage-conditional":
						case "plus-holy-damage-conditional":
							activate = true;
							break;
						case "stackable":
						  stackable = e.limit;
							activate = true;
							break;
						default:
							// d3up.log("not supported ",e,i);
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
			if(stackable) {
				if(!rendered[k]) {
					rendered[k] = {};
				}
				rendered[k].stackable = stackable;
			}
		}, this);
		// d3up.log(rendered);
		return {skillData: rendered};
	},
	setBuild: function(build) {
	  // Refresh this to an empty build
	  this.init();
	  // Set all our Skill Data
	  this.setActives(build.skills.actives);
		this.setPassives(build.skills.passives);
    // console.log(build);
    this.setEnabledSkills(build.skills.enabled);
    // calc.setCompanionSkills(activeCompanionSkills);

    // If we have meta, set it
    if(build.meta) {
			this.setLevel(build.meta.level);
      this.setParagonLevel(build.meta.paragon);
      this.setClass(build.meta.heroClass);      
    }
    // Parse all gear into proper slots
    _.each(build.gear, function(json, slot) {
      if(json) {
        this.setItem(slot, json);        
      } else {
        this.removeItem(slot);
      }
    }, this);
	},
	applySetBonuses: function() {
		_.each(this.sets, function(v,k) {
			if(v > 1) {
				if(d3up.gameData.sets[k]) {
					_.each(d3up.gameData.sets[k].effect, function(list, amount) {
						if(v >= amount) {
							_.each(list, function(value, stat) {
								if(value < 1) {
									value = value * 100;
								}
								switch(stat) {
									case "plus-attack-speed":
										this.attrs['attack-speed-incs'] += value;															
										break;
								}
                if(_.indexOf(['melee-reduce', 'range-reduce', 'elite-reduce'], stat) >= 0) {
                  if(typeof(this.attrs[stat + "-incs"]) == "undefined") {
                    this.attrs[stat + "-incs"] = [];
  								}
  								this.attrs[stat + "-incs"].push(value);
                } else {                  
  								if(typeof(this.attrs[stat]) != "undefined") {
  									this.attrs[stat] += parseFloat(value);
  								} else {
  									this.attrs[stat] = parseFloat(value);
  								}
                }
							}, this);
						}
					}, this);					
				}
			}
		}, this);
	},
	applyStatBonuses: function() {
    _.each(this.bonuses, function(v,k) {
      switch(k) {
        case "plus-intelligence-percent":
          var toAdd = Math.round(this.attrs['intelligence'] * v);
          this.attrs['intelligence'] += toAdd;
          break;
        default:
          // d3up.log("Not handling: " + v + k);
          break;
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
		// Apply Stat Bonuses
		this.applyStatBonuses();
		// Calculate Defensive Statistics
    // d3up.log("----");
		var defenses = this.calcDefenses(),
		 		ehp = this.calcEffectiveHealth(defenses), 
				gearEhp = this.calcGearEhp(defenses, ehp),
				dps = this.calcOffense(), 
				skills = this.calcSkills();

		this.attrs['primary-stat'] = this.attrs[this.attrs['primary']];
		
		// Add all of our calculated values into the values object for returning
    // d3up.log("----");
		_.extend(this.values, defenses, ehp, gearEhp, dps, skills);		
		// console.log("Block @ ", this.attrs['block-chance']);
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
		if(this.bonuses['plus-damage-3sec']) {
			var oldBonus = this.bonuses["plus-damage"];
			this.bonuses['plus-damage'] += (this.bonuses['plus-damage-3sec']) / 100;
			var tempDps = this.calcOffense();
			this.values['3sec-dps'] = tempDps.dps;
			this.bonuses['plus-damage'] = oldBonus;
		}
		if(this.bonuses['sharpshooter']) {
			var oldCrit = this.attrs['critical-hit'];
			this.attrs['critical-hit'] = 100;
			var ssDps = this.calcOffense();
			// console.log(ssDps); 
			this.values['sharpshooter-dps'] = ssDps.dps;
			this.attrs['critical-hit'] = oldCrit;
			// d3up.log(this.values['dps-sharpshooter'])
		}
		// Some Wackyness to calculate DPS contributions per piece
    _.each(this.gear, function(g, i) {
     var item = i;
			// console.log("removing", g, i);

     // Unset the Item from the stats
     this.removeItem(i);
     // Don't deal with MH/OH atm
     // if(i != "mainhand" && i != "offhand") {
       // Calculate the difference in DPS if you took this piece off
       // if(this.values['dps-damage']) {
         var newDps = this.calcOffense();
         this.values['dps-' + i] = this.values['dps'] - newDps['dps'];   
         if(!this.values['dps-gear-total']) {
   			   this.values['dps-gear-total'] = 0;
   			 }
   			 this.values['dps-gear-total'] += this.values['dps-' + i];
       // }
     // }
			// console.log("parsing", g, i);
     // Readd the Item to the set
     this.parseItem(g, i);
    }, this);
    // // Calculate DPS per Stat
    var incs = {
     'pt-primary': {'stat': 1},
     'pt-critical-hit': {'critical-hit': 1},
     'pt-critical-hit-damage': {'critical-hit-damage': 1},
     'pt-min-damage': {'min-damage': 1},
     'pt-max-damage': {'max-damage': 1},
     'pt-attack-speed': {'attack-speed': 1}
    };
    _.each(incs, function(v, k) {
     var item = {};
     switch(k) {
       case "pt-primary":
         item = { attrs: { } };
         item.attrs[this.attrs.primary] = 1;
         break;
       case "pt-armor":
         item = {
           stats: v
         };
         break;
       default:
         item = {
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
    }, this);
		// Append Attributes into the values
		this.values = _.extend(this.attrs, this.values);
		// Return the values
		return this.values;
	},
	removeItem: function(slot) {
		var json = this.gear[slot];
		this.gear[slot] = false;
		if(slot == 'offhand') {
			this.isDuelWielding = false;
		}
		if(!json) {
		  return false;
		}
		// d3up.log("Removing Item from ["+slot+"], now: " + this.gear[slot]);
		if(json.set) {
			// d3up.log("=====", json.set);
			// d3up.log("-1 for " + slot);
			this.sets[json.set]--;
		}
		// console.log(json.type);
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				if(typeof(av) != 'object' && isNaN(parseFloat(av))) {
					av = 0;
				}
				switch(ak) {
				  case "melee-reduce":
				  case "elite-reduce":
				  case "range-reduce":
            if(_.indexOf(this.attrs[ak + '-incs'], av) >= 0) {
              this.attrs[ak + '-incs'].splice(_.indexOf(this.attrs[ak + '-incs'], av), 1);              
            }
				    break;
					case "armor":
						if(json.type == 'ring' || json.type == 'amulet') {
							this.attrs[ak] -= parseFloat(av);
						}
						break;
					case "plus-block":
						// console.log(json.type);
						if(json.type != 'shield') {
							// console.log("removing block from", json.type);
							this.attrs[ak] -= parseFloat(av);
						}
						// console.log("----");
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
					case "plus-aps":
						// Add the Bonus to whichever weapon this isn't on...
						if(slot == "mainhand") {
							if(this.attrs['speed-oh']) {
								this.attrs['speed-oh'] -= parseFloat(av);								
							}
						}
						if(slot == "offhand") {
							if(this.attrs['speed']) {
								this.attrs['speed'] -= parseFloat(av);
							}
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
								this.attrs['attack-speed-incs'] -= av;
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
				if(ak == "damage") {
					values = av.split("-");
					if(typeof(this.attrs['max-damage']) != "undefined") {
						this.attrs['max-damage'] -= parseFloat(values[1]);
					} else {
						this.attrs['max-damage'] = parseFloat(values[1]);
					}
					if(typeof(this.attrs['min-damage']) != "undefined") {
						this.attrs['min-damage'] -= parseFloat(values[0]);
					} else {
						this.attrs['min-damage'] = parseFloat(values[0]);
					}
				} else if(typeof(this.attrs[ak]) != "undefined") {
					this.attrs[ak] -= parseFloat(av);
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
							this.attrs[ak] -= av;
						}
						if(slot == "offhand") {
							this.attrs['speed-oh'] -= av;
						}
						break;
					case "arcane-damage":
					case "fire-damage":
					case "lightning-damage":
					case "poison-damage":
					case "cold-damage":
					case "holy-damage":
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
					case "block-value":
					case "block-amount":
						this.attrs['block-amount'] = 0;
						break;
					default:
						this.attrs[ak] -= parseFloat(av);
						break;
				}
			}, this);					
		}
		// d3up.log(this.attrs);
	},
	parseItem: function(json, slot) {
    // d3up.log(this.gear[slot]);
		this.gear[slot] = json;
    // d3up.log("Parsing item to slot ["+slot+"], now: " + this.gear[slot].name);
		// Add to SetBonus Counter
		if(!json) {
      return false;
		}
		if(json.set) {
			// d3up.log("=====", json.set);
			// d3up.log("+1 for " + slot);
			if(!this.sets[json.set]) {
				this.sets[json.set] = 0;
			}
			this.sets[json.set]++;
		}
		if(json.stats) {
			_.each(json.stats, function(av, ak) {
				switch(ak) {
					case "speed":
						if(slot == "mainhand") {
							if(this.attrs[ak]) {
								this.attrs[ak] += parseFloat(av);																
							} else {
								this.attrs[ak] = parseFloat(av);								
							}
						}
						if(slot == "offhand") {
							// console.log("adding offhand", ak, av);
							this.isDuelWielding = true;
							// console.log("before: ", this.attrs['speed-oh']);
							if(this.attrs['speed-oh']) {
								this.attrs['speed-oh'] += parseFloat(av);																
							} else {
								this.attrs['speed-oh'] = parseFloat(av);								
							}
							// console.log("after: ", this.attrs['speed-oh']);
						}
						break;
					case "damage":
						if(slot == "mainhand") {
							this.attrs[ak] = {
								min: av['min'],
								max: av['max']
							};
							this.attrs['mhRealDamage'] = {
								min: av['min'],
								max: av['max']
							};
						}							
						if(slot == "offhand") {
							this.attrs['damage-oh'] = {
								min: av['min'],
								max: av['max']
							};
							this.attrs['ohRealDamage'] = {
								min: av['min'],
								max: av['max']
							};
						}							
						break;
					case "block-chance":
						this.attrs['block-chance'] = av;
						break;
					case "block-value":
					case "block-amount":
						this.isDuelWielding = false;
						this.attrs['block-amount'] = av['min'] + "-" + av['max'];
						break;
					case "armor":
						switch(json.type) {
							case "ring":
							case "amulet":				
								break;
							default:
								if(this.attrs[ak]) {
									this.attrs[ak] += parseFloat(av);
								} else {
									this.attrs[ak] = parseFloat(av);
								}
								break;
						}
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
		if(json.attrs) {
			_.each(json.attrs, function(av, ak) {
				if(typeof(av) != 'object' && isNaN(parseFloat(av))) {
					av = 0;
				}
				switch(ak) {
				  case "melee-reduce":
				  case "elite-reduce":
				  case "range-reduce":
				    if(!this.attrs[ak + '-incs']) {
				      this.attrs[ak + '-incs'] = [];
				    }
			      this.attrs[ak + '-incs'].push(av);
				    break;
					case "arcane-damage":
					case "fire-damage":
					case "lightning-damage":
					case "poison-damage":
					case "cold-damage":
					case "holy-damage":
						this.attrs[ak] = av;
						if(this.attrs['damage'] && typeof(av) == 'object') {
							if(slot == "mainhand") {
								this.attrs['mhRealDamage'] = {
									min: this.attrs['damage']['min'] - av.min,
									max: this.attrs['damage']['max'] - av.max,
								};
							} 
							if(slot == "offhand") {
								this.attrs['ohRealDamage'] = {
									min: this.attrs['damage-oh']['min'] - av.min,
									max: this.attrs['damage-oh']['max'] - av.max,
								};								
							}
						}
						break;
					case "armor":
						if(json.type == 'ring' || json.type == 'amulet') {
							if(this.attrs[ak]) {
								this.attrs[ak] += parseFloat(av);
							} else {
								this.attrs[ak] = parseFloat(av);
							}
						}
						break;
					case "block-chance":
					case "plus-block":
						// console.log(json.type);
						if(json.type != 'shield') {
							// console.log("adding block", json.type);
							if(this.attrs[ak]) {
								this.attrs[ak] += parseFloat(av);
							} else {
								this.attrs[ak] = parseFloat(av);
							}									
						}
						// console.log("----");
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
  						  if(slot == "mainhand" || slot == "offhand") {
                  this.attrs[slot + "-plus-damage"] = parseFloat(av);
  						  }
								break;
						}
						break;
					case "plus-aps":
						// console.log("adding aps");
						// Add the Bonus to whichever weapon this isn't on...
						if(slot == "mainhand") {
							// console.log("found aps on mh, adding oh: ", this.attrs['speed-oh'], av);
							if(this.attrs['speed-oh']) {
								this.attrs['speed-oh'] += parseFloat(av);								
							} else {
								this.attrs['speed-oh'] = parseFloat(av);								
							}
							// console.log("oh speed now", this.attrs['speed-oh']);
						}
						if(slot == "offhand") {
							if(this.attrs['speed']) {
								this.attrs['speed'] += parseFloat(av);
							} else {
								this.attrs['speed'] = parseFloat(av);								
							}
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
									this.attrs['attack-speed-incs'] = av;
								} else {
									this.attrs['attack-speed-incs'] += av;
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
				if(ak == "damage") {
					values = av.split("-");
					if(typeof(this.attrs['max-damage']) != "undefined") {
						this.attrs['max-damage'] += parseFloat(values[1]);
					} else {
						this.attrs['max-damage'] = parseFloat(values[1]);
					}
					if(typeof(this.attrs['min-damage']) != "undefined") {
						this.attrs['min-damage'] += parseFloat(values[0]);
					} else {
						this.attrs['min-damage'] = parseFloat(values[0]);
					}
				} else if(typeof(this.attrs[ak]) != "undefined") {
					this.attrs[ak] += parseFloat(av);
				} else {
					this.attrs[ak] = parseFloat(av);
				}
			}, this);
		}
	},
	diff: function(s1, s2, allowAll) {
		var diff = {},
				allowed = {
					'ap-max': 'Max AP', 
					'plus-movement': '+Movement', 
					'plus-magic-find': '+Magic Find', 
					'plus-gold-find': '+Gold Find', 
					'resist-all': 'Resist All',
					'thorns': 'Thorns', 
					'life-hit': 'Life/Hit', 
					'life-regen': 'Life/Regen',
					'ap-on-crit': 'AP/Crit', 
					'plus-block': '+Block', 
					'dps': 'DPS', 
					'ehp': 'EHP', 
					'life': 'HP',
					'intelligence': 'Int', 
					'vitality': 'Vit', 
					'dexterity': 'Dex', 
					'strength': 'Str', 
					'dodgePercent': 'Dodge', 
					'blockChance': 'Block %', 
					'allResist': 'All Resists', 
					'lifeTotal': 'Life', 
					'plus-life': '+Life', 
					'armor': 'Armor', 
					'cold-resist': 'Cold Res', 
					'lightning-resist': 'Lightning Res', 
					'fire-resist': 'Fire Res', 
					'arcane-resist': 'Arcane Res', 
					'poison-resist': 'Poison Res', 
					'physical-resist': 'Physical Res', 
					'critical-hit': 'Crit Hit', 
					'critical-hit-damage': 'Crit Hit Dmg',
					'dps-speed-mh': 'MH Attk/Sec',
					'dps-speed-oh': 'OH Attk/Sec',
					'ehp-block': 'EHP w/ Block',
					'ehp-dodge': 'EHP w/ Dodge',
					'block-amount': 'Block', 
					'block-chance': '%Block',
					'total-armor-reduction': 'Armor DmgReduce', 
					'total-resist-reduction': 'Resist DmgReduce',
					'total-damage-reduction': 'Total DmgReduce',
				};
    // console.log(s1, s2);
		_.each(s1, function(val, key) {
			if(typeof(s2[key]) != "undefined") {
				if(allowAll || allowed.hasOwnProperty(key)) {
					if(!s1[key]) {
						s1[key] = 0;
					}
					if(!s2[key]) {
						s2[key] = 0;
					}
					if(s2[key] - s1[key] != 0) {
						if(allowAll) {
							diff[key] = allowed[key] + "|" + Math.round((s2[key] - s1[key]) * 100) / 100;						
						} else {
							diff[key] = allowed[key] + "|" + Math.round((s2[key] - s1[key]) * 100) / 100;													
						}
						// d3up.log(key + " - s2["+s2[key]+"] - s1["+s1[key]+"] = "+diff[allowed[key]]);					
					}
				} else {
					// d3up.log("disallowed: "+ key);
				}
			}
		});
		return diff;
	}
};

d3up.BuildCalculator = BuildCalculator
})( d3up );

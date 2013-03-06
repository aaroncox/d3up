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
			'cold-reduce': 0,
			'resist-all': 0,
			'plus-gold-find': 0,
			'plus-magic-find': 0,
			'ruby-damage-mainhand': 0,
			'ruby-damage-offhand': 0
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
			'plus-attack-speed-after': 0,
			'plus-percent-life-regen': 0,
			'plus-percent-life-regen-passive': 0,
			'proc-generate-fury': 0,
			'generate-fury-second': 0,
			'extra-armor': 0
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
			case "plus-percent-vitality":
				this.attrs['vitality'] = Math.round(this.attrs['vitality'] * (1 + (e / 100)));
				break;
			case "plus-dodge":
				var value = e / 100;
				this.bonuses['plus-dodge'].push(value);
				break;
			case "plus-range-reduce":
  	    if(!this.attrs['range-reduce-incs']) {
  	      this.attrs['range-reduce-incs'] = [];
  	    }
        this.attrs['range-reduce-incs'].push(e * 100);
  			break;
			case "plus-melee-reduce":
		    if(!this.attrs['melee-reduce-incs']) {
		      this.attrs['melee-reduce-incs'] = [];
		    }
	      this.attrs['melee-reduce-incs'].push(e * 100);
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
			case "plus-life-regen":
				if(this.attrs['life-regen']) {
					this.attrs['life-regen'] += e;					
				} else {
					this.attrs['life-regen'] = e;
				}
				break;
			case "plus-life-steal":
  			if(this.attrs['life-steal']) {
  				this.attrs['life-steal'] += e;					
  			} else {
  				this.attrs['life-steal'] = e;
  			}
			  break;
			case "percent-non-physical":
			case "plus-life":
			case "plus-damage-reduce":
			case "plus-resist-all":
			case "plus-attack-speed":
			case "plus-attack-speed-after":
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
		_.each(this.enabledSkills, function(v,k) {
			if(v.procEffect) {
				_.each(v.procEffect, function(e,i) {
					switch(i) {
						case "generate-fury-crit":
							if(this.bonuses['proc-generate-fury-crit']) {
								this.bonuses['proc-generate-fury-crit'] += e;
							} else {
								this.bonuses['proc-generate-fury-crit'] = e;								
							}
							break;
					}
				}, this);
			}
			_.each(v.effect, function(e,i) {
				switch(i) {
					case "plus-aps":
						if(this.attrs['speed']) {
							this.attrs['speed'] += e;
						}
						if(this.attrs['speed-oh']) {
							this.attrs['speed-oh'] += e;
						}
						break;
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
						this.bonuses['monk-fitl-bonus'] = true;
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
					case "plus-percent-life-regen":
						this.bonuses['plus-percent-life-regen'] = e;
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
	calcFITL: function(bnEleDamage) {
		var mhSpeed = this.attrs['speed'],
				ohSpeed = this.attrs['speed-oh'],
				atkSpeedInc = 0;
		if(this.attrs['attack-speed-incs']) {
			atkSpeedInc = this.attrs['attack-speed-incs'] / 100;
		}
		mhSpeed *= (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']);
		ohSpeed *= (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']);
		if(this.attrs.damage) {
			var mhDamageMin = this.attrs.damage.min,
					mhDamageMax = this.attrs.damage.max,
					bnDamageMin = 0,
					bnDamageMax = 0;
			if(this.attrs['min-damage']) {
				bnDamageMin = this.attrs['min-damage'];
			}
			if(this.attrs['max-damage']) {
				bnDamageMax = this.attrs['max-damage'];							
			}
 			return (mhDamageMin + bnDamageMin + mhDamageMax + bnDamageMax + bnEleDamage * 2) * 0.3 * mhSpeed;
			// this.bonuses['monk-fitl-bonus-mh'] = this.bonuses['monk-fitl-bonus'];
			// if(this.attrs['damage-oh']) {
			// 	var ohDamageMin = this.attrs['damage-oh'].min,
			// 			ohDamageMax = this.attrs['damage-oh'].max;
			// 	this.bonuses['monk-fitl-bonus-oh'] = (ohDamageMin + bnDamageMin + ohDamageMax + bnDamageMax) * 0.3 * ohSpeed;
			// }
		}
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
			if(v.procEffect) {
				_.each(v.procEffect, function(e,i) {
					switch(i) {
						case "generate-fury-throw":
							this.bonuses['proc-generate-fury-throw'] = e;								
							break;
					}
				}, this);
			}
		
      // console.log(v, k);
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
							if(reverse == true) {
								value = -value;
								_.each(this.attrs[effect + '-incs'], function(v,k) {
									var removed = false;
									if(v == value * 100 && !removed) {
										this.attrs[effect + '-incs'][k] = 0;
										removed = true;
									}
								}, this);
							} else {
					      this.attrs[effect + '-incs'].push(value * 100);								
							}
					    break;
						case "plus-percent-life-regen-passive":
							this.bonuses['plus-percent-life-regen'] = value;
							break;
						case "proc-generate-fury":
						case "generate-fury-second":
							this.bonuses[effect] += value;
							break;
						case "flatten-resists":
							// this.attrs['resist-all'] = highest;
							// d3up.log(this.attrs['resist-all'], highest, this.attrs['resist-all'] + highest);
							this.bonuses['flatten-resists'] = true;
							break;
						case "plus-life":
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
						case "plus-damage-reduce":
						  this.bonuses['plus-damage-reduce'] += value;
							// mathDamageReduce = mathDamageReduce * (1 + value);
							break;
						case "health-globes":
							// if(attrs['health-globes'] && attrs['health-globes'] > 0) {
							// 	attrs['health-globes'] = attrs['health-globes'] * (1 + value);									
							// }
							break;								
						case "critical-to-dodge":
							var value = Math.round(this.attrs['critical-hit'] * 0.30 / 100 * 100) / 100;
							if(reverse == true) {
								var pos = _.indexOf(this.bonuses['plus-dodge'], value);
								this.bonuses['plus-dodge'].splice(pos,1);
							} else {
								this.bonuses['plus-dodge'].push(value);
							}						
							break;							
						case "dexterity-to-armor":								
							if(reverse == true) {
								this.bonuses['extra-armor'] = (this.attrs['dexterity'] * value);
							} else {
								this.bonuses['extra-armor'] = (this.attrs['dexterity'] * value);
							}
							// console.log("Armor: ", this.bonuses['extra-armor'], "Dexterity: ", this.attrs['dexterity'], "Multi:", value);
							break;
						case "vitality-to-armor":
							if(reverse == true) {
								this.bonuses['extra-armor'] = 0;
							} else {
								this.bonuses['extra-armor'] = (this.attrs['vitality'] * value);
							}
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
						case "bb-weapon-throw-dmg":								
							if(this.attrs[effect]) {
								this.attrs[effect] += (value); 
							} else {
								this.attrs[effect] = value;
							}
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
														var pos = _.indexOf(this.bonuses['plus-dodge'], eff);
														this.bonuses['plus-dodge'].splice(pos,1);
													} else {
														this.bonuses['plus-dodge'].push(eff);														
													}
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
													case "proc-generate-fury":
													// console.log(eff);
														if(this.bonuses['proc-generate-fury']) {
															this.bonuses['proc-generate-fury'] += eff;															
														} else {
															this.bonuses['proc-generate-fury'] = eff;
														}
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
		rendered.life = 36 + 4 * this.level + (this.level - 25) * this.attrs['vitality'];
		// ----------------------------------
		// +% Life Addition
		// Formula : Life + ( Life * ( Plus Life / 100 ) )
		// ----------------------------------		
		rendered.life += (rendered.life * ((this.attrs['plus-life'] + this.bonuses['plus-life'] * 100) / 100));
		// ----------------------------------
		// Passive sw/ +% Life Regen based on Max Life
		// Barbarian - Inspiring Presense
		// Demon Hunter - Brooding
		// Formula : Life * (Regen * 0.01)
		// ----------------------------------		
		rendered['life-regen'] = this.attrs['life-regen'];
		if(this.bonuses['plus-percent-life-regen']) {
			rendered['life-regen'] += rendered.life * (this.bonuses['plus-percent-life-regen'] * 0.01);
		}
		// ----------------------------------
		// Armor
		// Formula: ( Armor + Strength ) * ( Bonus Armor Percentage )
		// ----------------------------------
		rendered.armor = (this.attrs['armor'] + this.attrs['strength'] + this.bonuses['extra-armor']) * (1 + this.bonuses['plus-armor']);
		// console.log("Calculated", "Armor: ", rendered.armor, "Extra Armor: ", this.bonuses['extra-armor']);
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
		_.each(['melee-reduce', 'range-reduce', 'elite-reduce', 'cold-reduce'], function(v,k) {
		  var temp = 1;
		  _.each(this.attrs[v + '-incs'], function(val, idx) {
		    temp = temp * (1 - val / 100);
		  }, this);
      rendered['percent-' + v] = Math.round((1 - temp) * 10000) / 10000;
			rendered['display-percent-' + v] = Math.round((1 - temp) * 10000) / 100;
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
			_.each(this.bonuses['plus-dodge'], function(v) {
				var percentage = rendered['dodge-chance'] / 100;
				// console.log("Modifying:", percentage, v);
				percentage = (1 - percentage) * (1 - v);
				// console.log("new: ", percentage);
				rendered['dodge-chance'] = (1 - percentage) * 100;
			});
		}
		// console.log(rendered['dodge-chance'], this.bonuses['plus-dodge']);
		
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
			rendered['ehp-cold'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-cold'] 		) * (1 - this.bonuses['percent-non-physical']) * (1 - defenses['percent-cold-reduce']) * (1 - 0.3) );
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
			rendered['ehp-cold'] 			= defenses.life / ( ( 1 - defenses.armorReduction ) * ( 1 - defenses['percent-resist-cold'] ) * ( 1 - defenses['percent-cold-reduce'] ) );
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
		// HP to EHP Ratio Calculation 
		// Formula: ( EHP / Life)
		// ----------------------------------
		rendered['hp-ehp-ratio'] = "1:" + Math.round(rendered['ehp'] / defenses.life * 100) / 100;
		// ----------------------------------
		// EHP Calculation by Damage Type
		// Formula: ( Life / (Percentage Damage Taken * Modifier ) )
		// ----------------------------------
		rendered['ehp-dodge'] = rendered['ehp-block-dodge'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['dodge-chance'] / 100));
		rendered['ehp-melee'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-melee-reduce'] ));
		rendered['ehp-range'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-range-reduce'] ));
		rendered['ehp-elite'] = defenses.life / ( rendered.damageTaken * ( 1 - defenses['percent-elite-reduce'] ));
		// ----------------------------------
		// EHP Block Calculation 
		// Formula: 
		// ----------------------------------
		rendered['ehp-block'] = rendered['ehp'];
		if(defenses['block-chance'] && defenses['block-amount']) {
			var hit = 70000,
					taken = rendered.damageTaken * hit,
					reduced = (defenses['block-chance'] / 100 * defenses['block-amount']),
					change = taken / (taken - reduced);
			// console.log(defenses['block-amount']);
			rendered['ehp-block'] = ( rendered['ehp']  * change );
			rendered['ehp-block-dodge'] = ( rendered['ehp-dodge']  * change );
			if(rendered['ehp-block'] < 0) {
				rendered['ehp-block'] = "Invulnerable";
			}
		}
		if(rendered['ehp-block-dodge'] < 0) {
			rendered['ehp-block-dodge'] = "Invulnerable";
		}
		
		// Return the Values for EHP
		return rendered;
	},
	calcGearDps: function() {
		var rendered = {};
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
     'pt-attack-speed': {'attack-speed': 1},
		 'pt-elemental-damage': {'plus-holy-damage': 1}
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
     rendered['dps-' + k] = newDps['dps'] - this.values['dps'];       
     // Re-add the Item to the gear set
     this.removeItem('extra');
    }, this);
		// Figuring out what equals what
		// var hK = false,
		// 		hV = false;
		// // Determine the Highest
		// _.each(rendered, function(v,k) {
		// 	if(v > hV) {
		// 		hK = k;
		// 		hV = v;
		// 	}
		// });
		// var equals = "";
		// _.each(rendered, function(v,k) {
		// 	var equiv = hV / v;
		// 	equals += " = " + equiv + " " + k;
		// });
		return rendered;
	},
	calcGearEhp: function(defenses, ehp) {
		var rendered = {};	// Storage for Rendered Statistics
		// Loop through each piece of gear
		_.each(this.gear, function(g, i) {
			// d3up.log("remove passives");
			this.applyPassives(true); // Reverses Passive Gains
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
		// Return rendered EHP Gear values
		return rendered;
	},
	calcEhpPerStat: function(defenses, ehp) {
		// console.log("Per Stat");
		var rendered = {};
		// Calculate EHP per Stat
		var incs = {
			'pt-resist-all': {'resist-all': 1},
			'pt-armor': {'armor': 1},
			'pt-vitality': {'vitality': 1},
			'pt-plus-life': {'plus-life': 1},
			'pt-intelligence': {'intelligence': 1},
			'pt-strength': {'strength': 1},
			'pt-dexterity': {'dexterity': 1},
			'pt-block': {'plus-block': 1},
			'pt-melee-reduce': {'melee-reduce': 1},
			'pt-range-reduce': {'range-reduce': 1},
			'pt-elite-reduce': {'elite-reduce': 1}
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
			this.applyPassives(true); // Reverse Passive Gains			
			this.parseItem(item, 'extra');
			this.applyPassives(); // Apply Passive Gains			
			var tDefenses = this.calcDefenses(),
					tEhp = this.calcEffectiveHealth(tDefenses);
			// console.log(tDefenses, tEhp, ehp.ehp);
			// Calculate the Difference in EHP without the item
			switch(k) {
				case "pt-dexterity":
					rendered['ehp-' + k] = (tEhp['ehp-dodge'] - ehp['ehp-dodge']);								
					break;
				case "pt-block":
					rendered['ehp-' + k] = (tEhp['ehp-block'] - ehp['ehp-block']);								
					break;
				case "pt-melee-reduce":
					rendered['ehp-' + k] = (tEhp['ehp-melee'] - ehp['ehp-melee']);
					break;
				case "pt-range-reduce":
					rendered['ehp-' + k] = (tEhp['ehp-range'] - ehp['ehp-range']);
					break;
				case "pt-elite-reduce":
					rendered['ehp-' + k] = (tEhp['ehp-elite'] - ehp['ehp-elite']);
					break;
				default:
					rendered['ehp-' + k] = tEhp['ehp'] - ehp.ehp;				
					break;
			}
			// console.log(rendered);
			// Re-add the Item to the gear set
			this.applyPassives(true); // Reverse Passive Gains			
			this.removeItem('extra');
			this.applyPassives(); // Apply Passive Gains			
		}, this);
		return rendered;
	},
	tickRate: function(speed) {
	  //Tick frame length = (20 / aps); rounded down to the nearest whole number
    // Number of tornado ticks = (180 / frame length); rounded up to the nearest whole number
    // Ticks per second = (60 / frame length)
    var frames = Math.floor(20 / speed),
        ticks = (60 / frames);
    return ticks;
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

		// Stupid fix for stupid blizzard math
		rendered = _.extend(rendered, this.applyRubies());

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
		// console.log(rendered);
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
		mhAvgDamage = (mhMinDamage + mhMaxDamage) / 2;				
		ohAvgDamage = (ohMinDamage + ohMaxDamage) / 2;
		
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
		rendered['attack-speed-incs'] = this.attrs['attack-speed-incs'] + (this.bonuses['plus-attack-speed'] * 100);
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

		rendered['dps-mh-avg-woele'] = mhAvgDamage;
		rendered['dps-oh-avg-woele'] = ohAvgDamage;
		
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
			bnEleDamage = (this.attrs.mhRealDamage.min + bnMinDamage + this.attrs.mhRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			mhAvgDamage += bnEleDamage;
			if(this.isDuelWielding) {
				bnEleDamageOh = (this.attrs.ohRealDamage.min + bnMinDamage + this.attrs.ohRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
				ohAvgDamage += bnEleDamageOh;
				rendered['bonus-elemental-damage-oh'] = bnEleDamageOh;
			}
		}
		// Add in Monk FITL if needed
		if(this.bonuses['monk-fitl-bonus']) {
			mhAvgDamage += this.calcFITL(bnEleDamage);
			// if(this.isDuelWielding) {
			// 	ohAvgDamage += this.bonuses['monk-fitl-bonus'];
			// }
		}
		
		rendered['dps-mh-avg'] = mhAvgDamage;
		rendered['dps-oh-avg'] = ohAvgDamage;
		rendered['bonus-elemental-damage'] = bnEleDamage;
		rendered['bonus-elemental-percent'] = bnElePercent;
    // console.log(this.attrs.mhRealDamage.min, bnMinDamage, bnElePercent, bnEleDamage);
		// Are we duel wielding?
		
		var afterEffect = 1;
		if(this.bonuses['plus-attack-speed-after']) {
			afterEffect += this.bonuses['plus-attack-speed-after'];
		}
		
    // d3up.log(this.attrs);		
		var mathS, mathC, mathR, mathA, mathM;
		rendered['attack-speed-incs-dw'] = " ";
    // console.log(this.attrs['speed']);
		if(this.isDuelWielding) {
			// Add to the Display Number
			rendered['attack-speed-incs-dw'] = " (+15% DW)";
 			rendered['dps-speed'] = {
        // mh: Math.floor(this.attrs['speed'] * 1024) / 1024,
        // oh: Math.floor(this.attrs['speed-oh'] * 1024) / 1024
        mh: this.attrs['speed'],
        oh: this.attrs['speed-oh']
 			};
			// console.log("speed during calc: ", this.attrs['speed'], this.attrs['speed-oh']);
			// d3up.log(mhMinDamage, mhMaxDamage, ohMinDamage, ohMaxDamage, bnMinDamage, bnMaxDamage);
			// d3up.log(this.attrs['speed'], this.attrs['speed-oh']);
			// d3up.log(rendered['dps-speed'].mh, rendered['dps-speed'].oh);
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathC = 1 + (this.attrs['critical-hit'] * 0.01) * (this.attrs['critical-hit-damage'] * 0.01);
			var mhAPS = rendered['dps-speed'].mh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']) * afterEffect,
					ohAPS = rendered['dps-speed'].oh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']) * afterEffect;
      // console.log(mhAPS);
			rendered['aps-mh'] = mhAPS;
			rendered['aps-oh'] = ohAPS;					
			mathR = 2 / (1 / mhAPS + 1 / ohAPS);
			mathA = (mhAvgDamage + ohAvgDamage) / 2;
			mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;			
			rendered['dps-speed-mh'] = rendered['dps-speed'].mh;
			rendered['dps-speed-oh'] = rendered['dps-speed'].oh;
			if(this.attrs.mhRealDamage) {
				rendered['scram-a-mh'] = mhAvgDamage * mathS * mathM * mathC;				
			}
			if(this.attrs.ohRealDamage) {
				rendered['scram-a-oh'] = ohAvgDamage * mathS * mathM * mathC;				
			}
			// console.log(mathS, mathC, mathR, mathA, mathM);
			// console.log(this.bonuses);
			// console.log(mhAvgDamage, bnEleDamage, mathS, mathM, mathC);
			// console.log(mathA, rendered['dps-speed'], (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed']));
			// rendered['dps-speed-mh'] = Math.round(rendered['dps-speed'].mh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed']) * 100) / 100;
			// rendered['dps-speed-oh'] = Math.round(rendered['dps-speed'].oh * (1 + 0.15 + atkSpeedInc + this.bonuses['plus-attack-speed'])  * 100) / 100;
			rendered['dps-speed-display'] = Math.round(mhAPS * 100000) / 100000 + " MH<br/>" + Math.round(ohAPS  * 100000) / 100000 + " OH";
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
			mathR = rendered['dps-speed-mh'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']) * afterEffect;
			// console.log(rendered['dps-speed'], atkSpeedInc, this.bonuses['plus-attack-speed']);
			mathA = mhAvgDamage;
			mathM = (1 + this.bonuses['plus-damage']);
			rendered['dps'] = mathS * mathC * mathR * mathA * mathM;		
      // d3up.log(mhMinDamage, mhMaxDamage, bnMinDamage, bnMaxDamage);
      // d3up.log(mathS, mathC, mathR, mathA, mathM, rendered['dps'], "1w");
			// rendered['dps'] = (((mhMinDamage + mhMaxDamage) / 2 + bnAvgDamage) * rendered['dps-speed']) * (1 + atkSpeedInc) * (this.attrs[this.attrs.primary] / 100 + 1) * 1 * ((this.attrs['critical-hit'] / 100) * (this.attrs['critical-hit-damage']/100) + 1);			
			rendered['scram-a-mh'] = mathA * mathM * mathS * mathC;
			// console.log(this.attrs['speed'], atkSpeedInc, this.bonuses['plus-attack-speed'], mathR);
			rendered['dps-speed-display'] = Math.round(mathR * 1000) / 1000;
		}
		// console.log(mathA);
		rendered['scram-s'] = mathS;
		rendered['scram-c'] = mathC;
		rendered['scram-r'] = mathR;
		rendered['scram-a'] = mathA;
		rendered['scram-m'] = mathM;
		rendered['bonus-damage'] = this.bonuses['plus-damage'];
		
		rendered['mh-min-damage'] = mathS * (mhMinDamage + bnEleDamage) * mathM;
		rendered['mh-max-damage'] = mathS * (mhMaxDamage + bnEleDamage) * mathM;
		rendered['mh-min-damage-crit'] = rendered['mh-min-damage'] * (1 + (this.attrs['critical-hit-damage'] * 0.01));
		rendered['mh-max-damage-crit'] = rendered['mh-max-damage'] * (1 + (this.attrs['critical-hit-damage'] * 0.01));
    if(this.isDuelWielding) {
  		rendered['oh-min-damage'] = mathS * (ohMinDamage + bnEleDamage) * mathM;
  		rendered['oh-max-damage'] = mathS * (ohMaxDamage + bnEleDamage) * mathM;
  		rendered['oh-min-damage-crit'] = rendered['oh-min-damage'] * (1 + (this.attrs['critical-hit-damage'] * 0.01));
  		rendered['oh-max-damage-crit'] = rendered['oh-max-damage'] * (1 + (this.attrs['critical-hit-damage'] * 0.01));
    }

    _.each(this.activeSkills, function(v,k) {
      var parts = k.split("~");
			// For whirlwind and rltw
      if(parts[0] == 'whirlwind' || k == 'sprint~c') {
        if(this.isDuelWielding) {
          // = ((0.7 * 43977.33) + (0.4833 * (43977.33 + 38764.61) / 2)) * 6
					var a = 0.7 * rendered['scram-a-mh'],
							b = 0.4833 * ((rendered['scram-a-mh'] + rendered['scram-a-oh']) / 2),
							c = (this.tickRate(mhAPS) + this.tickRate(ohAPS)) / 2;
					rendered['tdps'] = (a + b) * c;
          // rendered['tdps'] = ((0.7 * rendered['scram-a-mh']) + (0.4833 * ((rendered['scram-a-mh'] + rendered['scram-a-oh']) / 2))) * (this.tickRate(mhAPS) + this.tickRate(ohAPS) / 2);
        } else {
          // 2H Tdps = [(.7 *M) + (.4833 * M) ]* t = 1.1833*m*t
          rendered['tdps'] = ((0.7 * rendered['scram-a-mh']) + (0.4833 * rendered['scram-a-mh'])) * this.tickRate(mathR);
        }
        rendered['tickRate-mh'] = this.tickRate(mhAPS);
				if(this.isDuelWielding) {
	        rendered['tickRate-oh'] = this.tickRate(ohAPS);
				}
      }
    }, this);
    // console.log(rendered);
		// Add any bonus damage onto the damage calculation
		// if(this.bonuses['plus-damage']) {
			// d3up.log(this.bonuses['plus-damage']);
			// return rendered['dps'] * (1 + this.bonuses['plus-damage']);
		// }
    // d3up.log(rendered);
		if(this.attrs['elite-damage']) {
			rendered['dps-elites'] = Math.round(rendered['dps'] * (1 + (this.attrs['elite-damage'] / 100)) * 100) / 100;
			rendered['tdps-elites'] = rendered['tdps'] * (1 + (this.attrs['elite-damage'] / 100));
		}
		if(this.attrs['demon-damage']) {
			rendered['dps-demon'] = Math.round(rendered['dps'] * (1 + (this.attrs['demon-damage'] / 100)) * 100) / 100;
			rendered['tdps-demon'] = rendered['tdps'] * (1 + (this.attrs['demon-damage'] / 100));
		}
		if(this.attrs['demon-damage'] && this.attrs['elite-damage']) {
			rendered['dps-demon-elite'] = Math.round(rendered['dps'] * (1 + (this.attrs['demon-damage'] / 100) + (this.attrs['elite-damage'] / 100)) * 100) / 100;
			rendered['tdps-demon-elite'] = rendered['tdps'] * (1 + (this.attrs['demon-damage'] / 100) + (this.attrs['elite-damage'] / 100));
			
		}
		return rendered;
	},
	calcSAME: function(options) {
	  var skill = options.skill, 
	      duration = options.duration, 
	      mhOnly = options.mhOnly, 
	      isStatic = options.isStatic,
				tickModifier = options.tickModifier;
	  
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
				bnSkillDamage = 0,
				critHit = this.attrs['critical-hit'],
				critHitDmg = this.attrs['critical-hit-damage'],
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
		if(this.attrs['max-damage']) {
			bnMaxDamage = this.attrs['max-damage'];
			mhMaxDamage += this.attrs['max-damage']; // / (1 - (this.attrs['mainhand-plus-damage'] * 0.01));      
			if(ohMaxDamage) {
				ohMaxDamage += this.attrs['max-damage'];              
			}
		}
		if(this.attrs['min-damage']) {
			bnMinDamage = this.attrs['min-damage'];
		  mhMinDamage += this.attrs['min-damage']; // / (1 - (this.attrs['mainhand-plus-damage'] * 0.01));        
		  if(ohMinDamage) {
		    ohMinDamage += this.attrs['min-damage'];              
		  }
		}
		// Calculate Averages
		mhAvgDamage = (mhMinDamage + mhMaxDamage) / 2;				
		ohAvgDamage = (ohMinDamage + ohMaxDamage) / 2;
		
		// Elemental Damage Bonuses
		_.each(['plus-fire-damage', 'plus-arcane-damage', 'plus-poison-damage', 'plus-cold-damage', 'plus-lightning-damage', 'plus-holy-damage'], function(v,k) {
			if(_.has(this.attrs, v)) {
				bnElePercent += this.attrs[v];
			}
		}, this);

		// Determine Bonus Damage from Elemental Damage Bonuses
		if(bnElePercent > 0 && this.attrs.mhRealDamage) {
			bnEleDamage = (this.attrs.mhRealDamage.min + bnMinDamage + this.attrs.mhRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
			mhAvgDamage += bnEleDamage;
			mhMinDamage += bnEleDamage;
			mhMaxDamage += bnEleDamage;
			if(this.isDuelWielding) {
				bnEleDamageOh = (this.attrs.ohRealDamage.min + bnMinDamage + this.attrs.ohRealDamage.max + bnMaxDamage) / 2 * (bnElePercent / 100);
				ohAvgDamage += bnEleDamageOh;
				ohMinDamage += bnEleDamage;
				ohMaxDamage += bnEleDamage;
			}
		}
		// Any additional attacks
		if(this.attrs['attack-speed-incs']) {
			atkSpeedInc = this.attrs['attack-speed-incs'] / 100;
		}
		
		// Do we modify the damage or crit at all?
		var shortName = false;
		switch(this.heroClass) {
			case "barbarian":
				shortName = 'bb';
				break;
			case "demon-hunter":
				shortName = 'dh';
				break;
			case "monk":
				shortName = 'mk';
				break;
			case "witch-doctor":
				shortName = 'wd';
				break;
			case "wizard":
				shortName = 'wz';
				break;
		}
		
		if(shortName) {
			var attributeName = shortName + '-' + options.skillName,
					attributeTip = false;
			if(this.attrs[shortName + '-' + options.skillName + '-dmg']) {
				attributeTip = shortName + '-' + options.skillName + '-dmg';
			} else if(this.attrs[shortName + '-' + options.skillName]) {
				attributeTip = shortName + '-' + options.skillName;
			}
			if(attributeTip) {
				var bonusValue = this.attrs[attributeTip];
				if(td[attributeTip]) {
					if(td[attributeTip].search(/cost/i) >= 0) {
						// console.log("Resource cost reduction");
					} else if(td[attributeTip].search(/critical hit/i) >= 0) {
						// console.log("Crit Hit increase");
						critHit += bonusValue;
						bonusText = "<span class='skill-highlight'>+" + bonusValue + "%</span> Crit";
					} else if(td[attributeTip].search(/damage/i) >= 0) {					
						bnSkillDamage += bonusValue;
						bonusText = "<span class='skill-highlight'>+" + bonusValue + "%</span> Damage";
					}					
				}
			}
		}
		
		// Do we have bonus +% Elemental Skill Damage?
		if(skill.effect['weapon-damage-type']) {
			var dmgType = skill.effect['weapon-damage-type'],
					dmgAttr = 'plus-' + dmgType + '-damage-skills';
			bonusText = "<span class='skill-highlight'>+" + this.attrs[dmgAttr] + "%</span> Damage";
			if(this.attrs[dmgAttr]) {
				bnSkillDamage += this.attrs[dmgAttr];
			}
		}
		
		// Does this skill get bonus crit hit damage?
		if(skill.effect && skill.effect['plus-crit-hit-damage']) {
			critHitDmg += skill.effect['plus-crit-hit-damage'];
		}
		
		// Convert mathE to a percentage
		mathE = mathE / 100;

		if(this.bonuses['monk-fitl-bonus']) {
			mhAvgDamage += this.calcFITL(bnEleDamage);
		}

		// Monks have bonus hidden attack speed
		var bonusHaste = 1;
		if(options.skill.monkHaste) {
			bonusHaste = options.skill.monkHaste;
			rendered['dps'] = Math.round(rendered['dps'] * bonusHaste);
		}
		
		// Monks also have skills that don't add up attack speed normally :P
		var afterEffect = 1;
		if(this.bonuses['plus-attack-speed-after']) {
			afterEffect += this.bonuses['plus-attack-speed-after'];
		}
		
		// console.log(options.skill.effect);
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
			mathA = (mhAvgDamage + ohAvgDamage) / 2;
			mathAl = (mhMinDamage + ohMinDamage) / 2;
			mathAh = (mhMaxDamage + ohMaxDamage) / 2;
			mathM = (1 + this.bonuses['plus-damage'] + (bnSkillDamage * 0.01));
			var mhAPS = rendered['dps-speed'].mh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']) * bonusHaste * afterEffect,
					ohAPS = rendered['dps-speed'].oh * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']) * bonusHaste * afterEffect;
			mathR = 2 / (1 / mhAPS + 1 / ohAPS);
			// mathR = (rendered['dps-speed'].mh + rendered['dps-speed'].oh) / 2 * (1 + atkSpeedInc + 0.15 + this.bonuses['plus-attack-speed']);
			mathC = 1 + (critHit * 0.01) * (critHitDmg * 0.01);
			// console.log(critHit, critHitDmg);
			dLow = mathS * mathAl * mathM * mathE;
			dHigh = mathS * mathAh * mathM * mathE;
			dAvg = mathS * mathA * mathM * mathE;
			// d3up.log(mathS, mathAl, mathAh, mathM, dLow, dHigh, mathE);
		} else {
			rendered['dps-speed'] = Math.floor(this.attrs['speed'] * 1024) / 1024;
			mathS = 1 + this.attrs[this.attrs.primary] * 0.01;
			mathC = 1 + (critHit * 0.01) * (critHitDmg * 0.01);
			mathR = rendered['dps-speed'] * (1 + atkSpeedInc + this.bonuses['plus-attack-speed']) * bonusHaste * afterEffect;
			mathA = mhAvgDamage;
			mathAl = mhMinDamage;
			mathAh = mhMaxDamage;
			mathM = (1 + this.bonuses['plus-damage'] + (bnSkillDamage * 0.01));
			dLow = mathS * mathAl * mathM * mathE;
			dHigh = mathS * mathAh * mathM * mathE;
			dAvg = mathS * mathA * mathM * mathE;
			mhAvg = mathS * mathA * mathM * mathE;
		}
		// console.log(options.skill.name, dLow, dHigh);
		dps = Math.round(dAvg * mathR * mathC);
		// d3up.log(atkSpeedInc);
    // d3up.log(options.skill, dLow, dHigh, dps, mathR, mathC, bnEleDamage);
		hit = Math.round(mathS * mathA * mathM * mathE * mathC);
		if(skill.effect['no-crits']) {
			dps = Math.round(dAvg * mathR);
			hit = Math.round(mathS * mathA * mathM * mathE);			
		}
    // console.log(hit, mathS, mathA, mathM, mathE, mathC);
		if(duration) {
		  if(isStatic) {
		    var tNorm = Math.round(mhAvg),
		        tCrit = Math.round(mhAvg * (critHitDmg * 0.01 + 1)); 
        rendered['per-tick-norm'] = Math.round(tNorm / (duration * 2)); 
        rendered['total-damage-norm'] = tNorm;
        rendered['per-tick-crit'] = Math.round(tCrit / (duration * 2)); 
        rendered['total-damage-crit'] = tCrit; 
        // d3up.log(rendered, mhAvg, tNorm, duration);
		  } else {
  			// dps = Math.round(((dLow + dHigh) / 2 ) * mathC * 100)/100;
  			rendered['per-tick'] = Math.round(hit / duration);
  			rendered['total-damage'] = rendered['per-tick'] * duration;
  			rendered['damage-tick'] = Math.round(dLow / duration) + " - " + Math.round(dHigh / duration);
  			rendered['critical-hit-tick'] = Math.round(dLow / duration * (1 + (critHitDmg * 0.01))) + " - " + Math.round(dHigh / duration * (1 + (critHitDmg * 0.01)));
		  }
		} else if(tickModifier) {
			rendered['dps'] = dps;							
			rendered['ticks'] = tickModifier;
			rendered['average-hit'] = Math.round(hit / tickModifier * 100) / 100;			
			rendered['damage'] = Math.round(dLow / tickModifier) + " - " + Math.round(dHigh / tickModifier);
			rendered['critical-hit'] = Math.round(dLow * (1 + (critHitDmg * 0.01)) / tickModifier) + " - " + Math.round(dHigh * (1 + (critHitDmg * 0.01)) / tickModifier);
			
		} else {
			rendered['average-hit'] = Math.round(hit * 100) / 100;			
			if(!hasCooldown) {
				rendered['dps'] = dps;							
			} else {
			  var speed = 0;
			  if(this.attrs['speed']) {
			    speed += this.attrs['speed'];
			  } 
			  if(this.attrs['speed-oh']) {
			    speed += this.attrs['speed-oh'];
			    speed / 2;
			  }
        rendered['average-hit'] = Math.round(hit * speed * 100) / 100;
        dLow = dLow * speed;
        dHigh = dHigh * speed;
			}
  		// Does this get a 3rd hit bonus? (Monks)
			if(this.bonuses['3rd-hit-damage']) {
				var d3Low = mathS * mathAl * (mathM + (this.bonuses['3rd-hit-damage'] / 100)) * mathE,
						d3High = mathS * mathAh * (mathM + (this.bonuses['3rd-hit-damage'] / 100)) * mathE,
						hit3 = Math.round(((d3Low + d3High) / 2 ) * mathC),
						dmgCycle = (((dLow + dHigh) / 2) + ((dLow + dHigh) / 2) + ((d3Low + d3High) / 2)) / 3;
 				rendered['3rd-hit'] = hit3;
			}
			// d3up.log(dLow, dHigh);
			rendered['damage'] = Math.round(dLow) + " - " + Math.round(dHigh);
			rendered['critical-hit'] = Math.round(dLow * (1+ (critHitDmg * 0.01))) + " - " + Math.round(dHigh * (1 + (critHitDmg * 0.01)));
			if(this.bonuses['pierce-bonus']) {
  		  rendered['damage-2nd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dLow) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dHigh);
  		  rendered['critical-hit-2nd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dLow * (1+ (critHitDmg * 0.01))) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100)) * dHigh * (1 + (critHitDmg * 0.01)));
  		  rendered['damage-3rd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dLow) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dHigh);
  		  rendered['critical-hit-3rd'] = Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dLow * (1+ (critHitDmg * 0.01))) + " - " + Math.round((1 + (this.bonuses['pierce-bonus'] / 100) * 2) * dHigh * (1 + (critHitDmg * 0.01)));
  		}
		}
		if(this.attrs['life-steal'] && (options.skill.procRate > 0 || options.skill.effect['forced-life-steal'])) {
			var lifeSteal = this.attrs['life-steal'];
			if(options.skill.effect['life-steal']) {
				lifeSteal += options.skill.effect['life-steal'];
			}
			// This is for Zombie Dogs, a 0% Proc Rate skill
			if(options.skill.effect['forced-life-steal']) {
				lifeSteal = options.skill.effect['forced-life-steal'];
			}
			rendered['average-life-steal'] = Math.round(lifeSteal * hit  * 0.2) / 100;
			rendered['lps-life-steal'] = mathR * rendered['average-life-steal'];
		}
		if(this.attrs['life-hit'] && options.skill.procRate > 0) {
			if(options.skill.procRate3rd) {
				var normHit = this.attrs['life-hit'] * options.skill.procRate, 
						thirdHit = this.attrs['life-hit'] * options.skill.procRate3rd;
				rendered['average-life-hit'] = Math.round((normHit + normHit + thirdHit) / 3 * 100) / 100;
				rendered['lps-life-hit'] = mathR * rendered['average-life-hit'];		
			} else {
				rendered['average-life-hit'] = Math.round(this.attrs['life-hit'] * options.skill.procRate * 100) / 100;
				rendered['lps-life-hit'] = mathR * rendered['average-life-hit'];								
			}
		}
		if(rendered['lps-life-steal'] || rendered['lps-life-hit']) {
			var total = 0;
			if(rendered['lps-life-steal']) {
				total += rendered['lps-life-steal'];
			}
			if(rendered['lps-life-hit']) {
				total += rendered['lps-life-hit'];
			}
			rendered['lps-average'] = Math.round(total * 100) / 100;
		}
		if(!rendered['rps']) {
			rendered['rps'] = {};
		}
		// Does the person have AP on Crit?
		// console.log(this.attrs);
		if(this.attrs['ap-on-crit']) {
			// console.log((1 - (critHit * 0.011)));
			if(options.skill.procRate) {
				rendered['rps']['ap'] = Math.round(mathR * this.attrs['ap-on-crit'] * (critHit * 0.01) * options.skill.procRate * 100) / 100 + " AP/Sec";				
				// rendered['rps']['ap'] = (Math.round((critHit) * (options.skill.procRate) * 10)/10) + "%, +" + this.attrs['ap-on-crit'] + " AP";				
			}
			// console.log(rendered['rps']['ap']);
		}
		// Does this skill generate anything for us?
		_.each(['generate-fury', 'generate-hatred', 'generate-spirit'], function(v,k) {
			// console.log(k,v,options.skill);
			var resource = v.split("-")[1],
					generate = 0;
			if(options.skill.effect && options.skill.effect[v]) {
				generate += options.skill.effect[v];
			}
			// console.log(options.skillName);
			// This is battlerage, uses crits
			if(v == "generate-fury" && this.bonuses['proc-generate-fury']) {
				generate += this.bonuses['proc-generate-fury'] * options.skill.procRate;
				// console.log("weapons master", this.bonuses['proc-generate-fury'], options.skill.procRate, generate);
			}
			if(v == "generate-fury" && this.bonuses['proc-generate-fury-crit']) {
				generate += this.bonuses['proc-generate-fury-crit'] * (critHit * 0.01) * options.skill.procRate;
				// console.log("battlerage", this.bonuses['proc-generate-fury-crit'], options.skill.procRate, critHit, generate);
			}
			if(v == "generate-fury" && this.bonuses['proc-generate-fury-throw'] && options.skillName == "weapon-throw") {
				generate += this.bonuses['proc-generate-fury-throw'] * (critHit * 0.01) * options.skill.procRate;
				// console.log("no escape", this.bonuses['proc-generate-fury-throw'], options.skill.procRate, critHit, generate);
			}
			if(v == "generate-spirit" && options.skill.procEffect && options.skill.procEffect['generate-spirit-crit']) {
				generate += options.skill.procEffect['generate-spirit-crit'] * (critHit * 0.01) * options.skill.procRate;
				// console.log("quickening", options.skill.procEffect['generate-spirit-crit'], options.skill.procRate, critHit, generate);
			}
			
			// Generate the Resource Display
			if(generate) {
				if(duration) {
					rendered['rps'][resource] = Math.round(generate * 2 * 100) / 100;
				} else {
					rendered['rps'][resource] = Math.round(generate * mathR * 100) / 100;					
				}
			}
			// Unforgiving Passive
			if(generate && v == "generate-fury" && this.bonuses['generate-fury-second']) {
				rendered['rps'][resource] += this.bonuses['generate-fury-second'];
			}

		}, this);
		
		rendered['bnSkillDamage'] = bnSkillDamage;
		
		
		// console.log(rendered['rps']);
		// if(option.skill.effect[])
    // d3up.log(rendered);
    return rendered;
	},
	calcSkill: function(k, v) {
		var rendered = {},
				options = {},
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
					case "plus-attack-speed-after":
					case "plus-melee-reduce":
					case "plus-damage":
					case "plus-armor":
					case "plus-resist-all":
					case "plus-dodge":
					case "plus-life-steal":
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
						options.skillName = k.split("~")[0];
						options.skill = v; // Pass in the whole skill
						break;
					case "tick-modifier":
						options.tickModifier = e;
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
		return rendered;
	},
	calcSkills: function() {
		var rendered = {};
		// Calculate Skill data for Actives
		_.each(this.activeSkills, function(v,k) {
			_.extend(rendered, this.calcSkill(k,v));		
		}, this);
		// Calculate Skill data for Passives
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
						case "plus-percent-life-regen":
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
	calcAllSkills: function() {
		var rendered = {};
		// Calculate Skill data for All Skills
		_.each(d3up.gameData.actives[this.heroClass], function(v,k) {
			// console.log(v,k);
			_.extend(rendered, this.calcSkill(k,v));		
		}, this);
		// console.log(rendered);
		return {allSkillData: rendered};
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
		// console.log(this.sets);
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
                if(_.indexOf(['melee-reduce', 'range-reduce', 'elite-reduce', 'cold-reduce'], stat) >= 0) {
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
	calcLifeRegen: function(dps, skills) {
		var rendered = {}; // Storage for Rendered Statistics
		rendered['inc-ls'] = dps.dps / 100 * 0.2;
		// console.log(dps, skills);
		// console.log(rendered);
		return rendered;
	},
	calcBES: function(defenses, ehp, dps) {
    // BES - Battle efficiency score: 
    /* { 
        (
          Tdps * 
          [ehp^(1/1.02)] * 
          [MS ^ (1/1.15)] * 
          (1+ [ls/25] ) * 
          (1+ [((t^(1/1.05)) *.05 ] ) * 
          (1+ [loh/5500] ) 
        ) 
        / 500,000
       } 
    */
    var besEhp = ehp['ehp'] ^ (1/1.02),
        besMs = this.attrs['plus-movement'] ^ (1/1.15),
        besLs = 1 + (this.attrs['life-steal'] / 25),
        //        (1 + [((t                               ^ ( 1 / 1.05 )) * 0.05 ] )
        besTicks = 1 + (((this.tickRate( dps['scram-r'] ) ^ ( 1 / 1.05 )) * 0.05 )) ,
        besLoH = 1 + (this.attrs['life-hit'] / 5500),
        bes = (dps['tdps'] * besEhp * besMs * besLs * besLoH) / 500000;
    return {bes: bes};
	  //     console.log(dps['scram-r'], this.tickRate( dps['scram-r']), bes, besMs, besLs, besTicks, besLoH, this.attrs);
	  // console.log(defenses, ehp, dps);
	},
	applyRubies: function() {
		// console.log(this.attrs);
		// console.log("[PRE] Current Damage Ranges");
		// console.log("MH: ", this.attrs['damage'].min, this.attrs['damage'].max);
		// console.log("OH: ", this.attrs['damage-oh'].min, this.attrs['damage-oh'].max);
		var mh = this.getItem('mainhand'),
				oh = this.getItem('offhand'),
				rendered = {};
		// Blizzard Decided they didn't wanna use their stupid math, but I'm leaving it right here!
		if(this.attrs['ruby-damage-mainhand']) {
			// Find Base Values for MH
			if(mh && mh.stats && mh.stats.damage) {
				var pMin = (mh.attrs['min-damage']) ? mh.attrs['min-damage'] : 0,
						pMax = (mh.attrs['max-damage']) ? mh.attrs['max-damage'] : 0,
						pDmg = (mh.attrs['plus-damage']) ? mh.attrs['plus-damage'] : 0,
						edMin = 0,
						edMax = 0,
						mhBase = {
							min: (mh.stats.damage.min / (1 + (pDmg / 100))) - pMin,
							max: (mh.stats.damage.max / (1 + (pDmg / 100))) - pMax
						}, 
						minRuby = mhBase.min + pMin + this.attrs['ruby-damage-mainhand'];
				_.each(['fire-damage', 'arcane-damage', 'poison-damage', 'cold-damage', 'lightning-damage', 'holy-damage'], function(v,k) {
					if(_.has(mh.attrs, v)) {
						edMin += mh.attrs[v].min;
						edMax += mh.attrs[v].max;
					}
				}, this);
				// Percentage of +% Damage is APPLIED to Gem Damage
				this.attrs['damage'] = {
					min: (mhBase.min + pMin + this.attrs['ruby-damage-mainhand']) * (1 + (pDmg / 100)),
					max: (mhBase.max + pMax + this.attrs['ruby-damage-mainhand']) * (1 + (pDmg / 100))
				}
				this.attrs.mhRealDamage = {
					min: (mhBase.min + pMin + this.attrs['ruby-damage-mainhand']) * (1 + (pDmg / 100)) - edMin,
					max: (mhBase.max + pMax + this.attrs['ruby-damage-mainhand']) * (1 + (pDmg / 100)) - edMax
				}
				rendered['ruby-damage-mainhand'] = this.attrs['ruby-damage-mainhand'] * (1 + (pDmg / 100));
			}
		}
		if(this.attrs['ruby-damage-offhand']) {
			if(oh && oh.stats && oh.stats.damage) {
				var pMin = (oh.attrs['min-damage']) ? oh.attrs['min-damage'] : 0,
						pMax = (oh.attrs['max-damage']) ? oh.attrs['max-damage'] : 0,
						pDmg = (oh.attrs['plus-damage']) ? oh.attrs['plus-damage'] : 0,
						edMin = 0,
						edMax = 0,
						
						ohBase = {
							min: (oh.stats.damage.min / (1 + (pDmg / 100))) - pMin,
							max: (oh.stats.damage.max / (1 + (pDmg / 100))) - pMax
						}, 
						minRuby = ohBase.min + pMin + this.attrs['ruby-damage-offhand'];
				_.each(['fire-damage', 'arcane-damage', 'poison-damage', 'cold-damage', 'lightning-damage', 'holy-damage'], function(v,k) {
					if(_.has(mh.attrs, v)) {
						edMin += mh.attrs[v].min;
						edMax += mh.attrs[v].max;
					}
				}, this);
				// Percentage of +% Damage is APPLIED to Gem Damage
				this.attrs['damage-oh'] = {
					min: (ohBase.min + pMin + this.attrs['ruby-damage-offhand']) * (1 + (pDmg / 100)),
					max: (ohBase.max + pMax + this.attrs['ruby-damage-offhand']) * (1 + (pDmg / 100))
				}
				this.attrs.ohRealDamage = {
					min: (ohBase.min + pMin + this.attrs['ruby-damage-offhand']) * (1 + (pDmg / 100)) - edMin,
					max: (ohBase.max + pMax + this.attrs['ruby-damage-offhand']) * (1 + (pDmg / 100)) - edMax
				}			
			}
			rendered['ruby-damage-offhand'] = this.attrs['ruby-damage-offhand'] * (1 + (pDmg / 100));
		}
		// console.log("[POST] Current Damage Ranges");
		// console.log("MH: ", this.attrs['damage'].min, this.attrs['damage'].max);
		// console.log("OH: ", this.attrs['damage-oh'].min, this.attrs['damage-oh'].max);
		return rendered;
	},
	run: function() {
		// Apply all Set Bonuses
		this.applySetBonuses();
		// Apply all of the passive bonuses into the this.bonuses array for use in the math below
		this.applyPassives();
		// Apply all bonuses from the Active skills indicated
		this.applyEnabledSkills();
		// Apply Stat Bonuses
		this.applyStatBonuses();
		// Calculate Defensive Statistics
    // d3up.log("----");
		var defenses = this.calcDefenses(),
		 		ehp = this.calcEffectiveHealth(defenses), 
				gearEhp = this.calcGearEhp(defenses, ehp),
				ehpPerStat = this.calcEhpPerStat(defenses, ehp),
				dps = this.calcOffense(), 
				skills = this.calcSkills(),
				allSkills = this.calcAllSkills(),
				lifeRegen = this.calcLifeRegen(dps, skills);
		this.attrs['primary-stat'] = this.attrs[this.attrs['primary']];
		// Add all of our calculated values into the values object for returning
    // d3up.log("----");
		_.extend(this.values, defenses, ehp, gearEhp, ehpPerStat, dps, skills, allSkills, lifeRegen, this.calcBES(defenses, ehp, dps));		
		_.extend(this.values, this.calcGearDps());
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

		// Append Attributes into the values
		this.values = _.extend(this.attrs, this.values);
		// Do we have a text area to dump to?
		var textarea = $("#json-data");
		// if(textarea) {
		// 	textarea.html(JSON.stringify(this.values));
		// }
		// Apply any caps on values that may exist
		this.values = this.applyCaps(this.values);
		// Return the values
		return this.values;
	},
	applyCaps: function(values) {
		var caps = {
			'plus-gold-find': 300,
			'plus-magic-find': 300,
		}
		_.each(caps, function(v,k) {
			if(values[k] && values[k] > v) {
				values[k] = v;
			}
		});
		return values;
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
					case "cold-reduce":
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
							// console.log(json.type, "-"+av);							
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
				if(ak == "ruby-damage") {
					if(typeof(this.attrs[ak + "-" + slot]) != "undefined") {
						this.attrs[ak + "-" + slot] -= parseFloat(av);
					} else {
						this.attrs[ak + "-" + slot] = parseFloat(av);
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
					case "armor":
						switch(json.type) {
							case "ring":
							case "amulet":				
								break;
							default:
								if(this.attrs[ak]) {
									this.attrs[ak] -= parseFloat(av);
								} 
								// console.log(json.type, "-"+av);
								break;
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
								// console.log(json.type, "+"+av);
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
					case "cold-reduce":
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
							// console.log(json.type, av);
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
				if(ak == "ruby-damage") {
					if(typeof(this.attrs[ak + "-" + slot]) != "undefined") {
						this.attrs[ak + "-" + slot] += parseFloat(av);
					} else {
						this.attrs[ak + "-" + slot] = parseFloat(av);
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
					'allResist': 'All Resists', 
					'ap-max': 'Max AP', 
					'ap-on-crit': 'AP/Crit', 
					'arcane-resist': 'Arcane Res', 
					'armor': 'Armor', 
					'attack-speed-incs': '+% IAS',
					'block-amount': 'Block', 
					'block-chance': '%Block',
					'blockChance': 'Block %', 
					'cold-resist': 'Cold Res', 
					'critical-hit': 'Crit Hit', 
					'critical-hit-damage': 'Crit Hit Dmg',
					'dexterity': 'Dex', 
					'dodgePercent': 'Dodge', 
					'dps': 'DPS', 
					'dps-demon': 'DPS vs Demons',
					'dps-elites': 'DPS vs Elites',
					'dps-demon-elite': 'DPS vs Elite+Demon',
					'dps-speed-mh': 'MH AtkSpeed',
					'dps-speed-mh': 'MH Attk/Sec',
					'dps-speed-oh': 'OH AtkSpeed',
					'dps-speed-oh': 'OH Attk/Sec',
					'ehp': 'EHP', 
					'ehp-block': 'EHP w/ Block',
					'ehp-block-dodge': 'EHP w/ Block+Dodge',
					'ehp-dodge': 'EHP w/ Dodge',
					'ehp-elite': 'EHP vs Elite',
					'display-percent-elite-reduce': '-Elite Dmg%',
					'fire-resist': 'Fire Res', 
					'intelligence': 'Int', 
					'life': 'HP',
					'life-hit': 'Life/Hit', 
					'life-regen': 'Life/Regen',
					'life-steal': 'Life/Steal', 
					'lifeTotal': 'Life', 
					'lightning-resist': 'Lightning Res', 
					'min-damage': '+Min Dmg',
					'max-damage': '+Max Dmg',
					'ruby-damage-mainhand': '+Dmg MH Ruby',
					'ruby-damage-offhand': '+Dmg OH Ruby',
					'physical-resist': 'Physical Res', 
					'plus-block': '+Block', 
					'plus-gold-find': '+Gold Find', 
					'plus-life': '+Life', 
					'plus-magic-find': '+Magic Find', 
					'plus-movement': '+Movement', 
					'poison-resist': 'Poison Res', 
					'resist-all': 'Resist All',
					'sharpshooter-dps': 'Sharpshooter DPS', 
					'strength': 'Str', 
					'tdps': 'tDPS',
					'tdps-demon': 'tDPS vs Demons',
					'tdps-elites': 'tDPS vs Elites',
					'tickRate': 'tDPS TickRate',
					'thorns': 'Thorns', 
					'total-armor-reduction': 'Armor DmgReduce', 
					'total-damage-reduction': 'Total DmgReduce',
					'total-resist-reduction': 'Resist DmgReduce',
					'vitality': 'Vit', 
				};
    // console.log(s1, s2);
		_.each(s1, function(val, key) {
			// console.log(key);
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
					}
					// d3up.log(key + " - s2["+s2[key]+"] - s1["+s1[key]+"] = "+diff[allowed[key]]);					
				} else {
					// d3up.log("disallowed: ("+ key+")");
				}
			}
		});
		return diff;
	}
};

d3up.BuildCalculator = BuildCalculator
})( d3up );

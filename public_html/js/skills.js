String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
var passives = {
	'barbarian': {
		'pound-of-flesh': {
			'desc': 'Increases the chance of finding a health globe by <span class="skill-highlight">25%</span> and you gain <span class="skill-highlight">100%</span> additional Life from health globes.',
			'effect': {
				'health-globes': 1,
			}
		},
		'ruthless': {
			'desc': 'Critical Hit Chance increased by <span class="skill-highlight">5%</span>. Critical Hit Damage increased by <span class="skill-highlight">50%</span>.',
			'effect': {
				'critical-hit': 0.05,
				'critical-hit-damage': 0.5
			}
		},
		'nerves-of-steel': {
			'desc': 'Your Armor is increased by <span class="skill-highlight">100%</span> of your Vitality.',
			'effect': {
				'vitality-to-armor': 1,
			}
		},
		'weapons-master': {
			'desc': 'Gain a bonus based on the weapon type of your main hand weapon:<ul><li>Swords/Daggers: <span class="skill-highlight">15%</span> increased damage</li><li>Maces/Axes: <span class="skill-highlight">10%</span> Critical Hit Chance</li><li>Polearms/Spears: <span class="skill-highlight">10%</span> attack speed</li><li>Mighty Weapons: <span class="skill-highlight">3</span> Fury per hit</li></ul>',
			'effect': {
				'switch': {
					'lookup': 'type',
					'against': 'mainhand',
					'cases': [
					// '2h-mace', '2h-axe', 'bow', 'daibo', 'crossbow', '2h-mighty', 'polearm', 'staff', '2h-sword', 'axe', 'ceremonial-knife', 'hand-crossbow', 'dagger', 'fist-weapon', 'mace', 'mighty-weapon', 'spear', 'sword', 'wand'
						{
							"caseOf": "sword|dagger|2h-sword",
							'effect': {
								'plus-damage': 0.15
							}
						},
						{
							"caseOf": "mace|axe|2h-axe|2h-mace",
							'effect': {
								'critical-hit': 0.1
							}
						},
						{
							"caseOf": "spear|polearm",
							'effect': {
								'attack-speed': 0.1
							}
						},
						{
							"caseOf": "mighty|2h-mighty",
							'effect': {
								
							}
						}																		
					]
				}
			}
		},
		'berserker-rage': {
			'desc': 'You inflict an additional <span class="skill-highlight">25%</span> damage while at maximum Fury.',
			'effect': {
				'plus-damage-conditional': 25
			}
		},
		'inspiring-presence': {
			'desc': 'The duration of your shouts is doubled. After using a shout you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second for <span class="skill-highlight">60</span> seconds.'
		},
		'bloodthirst': {
			'desc': 'Gain <span class="skill-highlight">3%</span> of all damage done as Life.',
			'effect': {
				'life-steal': 0.03
			}
		},
		'animosity': {
			'desc': 'Increases Fury generation by <span class="skill-highlight">10%</span> and maximum Fury is increased by <span class="skill-highlight">20</span>.',
			'effect': {
				'max-fury': 20
			}
		},
		'superstition': {
			'desc': 'Reduces all non-Physical damage by <span class="skill-highlight">20%</span>. Whenever you take damage from a ranged or elemental attack, you have a chance to gain <span class="skill-highlight">3</span> Fury.',
			'effect': {
				'non-physical-conditional': 20
			}
		},
		'tough-as-nails': {
			'desc': 'Increases Armor by <span class="skill-highlight">25%</span>.<br />Thorns damage dealt increased by <span class="skill-highlight">50%</span>.',
			'effect': {
				'plus-armor': 0.25,
				'plus-thorns': 0.5
			}
		},
		'no-escape': {
			'desc': 'Increases the damage of Ancient Spear and Weapon Throw by <span class="skill-highlight">10%</span>. In addition, a Critical Hit with Ancient Spear resets the cooldown while Critical Hits with Weapon Throw have a chance to return <span class="skill-highlight">14</span> Fury.'
		},
		'relentless': {
			'desc': 'While below <span class="skill-highlight">20%</span> Life, all skills cost no Fury and all damage taken is reduced by <span class="skill-highlight">50%</span>.'
		},
		'brawler': {
			'desc': 'As long as there are <span class="skill-highlight">3</span> enemies within <span class="skill-highlight">8</span> yards, all of your damage is increased by <span class="skill-highlight">30%</span>.'
		},
		'juggernaut': {
			'desc': 'The duration of control impairing effects on you are reduced by <span class="skill-highlight">20%</span>. In addition, whenever a Stun, Fear, Immobilize or Charm is cast on you, you have a chance to recover <span class="skill-highlight">15%</span> of your maximum Life.',
			'effect': {
				'cc-reduce': 0.2
			}
		},
		'unforgiving': {
			'desc': 'You no longer degenerate Fury. Instead, you gain <span class="skill-highlight">1</span> Fury every <span class="skill-highlight">2</span> seconds.'
		},
		'boon-of-bul-kathos': {
				'desc': 'The cooldown on your Earthquake, Call of the Ancients, and Wrath of the Berserker skills is reduced by <span class="skill-highlight">30</span> seconds.'
		}
	},
	'monk': {
		'fleet-footed': {
			'desc': 'Increases movement speed by <span class="skill-highlight">10%</span>.',
			'effect': {
				'plus-movement-speed': 0.1
			}
		},
		'resolve': {
			'desc': 'Damage you deal reduces enemy damage by <span class="skill-highlight">25%</span> for <span class="skill-highlight">2.5</span> seconds.'
		},
		'exalted-soul': {
			'desc': 'Increases maximum Spirit by <span class="skill-highlight">100</span>.',
			'effect': {
				'max-spirit': 100
			}
		},
		'transcendence': {
			'desc': 'Every point of Spirit spent heals you for <span class="skill-highlight">62.0</span> Life.'
		},
		'chant-of-resonance': {
			'desc': 'Duration of all Mantras increased by <span class="skill-highlight">7</span> minutes. While one of your Mantras is active you gain <span class="skill-highlight">2</span> Spirit every second.'
		},
		'seize-the-initiative': {
			'desc': 'Your Armor is increased by <span class="skill-highlight">100%</span> of your Dexterity.',
			'effect': {
				'dexterity-to-armor': 1
			}
		},
		'the-guardians-path': {
			'desc': 'While dual-wielding, you gain a <span class="skill-highlight">15%</span> chance to dodge incoming attacks. While using a two-handed weapon, all Spirit generation is increased by <span class="skill-highlight">25%</span>.',
			'effect': {
				'switch': {
					'against': 'isDuelWielding',
					'cases': [
						{
							"caseOf": true,
							'effect': {
								'plus-dodge': 0.15
							}
						},
						{
							"caseOf": false,
							'effect': {
								'plus-spirit-regen': 0.25
							}
						}
					]
				}
			}
		},
		'sixth-sense': {
			'desc': 'Your dodge chance is increased by an amount equal to <span class="skill-highlight">30%</span> of your Critical Hit Chance.',
			'effect': {
				'critical-to-dodge': 0.3
			}
		},
		'pacifism': {
			'desc': 'While you are under a Stun, Fear or Charm effect, all damage taken is reduced by <span class="skill-highlight">75%</span>.'
		},
		'beacon-of-ytar': {
			'desc': 'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'
		},
		'guiding-light': {
			'desc': 'Whenever you use a direct heal skill on another player you and the other player deal <span class="skill-highlight">16%</span> more damage for <span class="skill-highlight">15</span> seconds.'
		},
		'one-with-everything': {
			'desc': 'Your resistance to all elements is equal to your highest elemental resistance.',
			'effect': {
				'flatten-resists': 1
			}
		},
		'combination-strike': {
			'desc': 'Each different Spirit Generator ability you use increases your damage by <span class="skill-highlight">8%</span> for <span class="skill-highlight">3</span> seconds.',
			'effect': {
				'spirit-combo-strike': 1
			}
		},
		'near-death-experience': {
			'desc': 'When receiving fatal damage, you are instead restored to <span class="skill-highlight">35%</span> of maximum Life and <span class="skill-highlight">35%</span> Spirit.'
		},
	},
	'wizard': {
		'blur': {
			'desc': 'Decreases melee damage taken by <span class="skill-highlight">20%</span>.',
			'effect': {
				'melee-reduce': 0.20
			},
		},
		'power-hungry': {
			'desc': 'Gain <span class="skill-highlight">30</span> Arcane Power whenever you are healed by a health globe.'
		},
		'evocation': {
			'desc': 'Reduces all cooldowns by <span class="skill-highlight">15%</span>.'
		},
		'glass-cannon': {
			'desc': 'Increases all damage done by <span class="skill-highlight">15%</span>, but decreases Armor and resistances by <span class="skill-highlight">10%</span>.',
			'effect': {
				'plus-damage': 0.15,
				'plus-resist-all': -0.10,
				'plus-armor': -0.10
			}
		},
		'prodigy': {
			'desc': 'When you deal damage with a Signature spell, you gain <span class="skill-highlight">4</span> Arcane Power.<br/>The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'
		},
		'astral-presence': {
			'desc': 'Increases your maximum Arcane Power by <span class="skill-highlight">20</span> and Arcane Power regeneration by <span class="skill-highlight">2</span> per second.'
		},
		'illusionist': {
			'desc': 'Whenever you suffer more than <span class="skill-highlight">15%</span> of your Life in a single hit, the cooldowns on Mirror Image and Teleport are automatically reset.'
		},
		'cold-blooded': {
			'desc': 'All damage dealt to chilled and frozen targets is increased by <span class="skill-highlight">20%</span>.',
			'effect': {
				'plus-damage-conditional': 20
			}
		},
		'conflagration': {
			'desc': 'Fire damage dealt to enemies applies a burning effect, increasing all damage done to them by <span class="skill-highlight">10%</span> for 3 seconds.',
			'effect': {
			  'plus-damage-conditional': 10
			}
		},
		'paralysis': {
			'desc': 'Lightning damage dealt to enemies has up to a <span class="skill-highlight">8%</span> chance to Stun the target for <span class="skill-highlight">2</span> seconds.'
		},
		'galvanizing-ward': {
			'desc': 'Increases the duration of your Armor spells by <span class="skill-highlight">120</span> seconds. As long as an Armor spell is active, you gain <span class="skill-highlight">310</span> Life per second. The following skills are improved:<ul><li>Energy Armor</li><li>Ice Armor</li><li>Storm Armor</li></ul>'
		},
		'temporal-flux': {
			'desc': 'Whenever you deal Arcane damage, enemies are slowed by <span class="skill-highlight">30%</span> for <span class="skill-highlight">2</span> seconds.'
		},
		'critical-mass': {
			'desc': 'Critical Hits have a chance to reduce the cooldown of your spells by <span class="skill-highlight">1</span> second.'
		},
		'arcane-dynamo': {
			'desc': 'When you deal damage with a Signature spell you may gain a Flash of Insight. After 5 Flashes of Insight, your next non-Signature spell deals <span class="skill-highlight">75%</span> additional damage. The following skills are Signature spells:<ul><li>Magic Missile</li><li>Shock Pulse</li><li>Spectral Blade</li><li>Electrocute</li></ul>'
		},
		'unstable-anomaly': {
			'desc': 'When reduced below <span class="skill-highlight">20%</span> Life, release a shockwave that knocks all enemies back. This effect cannot occur more than once every 60 seconds.'
		}
	},
	'demon-hunter': {
		'tactical-advantage': {
			'desc': 'Whenever you use Vault, Smoke Screen, or backflip with Evasive Fire you gain <span class="skill-highlight">60%</span> movement speed for <span class="skill-highlight">2</span> seconds.'
		},
		'thrill-of-the-hunt': {
			'desc': 'Every <span class="skill-highlight">10</span> seconds, your next bow attack will immobilize your target for <span class="skill-highlight">3</span> seconds.'
		},
		'vengeance': {
			'desc': 'Your maximum Hatred is increased by <span class="skill-highlight">25</span>. In addition, gain <span class="skill-highlight">20</span> Hatred and <span class="skill-highlight">2</span> Discipline whenever you are healed by a health globe.',
			'effect': {
				'max-hatred': 25
			}
		},
		'steady-aim': {
			'desc': 'As long as there are no enemies within <span class="skill-highlight">10</span> yards, all damage is increased by <span class="skill-highlight">20%</span>.',
			'effect': {
				'plus-damage-conditional': 20
			}
		},
		'cull-the-weak': {
			'desc': 'Damage against slowed enemies increased by <span class="skill-highlight">15%</span>.',
			'effect': {
				'plus-damage-conditional': 15
			}
		},
		'night-stalker': {
			'desc': 'Critical Hits have a chance to restore <span class="skill-highlight">1</span> Discipline.'
		},
		'brooding': {
			'desc': 'As long as you have not taken damage in the last <span class="skill-highlight">3</span> seconds you gain <span class="skill-highlight">1%</span> of your maximum Life per second.'
		},
		'hot-pursuit': {
			'desc': 'Whenever you are at full Hatred, movement speed is increased by <span class="skill-highlight">15%</span>.'
		},
		'archery': {
			'desc': 'Gain a bonus based on the weapon type of your main hand weapon:<ul><li>Bow: <span class="skill-highlight">15%</span> increased damage</li><li>Crossbows: <span class="skill-highlight">50%</span> Critical Hit Damage</li><li>Hand Crossbows: <span class="skill-highlight">10%</span> Critical Hit Chance</li></ul>',
			'effect': {
				'switch': {
					'lookup': 'type',
					'against': 'mainhand',
					'cases': [
						{
							"caseOf": "bow",
							'effect': {
								'plus-damage': 0.15
							}
						},
						{
							"caseOf": "crossbow",
							'effect': {
								'critical-hit-damage': 0.5
							}
						},
						{
							"caseOf": "hand-crossbow",
							'effect': {
								'critical-hit': 0.1
							}
						}
					]
				}
			}
		},
		'numbing-traps': {
			'desc': 'Enemies hit by Fan of Knives, Spike Trap, and Caltrops have their damage reduced by <span class="skill-highlight">25%</span> for <span class="skill-highlight">3</span> seconds.'
		},
		'perfectionist': {
			'desc': 'Reduces the Discipline cost of all skills by <span class="skill-highlight">10%</span>.'
		},
		'custom-engineering': {
			'desc': 'The duration of your Caltrops, Marked for Death, Spike Trap, and Sentry is increased by <span class="skill-highlight">100%</span>.'
		},
		'grenadier': {
			'desc': 'Increases Hatred generated from Grenades by <span class="skill-highlight">2</span> and reduces the Hatred cost of Cluster Arrow by <span class="skill-highlight">10</span>. Upon death, you drop a giant grenade that explodes for <span class="skill-highlight">450%</span> weapon damage as Fire.'
		},
		'sharpshooter': {
			'desc': 'Gain <span class="skill-highlight">3%</span> Critical Hit Chance every second. This bonus is reset <span class="skill-highlight">1</span> second after you successfully critically hit.',
			'effect': {
				'sharpshooter': true
			}
		},
		'ballistics': {
			'desc': 'Damage from rockets increased by <span class="skill-highlight">50%</span>. '
		},
	},
	'witch-doctor': {
		'circle-of-life': {
			'desc': 'Whenever an enemy dies within <span class="skill-highlight">12</span> yards, there is a <span class="skill-highlight">30%</span> chance that a Zombie Dog will automatically emerge. The range of this effect is increased by items that increase your gold pickup radius.'
		},
		'jungle-fortitude': {
			'desc': 'Reduces all damage taken by you and your pets by <span class="skill-highlight">20%</span>.',
			'effect': {
				'damage-reduce': 0.20
			}
		},
		'spiritual-attunement': {
			'desc': 'Maximum Mana is increased by <span class="skill-highlight">20%</span>. Regenerate <span class="skill-highlight">1%</span> of your maximum Mana per second.',
			'effect': {
				'plus-mana': 0.2
			}
		},
		'gruesome-feast': {
			'desc': 'Whenever you are healed by a health globe, you gain <span class="skill-highlight">10%</span> of your maximum Mana and <span class="skill-highlight">10%</span> Intelligence for <span class="skill-highlight">10</span> seconds. The Intelligence bonus can stack up to <span class="skill-highlight">5</span> times.',
			'effect': {
			  'stackable': {
		      'limit': 5,
			    'plus-intelligence-percent': 10,
			  },
			}
		},
		'bad-medicine': {
			'desc': 'Whenever you deal Poison damage to an enemy, their damage is reduced by <span class="skill-highlight">20%</span> for <span class="skill-highlight">3</span> seconds.'
		},
		'blood-ritual': {
			'desc': '<span class="skill-highlight">15%</span> of Mana costs are paid with Life. In addition, you regenerate <span class="skill-highlight">1%</span> of your maximum Life per second.'
		},
		'zombie-handler': {
			'desc': 'You can have <span class="skill-highlight">4</span> Zombie Dogs summoned at one time. The health of your Zombie Dogs and Gargantuan is increased by <span class="skill-highlight">20%</span>.'
		},
		'pierce-the-veil': {
			'desc': 'All of your damage is increased by <span class="skill-highlight">20%</span>, but your Mana costs are increased by <span class="skill-highlight">30%</span>.',
			'effect': {
				'plus-damage': 0.2
			}
		},
		'fetish-sycophants': {
			'desc': 'Whenever you cast a physical realm spell, you have a <span class="skill-highlight">3%</span> chance to summon a dagger-wielding Fetish to fight by your side for <span class="skill-highlight">60</span> seconds.'
		},
		'spirit-vessel': {
			'desc': 'Reduces the cooldown of your Horrify, Spirit Walk, and Soul Harvest spells by <span class="skill-highlight">2</span> seconds. In addition, the next time you receive fatal damage, you automatically enter the spirit realm for <span class="skill-highlight">2</span> seconds and heal to <span class="skill-highlight">15%</span> of your maximum Life. This effect cannot occur more than once every <span class="skill-highlight">90</span> seconds.'
		},
		'rush-of-essence': {
			'desc': 'Spirit spells return <span class="skill-highlight">49</span> of their Mana cost over <span class="skill-highlight">10</span> seconds.'
		},
		'vision-quest': {
			'desc': 'When you deal damage with Corpse Spiders, Firebomb, Plague of Toads or Poison Dart, your Mana regeneration is increased by <span class="skill-highlight">30%</span> for <span class="skill-highlight">5</span> seconds..'
		},
		'fierce-loyalty': {
			'desc': 'All your pets get <span class="skill-highlight">100%</span> of the benefit of your Thorns and Life regeneration items.'
		},
		'grave-injustice': {
			'desc': 'Whenever an enemy dies within <span class="skill-highlight">8</span> yards, regain <span class="skill-highlight">2%</span> of your maximum Life and Mana and the cooldown on all of your abilities is reduced by <span class="skill-highlight">1</span> second. This range is extended by items that increase your gold pickup radius.'
		},
		'tribal-rites': {
			'desc': 'The cooldowns of your Fetish Army, Big Bad Voodoo, Hex, Gargantuan, Summon Zombie Dogs and Mass Confusion abilities are reduced by <span class="skill-highlight">25%</span>.'
		},
	}
}
var activeSkills = {
	'barbarian': {
		'bash': {
			name: 'Bash',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			effect: {
				'chance-knockback': 20,
				'generate-fury': 8,
				'weapon-damage': 165,
			},
		},
		'bash~a': {
			name: 'Bash - Onslaught',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			rune: 'Add 2 reverberations that cause 25% weapon damage per strike. Removes the chance for Knockback.',
			effect: {
				'generate-fury': 8,
				'weapon-damage': 215,
			},
		},
		'bash~b': {
			name: 'Bash - Punish',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			rune: 'Increases the damage of your skills by 6% for 5 seconds after using Bash. This effect stacks up to 3 times.',
			effect: {
				'chance-knockback': 20,
				'generate-fury': 8,
				'stackable': {
				  'limit': 3, 
					'plus-damage': 8,
				},
				'weapon-damage': 165,
			},
		},
		'bash~c': {
			name: 'Bash - Clobber',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			rune: 'Instead of Knockback, each hit has a 35% chance to Stun the target for 1.5 seconds.',
			effect: {
				'generate-fury': 8,
				'chance-stun': 70,
				'weapon-damage': 165,
			},
		},
		'bash~d': {
			name: 'Bash - Instigation',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			rune: 'Generate 6 additional Fury per attack.',
			effect: {
				'chance-knockback': 20,
				'generate-fury': 12,
				'weapon-damage': 165,
			},
		},
		'bash~e': {
			name: 'Bash - Pulverize',
			desc: 'Brutally smash an enemy for 165% weapon damage with a 20% chance to Knockback.',
			rune: 'Cause a shockwave that inflicts 38% weapon damage to enemies in a 26 yard line behind the targeted enemy.',
			effect: {
				'chance-knockback': 20,
				'generate-fury': 8,
				'weapon-damage': 203,
			},
		},
		'hammer-of-the-ancients': {
			name: 'Hammer of the Ancients',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 325,
				'plus-critical-hit-this': 5,
			},
		},
		'hammer-of-the-ancients~a': {
			name: 'Hammer of the Ancients - Smash',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Strike a smaller area for 270% weapon damage.',
			effect: {
				'cost-fury': 20,
				'plus-critical-hit-this': 5,
				'weapon-damage': 406,
			},
		},
		'hammer-of-the-ancients~b': {
			name: 'Hammer of the Ancients - Rolling Thunder',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Create a shockwave that deals 155% weapon damage to all enemies within 22 yards in front of you.',
			effect: {
				'cost-fury': 20,
				'plus-critical-hit-this': 5,
				'weapon-damage': 275,
			},
		},
		'hammer-of-the-ancients~c': {
			name: 'Hammer of the Ancients - The Devil\'s Anvil',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Create a tremor at the point of impact for 2 seconds that slows the movement speed of enemies by 60%0.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 325,
				'plus-critical-hit-this': 5,
			},
		},
		'hammer-of-the-ancients~d': {
			name: 'Hammer of the Ancients - Birthright',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Critical Hits have a 10% chance to cause enemies to drop treasure or health globes.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 325,
				'plus-critical-hit-this': 5,
			},
		},
		'hammer-of-the-ancients~e': {
			name: 'Hammer of the Ancients - Thunderstrike',
			desc: 'Call forth a massive hammer to smash enemies directly in front of you for 325% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Whenever you kill an enemy with Hammer of the Ancients every other enemy within 10 yards is stunned for 3 seconds.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 325,
				'plus-critical-hit-this': 5,
			},
		},
		'cleave': {
			name: 'Cleave',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 140,
			},
		},
		'cleave~a': {
			name: 'Cleave - Broad Sweep',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			rune: 'Increase damage to 175% weapon damage.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 175,
			},
		},
		'cleave~b': {
			name: 'Cleave - Gathering Storm',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			rune: 'Enemies cleaved have their movement speed reduced by 80% for 1 second.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 140,
			},
		},
		'cleave~c': {
			name: 'Cleave - Scattering Blast',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			rune: 'On Critical Hits, knock enemies back 9 yards and inflict 60% weapon damage to enemies where they land.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 140,
			},
		},
		'cleave~d': {
			name: 'Cleave - Reaping Swing',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			rune: 'Generate 3 additional Fury per enemy hit.',
			effect: {
				'generate-fury': 8,
				'weapon-damage': 140,
			},
		},
		'cleave~e': {
			name: 'Cleave - Rupture',
			desc: 'Swing your weapon in a wide arc to deal 140% weapon damage to all enemies caught in the swing.',
			rune: 'Enemies slain by Cleave explode, causing 85% weapon damage to all other enemies within 8 yards.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 140,
			},
		},
		'ground-stomp': {
			name: 'Ground Stomp',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 12,
			},
		},
		'ground-stomp~a': {
			name: 'Ground Stomp - Trembling Stomp',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies in the area also take 76% weapon damage.',
			effect: {
				'generate-fury': 15,
				'cooldown': 12,
				'weapon-damage': 76,
			},
		},
		'ground-stomp~b': {
			name: 'Ground Stomp - Wrenching Smash',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Increase the area of effect to 24 yards. Enemies are pulled closer before the strike lands.',
			effect: {
				'generate-fury': 15,
				'cooldown': 12,
			},
		},
		'ground-stomp~c': {
			name: 'Ground Stomp - Avalanche',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies are knocked back 9 yards and inflict 55% weapon damage to enemies in the landing area.',
			effect: {
				'generate-fury': 15,
				'cooldown': 12,
			},
		},
		'ground-stomp~d': {
			name: 'Ground Stomp - Foot of the Mountain',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Increase Fury gained to 30.',
			effect: {
				'cooldown': 12,
				'generate-fury': 30,
			},
		},
		'ground-stomp~e': {
			name: 'Ground Stomp - Deafening Crash',
			desc: 'Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies in the area have their movement speed slowed by 60% for 3 seconds after they recover from being stunned.',
			effect: {
				'generate-fury': 15,
				'cooldown': 12,
			},
		},
		'rend': {
			name: 'Rend',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 5 seconds.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 700,
				'weapon-damage-for': 5,
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
 			},
		},
		'rend~a': {
			name: 'Rend - Lacerate',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 5 seconds.',
			rune: 'Increase damage to 903% weapon damage as Physical over 5 seconds.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 903,
				'weapon-damage-for': 5,
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
			},
		},
		'rend~b': {
			name: 'Rend - Ravage',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 5 seconds.',
			rune: 'Increase the range of Rend to hit all enemies within 17 yards.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 700,
				'weapon-damage-for': 5,
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
			},
		},
		'rend~c': {
			name: 'Rend - Mutilate',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 5 seconds.',
			rune: 'Increase bleeding duration to 7 seconds.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 700,
				'weapon-damage-for': 5,				
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
			},
		},
		'rend~d': {
			name: 'Rend - Blood Lust',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 5 seconds.',
			rune: 'Gain 9% of the damage done by Rend as Life.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 700,
				'weapon-damage-for': 5,				
				'life-steal': 9,
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
			},
		},
		'rend~e': {
			name: 'Rend - Bloodbath',
			desc: 'A sweeping strike causes all nearby enemies to Bleed for 700% weapon damage as Physical over 3 seconds.',
			rune: 'Enemies killed while bleeding cause all enemies within 10 yards to begin bleeding for 100% weapon damage as Physical over 5 seconds.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 700,
				'weapon-damage-for': 5,				
				'weapon-damage-static': true,
				'weapon-damage-mh': true,
			},
		},
		'leap': {
			name: 'Leap',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 85,
			},
		},
		'leap~a': {
			name: 'Leap - Call of Arreat',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Shockwaves burst forth from the ground increasing the radius of effect to 16 yards and pulling affected enemies towards you.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 85,
			},
		},
		'leap~b': {
			name: 'Leap - Toppling Impact',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Send enemies hurtling away from where you land.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 85,
			},
		},
		'leap~c': {
			name: 'Leap - Launch',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Jump into the air with such great force that enemies within 8 yards of the origin of the jump are also slowed by 60% for 3 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 85,
			},
		},
		'leap~d': {
			name: 'Leap - Iron Impact',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Gain 300% additional Armor for 4 seconds after landing.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 85,
			},
		},
		'leap~e': {
			name: 'Leap - Death from Above',
			desc: 'Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Land with such force that enemies have a 100% chance to be stunned for 3 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'chance-stun': 100,
				'weapon-damage': 85,
			},
		},
		'ancient-spear': {
			name: 'Ancient Spear',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 185,
			},
		},
		'ancient-spear~a': {
			name: 'Ancient Spear - Harpoon',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Pierce through multiple enemies in a straight line and drag them all back.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 185,
			},
		},
		'ancient-spear~b': {
			name: 'Ancient Spear - Grappling Hooks',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Throw 3 spears. Each spear will pull back the enemy that it hits.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 185,
			},
		},
		'ancient-spear~c': {
			name: 'Ancient Spear - Dread Spear',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Gain Life equal to 60% of the damage inflicted.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 185,
				'life-steal': 60,
			},
		},
		'ancient-spear~d': {
			name: 'Ancient Spear - Skirmish',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Increases Fury gained to 30.',
			effect: {
				'cooldown': 10,
				'weapon-damage': 185,
				'generate-fury': 30,
			},
		},
		'ancient-spear~e': {
			name: 'Ancient Spear - Rage Flip',
			desc: 'Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Enemies hit with Ancient Spear are pulled in the opposite direction and damage is increased to 213% weapon damage.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 213,
			},
		},
		'frenzy': {
			name: 'Frenzy',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			effect: {
				'generate-fury': 3,
				'weapon-damage': 110,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
				},
			},
		},
		'frenzy~a': {
			name: 'Frenzy - Maniac',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Each Frenzy effect also increases your damage by 4%.',
			effect: {
				'generate-fury': 3,
				'weapon-damage': 110,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
					'plus-damage': 5,
				},
			},
		},
		'frenzy~b': {
			name: 'Frenzy - Sidearm',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Each strike has a 25% chance to throw a piercing axe at a nearby enemy that deals 110% weapon damage to all enemies in its path.',
			effect: {
				'generate-fury': 3,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
				},
				'weapon-damage': 110,
			},
		},
		'frenzy~c': {
			name: 'Frenzy - Vanguard',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'While under the effects of Frenzy, you gain 15% increased movement speed.',
			effect: {
				'generate-fury': 3,
				'weapon-damage': 110,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
				},
			},
		},
		'frenzy~d': {
			name: 'Frenzy - Smite',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Add a 20% chance to call down a bolt of lightning from above, stunning your target for 1.5 seconds.',
			effect: {
				'generate-fury': 3,
				'chance-stun': 20,
				'weapon-damage': 110,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
				},
			},
		},
		'frenzy~e': {
			name: 'Frenzy - Triumph',
			desc: 'Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Killing an enemy with Frenzy heals you for 8% of your maximum Life over 6 seconds.',
			effect: {
				'generate-fury': 3,
				'weapon-damage': 110,
				'stackable': {
				  'limit': 5,
					'plus-attack-speed-this': 15,
				},
			},
		},
		'seismic-slam': {
			name: 'Seismic Slam',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			effect: {
				'cost-fury': 30,
				'weapon-damage': 240,
			},
		},
		'seismic-slam~a': {
			name: 'Seismic Slam - Shattered Ground',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Increase damage to 288% weapon damage and increases Knockback distance by 100%.',
			effect: {
				'cost-fury': 30,
				'weapon-damage': 288,
			},
		},
		'seismic-slam~b': {
			name: 'Seismic Slam - Rumble',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'The ground continues to shudder after the intitial strike, damaging enemies in the area for 30% weapon damage.',
			effect: {
				'cost-fury': 30,
				'weapon-damage': 240,
			},
		},
		'seismic-slam~c': {
			name: 'Seismic Slam - Stagger',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Add a 70% chance of stunning enemies for 1.5 seconds.',
			effect: {
				'cost-fury': 30,
				'chance-stun': 70,
				'weapon-damage': 240,
			},
		},
		'seismic-slam~d': {
			name: 'Seismic Slam - Strength from Earth',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Reduce Fury cost to 15 Fury.',
			effect: {
				'weapon-damage': 240,
				'cost-fury': 15,
			},
		},
		'seismic-slam~e': {
			name: 'Seismic Slam - Cracking Rift',
			desc: 'Slam the ground and cause a wave of destruction that deals 240% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Focus the seismic shockwaves along a narrow path to inflict 340% weapon damage to targets along a 42 yard path.',
			effect: {
				'cost-fury': 30,
				'weapon-damage': 340,
			},
		},
		'revenge': {
			name: 'Revenge',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			effect: {
				'weapon-damage': 220,
			},
		},
		'revenge~a': {
			name: 'Revenge - Retribution',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Increase damage to 286% weapon damage.',
			effect: {
				'weapon-damage': 286,
			},
		},
		'revenge~b': {
			name: 'Revenge - Provocation',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Increases the chance Revenge will become active to 30% each time you are hit by an attack.',
			effect: {
				'weapon-damage': 220,
			},
		},
		'revenge~c': {
			name: 'Revenge - Grudge',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Knocks enemies back 24 yards whenever Revenge is used.',
			effect: {
				'weapon-damage': 220,
			},
		},
		'revenge~d': {
			name: 'Revenge - Vengeance Is Mine',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Gain 5 Fury and heal for 8% of your maximum Life for each enemy hit.',
			effect: {
				'generate-fury': 5,
				'weapon-damage': 220,
			},
		},
		'revenge~e': {
			name: 'Revenge - Best Served Cold',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'After using Revenge, your Critical Hit Chance is increased by 10% for 12 seconds.',
			effect: {
				'weapon-damage': 220,
				'plus-crit-hit': 10,
			},
		},
		'weapon-throw': {
			name: 'Weapon Throw',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			effect: {
				'cost-fury': 10,
				'weapon-damage': 130,
			},
		},
		'weapon-throw~a': {
			name: 'Weapon Throw - Mighty Throw',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Increase thrown weapon damage to 169% weapon damage.',
			effect: {
				'cost-fury': 10,
				'weapon-damage': 169,
			},
		},
		'weapon-throw~b': {
			name: 'Weapon Throw - Ricochet',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Cause the weapon to ricochet and hit up to 3 targets within 20 yards of each other.',
			effect: {
				'cost-fury': 10,
				'weapon-damage': 130,
			},
		},
		'weapon-throw~c': {
			name: 'Weapon Throw - Throwing Hammer',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Hurl a hammer with a 50% chance to Stun the target for 1.5 seconds.',
			effect: {
				'cost-fury': 10,
				'chance-stun': 50,
				'weapon-damage': 130,
			},
		},
		'weapon-throw~d': {
			name: 'Weapon Throw - Dread Bomb',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Expend all remaining Fury to throw a corpse which inflicts an additional 3% weapon damage for each point of Fury expended to all enemies within 12 yards of the target.',
			effect: {
				'cost-fury': 10,
				'weapon-damage': 130,
			},
		},
		'weapon-throw~e': {
			name: 'Weapon Throw - Stupefy',
			desc: 'Hurl a throwing weapon at an enemy for 130% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Aim for the head, gaining a 20% chance of causing your target to be Confused and attack other enemies for 6 seconds.',
			effect: {
				'cost-fury': 10,
				'weapon-damage': 100,
			},
		},
		'sprint': {
			name: 'Sprint',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			effect: {
				'cost-fury': 20,
			},
		},
		'sprint~a': {
			name: 'Sprint - Marathon',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			rune: 'Increases the movement speed bonus to 50% for 5 seconds.',
			effect: {
				'cost-fury': 20,
			},
		},
		'sprint~b': {
			name: 'Sprint - Rush',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			rune: 'Increases Dodge Chance by 12% while sprinting.',
			effect: {
				'cost-fury': 20,
				'plus-dodge': 12,
			},
		},
		'sprint~c': {
			name: 'Sprint - Run Like the Wind',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			rune: 'Tornadoes rage in your wake, each one inflicting 60% weapon damage.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 60,
				'weapon-damage-for': 3,
			},
		},
		'sprint~d': {
			name: 'Sprint - Forced March',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			rune: 'Increase the movement speed of allies within 50 yards by 20% for 3 seconds.',
			effect: {
				'cost-fury': 20,
			},
		},
		'sprint~e': {
			name: 'Sprint - Gangway',
			desc: 'Increase movement speed by 40% for 3 seconds.',
			rune: 'Slams through enemies, knocking them back and inflicting 25% weapon damage.',
			effect: {
				'cost-fury': 20,
				'weapon-damage': 25,
			},
		},
		'threatening-shout': {
			name: 'Threatening Shout',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'threatening-shout~a': {
			name: 'Threatening Shout - Demoralize',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies are also taunted to attack you for 3 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'threatening-shout~b': {
			name: 'Threatening Shout - Intimidate',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies also have their movement speed reduced by 30%.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'threatening-shout~c': {
			name: 'Threatening Shout - Grim Harvest',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Enemies are badly shaken and have a 15% chance to drop additional treasure.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'threatening-shout~d': {
			name: 'Threatening Shout - Falter',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies also have their attack speed reduced by 15% for 5 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'threatening-shout~e': {
			name: 'Threatening Shout - Terrify',
			desc: 'Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Enemies are severely demoralized. Each enemy has a 35% chance to flee for 2.5 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 15,
				'plus-damage-reduce': 20,
			},
		},
		'earthquake': {
			name: 'Earthquake',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
			},
		},
		'earthquake~a': {
			name: 'Earthquake - Aftershocks',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Secondary tremors knock enemies back and inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
			},
		},
		'earthquake~b': {
			name: 'Earthquake - Giant\'s Stride',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Secondary tremors follow your movement and inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
			},
		},
		'earthquake~c': {
			name: 'Earthquake - Chilling Earth',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Creates an icy patch, causing Earthquake\'s damage to turn Cold and Slow the movement of enemies by 80%.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
			},
		},
		'earthquake~d': {
			name: 'Earthquake - The Mountain\'s Call',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Removes the Fury cost and reduces the cooldown to 105 seconds.',
			effect: {
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
				'cooldown': 105,
			},
		},
		'earthquake~e': {
			name: 'Earthquake - Path of Fire',
			desc: 'Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Project secondary tremors up to 12 yards ahead of you that inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 2000,
				'weapon-damage-for': 8,
			},
		},
		'whirlwind': {
			name: 'Whirlwind',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 145,
			},
		},
		'whirlwind~a': {
			name: 'Whirlwind - Volcanic Eruption',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			rune: 'Turns Whirlwind into a torrent of magma that inflicts 188% weapon damage as Fire.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 188,
			},
		},
		'whirlwind~b': {
			name: 'Whirlwind - Dust Devils',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			rune: 'Generate harsh tornadoes that inflict 40% weapon damage to enemies in their path.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 145,
			},
		},
		'whirlwind~c': {
			name: 'Whirlwind - Hurricane',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			rune: 'Allows you to move at your movement speed while using Whirlwind.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 145,
			},
		},
		'whirlwind~d': {
			name: 'Whirlwind - Wind Shear',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			rune: 'Gain 1 Fury for every enemy struck.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 145,
			},
		},
		'whirlwind~e': {
			name: 'Whirlwind - Blood Funnel',
			desc: 'Deliver multiple attacks to everything in your path for 145% weapon damage.',
			rune: 'Critical Hits restore 1% of your maximum Life.',
			effect: {
				'cost-fury': 16,
				'weapon-damage': 145,
			},
		},
		'furious-charge': {
			name: 'Furious Charge',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 195,
			},
		},
		'furious-charge~a': {
			name: 'Furious Charge - Battering Ram',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Increase damage at the destination to 283% weapon damage.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 283,
			},
		},
		'furious-charge~b': {
			name: 'Furious Charge - Dreadnought',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Regain 8% of your maximum Life for each target hit by Furious Charge.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 195,
			},
		},
		'furious-charge~c': {
			name: 'Furious Charge - Bull Rush',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Any targets who are critically hit by Furious Charge will be stunned for 2.5 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 195,
			},
		},
		'furious-charge~d': {
			name: 'Furious Charge - Stamina',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Generate 8 additional Fury for each target hit while charging.',
			effect: {
				'generate-fury': 23,
				'cooldown': 10,
				'weapon-damage': 195,
			},
		},
		'furious-charge~e': {
			name: 'Furious Charge - Merciless Assault',
			desc: 'Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Cooldown is reduced by 2 seconds for every target hit. This effect can reduce the cooldown by up to 10 seconds.',
			effect: {
				'generate-fury': 15,
				'cooldown': 10,
				'weapon-damage': 195,
			},
		},
		'ignore-pain': {
			name: 'Ignore Pain',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
			},
		},
		'ignore-pain~a': {
			name: 'Ignore Pain - Contempt for Weakness',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Reflects 50% of ignored damage back at the enemy.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
			},
		},
		'ignore-pain~b': {
			name: 'Ignore Pain - Iron Hide',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Increases duration to 7 seconds.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
			},
		},
		'ignore-pain~c': {
			name: 'Ignore Pain - Mob Rule',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Extend the effect to nearby allies, reducing damage taken by 65% for 5 seconds.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
			},
		},
		'ignore-pain~d': {
			name: 'Ignore Pain - Bravado',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			rune: 'When activated, Knockback all enemies within 12 yards and deal 50% weapon damage to them.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
				'weapon-damage': 50,
			},
		},
		'ignore-pain~e': {
			name: 'Ignore Pain - Ignorance is Bliss',
			desc: 'Reduces all damage taken by 65% for 5 seconds.',
			rune: 'While Ignore Pain is active, gain 20% of all damage dealt as Life.',
			effect: {
				'cooldown': 30,
				'plus-damage-reduce': 65,
				'life-steal': 20,
			},
		},
		'battle-rage': {
			name: 'Battle Rage',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 15,
			},
		},
		'battle-rage~a': {
			name: 'Battle Rage - Marauder\'s Rage',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'Increase damage bonus to 30%.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 30,
			},
		},
		'battle-rage~b': {
			name: 'Battle Rage - Ferocity',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to increase the duration of Battle Rage by 2 seconds.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 15,
			},
		},
		'battle-rage~c': {
			name: 'Battle Rage - Swords to Ploughshares',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have up to a 5% chance to cause enemies to drop additional health globes.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 15,
			},
		},
		'battle-rage~d': {
			name: 'Battle Rage - Into the Fray',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to generate 15 additional Fury.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 15,
			},
		},
		'battle-rage~e': {
			name: 'Battle Rage - Bloodshed',
			desc: 'Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to cause an explosion of blood dealing 20% of the damage done to all other nearby enemies.',
			effect: {
				'cost-fury': 20,
				'plus-crit-hit': 3,
				'plus-damage': 15,
			},
		},
		'call-of-the-ancients': {
			name: 'Call of the Ancients',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 60,
			},
		},
		'call-of-the-ancients~a': {
			name: 'Call of the Ancients - Korlic\'s Might',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Korlic gains the skill Furious Charge which deals 200% of your weapon damage to all enemies in a line.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 60,
			},
		},
		'call-of-the-ancients~b': {
			name: 'Call of the Ancients - The Council Rises',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'The Ancients inflict 66% weapon damage with each attack and have 100% additional Armor.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 66,
			},
		},
		'call-of-the-ancients~c': {
			name: 'Call of the Ancients - Madawc\'s Madness',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Madawc gains the skill Seismic Slam which deals 180% of your weapon damage to enemies in an arc.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 60,
			},
		},
		'call-of-the-ancients~d': {
			name: 'Call of the Ancients - Duty to the Clan',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Increase duration to 20 seconds.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 60,
			},
		},
		'call-of-the-ancients~e': {
			name: 'Call of the Ancients - Talic\'s Anger',
			desc: 'Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Talic gains the skill Leap which deals 250% of your weapon damage to enemies in the area of the leap.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'weapon-damage': 60,
			},
		},
		'overpower': {
			name: 'Overpower',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
			},
		},
		'overpower~a': {
			name: 'Overpower - Killing Spree',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Your Critical Hit Chance is increased by 10% for 6 seconds.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
				'plus-crit-hit': 10,
			},
		},
		'overpower~b': {
			name: 'Overpower - Storm of Steel',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Throw up to 3 axes at nearby enemies which inflict 50% weapon damage each.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
			},
		},
		'overpower~c': {
			name: 'Overpower - Revel',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Heal 8% of your maximum Life for every enemy hit.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
			},
		},
		'overpower~d': {
			name: 'Overpower - Momentum',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Generate 12 Fury for each enemy hit by Overpower.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
			},
		},
		'overpower~e': {
			name: 'Overpower - Crushing Advance',
			desc: 'Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Redirect 35% of incoming melee and ranged damage for 4 seconds after Overpower is activated.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 165,
			},
		},
		'war-cry': {
			name: 'War Cry',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			effect: {
				'generate-fury': 30,
				'cooldown': 30,
				'plus-armor': 20,
			},
		},
		'war-cry~a': {
			name: 'War Cry - Hardened Wrath',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases the Armor bonus to 40%.',
			effect: {
				'generate-fury': 30,
				'cooldown': 30,
				'plus-armor': 40,
			},
		},
		'war-cry~b': {
			name: 'War Cry - Veteran\'s Warning',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'War Cry also grants a 15% bonus to Dodge Chance.',
			effect: {
				'generate-fury': 30,
				'cooldown': 30,
				'plus-dodge': 15,
				'plus-armor': 20,
			},
		},
		'war-cry~c': {
			name: 'War Cry - Impunity',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'All of your resistances are increased by 50% while affected by War Cry.',
			effect: {
				'generate-fury': 30,
				'cooldown': 30,
				'plus-resist-all': 50,
				'plus-armor': 20,
			},
		},
		'war-cry~d': {
			name: 'War Cry - Charge!',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases Fury gained to 60.',
			effect: {
				'cooldown': 30,
				'plus-armor': 20,
				'generate-fury': 60,
			},
		},
		'war-cry~e': {
			name: 'War Cry - Invigorate',
			desc: 'Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases maximum Life by 10% and regenerates 310.1 Life per second while affected by War Cry.',
			effect: {
				'generate-fury': 30,
				'cooldown': 30,
				'plus-armor': 20,
				'plus-life': 10,
				'plus-life-regen': 310.1,
			},
		},
		'wrath-of-the-berserker': {
			name: 'Wrath of the Berserker',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-dodge': 20,
				'plus-movement-speed': 20,
				'plus-crit-hit': 10,
				'plus-attack-speed': 25,
			},
		},
		'wrath-of-the-berserker~a': {
			name: 'Wrath of the Berserker - Insanity',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			rune: 'While active your damage is also increased by 100%.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-dodge': 20,
				'plus-movement-speed': 20,
				'plus-crit-hit': 10,
				'plus-damage': 100,
				'plus-attack-speed': 25,
			},
		},
		'wrath-of-the-berserker~b': {
			name: 'Wrath of the Berserker - Arreat\'s Wail',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			rune: 'Activating Wrath of the Berserker knocks back all enemies within 12 yards and deals 430% weapon damage to them.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-dodge': 20,
				'plus-movement-speed': 20,
				'weapon-damage': 430,
				'plus-crit-hit': 10,
				'plus-attack-speed': 25,
			},
		},
		'wrath-of-the-berserker~c': {
			name: 'Wrath of the Berserker - Striding Giant',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			rune: 'Increases bonus to Dodge Chance to 60%.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-movement-speed': 20,
				'plus-crit-hit': 10,
				'plus-attack-speed': 25,
				'plus-dodge': 60,
			},
		},
		'wrath-of-the-berserker~d': {
			name: 'Wrath of the Berserker - Thrive on Chaos',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			rune: 'Every 25 Fury gained while Wrath of the Berserker is active adds 1 second to the duration of the effect.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-dodge': 20,
				'plus-movement-speed': 20,
				'plus-crit-hit': 10,
				'plus-attack-speed': 25,
			},
		},
		'wrath-of-the-berserker~e': {
			name: 'Wrath of the Berserker - Slaughter',
			desc: 'Enter a berserker rage which raises several attributes for 15 seconds.  <ul><li>Critical Hit Chance: 10%</li><li>Attack Speed: 25%</li><li>Dodge Chance: 20%</li><li>Movement Speed: 20%</li></ul>',
			rune: 'While Wrath of the Berserker is active, Critical Hits have a chance to cause an eruption of blood dealing 155% weapon damage to enemies within 15 yards.',
			effect: {
				'cost-fury': 50,
				'cooldown': 120,
				'plus-dodge': 20,
				'plus-movement-speed': 20,
				'plus-crit-hit': 10,
				'plus-attack-speed': 25,
			},
		},
	},
	'demon-hunter': {
		'hungering-arrow': {
			name: 'Hungering Arrow',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 115,
			},
		},
		'hungering-arrow~a': {
			name: 'Hungering Arrow - Cinder Arrow',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Light the arrow on fire, dealing 35% additional weapon damage as Fire over 3 seconds.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 150,
			},
		},
		'hungering-arrow~b': {
			name: 'Hungering Arrow - Shatter Shot',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'If the arrow successfully pierces the first target, the arrow splits into 3 arrows.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 115,
			},
		},
		'hungering-arrow~c': {
			name: 'Hungering Arrow - Devouring Arrow',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Each consecutive pierce increases the damage of the arrow by 70%.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 115,
				'pierce-bonus': 70,
			},
		},
		'hungering-arrow~d': {
			name: 'Hungering Arrow - Puncturing Arrow',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Increase the chance for the arrow to pierce to 50%.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 115,
			},
		},
		'hungering-arrow~e': {
			name: 'Hungering Arrow - Spray of Teeth',
			desc: 'Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Successful Critical Hits cause a burst of bone to explode from the target, dealing 50% weapon damage to enemies in that area.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 115,
			},
		},
		'impale': {
			name: 'Impale',
			desc: 'Impale a target for 265% weapon damage.',
			effect: {
				'cost-hatred': 25,
				'weapon-damage': 265,
			},
		},
		'impale~a': {
			name: 'Impale - Overpenetration',
			desc: 'Impale a target for 265% weapon damage.',
			rune: 'The knife will pierce through all enemies in a straight line.',
			effect: {
				'cost-hatred': 25,
				'weapon-damage': 265,
			},
		},
		'impale~b': {
			name: 'Impale - Impact',
			desc: 'Impale a target for 265% weapon damage.',
			rune: 'Impale causes Knockback and has a 65% chance to Stun enemies for 1.5 seconds.',
			effect: {
				'cost-hatred': 25,
				'chance-stun': 65,
				'weapon-damage': 265,
			},
		},
		'impale~c': {
			name: 'Impale - Chemical Burn',
			desc: 'Impale a target for 265% weapon damage.',
			rune: 'Your target will also Bleed for 125% weapon damage as Physical over 2 seconds.',
			effect: {
				'cost-hatred': 25,
				'weapon-damage': 390,
				'weapon-damage-for': 2
			},
		},
		'impale~d': {
			name: 'Impale - Awareness',
			desc: 'Impale a target for 265% weapon damage.',
			rune: 'After the initial throw, release multiple blades centered on you, dealing 75% weapon damage to all enemies within 10 yards.',
			effect: {
				'cost-hatred': 25,
				'weapon-damage': 340,
			},
		},
		'impale~e': {
			name: 'Impale - Grievous Wounds',
			desc: 'Impale a target for 265% weapon damage.',
			rune: 'Critical Hits cause 100% additional damage.',
			effect: {
				'cost-hatred': 25,
				'weapon-damage': 265,
				'plus-crit-hit-damage': 100,
			},
		},
		'entangling-shot': {
			name: 'Entangling Shot',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 75,
			},
		},
		'entangling-shot~a': {
			name: 'Entangling Shot - Heavy Burden',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Increase the movement slow duration to 4 seconds.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 75,
			},
		},
		'entangling-shot~b': {
			name: 'Entangling Shot - Chain Gang',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Hit up to 4 targets.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 75,
			},
		},
		'entangling-shot~c': {
			name: 'Entangling Shot - Shock Collar',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Strike targets with electrified chains that do an additional 35% weapon damage per second as Lightning for 2 seconds.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 160,
				'weapon-damage-for': 2
			},
		},
		'entangling-shot~d': {
			name: 'Entangling Shot - Justice is Served',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Increase the Hatred generated to 6 per shot.',
			effect: {
				'weapon-damage': 75,
				'generate-hatred': 6,
			},
		},
		'entangling-shot~e': {
			name: 'Entangling Shot - Bounty Hunter',
			desc: 'Imbue an arrow with shadow energy that deals 90% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Gain 6% of the damage dealt as Life.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 75,
				'life-steal': 6,
			},
		},
		'caltrops': {
			name: 'Caltrops',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			effect: {
				'cost-discipline': 6,
			},
		},
		'caltrops~a': {
			name: 'Caltrops - Jagged Spikes',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Enemies in the area also take 45% weapon damage.',
			effect: {
				'cost-discipline': 6,
				'weapon-damage': 45,
			},
		},
		'caltrops~b': {
			name: 'Caltrops - Hooked Spines',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Increase the slowing amount to 80%.',
			effect: {
				'cost-discipline': 6,
			},
		},
		'caltrops~c': {
			name: 'Caltrops - Torturous Ground',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'When the trap is sprung, all enemies in the area are immobilized for 2 seconds.',
			effect: {
				'cost-discipline': 6,
			},
		},
		'caltrops~d': {
			name: 'Caltrops - Carved Stakes',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Reduces the cost of Caltrops to 4 Discipline.',
			effect: {
				'cost-discipline': 4,
			},
		},
		'caltrops~e': {
			name: 'Caltrops - Bait the Trap',
			desc: 'Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Become empowered while standing in the area of effect, gaining an additional 10% Critical Hit Chance with all attacks.',
			effect: {
				'cost-discipline': 6,
				'plus-crit-hit': 10,
			},
		},
		'rapid-fire': {
			name: 'Rapid Fire',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			effect: {
				'cost-hatred': 20,
				'weapon-damage': 276,
			},
		},
		'rapid-fire~a': {
			name: 'Rapid Fire - Bombardment',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			rune: 'Rapidly fire grenades that explode for 345% weapon damage as Fire to all enemies within a 4 yard radius.',
			effect: {
				'cost-hatred': 20,
				'weapon-damage': 345,
			},
		},
		'rapid-fire~b': {
			name: 'Rapid Fire - High Velocity',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			rune: 'Fire poison arrows that have a 40% chance to pierce through enemies.',
			effect: {
				'cost-hatred': 20,
				'weapon-damage': 276,
			},
		},
		'rapid-fire~c': {
			name: 'Rapid Fire - Fire Support',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			rune: 'While channeling Rapid Fire, launch 3 homing rockets every second. Each rocket deals 35% weapon damage as Physical to nearby targets.',
			effect: {
				'cost-hatred': 20,
				'weapon-damage': 276,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 35,
					},
				},
			},
		},
		'rapid-fire~d': {
			name: 'Rapid Fire - Withering Fire',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			rune: 'Reduces the initial Hatred cost to 5, and ignites your arrows, causing them to deal Fire damage.',
			effect: {
				'weapon-damage': 276,
				'cost-hatred': 5,
			},
		},
		'rapid-fire~e': {
			name: 'Rapid Fire - Web Shot',
			desc: 'Rapidly fire for 276% weapon damage as Physical.',
			rune: 'Slows the movement of affected targets by 80% for 1 second.',
			effect: {
				'cost-hatred': 20,
				'weapon-damage': 276,
			},
		},
		'smoke-screen': {
			name: 'Smoke Screen',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			effect: {
				'cost-discipline': 14,
			},
		},
		'smoke-screen~a': {
			name: 'Smoke Screen - Choking Gas',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Leave behind a cloud of gas that deals 700% weapon damage per second as Physical to enemies in the area for 5 seconds.',
			effect: {
				'cost-discipline': 14,
				'weapon-damage': 700,
				'weapon-damage-for': 5
			},
		},
		'smoke-screen~b': {
			name: 'Smoke Screen - Lingering Fog',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Increase the duration of the effect to 1.5 seconds.',
			effect: {
				'cost-discipline': 14,
			},
		},
		'smoke-screen~c': {
			name: 'Smoke Screen - Breathe Deep',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'While invisible you gain 12 Hatred per second.',
			effect: {
				'cost-discipline': 14,
				'generate-hatred': 12,
			},
		},
		'smoke-screen~d': {
			name: 'Smoke Screen - Special Recipe',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Reduce the cost to 12 Discipline.',
			effect: {
				'cost-discipline': 12,
			},
		},
		'smoke-screen~e': {
			name: 'Smoke Screen - Displacement',
			desc: 'Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Gain 35% movement speed when activated.',
			effect: {
				'cost-discipline': 14,
			},
		},
		'vault': {
			name: 'Vault',
			desc: 'Tumble acrobatically 35 yards.',
			effect: {
				'cost-discipline': 8,
			},
		},
		'vault~a': {
			name: 'Vault - Trail of Cinders',
			desc: 'Tumble acrobatically 35 yards.',
			rune: 'Leave a trail of fire in your wake that inflicts 1500% weapon damage as Fire over 3 seconds.',
			effect: {
				'cost-discipline': 8,
				'weapon-damage': 1500,
				'weapon-damage-for': 3
			},
		},
		'vault~b': {
			name: 'Vault - Acrobatics',
			desc: 'Tumble acrobatically 35 yards.',
			rune: 'Removes the Discipline cost but adds a 15 second cooldown.',
			effect: {
			},
		},
		'vault~c': {
			name: 'Vault - Action Shot',
			desc: 'Tumble acrobatically 35 yards.',
			rune: 'As you travel, shoot arrows for 75% weapon damage at nearby targets.',
			effect: {
				'cost-discipline': 8,
				'weapon-damage': 75,
			},
		},
		'vault~d': {
			name: 'Vault - Tumble',
			desc: 'Tumble acrobatically 35 yards.',
			rune: 'After using Vault, your next Vault within 6 seconds has its Discipline cost reduced by 50%.',
			effect: {
				'cost-discipline': 8,
			},
		},
		'vault~e': {
			name: 'Vault - Rattling Roll',
			desc: 'Tumble acrobatically 35 yards.',
			rune: 'All enemies within 8 yards of your destination are knocked back and stunned for 1.5 seconds.',
			effect: {
				'cost-discipline': 8,
			},
		},
		'bola-shot': {
			name: 'Bola Shot',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 160,
			},
		},
		'bola-shot~a': {
			name: 'Bola Shot - Volatile Explosives',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Increase the explosion radius to 14 yards.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 160,
			},
		},
		'bola-shot~b': {
			name: 'Bola Shot - Acid Strike',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Shoot 3 bolas that each deal 160% weapon damage as Poison. The bolas no longer explode for area damage to nearby targets.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 160,
			},
		},
		'bola-shot~c': {
			name: 'Bola Shot - Thunder Ball',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'When the bola explodes, it deals 160% weapon damage as Lightning and has a 35% chance to Stun the primary target for 1.5 seconds.',
			effect: {
				'generate-hatred': 3,
				'chance-stun': 35,
				'weapon-damage': 160,
			},
		},
		'bola-shot~d': {
			name: 'Bola Shot - Bitter Pill',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'When the bola explodes, you have a 15% chance to gain 2 Discipline.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 160,
			},
		},
		'bola-shot~e': {
			name: 'Bola Shot - Imminent Doom',
			desc: 'Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 160% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Augment the bola to deal 216% weapon damage as Arcane to the target and 154% weapon damage as Arcane to all other targets within 7 yards, but increases the explosion delay to 2 seconds.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 216,
			},
		},
		'chakram': {
			name: 'Chakram',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 170,
			},
		},
		'chakram~a': {
			name: 'Chakram - Twin Chakrams',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			rune: 'A second Chakram mirrors the first.  Each Chakram deals 114% weapon damage as Physical.',
			effect: {
				'cost-hatred': 10,
				'stack': {
					'weapon-damage': {
						'limit': 2,
						'value': 114,
					},
				},
			},
		},
		'chakram~b': {
			name: 'Chakram - Boomerang',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram path turns into a loop, dealing 230% weapon damage as Lightning to enemies along the path.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 230,
			},
		},
		'chakram~c': {
			name: 'Chakram - Serpentine',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram follows a slow curve, dealing 230% weapon damage as Poison to enemies along the path.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 230,
			},
		},
		'chakram~d': {
			name: 'Chakram - Razor Disk',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram spirals out from the targeted location dealing 187% weapon damage as Arcane to enemies along the path.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 187,
			},
		},
		'chakram~e': {
			name: 'Chakram - Shuriken Cloud',
			desc: 'Fire a swirling Chakram that does 170% weapon damage as Physical to enemies along its path.',
			rune: 'Surround yourself with spinning Chakrams for 120 seconds, dealing 34% weapon damage per second as Physical to nearby enemies.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 34,
			},
		},
		'preparation': {
			name: 'Preparation',
			desc: 'Instantly restore all Discipline.',
			effect: {
				'cooldown': 45,
			},
		},
		'preparation~a': {
			name: 'Preparation - Punishment',
			desc: 'Instantly restore all Discipline.',
			rune: 'Restore all Hatred for 25 Discipline. Preparation has no cooldown.',
			effect: {
				'cooldown': 45,
			},
		},
		'preparation~b': {
			name: 'Preparation - Invigoration',
			desc: 'Instantly restore all Discipline.',
			rune: 'Increase maximum Discipline by 10 for 5 seconds when using Preparation.',
			effect: {
				'cooldown': 45,
			},
		},
		'preparation~c': {
			name: 'Preparation - Focused Mind',
			desc: 'Instantly restore all Discipline.',
			rune: 'Gain 45 Discipline over 15 seconds instead of restoring it immediately.',
			effect: {
				'cooldown': 45,
			},
		},
		'preparation~d': {
			name: 'Preparation - Battle Scars',
			desc: 'Instantly restore all Discipline.',
			rune: 'Gain 60% Life after using Preparation.',
			effect: {
				'cooldown': 45,
			},
		},
		'preparation~e': {
			name: 'Preparation - Backup Plan',
			desc: 'Instantly restore all Discipline.',
			rune: 'There is a 30% chance that Preparation\'s cooldown will not be triggered.',
			effect: {
				'cooldown': 45,
			},
		},
		'evasive-fire': {
			name: 'Evasive Fire',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 130,
			},
		},
		'evasive-fire~a': {
			name: 'Evasive Fire - Shrapnel',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Shoot exploding bolts that also deal 30% weapon damage as Fire to all enemies within 6 yards of the primary target.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 160,
			},
		},
		'evasive-fire~b': {
			name: 'Evasive Fire - Covering Fire',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Shoot a spread of bolts that hit up to 3 targets for 130% weapon damage each.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 130,
			},
		},
		'evasive-fire~c': {
			name: 'Evasive Fire - Parting Gift',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Whenever a backflip is triggered, leave a poison bomb behind that explodes for 45% weapon damage as Poison in a 12 yard radius after 1.2 seconds. Turns Evasive Fire into Poison damage.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 130,
			},
		},
		'evasive-fire~d': {
			name: 'Evasive Fire - Surge',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Reduces the cost of the backflip to 2 Discipline. Turns Evasive Fire into Lightning damage.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 130,
			},
		},
		'evasive-fire~e': {
			name: 'Evasive Fire - Displace',
			desc: 'Shoot for 130% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Increase the distance of the backflip to 30 yards.',
			effect: {
				'cost-discipline': 4,
				'generate-hatred': 4,
				'weapon-damage': 130,
			},
		},
		'grenades': {
			name: 'Grenades',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 95,
			},
		},
		'grenades~a': {
			name: 'Grenades - Gas Grenades',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw gas grenades that explode for 95% weapon damage as Poison and leave a cloud that deals an additional 25% weapon damage per second as Poison for 3 seconds to enemies who stand in the area.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 95,
			},
		},
		'grenades~b': {
			name: 'Grenades - Cluster Grenades',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw cluster grenades that deal 111% weapon damage as Fire over an 8 yard radius.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 111,
			},
		},
		'grenades~c': {
			name: 'Grenades - Fire Bomb',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw a single grenade that deals 124% weapon damage as Fire.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 124,
			},
		},
		'grenades~d': {
			name: 'Grenades - Tinkerer',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Increases Hatred generation to 6 Hatred.',
			effect: {
				'generate-hatred': 3,
				'weapon-damage': 95,
			},
		},
		'grenades~e': {
			name: 'Grenades - Stun Grenades',
			desc: 'Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Hurl grenades that have a 25% chance to Stun enemies for 1.5 seconds.',
			effect: {
				'generate-hatred': 3,
				'chance-stun': 25,
				'weapon-damage': 95,
			},
		},
		'shadow-power': {
			name: 'Shadow Power',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			effect: {
				'cost-discipline': 14,
				'life-steal': 20,
			},
		},
		'shadow-power~a': {
			name: 'Shadow Power - Night Bane',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Gain an additional 4 Hatred per second while Shadow Power is active.',
			effect: {
				'cost-discipline': 14,
				'life-steal': 20,
			},
		},
		'shadow-power~b': {
			name: 'Shadow Power - Shadow Glide',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Gain 40% bonus to movement speed while Shadow Power is active.',
			effect: {
				'cost-discipline': 14,
				'life-steal': 20,
			},
		},
		'shadow-power~c': {
			name: 'Shadow Power - Gloom',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Reduce incoming damage by 65% while Shadow Power is active.',
			effect: {
				'cost-discipline': 14,
				'plus-damage-reduce': 65,
				'life-steal': 20,
			},
		},
		'shadow-power~d': {
			name: 'Shadow Power - Well of Darkness',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Decreases the Discipline cost to 12.',
			effect: {
				'life-steal': 20,
				'cost-discipline': 12,
			},
		},
		'shadow-power~e': {
			name: 'Shadow Power - Blood Moon',
			desc: 'Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Increases damage done as Life to 30%.',
			effect: {
				'cost-discipline': 14,
				'life-steal': 30,
			},
		},
		'fan-of-knives': {
			name: 'Fan of Knives',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'weapon-damage': 320,
			},
		},
		'fan-of-knives~a': {
			name: 'Fan of Knives - Hail of Knives',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Increase the radius to damage all enemies within 20 yards.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'weapon-damage': 320,
			},
		},
		'fan-of-knives~b': {
			name: 'Fan of Knives - Assassin\'s Knives',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Throw long-range knives that deal 70% weapon damage to 5 additional targets.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'weapon-damage': 390,
			},
		},
		'fan-of-knives~c': {
			name: 'Fan of Knives - Fan of Daggers',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Imbue your knives with a 65% chance to Stun enemies for 2 seconds.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'chance-stun': 65,
				'weapon-damage': 320,
			},
		},
		'fan-of-knives~d': {
			name: 'Fan of Knives - Crippling Razors',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Increase the amount enemies are slowed to 20% for 2 seconds.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'weapon-damage': 320,
			},
		},
		'fan-of-knives~e': {
			name: 'Fan of Knives - Retaliate',
			desc: 'Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Surround yourself with whirling blades that deal 464% weapon damage to all enemies if you are struck in the next 10 seconds.',
			effect: {
				'cost-hatred': 20,
				'cooldown': 10,
				'weapon-damage': 464,
			},
		},
		'spike-trap': {
			name: 'Spike Trap',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 275,
			},
		},
		'spike-trap~a': {
			name: 'Spike Trap - Long Fuse',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Increases the arming time to 2 seconds but increases damage to 371% weapon damage.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 371,
			},
		},
		'spike-trap~b': {
			name: 'Spike Trap - Bandolier',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Increase the maximum number of traps that can be out simultaneously to 6.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 275,
			},
		},
		'spike-trap~c': {
			name: 'Spike Trap - Sticky Trap',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Plant a bomb on an enemy rather than on the ground. If the target dies within 30 seconds, the bomb explodes dealing 404% weapon damage to all enemies within 8 yards.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 679,
			},
		},
		'spike-trap~d': {
			name: 'Spike Trap - Scatter',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Simultaneously place all 3 traps.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 275,
			},
		},
		'spike-trap~e': {
			name: 'Spike Trap - Lightning Rod',
			desc: 'Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'When the trap is triggered it releases a pulse of lightning that will bounce to up to 3 enemies for 275% weapon damage as Lightning.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 275,
			},
		},
		'companion': {
			name: 'Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'companion~a': {
			name: 'Companion - Spider Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a spider instead of a raven. The spider\'s attacks also Slow the movement of enemies by 60% for 2 seconds.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'companion~b': {
			name: 'Companion - Boar Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a boar instead of a raven. The boar\'s attacks hit all enemies in an area.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'companion~c': {
			name: 'Companion - Wolf Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a wolf for 25 seconds instead of a raven. The wolf attacks for 0% of your weapon damage as Physical.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'companion~d': {
			name: 'Companion - Bat Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a bat instead of a raven. The bat grants you 3 Hatred per second.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'companion~e': {
			name: 'Companion - Ferret Companion',
			desc: 'Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon ferrets instead of a raven. The ferrets collect gold for you and increase gold found on monsters by 10%.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 30,
			},
		},
		'strafe': {
			name: 'Strafe',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 156,
			},
		},
		'strafe~a': {
			name: 'Strafe - Demolition',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Throw out bouncy grenades that explode for 187% weapon damage to targets within 9 yards.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 187,
			},
		},
		'strafe~b': {
			name: 'Strafe - Equilibrium',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Increases your attack speed by 20% when using Strafe.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 156,
				'stack': {
					'plus-attack-speed-this': {
						'limit': 5,
						'value': 20,
					},
				},
			},
		},
		'strafe~c': {
			name: 'Strafe - Rocket Storm',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			rune: 'In addition to regular firing, fire off homing rockets for 60% weapon damage as Fire.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 216,
			},
		},
		'strafe~d': {
			name: 'Strafe - Drifting Shadow',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Movement speed increased to 100% of normal running speed while strafing.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 156,
			},
		},
		'strafe~e': {
			name: 'Strafe - Stinging Steel',
			desc: 'Shoot at random nearby enemies for 156% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Throw out knives rather than arrows that do an extra 100% damage on successful Critical Hits.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 156,
				'plus-crit-hit-damage': 100,
			},
		},
		'elemental-arrow': {
			name: 'Elemental Arrow',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 155,
			},
		},
		'elemental-arrow~a': {
			name: 'Elemental Arrow - Frost Arrow',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire a frost arrow that splits into multiple arrows after hitting its target, dealing 170% weapon damage as Cold. Affected enemies have their movement speed slowed by 60% for 1 second.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 155,
			},
		},
		'elemental-arrow~b': {
			name: 'Elemental Arrow - Ball Lightning',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire a slow-moving arrow that electrocutes enemies along its path for 155% weapon damage as Lightning.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 155,
			},
		},
		'elemental-arrow~c': {
			name: 'Elemental Arrow - Screaming Skull',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Grants a 40% chance to shoot a skull that will Fear affected enemies for 1.5 seconds.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 155,
			},
		},
		'elemental-arrow~d': {
			name: 'Elemental Arrow - Nether Tentacles',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Shadow tentacles deal 155% weapon damage to enemies along its path and return 3% of damage dealt as Life for you.',
			effect: {
				'cost-hatred': 10,
				'life-steal': 3,
				'weapon-damage': 155,
			},
		},
		'elemental-arrow~e': {
			name: 'Elemental Arrow - Lightning Bolts',
			desc: 'Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire electrified bolts that Stun enemies for 1.5 seconds on a Critical Hit.',
			effect: {
				'cost-hatred': 10,
				'weapon-damage': 155,
			},
		},
		'marked-for-death': {
			name: 'Marked for Death',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			effect: {
				'cost-discipline': 3,
				'plus-damage': 12,
			},
		},
		'marked-for-death~a': {
			name: 'Marked for Death - Grim Reaper',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'An additional 12% of damage done to the target is also divided among all enemies within 20 yards.',
			effect: {
				'cost-discipline': 3,
				'plus-damage': 12,
			},
		},
		'marked-for-death~b': {
			name: 'Marked for Death - Contagion',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'When the target is killed, the ability spreads to 2 other nearby targets. This effect can chain repeatedly.',
			effect: {
				'cost-discipline': 3,
				'plus-damage': 12,
			},
		},
		'marked-for-death~c': {
			name: 'Marked for Death - Valley of Death',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Mark an area on the ground 12 yards wide for 15 seconds.  Enemies in the area take 12% additional damage.',
			effect: {
				'cost-discipline': 3,
				'plus-damage': 12,
			},
		},
		'marked-for-death~d': {
			name: 'Marked for Death - Mortal Enemy',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Attacks you make against the marked target generate 3 Hatred.',
			effect: {
				'cost-discipline': 3,
				'plus-damage': 12,
			},
		},
		'marked-for-death~e': {
			name: 'Marked for Death - Death Toll',
			desc: 'Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Heal attackers for 1% of the damage done to the marked target.',
			effect: {
				'cost-discipline': 3,
				'life-steal': 1,
				'plus-damage': 12,
			},
		},
		'multishot': {
			name: 'Multishot',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 165,
			},
		},
		'multishot~a': {
			name: 'Multishot - Full Broadside',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Increase the damage of Multishot to 215% weapon damage.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 215,
			},
		},
		'multishot-77649~b': {
			name: 'Multishot - Burst Fire',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every time you fire, generate a shock pulse that damages nearby enemies for 65% weapon damage as Arcane.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 230,
			},
		},
		'multishot~c': {
			name: 'Multishot - Arsenal',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every use also fires 3 rockets at nearby enemies that deal 60% weapon damage as Fire each.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 225,
			},
		},
		'multishot~d': {
			name: 'Multishot - Fire at Will',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Cost reduced to 20 Hatred. Deals 165% weapon damage as Lightning.',
			effect: {
				'cost-hatred': 15,
				'weapon-damage': 165,
			},
		},
		'multishot~e': {
			name: 'Multishot - Suppression Fire',
			desc: 'Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every enemy hit grants 1 Discipline.',
			effect: {
				'cost-hatred': 30,
				'weapon-damage': 165,
			},
		},
		'sentry': {
			name: 'Sentry',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55%  weapon damage. Lasts 30 seconds.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 55,
			},
		},
		'sentry~a': {
			name: 'Sentry - Chain of Torment',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55% weapon damage. Lasts 30 seconds.',
			rune: 'Create a tether between you and the Sentry that does 80% weapon damage every second to every enemy it touches.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 55,
			},
		},
		'sentry~b': {
			name: 'Sentry - Vigilant Watcher',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55% weapon damage. Lasts 30 seconds.',
			rune: 'Increases duration of the turret to 40 seconds.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 55,
			},
		},
		'sentry~c': {
			name: 'Sentry - Spitfire Turret',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55% weapon damage. Lasts 30 seconds.',
			rune: 'The turret will also fire homing rockets aimed at random nearby targets for 8% weapon damage as Fire.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 63,
			},
		},
		'sentry~d': {
			name: 'Sentry - Aid Station',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55% weapon damage. Lasts 30 seconds.',
			rune: 'Heals nearby allies for 1% of their maximum Life per second.',
			effect: {
				'cost-discipline': 10,
				'weapon-damage': 55,
			},
		},
		'sentry~e': {
			name: 'Sentry - Guardian Turret',
			desc: 'Drop a turret on the ground. The turret begins firing at nearby enemies for 55% weapon damage. Lasts 30 seconds.',
			rune: 'The turret also creates a shield that reduces damage taken by allies by 15%.',
			effect: {
				'cost-discipline': 10,
				'plus-damage-reduce': 15,
				'weapon-damage': 55,
			},
		},
		'cluster-arrow': {
			name: 'Cluster Arrow',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			effect: {
				'cost-hatred': 50,
				'weapon-damage': 225,
			},
		},
		'cluster-arrow~a': {
			name: 'Cluster Arrow - Loaded for Bear',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Increases the damage of the explosion at the impact location to 304% weapon damage as Fire.',
			effect: {
				'cost-hatred': 50,
				'weapon-damage': 304,
			},
		},
		'cluster-arrow~b': {
			name: 'Cluster Arrow - Shooting Stars',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Instead of releasing grenades, shoots up to 3 rockets at nearby enemies dealing 175% weapon damage as Physical each.',
			effect: {
				'cost-hatred': 50,
				'weapon-damage': 175,
			},
		},
		'cluster-arrow~c': {
			name: 'Cluster Arrow - Cluster Bombs',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Launch the cluster through the air, dropping bombs in a straight line that each explode for 230% weapon damage as Fire.',
			effect: {
				'cost-hatred': 50,
				'weapon-damage': 230,
			},
		},
		'cluster-arrow~d': {
			name: 'Cluster Arrow - Maelstrom',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Instead of releasing grenades, the cluster releases shadow energy that deals 165% weapon damage as Physical to nearby enemies. You will gain 4% of the damage done as Life.',
			effect: {
				'cost-hatred': 50,
				'life-steal': 4,
				'weapon-damage': 165,
			},
		},
		'cluster-arrow~e': {
			name: 'Cluster Arrow - Dazzling Arrow',
			desc: 'Fire a cluster arrow that explodes for 225% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Enemies hit by grenades have a 55% chance to be stunned for 2 seconds and changes the damage to Physical.',
			effect: {
				'cost-hatred': 50,
				'chance-stun': 55,
				'weapon-damage': 200,
			},
		},
		'rain-of-vengeance': {
			name: 'Rain of Vengeance',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			effect: {
				'cooldown': 30,
				'weapon-damage': 715,
				'weapon-damage-for': 5,
			},
		},
		'rain-of-vengeance~a': {
			name: 'Rain of Vengeance - Beastly Bombs',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon 20 Shadow Beasts to drop bombs on enemies, dealing 245% weapon damage each.',
			effect: {
				'cooldown': 30,
				'stack': {
					'weapon-damage': {
						'limit': 20,
						'value': 245,
					},
				},
			},
		},
		'rain-of-vengeance~b': {
			name: 'Rain of Vengeance - Dark Cloud',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Launch a massive volley of guided arrows that rain down on enemies for 792% weapon damage for 12 seconds.',
			effect: {
				'cooldown': 30,
				'weapon-damage': 792,
				'weapon-damage-for': 12,
			},
		},
		'rain-of-vengeance~c': {
			name: 'Rain of Vengeance - Anathema',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon a Shadow Beast that drops grenades from the sky for 10 seconds dealing 3300% weapon damage.',
			effect: {
				'cooldown': 30,
				'weapon-damage': 3300,
				'weapon-damage-for': 15,
			},
		},
		'rain-of-vengeance~d': {
			name: 'Rain of Vengeance - Flying Strike',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'A group of 8 Shadow Beasts plummet from the sky at a targeted location dealing 100% weapon damage each and stunning enemies for 2 seconds.',
			effect: {
				'cooldown': 30,
				'stack': {
					'weapon-damage': {
						'limit': 8,
						'value': 100,
					},
				},
			},
		},
		'rain-of-vengeance~e': {
			name: 'Rain of Vengeance - Stampede',
			desc: 'Fire a massive volley of arrows around you. Arrows fall from the sky dealing 715% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon a wave of 10 Shadow Beasts to tear across the ground, knocking back enemies and dealing 75% weapon damage each.',
			effect: {
				'cooldown': 30,
				'stack': {
					'weapon-damage': {
						'limit': 10,
						'value': 75,
					},
				},
			},
		},
	},
	'monk': {
		'fists-of-thunder': {
			name: 'Fists of Thunder',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'fists-of-thunder~a': {
			name: 'Fists of Thunder - Thunderclap',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Teleport to the target and release an electric shockwave with every punch that hits all enemies within 6 yards of your primary target for 35% weapon damage as Lightning.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
				'3rd-hit': 35,
			},
		},
		'fists-of-thunder~b': {
			name: 'Fists of Thunder - Bounding Light',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Every third punch releases chain lightning instead of knocking enemies back.  Each lightning strike inflicts 73% weapon damage as Lightning.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'fists-of-thunder~c': {
			name: 'Fists of Thunder - Static Charge',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Your primary target is charged with static electricity for 5 seconds and takes 37% weapon damage as Lightning when you attack other enemies with Fists of Thunder.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'fists-of-thunder~d': {
			name: 'Fists of Thunder - Quickening',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Critical Hits generate an additional 15 Spirit.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'fists-of-thunder~e': {
			name: 'Fists of Thunder - Lightning Flash',
			desc: 'Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Increases your chance to Dodge by 16% for 2 seconds.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'lashing-tail-kick': {
			name: 'Lashing Tail Kick',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			effect: {
				'cost-spirit': 30,
				'weapon-damage': 235,
			},
		},
		'lashing-tail-kick~a': {
			name: 'Lashing Tail Kick - Vulture Claw Kick',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			rune: 'Release a torrent of fire that burns nearby enemies for 258% weapon damage as Fire and causes Knockback.',
			effect: {
				'cost-spirit': 30,
				'weapon-damage': 258,
			},
		},
		'lashing-tail-kick~b': {
			name: 'Lashing Tail Kick - Spinning Flame Kick',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			rune: 'Hurl a column of fire that burns through enemies, causing 294% weapon damage as Fire to each enemy it strikes.',
			effect: {
				'cost-spirit': 30,
				'weapon-damage': 294,
			},
		},
		'lashing-tail-kick~c': {
			name: 'Lashing Tail Kick - Hand of Ytar',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			rune: 'Attack enemies at long range, slowing the movement speed of affected targets by 80% for 2 seconds.',
			effect: {
				'cost-spirit': 30,
				'weapon-damage': 235,
			},
		},
		'lashing-tail-kick~d': {
			name: 'Lashing Tail Kick - Sweeping Armada',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			rune: 'Increases Knockback distance by 150% and slows the movement speed of struck enemies by 60% for 2 seconds.',
			effect: {
				'cost-spirit': 30,
				'weapon-damage': 235,
			},
		},
		'lashing-tail-kick~e': {
			name: 'Lashing Tail Kick - Scorpion Sting',
			desc: 'Unleash a deadly roundhouse kick that knocks enemies back and deals 235% weapon damage.',
			rune: 'Enemies have a 50% chance to be stunned for 1.5 seconds instead of being knocked back.',
			effect: {
				'cost-spirit': 30,
				'chance-stun': 50,
				'weapon-damage': 235,
			},
		},
		'deadly-reach': {
			name: 'Deadly Reach',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'deadly-reach~a': {
			name: 'Deadly Reach - Foresight',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike increases the damage of all attacks by 18% for 30 seconds.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
				'plus-damage-conditional': 18
			},
		},
		'deadly-reach~b': {
			name: 'Deadly Reach - Piercing Trident',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'Increases the area of effect of the second and third strikes.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'deadly-reach~c': {
			name: 'Deadly Reach - Scattered Blows',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike is replaced with an attack that will hit up to 6 nearby enemies within 15 yards for 170% weapon damage as Lightning.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
				'3rd-hit': 60,
			},
		},
		'deadly-reach~d': {
			name: 'Deadly Reach - Strike from Beyond',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'Critical Hits generate an additional 10 Spirit.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
			},
		},
		'deadly-reach~e': {
			name: 'Deadly Reach - Keen Eye',
			desc: 'Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike increases your Armor by 50% for 4 seconds.',
			effect: {
				'generate-spirit': 6,
				'weapon-damage': 110,
				'plus-armor': 50,
			},
		},
		'blinding-flash': {
			name: 'Blinding Flash',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
			},
		},
		'blinding-flash~a': {
			name: 'Blinding Flash - Faith in the Light',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'For 3 seconds after using Blinding Flash, all of your attacks are empowered to deal 30% additional weapon damage as Holy.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
				'plus-damage-conditional': 30
			},
		},
		'blinding-flash~b': {
			name: 'Blinding Flash - Blinding Echo',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: '6 seconds after using Blinding Flash, a second flash of light will blind enemies within 20 yards for 0.5 seconds.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
			},
		},
		'blinding-flash~c': {
			name: 'Blinding Flash - Blinded and Confused',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Blinded enemies have a 25% chance to attack each other.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
			},
		},
		'blinding-flash~d': {
			name: 'Blinding Flash - Self Reflection',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Increases the duration enemies are blinded to 4 seconds.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
			},
		},
		'blinding-flash~e': {
			name: 'Blinding Flash - Searing Light',
			desc: 'Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Increases the chance elite enemies will miss attacks to 60%.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 15,
			},
		},
		'tempest-rush': {
			name: 'Tempest Rush',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'tempest-rush~a': {
			name: 'Tempest Rush - Bluster',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			rune: 'Enemies knocked back have their damage reduced by 20% for the duration of the effect.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'tempest-rush~b': {
			name: 'Tempest Rush - Tailwind',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			rune: 'Increases the movement speed of Tempest Rush by 25%.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'tempest-rush~c': {
			name: 'Tempest Rush - Slipstream',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			rune: 'Reduces damage taken while running by 25%.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'tempest-rush~d': {
			name: 'Tempest Rush - Northern Breeze',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			rune: 'Reduces the channeling cost of Tempest Rush to 8 Spirit.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'tempest-rush~e': {
			name: 'Tempest Rush - Flurry',
			desc: 'Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 85% weapon damage while running.',
			rune: 'Increases the potency of the hobbling effect, slowing enemy movement by 80%.',
			effect: {
				'cost-spirit': 15,
				'weapon-damage': 85,
			},
		},
		'breath-of-heaven': {
			name: 'Breath of Heaven',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
			},
		},
		'breath-of-heaven~a': {
			name: 'Breath of Heaven - Circle of Scorn',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Breath of Heaven also sears enemies for 80% weapon damage as Holy.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
				'weapon-damage': 80,
			},
		},
		'breath-of-heaven~b': {
			name: 'Breath of Heaven - Circle of Life',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Increases the healing power of Breath of Heaven to 8062.52 - 9675.02 Life.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
			},
		},
		'breath-of-heaven~c': {
			name: 'Breath of Heaven - Blazing Wrath',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Breath of Heaven increases the damage of your attacks by 15% for 45 seconds.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
				'plus-damage': 15,
			},
		},
		'breath-of-heaven~d': {
			name: 'Breath of Heaven - Infused with Light',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Gain 6 additional Spirit from Spirit generating attacks for 5 seconds after using Breath of Heaven.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
			},
		},
		'breath-of-heaven~e': {
			name: 'Breath of Heaven - Penitent Flame',
			desc: 'A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Enemies exposed to Breath of Heaven run away in Fear for 1.5 seconds.',
			effect: {
				'cost-spirit': 25,
				'cooldown': 15,
			},
		},
		'dashing-strike': {
			name: 'Dashing Strike',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 160,
			},
		},
		'dashing-strike~a': {
			name: 'Dashing Strike - Soaring Skull',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			rune: 'Launch yourself through the air and slow all enemies along your path by 60% for 2 seconds.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 160,
			},
		},
		'dashing-strike~b': {
			name: 'Dashing Strike - Way of the Falling Star',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			rune: 'After striking an enemy, your movement speed is increased 25% for 3 seconds.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 160,
			},
		},
		'dashing-strike~c': {
			name: 'Dashing Strike - Blinding Speed',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			rune: 'Receive a 20% increased chance to Dodge for 3 seconds.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 160,
			},
		},
		'dashing-strike~d': {
			name: 'Dashing Strike - Quicksilver',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			rune: 'Reduces the cost of Dashing Strike to 10 Spirit.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 160,
			},
		},
		'dashing-strike~e': {
			name: 'Dashing Strike - Flying Side Kick',
			desc: 'Quickly dash at the targeted enemy or location, striking for 160% weapon damage and rooting the target for 1 second.',
			rune: 'Perform a flying kick that has a 60% chance to Stun your target for 1.5 seconds.',
			effect: {
				'cost-spirit': 25,
				'chance-stun': 60,
				'weapon-damage': 160,
			},
		},
		'crippling-wave': {
			name: 'Crippling Wave',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 110,
			},
		},
		'crippling-wave~a': {
			name: 'Crippling Wave - Mangle',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Increase damage to 143% weapon damage.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 143,
			},
		},
		'crippling-wave~b': {
			name: 'Crippling Wave - Tsunami',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'The range of Crippling Wave\'s third strike is increased to 17 yards and the effect of the movement speed reduction is increased to 60%.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 110,
			},
		},
		'crippling-wave~c': {
			name: 'Crippling Wave - Concussion',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Enemies hit by Crippling Wave inflict 20% less damage for 3 seconds.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 110,
			},
		},
		'crippling-wave~d': {
			name: 'Crippling Wave - Rising Tide',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Critical Hits generate an additional 5 Spirit.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 110,
			},
		},
		'crippling-wave~e': {
			name: 'Crippling Wave - Breaking Wave',
			desc: 'Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Enemies hit by Crippling Wave take 10% additional damage from all attacks for 3 seconds.',
			effect: {
				'generate-spirit': 7,
				'weapon-damage': 110,
				'plus-damage-conditional': 10,
			},
		},
		'wave-of-light': {
			name: 'Wave of Light',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 390,
			},
		},
		'wave-of-light~a': {
			name: 'Wave of Light - Wall of Light',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Increases damage of the initial strike to 566% weapon damage as Holy.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 566,
			},
		},
		'wave-of-light~b': {
			name: 'Wave of Light - Explosive Light',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Release bursts of energy that deal 430% weapon damage as Holy to nearby enemies.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 430,
			},
		},
		'wave-of-light~c': {
			name: 'Wave of Light - Pillar of the Ancients',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Summon an ancient pillar that deals 280% weapon damage followed by an additional 280% weapon damage after 2 seconds.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 560,
				'weapon-damage-for': 2
			},
		},
		'wave-of-light~d': {
			name: 'Wave of Light - Empowered Wave',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Reduces the cost of Wave of Light to 40 Spirit.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 390,
			},
		},
		'wave-of-light~e': {
			name: 'Wave of Light - Blinding Light',
			desc: 'Focuses a wave of light that crushes enemies for 390% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Critical Hits Stun enemies for 3 seconds.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 390,
			},
		},
		'exploding-palm': {
			name: 'Exploding Palm',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 745,
				'weapon-damage-for': 9
			},
		},
		'exploding-palm~a': {
			name: 'Exploding Palm - Impending Doom',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Increases the duration of the Bleed effect to deal 745% weapon damage as Physical over 15 seconds.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 745,
				'weapon-damage-for': 15
			},
		},
		'exploding-palm~b': {
			name: 'Exploding Palm - Creeping Demise',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Also reduces your target\'s movement speed by 80%.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 745,
				'weapon-damage-for': 9
			},
		},
		'exploding-palm~c': {
			name: 'Exploding Palm - The Flesh is Weak',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Also causes the target to take 12% additional damage for 3 seconds.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 745,
				'weapon-damage-for': 9
			},
		},
		'exploding-palm~d': {
			name: 'Exploding Palm - Strong Spirit',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'If the target explodes after bleeding, gain 5 Spirit for each enemy caught in the blast.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 745,
				'weapon-damage-for': 9
			},
		},
		'exploding-palm~e': {
			name: 'Exploding Palm - Essence Burn',
			desc: 'Cause a target to Bleed for 745% weapon damage as Physical over 9 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Instead of bleeding, the target will burn for 250% weapon damage as Fire over 3 seconds. If the target dies while burning, it explodes causing all nearby enemies to burn for 60% weapon damage as Fire over 3 seconds. This effect can happen multiple times.',
			effect: {
				'cost-spirit': 40,
				'weapon-damage': 250,
				'weapon-damage-for': 3
			},
		},
		'cyclone-strike': {
			name: 'Cyclone Strike',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'cyclone-strike~a': {
			name: 'Cyclone Strike - Sunburst',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Changes the blast into an explosion of fire that has a 35% chance to Fear enemies for 1.5 seconds.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'cyclone-strike~b': {
			name: 'Cyclone Strike - Implosion',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Increases the distance enemies will be pulled towards you to 34 yards.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'cyclone-strike~c': {
			name: 'Cyclone Strike - Soothing Breeze',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Cyclone Strike heals you and all allies within 24 yards for 1240.39 Life.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'cyclone-strike~d': {
			name: 'Cyclone Strike - Eye of the Storm',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Reduces the Spirit cost of Cyclone Strike to 30 Spirit.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'cyclone-strike~e': {
			name: 'Cyclone Strike - Wall of Wind',
			desc: 'Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'After using Cyclone Strike, gain a 20% chance to dodge attacks for 3 seconds.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 100,
			},
		},
		'way-of-the-hundred-fists': {
			name: 'Way of the Hundred Fists',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 140,
			},
		},
		'way-of-the-hundred-fists~a': {
			name: 'Way of the Hundred Fists - Fists of Fury',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Affected targets will take an additional 100% weapon damage per second as Holy for 5 seconds. Also adds a short dash to the first strike.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 240,
				'weapon-damage-for': 5
			},
		},
		'way-of-the-hundred-fists~b': {
			name: 'Way of the Hundred Fists - Hands of Lightning',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Increases the number of hits in the second strike from 7 to 10.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 140,
			},
		},
		'way-of-the-hundred-fists~c': {
			name: 'Way of the Hundred Fists - Blazing Fists',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Critical Hits increase your attack speed and movement speed by 5% for 5 seconds. This effect can stack up to 3 times.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 140,
			},
		},
		'way-of-the-hundred-fists~d': {
			name: 'Way of the Hundred Fists - Spirited Salvo',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Every activation of the skill has a 15% chance to generate 15 additional Spirit.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 140,
			},
		},
		'way-of-the-hundred-fists~e': {
			name: 'Way of the Hundred Fists - Windforce Flurry',
			desc: 'Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'The third strike generates a wave of wind that deals 250% weapon damage as Physical to enemies directly ahead of you.',
			effect: {
				'generate-spirit': 8,
				'weapon-damage': 390,
			},
		},
		'serenity': {
			name: 'Serenity',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'serenity~a': {
			name: 'Serenity - Peaceful Repose',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'When activated, Serenity heals you for 6201.94 - 7752.43 Life.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'serenity~b': {
			name: 'Serenity - Instant Karma',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'While Serenity is active, 50% of all projectiles and melee attacks are reflected back at the attacker.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'serenity~c': {
			name: 'Serenity - Ascension',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'Increases the duration of Serenity to 4 seconds.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'serenity~d': {
			name: 'Serenity - Tranquility',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'Extends the protective shield to allies within 45 yards for 1 second, and makes them immune to control impairing effects like Slow and Frozen.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'serenity~e': {
			name: 'Serenity - Reap What Is Sown',
			desc: 'You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'When Serenity ends, the shield explodes, dealing 30% of the damage absorbed by Serenity as Holy damage to enemies within 20 yards. The damage to each enemy cannot exceed 100% of your maximum Life.',
			effect: {
				'cost-spirit': 10,
				'cooldown': 20,
			},
		},
		'seven-sided-strike': {
			name: 'Seven-Sided Strike',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'weapon-damage': 1777,
				'weapon-damage-for': 7
			},
		},
		'seven-sided-strike~a': {
			name: 'Seven-Sided Strike - Sudden Assault',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			rune: 'Teleport to the target, increasing damage done to 2309% weapon damage over 7 strikes.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'weapon-damage': 2309,
				'weapon-damage-for': 7
			},
		},
		'seven-sided-strike~b': {
			name: 'Seven-Sided Strike - Several-Sided Strike',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			rune: 'Increases the number of strikes to 9.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'weapon-damage': 1777,
				'weapon-damage-for': 9
			},
		},
		'seven-sided-strike~c': {
			name: 'Seven-Sided Strike - Pandemonium',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			rune: 'Enemies hit by Seven-Sided Strike have a 25% chance to be stunned for 7 seconds by each hit.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'chance-stun': 25,
				'weapon-damage': 1777,
				'weapon-damage-for': 7
			},
		},
		'seven-sided-strike~d': {
			name: 'Seven-Sided Strike - Sustained Attack',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			rune: 'Reduces the cooldown of Seven-Sided Strike to 23 seconds.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'weapon-damage': 1777,
				'weapon-damage-for': 7
			},
		},
		'seven-sided-strike~e': {
			name: 'Seven-Sided Strike - Fulminating Onslaught',
			desc: 'Dash rapidly between nearby enemies, dealing 1777% weapon damage over 7 hits.',
			rune: 'Each strike explodes, dealing 254% weapon damage as Holy in a 7 yard radius around the target.',
			effect: {
				'cost-spirit': 50,
				'cooldown': 30,
				'weapon-damage': 1777,
				'weapon-damage-for': 7
			},
		},
		'mantra-of-evasion': {
			name: 'Mantra of Evasion',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			effect: {
				'cost-spirit': 50,
				'plus-dodge': 15,
			},
		},
		'mantra-of-evasion~a': {
			name: 'Mantra of Evasion - Backlash',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Successfully dodging an attack has a chance to create a burst of flame dealing 35% weapon damage as Fire to all nearby enemies.',
			effect: {
				'cost-spirit': 50,
				'weapon-damage': 35,
				'plus-dodge': 15,
			},
		},
		'mantra-of-evasion~b': {
			name: 'Mantra of Evasion - Perseverance',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also reduces the duration of all control impairing effects like Slow or Frozen by 20%.',
			effect: {
				'cost-spirit': 50,
				'plus-dodge': 15,
			},
		},
		'mantra-of-evasion~c': {
			name: 'Mantra of Evasion - Hard Target',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also increases Armor by 20%.',
			effect: {
				'cost-spirit': 50,
				'plus-dodge': 15,
				'plus-armor': 20,
			},
		},
		'mantra-of-evasion~d': {
			name: 'Mantra of Evasion - Wind through the Reeds',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also increases movement speed by 5%.',
			effect: {
				'cost-spirit': 50,
				'plus-dodge': 15,
			},
		},
		'mantra-of-evasion~e': {
			name: 'Mantra of Evasion - Divine Protection',
			desc: 'Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When you or an ally under the effect of Mantra of Evasion is reduced below 25% Life, a shield of protection forms around that target, reducing damage taken by 80% for 3 seconds.   Each target can be protected at most once every 90 seconds by this effect.',
			effect: {
				'cost-spirit': 50,
				'plus-dodge': 15,
			},
		},
		'sweeping-wind': {
			name: 'Sweeping Wind',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			effect: {
				'cost-spirit': 75,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 15,
					},
				},
			},
		},
		'sweeping-wind~a': {
			name: 'Sweeping Wind - Blade Storm',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Intensify the vortex, increasing the damage per stack to 20% weapon damage. This increases the damage with 3 stacks to 60% weapon damage.',
			effect: {
				'cost-spirit': 75,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 20,
					},
				},
			},
		},
		'sweeping-wind~b': {
			name: 'Sweeping Wind - Fire Storm',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Increases the radius of the vortex to 14 yards and changes the damage dealt to Fire.',
			effect: {
				'cost-spirit': 75,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 15,
					},
				},
			},
		},
		'sweeping-wind~c': {
			name: 'Sweeping Wind - Cyclone',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'While your vortex is at the maximum stack count, Critical Hits have a chance to spawn a lightning tornado that periodically electrocutes nearby enemies for 20% weapon damage as Lightning. Each spawned lightning tornado lasts 3 seconds.',
			effect: {
				'cost-spirit': 75,
				'weapon-damage': 20,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 15,
					},
				},
			},
		},
		'sweeping-wind~d': {
			name: 'Sweeping Wind - Inner Storm',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'As long as your vortex is at the maximum stack count, you gain 3 Spirit per second.',
			effect: {
				'cost-spirit': 75,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 15,
					},
				},
			},
		},
		'sweeping-wind~e': {
			name: 'Sweeping Wind - Master of Wind',
			desc: 'Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Increases the duration of the vortex to 20 seconds.',
			effect: {
				'cost-spirit': 75,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 15,
					},
				},
			},
		},
		'mantra-of-retribution': {
			name: 'Mantra of Retribution',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-retribution~a': {
			name: 'Mantra of Retribution - Retaliation',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the amount of damage reflected by the Mantra to 60%. The Mantra will now reflect ranged damage as well as melee damage.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-retribution~b': {
			name: 'Mantra of Retribution - Transgression',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases attack speed for you and your allies by 8%.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-retribution~c': {
			name: 'Mantra of Retribution - Indignation',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When taking damage from the Mantra of Retribution, enemies have a 10% chance to be stunned for 2 seconds.',
			effect: {
				'cost-spirit': 50,
				'chance-stun': 10,
			},
		},
		'mantra-of-retribution~d': {
			name: 'Mantra of Retribution - Against All Odds',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When reflecting damage done to you, Mantra of Retribution has a chance to restore 3 Spirit.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-retribution~e': {
			name: 'Mantra of Retribution - Collateral Damage',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'An attacker that is damaged by Mantra of Retribution has a 30% chance to suffer a feedback blast, dealing 45% weapon damage as Holy to itself and nearby enemies.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'inner-sanctuary': {
			name: 'Inner Sanctuary',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'inner-sanctuary~a': {
			name: 'Inner Sanctuary - Forbidden Palace',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary deal 10% additional damage.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'inner-sanctuary~b': {
			name: 'Inner Sanctuary - Consecration',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'Increases the duration of Inner Sanctuary to 7 seconds.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'inner-sanctuary~c': {
			name: 'Inner Sanctuary - Circle of Protection',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary take 35% less damage.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'inner-sanctuary~d': {
			name: 'Inner Sanctuary - Safe Haven',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary regenerate 1550.49 Life per second.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'inner-sanctuary~e': {
			name: 'Inner Sanctuary - Sanctified Ground',
			desc: 'Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'When Inner Sanctuary expires, it becomes sanctified ground for 6 seconds, slowing the movement of all enemies that move through it by 60%.',
			effect: {
				'cost-spirit': 30,
				'cooldown': 20,
			},
		},
		'mystic-ally': {
			name: 'Mystic Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 40,
			},
		},
		'mystic-ally~a': {
			name: 'Mystic Ally - Fire Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of fire. The ally gains the ability to unleash a flaming kick for 80% weapon damage as Fire plus an additional 40% of your weapon damage per second as Fire for 2 seconds to all enemies in a straight line.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 120,
			},
		},
		'mystic-ally~b': {
			name: 'Mystic Ally - Water Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of water. The ally gains the ability to perform a wave attack that deals 120% of your weapon damage as Physical and slows the movement of affected targets by 30% for 2 seconds.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 120,
			},
		},
		'mystic-ally~c': {
			name: 'Mystic Ally - Earth Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of earth. Maximum Life for you and the ally is increased by 10%. The ally also gains the ability to create a wave of earth, dealing 60% of your weapon damage as Physical to a single enemy and forcing that enemy to attack the ally for 3 seconds.',
			effect: {
				'cost-spirit': 25,
				'plus-life': 10,
				'weapon-damage': 60,
			},
		},
		'mystic-ally~d': {
			name: 'Mystic Ally - Air Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of air. Every attack made by the ally has a 2% chance to generate 100 Spirit for you. In addition, the ally is surrounded in a torrent of wind that deals 10% of your weapon damage per second as Physical to all nearby enemies.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 40,
			},
		},
		'mystic-ally~e': {
			name: 'Mystic Ally - Eternal Ally',
			desc: 'Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of life. When the ally dies, it has a 50% chance to be reborn after 5 seconds. In addition, the physical damage of the ally\'s basic attack is increased to 44% of your weapon damage per swing.',
			effect: {
				'cost-spirit': 25,
				'weapon-damage': 40,
			},
		},
		'mantra-of-healing': {
			name: 'Mantra of Healing',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-healing~a': {
			name: 'Mantra of Healing - Sustenance',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the Life regeneration granted by Mantra of Healing to 0 Life per second.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-healing~b': {
			name: 'Mantra of Healing - Boon of Inspiration',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also heals 186.06 Life when hitting an enemy.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-healing~c': {
			name: 'Mantra of Healing - Heavenly Body',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also increases Vitality by 10%.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-healing~d': {
			name: 'Mantra of Healing - Circular Breathing',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also regenerates 3 Spirit per second.',
			effect: {
				'cost-spirit': 50,
			},
		},
		'mantra-of-healing~e': {
			name: 'Mantra of Healing - Time of Need',
			desc: 'Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also increases resistances to all damage types by 20%.',
			effect: {
				'cost-spirit': 50,
				'plus-resist-all': 20
			},
		},
		'mantra-of-conviction': {
			name: 'Mantra of Conviction',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 12,
			},
		},
		'mantra-of-conviction~a': {
			name: 'Mantra of Conviction - Overawe',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the strength of Mantra of Conviction so that enemies take 24% additional damage and 48% for the first 3 seconds.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 24,
			},
		},
		'mantra-of-conviction~b': {
			name: 'Mantra of Conviction - Submission',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Enemies affected by Mantra of Conviction take 12% weapon damage per second as Holy.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 12,
			},
		},
		'mantra-of-conviction~c': {
			name: 'Mantra of Conviction - Dishearten',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Slows the movement of enemies within 20 yards by 30%.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 12,
			},
		},
		'mantra-of-conviction~d': {
			name: 'Mantra of Conviction - Reclamation',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'You and your allies have a 30% chance to be healed for 279.09 - 341.11 Life when using melee attacks on an enemy under the effects of Mantra of Conviction.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 12,
			},
		},
		'mantra-of-conviction~e': {
			name: 'Mantra of Conviction - Intimidation',
			desc: 'Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Enemies affected by Mantra of Conviction deal 10% less damage.',
			effect: {
				'cost-spirit': 50,
				'plus-damage': 12,
			},
		},
	},
	'witch-doctor': {
		'poison-dart': {
			name: 'Poison Dart',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 140,
				'weapon-damage-for': 2,
			},
		},
		'poison-dart~a': {
			name: 'Poison Dart - Flaming Dart',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Ignite the dart so that it deals 180% weapon damage as Fire at once.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 180,
			},
		},
		'poison-dart~b': {
			name: 'Poison Dart - Splinters',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Shoot 3 Poison Darts that deal 60% weapon damage as Poison each.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage-for': 2,
				'weapon-damage': 180,
			},
		},
		'poison-dart~c': {
			name: 'Poison Dart - Numbing Dart',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Toxins in the Poison Dart reduce the target\'s movement speed by 60% for 2 seconds.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 140,
				'weapon-damage-for': 2,
			},
		},
		'poison-dart~d': {
			name: 'Poison Dart - Spined Dart',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Gain 24.5 Mana every time a Poison Dart hits an enemy.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 140,
				'weapon-damage-for': 2,
			},
		},
		'poison-dart~e': {
			name: 'Poison Dart - Snake to the Face',
			desc: 'Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Transform your Poison Dart into a snake that has a 30% chance to Stun the enemy for 1.5 seconds.',
			effect: {
				'cost-mana': 9.8,
				'chance-stun': 30,
				'weapon-damage': 140,
				'weapon-damage-for': 2,
			},
		},
		'grasp-of-the-dead': {
			name: 'Grasp of the Dead',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'grasp-of-the-dead~a': {
			name: 'Grasp of the Dead - Groping Eels',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			rune: 'Increases the damage done to 26% weapon damage as Physical.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'grasp-of-the-dead~b': {
			name: 'Grasp of the Dead - Rain of Corpses',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			rune: 'Corpses fall from the sky, dealing 80% weapon damage as Physical over 8 seconds to nearby enemies.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'grasp-of-the-dead~c': {
			name: 'Grasp of the Dead - Unbreakable Grasp',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			rune: 'Increases the Slow amount to 80%.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'grasp-of-the-dead~d': {
			name: 'Grasp of the Dead - Desperate Grasp',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			rune: 'Reduces the cooldown of Grasp of the Dead to 6 seconds.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'grasp-of-the-dead~e': {
			name: 'Grasp of the Dead - Death Is Life',
			desc: 'Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 320% weapon damage as Physical for 8 seconds.',
			rune: 'Enemies who die while in the area of Grasp of the Dead have a 5% chance to produce a health globe.',
			effect: {
				'cost-mana': 122.5,
				'cooldown': 8,
				'weapon-damage': 320,
				'weapon-damage-for': 8,
			},
		},
		'corpse-spiders': {
			name: 'Corpse Spiders',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			effect: {
				'cost-mana': 4.9,
				'stack': {
					'weapon-damage': {
						'limit': 4,
						'value': 16,
					},
				},
			},
		},
		'corpse-spiders~a': {
			name: 'Corpse Spiders - Blazing Spiders',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon fire spiders that deal 21% weapon damage as Fire.',
			effect: {
				'cost-mana': 4.9,
				'stack': {
					'weapon-damage': {
						'limit': 4,
						'value': 21,
					},
				},
			},
		},
		'corpse-spiders~b': {
			name: 'Corpse Spiders - Spider Queen',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon a spider queen that births spiderlings, dealing 630% weapon damage as Poison over 15 seconds. You may only have one spider queen summoned at a time.',
			effect: {
				'cost-mana': 4.9,
				'weapon-damage': 630,
				'weapon-damage-for': 15
			},
		},
		'corpse-spiders~c': {
			name: 'Corpse Spiders - Leaping Spiders',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon jumping spiders that leap up to 25 yards to reach their target and attack for 19% weapon damage as Physical.',
			effect: {
				'cost-mana': 4.9,
				'stack': {
					'weapon-damage': {
						'limit': 4,
						'value': 19,
					},
				},
			},
		},
		'corpse-spiders~d': {
			name: 'Corpse Spiders - Widowmakers',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon widowmaker spiders that return 3.5 Mana to you per hit.',
			effect: {
				'cost-mana': 4.9,
				'stack': {
					'weapon-damage': {
						'limit': 4,
						'value': 16,
					},
				},
			},
		},
		'corpse-spiders~e': {
			name: 'Corpse Spiders - Medusa Spiders',
			desc: 'Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon paralyzing spiders that have a 25% chance to Slow enemies\' movement by 60% with every attack.',
			effect: {
				'cost-mana': 4.9,
				'stack': {
					'weapon-damage': {
						'limit': 4,
						'value': 16,
					},
				},
			},
		},
		'summon-zombie-dogs': {
			name: 'Summon Zombie Dogs',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
			},
		},
		'summon-zombie-dogs~a': {
			name: 'Summon Zombie Dogs - Burning Dogs',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs burst into flames, burning nearby enemies for 2% of your weapon damage as Fire.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
			},
		},
		'summon-zombie-dogs~b': {
			name: 'Summon Zombie Dogs - Life Link',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs absorb 10% of all damage done to you.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
			},
		},
		'summon-zombie-dogs~c': {
			name: 'Summon Zombie Dogs - Rabid Dogs',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs gain an infectious bite that deals 9% of your weapon damage as Poison over 3 seconds.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
				'weapon-damage-for': 3,
			},
		},
		'summon-zombie-dogs~d': {
			name: 'Summon Zombie Dogs - Final Gift',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs have a 15% chance to leave behind a health globe when they die.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
			},
		},
		'summon-zombie-dogs~e': {
			name: 'Summon Zombie Dogs - Leeching Beasts',
			desc: 'Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs heal 50% of the damage they deal as Life divided evenly between themselves and you.',
			effect: {
				'cost-mana': 49,
				'cooldown': 60,
				'weapon-damage': 9,
			},
		},
		'firebats': {
			name: 'Firebats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 180,
			},
		},
		'firebats~a': {
			name: 'Firebats - Dire Bats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			rune: 'Summon fewer but larger bats that travel up to 40 yards and hit for 220% weapon damage as Fire.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 220,
			},
		},
		'firebats~b': {
			name: 'Firebats - Hungry Bats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			rune: 'Rapidly summon bats that seek out nearby enemies for 350% weapon damage as Fire.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 350,
			},
		},
		'firebats~c': {
			name: 'Firebats - Plague Bats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			rune: 'Diseased bats fly towards the enemy and infect them. Damage is slow at first, but can increase over time to a maximum of 270% weapon damage as Poison.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 270,
			},
		},
		'firebats~d': {
			name: 'Firebats - Vampire Bats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			rune: 'Gain 3% of damage done by the bats as Life.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 150,
			},
		},
		'firebats~e': {
			name: 'Firebats - Cloud of Bats',
			desc: 'Call forth a swarm of fiery bats to burn enemies in front of you for 180% weapon damage as Fire.',
			rune: 'Call forth a swirl of bats that damage nearby enemies for 195% weapon damage as Fire. The damage of the bats increases by 20% every second, up to a maximum of 100%.',
			effect: {
				'cost-mana': 122.5,
				'weapon-damage': 345,
			},
		},
		'horrify': {
			name: 'Horrify',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
			},
		},
		'horrify~a': {
			name: 'Horrify - Frightening Aspect',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Gain 100% additional Armor for 8 seconds after casting Horrify.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
				'plus-armor': 100,
			},
		},
		'horrify~b': {
			name: 'Horrify - Face of Death',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases the radius of Horrify to 24 yards.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
			},
		},
		'horrify~c': {
			name: 'Horrify - Phobia',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases the duration horrified enemies run in Fear to 6 seconds.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
			},
		},
		'horrify~d': {
			name: 'Horrify - Ruthless Terror',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Gain 26.95 Mana for every horrified enemy.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
			},
		},
		'horrify~e': {
			name: 'Horrify - Stalker',
			desc: 'Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases movement speed by 20% for 4 seconds after casting Horrify.',
			effect: {
				'cost-mana': 36.75,
				'cooldown': 16,
			},
		},
		'soul-harvest': {
			name: 'Soul Harvest',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			effect: {
			  'stackable': {
		      'limit': 5,
			    'intelligence': 130,
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
			},
		},
		'soul-harvest~a': {
			name: 'Soul Harvest - Siphon',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Gain 2170.68 Life for every enemy harvested.',
			effect: {
			  'stackable': {
		      'limit': 5,
			    'intelligence': 130,
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
			},
		},
		'soul-harvest~b': {
			name: 'Soul Harvest - Soul to Waste',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Increase the duration of Soul Harvest\'s effect to 60 seconds.',
			effect: {
			  'stackable': {
		      'limit': 5,
			    'intelligence': 130,
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
			},
		},
		'soul-harvest~c': {
			name: 'Soul Harvest - Languish',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Reduces the movement speed of harvested enemies by 80% for 3 seconds.',
			effect: {
			  'stackable': {
		      'limit': 5,
			    'intelligence': 130,
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
			},
		},
		'soul-harvest~d': {
			name: 'Soul Harvest - Swallow Your Soul',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Gain 39.2 Mana for every enemy harvested.',
			effect: {
			  'stackable': {
			    'intelligence': {
			      'value': 130,
			      'limit': 5
			    }
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
			},
		},
		'soul-harvest~e': {
			name: 'Soul Harvest - Vengeful Spirit',
			desc: 'Feed on the life force of up to 5 enemies within 16 yards. Gain 130 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Harvested enemies also take 230% weapon damage as Physical.',
			effect: {
			  'stackable': {
		      'limit': 5,
			    'plus-intelligence-conditional': 130,
			  },
				'cost-mana': 58.8,
				'cooldown': 15,
				'weapon-damage': 230,
			},
		},
		'plague-of-toads': {
			name: 'Plague of Toads',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 130,
			},
		},
		'plague-of-toads~a': {
			name: 'Plague of Toads - Explosive Toads',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Mutate to fire bullfrogs that explode for 169% weapon damage as Fire.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 169,
			},
		},
		'plague-of-toads~b': {
			name: 'Plague of Toads - Rain of Toads',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Cause toads to rain from the sky that deal 130% weapon damage as Poison to enemies in the area over 2 seconds.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 130,
				'weapon-damage-for': 2,
			},
		},
		'plague-of-toads~c': {
			name: 'Plague of Toads - Toad of Hugeness',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Summon a giant toad that swallows enemies whole for up to 5 seconds, digesting for 0% of your weapon damage per second as Physical. Adds a 5 second cooldown to Plague of Toads.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 130,
			},
		},
		'plague-of-toads~d': {
			name: 'Plague of Toads - Toad Affinity',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Removes the Mana cost of Plague of Toads.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 130,
			},
		},
		'plague-of-toads~e': {
			name: 'Plague of Toads - Addling Toads',
			desc: 'Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Mutate to yellow frogs that deal 130% weapon damage as Poison and have a 15% chance to Confuse affected enemies for 4 seconds.',
			effect: {
				'cost-mana': 12,
				'weapon-damage': 130,
			},
		},
		'haunt': {
			name: 'Haunt',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 575,
				'weapon-damage-for': 12,
			},
		},
		'haunt~a': {
			name: 'Haunt - Consuming Spirit',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'The spirit returns 155.05 Life per second.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 575,
				'weapon-damage-for': 12,
			},
		},
		'haunt~b': {
			name: 'Haunt - Lingering Spirit',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'If there are no targets left, the spirit will linger for up to 10 seconds looking for new enemies.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 575,
				'weapon-damage-for': 12,
			},
		},
		'haunt~c': {
			name: 'Haunt - Grasping Spirit',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'Slow the movement of haunted targets by 30%.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 575,
				'weapon-damage-for': 12,
			},
		},
		'haunt~d': {
			name: 'Haunt - Draining Spirit',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'The spirit returns 10.21 Mana per second.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 575,
				'weapon-damage-for': 12,
			},
		},
		'haunt~e': {
			name: 'Haunt - Resentful Spirit',
			desc: 'Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'Summon a vengeful spirit that does 288% weapon damage as Arcane over 2 seconds.',
			effect: {
				'cost-mana': 98,
				'weapon-damage': 288,
				'weapon-damage-for': 2,
			},
		},
		'sacrifice': {
			name: 'Sacrifice',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'sacrifice~a': {
			name: 'Sacrifice - Provoke the Pack',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Each sacrificed Zombie Dog increases your damage by 5% for 30 seconds.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'sacrifice~b': {
			name: 'Sacrifice - For the Master',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Gain 6201.94 Life for each Zombie Dog you sacrifice.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'sacrifice~c': {
			name: 'Sacrifice - Black Blood',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Ichor erupts from the corpses of the Zombie Dogs and Slows enemies by 60% for 8 seconds.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'sacrifice~d': {
			name: 'Sacrifice - Pride',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Regain 294 Mana for each Zombie Dog you sacrifice.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'sacrifice~e': {
			name: 'Sacrifice - Next of Kin',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Each Zombie Dog you sacrifice has a 35% chance to resurrect as a new Zombie Dog.',
			effect: {
				'weapon-damage': 275,
			},
		},
		'zombie-charger': {
			name: 'Zombie Charger',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 205,
			},
		},
		'zombie-charger~a': {
			name: 'Zombie Charger - Zombie Bears',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon zombie bears that stampede towards your target. Each bear deals 236% weapon damage as Poison to enemies in the area.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 236,
			},
		},
		'zombie-charger~b': {
			name: 'Zombie Charger - Wave of Zombies',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon 3 Zombie Chargers that each deal 115% weapon damage as Poison.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 115,
			},
		},
		'zombie-charger~c': {
			name: 'Zombie Charger - Leperous Zombie',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'The Zombie Charger leaves behind a cloud of noxious vapors that deals 240% weapon damage as Poison to enemies caught in it.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 205,
			},
		},
		'zombie-charger~d': {
			name: 'Zombie Charger - Undeath',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'If the Zombie Charger kills any enemies, it will reanimate and charge nearby enemies for 205% weapon damage as Poison. This effect can repeat up to 2 times.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 205,
			},
		},
		'zombie-charger~e': {
			name: 'Zombie Charger - Explosive Beast',
			desc: 'Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon an explosive Zombie Dog that streaks toward your target before exploding, dealing 236% weapon damage as Fire to all enemies within 9 yards.',
			effect: {
				'cost-mana': 139.65,
				'weapon-damage': 236,
			},
		},
		'spirit-walk': {
			name: 'Spirit Walk',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'spirit-walk~a': {
			name: 'Spirit Walk - Severance',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Damage enemies you walk through in spirit form for 450% weapon damage over 2 seconds.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
				'weapon-damage': 450,
				'weapon-damage-for': 2
			},
		},
		'spirit-walk~b': {
			name: 'Spirit Walk - Jaunt',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Increases the duration of Spirit Walk to 3 seconds.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'spirit-walk~c': {
			name: 'Spirit Walk - Umbral Shock',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'When Spirit Walk ends, your physical body erupts for 310% weapon damage as Fire to all enemies within 10 yards.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
				'weapon-damage': 310,
			},
		},
		'spirit-walk~d': {
			name: 'Spirit Walk - Honored Guest',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Gain 15% of your maximum Mana every second while Spirit Walk is active.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'spirit-walk~e': {
			name: 'Spirit Walk - Healing Journey',
			desc: 'Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Gain 7% of your maximum Life every second while Spirit Walk is active.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'spirit-barrage': {
			name: 'Spirit Barrage',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 230,
			},
		},
		'spirit-barrage~a': {
			name: 'Spirit Barrage - Phlebotomize',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			rune: 'Regain 3% of damage dealt with Spirit Barrage as Life.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 230,
			},
		},
		'spirit-barrage~b': {
			name: 'Spirit Barrage - Well of Souls',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			rune: 'An additional 3 spirits seek out other targets and deal 65% weapon damage as Physical.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 230,
			},
		},
		'spirit-barrage~c': {
			name: 'Spirit Barrage - Phantasm',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			rune: 'Summon a spectre that deals 225% weapon damage as Physical over 5 seconds to all enemies within 10 yards.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 225,
				'weapon-damage-for': 5
			},
		},
		'spirit-barrage~d': {
			name: 'Spirit Barrage - The Spirit Is Willing',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			rune: 'Gain 44 Mana every time Spirit Barrage hits.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 190,
			},
		},
		'spirit-barrage~e': {
			name: 'Spirit Barrage - Manitou',
			desc: 'Bombard a target with a spirit blast that deals 230% weapon damage as Physical.',
			rune: 'Summon a spectre that hovers over you, unleashing spirit bolts at nearby enemies for 1667% weapon damage as Physical over 20 seconds.',
			effect: {
				'cost-mana': 107.8,
				'weapon-damage': 1667,
				'weapon-damage-for': 20
			},
		},
		'gargantuan': {
			name: 'Gargantuan',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 100,
			},
		},
		'gargantuan~a': {
			name: 'Gargantuan - Restless Giant',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			rune: 'When the Gargantuan encounters an elite enemy or is near 5 enemies, it enrages for 15 seconds gaining:   20% movement speed   35% attack speed   200% Physical damage  This effect cannot occur more than once every 120 seconds. Elite enemies include champions, rares, bosses, and other players.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 100,
			},
		},
		'gargantuan~b': {
			name: 'Gargantuan - Humongoid',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			rune: 'The Gargantuan gains the Cleave ability, allowing its attacks to hit multiple targets for 130% of your weapon damage as Physical.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 130,
			},
		},
		'gargantuan~c': {
			name: 'Gargantuan - Big Stinker',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			rune: 'The Gargantuan is surrounded by a poison cloud that deals 15% weapon damage as Poison per second to nearby enemies.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 100,
			},
		},
		'gargantuan~d': {
			name: 'Gargantuan - Wrathful Protector',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			rune: 'Summon a more powerful Gargantuan that only lasts for 15 seconds. The Gargantuan\'s fists burn with fire, dealing 55% of your weapon damage as Fire and knocking enemies back.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 110,
			},
		},
		'gargantuan~e': {
			name: 'Gargantuan - Bruiser',
			desc: 'Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 100% of your weapon damage as Physical.',
			rune: 'The Gargantuan gains the ability to periodically slam enemies, dealing 100% of your weapon damage as Physical and stunning them for 3 seconds.',
			effect: {
				'cost-mana': 147,
				'cooldown': 60,
				'weapon-damage': 100,
			},
		},
		'locust-swarm': {
			name: 'Locust Swarm',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			effect: {
				'cost-mana': 196,
				'weapon-damage': 360,
				'weapon-damage-for': 8,
			},
		},
		'locust-swarm~a': {
			name: 'Locust Swarm - Searing Locusts',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Engulf the target with burning locusts that deal 472% weapon damage as Fire over 8 seconds.',
			effect: {
				'cost-mana': 196,
				'weapon-damage-for': 8,
				'weapon-damage': 472,
			},
		},
		'locust-swarm~b': {
			name: 'Locust Swarm - Pestilence',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Locust Swarm has a 100% chance to jump to two additional targets instead of one.',
			effect: {
				'cost-mana': 196,
				'weapon-damage': 360,
				'weapon-damage-for': 8,
			},
		},
		'locust-swarm~c': {
			name: 'Locust Swarm - Cloud of Insects',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Increases the duration of the swarm to 10 seconds.',
			effect: {
				'cost-mana': 196,
				'weapon-damage': 360,
				'weapon-damage-for': 10,
			},
		},
		'locust-swarm~d': {
			name: 'Locust Swarm - Devouring Swarm',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Gain 36.75 Mana for every enemy affected by the swarm.',
			effect: {
				'cost-mana': 196,
				'weapon-damage': 360,
				'weapon-damage-for': 8,
			},
		},
		'locust-swarm~e': {
			name: 'Locust Swarm - Diseased Swarm',
			desc: 'Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Enemies killed by Locust Swarm leave behind a cloud of locusts that deal 25% weapon damage as Poison. This cloud of locusts lingers for 3 seconds.',
			effect: {
				'cost-mana': 196,
				'weapon-damage': 385,
				'weapon-damage-for': 8,
			},
		},
		'firebomb': {
			name: 'Firebomb',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 110,
			},
		},
		'firebomb~a': {
			name: 'Firebomb - Ghost Bomb',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'In addition to the base explosion, the skull creates a larger blast that deals an additional 20% weapon damage as Fire to all enemies within 28 yards.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 130,
			},
		},
		'firebomb~b': {
			name: 'Firebomb - Roll the Bones',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Allows the skull to bounce up to 2 times.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 110,
			},
		},
		'firebomb~c': {
			name: 'Firebomb - Fire Pit',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'The explosion creates a pool of fire that deals 36% weapon damage per second as Fire for 3 seconds.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 110,
			},
		},
		'firebomb~d': {
			name: 'Firebomb - Pyrogeist',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Create a column of flame that spews fire at the closest enemy for 640% weapon damage as Fire over 6 seconds.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 640,
				'weapon-damage-for': 6,
			},
		},
		'firebomb~e': {
			name: 'Firebomb - Flash Fire',
			desc: 'Lob an explosive skull that deals 110% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Rather than exploding for area damage, each Firebomb can bounce to up to 6 additional targets. Damage is reduced by 15% per bounce.',
			effect: {
				'cost-mana': 9.8,
				'weapon-damage': 110,
			},
		},
		'hex': {
			name: 'Hex',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'hex~a': {
			name: 'Hex - Painful Transformation',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hex causes the target to Bleed for 12% weapon damage as Physical.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
				'weapon-damage': 12,
			},
		},
		'hex~b': {
			name: 'Hex - Angry Chicken',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Transform into an angry chicken for up to 5 seconds that can explode for 215% weapon damage as Physical to all enemies within 12 yards.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
				'weapon-damage': 215,
			},
		},
		'hex~c': {
			name: 'Hex - Unstable Form',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hexed targets explode when killed, dealing 135% weapon damage as Poison to all enemies within 8 yards.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'hex~d': {
			name: 'Hex - Hedge Magic',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'The Fetish Shaman will periodically heal allies for 1860.58 Life.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'hex~e': {
			name: 'Hex - Jinx',
			desc: 'Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hexed targets take 20% additional damage.',
			effect: {
				'cost-mana': 49,
				'cooldown': 15,
			},
		},
		'acid-cloud': {
			name: 'Acid Cloud',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 265,
				'weapon-damage-for': 3,
			},
		},
		'acid-cloud~a': {
			name: 'Acid Cloud - Corpse Bomb',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Raise a corpse from the ground that explodes for 230% weapon damage as Poison to enemies in the area.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 230,
			},
		},
		'acid-cloud~b': {
			name: 'Acid Cloud - Acid Rain',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Increases the initial area of effect of Acid Cloud to 24 yards.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 265,
				'weapon-damage-for': 3,
			},
		},
		'acid-cloud~c': {
			name: 'Acid Cloud - Lob Blob Bomb',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'The acid on the ground forms into a slime that irradiates nearby enemies for 50% weapon damage as Poison. The slime dissipates after 5 seconds.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 200,
				'weapon-damage-for': 5,
			},
		},
		'acid-cloud~d': {
			name: 'Acid Cloud - Slow Burn',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Increases the duration of the acid pools left behind to deal 300% weapon damage as Poison over 6 seconds.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 415,
				'weapon-damage-for': 6,
			},
		},
		'acid-cloud~e': {
			name: 'Acid Cloud - Kiss of Death',
			desc: 'Cause acid to rain down, dealing an initial 115% weapon damage as Poison, followed by 150% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Spit a cloud of acid that inflicts 126% weapon damage as Poison, followed by 165% weapon damage as Poison to enemies who remain in the area.',
			effect: {
				'cost-mana': 171.5,
				'weapon-damage': 291,
				'weapon-damage-for': 3,
			},
		},
		'mass-confusion': {
			name: 'Mass Confusion',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'mass-confusion~a': {
			name: 'Mass Confusion - Paranoia',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'All enemies in the area of Mass Confusion take 20% additional damage for 12 seconds.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'mass-confusion~b': {
			name: 'Mass Confusion - Mass Hysteria',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Up to 6 enemies who aren\'t Confused are Stunned for 3 seconds.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'mass-confusion~c': {
			name: 'Mass Confusion - Mass Hallucination',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Amid the confusion, a giant spirit rampages through enemies, dealing 22% weapon damage per second as Physical to enemies it passes through.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'mass-confusion~d': {
			name: 'Mass Confusion - Unstable Realm',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Reduces the cooldown of Mass Confusion to 45 seconds.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'mass-confusion~e': {
			name: 'Mass Confusion - Devolution',
			desc: 'Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Enemies killed while Confused have a 50% chance of spawning a Zombie Dog.',
			effect: {
				'cost-mana': 73.5,
				'cooldown': 60,
			},
		},
		'big-bad-voodoo': {
			name: 'Big Bad Voodoo',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			effect: {
				'cooldown': 120,
				'plus-attack-speed': 20,
			},
		},
		'big-bad-voodoo~a': {
			name: 'Big Bad Voodoo - Slam Dance',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The Fetish increases the damage of all nearby allies by 30%.',
			effect: {
				'cooldown': 120,
				'plus-damage': 30,
				'plus-attack-speed': 20,
			},
		},
		'big-bad-voodoo~b': {
			name: 'Big Bad Voodoo - Jungle Drums',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'Increases the duration of the ritual to 30 seconds.',
			effect: {
				'cooldown': 120,
				'plus-attack-speed': 20,
			},
		},
		'big-bad-voodoo~c': {
			name: 'Big Bad Voodoo - Ghost Trance',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The ritual heals all nearby allies for 5% of their maximum Life per second.',
			effect: {
				'cooldown': 120,
				'plus-attack-speed': 20,
			},
		},
		'big-bad-voodoo~d': {
			name: 'Big Bad Voodoo - Rain Dance',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The ritual restores 122.5 Mana per second while standing in the ritual area.',
			effect: {
				'cooldown': 120,
				'plus-attack-speed': 20,
			},
		},
		'big-bad-voodoo~e': {
			name: 'Big Bad Voodoo - Boogie Man',
			desc: 'Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'Enemies who die in the ritual area have a 50% chance to resurrect as a Zombie Dog.',
			effect: {
				'cooldown': 120,
				'plus-attack-speed': 20,
			},
		},
		'wall-of-zombies': {
			name: 'Wall of Zombies',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'wall-of-zombies~a': {
			name: 'Wall of Zombies - Creepers',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			rune: 'Up to 3.3333333333333 zombies will emerge from the ground and attack nearby enemies for 25% of your weapon damage as Physical per attack.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'wall-of-zombies~b': {
			name: 'Wall of Zombies - Barricade',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			rune: 'Increases the width of the Wall of Zombies.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'wall-of-zombies~c': {
			name: 'Wall of Zombies - Dead Rush',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			rune: 'Zombies crawl out of the ground and run in all directions, dealing 445% weapon damage as Physical to nearby enemies.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'wall-of-zombies~d': {
			name: 'Wall of Zombies - Unrelenting Grip',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			rune: 'Your Wall of Zombies will Slow the movement of enemies by 60% for 5 seconds.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'wall-of-zombies~e': {
			name: 'Wall of Zombies - Pile On',
			desc: 'Raise a line of zombies from the ground that attacks nearby enemies for 800% weapon damage as Physical over 5 seconds.',
			rune: 'Summon a tower of zombies that falls over, dealing 765% weapon damage as Physical to any enemies it hits and knocks them back.',
			effect: {
				'cost-mana': 102.9,
				'cooldown': 25,
				'weapon-damage': 800,
				'weapon-damage-for': 5,
			},
		},
		'fetish-army': {
			name: 'Fetish Army',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
		'fetish-army~a': {
			name: 'Fetish Army - Fetish Ambush',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Each Fetish deals 250% weapon damage as Physical to any nearby enemy as it is summoned.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
		'fetish-army~b': {
			name: 'Fetish Army - Legion of Daggers',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Increases number of dagger-wielding Fetishes summoned by 3.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
		'fetish-army~c': {
			name: 'Fetish Army - Tiki Torchers',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Summon an additional 2 Fetish casters who breathe fire in a cone in front of them that deals 15% of your weapon damage as Fire.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
		'fetish-army~d': {
			name: 'Fetish Army - Devoted Following',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Decreases the cooldown of Fetish Army to 120 seconds.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
		'fetish-army~e': {
			name: 'Fetish Army - Head Hunters',
			desc: 'Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Summon an additional 2 Hunter Fetishes that shoot blowdarts at enemies, dealing 20% of your weapon damage as Poison.',
			effect: {
				'cooldown': 120,
				'weapon-damage': 20,
			},
		},
	},
	'wizard': {
		'magic-missile': {
			name: 'Magic Missile',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			effect: {
				'weapon-damage': 110,
			},
		},
		'magic-missile~a': {
			name: 'Magic Missile - Charged Blast',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Increases the damage of Magic Missile to 143% weapon damage as Arcane.',
			effect: {
				'weapon-damage': 143,
			},
		},
		'magic-missile~b': {
			name: 'Magic Missile - Split',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Fire 3 missiles that each deal 50% weapon damage as Arcane.',
			effect: {
				'weapon-damage': 150,
			},
		},
		'magic-missile~c': {
			name: 'Magic Missile - Penetrating Blast',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Missiles have a 70% chance to pierce through their target and hit additional enemies.',
			effect: {
				'weapon-damage': 110,
			},
		},
		'magic-missile~d': {
			name: 'Magic Missile - Attunement',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Whenever Magic Missile hits a target you gain 4 Arcane Power.',
			effect: {
				'weapon-damage': 110,
			},
		},
		'magic-missile~e': {
			name: 'Magic Missile - Seeker',
			desc: 'Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Missiles track the nearest enemy and their damage is increased to 121% weapon damage as Arcane.',
			effect: {
				'weapon-damage': 121,
			},
		},
		'ray-of-frost': {
			name: 'Ray of Frost',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 215,
			},
		},
		'ray-of-frost~a': {
			name: 'Ray of Frost - Snow Blast',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Using continuously on a single target increases damage over 1.5 seconds to inflict a maximum of 280% weapon damage as Cold.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 280,
			},
		},
		'ray-of-frost~b': {
			name: 'Ray of Frost - Sleet Storm',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Create a swirling storm around you, dealing 215% weapon damage as Cold to all enemies caught within it.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 215,
			},
		},
		'ray-of-frost~c': {
			name: 'Ray of Frost - Numb',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Increase the amount the target\'s movement is slowed to 60% for 3 seconds.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 215,
			},
		},
		'ray-of-frost~d': {
			name: 'Ray of Frost - Cold Blood',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Reduce casting cost to 0 Arcane Power.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 215,
			},
		},
		'ray-of-frost~e': {
			name: 'Ray of Frost - Black Ice',
			desc: 'Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Enemies killed with Ray of Frost leave behind a patch of ice that deals 195% weapon damage as Cold to enemies moving through it over 3 seconds.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 410,
			},
		},
		'shock-pulse': {
			name: 'Shock Pulse',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			effect: {
				'weapon-damage': 105,
			},
		},
		'shock-pulse~a': {
			name: 'Shock Pulse - Fire Bolts',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Cast bolts of fire that each deal 152% weapon damage as Fire.',
			effect: {
				'weapon-damage': 152,
			},
		},
		'shock-pulse~b': {
			name: 'Shock Pulse - Living Lightning',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Conjure a being of lightning that drifts forward, electrocuting nearby enemies for 37% weapon damage as Lightning.',
			effect: {
				'weapon-damage': 37,
			},
		},
		'shock-pulse~c': {
			name: 'Shock Pulse - Piercing Orb',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Merge the bolts in a single giant orb that oscillates forward dealing 105% weapon damage as Lightning to everything it hits.',
			effect: {
				'weapon-damage': 105,
			},
		},
		'shock-pulse~d': {
			name: 'Shock Pulse - Lightning Affinity',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Every target hit by a pulse restores 3 Arcane Power.',
			effect: {
				'weapon-damage': 105,
			},
		},
		'shock-pulse~e': {
			name: 'Shock Pulse - Explosive Bolts',
			desc: 'Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Slain enemies explode, dealing 70% weapon damage as Lightning to every enemy within 10 yards.',
			effect: {
				'weapon-damage': 105,
			},
		},
		'frost-nova': {
			name: 'Frost Nova',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			effect: {
				'cooldown': 12,
			},
		},
		'frost-nova~a': {
			name: 'Frost Nova - Bone Chill',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Enemies take 15% more damage while frozen or chilled by Frost Nova.',
			effect: {
				'cooldown': 12,
				'plus-damage': 15,
			},
		},
		'frost-nova~b': {
			name: 'Frost Nova - Shatter',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'A frozen enemy that is killed has a 50% chance of releasing another Frost Nova.',
			effect: {
				'cooldown': 12,
			},
		},
		'frost-nova~c': {
			name: 'Frost Nova - Frozen Mist',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Frost Nova no longer freezes enemies, but instead leaves behind a mist of frost that deals 160% weapon damage as Cold over 8 seconds.',
			effect: {
				'cooldown': 12,
				'weapon-damage': 160,
				'weapon-damage-for': 16,
			},
		},
		'frost-nova~d': {
			name: 'Frost Nova - Cold Snap',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Reduce cooldown of Frost Nova to 12 seconds.',
			effect: {
				'cooldown': 12,
			},
		},
		'frost-nova~e': {
			name: 'Frost Nova - Deep Freeze',
			desc: 'Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'If Frost Nova hits at least 5 targets, you gain a 15% bonus to Critical Hit Chance for 12 seconds.',
			effect: {
				'cooldown': 12,
				'plus-crit-hit': 15,
			},
		},
		'arcane-orb': {
			name: 'Arcane Orb',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 175,
			},
		},
		'arcane-orb~a': {
			name: 'Arcane Orb - Obliteration',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Increase the damage of the explosion to deal 228% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 228,
			},
		},
		'arcane-orb~b': {
			name: 'Arcane Orb - Arcane Nova',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Modify the orb to deal 175% weapon damage as Arcane to all enemies within 20 yards.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 175,
			},
		},
		'arcane-orb~c': {
			name: 'Arcane Orb - Arcane Orbit',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Create 4 Arcane Orbs that orbit you, exploding for 70% weapon damage as Arcane when enemies get close.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 70,
			},
		},
		'arcane-orb~d': {
			name: 'Arcane Orb - Tap the Source',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Reduce casting cost to 20 Arcane Power.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 175,
			},
		},
		'arcane-orb~e': {
			name: 'Arcane Orb - Celestial Orb',
			desc: 'Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'The orb will pierce through targets, damaging any enemy it passes through.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 175,
			},
		},
		'diamond-skin': {
			name: 'Diamond Skin',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			effect: {
				'cooldown': 15,
			},
		},
		'diamond-skin~a': {
			name: 'Diamond Skin - Mirror Skin',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Reflects 100% of damage absorbed back at the attacker.',
			effect: {
				'cooldown': 15,
			},
		},
		'diamond-skin~b': {
			name: 'Diamond Skin - Enduring Skin',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Increases the duration of Diamond Skin to 9 seconds.',
			effect: {
				'cooldown': 15,
			},
		},
		'diamond-skin~c': {
			name: 'Diamond Skin - Crystal Shell',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Increases the maximum amount of damage absorbed to 21706.79 damage.',
			effect: {
				'cooldown': 15,
			},
		},
		'diamond-skin~d': {
			name: 'Diamond Skin - Prism',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Reduces Arcane Power cost of all spells by 7 while Diamond Skin is active.',
			effect: {
				'cooldown': 15,
			},
		},
		'diamond-skin~e': {
			name: 'Diamond Skin - Diamond Shards',
			desc: 'Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'When Diamond Skin wears off, diamond shards explode in all directions dealing 210% weapon damage as Physical to nearby enemies.',
			effect: {
				'cooldown': 15,
				'weapon-damage': 155,
			},
		},
		'wave-of-force': {
			name: 'Wave of Force',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 200,
			},
		},
		'wave-of-force~a': {
			name: 'Wave of Force - Forceful Wave',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Increases damage to 260% weapon damage as Physical, but reduces Knockback.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 260,
			},
		},
		'wave-of-force~b': {
			name: 'Wave of Force - Exploding Wave',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Enemies hit have a 40% chance to cause a smaller Wave of Force that deals 100% weapon damage as Physical and knocks back enemies caught in its wake.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 300,
			},
		},
		'wave-of-force~c': {
			name: 'Wave of Force - Teleporting Wave',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Enemies caught in the Wave of Force have a 100% chance to be randomly teleported.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 200,
			},
		},
		'wave-of-force~d': {
			name: 'Wave of Force - Force Affinity',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Reduce casting cost to 0 Arcane Power and the cooldown is reduced to 12 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 200,
			},
		},
		'wave-of-force~e': {
			name: 'Wave of Force - Impactful Wave',
			desc: 'Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Increases the distance enemies are knocked back and Stuns all affected enemies for 2 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 15,
				'weapon-damage': 200,
			},
		},
		'spectral-blade': {
			name: 'Spectral Blade',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			effect: {
				'weapon-damage': 135,
			},
		},
		'spectral-blade~a': {
			name: 'Spectral Blade - Deep Cuts',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Enemies hit by the blade will Bleed for an additional 35% weapon damage over 3 seconds.',
			effect: {
				'weapon-damage': 170,
			},
		},
		'spectral-blade~b': {
			name: 'Spectral Blade - Thrown Blade',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Extends the reach of Spectral Blade to 20 yards.',
			effect: {
				'weapon-damage': 135,
			},
		},
		'spectral-blade~c': {
			name: 'Spectral Blade - Impactful Blades',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Hits have a 5% chance to cause Knockback and Slow the movement of enemies by 60% for 1 second.',
			effect: {
				'weapon-damage': 135,
			},
		},
		'spectral-blade~d': {
			name: 'Spectral Blade - Siphoning Blade',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Every enemy hit grants 3 Arcane Power.',
			effect: {
				'weapon-damage': 135,
			},
		},
		'spectral-blade~e': {
			name: 'Spectral Blade - Healing Blades',
			desc: 'Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Whenever the blades do critical damage, you are healed for 8% of the damage done.',
			effect: {
				'weapon-damage': 135,
			},
		},
		'arcane-torrent': {
			name: 'Arcane Torrent',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 210,
			},
		},
		'arcane-torrent~a': {
			name: 'Arcane Torrent - Disruption',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Targets hit by Arcane Torrent become disrupted for 6 seconds, causing them to take 15% additional damage from any attacks that deal Arcane damage.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 210,
			},
		},
		'arcane-torrent~b': {
			name: 'Arcane Torrent - Cascade',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Enemies killed by Arcane Torrent have a 100% chance to fire a new missile at a nearby enemy dealing 210% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 210,
			},
		},
		'arcane-torrent~c': {
			name: 'Arcane Torrent - Arcane Mines',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Instead of firing projectiles, lay Arcane mines that arm after 2 seconds. These mines explode when an enemy approaches, dealing 180% weapon damage as Arcane. Enemies caught in the explosion have their movement and attack speeds reduced by 30% for 3 seconds.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 180,
			},
		},
		'arcane-torrent~d': {
			name: 'Arcane Torrent - Power Stone',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Every missile hit has a 2% chance to leave behind a Power Stone that grants Arcane Power when picked up.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 210,
			},
		},
		'arcane-torrent~e': {
			name: 'Arcane Torrent - Death Blossom',
			desc: 'Hurl a barrage of arcane projectiles that deal 210% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Unleash a torrent of power beyond your control. You no longer direct where the projectiles go, but their damage is increased to 670% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 16,
				'weapon-damage': 670,
			},
		},
		'energy-twister': {
			name: 'Energy Twister',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 360,
				'weapon-damage-for': 6,
			},
		},
		'energy-twister~a': {
			name: 'Energy Twister - Gale Force',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Increases the damage of Energy Twister to 468% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 468,
				'weapon-damage-for': 6,
			},
		},
		'energy-twister~b': {
			name: 'Energy Twister - Raging Storm',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'When two Energy Twisters collide, they merge into a tornado with increased area of effect that causes 360% weapon damage as Arcane over 6 seconds.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 360,
				'weapon-damage-for': 6,
			},
		},
		'energy-twister~c': {
			name: 'Energy Twister - Storm Chaser',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Casting Energy Twister grants you a Wind Charge. You can store up to 3 Wind Charges at a time. Casting a Signature spell releases all Wind Charges as a giant Energy Twister that deals 75% weapon damage as Arcane per Wind Charge.  The following skills are Signature spells:  Magic Missile  Shock Pulse  Spectral Blade  Electrocute',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 435,
				'weapon-damage-for': 6,
			},
		},
		'energy-twister~d': {
			name: 'Energy Twister - Mistral Breeze',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Reduces casting cost of Energy Twister to 20 Arcane Power.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 360,
				'weapon-damage-for': 6,
			},
		},
		'energy-twister~e': {
			name: 'Energy Twister - Wicked Wind',
			desc: 'Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Twisters no longer travel but spin in place, dealing 252% weapon damage as Arcane over 6 seconds to everything caught in them.',
			effect: {
				'cost-arcane-power': 35,
				'weapon-damage': 252,
				'weapon-damage-for': 6,
			},
		},
		'ice-armor': {
			name: 'Ice Armor',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			effect: {
				'cost-arcane-power': 25,
			},
		},
		'ice-armor~a': {
			name: 'Ice Armor - Jagged Ice',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Melee attackers also take 130% weapon damage as Cold.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 130,
			},
		},
		'ice-armor~b': {
			name: 'Ice Armor - Chilling Aura',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Lower the temperature of the air around you. Nearby enemies are chilled, slowing their movement speed by 30%.',
			effect: {
				'cost-arcane-power': 25,
			},
		},
		'ice-armor~c': {
			name: 'Ice Armor - Frozen Storm',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'A whirling storm of ice builds around you that deals 30% weapon damage as Cold over 3 seconds after casting Ice Armor.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 30,
				'weapon-damage-for': 3,
			},
		},
		'ice-armor~d': {
			name: 'Ice Armor - Crystallize',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Whenever you are struck by a melee attack, your Armor is increased by 30% for 30 seconds. This effect can stack up to 3 times.',
			effect: {
				'cost-arcane-power': 25,
				'stackable': {
				  'limit': 3,
					'plus-armor': 30,
				},
			},
		},
		'ice-armor~e': {
			name: 'Ice Armor - Ice Reflect',
			desc: 'Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Melee attacks have a 25% chance to create a Frost Nova centered on the attacker, dealing 75% weapon damage as Cold.',
			effect: {
				'cost-arcane-power': 25,
			},
		},
		'electrocute': {
			name: 'Electrocute',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			effect: {
				'weapon-damage': 90,
			},
		},
		'electrocute~a': {
			name: 'Electrocute - Lightning Blast',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Create streaks of lightning that pierce through targets, hitting all enemies for 86% weapon damage as Lightning.',
			effect: {
				'weapon-damage': 86,
			},
		},
		'electrocute~b': {
			name: 'Electrocute - Chain Lightning',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Increases the maximum number of enemies that can be electrocuted to 6.',
			effect: {
				'weapon-damage': 90,
			},
		},
		'electrocute~c': {
			name: 'Electrocute - Arc Lightning',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Blast a cone of lightning that causes 115% weapon damage as Lightning to all affected targets.',
			effect: {
				'weapon-damage': 115,
			},
		},
		'electrocute~d': {
			name: 'Electrocute - Surge of Power',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Gain 1 Arcane Power for every enemy hit by Electrocute.',
			effect: {
				'weapon-damage': 90,
			},
		},
		'electrocute~e': {
			name: 'Electrocute - Forked Lightning',
			desc: 'Lightning arcs from your fingertips, dealing 90% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Critical Hits release 4 charged bolts in random directions, dealing 55% weapon damage as Lightning to any targets hit.',
			effect: {
				'weapon-damage': 90,
			},
		},
		'slow-time': {
			name: 'Slow Time',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			effect: {
				'cooldown': 20,
			},
		},
		'slow-time~a': {
			name: 'Slow Time - Time Warp',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Enemies caught in the bubble of warped time take 20% more damage.',
			effect: {
				'cooldown': 20,
				'plus-damage': 20,
			},
		},
		'slow-time~b': {
			name: 'Slow Time - Miasma',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Slow Time effects cling to enemies for 3 seconds after they have left the bubble.',
			effect: {
				'cooldown': 20,
			},
		},
		'slow-time~c': {
			name: 'Slow Time - Time Shell',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Reduces the area Slow Time affects to 10 yards, but increases the potency of the movement speed reduction to 80%.',
			effect: {
				'cooldown': 20,
			},
		},
		'slow-time~d': {
			name: 'Slow Time - Perpetuity',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Reduces the cooldown of Slow Time to 16 seconds.',
			effect: {
				'cooldown': 20,
			},
		},
		'slow-time~e': {
			name: 'Slow Time - Stretch Time',
			desc: 'Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Time is sped up for any allies standing in the area, increasing their attack speed by 10%.',
			effect: {
				'cooldown': 20,
				'plus-attack-speed': 10,
			},
		},
		'storm-armor': {
			name: 'Storm Armor',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 70,
			},
		},
		'storm-armor~a': {
			name: 'Storm Armor - Strike Back',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increase the damage of the shock to 91% weapon damage as Lightning.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 91,
			},
		},
		'storm-armor~b': {
			name: 'Storm Armor - Scramble',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases your movement speed by 25% for 3 seconds whenever you are hit by melee or ranged attacks.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 70,
			},
		},
		'storm-armor~c': {
			name: 'Storm Armor - Reactive Armor',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Whenever you are hit, you have a chance to be enveloped with a lightning shield for 6 seconds that shocks nearby enemies for 50% weapon damage as Lightning.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 120,
			},
		},
		'storm-armor~d': {
			name: 'Storm Armor - Power of the Storm',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Reduce the Arcane Power cost of all skills by 3 while Storm Armor is active.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 70,
			},
		},
		'storm-armor~e': {
			name: 'Storm Armor - Shocking Aspect',
			desc: 'Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Critical Hits have a chance to electrocute a nearby enemy for 35% weapon damage as Lightning.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage': 105,
			},
		},
		'explosive-blast': {
			name: 'Explosive Blast',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 225,
			},
		},
		'explosive-blast~a': {
			name: 'Explosive Blast - Short Fuse',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Immediately release the energy of Explosive Blast for 225% weapon damage as Physical.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 450,
			},
		},
		'explosive-blast~b': {
			name: 'Explosive Blast - Obliterate',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Increases the explosion radius to 18 yards for 225% weapon damage as Physical.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 450,
			},
		},
		'explosive-blast~c': {
			name: 'Explosive Blast - Time Bomb',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Explosive Blast detonates from the point it was originally cast after 2.5 seconds for 315% weapon damage as Physical.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 315,
			},
		},
		'explosive-blast~d': {
			name: 'Explosive Blast - Unleashed',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Reduces the casting cost of Explosive Blast to 10 Arcane Power.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 225,
			},
		},
		'explosive-blast~e': {
			name: 'Explosive Blast - Chain Reaction',
			desc: 'Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'A chain of 3 consecutive explosions cascade off you, each causing 97% weapon damage as Physical.',
			effect: {
				'cost-arcane-power': 20,
				'cooldown': 6,
				'weapon-damage': 322,
				'weapon-damage-for': 3,
			},
		},
		'magic-weapon': {
			name: 'Magic Weapon',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			effect: {
				'cost-arcane-power': 25,
				'plus-damage': 10,
			},
		},
		'magic-weapon~a': {
			name: 'Magic Weapon - Venom',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			rune: 'Attacks poison enemies, dealing 15% weapon damage as Poison over 3 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'weapon-damage-for': 3,
				'weapon-damage': 15,
			},
		},
		'magic-weapon~b': {
			name: 'Magic Weapon - Electrify',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			rune: 'Attacks have a chance to cause lightning to arc to 3 nearby enemies, dealing 10% weapon damage as Lightning.',
			effect: {
				'cost-arcane-power': 25,
				'stack': {
					'weapon-damage': {
						'limit': 3,
						'value': 10,
					},
				},
			},
		},
		'magic-weapon~c': {
			name: 'Magic Weapon - Force Weapon',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			rune: 'Increases the damage bonus of Magic Weapon to 15% damage, and gives up to a 2% chance to Knockback any enemies hit.',
			effect: {
				'cost-arcane-power': 25,
				'plus-damage': 15,
			},
		},
		'magic-weapon~d': {
			name: 'Magic Weapon - Conduit',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			rune: 'Attacks have a chance to restore 1 Arcane Power.',
			effect: {
				'cost-arcane-power': 25,
				'plus-damage': 10,
			},
		},
		'magic-weapon~e': {
			name: 'Magic Weapon - Blood Magic',
			desc: 'Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 minutes',
			rune: 'Attacks recover 2% of damage caused as Life.',
			effect: {
				'cost-arcane-power': 25,
				'plus-damage': 10,
			},
		},
		'hydra': {
			name: 'Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 28,
			},
		},
		'hydra~a': {
			name: 'Hydra - Frost Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Frost Hydra that breathes a short range cone of frost, causing 36% weapon damage as Cold to all enemies in the cone.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 36,
			},
		},
		'hydra~b': {
			name: 'Hydra - Lightning Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Lightning Hydra that electrocutes enemies for 64% weapon damage as Lightning.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 64,
			},
		},
		'hydra~c': {
			name: 'Hydra - Venom Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a poison breathing Hydra that leaves a pool of acid that causes 18% weapon damage per second as Poison to enemies who remain in the pool.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 18,
			},
		},
		'hydra~d': {
			name: 'Hydra - Mammoth Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Mammoth Hydra that breathes a river of flame at nearby enemies, dealing 67% weapon damage per second as Fire to enemies caught on the burning ground.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 67,
			},
		},
		'hydra~e': {
			name: 'Hydra - Arcane Hydra',
			desc: 'Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon an Arcane Hydra that spits Arcane Orbs, which explode on impact, causing 60% weapon damage as Arcane to enemies near the explosion.',
			effect: {
				'cost-arcane-power': 15,
				'weapon-damage': 60,
			},
		},
		'disintegrate': {
			name: 'Disintegrate',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 155,
			},
		},
		'disintegrate~a': {
			name: 'Disintegrate - Intensify',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Damage increases slowly over time to inflict a maximum of 201.5% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 201.5,
			},
		},
		'disintegrate~b': {
			name: 'Disintegrate - Convergence',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Increase the width of the beam allowing it to hit more enemies.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 155,
			},
		},
		'disintegrate~c': {
			name: 'Disintegrate - Entropy',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'The beam fractures into a short-ranged cone that deals 178.25% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 178.25,
			},
		},
		'disintegrate~d': {
			name: 'Disintegrate - Chaos Nexus',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'When casting the beam you become charged with energy that spits out at nearby enemies doing 40% weapon damage as Arcane.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 155,
			},
		},
		'disintegrate~e': {
			name: 'Disintegrate - Volatility',
			desc: 'Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Enemies killed by the beam have a 35% chance to explode causing 395% weapon damage as Arcane to all enemies within 8 yards.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 155,
			},
		},
		'familiar': {
			name: 'Familiar',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
			},
		},
		'familiar~a': {
			name: 'Familiar - Sparkflint',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			rune: 'Summon a fiery Familiar that increases the damage of all attacks by 12% while Familiar is active.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
				'plus-damage': 12,
			},
		},
		'familiar~b': {
			name: 'Familiar - Cannoneer',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			rune: 'The Familiar\'s projectiles explode on impact, dealing 20% weapon damage as Arcane to all enemies within 6 yards.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
			},
		},
		'familiar~c': {
			name: 'Familiar - Dartling',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			rune: 'Summon a lightning Familiar whose projectiles have a 100% chance to pierce through enemies.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
			},
		},
		'familiar~d': {
			name: 'Familiar - Arcanot',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			rune: 'While the Familiar is active, you regenerate 2 Arcane Power per second.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
			},
		},
		'familiar~e': {
			name: 'Familiar - Ancient Guardian',
			desc: 'Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 minutes',
			rune: 'Summon a protective Familiar. When you are below 35% Life the Familiar will fully absorb damage from 1 attack every 6 seconds.',
			effect: {
				'cost-arcane-power': 20,
				'weapon-damage': 20,
			},
		},
		'teleport': {
			name: 'Teleport',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
			},
		},
		'teleport~a': {
			name: 'Teleport - Calamity',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Casts a low power Wave of Force upon arrival, dealing 265% weapon damage as Physical to all nearby enemies.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
				'weapon-damage': 265,
			},
		},
		'teleport~b': {
			name: 'Teleport - Fracture',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Summon 2 decoys for 8 seconds after teleporting.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
			},
		},
		'teleport~c': {
			name: 'Teleport - Safe Passage',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'For 4 seconds after you Teleport, you will take 30% less damage.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
			},
		},
		'teleport~d': {
			name: 'Teleport - Reversal',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Casting Teleport again within 8 seconds will instantly return you to your original location.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
			},
		},
		'teleport~e': {
			name: 'Teleport - Wormhole',
			desc: 'Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'After casting Teleport, there is a 1 second delay before the cooldown begins, allowing you to Teleport again.',
			effect: {
				'cost-arcane-power': 15,
				'cooldown': 16,
			},
		},
		'mirror-image': {
			name: 'Mirror Image',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			effect: {
				'cooldown': 15,
			},
		},
		'mirror-image~a': {
			name: 'Mirror Image - Mirror Mimics',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Spells cast by your Mirror Images will do 10% of the damage of your own spells.',
			effect: {
				'cooldown': 15,
			},
		},
		'mirror-image~b': {
			name: 'Mirror Image - Duplicates',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Summon 5 Mirror Images that have 0% of your Life each.',
			effect: {
				'cooldown': 15,
			},
		},
		'mirror-image~c': {
			name: 'Mirror Image - Simulacrum',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Increase the Life of your Mirror Images to 0% of your own.',
			effect: {
				'cooldown': 15,
			},
		},
		'mirror-image~d': {
			name: 'Mirror Image - Extension of Will',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'The duration of your Mirror Images is increased to 7 seconds and their Life is increased to 0% of your Life.',
			effect: {
				'cooldown': 15,
			},
		},
		'mirror-image~e': {
			name: 'Mirror Image - Mocking Demise',
			desc: 'Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'When a Mirror Image is destroyed, it explodes, doing 45% weapon damage as Physical and has a 50% chance to Stun for 2 seconds.',
			effect: {
				'cooldown': 15,
				'chance-stun': 50,
			},
		},
		'meteor': {
			name: 'Meteor',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 260,
			},
		},
		'meteor~a': {
			name: 'Meteor - Molten Impact',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Increases the damage of the Meteor impact to 260% weapon damage as Fire and the molten fire to 78% weapon damage as Fire over 3 seconds.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 390,
			},
		},
		'meteor~b': {
			name: 'Meteor - Meteor Shower',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Unleash a volley of 7 smaller Meteors that each strike for 104% weapon damage as Fire.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 728,
			},
		},
		'meteor~c': {
			name: 'Meteor - Comet',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Transforms the Meteor to ice that deals 312% weapon damage as Cold. The impact site is covered in a freezing mist that deals 72% weapon damage as Cold and Slows enemy movement by 60% over 3 seconds.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 312,
			},
		},
		'meteor~d': {
			name: 'Meteor - Star Pact',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Reduces the casting cost of Meteor to 35 Arcane Power and the damage type to Arcane.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 260,
			},
		},
		'meteor~e': {
			name: 'Meteor - Liquefy',
			desc: 'Summon an immense Meteor that plummets from the sky, causing 260% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'If the initial impact of the Meteor causes a Critical Hit, the molten fire duration is increased to 8 seconds.',
			effect: {
				'cost-arcane-power': 60,
				'weapon-damage': 260,
			},
		},
		'blizzard': {
			name: 'Blizzard',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 210,
				'weapon-damage-for': 6,
			},
		},
		'blizzard~a': {
			name: 'Blizzard - Unrelenting Storm',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Increases the duration of Blizzard to deal 280% weapon damage as Cold over 8 seconds.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 280,
				'weapon-damage-for': 8,
			},
		},
		'blizzard~b': {
			name: 'Blizzard - Stark Winter',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Increases the size of Blizzard to cover 22 yards, dealing 210% weapon damage as Cold over 6 seconds.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 210,
				'weapon-damage-for': 12,
			},
		},
		'blizzard~c': {
			name: 'Blizzard - Grasping Chill',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'After the Blizzard ends, the ground is covered in a low lying mist for 3 seconds that Slows the movement speed of enemies by 60%.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 210,
				'weapon-damage-for': 6,
			},
		},
		'blizzard~d': {
			name: 'Blizzard - Snowbound',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Reduces the casting cost of Blizzard to 20 Arcane Power.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 210,
				'weapon-damage-for': 6,
			},
		},
		'blizzard~e': {
			name: 'Blizzard - Frozen Solid',
			desc: 'Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Enemies caught in the Blizzard have a 20% chance to be Frozen for 3 seconds.',
			effect: {
				'cost-arcane-power': 45,
				'weapon-damage': 210,
				'weapon-damage-for': 6,
			},
		},
		'energy-armor': {
			name: 'Energy Armor',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			effect: {
				'cost-arcane-power': 25,
				'plus-armor': 65,
			},
		},
		'energy-armor~a': {
			name: 'Energy Armor - Prismatic Armor',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases all of your resistances by 40% while Energy Armor is active.',
			effect: {
				'cost-arcane-power': 25,
				'plus-resist-all': 40,
				'plus-armor': 65,
			},
		},
		'energy-armor~b': {
			name: 'Energy Armor - Energy Tap',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Rather than decreasing your maximum Arcane Power, Energy Armor increases it by 20 while it is active.',
			effect: {
				'cost-arcane-power': 25,
				'plus-armor': 65,
			},
		},
		'energy-armor~c': {
			name: 'Energy Armor - Force Armor',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'While Energy Armor is active, incoming attacks that would deal more than 35% of your maximum Life are reduced to deal 35% of your maximum Life instead.',
			effect: {
				'cost-arcane-power': 25,
				'plus-armor': 65,
			},
		},
		'energy-armor~d': {
			name: 'Energy Armor - Absorption',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'You have a chance to gain 4 Arcane Power whenever you are hit by a ranged or melee attack.',
			effect: {
				'cost-arcane-power': 25,
				'plus-armor': 65,
			},
		},
		'energy-armor~e': {
			name: 'Energy Armor - Pinpoint Barrier',
			desc: 'Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases your chance to critically hit by 5% while Energy Armor is active.',
			effect: {
				'cost-arcane-power': 25,
				'plus-crit-hit': 5,
				'plus-armor': 65,
			},
		},
		'archon': {
			name: 'Archon',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'plus-armor': 40,
			},
		},
		'archon~a': {
			name: 'Archon - Improved Archon',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Increases the damage of all Archon abilities by 25%.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'plus-armor': 40,
			},
		},
		'archon~b': {
			name: 'Archon - Slow Time',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Archon form can cast Slow Time that lasts for 8 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'plus-armor': 40,
			},
		},
		'archon~c': {
			name: 'Archon - Teleport',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Archon form can now cast Teleport with a cooldown of 10 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'plus-armor': 40,
			},
		},
		'archon~d': {
			name: 'Archon - Pure Power',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Decreases the cooldown of Archon to 100 seconds.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'plus-armor': 40,
			},
		},
		'archon~e': {
			name: 'Archon - Arcane Destruction',
			desc: 'Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'An explosion erupts around you when you transform, causing 1600% weapon damage as Arcane to all enemies within 15 yards.',
			effect: {
				'cost-arcane-power': 25,
				'cooldown': 120,
				'plus-resist-all': 40,
				'weapon-damage': 450,
				'plus-armor': 40,
			},
		},
	},
	'enchantress': {
		'charm': {
			name: 'Charm',
			desc: 'Charms an enemy to fight for you for 4 seconds.',
      // effect: {
        // 'cooldown': 25,
      // },
		},
		'forceful-push': {
			name: 'Forceful Push',
			desc: 'Summon an Arcane explosion 8 yards around an enemy, dealing 100% weapon damage as Arcane and knocking back all monsters caught within it.',
      // effect: {
        // 'cooldown': 10,
      // },
		},
		'reflect-missiles': {
			name: 'Reflect Missiles',
			desc: 'Place a shield on the Enchantress and her allies that reflects incoming projectiles for 5 seconds.',
      // effect: {
        // 'cooldown': 20,
      // },
		},
		'powered-armor': {
			name: 'Powered Armor',
			desc: 'Enchantress buffs herself and her allies, increasing Armor by 15%. Attackers are slowed by 30% for 3 seconds.',
			effect: {
				'plus-armor': 15,
			},
		},
		'disorient': {
			name: 'Disorient',
			desc: 'Cast a flash of Confusion on a group of enemies in an area, causing them to stumble around disoriented for 2 seconds.',
      // effect: {
        // 'cooldown': 45,
      // },
		},
		'erosion': {
			name: 'Erosion',
			desc: 'Conjures a pool of energy that deals 50% weapon damage as Arcane  per second. Affected enemies take an extra 15% damage from all attacks for 3 seconds.',
      // effect: {
        // 'cooldown': 15,
        // 'weapon-damage': 50,
      // },
		},
		'focused-mind': {
			name: 'Focused Mind',
			desc: 'An aura that increases attack speed by 3% for allies within 40 yards.',
			effect: {
				'plus-attack-speed': 3,
			},
		},
		'mass-control': {
			name: 'Mass Control',
			desc: 'The Enchantress lobs a bulb of magical energy at the player that will hex all enemies within 8 yards into chickens for 5 seconds. Hexed enemies are unable to perform offensive actions.',
      // effect: {
        // 'cooldown': 60,
      // },
		},
	},
	'templar': {
		'heal': {
			name: 'Heal',
			desc: 'Heals you or the Templar for 4651.46 Life.',
      // effect: {
        // 'cooldown': 30,
      // },
		},
		'intervene': {
			name: 'Intervene',
			desc: 'Taunts enemies attacking the hero for 3 seconds when the hero is below 50% Life.',
      // effect: {
        // 'cooldown': 60,
      // },
		},
		'loyalty': {
			name: 'Loyalty',
			desc: 'Regenerates 155.05 Life per second for you and the Templar.',
		},
		'intimidate': {
			name: 'Intimidate',
			desc: 'Enemy units are slowed by 60% for 3 seconds when they hit the Templar.',
		},
		'charge': {
			name: 'Charge',
			desc: 'Charges a target, dealing 50% weapon damage and stunning all enemies within 8 yards for 2 seconds.',
      // effect: {
        // 'cooldown': 30,
      // },
		},
		'onslaught': {
			name: 'Onslaught',
			desc: 'Delivers a massive blow to an enemy for 200% weapon damage.',
      // effect: {
        // 'cooldown': 15,
        // 'weapon-damage': 200,
      // },
		},
		'inspire': {
			name: 'Inspire',
			desc: 'Increase resource generation for all allies that the Templar is following. Mana: 2 per second. Arcane Power: 0.5 per second. Hatred: 1 per second. Fury: 8% generated. Spirit: 12% generated.',
		},
		'guardian': {
			name: 'Guardian',
			desc: 'Rush to the aid of wounded ally, knocking back enemies within 15 yards and healing the wounded ally for 4651.46 Life.',
      // effect: {
        // 'cooldown': 30,
      // },
		},
	},
	'scoundrel': {
		'crippling-shot': {
			name: 'Crippling Shot',
			desc: 'Ranged attack that slows the target by 60% for 3 seconds.',
      // effect: {
        // 'cooldown': 6,
      // },
		},
		'poison-bolts': {
			name: 'Poison Bolts',
			desc: 'Ranged attack which deals 40% weapon damage and an additional 40% weapon damage as Poison over 3 seconds.',
      // effect: {
        // 'cooldown': 6,
        // 'weapon-damage-for': 3,
      // },
		},
		'dirty-fighting': {
			name: 'Dirty Fighting',
			desc: 'Blinds enemies in front of the Scoundrel for 3 seconds.',
      // effect: {
        // 'cooldown': 30,
      // },
		},
		'vanish': {
			name: 'Vanish',
			desc: 'The Scoundrel vanishes in a cloud of smoke when injured, reappearing after 5 seconds. While vanished, he will heal himself for 15504.85 Life.',
      // effect: {
        // 'cooldown': 30,
      // },
		},
		'powered-shot': {
			name: 'Powered Shot',
			desc: 'Powerful ranged attack that explodes on impact, dealing 25% weapon damage as Arcane to targets within 6 yards and has a 50% chance to Stun targets for 2 seconds.',
      // effect: {
        // 'cooldown': 20,
        // 'chance-stun': 50,
      // },
		},
		'multishot': {
			name: 'Multishot',
			desc: 'The Scoundrel\'s ranged attacks fire 3 bolts at a time.',
		},
		'hysteria': {
			name: 'Hysteria',
			desc: 'Whenever you or the Scoundrel land a Critical Hit, you both will go into hysterics, increasing all damage done by 10% for 3 seconds. This effect cannot occur more than once every 6 seconds.',
			'effect': {
        'plus-damage-conditional': 10
			}
		},
		'anatomy': {
			name: 'Anatomy',
			desc: 'Increases Critical Hit Chance by 3% for the Scoundrel and his allies.',
			effect: {
				'plus-crit-hit': 3,
			},
		},
	},
	'shrine': {
	  'protection-shrine': {
	    name: 'Protection Shrine',
	    desc: 'Buff when activating a Protection Shrine.',
	    effect: {
	      'plus-damage-reduce': 25
	    }
	  },
	  'frenzy-shrine': {
	    name: 'Frenzy Shrine',
	    desc: 'Buff when activating a Frenzy Shrine.',
	    effect: {
	      'plus-attack-speed': 25,
	      'critical-hit-damage': 25
	    }
	  },
	}
};
var td = [];
td['strength'] = '+VVV Strength';
td['intelligence'] = '+VVV Intelligence';
td['vitality'] = '+VVV Vitality';
td['dexterity'] = '+VVV Dexterity';
td['resist-all'] = '+VVV Resistance to All Elements';
td['armor'] = '+VVV Armor';
td['plus-life'] = '+VVV% Life';
td['life-regen'] = 'Regenerates VVV Life per Second';
td['plus-block'] = '+VVV% Chance to Block';
td['cc-reduce'] = 'Reduces the duration of control impairing effects by VVV%';
td['elite-reduce'] = 'Reduces damage from elites by VVV%';
td['melee-reduce'] = 'Reduces damage from melee attacks by VVV%';
td['range-reduce'] = 'Reduces damage from ranged attacks by VVV%';
td['arcane-resist'] = '+VVV Arcane Resistance';
td['cold-resist'] = '+VVV Cold Resistance';
td['fire-resist'] = '+VVV Fire Resistance';
td['lightning-resist'] = '+VVV Lightning Resistance';
td['physical-resist'] = '+VVV Physical Resistance';
td['poison-resist'] = '+VVV Poison Resistance';
td['thorns'] = 'Melee attackers take VVV damage per hit';
td['attack-speed'] = 'Attack speed increased by VVV%';
td['critical-hit'] = 'Critical Hit Chance increased by VVV%';
td['critical-hit-damage'] = 'Critical Hit Damage increased by VVV%';
td['plus-damage'] = '+VVV% Damage';
td['min-damage'] = '+VVV Minimum Damage';
td['max-damage'] = '+VVV Maximum Damage';
td['minmax-damage'] = '+VVV Damage (Min/Max)';
td['arcane-damage'] = '+VVV Arcane Damage';
td['cold-damage'] = '+VVV Cold Damage';
td['fire-damage'] = '+VVV Fire Damage';
td['holy-damage'] = '+VVV Holy Damage';
td['lightning-damage'] = '+VVV Lightning Damage';
td['poison-damage'] = '+VVV Poison Damage';
td['plus-arcane-damage'] = '+VVV% Arcane Damage';
td['plus-cold-damage'] = '+VVV% Cold Damage';
td['plus-fire-damage'] = '+VVV% Fire Damage';
td['plus-holy-damage'] = '+VVV% Holy Damage';
td['plus-lightning-damage'] = '+VVV% Lightning Damage';
td['plus-poison-damage'] = '+VVV% Poison Damage';
td['plus-arcane-damage-skills'] = 'Arcane skills deal VVV% more damage';
td['plus-cold-damage-skills'] = 'Cold skills deal VVV% more damage';
td['plus-fire-damage-skills'] = 'Fire skills deal VVV% more damage';
td['plus-holy-damage-skills'] = 'Holy skills deal VVV% more damage';
td['plus-lightning-damage-skills'] = 'Lightning skills deal VVV% more damage';
td['plus-poison-damage-skills'] = 'Poison skills deal VVV% more damage';
td['elite-damage'] = 'Increases Damage against Elites by VVV%';
td['chance-bleed'] = 'VVV% chance to inflict Bleed for VVV damage over 5 seconds';
td['chance-blind'] = 'VVV% chance to Blind on Hit';
td['chance-chill'] = 'VVV% chance to Chill on Hit';
td['chance-fear'] = 'VVV% chance to Fear on Hit';
td['chance-freeze'] = 'VVV% chance to Freeze on Hit';
td['chance-immobilize'] = 'VVV% chance to Immobilize on Hit';
td['chance-knockback'] = 'VVV% chance to Knockback on Hit';
td['chance-slow'] = 'VVV% chance to Slow on Hit';
td['chance-stun'] = 'VVV% chance to Stun on Hit';
td['chance-whirlwind'] = 'Chance to occasionally Whirlwind furioulsy.';
td['chance-ball-energy'] = 'Chance to hurt a ball of pure energy when attacking.';
td['chance-skeleton'] = 'Summons a skeleton when attacked.';
td['chance-reflect-projectiles'] = 'Chance to reflect projectiles when hit.';
td['effect-poison-cloud'] = 'You are sourrounded by a deadly Posion Cloud.';
td['plus-movement'] = '+VVV% Movement Speed';
td['plus-pickup-radius'] = 'Increases Gold and Health pickup by VVV yards';
td['plus-experience'] = 'Monster kills grant +VVV experience';
td['plus-experience-percent'] = 'Increased Experience Rewarded per Kill by VVV%';
td['plus-gold-find'] = '+VVV% Extra Gold from Monsters';
td['plus-magic-find'] = 'VVV% Better Chance of finding Magic Items';
td['health-globes'] = 'Health Globes grant +VVV Life';
td['life-steal'] = 'VVV% of Damage Dealt is Converted to Life (Steal)';
td['life-kill'] = '+VVV Life after each Kill';
td['life-hit'] = 'Each hit adds +VVV Life';
td['level-reduce'] = 'Level Requirement reduced by VVV';
td['indestructable'] = 'Ignores durability loss';
td['bb-bash'] = 'Increases bash damage by VVV%';
td['bb-cleave'] = 'Increases cleave damage by VVV%';
td['bb-frenzy'] = 'Increases frenzy damage by VVV%';
td['bb-rend'] = 'Reduces resource cost of Rend by VVV Fury';
td['bb-revenge'] = 'Increases Critical Hit Chance of Revenge by VVV%';
td['bb-weapon-throw'] = 'Reduces resource cost of Weapon Throw by VVV Fury';
td['bb-hammer-of-the-ancients'] = 'Reduces resource cost of Hammer of the Ancients by VVV Fury';
td['bb-whirlwind'] = 'Increases Critical Hit Chance of Whirlwind by VVV%';
td['bb-overpower'] = 'Increases Critical Hit Chance of Overpower by VVV%';
td['bb-seismic-slam'] = 'Increases Critical Hit Chance of Seismic Slam by VVV%';
td['fury-max'] = '+VVV Maximum Fury';
td['hatred-regen'] = 'Increases Hatred Regeneration by VVV per Second';
td['max-discipline'] = '+VVV Maximum Discipline';
td['dh-cluster-arrow'] = 'Reduces resource cost of Cluster Arrow by VVV Hatred.';
td['dh-chakram'] = 'Reduces resource cost of Chakram by VVV Hatred';
td['dh-evasive-fire'] = 'Increases Evasive Fire damage by VVV%';
td['dh-grenades'] = 'Increases Grenades Damage by [V]%';
td['dh-impale'] = 'Reduces resource cost of Impale by VVV Hatred';
td['dh-spike-trap'] = 'Increases Spike Trap damage by VVV%';
td['dh-bola-shot'] = 'Increases Bola Shot damage by VVV%';
td['dh-elemental-arrow'] = 'Increases Elemental Arrow damage by VVV%';
td['dh-entangling-shot'] = 'Increases Entangling Shot damage by VVV%';
td['dh-hungering-arrow'] = 'Increases Hungering Arrow damage by VVV%';
td['dh-multishot'] = 'Increases Critical Hit Chance of Multishot by VVV%';
td['dh-rapid-fire'] = 'Increases Critical Hit Chance of Rapid Fire by VVV%';
td['spirit-spent-life'] = 'Gain VVV Life per Spirit Spent';
td['spirit-regen'] = 'Increases Spirit Regeneration by VVV per Second';
td['mk-crippling-wave'] = 'Increases Crippling Wave damage by VVV%';
td['mk-cyclone-strike'] = 'Reduces resource cost of Cyclone Strike by VVV Spirit';
td['mk-deadly-reach'] = 'Increases Deadly Reach damage by VVV%';
td['mk-exploding-palm'] = 'Increases Exploding Palm damage by VVV%';
td['mk-fists-of-thunder'] = 'Increases Fist of Thunder damage by VVV%';
td['mk-sweeping-wind'] = 'Increases Sweeping Wind damage by VVV%';
td['mk-sweeping-wind-cost'] = 'Reduces resource cost of Sweeping Wind by VVV Spirit.';
td['mk-way-of-the-hundred-fists'] = 'Increases Way of the Hundred Fists damage by VVV%';
td['mk-lashing-tail-kick'] = 'Reduces resource cost of Lashing Tail Kick by VVV Spirit';
td['mk-tempest-rush'] = 'Increases Critical Hit Chance of Tempest Rush by VVV%';
td['mk-wave-of-light'] = 'Increases Critical Hit Chance of Wave of Light by VVV%';
td['mana-regen'] = 'Increases Mana Regeneration by VVV per Second';
td['mana-max'] = '+VVV Maximum Mana';
td['wd-firebomb'] = 'Reduces resource cost of Firebomb by VVV Mana';
td['wd-haunt'] = 'Increases Haunt Damage by VVV%';
td['wd-acid-clouds'] = 'Increases Critical Hit Chance of Acid Clouds by VVV%';
td['wd-firebats'] = 'Reduces resource cost of Firebats by VVV Mana';
td['wd-zombie-dogs'] = 'Reduces cooldown of Summon Zombie Dogs by VVV Seconds';
td['wd-plague-of-toads'] = 'Increases Plague of Toads damage by VVV%';
td['wd-poison-darts'] = 'Increaeses Poison Darts damage by VVV%';
td['wd-spirit-barrage'] = 'Increases Spirit Barrage damage by VVV%';
td['wd-wall-of-zombies'] = 'Reduces cooldown of Wall of Zombies by VVV Seconds';
td['wd-zombie-charger'] = 'Reduces resource cost of Zombie Charger by VVV Mana';
td['ap-on-crit'] = 'Critical Hits grant VVV Arcane Power';
td['ap-max'] = '+VVV Maximum Arcane Power';
td['ap-regen'] = 'Increases Arcane Power regeneration by VVV per second.';
td['wz-arcane-torrent'] = 'Reduces resource cost of Arcane Torrent by VVV Arcane Power';
td['wz-disintegrate'] = 'Reduces resource cost of Disintegrate by VVV Arcane Power';
td['wz-electrocute'] = 'Increases Electrocute damage by VVV%';
td['wz-explosive-blast'] = 'Increases Critical Hit Chance of Explosive Blast by VVV%';
td['wz-hydra'] = 'Reduces resource cost of Hydra by VVV Arcane Power';
td['wz-ray-of-frost'] = 'Increases Critical Hit Chance of Ray of Frost by VVV%';
td['wz-energy-twister'] = 'Increases Critical Hit Chance of Energy Twister by VVV%';
td['wz-magic-missle'] = 'Increases Magic Missle damage by VVV%';
td['wz-arcane-orb'] = 'Increases Critical Hit Chance of Arcane Orb by VVV%';
td['wz-blizzard'] = 'Increases duration of Blizzard by VVV Seconds';
td['wz-meteor'] = 'Reduces resource cost of Meteor by VVV Arcane Power';
td['wz-shock-pulse'] = 'Increases Shock Pulse damage by VVV%';
td['wz-spectral-blade'] = 'Increases Spectral Blade damage by VVV%';

var gems = {
	chipped_amethyst: ['Chipped Amethyst' ,'+5% Life' ,'Each Hit Adds +2 Life' ,'+6 Vitality'],
	chipped_emerald: ['Chipped Emerald' ,'+5% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 10%' ,'+6 Dexterity'],
	chipped_ruby: ['Chipped Ruby' ,'Increased Experience Rewarded per Kill by 5%' ,'+2-4 Damage' ,'+6 Strength'],
	chipped_topaz: ['Chipped Topaz' ,'5% Better Chance of Finding Magical Items' ,'Melee attackers take 2 damage per hit' ,'+6 Intelligence'],
	flawed_amethyst: ['Flawed Amethyst' ,'+6% Life', 'Each Hit Adds +3 Life', '+10 Vitality'],
	flawed_emerald: ['Flawed Emerald' ,'+7% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 15%' ,'+10 Dexterity'],
	flawed_ruby: ['Flawed Ruby' ,'Increased Experience Rewarded per Kill by 7%' ,'+4-8 Damage' ,'+10 Strength'],
	flawed_topaz: ['Flawed Topaz' ,'7% Better Chance of Finding Magical Items' ,'Melee attackers take 3 damage per hit' ,'+10 Intelligence'],
	amethyst: ['Amethyst' ,'+7% Life' ,'Each Hit Adds +6 Life' ,'+14 Vitality'],
	emerald: ['Emerald' ,'+9% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 20%' ,'+14 Dexterity'],
	ruby: ['Ruby' ,'Increased Experience Rewarded per Kill by 9%' ,'+8-16 Damage' ,'+14 Strength'],
	topaz: ['Topaz' ,'9% Better Chance of Finding Magical Items' ,'Melee attackers take 6 damage per hit' ,'+14 Intelligence'],
	flawless_amethyst: ['Flawless Amethyst' ,'+8% Life' ,'Each Hit Adds +10 Life' ,'+18 Vitality'],
	flawless_emerald: ['Flawless Emerald' ,'+11% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 25%' ,'+18 Dexterity'],
	flawless_ruby: ['Flawless Ruby' ,'Increased Experience Rewarded per Kill by 11%' ,'+10-20 Damage' ,'+18 Strength'],
	flawless_topaz: ['Flawless Topaz' ,'11% Better Chance of Finding Magical Items' ,'Melee attackers take 10 damage per hit' ,'+18 Intelligence'],
	perfect_amethyst: ['Perfect Amethyst' ,'+9% Life' ,'Each Hit Adds +15 Life' ,'+22 Vitality'],
	perfect_emerald: ['Perfect Emerald' ,'13% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 30%' ,'+22 Dexterity'],
	perfect_ruby: ['Perfect Ruby' ,'Increased Experience Rewarded per Kill by 13%' ,'+11-22 Damage' ,'+22 Strength'],
	perfect_topaz: ['Perfect Topaz' ,'13% Better Chance of Finding Magical Items' ,'Melee attackers take 15 damage per hit' ,'+22 Intelligence'],
	radiant_amethyst: ['Radiant Amethyst' ,'+10% Life' ,'Each Hit Adds +25 Life' ,'+26 Vitality'],
	radiant_emerald: ['Radiant Emerald' ,'15% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 35%' ,'+26 Dexterity'],
	radiant_ruby: ['Radiant Ruby' ,'Increased Experience Rewarded per Kill by 15%' ,'+12-24 Damage' ,'+26 Strength'],
	radiant_topaz: ['Radiant Topaz' ,'15% Better Chance of Finding Magical Items' ,'Melee attackers take 30 damage per hit' ,'+26 Intelligence'],
	square_amethyst: ['Square Amethyst' ,'+11% Life' ,'Each Hit Adds +35 Life' ,'+30 Vitality'],
	square_emerald: ['Square Emerald' ,'17% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 40%' ,'+30 Dexterity'],
	square_ruby: ['Square Ruby' ,'Increased Experience Rewarded per Kill by 17%' ,'+13-26 Damage' ,'+30 Strength'],
	square_topaz: ['Square Topaz' ,'17% Better Chance of Finding Magical Items' ,'Melee attackers take 50 damage per hit' ,'+30 Intelligence'],
	flawless_square_amethyst: ['Flawless Square Amethyst' ,'+12% Life' ,'Each Hit Adds +65 Life' ,'+34 Vitality'],
	flawless_square_emerald: ['Flawless Square Emerald' ,'19% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 45%' ,'+34 Dexterity'],
	flawless_square_ruby: ['Flawless Square Ruby' ,'Increased Experience Rewarded per Kill by 19%' ,'+14-28 Damage' ,'+34 Strength'],
	flawless_square_topaz: ['Flawless Square Topaz' ,'19% Better Chance of Finding Magical Items' ,'Melee attackers take 100 damage per hit' ,'+34 Intelligence'],
	perfect_square_amethyst: ['Perfect Square Amethyst' ,'+13% Life' ,'Each hit adds +105 Life' ,'+38 Vitality'],
	perfect_square_emerald: ['Perfect Square Emerald' ,'+21% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 50%' ,'+38 Dexterity'],
	perfect_square_ruby: ['Perfect Square Ruby' ,'Increases Experience Rewarded per Kill by 21%' ,'+15-30 Damage' ,'+38 Strength'],
	perfect_square_topaz: ['Perfect Square Topaz' ,'21% Better Chance of Finding Magical Items' ,'Melee attackers take 200 damage per hit' ,'+38 Intelligence'],
	radiant_square_amethyst: ['Radiant Square Amethyst' ,'+14% Life' ,'Each Hit Adds +190 Life' ,'+42 Vitality'],
	radiant_square_emerald: ['Radiant Square Emerald' ,'+23% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 60%' ,'+42 Dexterity'],
	radiant_square_ruby: ['Radiant Square Ruby' ,'Increases Experience Rewarded per Kill by 23%' ,'+16-32 Damage' ,'+42 Strength'],
	radiant_square_topaz: ['Radiant Square Topaz' ,'23% Better Chance of Finding Magical Items' ,'Melee attackers take 350 damage per hit' ,'+42 Intelligence'],
	star_amethyst: ['Star Amethyst' ,'+15% Life' ,'Each Hit Adds +300 Life' ,'+46 Vitality'],
	star_emerald: ['Star Emerald' ,'+25 Extra Gold from Monsters' ,'Critical Hit Damage Increased by 70%' ,'+46 Dexterity'],
	star_ruby: ['Star Ruby' ,'Increases Experience Rewarded per Kill by 25%' ,'+17-34 Damage' ,'+46 Strength'],
	star_topaz: ['Star Topaz' ,'25% Better Chance of Finding Magical Items' ,'Melee attackers take 600 damage per hit' ,'+46 Intelligence'],
	flawless_star_amethyst: ['Flawless Star Amethyst' ,'+16% Life' ,'Each Hit Adds +400 Life' ,'+50 Vitality'],
	flawless_star_emerald: ['Flawless Star Emerald' ,'+27% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 80%' ,'+50 Dexterity'],
	flawless_star_ruby: ['Flawless Star Ruby' ,'Increases Experience Rewarded per Kill by 27%' ,'+18-36 Damage' ,'+50 Strength'],
	flawless_star_topaz: ['Flawless Star Topaz' ,'27% Better Chance of Finding Magical Items' ,'Melee attackers take 900 damage per hit' ,'+50 Intelligence'],
	perfect_star_amethyst: ['Perfect Star Amethyst' ,'+17% Life' ,'Each Hit Adds +500 Life' ,'+54 Vitality'],
	perfect_star_emerald : ['Perfect Star Emerald ' ,'+29% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 90%' ,'+54 Dexterity'],
	perfect_star_ruby: ['Perfect Star Ruby' ,'Increases Experience Rewarded per Kill by 29%' ,'+19-38 Damage' ,'+54 Strength'],
	perfect_star_topaz : ['Perfect Star Topaz ' ,'29% Better Chance of Finding Magical Items' ,'Melee attackers take 1250 damage per hit' ,'+54 Intelligence'],
	radiant_star_amethyst: ['Radiant Star Amethyst' ,'+18% Life' ,'Each Hit Adds +600 Life' ,'+58 Vitality'],
	radiant_star_emerald: ['Radiant Star Emerald' ,'+31% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 100%' ,'+58 Dexterity'],
	radiant_star_ruby: ['Radiant Star Ruby' ,'Increases Experience Rewarded per Kill by 31%' ,'+20-40 Damage' ,'+58 Strength'],
	radiant_star_topaz: ['Radiant Star Topaz' ,'31% Better Chance of Finding Magical Items' ,'Melee attackers take 1800 damage per hit' ,'+58 Intelligence']		
};

var gemEffect = {"chipped_amethyst":["Chipped Amethyst",["plus-life",5],["life-hit",2],["vitality",6]],"chipped_emerald":["Chipped Emerald",["plus-gold-find",5],["critical-hit-damage",10],["dexterity",6]],"chipped_ruby":["Chipped Ruby",["plus-experience-percent",5],["damage","2-4"],["strength",6]],"chipped_topaz":["Chipped Topaz",["plus-magic-find",5],["thorns",2],["intelligence",6]],"flawed_amethyst":["Flawed Amethyst",["plus-life",6],["life-hit",3],["vitality",10]],"flawed_emerald":["Flawed Emerald",["plus-gold-find",7],["critical-hit-damage",15],["dexterity",10]],"flawed_ruby":["Flawed Ruby",["plus-experience-percent",7],["damage","4-8"],["strength",10]],"flawed_topaz":["Flawed Topaz",["plus-magic-find",7],["thorns",3],["intelligence",10]],"amethyst":["Amethyst",["plus-life",7],["life-hit",6],["vitality",14]],"emerald":["Emerald",["plus-gold-find",9],["critical-hit-damage",20],["dexterity",14]],"ruby":["Ruby",["plus-experience-percent",9],["damage","8-16"],["strength",14]],"topaz":["Topaz",["plus-magic-find",9],["thorns",6],["intelligence",14]],"flawless_amethyst":["Flawless Amethyst",["plus-life",8],["life-hit",10],["vitality",18]],"flawless_emerald":["Flawless Emerald",["plus-gold-find",11],["critical-hit-damage",25],["dexterity",18]],"flawless_ruby":["Flawless Ruby",["plus-experience-percent",11],["damage","10-20"],["strength",18]],"flawless_topaz":["Flawless Topaz",["plus-magic-find",11],["thorns",10],["intelligence",18]],"perfect_amethyst":["Perfect Amethyst",["plus-life",9],["life-hit",15],["vitality",22]],"perfect_emerald":["Perfect Emerald",["plus-gold-find",13],["critical-hit-damage",30],["dexterity",22]],"perfect_ruby":["Perfect Ruby",["plus-experience-percent",13],["damage","11-22"],["strength",22]],"perfect_topaz":["Perfect Topaz",["plus-magic-find",13],["thorns",15],["intelligence",22]],"radiant_amethyst":["Radiant Amethyst",["plus-life",10],["life-hit",25],["vitality",26]],"radiant_emerald":["Radiant Emerald",["plus-gold-find",15],["critical-hit-damage",35],["dexterity",26]],"radiant_ruby":["Radiant Ruby",["plus-experience-percent",15],["damage","12-24"],["strength",26]],"radiant_topaz":["Radiant Topaz",["plus-magic-find",15],["thorns",30],["intelligence",26]],"square_amethyst":["Square Amethyst",["plus-life",11],["life-hit",35],["vitality",30]],"square_emerald":["Square Emerald",["plus-gold-find",17],["critical-hit-damage",40],["dexterity",30]],"square_ruby":["Square Ruby",["plus-experience-percent",17],["damage","13-26"],["strength",30]],"square_topaz":["Square Topaz",["plus-magic-find",17],["thorns",50],["intelligence",30]],"flawless_square_amethyst":["Flawless Square Amethyst",["plus-life",12],["life-hit",65],["vitality",34]],"flawless_square_emerald":["Flawless Square Emerald",["plus-gold-find",19],["critical-hit-damage",45],["dexterity",34]],"flawless_square_ruby":["Flawless Square Ruby",["plus-experience-percent",19],["damage","14-28"],["strength",34]],"flawless_square_topaz":["Flawless Square Topaz",["plus-magic-find",19],["thorns",100],["intelligence",34]],"perfect_square_amethyst":["Perfect Square Amethyst",["plus-life",13],["life-hit",105],["vitality",38]],"perfect_square_emerald":["Perfect Square Emerald",["plus-gold-find",21],["critical-hit-damage",50],["dexterity",38]],"perfect_square_ruby":["Perfect Square Ruby",["plus-experience-percent",21],["damage","15-30"],["strength",38]],"perfect_square_topaz":["Perfect Square Topaz",["plus-magic-find",21],["thorns",200],["intelligence",38]],"radiant_square_amethyst":["Radiant Square Amethyst",["plus-life",14],["life-hit",190],["vitality",42]],"radiant_square_emerald":["Radiant Square Emerald",["plus-gold-find",23],["critical-hit-damage",60],["dexterity",42]],"radiant_square_ruby":["Radiant Square Ruby",["plus-experience-percent",23],["damage","16-32"],["strength",42]],"radiant_square_topaz":["Radiant Square Topaz",["plus-magic-find",23],["thorns",350],["intelligence",42]],"star_amethyst":["Star Amethyst",["plus-life",15],["life-hit",300],["vitality",46]],"star_emerald":["Star Emerald",["plus-gold-find",25],["critical-hit-damage",70],["dexterity",46]],"star_ruby":["Star Ruby",["plus-experience-percent",25],["damage","17-34"],["strength",46]],"star_topaz":["Star Topaz",["plus-magic-find",25],["thorns",600],["intelligence",46]],"flawless_star_amethyst":["Flawless Star Amethyst",["plus-life",16],["life-hit",400],["vitality",50]],"flawless_star_emerald":["Flawless Star Emerald",["plus-gold-find",27],["critical-hit-damage",80],["dexterity",50]],"flawless_star_ruby":["Flawless Star Ruby",["plus-experience-percent",27],["damage","18-36"],["strength",50]],"flawless_star_topaz":["Flawless Star Topaz",["plus-magic-find",27],["thorns",900],["intelligence",50]],"perfect_star_amethyst":["Perfect Star Amethyst",["plus-life",17],["life-hit",500],["vitality",54]],"perfect_star_emerald":["Perfect Star Emerald",["plus-gold-find",29],["critical-hit-damage",90],["dexterity",54]],"perfect_star_ruby":["Perfect Star Ruby",["plus-experience-percent",29],["damage","19-38"],["strength",54]],"perfect_star_topaz":["Perfect Star Topaz",["plus-magic-find",29],["thorns",1250],["intelligence",54]],"radiant_star_amethyst":["Radiant Star Amethyst",["plus-life",18],["life-hit",600],["vitality",58]],"radiant_star_emerald":["Radiant Star Emerald",["plus-gold-find",31],["critical-hit-damage",100],["dexterity",58]],"radiant_star_ruby":["Radiant Star Ruby",["plus-experience-percent",31],["damage","20-40"],["strength",58]],"radiant_star_topaz":["Radiant Star Topaz",["plus-magic-find",31],["thorns",1800],["intelligence",58]]};

var setBonuses = {
	'cains-honor': {
		name: 'Cain\'s Honor',
		effect: {
			2: {
				'plus-attack-speed': 0.02
			},
			3: {
				'plus-magic-find': 0.1
			}
		}
	},
	'cains-fate': {
		name: 'Cain\'s Fate',
		effect: {
			2: {
				'plus-attack-speed': 0.02
			},
			3: {
				'plus-magic-find': 0.1,
				'plus-experience-percent': 0.3
			}
		}
	},
	'aughilds-treasured': {
		name: 'Aughild\'s Treasured',
		effect: {
			2: {
				'melee-reduce': 0.02
			},
			3: {
				'range-reduce': 0.02
			}
		}
	},
	'aughilds-victory': {
		name: 'Aughild\'s Victory',
		effect: {
			2: {
				'melee-reduce': 0.02
			},
			3: {
				'range-reduce': 0.02
			}
		}
	},
	'guardians-regalia': {
		name: 'Guardian\'s Regalia',
		effect: {
			2: {
				'vitality': 110,
				'life-regen': 130,
			}
		}
	},
	'guardians-contingency': {
		name: 'Guardian\'s Contingency',
		effect: {
			2: {
				'vitality': 110,
				'life-regen': 130,
			}
		}
	},
	'immortal-kings-will': {
		name: 'Immortal King\'s Will',
		effect: {
			2: {
				'resist-all': 60
			},
			3: {
				'melee-reduce': 0.02
			},
			5: {
				'fury-max': 5,
				'fury-spent-life': 5
			}
		}
	},
	'immortal-kings-legend': {
		name: 'Immortal King\'s Legend',
		effect: {
			2: {
				'resist-all': 60
			},
			3: {
				'melee-reduce': 0.04
			},
			5: {
				'fury-max': 5,
				'fury-spent-life': 5,
				'generate-fury': 2
			}
		}
	},
	'natalyas-wrath': {
		name: 'Natalya\'s Wrath',
		effect: {
			2: {
				'critical-hit': 0.07,
			},
			3: {
				'dexterity': 130,
			},
			4: {
				'discipline-regen': 2
			}
		}
	},
	'natalyas-solace': {
		name: 'Natalya\'s Solace',
		effect: {
			2: {
				'critical-hit': 0.07,
			},
			3: {
				'dexterity': 130,
			},
			4: {
				'max-discipline': 20
			}
		}
	},
	'sages-wisdom': {
		name: 'Sage\'s Wisdom',
		effect: {
			2: {
				'strength': 35,
				'dexterity': 35,
				'intelligence': 35,
				'vitality': 35,
			}
		}
	},
	'sages-plight': {
		name: 'Sage\'s Plight',
		effect: {
			2: {
				'strength': 35,
				'dexterity': 35,
				'intelligence': 35,
				'vitality': 35,
			}
		}
	},
	'tal-rashas-wrappings': {
		name: 'Tal Rasha\'s Wrappings',
		effect: {
			2: {
				'plus-fire-damage': 0.03
			},
			3: {
				'plus-lightning-damage': 0.03
			},
			4: {
				'plus-cold-damage': 0.03
			}
		}
	},
	'tal-rashas-sacrifice': {
		name: 'Tal Rasha\'s Sacrifice',
		effect: {
			2: {
				'plus-fire-damage': 0.03
			},
			3: {
				'plus-lightning-damage': 0.03
			},
			4: {
				'plus-cold-damage': 0.03,
				'ap-regen': 2
			}
		}
	},
	'borns-aegis': {
		name: 'Born\'s Aegis',
		effect: {
			2: {
				'plus-life': 0.02,
				'plus-experience': 20
			}
		}
	},
	'borns-defiance': {
		name: 'Born\'s Defiance',
		effect: {
			2: {
				'plus-life': 0.02,
				'plus-experience': 20
			}
		}
	},
	'ashearas-bindings': {
		name: 'Asheara\'s Bindings',
		effect: {
			2: {
				'resist-all': 30
			},
			3: {
				'life-steal': 0.025,
				'thorns': 300
			}
		}
	},
	'ashearas-uniform': {
		name: 'Asheara\'s Uniform',
		effect: {
			2: {
				'resist-all': 30
			},
			3: {
				'life-steal': 0.025,
				'thorns': 300
			}
		}
	},
	'demons-carapace': {
		name: 'Demon\'s Carapace',
		effect: {
			2: {
				'thorns': 999
			},
			3: {
				'chance-fear': 0.011
			},
			4: {
				'demon-damage': 0.03
			}
		}
	},
	'demons-skin': {
		name: 'Demon\'s Skin',
		effect: {
			2: {
				'thorns': 999
			},
			3: {
				'chance-fear': 0.011
			},
			4: {
				'demon-damage': 0.03,
				'chance-reflect-projectiles': true
			}
		}
	},
	'blackthornes-regalia': {
		name: 'Blackthorne\'s Regalia',
		effect: {
			2: {
				'vitality': 100
			}, 
			3: {
				'elite-damage': 0.02
			},
			4: {
				'plus-gold-find': 0.05,
				'plus-magic-find': 0.05
			}
		}
	},
	'blackthornes-armor': {
		name: 'Blackthorne\'s ReArmorgalia',
		effect: {
			2: {
				'vitality': 100
			}, 
			3: {
				'elite-damage': 0.06
			},
			4: {
				'plus-gold-find': 0.15,
				'plus-magic-find': 0.15,
				'elite-damage': 0.07
			}
		}
	},
	'innas-majesty': {
		name: 'Inna\'s Majesty',
		effect: {
			2: {
				'dexterity': 130
			},
			3: {
				'spirit-regen': 0.33
			},
			4: {
				'spirit-spent-life': 10
			}
		}
	},
	'innas-grandeur': {
		name: 'Inna\'s Grandeur',
		effect: {
			2: {
				'dexterity': 130
			},
			3: {
				'spirit-regen': 0.33
			},
			4: {
				'spirit-spent-life': 10,
				'mk-sweeping-wind-cost': 70
			}
		}
	},
	'zunimassas-spirit': {
		name: 'Zunimassa\'s Spirit',
		effect: {
			2: {
				'intelligence': 130
			},
			3: {
				'resist-all': 55
			},
			4: {
				'mana-kill': 10
			}
		}
	},
	'zunimassas-whispers': {
		name: 'Zunimassa\'s Whispers',
		effect: {
			2: {
				'intelligence': 130
			},
			3: {
				'resist-all': 55
			},
			4: {
				'mana-kill': 10,
				'mana-regen': 20
			}
		}
	},
	'captain-crimsons-attire': {
		name: 'Captain Crimson\'s Attire',
		effect: {
			2: {
				'life-regen': 20
			},
			3: {
				'resist-all': 20
			}
		}
	},
	'captain-crimsons-finery': {
		name: 'Captain Crimson\'s Finery',
		effect: {
			2: {
				'life-regen': 20
			},
			3: {
				'resist-all': 20
			}
		}
	},
	'endless-journey': {
		name: 'Endless Journey',
		effect: {
			2: {
				'vitality': 100,
				'critical-hit-damage': 0.5
			}
		}
	},
	'endless-path': {
		name: 'Endless Path',
		effect: {
			2: {
				'vitality': 100,
				'critical-hit-damage': 0.5
			}
		}
	},
	'legacy-of-nighttime-whispers': {
		name: 'Legacy of Nighttime Whispers',
		effect: {
			2: {
				'plus-gold-find': 0.15,
				'plus-magic-find': 0.15
			}
		}
	},
	'legacy-of-wicked-dreams': {
		name: 'Legacy of Wicked Dreams',
		effect: {
			2: {
				'plus-gold-find': 0.15,
				'plus-magic-find': 0.15,
				'chance-skeleton': true
			}
		}
	},
	'hallowed-armaments': {
		name: 'Hallowed Armaments',
		effect: {
			2: {
				'resist-all': 40,
				'plus-attack-speed': 0.05
			}
		}
	},
	'hallowed-defenders': {
		name: 'Hallowed Defenders',
		effect: {
			2: {
				'resist-all': 40,
				'plus-attack-speed': 0.05
			}
		}
	},
	'bul-kathoss-glory': {
		name: 'Bul-Kathos\'s Glory',
		effect: {
			2: {
				'strength': 130, 
				'fury-max': 5,
				'chance-whirlwind': true
			}
		}
	},
	'bul-kathoss-children': {
		name: 'Bul-Kathos\'s Children',
		effect: {
			2: {
				'strength': 100,
				'fury-max': 5
			}
		}
	},
	'danettas-creed': {
		name: 'Danetta\'s Creed',
		effect: {
			2: {
				'dexterity': 130,
				'elite-damage': 0.03
			}
		}
	},
	'danettas-oath': {
		name: 'Danetta\'s Oath',
		effect: {
			2: {
				'dexterity': 130,
				'elite-damage': 0.03
			}
		}
	},
	'chantodos-legacy': {
		name: 'Chantodo\'s Legacy',
		effect: {
			2: {
				'resist-all': 60,
				'life-regen': 245
			}
		}
	},
	'chantodos-return': {
		name: 'Chantodo\'s Return',
		effect: {
			2: {
				'intelligence': 130,
				'elite-reduce': 0.07
			}
		}
	},
	'shenlongs-defense': {
		name: 'Shenlong\'s Defense',
		effect: {
			2: {
				'dexterity': 130,
				'spirit-regen': 0.33
			}
		}
	},
	'shenlongs-noble-path': {
		name: 'Shenlong\'s Noble Path',
		effect: {
			2: {
				'dexterity': 130,
				'spirit-regen': 0.33,
				'chance-ball-energy': true
			}
		}
	},
	'manajumas-ritual': {
		name: 'Manajuma\'s Ritual',
		effect: {
			2: {
				'intelligence': 130,
				'mana-kill': 5
			}
		}
	},
	'manajumas-ornaments': {
		name: 'Manajuma\'s Ornaments',
		effect: {
			2: {
				'intelligence': 130,
				'mana-kill': 5,
				'effect-poison-cloud': true
			}
		}
	}
};
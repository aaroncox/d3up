var activeSkills = {


	'barbarian': {
		'bash': {
			name: 'Bash',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			effect: {
				'chance-knockback': '20',
				'generate-fury': '6',
				'weapon-damage': '150',
			},
		},
		'bash~a': {
			name: 'Bash - Onslaught',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			rune: 'Add 2 reverberations that cause 22.5% weapon damage per strike. Removes the chance for Knockback.',
			effect: {
				'generate-fury': '6',
				'weapon-damage': '195',
			},
		},
		'bash~b': {
			name: 'Bash - Punish',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			rune: 'Increases the damage of your skills by 6% for 5 seconds after using Bash. This effect stacks up to 3 times.',
			effect: {
				'chance-knockback': '20',
				'generate-fury': '6',
				'damage-buff': '18',
				'weapon-damage': '150',
			},
		},
		'bash~c': {
			name: 'Bash - Clobber',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			rune: 'Instead of Knockback, each hit has a 35% chance to Stun the target for 1.5 seconds.',
			effect: {
				'generate-fury': '6',
				'chance-stun': '70',
				'weapon-damage': '150',
			},
		},
		'bash~d': {
			name: 'Bash - Instigation',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			rune: 'Generate 6 additional Fury per attack.',
			effect: {
				'chance-knockback': '20',
				'generate-fury': '12',
				'weapon-damage': '150',
			},
		},
		'bash~e': {
			name: 'Bash - Pulverize',
			desc: 'Generate: 6 Fury per attack  Brutally smash an enemy for 150% weapon damage with a 20% chance to Knockback.',
			rune: 'Cause a shockwave that inflicts 38% weapon damage to enemies in a 26 yard line behind the targeted enemy.',
			effect: {
				'chance-knockback': '20',
				'generate-fury': '6',
				'weapon-damage': '188',
			},
		},
		'hammer-of-the-ancients': {
			name: 'Hammer of the Ancients',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '200',
				'bonus-crit-hit': '5',
			},
		},
		'hammer-of-the-ancients~a': {
			name: 'Hammer of the Ancients - Smash',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Strike a smaller area for 270% weapon damage.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '5',
				'weapon-damage': '270',
			},
		},
		'hammer-of-the-ancients~b': {
			name: 'Hammer of the Ancients - Rolling Thunder',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Create a shockwave that deals 155% weapon damage to all enemies within 22 yards in front of you.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '510',
				'bonus-crit-hit': '5',
			},
		},
		'hammer-of-the-ancients~c': {
			name: 'Hammer of the Ancients - The Devil\'s Anvil',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Create a tremor at the point of impact for 2 seconds that slows the movement speed of enemies by 60%0.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '200',
				'bonus-crit-hit': '5',
			},
		},
		'hammer-of-the-ancients~d': {
			name: 'Hammer of the Ancients - Birthright',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Critical Hits have a 10% chance to cause enemies to drop treasure or health globes.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '200',
				'bonus-crit-hit': '5',
			},
		},
		'hammer-of-the-ancients~e': {
			name: 'Hammer of the Ancients - Thunderstrike',
			desc: 'Cost: 20 Fury  Call forth a massive hammer to smash enemies directly in front of you for 200% weapon damage. Hammer of the Ancients has a 5% increased Critical Hit Chance.',
			rune: 'Whenever you kill an enemy with Hammer of the Ancients every other enemy within 10 yards is stunned for 3 seconds.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '200',
				'bonus-crit-hit': '5',
			},
		},
		'cleave': {
			name: 'Cleave',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '120',
			},
		},
		'cleave~a': {
			name: 'Cleave - Broad Sweep',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			rune: 'Increase damage to 156% weapon damage.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '156',
			},
		},
		'cleave~b': {
			name: 'Cleave - Gathering Storm',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			rune: 'Enemies cleaved have their movement speed reduced by 80% for 1 second.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '120',
			},
		},
		'cleave~c': {
			name: 'Cleave - Scattering Blast',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			rune: 'On Critical Hits, knock enemies back 9 yards and inflict 60% weapon damage to enemies where they land.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '120',
			},
		},
		'cleave~d': {
			name: 'Cleave - Reaping Swing',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			rune: 'Generate 3 additional Fury per enemy hit.',
			effect: {
				'generate-fury': '8',
				'weapon-damage': '120',
			},
		},
		'cleave~e': {
			name: 'Cleave - Rupture',
			desc: 'Generate: 5 Fury per attack  Swing your weapon in a wide arc to deal 120% weapon damage to all enemies caught in the swing.',
			rune: 'Enemies slain by Cleave explode, causing 85% weapon damage to all other enemies within 8 yards.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '120',
			},
		},
		'ground-stomp': {
			name: 'Ground Stomp',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '12',
			},
		},
		'ground-stomp~a': {
			name: 'Ground Stomp - Trembling Stomp',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies in the area also take 76% weapon damage.',
			effect: {
				'generate-fury': '15',
				'cooldown': '12',
				'weapon-damage': '76',
			},
		},
		'ground-stomp~b': {
			name: 'Ground Stomp - Wrenching Smash',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Increase the area of effect to 24 yards. Enemies are pulled closer before the strike lands.',
			effect: {
				'generate-fury': '15',
				'cooldown': '12',
			},
		},
		'ground-stomp~c': {
			name: 'Ground Stomp - Avalanche',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies are knocked back 9 yards and inflict 55% weapon damage to enemies in the landing area.',
			effect: {
				'generate-fury': '15',
				'cooldown': '12',
			},
		},
		'ground-stomp~d': {
			name: 'Ground Stomp - Foot of the Mountain',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Increase Fury gained to 30.',
			effect: {
				'cooldown': '12',
				'generate-fury': '30',
			},
		},
		'ground-stomp~e': {
			name: 'Ground Stomp - Deafening Crash',
			desc: 'Generate: 15 Fury Cooldown: 12 seconds  Smash the ground, stunning all enemies within 12 yards for 4 seconds.',
			rune: 'Enemies in the area have their movement speed slowed by 60% for 3 seconds after they recover from being stunned.',
			effect: {
				'generate-fury': '15',
				'cooldown': '12',
			},
		},
		'rend': {
			name: 'Rend',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '210',
			},
		},
		'rend~a': {
			name: 'Rend - Lacerate',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			rune: 'Increase damage to 270.9% weapon damage as Physical over 3 seconds.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '270.9',
			},
		},
		'rend~b': {
			name: 'Rend - Ravage',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			rune: 'Increase the range of Rend to hit all enemies within 17 yards.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '210',
			},
		},
		'rend~c': {
			name: 'Rend - Mutilate',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			rune: 'Increase bleeding duration to 5 seconds.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '210',
			},
		},
		'rend~d': {
			name: 'Rend - Blood Lust',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			rune: 'Gain 9% of the damage done by Rend as Life.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '210',
				'life-steal': '9',
			},
		},
		'rend~e': {
			name: 'Rend - Bloodbath',
			desc: 'Cost: 20 Fury  A sweeping strike causes all nearby enemies to Bleed for 210% weapon damage as Physical over 3 seconds.',
			rune: 'Enemies killed while bleeding cause all enemies within 10 yards to begin bleeding for 60% weapon damage as Physical over 3 seconds.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '270',
			},
		},
		'leap': {
			name: 'Leap',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '85',
			},
		},
		'leap~a': {
			name: 'Leap - Call of Arreat',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Shockwaves burst forth from the ground increasing the radius of effect to 16 yards and pulling affected enemies towards you.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '85',
			},
		},
		'leap~b': {
			name: 'Leap - Toppling Impact',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Send enemies hurtling away from where you land.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '85',
			},
		},
		'leap~c': {
			name: 'Leap - Launch',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Jump into the air with such great force that enemies within 8 yards of the origin of the jump are also slowed by 60% for 3 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '85',
			},
		},
		'leap~d': {
			name: 'Leap - Iron Impact',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Gain 300% additional Armor for 4 seconds after landing.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '85',
			},
		},
		'leap~e': {
			name: 'Leap - Death from Above',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Leap into the air, dealing 85% weapon damage to all enemies within 8 yards of your destination and slowing their movement speed by 60% for 3 seconds.',
			rune: 'Land with such force that enemies have a 100% chance to be stunned for 3 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'chance-stun': '100',
				'weapon-damage': '85',
			},
		},
		'ancient-spear': {
			name: 'Ancient Spear',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '185',
			},
		},
		'ancient-spear~a': {
			name: 'Ancient Spear - Harpoon',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Pierce through multiple enemies in a straight line and drag them all back.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '185',
			},
		},
		'ancient-spear~b': {
			name: 'Ancient Spear - Grappling Hooks',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Throw 3 spears. Each spear will pull back the enemy that it hits.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '185',
			},
		},
		'ancient-spear~c': {
			name: 'Ancient Spear - Dread Spear',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Gain Life equal to 60% of the damage inflicted.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '185',
				'life-steal': '60',
			},
		},
		'ancient-spear~d': {
			name: 'Ancient Spear - Skirmish',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Increases Fury gained to 30.',
			effect: {
				'cooldown': '10',
				'weapon-damage': '185',
				'generate-fury': '30',
			},
		},
		'ancient-spear~e': {
			name: 'Ancient Spear - Rage Flip',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Throw a spear to pull an enemy back to you, briefly slowing the target\'s movement by 60% and dealing 185% weapon damage.',
			rune: 'Enemies hit with Ancient Spear are pulled in the opposite direction and damage is increased to 213% weapon damage.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '213',
			},
		},
		'frenzy': {
			name: 'Frenzy',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			effect: {
				'generate-fury': '3',
				'weapon-damage': '110',
				'bonus-attack-speed': '75',
			},
		},
		'frenzy~a': {
			name: 'Frenzy - Maniac',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Each Frenzy effect also increases your damage by 4%.',
			effect: {
				'generate-fury': '3',
				'weapon-damage': '110',
				'bonus-damage': '20',
				'bonus-attack-speed': '75',
			},
		},
		'frenzy~b': {
			name: 'Frenzy - Sidearm',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Each strike has a 25% chance to throw a piercing axe at a nearby enemy that deals 110% weapon damage to all enemies in its path.',
			effect: {
				'generate-fury': '3',
				'weapon-damage': '220',
				'bonus-attack-speed': '75',
			},
		},
		'frenzy~c': {
			name: 'Frenzy - Vanguard',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'While under the effects of Frenzy, you gain 15% increased movement speed.',
			effect: {
				'generate-fury': '3',
				'weapon-damage': '110',
				'bonus-attack-speed': '75',
			},
		},
		'frenzy~d': {
			name: 'Frenzy - Smite',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Add a 20% chance to call down a bolt of lightning from above, stunning your target for 1.5 seconds.',
			effect: {
				'generate-fury': '3',
				'chance-stun': '20',
				'weapon-damage': '110',
				'bonus-attack-speed': '75',
			},
		},
		'frenzy~e': {
			name: 'Frenzy - Triumph',
			desc: 'Generate: 3 Fury per attack  Swing for 110% weapon damage. Frenzy attack speed increases by 15% with each swing. This effect can stack up to 5 times for a total bonus of 75% attack speed.',
			rune: 'Killing an enemy with Frenzy heals you for 8% of your maximum Life over 6 seconds.',
			effect: {
				'generate-fury': '3',
				'weapon-damage': '110',
				'bonus-attack-speed': '75',
			},
		},
		'seismic-slam': {
			name: 'Seismic Slam',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			effect: {
				'cost-fury': '30',
				'weapon-damage': '310',
			},
		},
		'seismic-slam~a': {
			name: 'Seismic Slam - Shattered Ground',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Increase damage to 202% weapon damage and increases Knockback distance by 100%.',
			effect: {
				'cost-fury': '30',
				'weapon-damage': '202',
			},
		},
		'seismic-slam~b': {
			name: 'Seismic Slam - Rumble',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'The ground continues to shudder after the intitial strike, damaging enemies in the area for 30% weapon damage.',
			effect: {
				'cost-fury': '30',
				'weapon-damage': '340',
			},
		},
		'seismic-slam~c': {
			name: 'Seismic Slam - Stagger',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Add a 70% chance of stunning enemies for 1.5 seconds.',
			effect: {
				'cost-fury': '30',
				'chance-stun': '70',
				'weapon-damage': '310',
			},
		},
		'seismic-slam~d': {
			name: 'Seismic Slam - Strength from Earth',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Reduce Fury cost to 15 Fury.',
			effect: {
				'weapon-damage': '310',
				'cost-fury': '15',
			},
		},
		'seismic-slam~e': {
			name: 'Seismic Slam - Cracking Rift',
			desc: 'Cost: 30 Fury  Slam the ground and cause a wave of destruction that deals 155% weapon damage and Knockback to targets in a 45 yard arc.',
			rune: 'Focus the seismic shockwaves along a narrow path to inflict 255% weapon damage to targets along a 42 yard path.',
			effect: {
				'cost-fury': '30',
				'weapon-damage': '255',
			},
		},
		'revenge': {
			name: 'Revenge',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'revenge~a': {
			name: 'Revenge - Retribution',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Increase damage to 286% weapon damage.',
			effect: {
				'weapon-damage': '286',
			},
		},
		'revenge~b': {
			name: 'Revenge - Provocation',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Increases the chance Revenge will become active to 30% each time you are hit by an attack.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'revenge~c': {
			name: 'Revenge - Grudge',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Knocks enemies back 24 yards whenever Revenge is used.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'revenge~d': {
			name: 'Revenge - Vengeance Is Mine',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'Gain 5 Fury and heal for 8% of your maximum Life for each enemy hit.',
			effect: {
				'generate-fury': '5',
				'weapon-damage': '220',
			},
		},
		'revenge~e': {
			name: 'Revenge - Best Served Cold',
			desc: 'Revenge has a 15% chance to become active each time you are hit.  Inflict 220% weapon damage to all nearby enemies. You heal 5% of your maximum Life for each enemy hit.',
			rune: 'After using Revenge, your Critical Hit Chance is increased by 10% for 12 seconds.',
			effect: {
				'weapon-damage': '220',
				'bonus-crit-hit': '10',
			},
		},
		'weapon-throw': {
			name: 'Weapon Throw',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			effect: {
				'cost-fury': '10',
				'weapon-damage': '100',
			},
		},
		'weapon-throw~a': {
			name: 'Weapon Throw - Mighty Throw',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Increase thrown weapon damage to 130% weapon damage.',
			effect: {
				'cost-fury': '10',
				'weapon-damage': '130',
			},
		},
		'weapon-throw~b': {
			name: 'Weapon Throw - Ricochet',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Cause the weapon to ricochet and hit up to 3 targets within 20 yards of each other.',
			effect: {
				'cost-fury': '10',
				'weapon-damage': '100',
			},
		},
		'weapon-throw~c': {
			name: 'Weapon Throw - Throwing Hammer',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Hurl a hammer with a 50% chance to Stun the target for 1.5 seconds.',
			effect: {
				'cost-fury': '10',
				'chance-stun': '50',
				'weapon-damage': '100',
			},
		},
		'weapon-throw~d': {
			name: 'Weapon Throw - Dread Bomb',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Expend all remaining Fury to throw a corpse which inflicts an additional 3% weapon damage for each point of Fury expended to all enemies within 12 yards of the target.',
			effect: {
				'cost-fury': '10',
				'weapon-damage': '100',
			},
		},
		'weapon-throw~e': {
			name: 'Weapon Throw - Stupefy',
			desc: 'Cost: 10 Fury  Hurl a throwing weapon at an enemy for 100% weapon damage and Slow the movement of the enemy by 60% for 2 seconds.',
			rune: 'Aim for the head, gaining a 20% chance of causing your target to be Confused and attack other enemies for 6 seconds.',
			effect: {
				'cost-fury': '10',
				'weapon-damage': '100',
			},
		},
		'sprint': {
			name: 'Sprint',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			effect: {
				'cost-fury': '20',
			},
		},
		'sprint~a': {
			name: 'Sprint - Marathon',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			rune: 'Increases the movement speed bonus to 50% for 5 seconds.',
			effect: {
				'cost-fury': '20',
			},
		},
		'sprint~b': {
			name: 'Sprint - Rush',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			rune: 'Increases Dodge Chance by 12% while sprinting.',
			effect: {
				'cost-fury': '20',
				'bonus-dodge': '12',
			},
		},
		'sprint~c': {
			name: 'Sprint - Run Like the Wind',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			rune: 'Tornadoes rage in your wake, each one inflicting 60% weapon damage.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '60',
			},
		},
		'sprint~d': {
			name: 'Sprint - Forced March',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			rune: 'Increase the movement speed of allies within 50 yards by 20% for 3 seconds.',
			effect: {
				'cost-fury': '20',
			},
		},
		'sprint~e': {
			name: 'Sprint - Gangway',
			desc: 'Cost: 20 Fury  Increase movement speed by 40% for 3 seconds.',
			rune: 'Slams through enemies, knocking them back and inflicting 25% weapon damage.',
			effect: {
				'cost-fury': '20',
				'weapon-damage': '25',
			},
		},
		'threatening-shout': {
			name: 'Threatening Shout',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'threatening-shout~a': {
			name: 'Threatening Shout - Demoralize',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies are also taunted to attack you for 3 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'threatening-shout~b': {
			name: 'Threatening Shout - Intimidate',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies also have their movement speed reduced by 30%.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'threatening-shout~c': {
			name: 'Threatening Shout - Grim Harvest',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Enemies are badly shaken and have a 15% chance to drop additional treasure.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'threatening-shout~d': {
			name: 'Threatening Shout - Falter',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Affected enemies also have their attack speed reduced by 15% for 5 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'threatening-shout~e': {
			name: 'Threatening Shout - Terrify',
			desc: 'Generate: 15 Fury Cooldown: 15 seconds  Shout with great ferocity, reducing damage done by enemies within 25 yards by 20% for 15 seconds.',
			rune: 'Enemies are severely demoralized. Each enemy has a 35% chance to flee for 2.5 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '15',
				'damage-reduce': '20',
			},
		},
		'earthquake': {
			name: 'Earthquake',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '4000',
			},
		},
		'earthquake~a': {
			name: 'Earthquake - Aftershocks',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Secondary tremors knock enemies back and inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '4000',
			},
		},
		'earthquake~b': {
			name: 'Earthquake - Giant\'s Stride',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Secondary tremors follow your movement and inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '4000',
			},
		},
		'earthquake~c': {
			name: 'Earthquake - Chilling Earth',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Creates an icy patch, causing Earthquake\'s damage to turn Cold and Slow the movement of enemies by 80%.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '4000',
			},
		},
		'earthquake~d': {
			name: 'Earthquake - The Mountain\'s Call',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Removes the Fury cost and reduces the cooldown to 105 seconds.',
			effect: {
				'weapon-damage': '4000',
				'cooldown': '105',
			},
		},
		'earthquake~e': {
			name: 'Earthquake - Path of Fire',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Shake the ground violently, dealing 2000% weapon damage as Fire over 8 seconds to all enemies within 18 yards.',
			rune: 'Project secondary tremors up to 12 yards ahead of you that inflict 65% weapon damage as Fire.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '4000',
			},
		},
		'whirlwind': {
			name: 'Whirlwind',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			effect: {
				'cost-fury': '16',
				'weapon-damage': '110',
			},
		},
		'whirlwind~a': {
			name: 'Whirlwind - Volcanic Eruption',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			rune: 'Turns Whirlwind into a torrent of magma that inflicts 0% weapon damage as Fire.',
			effect: {
				'cost-fury': '16',
				'weapon-damage': '110',
			},
		},
		'whirlwind~b': {
			name: 'Whirlwind - Dust Devils',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			rune: 'Generate harsh tornadoes that inflict 40% weapon damage to enemies in their path.',
			effect: {
				'cost-fury': '16',
				'weapon-damage': '110',
			},
		},
		'whirlwind~c': {
			name: 'Whirlwind - Hurricane',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			rune: 'Allows you to move at your movement speed while using Whirlwind.',
			effect: {
				'cost-fury': '16',
				'weapon-damage': '110',
			},
		},
		'whirlwind~d': {
			name: 'Whirlwind - Wind Shear',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			rune: 'Gain 1 Fury for every enemy struck.',
			effect: {
				'cost-fury': '16',
				'generate-fury': '1',
				'weapon-damage': '110',
			},
		},
		'whirlwind~e': {
			name: 'Whirlwind - Blood Funnel',
			desc: 'Cost: 16 Fury  Deliver multiple attacks to everything in your path for 110% weapon damage.',
			rune: 'Critical Hits restore 1% of your maximum Life.',
			effect: {
				'cost-fury': '16',
				'weapon-damage': '110',
			},
		},
		'furious-charge': {
			name: 'Furious Charge',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '195',
			},
		},
		'furious-charge~a': {
			name: 'Furious Charge - Battering Ram',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Increase damage at the destination to 283% weapon damage.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '283',
			},
		},
		'furious-charge~b': {
			name: 'Furious Charge - Dreadnought',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Regain 8% of your maximum Life for each target hit by Furious Charge.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '195',
			},
		},
		'furious-charge~c': {
			name: 'Furious Charge - Bull Rush',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Any targets who are critically hit by Furious Charge will be stunned for 2.5 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '195',
			},
		},
		'furious-charge~d': {
			name: 'Furious Charge - Stamina',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Generate 8 additional Fury for each target hit while charging.',
			effect: {
				'generate-fury': '23',
				'cooldown': '10',
				'weapon-damage': '195',
			},
		},
		'furious-charge~e': {
			name: 'Furious Charge - Merciless Assault',
			desc: 'Generate: 15 Fury Cooldown: 10 seconds  Rush forward knocking back enemies and inflicting 195% weapon damage to enemies along the path of the charge.',
			rune: 'Cooldown is reduced by 2 seconds for every target hit. This effect can reduce the cooldown by up to 10 seconds.',
			effect: {
				'generate-fury': '15',
				'cooldown': '10',
				'weapon-damage': '195',
			},
		},
		'ignore-pain': {
			name: 'Ignore Pain',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
			},
		},
		'ignore-pain~a': {
			name: 'Ignore Pain - Contempt for Weakness',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Reflects 50% of ignored damage back at the enemy.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
			},
		},
		'ignore-pain~b': {
			name: 'Ignore Pain - Iron Hide',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Increases duration to 7 seconds.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
			},
		},
		'ignore-pain~c': {
			name: 'Ignore Pain - Mob Rule',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			rune: 'Extend the effect to nearby allies, reducing damage taken by 65% for 5 seconds.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
			},
		},
		'ignore-pain~d': {
			name: 'Ignore Pain - Bravado',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			rune: 'When activated, Knockback all enemies within 12 yards and deal 50% weapon damage to them.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
				'weapon-damage': '50',
			},
		},
		'ignore-pain~e': {
			name: 'Ignore Pain - Ignorance is Bliss',
			desc: 'Cooldown: 30 seconds  Reduces all damage taken by 65% for 5 seconds.',
			rune: 'While Ignore Pain is active, gain 20% of all damage dealt as Life.',
			effect: {
				'cooldown': '30',
				'damage-reduce': '65',
				'life-steal': '20',
			},
		},
		'battle-rage': {
			name: 'Battle Rage',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '15',
			},
		},
		'battle-rage~a': {
			name: 'Battle Rage - Marauder\'s Rage',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'Increase damage bonus to 30%.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '30',
			},
		},
		'battle-rage~b': {
			name: 'Battle Rage - Ferocity',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to increase the duration of Battle Rage by 2 seconds.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '15',
			},
		},
		'battle-rage~c': {
			name: 'Battle Rage - Swords to Ploughshares',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have up to a 5% chance to cause enemies to drop additional health globes.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '15',
			},
		},
		'battle-rage~d': {
			name: 'Battle Rage - Into the Fray',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to generate 15 additional Fury.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '15',
			},
		},
		'battle-rage~e': {
			name: 'Battle Rage - Bloodshed',
			desc: 'Cost: 20 Fury  Enter a rage which increases damage by 15% and Critical Hit Chance by 3% for 30 seconds.',
			rune: 'While under the effects of Battle Rage, Critical Hits have a chance to cause an explosion of blood dealing 20% of the damage done to all other nearby enemies.',
			effect: {
				'cost-fury': '20',
				'bonus-crit-hit': '3',
				'bonus-damage': '15',
			},
		},
		'call-of-the-ancients': {
			name: 'Call of the Ancients',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '60',
			},
		},
		'call-of-the-ancients~a': {
			name: 'Call of the Ancients - Korlic\'s Might',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Korlic gains the skill Furious Charge which deals 200% of your weapon damage to all enemies in a line.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '60',
			},
		},
		'call-of-the-ancients~b': {
			name: 'Call of the Ancients - The Council Rises',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'The Ancients inflict 66% weapon damage with each attack and have 100% additional Armor.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '66',
			},
		},
		'call-of-the-ancients~c': {
			name: 'Call of the Ancients - Madawc\'s Madness',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Madawc gains the skill Seismic Slam which deals 180% of your weapon damage to enemies in an arc.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '60',
			},
		},
		'call-of-the-ancients~d': {
			name: 'Call of the Ancients - Duty to the Clan',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Increase duration to 20 seconds.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '60',
			},
		},
		'call-of-the-ancients~e': {
			name: 'Call of the Ancients - Talic\'s Anger',
			desc: 'Cost: 50 Fury Cooldown: 120 seconds  Summon the ancient Barbarians Talic, Korlic, and Madawc to fight alongside you for 15 seconds. Each deals 60% weapon damage per swing in addition to bonus abilities.   Talic wields a sword and shield and uses the Whirlwind skill.  Korlic wields a massive polearm and uses the Cleave skill.  Madawc dual-wields axes and uses the Weapon Throw skill.',
			rune: 'Talic gains the skill Leap which deals 250% of your weapon damage to enemies in the area of the leap.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'weapon-damage': '60',
			},
		},
		'overpower': {
			name: 'Overpower',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
			},
		},
		'overpower~a': {
			name: 'Overpower - Killing Spree',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Your Critical Hit Chance is increased by 10% for 6 seconds.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
				'bonus-crit-hit': '10',
			},
		},
		'overpower~b': {
			name: 'Overpower - Storm of Steel',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Throw up to 3 axes at nearby enemies which inflict 50% weapon damage each.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
			},
		},
		'overpower~c': {
			name: 'Overpower - Revel',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Heal 8% of your maximum Life for every enemy hit.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
			},
		},
		'overpower~d': {
			name: 'Overpower - Momentum',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Generate 12 Fury for each enemy hit by Overpower.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
			},
		},
		'overpower~e': {
			name: 'Overpower - Crushing Advance',
			desc: 'Cooldown: 15 seconds  Deal 165% weapon damage to all targets within 9 yards. Landing a Critical Hit has a chance to lower the cooldown by 1 second.',
			rune: 'Redirect 30% of incoming melee and ranged damage for 4 seconds after Overpower is activated.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '165',
			},
		},
		'war-cry': {
			name: 'War Cry',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			effect: {
				'generate-fury': '30',
				'cooldown': '30',
				'bonus-armor': '20',
			},
		},
		'war-cry~a': {
			name: 'War Cry - Hardened Wrath',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases the Armor bonus to 40%.',
			effect: {
				'generate-fury': '30',
				'cooldown': '30',
				'bonus-armor': '40',
			},
		},
		'war-cry~b': {
			name: 'War Cry - Veteran\'s Warning',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'War Cry also grants a 15% bonus to Dodge Chance.',
			effect: {
				'generate-fury': '30',
				'cooldown': '30',
				'bonus-dodge': '15',
				'bonus-armor': '20',
			},
		},
		'war-cry~c': {
			name: 'War Cry - Impunity',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'All of your resistances are increased by 50% while affected by War Cry.',
			effect: {
				'generate-fury': '30',
				'cooldown': '30',
				'bonus-resist-all': '50',
				'bonus-armor': '20',
			},
		},
		'war-cry~d': {
			name: 'War Cry - Charge!',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases Fury gained to 60.',
			effect: {
				'cooldown': '30',
				'bonus-armor': '20',
				'generate-fury': '60',
			},
		},
		'war-cry~e': {
			name: 'War Cry - Invigorate',
			desc: 'Generate: 30 Fury Cooldown: 30 seconds  Unleash a rallying cry to increase Armor for you and all allies within 50 yards by 20% for 60 seconds.',
			rune: 'Increases maximum Life by 10% and regenerates 310.1 Life per second while affected by War Cry.',
			effect: {
				'generate-fury': '30',
				'cooldown': '30',
				'bonus-armor': '20',
				'bonus-life': '10',
				'bonus-life-regen': '310.1',
			},
		},
		'wrath-of-the-berserker': {
			name: 'Wrath of the Berserker',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-dodge': '20',
				'bonus-movement-speed': '20',
				'bonus-crit-hit': '10',
				'bonus-attack-speed': '25',
			},
		},
		'wrath-of-the-berserker~a': {
			name: 'Wrath of the Berserker - Insanity',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			rune: 'While active your damage is also increased by 100%.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-dodge': '20',
				'bonus-movement-speed': '20',
				'bonus-crit-hit': '10',
				'bonus-damage': '100',
				'bonus-attack-speed': '25',
			},
		},
		'wrath-of-the-berserker~b': {
			name: 'Wrath of the Berserker - Arreat\'s Wail',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			rune: 'Activating Wrath of the Berserker knocks back all enemies within 12 yards and deals 430% weapon damage to them.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-dodge': '20',
				'bonus-movement-speed': '20',
				'weapon-damage': '430',
				'bonus-crit-hit': '10',
				'bonus-attack-speed': '25',
			},
		},
		'wrath-of-the-berserker~c': {
			name: 'Wrath of the Berserker - Striding Giant',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			rune: 'Increases bonus to Dodge Chance to 60%.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-movement-speed': '20',
				'bonus-crit-hit': '10',
				'bonus-attack-speed': '25',
				'bonus-dodge': '60',
			},
		},
		'wrath-of-the-berserker~d': {
			name: 'Wrath of the Berserker - Thrive on Chaos',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			rune: 'Every 25 Fury gained while Wrath of the Berserker is active adds 1 second to the duration of the effect.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-dodge': '20',
				'bonus-movement-speed': '20',
				'bonus-crit-hit': '10',
				'bonus-attack-speed': '25',
			},
		},
		'wrath-of-the-berserker~e': {
			name: 'Wrath of the Berserker - Slaughter',
			desc: 'Cost: 50 Fury  Cooldown: 120 seconds  Enter a berserker rage which raises several attributes for 15 seconds.  Critical Hit Chance: 10% Attack Speed: 25% Dodge Chance: 20% Movement Speed: 20%',
			rune: 'While Wrath of the Berserker is active, Critical Hits have a chance to cause an eruption of blood dealing 155% weapon damage to enemies within 15 yards.',
			effect: {
				'cost-fury': '50',
				'cooldown': '120',
				'bonus-dodge': '20',
				'bonus-movement-speed': '20',
				'bonus-crit-hit': '10',
				'bonus-attack-speed': '25',
			},
		},
	},
	'demon-hunter': {
		'hungering-arrow': {
			name: 'Hungering Arrow',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '115',
			},
		},
		'hungering-arrow~a': {
			name: 'Hungering Arrow - Cinder Arrow',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Light the arrow on fire, dealing 35% additional weapon damage as Fire over 3 seconds.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '150',
			},
		},
		'hungering-arrow~b': {
			name: 'Hungering Arrow - Shatter Shot',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'If the arrow successfully pierces the first target, the arrow splits into 3 arrows.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '115',
			},
		},
		'hungering-arrow~c': {
			name: 'Hungering Arrow - Devouring Arrow',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Each consecutive pierce increases the damage of the arrow by 70%.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '115',
			},
		},
		'hungering-arrow~d': {
			name: 'Hungering Arrow - Puncturing Arrow',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Increase the chance for the arrow to pierce to 50%.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '115',
			},
		},
		'hungering-arrow~e': {
			name: 'Hungering Arrow - Spray of Teeth',
			desc: 'Generate: 3 Hatred  Fire a magically imbued arrow that seeks out targets for 115% weapon damage and has a 35% chance to pierce through targets.',
			rune: 'Successful Critical Hits cause a burst of bone to explode from the target, dealing 50% weapon damage to enemies in that area.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '115',
			},
		},
		'impale': {
			name: 'Impale',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			effect: {
				'cost-hatred': '25',
				'weapon-damage': '250',
			},
		},
		'impale~a': {
			name: 'Impale - Overpenetration',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			rune: 'The knife will pierce through all enemies in a straight line.',
			effect: {
				'cost-hatred': '25',
				'weapon-damage': '250',
			},
		},
		'impale~b': {
			name: 'Impale - Impact',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			rune: 'Impale causes Knockback and has a 65% chance to Stun enemies for 1.5 seconds.',
			effect: {
				'cost-hatred': '25',
				'chance-stun': '65',
				'weapon-damage': '250',
			},
		},
		'impale~c': {
			name: 'Impale - Chemical Burn',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			rune: 'Your target will also Bleed for 125% weapon damage as Physical over 2 seconds.',
			effect: {
				'cost-hatred': '25',
				'weapon-damage': '375',
			},
		},
		'impale~d': {
			name: 'Impale - Awareness',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			rune: 'After the initial throw, release multiple blades centered on you, dealing 75% weapon damage to all enemies within 10 yards.',
			effect: {
				'cost-hatred': '25',
				'weapon-damage': '325',
			},
		},
		'impale~e': {
			name: 'Impale - Grievous Wounds',
			desc: 'Cost: 25 Hatred  Impale a target for 250% weapon damage.',
			rune: 'Critical Hits cause 100% additional damage.',
			effect: {
				'cost-hatred': '25',
				'weapon-damage': '250',
				'bonus-crit-hit-damage': '100',
			},
		},
		'entangling-shot': {
			name: 'Entangling Shot',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '75',
			},
		},
		'entangling-shot~a': {
			name: 'Entangling Shot - Heavy Burden',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Increase the movement slow duration to 4 seconds.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '75',
			},
		},
		'entangling-shot~b': {
			name: 'Entangling Shot - Chain Gang',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Hit up to 4 targets.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '75',
			},
		},
		'entangling-shot~c': {
			name: 'Entangling Shot - Shock Collar',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Strike targets with electrified chains that do an additional 17.5% weapon damage per second as Lightning for 2 seconds.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '92.5',
			},
		},
		'entangling-shot~d': {
			name: 'Entangling Shot - Justice is Served',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Increase the Hatred generated to 6 per shot.',
			effect: {
				'weapon-damage': '75',
				'generate-hatred': '6',
			},
		},
		'entangling-shot~e': {
			name: 'Entangling Shot - Bounty Hunter',
			desc: 'Generate: 3 Hatred  Imbue an arrow with shadow energy that deals 75% weapon damage and entangles up to 2 enemies, slowing their movement by 60% for 2 seconds.',
			rune: 'Gain 6% of the damage dealt as Life.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '75',
				'life-steal': '6',
			},
		},
		'caltrops': {
			name: 'Caltrops',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			effect: {
				'cost-discipline': '6',
			},
		},
		'caltrops~a': {
			name: 'Caltrops - Jagged Spikes',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Enemies in the area also take 45% weapon damage.',
			effect: {
				'cost-discipline': '6',
				'weapon-damage': '45',
			},
		},
		'caltrops~b': {
			name: 'Caltrops - Hooked Spines',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Increase the slowing amount to 80%.',
			effect: {
				'cost-discipline': '6',
			},
		},
		'caltrops~c': {
			name: 'Caltrops - Torturous Ground',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'When the trap is sprung, all enemies in the area are immobilized for 2 seconds.',
			effect: {
				'cost-discipline': '6',
			},
		},
		'caltrops~d': {
			name: 'Caltrops - Carved Stakes',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Reduces the cost of Caltrops to 4 Discipline.',
			effect: {
				'cost-discipline': '4',
			},
		},
		'caltrops~e': {
			name: 'Caltrops - Bait the Trap',
			desc: 'Cost: 6 Discipline  Lay a trap of caltrops on the ground that activates when an enemy approaches. Once sprung, the caltrops Slow the movement of enemies within 12 yards by 60%. This trap lasts 6 seconds.',
			rune: 'Become empowered while standing in the area of effect, gaining an additional 10% Critical Hit Chance with all attacks.',
			effect: {
				'cost-discipline': '6',
				'bonus-crit-hit': '10',
			},
		},
		'rapid-fire': {
			name: 'Rapid Fire',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			effect: {
				'cost-hatred': '20',
				'weapon-damage': '228',
			},
		},
		'rapid-fire~a': {
			name: 'Rapid Fire - Bombardment',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			rune: 'Rapidly fire grenades that explode for 276% weapon damage as Fire to all enemies within a 4 yard radius.',
			effect: {
				'cost-hatred': '20',
				'weapon-damage': '276',
			},
		},
		'rapid-fire~b': {
			name: 'Rapid Fire - High Velocity',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			rune: 'Fire poison arrows that have a 40% chance to pierce through enemies.',
			effect: {
				'cost-hatred': '20',
				'weapon-damage': '228',
			},
		},
		'rapid-fire~c': {
			name: 'Rapid Fire - Fire Support',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			rune: 'While channeling Rapid Fire, launch 3 homing rockets every second. Each rocket deals 35% weapon damage as Physical to nearby targets.',
			effect: {
				'cost-hatred': '20',
				'weapon-damage': '333',
			},
		},
		'rapid-fire~d': {
			name: 'Rapid Fire - Withering Fire',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			rune: 'Reduces the initial Hatred cost to 5, and ignites your arrows, causing them to deal Fire damage.',
			effect: {
				'weapon-damage': '228',
				'cost-hatred': '5',
			},
		},
		'rapid-fire~e': {
			name: 'Rapid Fire - Web Shot',
			desc: 'Cost: 20 Hatred initially, and an additional 10 Hatred while channeling  Rapidly fire for 228% weapon damage as Physical.',
			rune: 'Slows the movement of affected targets by 80% for 1 second.',
			effect: {
				'cost-hatred': '20',
				'weapon-damage': '228',
			},
		},
		'smoke-screen': {
			name: 'Smoke Screen',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			effect: {
				'cost-discipline': '14',
			},
		},
		'smoke-screen~a': {
			name: 'Smoke Screen - Choking Gas',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Leave behind a cloud of gas that deals 70% weapon damage per second as Physical to enemies in the area for 5 seconds.',
			effect: {
				'cost-discipline': '14',
				'weapon-damage': '70',
			},
		},
		'smoke-screen~b': {
			name: 'Smoke Screen - Lingering Fog',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Increase the duration of the effect to 1.5 seconds.',
			effect: {
				'cost-discipline': '14',
			},
		},
		'smoke-screen~c': {
			name: 'Smoke Screen - Breathe Deep',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'While invisible you gain 12 Hatred per second.',
			effect: {
				'cost-discipline': '14',
				'generate-hatred': '12',
			},
		},
		'smoke-screen~d': {
			name: 'Smoke Screen - Special Recipe',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Reduce the cost to 12 Discipline.',
			effect: {
				'cost-discipline': '12',
			},
		},
		'smoke-screen~e': {
			name: 'Smoke Screen - Displacement',
			desc: 'Cost: 14 Discipline  Vanish behind a wall of smoke, becoming momentarily invisible for 1 second.',
			rune: 'Gain 35% movement speed when activated.',
			effect: {
				'cost-discipline': '14',
			},
		},
		'vault': {
			name: 'Vault',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			effect: {
				'cost-discipline': '8',
			},
		},
		'vault~a': {
			name: 'Vault - Trail of Cinders',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			rune: 'Ignite with fire dealing 100% weapon damage as Fire to everything along your path.',
			effect: {
				'cost-discipline': '8',
				'weapon-damage': '100',
			},
		},
		'vault~b': {
			name: 'Vault - Acrobatics',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			rune: 'Removes the Discipline cost but adds a 15 second cooldown.',
			effect: {
			},
		},
		'vault~c': {
			name: 'Vault - Action Shot',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			rune: 'As you travel, shoot arrows for 75% weapon damage at nearby targets.',
			effect: {
				'cost-discipline': '8',
				'weapon-damage': '75',
			},
		},
		'vault~d': {
			name: 'Vault - Tumble',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			rune: 'After using Vault, your next Vault within 6 seconds has its Discipline cost reduced by 50%.',
			effect: {
				'cost-discipline': '8',
			},
		},
		'vault~e': {
			name: 'Vault - Rattling Roll',
			desc: 'Cost: 8 Discipline  Tumble acrobatically 35 yards.',
			rune: 'All enemies within 8 yards of your destination are knocked back and stunned for 1.5 seconds.',
			effect: {
				'cost-discipline': '8',
			},
		},
		'bola-shot': {
			name: 'Bola Shot',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '130',
			},
		},
		'bola-shot~a': {
			name: 'Bola Shot - Volatile Explosives',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Increase the explosion radius to 14 yards.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '130',
			},
		},
		'bola-shot~b': {
			name: 'Bola Shot - Acid Strike',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Shoot 3 bolas that each deal 130% weapon damage as Poison. The bolas no longer explode for area damage to nearby targets.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '130',
			},
		},
		'bola-shot~c': {
			name: 'Bola Shot - Thunder Ball',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'When the bola explodes, it deals 130% weapon damage as Lightning and has a 35% chance to Stun the primary target for 1.5 seconds.',
			effect: {
				'generate-hatred': '3',
				'chance-stun': '35',
				'weapon-damage': '130',
			},
		},
		'bola-shot~d': {
			name: 'Bola Shot - Bitter Pill',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'When the bola explodes, you have a 15% chance to gain 2 Discipline.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '130',
			},
		},
		'bola-shot~e': {
			name: 'Bola Shot - Imminent Doom',
			desc: 'Generate: 3 Hatred  Shoot out an explosive bola that wraps itself around its target. After 1 second, the bola explodes dealing 130% weapon damage as Fire to the target and an additional 110% weapon damage as Fire to all other targets within 7 yards.',
			rune: 'Augment the bola to deal 182% weapon damage as Arcane to the target and 154% weapon damage as Arcane to all other targets within 7 yards, but increases the explosion delay to 2 seconds.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '182',
			},
		},
		'chakram': {
			name: 'Chakram',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '150',
			},
		},
		'chakram~a': {
			name: 'Chakram - Twin Chakrams',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			rune: 'A second Chakram mirrors the first.  Each Chakram deals 101% weapon damage as Physical.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '202',
			},
		},
		'chakram~b': {
			name: 'Chakram - Boomerang',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram path turns into a loop, dealing 188% weapon damage as Lightning to enemies along the path.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '188',
			},
		},
		'chakram~c': {
			name: 'Chakram - Serpentine',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram follows a slow curve, dealing 203% weapon damage as Poison to enemies along the path.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '203',
			},
		},
		'chakram~d': {
			name: 'Chakram - Razor Disk',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			rune: 'The Chakram spirals out from the targeted location dealing 165% weapon damage as Arcane to enemies along the path.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '165',
			},
		},
		'chakram~e': {
			name: 'Chakram - Shuriken Cloud',
			desc: 'Cost: 10 Hatred  Fire a swirling Chakram that does 150% weapon damage as Physical to enemies along its path.',
			rune: 'Surround yourself with spinning Chakrams for 120 seconds, dealing 30% weapon damage per second as Physical to nearby enemies.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '30',
			},
		},
		'preparation': {
			name: 'Preparation',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			effect: {
				'cooldown': '45',
			},
		},
		'preparation~a': {
			name: 'Preparation - Punishment',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			rune: 'Restore all Hatred for 25 Discipline. Preparation has no cooldown.',
			effect: {
				'cooldown': '45',
			},
		},
		'preparation~b': {
			name: 'Preparation - Invigoration',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			rune: 'Increase maximum Discipline by 10 for 5 seconds when using Preparation.',
			effect: {
				'cooldown': '45',
			},
		},
		'preparation~c': {
			name: 'Preparation - Focused Mind',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			rune: 'Gain 45 Discipline over 15 seconds instead of restoring it immediately.',
			effect: {
				'cooldown': '45',
			},
		},
		'preparation~d': {
			name: 'Preparation - Battle Scars',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			rune: 'Gain 60% Life after using Preparation.',
			effect: {
				'cooldown': '45',
			},
		},
		'preparation~e': {
			name: 'Preparation - Backup Plan',
			desc: 'Cooldown: 45 seconds  Instantly restore all Discipline.',
			rune: 'There is a 30% chance that Preparation\'s cooldown will not be triggered.',
			effect: {
				'cooldown': '45',
			},
		},
		'evasive-fire': {
			name: 'Evasive Fire',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '125',
			},
		},
		'evasive-fire~a': {
			name: 'Evasive Fire - Shrapnel',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Shoot exploding bolts that also deal 30% weapon damage as Fire to all enemies within 6 yards of the primary target.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '155',
			},
		},
		'evasive-fire~b': {
			name: 'Evasive Fire - Covering Fire',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Shoot a spread of bolts that hit up to 3 targets for 125% weapon damage each.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '125',
			},
		},
		'evasive-fire~c': {
			name: 'Evasive Fire - Parting Gift',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Whenever a backflip is triggered, leave a poison bomb behind that explodes for 45% weapon damage as Poison in a 12 yard radius after 1.2 seconds. Turns Evasive Fire into Poison damage.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '170',
			},
		},
		'evasive-fire~d': {
			name: 'Evasive Fire - Surge',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Reduces the cost of the backflip to 2 Discipline. Turns Evasive Fire into Lightning damage.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '125',
			},
		},
		'evasive-fire~e': {
			name: 'Evasive Fire - Displace',
			desc: 'Generate: 4 Hatred Cost: 4 Discipline if you backflip  Shoot for 125% weapon damage. If an enemy is in front of you at close range, you will also backflip away 15 yards.',
			rune: 'Increase the distance of the backflip to 30 yards.',
			effect: {
				'cost-discipline': '4',
				'generate-hatred': '4',
				'weapon-damage': '125',
			},
		},
		'grenades': {
			name: 'Grenades',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '95',
			},
		},
		'grenades~a': {
			name: 'Grenades - Gas Grenades',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw gas grenades that explode for 95% weapon damage as Poison and leave a cloud that deals an additional 25% weapon damage per second as Poison for 3 seconds to enemies who stand in the area.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '95',
			},
		},
		'grenades~b': {
			name: 'Grenades - Cluster Grenades',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw cluster grenades that deal 111% weapon damage as Fire over an 8 yard radius.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '111',
			},
		},
		'grenades~c': {
			name: 'Grenades - Fire Bomb',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Throw a single grenade that deals 124% weapon damage as Fire.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '124',
			},
		},
		'grenades~d': {
			name: 'Grenades - Tinkerer',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Increases Hatred generation to 6 Hatred.',
			effect: {
				'generate-hatred': '3',
				'weapon-damage': '95',
			},
		},
		'grenades~e': {
			name: 'Grenades - Stun Grenades',
			desc: 'Generate: 3 Hatred  Throw out three grenades that explode for 95% weapon damage as Fire each.',
			rune: 'Hurl grenades that have a 25% chance to Stun enemies for 1.5 seconds.',
			effect: {
				'generate-hatred': '3',
				'chance-stun': '25',
				'weapon-damage': '95',
			},
		},
		'shadow-power': {
			name: 'Shadow Power',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			effect: {
				'cost-discipline': '14',
				'life-steal': '20',
			},
		},
		'shadow-power~a': {
			name: 'Shadow Power - Night Bane',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Gain an additional 4 Hatred per second while Shadow Power is active.',
			effect: {
				'cost-discipline': '14',
				'life-steal': '20',
			},
		},
		'shadow-power~b': {
			name: 'Shadow Power - Shadow Glide',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Gain 40% bonus to movement speed while Shadow Power is active.',
			effect: {
				'cost-discipline': '14',
				'life-steal': '20',
			},
		},
		'shadow-power~c': {
			name: 'Shadow Power - Gloom',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Reduce incoming damage by 65% while Shadow Power is active.',
			effect: {
				'cost-discipline': '14',
				'damage-reduce': '65',
				'life-steal': '20',
			},
		},
		'shadow-power~d': {
			name: 'Shadow Power - Well of Darkness',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Decreases the Discipline cost to 12.',
			effect: {
				'life-steal': '20',
				'cost-discipline': '12',
			},
		},
		'shadow-power~e': {
			name: 'Shadow Power - Blood Moon',
			desc: 'Cost: 14 Discipline  Draw in the power of the shadows, gaining 20% of all damage done as Life for 3 seconds.',
			rune: 'Increases damage done as Life to 30%.',
			effect: {
				'cost-discipline': '14',
				'life-steal': '30',
			},
		},
		'fan-of-knives': {
			name: 'Fan of Knives',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'weapon-damage': '320',
			},
		},
		'fan-of-knives~a': {
			name: 'Fan of Knives - Hail of Knives',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Increase the radius to damage all enemies within 20 yards.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'weapon-damage': '320',
			},
		},
		'fan-of-knives~b': {
			name: 'Fan of Knives - Assassin\'s Knives',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Throw long-range knives that deal 70% weapon damage to 5 additional targets.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'weapon-damage': '390',
			},
		},
		'fan-of-knives~c': {
			name: 'Fan of Knives - Fan of Daggers',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Imbue your knives with a 65% chance to Stun enemies for 2 seconds.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'chance-stun': '65',
				'weapon-damage': '320',
			},
		},
		'fan-of-knives~d': {
			name: 'Fan of Knives - Crippling Razors',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Increase the amount enemies are slowed to 20% for 2 seconds.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'weapon-damage': '320',
			},
		},
		'fan-of-knives~e': {
			name: 'Fan of Knives - Retaliate',
			desc: 'Cost: 20 Hatred Cooldown: 10 seconds  Throw knives out in a spiral around you, doing 320% weapon damage to all enemies within 10 yards of you. Your knives will also Slow the movement of enemies by 60% for 2 seconds.',
			rune: 'Surround yourself with whirling blades that deal 464% weapon damage to all enemies if you are struck in the next 10 seconds.',
			effect: {
				'cost-hatred': '20',
				'cooldown': '10',
				'weapon-damage': '464',
			},
		},
		'spike-trap': {
			name: 'Spike Trap',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '275',
			},
		},
		'spike-trap~a': {
			name: 'Spike Trap - Long Fuse',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Increases the arming time to 2 seconds but increases damage to 371% weapon damage.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '371',
			},
		},
		'spike-trap~b': {
			name: 'Spike Trap - Bandolier',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Increase the maximum number of traps that can be out simultaneously to 6.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '275',
			},
		},
		'spike-trap~c': {
			name: 'Spike Trap - Sticky Trap',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Plant a bomb on an enemy rather than on the ground. If the target dies within 30 seconds, the bomb explodes dealing 404% weapon damage to all enemies within 8 yards.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '679',
			},
		},
		'spike-trap~d': {
			name: 'Spike Trap - Scatter',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'Simultaneously place all 3 traps.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '275',
			},
		},
		'spike-trap~e': {
			name: 'Spike Trap - Lightning Rod',
			desc: 'Cost: 30 Hatred  Lay a trap that arms after 1.2 seconds and triggers when an enemy approaches. The trap does 275% weapon damage to all enemies within 8 yards.  You can have a maximum of 3 Spike Traps active at one time.',
			rune: 'When the trap is triggered it releases a pulse of lightning that will bounce to up to 3 enemies for 275% weapon damage as Lightning.',
			effect: {
				'cost-hatred': '30',
				'weapon-damage': '275',
			},
		},
		'companion': {
			name: 'Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'companion~a': {
			name: 'Companion - Spider Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a spider instead of a raven. The spider\'s attacks also Slow the movement of enemies by 60% for 2 seconds.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'companion~b': {
			name: 'Companion - Boar Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a boar instead of a raven. The boar\'s attacks hit all enemies in an area.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'companion~c': {
			name: 'Companion - Wolf Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a wolf for 25 seconds instead of a raven. The wolf attacks for 0% of your weapon damage as Physical.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'companion~d': {
			name: 'Companion - Bat Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon a bat instead of a raven. The bat grants you 3 Hatred per second.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'companion~e': {
			name: 'Companion - Ferret Companion',
			desc: 'Cost: 10 Discipline  Summon a raven companion. Your raven companion will periodically peck at enemies for 30% of your weapon damage as Physical.',
			rune: 'Summon ferrets instead of a raven. The ferrets collect gold for you and increase gold found on monsters by 10%.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '30',
			},
		},
		'strafe': {
			name: 'Strafe',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '120',
			},
		},
		'strafe~a': {
			name: 'Strafe - Demolition',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Throw out bouncy grenades that explode for 144% weapon damage to targets within 9 yards.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '144',
			},
		},
		'strafe~b': {
			name: 'Strafe - Equilibrium',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Increases your attack speed by 20% when using Strafe.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '120',
				'bonus-attack-speed': '20',
			},
		},
		'strafe~c': {
			name: 'Strafe - Rocket Storm',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			rune: 'In addition to regular firing, fire off homing rockets for 60% weapon damage as Fire.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '180',
			},
		},
		'strafe~d': {
			name: 'Strafe - Drifting Shadow',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Movement speed increased to 100% of normal running speed while strafing.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '120',
			},
		},
		'strafe~e': {
			name: 'Strafe - Stinging Steel',
			desc: 'Cost: 15 Hatred  Shoot at random nearby enemies for 120% weapon damage while moving at 65% of normal movement speed.',
			rune: 'Throw out knives rather than arrows that do an extra 100% damage on successful Critical Hits.',
			effect: {
				'cost-hatred': '15',
				'weapon-damage': '120',
				'bonus-crit-hit-damage': '100',
			},
		},
		'elemental-arrow': {
			name: 'Elemental Arrow',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '155',
			},
		},
		'elemental-arrow~a': {
			name: 'Elemental Arrow - Frost Arrow',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire a frost arrow that splits into multiple arrows after hitting its target, dealing 170% weapon damage as Cold. Affected enemies have their movement speed slowed by 60% for 1 second.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '155',
			},
		},
		'elemental-arrow~b': {
			name: 'Elemental Arrow - Ball Lightning',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire a slow-moving arrow that electrocutes enemies along its path for 155% weapon damage as Lightning.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '155',
			},
		},
		'elemental-arrow~c': {
			name: 'Elemental Arrow - Screaming Skull',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Grants a 40% chance to shoot a skull that will Fear affected enemies for 1.5 seconds.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '155',
			},
		},
		'elemental-arrow~d': {
			name: 'Elemental Arrow - Nether Tentacles',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Shadow tentacles deal 155% weapon damage to enemies along its path and return 3% of damage dealt as Life for you.',
			effect: {
				'cost-hatred': '10',
				'life-steal': '3',
				'weapon-damage': '155',
			},
		},
		'elemental-arrow~e': {
			name: 'Elemental Arrow - Lightning Bolts',
			desc: 'Cost: 10 Hatred  Shoot a fire arrow that deals 155% weapon damage as Fire to all targets it passes through.',
			rune: 'Fire electrified bolts that Stun enemies for 1.5 seconds on a Critical Hit.',
			effect: {
				'cost-hatred': '10',
				'weapon-damage': '155',
			},
		},
		'marked-for-death': {
			name: 'Marked for Death',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			effect: {
				'cost-discipline': '3',
				'bonus-damage': '12',
			},
		},
		'marked-for-death~a': {
			name: 'Marked for Death - Grim Reaper',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'An additional 12% of damage done to the target is also divided among all enemies within 20 yards.',
			effect: {
				'cost-discipline': '3',
				'bonus-damage': '12',
			},
		},
		'marked-for-death~b': {
			name: 'Marked for Death - Contagion',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'When the target is killed, the ability spreads to 2 other nearby targets. This effect can chain repeatedly.',
			effect: {
				'cost-discipline': '3',
				'bonus-damage': '12',
			},
		},
		'marked-for-death~c': {
			name: 'Marked for Death - Valley of Death',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Mark an area on the ground 12 yards wide for 15 seconds.  Enemies in the area take 12% additional damage.',
			effect: {
				'cost-discipline': '3',
				'bonus-damage': '12',
			},
		},
		'marked-for-death~d': {
			name: 'Marked for Death - Mortal Enemy',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Attacks you make against the marked target generate 3 Hatred.',
			effect: {
				'cost-discipline': '3',
				'bonus-damage': '12',
			},
		},
		'marked-for-death~e': {
			name: 'Marked for Death - Death Toll',
			desc: 'Cost: 3 Discipline  Marks an enemy. The marked enemy will take 12% additional damage for the next 30 seconds.',
			rune: 'Heal attackers for 1% of the damage done to the marked target.',
			effect: {
				'cost-discipline': '3',
				'life-steal': '1',
				'bonus-damage': '12',
			},
		},
		'multishot-77649': {
			name: 'Multishot',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '165',
			},
		},
		'multishot-77649~a': {
			name: 'Multishot - Full Broadside',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Increase the damage of Multishot to 215% weapon damage.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '215',
			},
		},
		'multishot-77649~b': {
			name: 'Multishot - Burst Fire',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every time you fire, generate a shock pulse that damages nearby enemies for 65% weapon damage as Arcane.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '230',
			},
		},
		'multishot-77649~c': {
			name: 'Multishot - Arsenal',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every use also fires 3 rockets at nearby enemies that deal 60% weapon damage as Fire each.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '225',
			},
		},
		'multishot-77649~d': {
			name: 'Multishot - Fire at Will',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Cost reduced to 20 Hatred. Deals 165% weapon damage as Lightning.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '165',
			},
		},
		'multishot-77649~e': {
			name: 'Multishot - Suppression Fire',
			desc: 'Cost: 40 Hatred  Fire a massive volley of arrows dealing 165% weapon damage to all enemies in the area.',
			rune: 'Every enemy hit grants 1 Discipline.',
			effect: {
				'cost-hatred': '40',
				'weapon-damage': '165',
			},
		},
		'sentry': {
			name: 'Sentry',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '20',
			},
		},
		'sentry~a': {
			name: 'Sentry - Chain of Torment',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			rune: 'Create a tether between you and the Sentry that does 40% weapon damage every second to every enemy it touches.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '20',
			},
		},
		'sentry~b': {
			name: 'Sentry - Vigilant Watcher',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			rune: 'Increases duration of the turret to 40 seconds.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '20',
			},
		},
		'sentry~c': {
			name: 'Sentry - Spitfire Turret',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			rune: 'The turret will also fire homing rockets aimed at random nearby targets for 8% weapon damage as Fire.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '28',
			},
		},
		'sentry~d': {
			name: 'Sentry - Aid Station',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			rune: 'Heals nearby allies for 1% of their maximum Life per second.',
			effect: {
				'cost-discipline': '10',
				'weapon-damage': '20',
			},
		},
		'sentry~e': {
			name: 'Sentry - Guardian Turret',
			desc: 'Cost: 10 Discipline  Drop a turret on the ground. The turret begins firing at nearby enemies for 20%  weapon damage. Lasts 30 seconds.',
			rune: 'The turret also creates a shield that reduces damage taken by allies by 15%.',
			effect: {
				'cost-discipline': '10',
				'damage-reduce': '15',
				'weapon-damage': '20',
			},
		},
		'cluster-arrow': {
			name: 'Cluster Arrow',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			effect: {
				'cost-hatred': '50',
				'weapon-damage': '200',
			},
		},
		'cluster-arrow~a': {
			name: 'Cluster Arrow - Loaded for Bear',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Increases the damage of the explosion at the impact location to 0% weapon damage as Fire.',
			effect: {
				'cost-hatred': '50',
				'weapon-damage': '200',
			},
		},
		'cluster-arrow~b': {
			name: 'Cluster Arrow - Shooting Stars',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Instead of releasing grenades, shoots up to 3 rockets at nearby enemies dealing 175% weapon damage as Physical each.',
			effect: {
				'cost-hatred': '50',
				'weapon-damage': '175',
			},
		},
		'cluster-arrow~c': {
			name: 'Cluster Arrow - Cluster Bombs',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Launch the cluster through the air, dropping bombs in a straight line that each explode for 230% weapon damage as Fire.',
			effect: {
				'cost-hatred': '50',
				'weapon-damage': '230',
			},
		},
		'cluster-arrow~d': {
			name: 'Cluster Arrow - Maelstrom',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Instead of releasing grenades, the cluster releases shadow energy that deals 145% weapon damage as Physical to nearby enemies. You will gain 4% of the damage done as Life.',
			effect: {
				'cost-hatred': '50',
				'life-steal': '4',
				'weapon-damage': '145',
			},
		},
		'cluster-arrow~e': {
			name: 'Cluster Arrow - Dazzling Arrow',
			desc: 'Cost: 50 Hatred  Fire a cluster arrow that explodes for 200% weapon damage as Fire into a series of additional miniature bombs that explode for 100% weapon damage as Fire each.',
			rune: 'Enemies hit by grenades have a 55% chance to be stunned for 2 seconds and changes the damage to Physical.',
			effect: {
				'cost-hatred': '50',
				'chance-stun': '55',
				'weapon-damage': '200',
			},
		},
		'rain-of-vengeance': {
			name: 'Rain of Vengeance',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '74.75',
				'weapon-damage-for': '5',
			},
		},
		'rain-of-vengeance~a': {
			name: 'Rain of Vengeance - Beastly Bombs',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon 20 Shadow Beasts to drop bombs on enemies, dealing 125% weapon damage each.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '2574.75',
			},
		},
		'rain-of-vengeance~b': {
			name: 'Rain of Vengeance - Dark Cloud',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Launch a massive volley of guided arrows that rain down on enemies for 35% weapon damage for 12 seconds.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '35',
				'weapon-damage-for': '12',
			},
		},
		'rain-of-vengeance~c': {
			name: 'Rain of Vengeance - Anathema',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon a Shadow Beast that drops grenades from the sky for 10 seconds dealing 115% weapon damage.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '115',
				'weapon-damage-for': '10',
			},
		},
		'rain-of-vengeance~d': {
			name: 'Rain of Vengeance - Flying Strike',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'A group of 8 Shadow Beasts plummet from the sky at a targeted location dealing 60% weapon damage each and stunning enemies for 2 seconds.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '480',
				'undefined': '0',
			},
		},
		'rain-of-vengeance~e': {
			name: 'Rain of Vengeance - Stampede',
			desc: 'Cooldown: 30 seconds  Fire a massive volley of arrows around you. Arrows fall from the sky dealing 74.75% weapon damage for 5 seconds to all enemies in the area.',
			rune: 'Summon a wave of 10 Shadow Beasts to tear across the ground, knocking back enemies and dealing 75% weapon damage each.',
			effect: {
				'cooldown': '30',
				'weapon-damage': '750',
				'undefined': '0',
			},
		},
	},
	'monk': {
		'fists-of-thunder': {
			name: 'Fists of Thunder',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'fists-of-thunder~a': {
			name: 'Fists of Thunder - Thunderclap',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Teleport to the target and release an electric shockwave with every punch that hits all enemies within 6 yards of your primary target for 35% weapon damage as Lightning.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '145',
			},
		},
		'fists-of-thunder~b': {
			name: 'Fists of Thunder - Bounding Light',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Every third punch releases chain lightning instead of knocking enemies back.  Each lightning strike inflicts 73% weapon damage as Lightning.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'fists-of-thunder~c': {
			name: 'Fists of Thunder - Static Charge',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Your primary target is charged with static electricity for 5 seconds and takes 37% weapon damage as Lightning when you attack other enemies with Fists of Thunder.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'fists-of-thunder~d': {
			name: 'Fists of Thunder - Quickening',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Critical Hits generate an additional 15 Spirit.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'fists-of-thunder~e': {
			name: 'Fists of Thunder - Lightning Flash',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of extremely fast punches that deal 110% weapon damage as Lightning. Every third hit deals damage to all enemies in front of you and knocks them back a short distance. Generates Spirit faster than other Spirit-generating skills due to the high attack speed.',
			rune: 'Increases your chance to Dodge by 16% for 2 seconds.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'lashing-tail-kick': {
			name: 'Lashing Tail Kick',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			effect: {
				'weapon-damage': '200',
			},
		},
		'lashing-tail-kick~a': {
			name: 'Lashing Tail Kick - Vulture Claw Kick',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			rune: 'Release a torrent of fire that burns nearby enemies for 220% weapon damage as Fire and causes Knockback.',
			effect: {
				'weapon-damage': '420',
			},
		},
		'lashing-tail-kick~b': {
			name: 'Lashing Tail Kick - Spinning Flame Kick',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			rune: 'Hurl a column of fire that burns through enemies, causing 240% weapon damage as Fire to each enemy it strikes.',
			effect: {
				'weapon-damage': '200',
			},
		},
		'lashing-tail-kick~c': {
			name: 'Lashing Tail Kick - Hand of Ytar',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			rune: 'Attack enemies at long range, slowing the movement speed of affected targets by 80% for 2 seconds.',
			effect: {
				'weapon-damage': '200',
			},
		},
		'lashing-tail-kick~d': {
			name: 'Lashing Tail Kick - Sweeping Armada',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			rune: 'Increases Knockback distance by 150% and slows the movement speed of struck enemies by 60% for 2 seconds.',
			effect: {
				'weapon-damage': '200',
			},
		},
		'lashing-tail-kick~e': {
			name: 'Lashing Tail Kick - Scorpion Sting',
			desc: 'Cost: 30 Spirit  Unleash a deadly roundhouse kick that knocks enemies back and deals 200% weapon damage.',
			rune: 'Enemies have a 50% chance to be stunned for 1.5 seconds instead of being knocked back.',
			effect: {
				'chance-stun': '50',
				'weapon-damage': '200',
			},
		},
		'deadly-reach': {
			name: 'Deadly Reach',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'deadly-reach~a': {
			name: 'Deadly Reach - Foresight',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike increases the damage of all attacks by 18% for 30 seconds.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'deadly-reach~b': {
			name: 'Deadly Reach - Piercing Trident',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'Increases the area of effect of the second and third strikes.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'deadly-reach~c': {
			name: 'Deadly Reach - Scattered Blows',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike is replaced with an attack that will hit up to 6 nearby enemies within 15 yards for 170% weapon damage as Lightning.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '280',
			},
		},
		'deadly-reach~d': {
			name: 'Deadly Reach - Strike from Beyond',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'Critical Hits generate an additional 10 Spirit.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'deadly-reach~e': {
			name: 'Deadly Reach - Keen Eye',
			desc: 'Generate: 6 Spirit per attack  Project lines of pure force over a short distance for 110% weapon damage. Every third hit extends 25 yards.',
			rune: 'The third strike increases your Armor by 50% for 4 seconds.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '110',
			},
		},
		'blinding-flash': {
			name: 'Blinding Flash',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			effect: {
				'cooldown': '15',
			},
		},
		'blinding-flash~a': {
			name: 'Blinding Flash - Faith in the Light',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'For 3 seconds after using Blinding Flash, all of your attacks are empowered to deal 30% additional weapon damage as Holy.',
			effect: {
				'cooldown': '15',
			},
		},
		'blinding-flash~b': {
			name: 'Blinding Flash - Blinding Echo',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: '6 seconds after using Blinding Flash, a second flash of light will blind enemies within 20 yards for 0.5 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'blinding-flash~c': {
			name: 'Blinding Flash - Blinded and Confused',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Blinded enemies have a 25% chance to attack each other.',
			effect: {
				'cooldown': '15',
			},
		},
		'blinding-flash~d': {
			name: 'Blinding Flash - Self Reflection',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Increases the duration enemies are blinded to 4 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'blinding-flash~e': {
			name: 'Blinding Flash - Searing Light',
			desc: 'Cost: 10 Spirit Cooldown: 15 seconds  Create a flash of light that blinds all enemies within 20 yards for 3 seconds. Elite enemies recover faster, but suffer a 30% chance to miss with attacks.',
			rune: 'Increases the chance elite enemies will miss attacks to 60%.',
			effect: {
				'cooldown': '15',
			},
		},
		'tempest-rush': {
			name: 'Tempest Rush',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
		},
		'tempest-rush~a': {
			name: 'Tempest Rush - Bluster',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
			rune: 'Enemies knocked back have their damage reduced by 20% for the duration of the effect.',
		},
		'tempest-rush~b': {
			name: 'Tempest Rush - Tailwind',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
			rune: 'Increases the movement speed of Tempest Rush by 25%.',
		},
		'tempest-rush~c': {
			name: 'Tempest Rush - Slipstream',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
			rune: 'Reduces damage taken while running by 25%.',
		},
		'tempest-rush~d': {
			name: 'Tempest Rush - Northern Breeze',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
			rune: 'Reduces the channeling cost of Tempest Rush to 8 Spirit.',
		},
		'tempest-rush~e': {
			name: 'Tempest Rush - Flurry',
			desc: 'Cost: 15 Spirit plus an additional 10 Spirit while channeling  Charge directly through your enemies, knocking them back and hobbling them, slowing their movement by 60% for 2 seconds. Also deals 50% weapon damage while running.',
			rune: 'Increases the potency of the hobbling effect, slowing enemy movement by 80%.',
		},
		'breath-of-heaven': {
			name: 'Breath of Heaven',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			effect: {
				'cooldown': '15',
			},
		},
		'breath-of-heaven~a': {
			name: 'Breath of Heaven - Circle of Scorn',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Breath of Heaven also sears enemies for 80% weapon damage as Holy.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '80',
			},
		},
		'breath-of-heaven~b': {
			name: 'Breath of Heaven - Circle of Life',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Increases the healing power of Breath of Heaven to 8062.52 - 9675.02 Life.',
			effect: {
				'cooldown': '15',
			},
		},
		'breath-of-heaven~c': {
			name: 'Breath of Heaven - Blazing Wrath',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Breath of Heaven increases the damage of your attacks by 15% for 45 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'breath-of-heaven~d': {
			name: 'Breath of Heaven - Infused with Light',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Gain 6 additional Spirit from Spirit generating attacks for 5 seconds after using Breath of Heaven.',
			effect: {
				'cooldown': '15',
			},
		},
		'breath-of-heaven~e': {
			name: 'Breath of Heaven - Penitent Flame',
			desc: 'Cost: 25 Spirit Cooldown: 15 seconds  A blast of divine energy heals you and all allies within 12 yards for 6201.94 - 7442.33 Life.',
			rune: 'Enemies exposed to Breath of Heaven run away in Fear for 1.5 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'dashing-strike': {
			name: 'Dashing Strike',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'dashing-strike~a': {
			name: 'Dashing Strike - Soaring Skull',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			rune: 'Launch yourself through the air and slow all enemies along your path by 60% for 2 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'dashing-strike~b': {
			name: 'Dashing Strike - Way of the Falling Star',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			rune: 'After striking an enemy, your movement speed is increased 25% for 3 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'dashing-strike~c': {
			name: 'Dashing Strike - Blinding Speed',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			rune: 'Receive a 20% increased chance to Dodge for 3 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'dashing-strike~d': {
			name: 'Dashing Strike - Quicksilver',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			rune: 'Reduces the cost of Dashing Strike to 10 Spirit.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'dashing-strike~e': {
			name: 'Dashing Strike - Flying Side Kick',
			desc: 'Cost: 25 Spirit  Quickly dash at the targeted enemy or location, striking for 100% weapon damage and rooting the target for 1 second.',
			rune: 'Perform a flying kick that has a 60% chance to Stun your target for 1.5 seconds.',
			effect: {
				'chance-stun': '60',
				'weapon-damage': '100',
			},
		},
		'crippling-wave': {
			name: 'Crippling Wave',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			effect: {
				'generate-spirit': '6',
			},
		},
		'crippling-wave~a': {
			name: 'Crippling Wave - Mangle',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Increase damage to 143% weapon damage.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '143',
			},
		},
		'crippling-wave~b': {
			name: 'Crippling Wave - Tsunami',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'The range of Crippling Wave\'s third strike is increased to 17 yards and the effect of the movement speed reduction is increased to 60%.',
			effect: {
				'generate-spirit': '6',
			},
		},
		'crippling-wave~c': {
			name: 'Crippling Wave - Concussion',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Enemies hit by Crippling Wave inflict 20% less damage for 3 seconds.',
			effect: {
				'generate-spirit': '6',
			},
		},
		'crippling-wave~d': {
			name: 'Crippling Wave - Rising Tide',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Critical Hits generate an additional 5 Spirit.',
			effect: {
				'generate-spirit': '6',
			},
		},
		'crippling-wave~e': {
			name: 'Crippling Wave - Breaking Wave',
			desc: 'Generate: 6 Spirit per attack  Unleash a series of large sweeping attacks that cause 110% weapon damage to all enemies in front of you. Every third hit damages all enemies around you and dazes them, slowing their movement speed by 30% and attack speed by 20% for 3 seconds.',
			rune: 'Enemies hit by Crippling Wave take 10% additional damage from all attacks for 3 seconds.',
			effect: {
				'generate-spirit': '6',
			},
		},
		'wave-of-light': {
			name: 'Wave of Light',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			effect: {
				'weapon-damage': '215',
			},
		},
		'wave-of-light~a': {
			name: 'Wave of Light - Wall of Light',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Increases damage of the initial strike to 0% weapon damage as Holy.',
			effect: {
				'weapon-damage': '215',
			},
		},
		'wave-of-light~b': {
			name: 'Wave of Light - Explosive Light',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Release bursts of energy that deal 285% weapon damage as Holy to nearby enemies.',
			effect: {
				'weapon-damage': '500',
			},
		},
		'wave-of-light~c': {
			name: 'Wave of Light - Pillar of the Ancients',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Summon an ancient pillar that deals 210% weapon damage followed by an additional 210% weapon damage after 2 seconds.',
			effect: {
				'weapon-damage': '425',
			},
		},
		'wave-of-light~d': {
			name: 'Wave of Light - Empowered Wave',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Reduces the cost of Wave of Light to 40 Spirit.',
			effect: {
				'weapon-damage': '215',
			},
		},
		'wave-of-light~e': {
			name: 'Wave of Light - Blinding Light',
			desc: 'Cost: 75 Spirit  Focuses a wave of light that crushes enemies for 215% weapon damage as Holy, followed by an additional 45% weapon damage as Holy to all enemies in a line.',
			rune: 'Critical Hits Stun enemies for 3 seconds.',
			effect: {
				'weapon-damage': '215',
			},
		},
		'exploding-palm': {
			name: 'Exploding Palm',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'exploding-palm~a': {
			name: 'Exploding Palm - Impending Doom',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Increases the duration of the Bleed effect to deal 220% weapon damage as Physical over 6 seconds.',
			effect: {
				'weapon-damage': '440',
			},
		},
		'exploding-palm~b': {
			name: 'Exploding Palm - Creeping Demise',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Also reduces your target\'s movement speed by 80%.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'exploding-palm~c': {
			name: 'Exploding Palm - The Flesh is Weak',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Also causes the target to take 12% additional damage for 3 seconds.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'exploding-palm~d': {
			name: 'Exploding Palm - Strong Spirit',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'If the target explodes after bleeding, gain 5 Spirit for each enemy caught in the blast.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'exploding-palm~e': {
			name: 'Exploding Palm - Essence Burn',
			desc: 'Cost: 40 Spirit  Cause a target to Bleed for 220% weapon damage as Physical over 3 seconds. If the target dies while bleeding, it explodes and deals 30% of the target\'s maximum Life as Physical damage to all nearby enemies.',
			rune: 'Instead of bleeding, the target will burn for 250% weapon damage as Fire over 3 seconds. If the target dies while burning, it explodes causing all nearby enemies to burn for 60% weapon damage as Fire over 3 seconds. This effect can happen multiple times.',
			effect: {
				'weapon-damage': '470',
			},
		},
		'cyclone-strike': {
			name: 'Cyclone Strike',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'cyclone-strike~a': {
			name: 'Cyclone Strike - Sunburst',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Changes the blast into an explosion of fire that has a 35% chance to Fear enemies for 1.5 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'cyclone-strike~b': {
			name: 'Cyclone Strike - Implosion',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Increases the distance enemies will be pulled towards you to 34 yards.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'cyclone-strike~c': {
			name: 'Cyclone Strike - Soothing Breeze',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Cyclone Strike heals you and all allies within 24 yards for 1240.39 Life.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'cyclone-strike~d': {
			name: 'Cyclone Strike - Eye of the Storm',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'Reduces the Spirit cost of Cyclone Strike to 30 Spirit.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'cyclone-strike~e': {
			name: 'Cyclone Strike - Wall of Wind',
			desc: 'Cost: 50 Spirit  Pull all enemies within 24 yards towards you, followed by a furious blast of energy that deals 100% weapon damage as Holy.',
			rune: 'After using Cyclone Strike, gain a 20% chance to dodge attacks for 3 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'way-of-the-hundred-fists': {
			name: 'Way of the Hundred Fists',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '140',
			},
		},
		'way-of-the-hundred-fists~a': {
			name: 'Way of the Hundred Fists - Fists of Fury',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Affected targets will take an additional 10% weapon damage per second as Holy for 5 seconds. Also adds a short dash to the first strike.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '140',
			},
		},
		'way-of-the-hundred-fists~b': {
			name: 'Way of the Hundred Fists - Hands of Lightning',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Increases the number of hits in the second strike from 7 to 10.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '140',
			},
		},
		'way-of-the-hundred-fists~c': {
			name: 'Way of the Hundred Fists - Blazing Fists',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Critical Hits increase your attack speed and movement speed by 5% for 5 seconds. This effect can stack up to 3 times.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '140',
			},
		},
		'way-of-the-hundred-fists~d': {
			name: 'Way of the Hundred Fists - Spirited Salvo',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'Every activation of the skill has a 15% chance to generate 15 additional Spirit.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '140',
			},
		},
		'way-of-the-hundred-fists~e': {
			name: 'Way of the Hundred Fists - Windforce Flurry',
			desc: 'Generate: 6 Spirit per attack  Unleash a rapid series of punches that strikes enemies for 140% weapon damage.',
			rune: 'The third strike generates a wave of wind that deals 250% weapon damage as Physical to enemies directly ahead of you.',
			effect: {
				'generate-spirit': '6',
				'weapon-damage': '390',
			},
		},
		'serenity': {
			name: 'Serenity',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			effect: {
				'cooldown': '20',
			},
		},
		'serenity~a': {
			name: 'Serenity - Peaceful Repose',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'When activated, Serenity heals you for 6201.94 - 7752.43 Life.',
			effect: {
				'cooldown': '20',
			},
		},
		'serenity~b': {
			name: 'Serenity - Instant Karma',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'While Serenity is active, 50% of all projectiles and melee attacks are reflected back at the attacker.',
			effect: {
				'cooldown': '20',
			},
		},
		'serenity~c': {
			name: 'Serenity - Ascension',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'Increases the duration of Serenity to 4 seconds.',
			effect: {
				'cooldown': '20',
			},
		},
		'serenity~d': {
			name: 'Serenity - Tranquility',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'Extends the protective shield to allies within 45 yards for 1 second, and makes them immune to control impairing effects like Slow and Frozen.',
			effect: {
				'cooldown': '20',
			},
		},
		'serenity~e': {
			name: 'Serenity - Reap What Is Sown',
			desc: 'Cost: 10 Spirit Cooldown: 20 seconds  You are enveloped in a protective shield that absorbs all incoming damage for 3 seconds and grants immunity to all control impairing effects.',
			rune: 'When Serenity ends, the shield explodes, dealing 30% of the damage absorbed by Serenity as Holy damage to enemies within 20 yards. The damage to each enemy cannot exceed 100% of your maximum Life.',
			effect: {
				'cooldown': '20',
			},
		},
		'seven-sided-strike': {
			name: 'Seven-Sided Strike',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			effect: {
				'cooldown': '30',
			},
		},
		'seven-sided-strike~a': {
			name: 'Seven-Sided Strike - Sudden Assault',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			rune: 'Teleport to the target, increasing damage done to 1008% weapon damage over 7 strikes.',
			effect: {
				'cooldown': '30',
			},
		},
		'seven-sided-strike~b': {
			name: 'Seven-Sided Strike - Several-Sided Strike',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			rune: 'Increases the number of strikes to 9.',
			effect: {
				'cooldown': '30',
			},
		},
		'seven-sided-strike~c': {
			name: 'Seven-Sided Strike - Pandemonium',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			rune: 'Enemies hit by Seven-Sided Strike have a 25% chance to be stunned for 7 seconds by each hit.',
			effect: {
				'cooldown': '30',
				'chance-stun': '25',
			},
		},
		'seven-sided-strike~d': {
			name: 'Seven-Sided Strike - Sustained Attack',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			rune: 'Reduces the cooldown of Seven-Sided Strike to 23 seconds.',
			effect: {
				'cooldown': '30',
			},
		},
		'seven-sided-strike~e': {
			name: 'Seven-Sided Strike - Fulminating Onslaught',
			desc: 'Cost: 50 Spirit Cooldown: 30 seconds  Dash rapidly between nearby enemies, dealing 777% weapon damage over 7 hits.',
			rune: 'Each strike explodes, dealing 111% weapon damage as Holy in a 7 yard radius around the target.',
			effect: {
				'cooldown': '30',
			},
		},
		'mantra-of-evasion': {
			name: 'Mantra of Evasion',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
		},
		'mantra-of-evasion~a': {
			name: 'Mantra of Evasion - Backlash',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Successfully dodging an attack has a chance to create a burst of flame dealing 35% weapon damage as Fire to all nearby enemies.',
			effect: {
				'weapon-damage': '35',
			},
		},
		'mantra-of-evasion~b': {
			name: 'Mantra of Evasion - Perseverance',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also reduces the duration of all control impairing effects like Slow or Frozen by 20%.',
		},
		'mantra-of-evasion~c': {
			name: 'Mantra of Evasion - Hard Target',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also increases Armor by 20%.',
		},
		'mantra-of-evasion~d': {
			name: 'Mantra of Evasion - Wind through the Reeds',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Evasion also increases movement speed by 5%.',
		},
		'mantra-of-evasion~e': {
			name: 'Mantra of Evasion - Divine Protection',
			desc: 'Cost: 50 Spirit  Recite a Mantra that grants you and your allies within 40 yards a 15% chance to dodge attacks for 3 minutes.  For 3 seconds after activation, a second effect grants an additional 15% chance to dodge attacks.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When you or an ally under the effect of Mantra of Evasion is reduced below 25% Life, a shield of protection forms around that target, reducing damage taken by 80% for 3 seconds.   Each target can be protected at most once every 90 seconds by this effect.',
		},
		'sweeping-wind': {
			name: 'Sweeping Wind',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
		},
		'sweeping-wind~a': {
			name: 'Sweeping Wind - Blade Storm',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Intensify the vortex, increasing the damage per stack to 20% weapon damage. This increases the damage with 3 stacks to 60% weapon damage.',
		},
		'sweeping-wind~b': {
			name: 'Sweeping Wind - Fire Storm',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Increases the radius of the vortex to 14 yards and changes the damage dealt to Fire.',
		},
		'sweeping-wind~c': {
			name: 'Sweeping Wind - Cyclone',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'While your vortex is at the maximum stack count, Critical Hits have a chance to spawn a lightning tornado that periodically electrocutes nearby enemies for 20% weapon damage as Lightning. Each spawned lightning tornado lasts 3 seconds.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'sweeping-wind~d': {
			name: 'Sweeping Wind - Inner Storm',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'As long as your vortex is at the maximum stack count, you gain 3 Spirit per second.',
		},
		'sweeping-wind~e': {
			name: 'Sweeping Wind - Master of Wind',
			desc: 'Cost: 75 Spirit  Surround yourself in a vortex that continuously deals 15% weapon damage to all enemies within 10 yards. The vortex lasts 6 seconds and is refreshed each time you strike an enemy with a melee attack. Landing a Critical Hit has a chance to increase the vortex effect up to 2 times for a total of 45% weapon damage to nearby enemies.',
			rune: 'Increases the duration of the vortex to 10 seconds.',
		},
		'mantra-of-retribution': {
			name: 'Mantra of Retribution',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
		},
		'mantra-of-retribution~a': {
			name: 'Mantra of Retribution - Retaliation',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the amount of damage reflected by the Mantra to 60%. The Mantra will now reflect ranged damage as well as melee damage.',
		},
		'mantra-of-retribution~b': {
			name: 'Mantra of Retribution - Transgression',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases attack speed for you and your allies by 8%.',
		},
		'mantra-of-retribution~c': {
			name: 'Mantra of Retribution - Indignation',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When taking damage from the Mantra of Retribution, enemies have a 10% chance to be stunned for 2 seconds.',
			effect: {
				'chance-stun': '10',
			},
		},
		'mantra-of-retribution~d': {
			name: 'Mantra of Retribution - Against All Odds',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'When reflecting damage done to you, Mantra of Retribution has a chance to restore 3 Spirit.',
		},
		'mantra-of-retribution~e': {
			name: 'Mantra of Retribution - Collateral Damage',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to reflect melee damage back at enemies, dealing Holy damage equal to 40% of the damage sustained. The effect lasts for 3 minutes.  For 3 seconds after activation, the effect on you increases to 80% of the damage sustained.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'An attacker that is damaged by Mantra of Retribution has a 30% chance to suffer a feedback blast, dealing 45% weapon damage as Holy to itself and nearby enemies.',
		},
		'inner-sanctuary': {
			name: 'Inner Sanctuary',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			effect: {
				'cooldown': '20',
			},
		},
		'inner-sanctuary~a': {
			name: 'Inner Sanctuary - Forbidden Palace',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary deal 10% additional damage.',
			effect: {
				'cooldown': '20',
			},
		},
		'inner-sanctuary~b': {
			name: 'Inner Sanctuary - Consecration',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'Increases the duration of Inner Sanctuary to 7 seconds.',
			effect: {
				'cooldown': '20',
			},
		},
		'inner-sanctuary~c': {
			name: 'Inner Sanctuary - Circle of Protection',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary take 35% less damage.',
			effect: {
				'cooldown': '20',
			},
		},
		'inner-sanctuary~d': {
			name: 'Inner Sanctuary - Safe Haven',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'You and your allies standing in the area of effect of Inner Sanctuary regenerate 1550.49 Life per second.',
			effect: {
				'cooldown': '20',
			},
		},
		'inner-sanctuary~e': {
			name: 'Inner Sanctuary - Sanctified Ground',
			desc: 'Cost: 30 Spirit Cooldown: 20 seconds  Create a runic circle of protection on the ground for 5 seconds that cannot be passed by enemies.',
			rune: 'When Inner Sanctuary expires, it becomes sanctified ground for 6 seconds, slowing the movement of all enemies that move through it by 60%.',
			effect: {
				'cooldown': '20',
			},
		},
		'mystic-ally': {
			name: 'Mystic Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
		},
		'mystic-ally~a': {
			name: 'Mystic Ally - Fire Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of fire. The ally gains the ability to unleash a flaming kick for 80% weapon damage as Fire plus an additional 40% of your weapon damage per second as Fire for 2 seconds to all enemies in a straight line.',
			effect: {
				'weapon-damage': '80',
			},
		},
		'mystic-ally~b': {
			name: 'Mystic Ally - Water Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of water. The ally gains the ability to perform a wave attack that deals 120% of your weapon damage as Physical and slows the movement of affected targets by 30% for 2 seconds.',
		},
		'mystic-ally~c': {
			name: 'Mystic Ally - Earth Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of earth. Maximum Life for you and the ally is increased by 10%. The ally also gains the ability to create a wave of earth, dealing 60% of your weapon damage as Physical to a single enemy and forcing that enemy to attack the ally for 3 seconds.',
		},
		'mystic-ally~d': {
			name: 'Mystic Ally - Air Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of air. Every attack made by the ally has a 2% chance to generate 100 Spirit for you. In addition, the ally is surrounded in a torrent of wind that deals 10% of your weapon damage per second as Physical to all nearby enemies.',
		},
		'mystic-ally~e': {
			name: 'Mystic Ally - Eternal Ally',
			desc: 'Cost: 25 Spirit  Summon a mystic ally to fight alongside you until it is destroyed. The ally deals 40% of your weapon damage as Physical per swing.',
			rune: 'Imbue the ally with the essence of life. When the ally dies, it has a 50% chance to be reborn after 5 seconds. In addition, the physical damage of the ally\'s basic attack is increased to 44% of your weapon damage per swing.',
		},
		'mantra-of-healing': {
			name: 'Mantra of Healing',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
		},
		'mantra-of-healing~a': {
			name: 'Mantra of Healing - Sustenance',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the Life regeneration granted by Mantra of Healing to 0 Life per second.',
		},
		'mantra-of-healing~b': {
			name: 'Mantra of Healing - Boon of Inspiration',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also heals 186.06 Life when hitting an enemy.',
		},
		'mantra-of-healing~c': {
			name: 'Mantra of Healing - Heavenly Body',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also increases Vitality by 10%.',
		},
		'mantra-of-healing~d': {
			name: 'Mantra of Healing - Circular Breathing',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also regenerates 3 Spirit per second.',
		},
		'mantra-of-healing~e': {
			name: 'Mantra of Healing - Time of Need',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes you and your allies within 40 yards to gain increased Life regeneration by 310.1 Life per second. The Mantra lasts 3 minutes.  For 3 seconds after activation Mantra of Healing shrouds you and your allies with a mystical shield that absorbs up to 930.29 damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Mantra of Healing also increases resistances to all damage types by 20%.',
		},
		'mantra-of-conviction': {
			name: 'Mantra of Conviction',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
		},
		'mantra-of-conviction~a': {
			name: 'Mantra of Conviction - Overawe',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Increases the strength of Mantra of Conviction so that enemies take 24% additional damage and 48% for the first 3 seconds.',
		},
		'mantra-of-conviction~b': {
			name: 'Mantra of Conviction - Submission',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Enemies affected by Mantra of Conviction take 12% weapon damage per second as Holy.',
		},
		'mantra-of-conviction~c': {
			name: 'Mantra of Conviction - Dishearten',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Slows the movement of enemies within 20 yards by 30%.',
		},
		'mantra-of-conviction~d': {
			name: 'Mantra of Conviction - Reclamation',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'You and your allies have a 30% chance to be healed for 279.09 - 341.11 Life when using melee attacks on an enemy under the effects of Mantra of Conviction.',
		},
		'mantra-of-conviction~e': {
			name: 'Mantra of Conviction - Intimidation',
			desc: 'Cost: 50 Spirit  Recite a Mantra that causes all enemies within 20 yards of you to take 12% additional damage. The Mantra lasts 3 minutes.  For 3 seconds after activation, the effect is increased to 24% additional damage.  This is a Mantra. You can only have one Mantra active at a time.',
			rune: 'Enemies affected by Mantra of Conviction deal 10% less damage.',
		},
	},
	'witch-doctor': {
		'poison-dart': {
			name: 'Poison Dart',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'poison-dart~a': {
			name: 'Poison Dart - Flaming Dart',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Ignite the dart so that it deals 160% weapon damage as Fire at once.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'poison-dart~b': {
			name: 'Poison Dart - Splinters',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Shoot 3 Poison Darts that deal 60% weapon damage as Poison each.',
			effect: {
				'weapon-damage': '160',
			},
		},
		'poison-dart~c': {
			name: 'Poison Dart - Numbing Dart',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Toxins in the Poison Dart reduce the target\'s movement speed by 60% for 2 seconds.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'poison-dart~d': {
			name: 'Poison Dart - Spined Dart',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Gain 24.5 Mana every time a Poison Dart hits an enemy.',
			effect: {
				'weapon-damage': '100',
			},
		},
		'poison-dart~e': {
			name: 'Poison Dart - Snake to the Face',
			desc: 'Cost: 9.8 Mana  Shoot a deadly Poison Dart that deals 100% weapon damage as Poison and an additional 40% weapon damage as Poison over 2 seconds.',
			rune: 'Transform your Poison Dart into a snake that has a 30% chance to Stun the enemy for 1.5 seconds.',
			effect: {
				'chance-stun': '30',
				'weapon-damage': '100',
			},
		},
		'grasp-of-the-dead': {
			name: 'Grasp of the Dead',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'grasp-of-the-dead~a': {
			name: 'Grasp of the Dead - Groping Eels',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			rune: 'Increases the damage done to 26% weapon damage as Physical.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'grasp-of-the-dead~b': {
			name: 'Grasp of the Dead - Rain of Corpses',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			rune: 'Corpses fall from the sky, dealing 80% weapon damage as Physical over 8 seconds to nearby enemies.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'grasp-of-the-dead~c': {
			name: 'Grasp of the Dead - Unbreakable Grasp',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			rune: 'Increases the Slow amount to 80%.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'grasp-of-the-dead~d': {
			name: 'Grasp of the Dead - Desperate Grasp',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			rune: 'Reduces the cooldown of Grasp of the Dead to 6 seconds.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'grasp-of-the-dead~e': {
			name: 'Grasp of the Dead - Death Is Life',
			desc: 'Cost: 122.5 Mana Cooldown: 8 seconds  Ghoulish hands reach out from the ground, slowing enemy movement by 60% and dealing 20% weapon damage as Physical for 8 seconds.',
			rune: 'Enemies who die while in the area of Grasp of the Dead have a 5% chance to produce a health globe.',
			effect: {
				'cooldown': '8',
				'weapon-damage': '20',
			},
		},
		'corpse-spiders': {
			name: 'Corpse Spiders',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			effect: {
				'weapon-damage': '16',
			},
		},
		'corpse-spiders~a': {
			name: 'Corpse Spiders - Blazing Spiders',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon fire spiders that deal 21% weapon damage as Fire.',
			effect: {
				'weapon-damage': '37',
			},
		},
		'corpse-spiders~b': {
			name: 'Corpse Spiders - Spider Queen',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon a spider queen that births spiderlings, dealing 16% weapon damage as Poison to enemies in the area. Lasts 15 seconds.  You may only have one spider queen summoned at a time.',
			effect: {
				'weapon-damage': '16',
			},
		},
		'corpse-spiders~c': {
			name: 'Corpse Spiders - Leaping Spiders',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon jumping spiders that leap up to 25 yards to reach their target and attack for 19% weapon damage as Physical.',
			effect: {
				'weapon-damage': '35',
			},
		},
		'corpse-spiders~d': {
			name: 'Corpse Spiders - Widowmakers',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon widowmaker spiders that return 3.5 Mana to you per hit.',
			effect: {
				'weapon-damage': '16',
			},
		},
		'corpse-spiders~e': {
			name: 'Corpse Spiders - Medusa Spiders',
			desc: 'Cost: 4.9 Mana  Throw a jar with 4 spiders that attack nearby enemies for 16% weapon damage as Physical before dying.',
			rune: 'Summon paralyzing spiders that have a 25% chance to Slow enemies\' movement by 60% with every attack.',
			effect: {
				'weapon-damage': '16',
			},
		},
		'summon-zombie-dogs': {
			name: 'Summon Zombie Dogs',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			effect: {
				'cooldown': '60',
			},
		},
		'summon-zombie-dogs~a': {
			name: 'Summon Zombie Dogs - Burning Dogs',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs burst into flames, burning nearby enemies for 2% of your weapon damage as Fire.',
			effect: {
				'cooldown': '60',
			},
		},
		'summon-zombie-dogs~b': {
			name: 'Summon Zombie Dogs - Life Link',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs absorb 10% of all damage done to you.',
			effect: {
				'cooldown': '60',
			},
		},
		'summon-zombie-dogs~c': {
			name: 'Summon Zombie Dogs - Rabid Dogs',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs gain an infectious bite that deals 9% of your weapon damage as Poison over 3 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'summon-zombie-dogs~d': {
			name: 'Summon Zombie Dogs - Final Gift',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs have a 15% chance to leave behind a health globe when they die.',
			effect: {
				'cooldown': '60',
			},
		},
		'summon-zombie-dogs~e': {
			name: 'Summon Zombie Dogs - Leeching Beasts',
			desc: 'Cost: 49 Mana Cooldown: 60 seconds  Summon 3 Zombie Dogs from the depths to fight by your side. Each dog deals 9% of your weapon damage as Physical per hit.',
			rune: 'Your Zombie Dogs heal 50% of the damage they deal as Life divided evenly between themselves and you.',
			effect: {
				'cooldown': '60',
			},
		},
		'firebats': {
			name: 'Firebats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			effect: {
				'weapon-damage': '150',
			},
		},
		'firebats~a': {
			name: 'Firebats - Dire Bats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			rune: 'Summon fewer but larger bats that travel up to 40 yards and hit for 220% weapon damage as Fire.',
			effect: {
				'weapon-damage': '370',
			},
		},
		'firebats~b': {
			name: 'Firebats - Hungry Bats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			rune: 'Rapidly summon bats that seek out nearby enemies for 280% weapon damage as Fire.',
			effect: {
				'weapon-damage': '430',
			},
		},
		'firebats~c': {
			name: 'Firebats - Plague Bats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			rune: 'Diseased bats fly towards the enemy and infect them. Damage is slow at first, but can increase over time to a maximum of 225% weapon damage as Poison.',
			effect: {
				'weapon-damage': '150',
			},
		},
		'firebats~d': {
			name: 'Firebats - Vampire Bats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			rune: 'Gain 3% of damage done by the bats as Life.',
			effect: {
				'weapon-damage': '150',
			},
		},
		'firebats~e': {
			name: 'Firebats - Cloud of Bats',
			desc: 'Cost: 122.5 Mana  Call forth a swarm of fiery bats to burn enemies in front of you for 150% weapon damage as Fire.',
			rune: 'Call forth a swirl of bats that damage nearby enemies for 195% weapon damage as Fire. The damage of the bats increases by 10% every second, up to a maximum of 50%.',
			effect: {
				'weapon-damage': '345',
			},
		},
		'horrify': {
			name: 'Horrify',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			effect: {
				'cooldown': '20',
			},
		},
		'horrify~a': {
			name: 'Horrify - Frightening Aspect',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Gain 100% additional Armor for 8 seconds after casting Horrify.',
			effect: {
				'cooldown': '20',
			},
		},
		'horrify~b': {
			name: 'Horrify - Face of Death',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases the radius of Horrify to 24 yards.',
			effect: {
				'cooldown': '20',
			},
		},
		'horrify~c': {
			name: 'Horrify - Phobia',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases the duration horrified enemies run in Fear to 6 seconds.',
			effect: {
				'cooldown': '20',
			},
		},
		'horrify~d': {
			name: 'Horrify - Ruthless Terror',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Gain 26.95 Mana for every horrified enemy.',
			effect: {
				'cooldown': '20',
			},
		},
		'horrify~e': {
			name: 'Horrify - Stalker',
			desc: 'Cost: 36.75 Mana Cooldown: 20 seconds  Don a spectral mask that horrifies all enemies within 12 yards, causing them to run in Fear for 4 seconds.',
			rune: 'Increases movement speed by 20% for 4 seconds after casting Horrify.',
			effect: {
				'cooldown': '20',
			},
		},
		'soul-harvest': {
			name: 'Soul Harvest',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'soul-harvest~a': {
			name: 'Soul Harvest - Siphon',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Gain 2170.68 Life for every enemy harvested.',
			effect: {
				'cooldown': '15',
			},
		},
		'soul-harvest~b': {
			name: 'Soul Harvest - Soul to Waste',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Increase the duration of Soul Harvest\'s effect to 60 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'soul-harvest~c': {
			name: 'Soul Harvest - Languish',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Reduces the movement speed of harvested enemies by 60% for 3 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'soul-harvest~d': {
			name: 'Soul Harvest - Swallow Your Soul',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Gain 39.2 Mana for every enemy harvested.',
			effect: {
				'cooldown': '15',
			},
		},
		'soul-harvest~e': {
			name: 'Soul Harvest - Vengeful Spirit',
			desc: 'Cost: 58.8 Mana Cooldown: 15 seconds  Feed on the life force of up to 5 enemies within 16 yards. Gain 10 Intelligence for each affected enemy. This effect lasts 30 seconds.',
			rune: 'Harvested enemies also take 70% weapon damage as Physical.',
			effect: {
				'cooldown': '15',
			},
		},
		'plague-of-toads': {
			name: 'Plague of Toads',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			effect: {
				'weapon-damage': '130',
			},
		},
		'plague-of-toads~a': {
			name: 'Plague of Toads - Explosive Toads',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Mutate to fire bullfrogs that explode for 169% weapon damage as Fire.',
			effect: {
				'weapon-damage': '299',
			},
		},
		'plague-of-toads~b': {
			name: 'Plague of Toads - Rain of Toads',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Cause toads to rain from the sky that deal 130% weapon damage as Poison to enemies in the area over 2 seconds.',
			effect: {
				'weapon-damage': '260',
			},
		},
		'plague-of-toads~c': {
			name: 'Plague of Toads - Toad of Hugeness',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Summon a giant toad that swallows enemies whole for up to 5 seconds, digesting for 0% of your weapon damage per second as Physical. Adds a 5 second cooldown to Plague of Toads.',
			effect: {
				'weapon-damage': '130',
			},
		},
		'plague-of-toads~d': {
			name: 'Plague of Toads - Toad Affinity',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Removes the Mana cost of Plague of Toads.',
			effect: {
				'weapon-damage': '130',
			},
		},
		'plague-of-toads~e': {
			name: 'Plague of Toads - Addling Toads',
			desc: 'Cost: 34.3 Mana  Release a handful of toads that deal 130% weapon damage as Poison to enemies they come in contact with.',
			rune: 'Mutate to yellow frogs that deal 130% weapon damage as Poison and have a 15% chance to Confuse affected enemies for 4 seconds.',
			effect: {
				'weapon-damage': '260',
			},
		},
		'haunt': {
			name: 'Haunt',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
		},
		'haunt~a': {
			name: 'Haunt - Consuming Spirit',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'The spirit returns 155.05 Life per second.',
		},
		'haunt~b': {
			name: 'Haunt - Lingering Spirit',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'If there are no targets left, the spirit will linger for up to 10 seconds looking for new enemies.',
		},
		'haunt~c': {
			name: 'Haunt - Grasping Spirit',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'Slow the movement of haunted targets by 30%.',
		},
		'haunt~d': {
			name: 'Haunt - Draining Spirit',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'The spirit returns 10.21 Mana per second.',
		},
		'haunt~e': {
			name: 'Haunt - Resentful Spirit',
			desc: 'Cost: 98 Mana  Haunt an enemy with a spirit, dealing 575% weapon damage as Arcane over 12 seconds. If the target dies, the spirit will haunt another nearby enemy.',
			rune: 'Summon a vengeful spirit that does 288% weapon damage as Arcane over 2 seconds.',
			effect: {
				'weapon-damage': '288',
			},
		},
		'sacrifice': {
			name: 'Sacrifice',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
		},
		'sacrifice~a': {
			name: 'Sacrifice - Provoke the Pack',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Each sacrificed Zombie Dog increases your damage by 5% for 30 seconds.',
		},
		'sacrifice~b': {
			name: 'Sacrifice - For the Master',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Gain 6201.94 Life for each Zombie Dog you sacrifice.',
		},
		'sacrifice~c': {
			name: 'Sacrifice - Black Blood',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Ichor erupts from the corpses of the Zombie Dogs and Slows enemies by 60% for 8 seconds.',
		},
		'sacrifice~d': {
			name: 'Sacrifice - Pride',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Regain 294 Mana for each Zombie Dog you sacrifice.',
		},
		'sacrifice~e': {
			name: 'Sacrifice - Next of Kin',
			desc: 'Banish your Zombie Dogs and cause them to explode, each dealing 275% of your weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Each Zombie Dog you sacrifice has a 35% chance to resurrect as a new Zombie Dog.',
		},
		'zombie-charger': {
			name: 'Zombie Charger',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			effect: {
				'weapon-damage': '205',
			},
		},
		'zombie-charger~a': {
			name: 'Zombie Charger - Zombie Bears',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon zombie bears that stampede towards your target. Each bear deals 236% weapon damage as Poison to enemies in the area.',
			effect: {
				'weapon-damage': '205',
			},
		},
		'zombie-charger~b': {
			name: 'Zombie Charger - Wave of Zombies',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon 3 Zombie Chargers that each deal 72% weapon damage as Poison.',
			effect: {
				'weapon-damage': '277',
			},
		},
		'zombie-charger~c': {
			name: 'Zombie Charger - Leperous Zombie',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'The Zombie Charger leaves behind a cloud of noxious vapors that deals 25% weapon damage as Poison to enemies caught in it.',
			effect: {
				'weapon-damage': '230',
			},
		},
		'zombie-charger~d': {
			name: 'Zombie Charger - Undeath',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'If the Zombie Charger kills any enemies, it will reanimate and charge nearby enemies for 205% weapon damage as Poison. This effect can repeat up to 2 times.',
			effect: {
				'weapon-damage': '410',
			},
		},
		'zombie-charger~e': {
			name: 'Zombie Charger - Explosive Beast',
			desc: 'Cost: 139.65 Mana  Call forth a reckless, suicidal zombie that deals 205% weapon damage as Poison to all enemies in its path before decomposing.',
			rune: 'Summon an explosive Zombie Dog that streaks toward your target before exploding, dealing 236% weapon damage as Fire to all enemies within 9 yards.',
			effect: {
				'weapon-damage': '441',
			},
		},
		'spirit-walk': {
			name: 'Spirit Walk',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			effect: {
				'cooldown': '15',
			},
		},
		'spirit-walk~a': {
			name: 'Spirit Walk - Severance',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Damage enemies you walk through in spirit form for 100% weapon damage as Physical.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '100',
			},
		},
		'spirit-walk~b': {
			name: 'Spirit Walk - Jaunt',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Increases the duration of Spirit Walk to 3 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'spirit-walk~c': {
			name: 'Spirit Walk - Umbral Shock',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'When Spirit Walk ends, your physical body erupts for 85% weapon damage as Fire to all enemies within 10 yards.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '85',
			},
		},
		'spirit-walk~d': {
			name: 'Spirit Walk - Honored Guest',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Gain 15% of your maximum Mana every second while Spirit Walk is active.',
			effect: {
				'cooldown': '15',
			},
		},
		'spirit-walk~e': {
			name: 'Spirit Walk - Healing Journey',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Leave your physical body and enter the spirit realm for 2 seconds. While in the spirit realm, your movement is unhindered.  Your link to the spirit realm will end if your physical body sustains 50% of your maximum Life in damage.',
			rune: 'Gain 7% of your maximum Life every second while Spirit Walk is active.',
			effect: {
				'cooldown': '15',
			},
		},
		'spirit-barrage': {
			name: 'Spirit Barrage',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			effect: {
				'weapon-damage': '190',
			},
		},
		'spirit-barrage~a': {
			name: 'Spirit Barrage - Phlebotomize',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			rune: 'Regain 3% of damage dealt with Spirit Barrage as Life.',
			effect: {
				'weapon-damage': '190',
			},
		},
		'spirit-barrage~b': {
			name: 'Spirit Barrage - Well of Souls',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			rune: 'An additional 3.3333333333333 spirits seek out other targets and deal 30% weapon damage as Physical.',
			effect: {
				'weapon-damage': '220',
			},
		},
		'spirit-barrage~c': {
			name: 'Spirit Barrage - Phantasm',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			rune: 'Summon a spectre for 5 seconds that deals 45% weapon damage as Physical to all enemies within 10 yards.',
			effect: {
				'weapon-damage': '235',
			},
		},
		'spirit-barrage~d': {
			name: 'Spirit Barrage - The Spirit Is Willing',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			rune: 'Gain 44.1 Mana every time Spirit Barrage hits.',
			effect: {
				'weapon-damage': '190',
			},
		},
		'spirit-barrage~e': {
			name: 'Spirit Barrage - Manitou',
			desc: 'Cost: 107.8 Mana  Bombard a target with a spirit blast that deals 190% weapon damage as Physical.',
			rune: 'Summon a spectre for 20 seconds that hovers over you, unleashing spirit bolts at nearby enemies for 28% weapon damage as Physical.',
			effect: {
				'weapon-damage': '218',
			},
		},
		'gargantuan': {
			name: 'Gargantuan',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			effect: {
				'cooldown': '60',
			},
		},
		'gargantuan~a': {
			name: 'Gargantuan - Restless Giant',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			rune: 'When the Gargantuan encounters an elite enemy or is near 5 enemies, it enrages for 15 seconds gaining:   20% movement speed   35% attack speed   200% Physical damage  This effect cannot occur more than once every 120 seconds. Elite enemies include champions, rares, bosses, and other players.',
			effect: {
				'cooldown': '60',
			},
		},
		'gargantuan~b': {
			name: 'Gargantuan - Humongoid',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			rune: 'The Gargantuan gains the Cleave ability, allowing its attacks to hit multiple targets for 33% of your weapon damage as Physical.',
			effect: {
				'cooldown': '60',
			},
		},
		'gargantuan~c': {
			name: 'Gargantuan - Big Stinker',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			rune: 'The Gargantuan is surrounded by a poison cloud that deals 15% weapon damage as Poison per second to nearby enemies.',
			effect: {
				'cooldown': '60',
				'weapon-damage': '15',
			},
		},
		'gargantuan~d': {
			name: 'Gargantuan - Wrathful Protector',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			rune: 'Summon a more powerful Gargantuan that only lasts for 15 seconds. The Gargantuan\'s fists burn with fire, dealing 55% of your weapon damage as Fire and knocking enemies back.',
			effect: {
				'cooldown': '60',
			},
		},
		'gargantuan~e': {
			name: 'Gargantuan - Bruiser',
			desc: 'Cost: 147 Mana Cooldown: 60 seconds  Summon a Gargantuan zombie to fight for you. The Gargantuan attacks for 25% of your weapon damage as Physical.',
			rune: 'The Gargantuan gains the ability to periodically slam enemies, dealing 100% of your weapon damage as Physical and stunning them for 3 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'locust-swarm': {
			name: 'Locust Swarm',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
		},
		'locust-swarm~a': {
			name: 'Locust Swarm - Searing Locusts',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Engulf the target with burning locusts that deal 472% weapon damage as Fire over 8 seconds.',
			effect: {
				'weapon-damage': '472',
			},
		},
		'locust-swarm~b': {
			name: 'Locust Swarm - Pestilence',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Locust Swarm has a 100% chance to jump to two additional targets instead of one.',
		},
		'locust-swarm~c': {
			name: 'Locust Swarm - Cloud of Insects',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Increases the duration of the swarm to 10 seconds.',
		},
		'locust-swarm~d': {
			name: 'Locust Swarm - Devouring Swarm',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Gain 36.75 Mana for every enemy affected by the swarm.',
		},
		'locust-swarm~e': {
			name: 'Locust Swarm - Diseased Swarm',
			desc: 'Cost: 196 Mana  Unleash a plague of locusts that swarms an enemy, dealing 360% weapon damage as Poison over 8 seconds. The locusts will jump to additional nearby enemies.',
			rune: 'Enemies killed by Locust Swarm leave behind a cloud of locusts that deal 25% weapon damage as Poison. This cloud of locusts lingers for 3 seconds.',
			effect: {
				'weapon-damage': '25',
			},
		},
		'firebomb': {
			name: 'Firebomb',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			effect: {
				'weapon-damage': '85',
			},
		},
		'firebomb~a': {
			name: 'Firebomb - Ghost Bomb',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'In addition to the base explosion, the skull creates a larger blast that deals an additional 20% weapon damage as Fire to all enemies within 28 yards.',
			effect: {
				'weapon-damage': '85',
			},
		},
		'firebomb~b': {
			name: 'Firebomb - Roll the Bones',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Allows the skull to bounce up to 2 times.',
			effect: {
				'weapon-damage': '85',
			},
		},
		'firebomb~c': {
			name: 'Firebomb - Fire Pit',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'The explosion creates a pool of fire that deals 8% weapon damage per second as Fire for 3 seconds.',
			effect: {
				'weapon-damage': '93',
			},
		},
		'firebomb~d': {
			name: 'Firebomb - Pyrogeist',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Create a column of flame that spews fire at the closest enemy for 140% weapon damage as Fire over 3 seconds.',
			effect: {
				'weapon-damage': '225',
			},
		},
		'firebomb~e': {
			name: 'Firebomb - Flash Fire',
			desc: 'Cost: 9.8 Mana  Lob an explosive skull that deals 85% weapon damage as Fire to all enemies within 8 yards.',
			rune: 'Rather than exploding for area damage, each Firebomb can bounce to up to 6 additional targets. Damage is reduced by 15% per bounce.',
			effect: {
				'weapon-damage': '85',
			},
		},
		'hex': {
			name: 'Hex',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			effect: {
				'cooldown': '15',
			},
		},
		'hex~a': {
			name: 'Hex - Painful Transformation',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hex causes the target to Bleed for 12% weapon damage as Physical.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '12',
			},
		},
		'hex~b': {
			name: 'Hex - Angry Chicken',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Transform into an angry chicken for up to 5 seconds that can explode for 215% weapon damage as Physical to all enemies within 12 yards.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '215',
			},
		},
		'hex~c': {
			name: 'Hex - Unstable Form',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hexed targets explode when killed, dealing 135% weapon damage as Poison to all enemies within 8 yards.',
			effect: {
				'cooldown': '15',
			},
		},
		'hex~d': {
			name: 'Hex - Hedge Magic',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'The Fetish Shaman will periodically heal allies for 1860.58 Life.',
			effect: {
				'cooldown': '15',
			},
		},
		'hex~e': {
			name: 'Hex - Jinx',
			desc: 'Cost: 49 Mana Cooldown: 15 seconds  Summon a Fetish Shaman for 12 seconds that will hex enemies into chickens. Hexed enemies are unable to perform offensive actions and take 10% additional damage.',
			rune: 'Hexed targets take 20% additional damage.',
			effect: {
				'cooldown': '15',
			},
		},
		'acid-cloud': {
			name: 'Acid Cloud',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
		},
		'acid-cloud~a': {
			name: 'Acid Cloud - Corpse Bomb',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Raise a corpse from the ground that explodes for 200% weapon damage as Poison to enemies in the area.',
			effect: {
				'weapon-damage': '200',
			},
		},
		'acid-cloud~b': {
			name: 'Acid Cloud - Acid Rain',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Increases the initial area of effect of Acid Cloud to 24 yards.',
		},
		'acid-cloud~c': {
			name: 'Acid Cloud - Lob Blob Bomb',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'The acid on the ground forms into a slime that irradiates nearby enemies for 25% weapon damage as Poison. The slime dissipates after 5 seconds.',
			effect: {
				'weapon-damage': '25',
			},
		},
		'acid-cloud~d': {
			name: 'Acid Cloud - Slow Burn',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Increases the duration of the acid pools left behind to 6 seconds.',
		},
		'acid-cloud~e': {
			name: 'Acid Cloud - Kiss of Death',
			desc: 'Cost: 171.5 Mana  Cause acid to rain down, dealing an initial 100% weapon damage as Poison, followed by 75% weapon damage as Poison over 3 seconds to enemies who remain in the area.',
			rune: 'Spit a cloud of acid that inflicts 110% weapon damage as Poison, followed by 84% weapon damage as Poison to enemies who remain in the area.',
		},
		'mass-confusion': {
			name: 'Mass Confusion',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'mass-confusion~a': {
			name: 'Mass Confusion - Paranoia',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'All enemies in the area of Mass Confusion take 20% additional damage for 12 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'mass-confusion~b': {
			name: 'Mass Confusion - Mass Hysteria',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Up to 6 enemies who aren\'t Confused are Stunned for 3 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'mass-confusion~c': {
			name: 'Mass Confusion - Mass Hallucination',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Amid the confusion, a giant spirit rampages through enemies, dealing 22% weapon damage per second as Physical to enemies it passes through.',
			effect: {
				'cooldown': '60',
			},
		},
		'mass-confusion~d': {
			name: 'Mass Confusion - Unstable Realm',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Reduces the cooldown of Mass Confusion to 45 seconds.',
			effect: {
				'cooldown': '60',
			},
		},
		'mass-confusion~e': {
			name: 'Mass Confusion - Devolution',
			desc: 'Cost: 73.5 Mana Cooldown: 60 seconds  Incite paranoia in enemies, confusing them and causing some to fight for you for 12 seconds.',
			rune: 'Enemies killed while Confused have a 50% chance of spawning a Zombie Dog.',
			effect: {
				'cooldown': '60',
			},
		},
		'big-bad-voodoo': {
			name: 'Big Bad Voodoo',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'big-bad-voodoo~a': {
			name: 'Big Bad Voodoo - Slam Dance',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The Fetish increases the damage of all nearby allies by 30%.',
			effect: {
				'cooldown': '120',
			},
		},
		'big-bad-voodoo~b': {
			name: 'Big Bad Voodoo - Jungle Drums',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'Increases the duration of the ritual to 30 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'big-bad-voodoo~c': {
			name: 'Big Bad Voodoo - Ghost Trance',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The ritual heals all nearby allies for 5% of their maximum Life per second.',
			effect: {
				'cooldown': '120',
			},
		},
		'big-bad-voodoo~d': {
			name: 'Big Bad Voodoo - Rain Dance',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'The ritual restores 122.5 Mana per second while standing in the ritual area.',
			effect: {
				'cooldown': '120',
			},
		},
		'big-bad-voodoo~e': {
			name: 'Big Bad Voodoo - Boogie Man',
			desc: 'Cooldown: 120 seconds  Conjure a Fetish that begins a ritual dance that increases the attack speed and movement speed of all nearby allies by 20% for 20 seconds.',
			rune: 'Enemies who die in the ritual area have a 50% chance to resurrect as a Zombie Dog.',
			effect: {
				'cooldown': '120',
			},
		},
		'wall-of-zombies': {
			name: 'Wall of Zombies',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '80',
			},
		},
		'wall-of-zombies~a': {
			name: 'Wall of Zombies - Creepers',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			rune: 'Up to 3.3333333333333 zombies will emerge from the ground and attack nearby enemies for 25% of your weapon damage as Physical per attack.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '80',
			},
		},
		'wall-of-zombies~b': {
			name: 'Wall of Zombies - Barricade',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			rune: 'Increases the width of the Wall of Zombies. The zombies will attack for 80% weapon damage as Physical.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '160',
			},
		},
		'wall-of-zombies~c': {
			name: 'Wall of Zombies - Dead Rush',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			rune: 'Zombies crawl out of the ground and run in all directions, dealing 445% weapon damage as Physical to nearby enemies.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '80',
			},
		},
		'wall-of-zombies~d': {
			name: 'Wall of Zombies - Unrelenting Grip',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			rune: 'Your Wall of Zombies will Slow the movement of enemies by 60% for 5 seconds.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '80',
			},
		},
		'wall-of-zombies~e': {
			name: 'Wall of Zombies - Pile On',
			desc: 'Cost: 102.9 Mana Cooldown: 25 seconds  Raise a line of zombies from the ground that attacks nearby enemies for 80% weapon damage as Physical for 5 seconds.',
			rune: 'Summon a tower of zombies that falls over, dealing 765% weapon damage as Physical to any enemies it hits and knocks them back.',
			effect: {
				'cooldown': '25',
				'weapon-damage': '80',
			},
		},
		'fetish-army': {
			name: 'Fetish Army',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			effect: {
				'cooldown': '120',
			},
		},
		'fetish-army~a': {
			name: 'Fetish Army - Fetish Ambush',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Each Fetish deals 250% weapon damage as Physical to any nearby enemy as it is summoned.',
			effect: {
				'cooldown': '120',
			},
		},
		'fetish-army~b': {
			name: 'Fetish Army - Legion of Daggers',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Increases number of dagger-wielding Fetishes summoned by 3.',
			effect: {
				'cooldown': '120',
			},
		},
		'fetish-army~c': {
			name: 'Fetish Army - Tiki Torchers',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Summon an additional 2 Fetish casters who breathe fire in a cone in front of them that deals 15% of your weapon damage as Fire.',
			effect: {
				'cooldown': '120',
			},
		},
		'fetish-army~d': {
			name: 'Fetish Army - Devoted Following',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Decreases the cooldown of Fetish Army to 120 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'fetish-army~e': {
			name: 'Fetish Army - Head Hunters',
			desc: 'Cooldown: 120 seconds  Summon an army of dagger-wielding Fetishes to fight by your side for 20 seconds. The Fetishes attack for 20% of your weapon damage as Physical.',
			rune: 'Summon an additional 2 Hunter Fetishes that shoot blowdarts at enemies, dealing 20% of your weapon damage as Poison.',
			effect: {
				'cooldown': '120',
			},
		},
	},
	'wizard': {
		'magic-missile': {
			name: 'Magic Missile',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
		},
		'magic-missile~a': {
			name: 'Magic Missile - Charged Blast',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Increases the damage of Magic Missile to 143% weapon damage as Arcane.',
		},
		'magic-missile~b': {
			name: 'Magic Missile - Split',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Fire 3 missiles that each deal 50% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '50',
			},
		},
		'magic-missile~c': {
			name: 'Magic Missile - Penetrating Blast',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Missiles have a 70% chance to pierce through their target and hit additional enemies.',
		},
		'magic-missile~d': {
			name: 'Magic Missile - Attunement',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Whenever Magic Missile hits a target you gain 4 Arcane Power.',
		},
		'magic-missile~e': {
			name: 'Magic Missile - Seeker',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Launch a missile of magic energy, causing 110% weapon damage as Arcane.',
			rune: 'Missiles track the nearest enemy and their damage is increased to 121% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '121',
			},
		},
		'ray-of-frost': {
			name: 'Ray of Frost',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
		},
		'ray-of-frost~a': {
			name: 'Ray of Frost - Snow Blast',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Using continuously on a single target increases damage over 1.5 seconds to inflict a maximum of 280% weapon damage as Cold.',
		},
		'ray-of-frost~b': {
			name: 'Ray of Frost - Sleet Storm',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Create a swirling storm around you, dealing 215% weapon damage as Cold to all enemies caught within it.',
		},
		'ray-of-frost~c': {
			name: 'Ray of Frost - Numb',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Increase the amount the target\'s movement is slowed to 60% for 3 seconds.',
		},
		'ray-of-frost~d': {
			name: 'Ray of Frost - Cold Blood',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Reduce casting cost to 0 Arcane Power.',
		},
		'ray-of-frost~e': {
			name: 'Ray of Frost - Black Ice',
			desc: 'Cost: 20 Arcane Power  Project a beam of frozen ice that blasts 215% weapon damage as Cold to the first enemy it hits, slowing the target\'s movement by 30% for 3 seconds.',
			rune: 'Enemies killed with Ray of Frost leave behind a patch of ice that deals 195% weapon damage as Cold to enemies moving through it over 3 seconds.',
			effect: {
				'weapon-damage': '195',
			},
		},
		'shock-pulse': {
			name: 'Shock Pulse',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '105',
			},
		},
		'shock-pulse~a': {
			name: 'Shock Pulse - Fire Bolts',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Cast bolts of fire that each deal 137% weapon damage as Fire.',
			effect: {
				'weapon-damage': '242',
			},
		},
		'shock-pulse~b': {
			name: 'Shock Pulse - Living Lightning',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Conjure a being of lightning that drifts forward, electrocuting nearby enemies for 37% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '142',
			},
		},
		'shock-pulse~c': {
			name: 'Shock Pulse - Piercing Orb',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Merge the bolts in a single giant orb that oscillates forward dealing 105% weapon damage as Lightning to everything it hits.',
			effect: {
				'weapon-damage': '105',
			},
		},
		'shock-pulse~d': {
			name: 'Shock Pulse - Lightning Affinity',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Every target hit by a pulse restores 2 Arcane Power.',
			effect: {
				'weapon-damage': '105',
			},
		},
		'shock-pulse~e': {
			name: 'Shock Pulse - Explosive Bolts',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Release a medium range pulse of 3 unpredictable charges of electricity that deal 105% weapon damage as Lightning.',
			rune: 'Slain enemies explode, dealing 70% weapon damage as Lightning to every enemy within 10 yards.',
			effect: {
				'weapon-damage': '105',
			},
		},
		'frost-nova': {
			name: 'Frost Nova',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			effect: {
				'cooldown': '12',
			},
		},
		'frost-nova~a': {
			name: 'Frost Nova - Bone Chill',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Enemies take 15% more damage while frozen or chilled by Frost Nova.',
			effect: {
				'cooldown': '12',
			},
		},
		'frost-nova~b': {
			name: 'Frost Nova - Shatter',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'A frozen enemy that is killed has a 50% chance of releasing another Frost Nova.',
			effect: {
				'cooldown': '12',
			},
		},
		'frost-nova~c': {
			name: 'Frost Nova - Frozen Mist',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Frost Nova no longer freezes enemies, but instead leaves behind a mist of frost that deals 160% weapon damage as Cold over 8 seconds.',
			effect: {
				'cooldown': '12',
				'weapon-damage': '160',
			},
		},
		'frost-nova~d': {
			name: 'Frost Nova - Cold Snap',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'Reduce cooldown of Frost Nova to 12 seconds.',
			effect: {
				'cooldown': '12',
			},
		},
		'frost-nova~e': {
			name: 'Frost Nova - Deep Freeze',
			desc: 'Cooldown: 12 seconds  Blast nearby enemies with an explosion of ice and freeze them for 3 seconds.',
			rune: 'If Frost Nova hits at least 5 targets, you gain a 15% bonus to Critical Hit Chance for 12 seconds.',
			effect: {
				'cooldown': '12',
			},
		},
		'arcane-orb': {
			name: 'Arcane Orb',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
		},
		'arcane-orb~a': {
			name: 'Arcane Orb - Obliteration',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Increase the damage of the explosion to deal 228% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '228',
			},
		},
		'arcane-orb~b': {
			name: 'Arcane Orb - Arcane Nova',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Modify the orb to deal 175% weapon damage as Arcane to all enemies within 20 yards.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-orb~c': {
			name: 'Arcane Orb - Arcane Orbit',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Create 4 Arcane Orbs that orbit you, exploding for 70% weapon damage as Arcane when enemies get close.',
			effect: {
				'weapon-damage': '70',
			},
		},
		'arcane-orb~d': {
			name: 'Arcane Orb - Tap the Source',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'Reduce casting cost to 20 Arcane Power.',
		},
		'arcane-orb~e': {
			name: 'Arcane Orb - Celestial Orb',
			desc: 'Cost: 35 Arcane Power  Hurl an orb of pure energy that explodes when it hits, dealing 175% weapon damage as Arcane to all enemies within 10 yards.',
			rune: 'The orb will pierce through targets, damaging any enemy it passes through.',
		},
		'diamond-skin': {
			name: 'Diamond Skin',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			effect: {
				'cooldown': '15',
			},
		},
		'diamond-skin~a': {
			name: 'Diamond Skin - Mirror Skin',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Reflects 50% of damage absorbed back at the attacker.',
			effect: {
				'cooldown': '15',
			},
		},
		'diamond-skin~b': {
			name: 'Diamond Skin - Enduring Skin',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Increases the duration of Diamond Skin to 8 seconds.',
			effect: {
				'cooldown': '15',
			},
		},
		'diamond-skin~c': {
			name: 'Diamond Skin - Crystal Shell',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Increases the maximum amount of damage absorbed to 21706.79 damage.',
			effect: {
				'cooldown': '15',
			},
		},
		'diamond-skin~d': {
			name: 'Diamond Skin - Prism',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'Reduces Arcane Power cost of all spells by 7 while Diamond Skin is active.',
			effect: {
				'cooldown': '15',
			},
		},
		'diamond-skin~e': {
			name: 'Diamond Skin - Diamond Shards',
			desc: 'Cooldown: 15 seconds  Transform your skin to diamond for 6 seconds, absorbing up to 10853.4 damage from incoming attacks.',
			rune: 'When Diamond Skin wears off, diamond shards explode in all directions dealing 155% weapon damage as Physical to nearby enemies.',
			effect: {
				'cooldown': '15',
			},
		},
		'wave-of-force': {
			name: 'Wave of Force',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'wave-of-force~a': {
			name: 'Wave of Force - Forceful Wave',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Increases damage to 260% weapon damage as Physical, but reduces Knockback.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'wave-of-force~b': {
			name: 'Wave of Force - Exploding Wave',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Enemies hit have a 40% chance to cause a smaller Wave of Force that deals 100% weapon damage as Physical and knocks back enemies caught in its wake.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '300',
			},
		},
		'wave-of-force~c': {
			name: 'Wave of Force - Teleporting Wave',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Enemies caught in the Wave of Force have a 100% chance to be randomly teleported.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'wave-of-force~d': {
			name: 'Wave of Force - Force Affinity',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Reduce casting cost to 0 Arcane Power and the cooldown is reduced to 12 seconds.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'wave-of-force~e': {
			name: 'Wave of Force - Impactful Wave',
			desc: 'Cost: 25 Arcane Power Cooldown: 15 seconds  Discharge a wave of pure energy that repels projectiles and knocks back nearby enemies. This also slows the movement of enemies by 60% and deals 200% weapon damage as Physical.',
			rune: 'Increases the distance enemies are knocked back and Stuns all affected enemies for 2 seconds.',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'spectral-blade': {
			name: 'Spectral Blade',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'spectral-blade~a': {
			name: 'Spectral Blade - Deep Cuts',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Enemies hit by the blade will Bleed for an additional 35% weapon damage over 3 seconds.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'spectral-blade~b': {
			name: 'Spectral Blade - Thrown Blade',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Extends the reach of Spectral Blade to 20 yards.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'spectral-blade~c': {
			name: 'Spectral Blade - Impactful Blades',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Hits have a 5% chance to cause Knockback and Slow the movement of enemies by 60% for 1 second.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'spectral-blade~d': {
			name: 'Spectral Blade - Siphoning Blade',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Every enemy hit grants 1 Arcane Power.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'spectral-blade~e': {
			name: 'Spectral Blade - Healing Blades',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Summon a spectral blade that strikes all enemies in your path for 135% weapon damage.',
			rune: 'Whenever the blades do critical damage, you are healed for 8% of the damage done.',
			effect: {
				'weapon-damage': '135',
			},
		},
		'arcane-torrent': {
			name: 'Arcane Torrent',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-torrent~a': {
			name: 'Arcane Torrent - Disruption',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Targets hit by Arcane Torrent become disrupted for 6 seconds, causing them to take 15% additional damage from any attacks that deal Arcane damage.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-torrent~b': {
			name: 'Arcane Torrent - Cascade',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Enemies killed by Arcane Torrent have a 100% chance to fire a new missile at a nearby enemy dealing 175% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-torrent~c': {
			name: 'Arcane Torrent - Arcane Mines',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Instead of firing projectiles, lay Arcane mines that arm after 2 seconds. These mines explode when an enemy approaches, dealing 150% weapon damage as Arcane. Enemies caught in the explosion have their movement and attack speeds reduced by 30% for 3 seconds.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-torrent~d': {
			name: 'Arcane Torrent - Power Stone',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Every missile hit has a 2% chance to leave behind a Power Stone that grants Arcane Power when picked up.',
			effect: {
				'weapon-damage': '175',
			},
		},
		'arcane-torrent~e': {
			name: 'Arcane Torrent - Death Blossom',
			desc: 'Cost: 20 Arcane Power  Hurl a barrage of arcane projectiles that deal 175% weapon damage as Arcane to all enemies near the impact location.',
			rune: 'Unleash a torrent of power beyond your control. You no longer direct where the projectiles go, but their damage is increased to 670% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '670',
			},
		},
		'energy-twister': {
			name: 'Energy Twister',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			effect: {
				'weapon-damage': '360',
			},
		},
		'energy-twister~a': {
			name: 'Energy Twister - Gale Force',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Increases the damage of Energy Twister to 468% weapon damage as Arcane.',
			effect: {
				'weapon-damage': '360',
			},
		},
		'energy-twister~b': {
			name: 'Energy Twister - Raging Storm',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'When two Energy Twisters collide, they merge into a tornado with increased area of effect that causes 360% weapon damage as Arcane over 6 seconds.',
			effect: {
				'weapon-damage': '360',
			},
		},
		'energy-twister~c': {
			name: 'Energy Twister - Storm Chaser',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Casting Energy Twister grants you a Wind Charge. You can store up to 3 Wind Charges at a time. Casting a Signature spell releases all Wind Charges as a giant Energy Twister that deals 75% weapon damage as Arcane per Wind Charge.  The following skills are Signature spells:  Magic Missile  Shock Pulse  Spectral Blade  Electrocute',
			effect: {
				'weapon-damage': '435',
			},
		},
		'energy-twister~d': {
			name: 'Energy Twister - Mistral Breeze',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Reduces casting cost of Energy Twister to 20 Arcane Power.',
			effect: {
				'weapon-damage': '360',
			},
		},
		'energy-twister~e': {
			name: 'Energy Twister - Wicked Wind',
			desc: 'Cost: 35 Arcane Power  Unleash a twister of pure energy that deals 360% weapon damage as Arcane over 6 seconds to everything in its path.',
			rune: 'Twisters no longer travel but spin in place, dealing 252% weapon damage as Arcane over 6 seconds to everything caught in them.',
			effect: {
				'weapon-damage': '360',
			},
		},
		'ice-armor': {
			name: 'Ice Armor',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
		},
		'ice-armor~a': {
			name: 'Ice Armor - Jagged Ice',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Melee attackers also take 100% weapon damage as Cold.',
		},
		'ice-armor~b': {
			name: 'Ice Armor - Chilling Aura',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Lower the temperature of the air around you. Nearby enemies are chilled, slowing their movement speed by 30%.',
		},
		'ice-armor~c': {
			name: 'Ice Armor - Frozen Storm',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'A whirling storm of ice builds around you that deals 30% weapon damage as Cold over 3 seconds after casting Ice Armor.',
			effect: {
				'weapon-damage': '30',
			},
		},
		'ice-armor~d': {
			name: 'Ice Armor - Crystallize',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Whenever you are struck by a melee attack, your Armor is increased by 15% for 30 seconds. This effect can stack up to 3 times.',
		},
		'ice-armor~e': {
			name: 'Ice Armor - Ice Reflect',
			desc: 'Cost: 25 Arcane Power  Surround yourself in a barrier of ice. Melee attackers are either Chilled or Frozen for 2 seconds. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Melee attacks have a 25% chance to create a Frost Nova centered on the attacker, dealing 75% weapon damage as Cold.',
		},
		'electrocute': {
			name: 'Electrocute',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
		},
		'electrocute~a': {
			name: 'Electrocute - Lightning Blast',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Create streaks of lightning that pierce through targets, hitting all enemies for 80% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '80',
			},
		},
		'electrocute~b': {
			name: 'Electrocute - Chain Lightning',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Increases the maximum number of enemies that can be electrocuted to 6.',
		},
		'electrocute~c': {
			name: 'Electrocute - Arc Lightning',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Blast a cone of lightning that causes 80% weapon damage as Lightning to all affected targets.',
		},
		'electrocute~d': {
			name: 'Electrocute - Surge of Power',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Gain 1 Arcane Power for every enemy hit by Electrocute.',
		},
		'electrocute~e': {
			name: 'Electrocute - Forked Lightning',
			desc: 'This is a Signature spell. Signature spells are free to cast.  Lightning arcs from your fingertips, dealing 80% weapon damage as Lightning. The lightning can jump, hitting up to 2 additional enemies.',
			rune: 'Critical Hits release 4 charged bolts in random directions, dealing 46% weapon damage as Lightning to any targets hit.',
		},
		'slow-time': {
			name: 'Slow Time',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			effect: {
				'cooldown': '20',
			},
		},
		'slow-time~a': {
			name: 'Slow Time - Time Warp',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Enemies caught in the bubble of warped time take 20% more damage.',
			effect: {
				'cooldown': '20',
			},
		},
		'slow-time~b': {
			name: 'Slow Time - Miasma',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Slow Time effects cling to enemies for 3 seconds after they have left the bubble.',
			effect: {
				'cooldown': '20',
			},
		},
		'slow-time~c': {
			name: 'Slow Time - Time Shell',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Reduces the area Slow Time affects to 10 yards, but increases the potency of the movement speed reduction to 80%.',
			effect: {
				'cooldown': '20',
			},
		},
		'slow-time~d': {
			name: 'Slow Time - Perpetuity',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Reduces the cooldown of Slow Time to 16 seconds.',
			effect: {
				'cooldown': '20',
			},
		},
		'slow-time~e': {
			name: 'Slow Time - Stretch Time',
			desc: 'Cooldown: 20 seconds  Invoke a bubble of warped time and space for 8 seconds, reducing enemy attack speed by 20% and movement speed by 30%. This bubble also slows the movement of enemy projectiles by 90%.',
			rune: 'Time is sped up for any allies standing in the area, increasing their attack speed by 10%.',
			effect: {
				'cooldown': '20',
			},
		},
		'storm-armor': {
			name: 'Storm Armor',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			effect: {
				'weapon-damage': '70',
			},
		},
		'storm-armor~a': {
			name: 'Storm Armor - Strike Back',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increase the damage of the shock to 91% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '70',
			},
		},
		'storm-armor~b': {
			name: 'Storm Armor - Scramble',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases your movement speed by 25% for 3 seconds whenever you are hit by melee or ranged attacks.',
			effect: {
				'weapon-damage': '70',
			},
		},
		'storm-armor~c': {
			name: 'Storm Armor - Reactive Armor',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Whenever you are hit, you have a chance to be enveloped with a lightning shield for 6 seconds that shocks nearby enemies for 50% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '120',
			},
		},
		'storm-armor~d': {
			name: 'Storm Armor - Power of the Storm',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Reduce the Arcane Power cost of all skills by 3 while Storm Armor is active.',
			effect: {
				'weapon-damage': '70',
			},
		},
		'storm-armor~e': {
			name: 'Storm Armor - Shocking Aspect',
			desc: 'Cost: 25 Arcane Power  Bathe yourself in electrical energy, shocking ranged and melee attackers for 70% weapon damage as Lightning. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Critical Hits have a chance to electrocute a nearby enemy for 35% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '105',
			},
		},
		'explosive-blast': {
			name: 'Explosive Blast',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			effect: {
				'cooldown': '6',
			},
		},
		'explosive-blast~a': {
			name: 'Explosive Blast - Short Fuse',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Immediately release the energy of Explosive Blast for 225% weapon damage as Physical.',
			effect: {
				'cooldown': '6',
				'weapon-damage': '225',
			},
		},
		'explosive-blast~b': {
			name: 'Explosive Blast - Obliterate',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Increases the explosion radius to 18 yards for 225% weapon damage as Physical.',
			effect: {
				'cooldown': '6',
				'weapon-damage': '225',
			},
		},
		'explosive-blast~c': {
			name: 'Explosive Blast - Time Bomb',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Explosive Blast detonates from the point it was originally cast after 2.5 seconds for 293% weapon damage as Physical.',
			effect: {
				'cooldown': '6',
				'weapon-damage': '293',
			},
		},
		'explosive-blast~d': {
			name: 'Explosive Blast - Unleashed',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'Reduces the casting cost of Explosive Blast to 10 Arcane Power.',
			effect: {
				'cooldown': '6',
			},
		},
		'explosive-blast~e': {
			name: 'Explosive Blast - Chain Reaction',
			desc: 'Cost: 20 Arcane Power Cooldown: 6 seconds  Gather an infusion of energy around you that explodes after 1.5 seconds, causing 225% weapon damage as Physical to all enemies within 12 yards.',
			rune: 'A chain of 3 consecutive explosions cascade off you, each causing 97% weapon damage as Physical.',
			effect: {
				'cooldown': '6',
			},
		},
		'magic-weapon': {
			name: 'Magic Weapon',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
		},
		'magic-weapon~a': {
			name: 'Magic Weapon - Venom',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
			rune: 'Attacks poison enemies, dealing 15% weapon damage as Poison over 3 seconds.',
		},
		'magic-weapon~b': {
			name: 'Magic Weapon - Electrify',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
			rune: 'Attacks have a chance to cause lightning to arc to 3 nearby enemies, dealing 10% weapon damage as Lightning.',
		},
		'magic-weapon~c': {
			name: 'Magic Weapon - Force Weapon',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
			rune: 'Increases the damage bonus of Magic Weapon to 15% damage, and gives up to a 2% chance to Knockback any enemies hit.',
		},
		'magic-weapon~d': {
			name: 'Magic Weapon - Conduit',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
			rune: 'Attacks have a chance to restore 1 Arcane Power.',
		},
		'magic-weapon~e': {
			name: 'Magic Weapon - Blood Magic',
			desc: 'Cost: 25 Arcane Power  Imbue your weapon with magical energy, granting it 10% increased damage. Lasts 5 |4minute:minutes;.',
			rune: 'Attacks recover 2% of damage caused as Life.',
		},
		'hydra': {
			name: 'Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			effect: {
				'weapon-damage': '28',
			},
		},
		'hydra~a': {
			name: 'Hydra - Frost Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Frost Hydra that breathes a short range cone of frost, causing 31% weapon damage as Cold to all enemies in the cone.',
			effect: {
				'weapon-damage': '28',
			},
		},
		'hydra~b': {
			name: 'Hydra - Lightning Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Lightning Hydra that electrocutes enemies for 34% weapon damage as Lightning.',
			effect: {
				'weapon-damage': '62',
			},
		},
		'hydra~c': {
			name: 'Hydra - Venom Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a poison breathing Hydra that leaves a pool of acid that causes 18% weapon damage per second as Poison to enemies who remain in the pool.',
			effect: {
				'weapon-damage': '28',
			},
		},
		'hydra~d': {
			name: 'Hydra - Mammoth Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon a Mammoth Hydra that breathes a river of flame at nearby enemies, dealing 22% weapon damage per second as Fire to enemies caught on the burning ground.',
			effect: {
				'weapon-damage': '28',
			},
		},
		'hydra~e': {
			name: 'Hydra - Arcane Hydra',
			desc: 'Cost: 15 Arcane Power  Summon a multi-headed Hydra for 15 seconds that attacks enemies with bolts of fire dealing 28% weapon damage as Fire. You may only have one Hydra active at a time.',
			rune: 'Summon an Arcane Hydra that spits Arcane Orbs, which explode on impact, causing 28% weapon damage as Arcane to enemies near the explosion.',
			effect: {
				'weapon-damage': '28',
			},
		},
		'disintegrate': {
			name: 'Disintegrate',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
		},
		'disintegrate~a': {
			name: 'Disintegrate - Intensify',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Damage increases slowly over time to inflict a maximum of 201.5% weapon damage as Arcane.',
		},
		'disintegrate~b': {
			name: 'Disintegrate - Convergence',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Increase the width of the beam allowing it to hit more enemies.',
		},
		'disintegrate~c': {
			name: 'Disintegrate - Entropy',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'The beam fractures into a short-ranged cone that deals 178.25% weapon damage as Arcane.',
		},
		'disintegrate~d': {
			name: 'Disintegrate - Chaos Nexus',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'When casting the beam you become charged with energy that spits out at nearby enemies doing 40% weapon damage as Arcane.',
		},
		'disintegrate~e': {
			name: 'Disintegrate - Volatility',
			desc: 'Cost: 20 Arcane Power  Thrust a beam of pure energy forward, dealing 155% weapon damage as Arcane and disintegrating enemies it kills.',
			rune: 'Enemies killed by the beam have a 35% chance to explode causing 395% weapon damage as Arcane to all enemies within 8 yards.',
		},
		'familiar': {
			name: 'Familiar',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'familiar~a': {
			name: 'Familiar - Sparkflint',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			rune: 'Summon a fiery Familiar that increases the damage of all attacks by 12% while Familiar is active.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'familiar~b': {
			name: 'Familiar - Cannoneer',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			rune: 'The Familiar\'s projectiles explode on impact, dealing 20% weapon damage as Arcane to all enemies within 6 yards.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'familiar~c': {
			name: 'Familiar - Dartling',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			rune: 'Summon a lightning Familiar whose projectiles have a 100% chance to pierce through enemies.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'familiar~d': {
			name: 'Familiar - Arcanot',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			rune: 'While the Familiar is active, you regenerate 2 Arcane Power per second.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'familiar~e': {
			name: 'Familiar - Ancient Guardian',
			desc: 'Cost: 20 Arcane Power  Summon a companion that will attack your targets for 20% weapon damage as Arcane. This companion cannot be targeted or damaged by enemies and lasts for 5 |4minute:minutes;.',
			rune: 'Summon a protective Familiar. When you are below 35% Life the Familiar will fully absorb damage from 1 attack every 6 seconds.',
			effect: {
				'weapon-damage': '20',
			},
		},
		'teleport': {
			name: 'Teleport',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			effect: {
				'cooldown': '16',
			},
		},
		'teleport~a': {
			name: 'Teleport - Calamity',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Casts a low power Wave of Force upon arrival, dealing 75% weapon damage as Physical to all nearby enemies.',
			effect: {
				'cooldown': '16',
			},
		},
		'teleport~b': {
			name: 'Teleport - Fracture',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Summon 2 decoys for 8 seconds after teleporting.',
			effect: {
				'cooldown': '16',
			},
		},
		'teleport~c': {
			name: 'Teleport - Safe Passage',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'For 4 seconds after you Teleport, you will take 30% less damage.',
			effect: {
				'cooldown': '16',
			},
		},
		'teleport~d': {
			name: 'Teleport - Reversal',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'Casting Teleport again within 8 seconds will instantly return you to your original location.',
			effect: {
				'cooldown': '16',
			},
		},
		'teleport~e': {
			name: 'Teleport - Wormhole',
			desc: 'Cost: 15 Arcane Power Cooldown: 16 seconds  Teleport through the ether to the selected location up to 35 yards away.',
			rune: 'After casting Teleport, there is a 1 second delay before the cooldown begins, allowing you to Teleport again.',
			effect: {
				'cooldown': '16',
			},
		},
		'mirror-image': {
			name: 'Mirror Image',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			effect: {
				'cooldown': '15',
			},
		},
		'mirror-image~a': {
			name: 'Mirror Image - Mirror Mimics',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Spells cast by your Mirror Images will do 10% of the damage of your own spells.',
			effect: {
				'cooldown': '15',
			},
		},
		'mirror-image~b': {
			name: 'Mirror Image - Duplicates',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Summon 5 Mirror Images that have 0% of your Life each.',
			effect: {
				'cooldown': '15',
			},
		},
		'mirror-image~c': {
			name: 'Mirror Image - Simulacrum',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'Increase the Life of your Mirror Images to 0% of your own.',
			effect: {
				'cooldown': '15',
			},
		},
		'mirror-image~d': {
			name: 'Mirror Image - Extension of Will',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'The duration of your Mirror Images is increased to 7 seconds and their Life is increased to 0% of your Life.',
			effect: {
				'cooldown': '15',
			},
		},
		'mirror-image~e': {
			name: 'Mirror Image - Mocking Demise',
			desc: 'Cooldown: 15 seconds  Summon 2 illusionary duplicates of yourself that last for 7 seconds and have 25% of your Life. The images may cast some of the same spells as you, but those spells deal no damage.',
			rune: 'When a Mirror Image is destroyed, it explodes, doing 45% weapon damage as Physical and has a 50% chance to Stun for 2 seconds.',
			effect: {
				'cooldown': '15',
				'chance-stun': '50',
			},
		},
		'meteor': {
			name: 'Meteor',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			effect: {
				'weapon-damage': '60',
			},
		},
		'meteor~a': {
			name: 'Meteor - Molten Impact',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Increases the damage of the Meteor impact to 260% weapon damage as Fire and the molten fire to 78% weapon damage as Fire over 3 seconds.',
			effect: {
				'weapon-damage': '60',
			},
		},
		'meteor~b': {
			name: 'Meteor - Meteor Shower',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Unleash a volley of 7 smaller Meteors that each strike for 80% weapon damage as Fire.',
			effect: {
				'weapon-damage': '140',
			},
		},
		'meteor~c': {
			name: 'Meteor - Comet',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Transforms the Meteor to ice that deals 240% weapon damage as Cold. The impact site is covered in a freezing mist that deals 72% weapon damage as Cold and Slows enemy movement by 60% over 3 seconds.',
			effect: {
				'weapon-damage': '300',
			},
		},
		'meteor~d': {
			name: 'Meteor - Star Pact',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'Reduces the casting cost of Meteor to 35 Arcane Power and the damage type to Arcane.',
			effect: {
				'weapon-damage': '60',
			},
		},
		'meteor~e': {
			name: 'Meteor - Liquefy',
			desc: 'Cost: 60 Arcane Power  Summon an immense Meteor that plummets from the sky, causing 200% weapon damage as Fire to all enemies it crashes into. The ground it hits is scorched with molten fire that deals 60% weapon damage as Fire over 3 seconds.',
			rune: 'If the initial impact of the Meteor causes a Critical Hit, the molten fire duration is increased to 8 seconds.',
			effect: {
				'weapon-damage': '60',
			},
		},
		'blizzard': {
			name: 'Blizzard',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
		},
		'blizzard~a': {
			name: 'Blizzard - Unrelenting Storm',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Increases the duration of Blizzard to deal 280% weapon damage as Cold over 8 seconds.',
			effect: {
				'weapon-damage': '280',
			},
		},
		'blizzard~b': {
			name: 'Blizzard - Stark Winter',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Increases the size of Blizzard to cover 22 yards, dealing 210% weapon damage as Cold over 6 seconds.',
		},
		'blizzard~c': {
			name: 'Blizzard - Grasping Chill',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'After the Blizzard ends, the ground is covered in a low lying mist for 3 seconds that Slows the movement speed of enemies by 60%.',
		},
		'blizzard~d': {
			name: 'Blizzard - Snowbound',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Reduces the casting cost of Blizzard to 20 Arcane Power.',
		},
		'blizzard~e': {
			name: 'Blizzard - Frozen Solid',
			desc: 'Cost: 45 Arcane Power  Call down shards of ice to pelt an area, dealing 210% weapon damage as Cold to all enemies in the area over 6 seconds. Multiple casts in the same area do not stack.',
			rune: 'Enemies caught in the Blizzard have a 20% chance to be Frozen for 3 seconds.',
		},
		'energy-armor': {
			name: 'Energy Armor',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
		},
		'energy-armor~a': {
			name: 'Energy Armor - Prismatic Armor',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases all of your resistances by 40% while Energy Armor is active.',
		},
		'energy-armor~b': {
			name: 'Energy Armor - Energy Tap',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Rather than decreasing your maximum Arcane Power, Energy Armor increases it by 20 while it is active.',
		},
		'energy-armor~c': {
			name: 'Energy Armor - Force Armor',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'While Energy Armor is active, incoming attacks that would deal more than 35% of your maximum Life are reduced to deal 35% of your maximum Life instead.',
		},
		'energy-armor~d': {
			name: 'Energy Armor - Absorption',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'You have a chance to gain 4 Arcane Power whenever you are hit by a ranged or melee attack.',
		},
		'energy-armor~e': {
			name: 'Energy Armor - Pinpoint Barrier',
			desc: 'Cost: 25 Arcane Power  Focus your energies, increasing your Armor by 65% but decreasing your maximum Arcane Power by 20. Lasts 120 seconds.  This is an Armor spell. Only one Armor spell can be active at a time.',
			rune: 'Increases your chance to critically hit by 5% while Energy Armor is active.',
		},
		'archon': {
			name: 'Archon',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			effect: {
				'cooldown': '120',
			},
		},
		'archon~a': {
			name: 'Archon - Improved Archon',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Increases the damage of all Archon abilities by 25%.',
			effect: {
				'cooldown': '120',
			},
		},
		'archon~b': {
			name: 'Archon - Slow Time',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Archon form can cast Slow Time that lasts for 8 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'archon~c': {
			name: 'Archon - Teleport',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Archon form can now cast Teleport with a cooldown of 10 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'archon~d': {
			name: 'Archon - Pure Power',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'Decreases the cooldown of Archon to 100 seconds.',
			effect: {
				'cooldown': '120',
			},
		},
		'archon~e': {
			name: 'Archon - Arcane Destruction',
			desc: 'Cost: 25 Arcane Power Cooldown: 120 seconds  Transform into a being of pure Arcane energy for 15 seconds. While in Archon form, your normal abilities are replaced by powerful Archon abilities, and your Armor and resistances are increased by 40%. Every enemy killed while in Archon form adds 1 second to the duration of Archon.',
			rune: 'An explosion erupts around you when you transform, causing 450% weapon damage as Arcane to all enemies within 15 yards.',
			effect: {
				'cooldown': '120',
			},
		},
	},
	'enchantress': {
		'charm': {
			name: 'Charm',
			desc: 'Charms an enemy to fight for you for 4 seconds.  Cooldown: 25 seconds',
			effect: {
				'cooldown': '25',
			},
		},
		'forceful-push': {
			name: 'Forceful Push',
			desc: 'Summon an Arcane explosion 8 yards around an enemy, dealing 100% weapon damage as Arcane and knocking back all monsters caught within it.  Cooldown: 10 seconds',
			effect: {
				'cooldown': '10',
			},
		},
		'reflect-missiles': {
			name: 'Reflect Missiles',
			desc: 'Place a shield on the Enchantress and her allies that reflects incoming projectiles for 5 seconds.  Cooldown: 20 seconds',
			effect: {
				'cooldown': '20',
			},
		},
		'powered-armor': {
			name: 'Powered Armor',
			desc: 'Enchantress buffs herself and her allies, increasing Armor by 15%. Attackers are slowed by 30% for 3 seconds.',
		},
		'disorient': {
			name: 'Disorient',
			desc: 'Cast a flash of Confusion on a group of enemies in an area, causing them to stumble around disoriented for 2 seconds.   Cooldown: 45 seconds',
			effect: {
				'cooldown': '45',
			},
		},
		'erosion': {
			name: 'Erosion',
			desc: 'Conjures a pool of energy that deals 50% weapon damage as Arcane  per second. Affected enemies take an extra 15% damage from all attacks for 3 seconds.  Cooldown: 15 seconds',
			effect: {
				'cooldown': '15',
				'weapon-damage': '50',
			},
		},
		'focused-mind': {
			name: 'Focused Mind',
			desc: 'An aura that increases attack speed by 3% for allies within 40 yards.',
		},
		'mass-control': {
			name: 'Mass Control',
			desc: 'The Enchantress lobs a bulb of magical energy at the player that will hex all enemies within 8 yards into chickens for 5 seconds. Hexed enemies are unable to perform offensive actions.  Cooldown: 60 seconds',
			effect: {
				'cooldown': '60',
			},
		},
	},
	'templar': {
		'heal': {
			name: 'Heal',
			desc: 'Heals you or the Templar for 4651.46 Life.  Cooldown: 30 seconds',
			effect: {
				'cooldown': '30',
			},
		},
		'intervene': {
			name: 'Intervene',
			desc: 'Taunts enemies attacking the hero for 3 seconds when the hero is below 50% Life.  Cooldown: 60 seconds',
			effect: {
				'cooldown': '60',
			},
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
			desc: 'Charges a target, dealing 50% weapon damage and stunning all enemies within 8 yards for 2 seconds.  Cooldown: 30 seconds',
			effect: {
				'cooldown': '30',
			},
		},
		'onslaught': {
			name: 'Onslaught',
			desc: 'Delivers a massive blow to an enemy for 200% weapon damage.  Cooldown: 15 seconds',
			effect: {
				'cooldown': '15',
				'weapon-damage': '200',
			},
		},
		'inspire': {
			name: 'Inspire',
			desc: 'Increase resource generation for all allies that the Templar is following. Mana: 2 per second. Arcane Power: 0.5 per second. Hatred: 1 per second. Fury: 8% generated. Spirit: 12% generated.',
		},
		'guardian': {
			name: 'Guardian',
			desc: 'Rush to the aid of wounded ally, knocking back enemies within 15 yards and healing the wounded ally for 4651.46 Life.  Cooldown: 30 seconds',
			effect: {
				'cooldown': '30',
			},
		},
	},
	'scoundrel': {
		'crippling-shot': {
			name: 'Crippling Shot',
			desc: 'Ranged attack that slows the target by 60% for 3 seconds.  Cooldown: 6 seconds',
			effect: {
				'cooldown': '6',
			},
		},
		'poison-bolts': {
			name: 'Poison Bolts',
			desc: 'Ranged attack which deals 40% weapon damage and an additional 40% weapon damage as Poison over 3 seconds.  Cooldown: 6 seconds',
			effect: {
				'cooldown': '6',
			},
		},
		'dirty-fighting': {
			name: 'Dirty Fighting',
			desc: 'Blinds enemies in front of the Scoundrel for 3 seconds.  Cooldown: 30 seconds',
			effect: {
				'cooldown': '30',
			},
		},
		'vanish': {
			name: 'Vanish',
			desc: 'The Scoundrel vanishes in a cloud of smoke when injured, reappearing after 5 seconds. While vanished, he will heal himself for 15504.85 Life.  Cooldown: 30 seconds',
			effect: {
				'cooldown': '30',
			},
		},
		'powered-shot': {
			name: 'Powered Shot',
			desc: 'Powerful ranged attack that explodes on impact, dealing 25% weapon damage as Arcane to targets within 6 yards and has a 50% chance to Stun targets for 2 seconds.  Cooldown: 20 seconds',
			effect: {
				'cooldown': '20',
				'chance-stun': '50',
			},
		},
		'multishot': {
			name: 'Multishot',
			desc: 'The Scoundrel\'s ranged attacks fire 3 bolts at a time.',
		},
		'hysteria': {
			name: 'Hysteria',
			desc: 'Whenever you or the Scoundrel land a Critical Hit, you both will go into hysterics, increasing all damage done by 10% for 3 seconds. This effect cannot occur more than once every 6 seconds.',
		},
		'anatomy': {
			name: 'Anatomy',
			desc: 'Increases Critical Hit Chance by 3% for the Scoundrel and his allies.',
		},
	}
};
console.log(activeSkills);
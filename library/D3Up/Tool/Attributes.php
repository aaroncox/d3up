<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Tool_Attributes 
{
	public static $attributes = array(
		// Base Stats
		'strength' => '+[v] Strength',
		'intelligence' => '+[v] Intelligence',
		'vitality' => '+[v] Vitality',
		'dexterity' => '+[v] Dexterity',
		// Defensive Stats
		'resist-all' => '+[v] Resistance to All Elements',
		'armor' => '+[v] Armor',
		'plus-life' => '+[v]% Life',
		'life-regen' => 'Regenerates [v] Life per Second',
		'plus-block' => '+[v]% Chance to Block',
		'cc-reduce' => 'Reduces the duration of control impairing effects by [v]%',
		'elite-reduce' => 'Reduces damage from elites by [v]%',
		'melee-reduce' => 'Reduces damage from melee attacks by [v]%',
		'range-reduce' => 'Reduces damage from ranged attacks by [v]%',
		'cold-reduce' => 'Reduces damage from Cold attacks by [v]%.',
		'arcane-resist' => '+[v] Arcane Resistance',
		'cold-resist' => '+[v] Cold Resistance',
		'fire-resist' => '+[v] Fire Resistance',
		'lightning-resist' => '+[v] Lightning Resistance',
		'physical-resist' => '+[v] Physical Resistance',
		'poison-resist' => '+[v] Poison Resistance',
		'thorns' => 'Melee attackers take [v] damage per hit',
		// Offensive Stats
		'attack-speed' => 'Attack speed increased by [v]%',
		'plus-aps' => '+[v] Attacks per Second',
		'critical-hit' => 'Critical Hit Chance increased by [v]%',
		'critical-hit-damage' => 'Critical Hit Damage increased by [v]%',
		'plus-damage' => '+[v]% Damage',
		'min-damage' => '+[v] Minimum Damage',
		'max-damage' => '+[v] Maximum Damage',
		'minmax-damage' => '+[v] Damage (Min-Max)',
		'ruby-damage' => '+[v] Minimum and +[v] Maximum Damage',
		// Elemental Damage Percents
		'plus-arcane-damage' => '+[v]% to Arcane Damage',
		'plus-cold-damage' => '+[v]% to Cold Damage',
		'plus-fire-damage' => '+[v]% to Fire Damage',
		'plus-holy-damage' => '+[v]% to Holy Damage',
		'plus-lightning-damage' => '+[v]% to Lightning Damage',
		'plus-poison-damage' => '+[v]% to Poison Damage',
		// Elemental Damage Additions
		'arcane-damage' => '+[v] Arcane Damage',
		'cold-damage' => '+[v] Cold Damage',
		'fire-damage' => '+[v] Fire Damage',
		'holy-damage' => '+[v] Holy Damage',
		'lightning-damage' => '+[v] Lightning Damage',
		'poison-damage' => '+[v] Poison Damage',
		'elite-damage' => 'Increases Damage against Elites by [v]%',
		'demon-damage' => '+[v]% Damage to Demons',
		// Elemental Skill Bonuses
		'plus-arcane-damage-skills' => 'Arcane skills deal [v]% more damage',
		'plus-cold-damage-skills' => 'Cold skills deal [v]% more damage',
		'plus-fire-damage-skills' => 'Fire skills deal [v]% more damage',
		'plus-holy-damage-skills' => 'Holy skills deal [v]% more damage',
		'plus-lightning-damage-skills' => 'Lightning skills deal [v]% more damage',
		'plus-poison-damage-skills' => 'Poison skills deal [v]% more damage',
		// Procs
		'chance-bleed' => '[v]% chance to inflict Bleed for [v] damage over 5 seconds',
		'chance-blind' => '[v]% chance to Blind on Hit',
		'chance-chill' => '[v]% chance to Chill on Hit',
		'chance-fear' => '[v]% chance to Fear on Hit',
		'chance-freeze' => '[v]% chance to Freeze on Hit',
		'chance-immobilize' => '[v]% chance to Immobilize on Hit',
		'chance-knockback' => '[v]% chance to Knockback on Hit',
		'chance-slow' => '[v]% chance to Slow on Hit',
		'chance-stun' => '[v]% chance to Stun on Hit',
		'chance-whirlwind' => 'Chance to occasionally Whirlwind furioulsy.',
		'chance-ball-energy' => 'Chance to hurt a ball of pure energy when attacking.',
		'chance-skeleton' => 'Summons a skeleton when attacked.',
		'chance-reflect-projectiles' => 'Chance to reflect projectiles when hit.',
		'effect-poison-cloud' => 'You are sourrounded by a deadly Posion Cloud.',
		// Etc
		'plus-movement' => '+[v]% Movement Speed',
		'plus-pickup-radius' => 'Increases Gold and Health pickup by [v] yards',
		'plus-experience' => 'Monster kills grant +[v] experience',
		'plus-experience-percent' => 'Increased Experience Rewarded per Kill by [v]%',
		'plus-experience-bonus' => 'Increases Bonus Experience by [v]%',
		'plus-gold-find' => '+[v]% Extra Gold from Monsters',
		'plus-magic-find' => '[v]% Better Chance of finding Magic Items',
		'health-globes' => 'Health Globes and Potions Grant +[v] Life',
		'life-steal' => '[v]% of Damage Dealt is Converted to Life',
		'life-kill' => '+[v] Life after each Kill',
		'life-hit' => 'Each hit adds +[v] Life',
		'level-reduce' => 'Level Requirement reduced by [v]',
		'indestructible' => 'Ignores durability loss',
		// Barbarian
		'bb-bash' => 'Increases bash damage by [v]%',
		'bb-cleave' => 'Increases cleave damage by [v]%',
		'bb-frenzy' => 'Increases frenzy damage by [v]%',
		'bb-rend' => 'Reduces resource cost of Rend by [v] Fury',
		'bb-revenge' => 'Increases Critical Hit Chance of Revenge by [v]%',
		'bb-weapon-throw' => 'Reduces resource cost of Weapon Throw by [v] Fury',
		'bb-hammer-of-the-ancients' => 'Reduces resource cost of Hammer of the Ancients by [v] Fury',
		'bb-whirlwind' => 'Increases Critical Hit Chance of Whirlwind by [v]%',
		'bb-overpower' => 'Increases Critical Hit Chance of Overpower by [v]%',
		'bb-seismic-slam' => 'Increases Critical Hit Chance of Seismic Slam by [v]%',
		'bb-weapon-throw-dmg' => 'Increases Weapon Throw damage by [v]%',
		'bb-ancient-spear-dmg' => 'Increases Ancient Spear damage by [v]%',
		'fury-max' => '+[v] Maximum Fury',
		// Demon Hunter
		'hatred-regen' => 'Increases Hatred Regeneration by [v] per Second',
		'max-discipline' => '+[v] Maximum Discipline',
		'dh-chakram' => 'Reduces resource cost of Chakram by [v] Hatred',
		'dh-evasive-fire' => 'Increases Evasive Fire damage by [v]%',
		'dh-grenades' => 'Increases Grenades Damage by [v]%',
		'dh-impale' => 'Reduces resource cost of Impale by [v] Hatred',
		'dh-spike-trap' => 'Increases Spike Trap damage by [v]%',
		'dh-bola-shot' => 'Increases Bola Shot damage by [v]%',
		'dh-elemental-arrow' => 'Increases Elemental Arrow damage by [v]%',
		'dh-entangling-shot' => 'Increases Entangling Shot damage by [v]%',
		'dh-hungering-arrow' => 'Increases Hungering Arrow damage by [v]%',
		'dh-multishot' => 'Increases Critical Hit Chance of Multishot by [v]%',
		'dh-rapid-fire' => 'Increases Critical Hit Chance of Rapid Fire by [v]%',
		'dh-cluster-arrow' => 'Reduces resource cost of Cluster Arrow by [v] Hatred',
		'dh-strafe' => 'Increases Critical Hit Chance of Strafe by [v]%',
		// Monk
		'spirit-spent-life' => 'Gain [v] Life per Spirit Spent',
		'spirit-regen' => 'Increases Spirit Regeneration by [v] per Second',
		'mk-crippling-wave' => 'Increases Crippling Wave damage by [v]%',
		'mk-cyclone-strike' => 'Reduces resource cost of Cyclone Strike by [v] Spirit',
		'mk-deadly-reach' => 'Increases Deadly Reach damage by [v]%',
		'mk-exploding-palm' => 'Increases Exploding Palm damage by [v]%',
		'mk-fists-of-thunder' => 'Increases Fist of Thunder damage by [v]%',
		'mk-sweeping-wind' => 'Increases Sweeping Wind damage by [v]%',
		'mk-sweeping-wind-cost' => 'Reduces resource cost of Sweeping Wind by [v] Spirit.',
		'mk-way-of-the-hundred-fists' => 'Increases Way of the Hundred Fists damage by [v]%',
		'mk-lashing-tail-kick' => 'Reduces resource cost of Lashing Tail Kick by [v] Spirit',
		'mk-tempest-rush' => 'Increases Critical Hit Chance of Tempest Rush by [v]%',
		'mk-wave-of-light' => 'Increases Critical Hit Chance of Wave of Light by [v]%',
		// Witch Doctor
		'mana-regen' => 'Increases Mana Regeneration by [v] per Second',
		'mana-max' => '+[v] Maximum Mana',
		'wd-firebomb' => 'Reduces resource cost of Firebomb by [v] Mana',
		'wd-haunt' => 'Increases Haunt Damage by [v]%',
		'wd-acid-cloud' => 'Increases Critical Hit Chance of Acid Clouds by [v]%',
		'wd-firebats' => 'Reduces resource cost of Firebats by [v] Mana',
		'wd-zombie-dogs' => 'Reduces cooldown of Summon Zombie Dogs by [v] Seconds',
		'wd-plague-of-toads' => 'Increases Plague of Toads damage by [v]%',
		'wd-poison-darts' => 'Increaeses Poison Darts damage by [v]%',
		'wd-spirit-barrage' => 'Increases Spirit Barrage damage by [v]%',
		'wd-wall-of-zombies' => 'Reduces cooldown of Wall of Zombies by [v] Seconds',
		'wd-zombie-charger' => 'Reduces resource cost of Zombie Charger by [v] Mana',
		'wd-gargantuan' => 'Reduces cooldown of Gargantuan by [v] seconds',
		// Wizard
		'ap-on-crit' => 'Critical Hits grant [v] Arcane Power',
		'ap-max' => '+[v] Maximum Arcane Power',
		'ap-regen' => 'Increases Arcane Power regeneration by [v] per second.',
		'wz-arcane-torrent' => 'Reduces resource cost of Arcane Torrent by [v] Arcane Power',
		'wz-disintegrate' => 'Reduces resource cost of Disintegrate by [v] Arcane Power',
		'wz-electrocute' => 'Increases Electrocute damage by [v]%',
		'wz-explosive-blast' => 'Increases Critical Hit Chance of Explosive Blast by [v]%',
		'wz-hydra' => 'Reduces resource cost of Hydra by [v] Arcane Power',
		'wz-ray-of-frost' => 'Increases Critical Hit Chance of Ray of Frost by [v]%',
		'wz-energy-twister' => 'Increases Critical Hit Chance of Energy Twister by [v]%',
		'wz-magic-missle' => 'Increases Magic Missle damage by [v]%',
		'wz-arcane-orb' => 'Increases Critical Hit Chance of Arcane Orb by [v]%',
		'wz-blizzard' => 'Increases duration of Blizzard by [v] Seconds',
		'wz-meteor' => 'Reduces resource cost of Meteor by [v] Arcane Power',
		'wz-shock-pulse' => 'Increases Shock Pulse damage by [v]%',
		'wz-spectral-blade' => 'Increases Spectral Blade damage by [v]%',
		// Legendaries
		'pig-sticker' => 'Squeal!',
		'leg-blood-magic-blade' => 'Blood oozes from you.',
		'leg-wizardspike' => '[v]% chance to hurl a frozen orb when attacking.',
		'leg-the-gidbinn' => 'Chance to summon a Fetish when attacking.',
		'leg-last-breath' => 'Slain enemies rest in pieces.',
		'leg-skycutter' => 'Chance to summon angelic assistance when attacking.',
		'leg-sever' => 'Slain enemies rest in pieces.',
		'leg-azurewrath' => 'This weapon will forcefully repel undead enemies.',
		'leg-scourge' => '20% chance to explode with demonic fury when attacking.',
		'leg-maximus' => 'Chance to summon a Demonic Slave when attacking.',
		'leg-genzaniku' => 'Chance to summon a ghostly Fallen Champion when attacking.',
		'leg-the-butchers-sickle' => '20% chance to drag enemies to you when attacking.',
		'leg-the-burning-axe-of-sankis' => 'Chance to fight through the pain when enemies hit you.',
		'leg-sky-splitter' => '10% chance to Smite enemies when you hit them.',
		'leg-butchers-carver' => 'The Butcher still inhabits his carver.',
		'leg-fire-brand' => '25% chance to cast a fireball when attacking.',
		'leg-odyn-son' => '20% chance to Chain Lightning enemies when you hit them.',
		'leg-earthshatter' => '20% chance to cause the ground to shudder when attacking.',
		'leg-boneshatter' => 'Slain enemies rest in pieces.',
		'leg-cataclysm' => '25% chance to sunder the ground your enemies walk on when you attack.',
		'leg-schaeferss-hammer' => '25% chance to be protected by Lightning when you are hit.',
		'leg-vigilance' => 'Chance to cast Inner Sanctuary when you are hit.',
		'leg-the-ravens-wing' => 'Ravens flock to your side.',
		'leg-cluckeye' => '25% chance to cluck when attacking.',
		'leg-demon-machine' => '35% chance to shoot explosive bolts when attacking.',
		'leg-buriza-do-kyanon' => '40% chance for ranged projectiles to pierce enemies.',
		'leg-pus-spitter' => '25% chance to lob an acid blob when attacking.',
		'leg-hellrack' => 'Chance to root enemies to the ground when you hit them.',
		'leg-calamity' => '20% chance to target enemies with Marked for Death when you hit them.',
		'leg-fjord-cutter' => '20% chance to be surrounded by a Chilling Aura when attacking.',
		'leg-the-paddle' => 'Slap!',
		'leg-flying-dragon' => 'Chance to double your attack speed when attacking.',
		'leg-maloths-focus' => 'Enemies occasionally flee at the sight of this staff.',
		'leg-the-tormentor' => 'Chance to charm enemies when you hit them.',
		'leg-sloraks-madness' => 'This wand finds your death humorous.',
		'leg-wall-of-bone' => '20% chance to be protected by a shield of bones when you are hit.',
		'leg-lidless-wall' => 'You have a chance to be shielded when hit by enemies.',
		'leg-andariels-visage' => '20% chance to cast a Poison Nova when you are hit.',
		'leg-fire-walkers' => 'Burn the ground you walk on.',
		'leg-goldskin' => 'Chance for enemies to drop gold when you hit them.',
		'leg-pox-faulds' => 'These pants occasionally make you stink.',
		'leg-death-watch-mantle' => '15% chance to explode with knives when hit by enemies.',
		'leg-the-grin-reaper' => 'Chance to summon horrific Mimics when attacking.',
		'leg-storm-crow' => '20% chance to cast a fiery ball when attacking.',
		'leg-thunder-gods-vigor' => '25% chance to cause Shock Pulse to erupt from your enemies when you hit them.',
		'leg-moonlight-ward' => '25% chance to be surrounded by balls of Arcane Power when attacking.',
		'leg-puzzle-ring' => 'This ring sometimes calls forth a Treasure Goblin when you are hit.',
		'leg-bul-kathoss-wedding-band' => 'You drain life from enemies around you.',
		'leg-band-of-hollow-whispers' => 'This ring occasionally haunts nearby enemies.',
		'leg-bul-kathoss-warrior-blood' => 'You occasionally Whirlwind furiously.',
		'leg-shenlongs-relentless-assault' => 'Chance to hurl a ball of pure energy when attacking.',
		'leg-manajumas-gory-fetch' => 'You are surrounded by a deadly Poison Cloud.',
		'leg-litany-of-the-undaunted' => 'This ring sometimes summons a Skeleton when you attack.',
		'leg-demons-flight' => 'Chance to reflect projectiles when you are hit by enemies.',
		'leg-the-murlocket' => 'Call forth a creature from the depths.',
	);
} // END class D3Up_Tool_Attributes 
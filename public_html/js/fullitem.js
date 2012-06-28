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
td['arcane-damage'] = '+VVV Arcane Damage';
td['cold-damage'] = '+VVV Cold Damage';
td['fire-damage'] = '+VVV Fire Damage';
td['holy-damage'] = '+VVV Holy Damage';
td['lightning-damage'] = '+VVV Lightning Damage';
td['poison-damage'] = '+VVV Poison Damage';
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
td['plus-movement'] = '+VVV% Movement Speed';
td['plus-pickup-radius'] = 'Increases Gold and Health pickup by VVV yards';
td['plus-experience'] = 'Monster kills grant +VVV experience';
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
td['spirit-spent-life'] = 'Gain VVV per Spirit Spent';
td['spirit-regen'] = 'Increases Spirit Regeneration by VVV per Second';
td['mk-crippling-wave'] = 'Increases Crippling Wave damage by VVV%';
td['mk-cyclone-strike'] = 'Reduces resource cost of Cyclone Strike by VVV Spirit';
td['mk-deadly-reach'] = 'Increases Deadly Reach damage by VVV%';
td['mk-exploding-palm'] = 'Increases Exploding Palm damage by VVV%';
td['mk-fists-of-thunder'] = 'Increases Fist of Thunder damage by VVV%';
td['mk-sweeping-wind'] = 'Increases Sweeping Wind damage by VVV%';
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
td['wz-spectral-blade'] = 'Increases Spectral Blade damage by VVV%'
switch($("#itemType").val()) {
		case "shield":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide();
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();			
			break;
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
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_armor-label, #base_armor-element").show();
			break;
		case "2h-mace":
		case "2h-axe":
		case "bow":
		case "diabo":
		case "crossbow":
		case "2h-mighty":
		case "polearm":
		case "staff":
		case "2h-sword":
		case "axe":
		case "ceremonial-knife":
		case "hand-crossbow":
		case "dagger":
		case "fist-weapon":
		case "mace":
		case "mighty-weapon":
		case "spear":
		case "sword":
		case "wand":
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show();
			break;
		default:
			break;
	}
$("#name").keyup(function() {
	$(".item-preview .top p").html(document.createTextNode($("#name").val()));
});
$("#itemType").select2({
	placeholder: 'Choose the item type...',
	allowClear: true
});
$("#itemType").bind("change", function() {
	var name = $(this).find(":selected").html(),
			val = $(this).find(":selected").val(),
			type = $(".item-preview .item-type .type").html(name),
			add = $(".additional");
	$("#sockets").trigger('change');
	switch(val) {
		case "shield":
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").hide();
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").show();
			var stats = $(".item-preview .stats"),
					input1 = $("#base_armor"),
					input2 = $("#base_block_amount_min"),
					input3 = $("#base_block_amount_max"),
					input4 = $("#base_block_chance"),
					speedStat = $(".stats-extra-percent").empty(),
					damageStat = $(".stats-extra-range").empty(),
					bigStat = stats.find(".big-stat"),
					bigLabel = stats.find(".stat-helper");
			$(".stats-damage, .stats-speed").empty();
			bigLabel.html("Armor");
			input1.keyup(function(event) {
					bigStat.html(input1.val());
			}).trigger('keyup');					
			input2.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Block Amount</span>");
			}).trigger('keyup');					
			input3.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Block Amount</span>");
			}).trigger('keyup');					
			input4.keyup(function(event) {
					speedStat.html(input4.val() + "% <span class='stat-helper'>Chance to Block</span>");
			}).trigger('keyup');							
			break;
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
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_armor-label, #base_armor-element").show();
			var stats = $(".item-preview .stats"),
					input = $("#base_armor"),
					bigStat = stats.find(".big-stat"),
					bigLabel = stats.find(".stat-helper");
			$(".stats-extra-percent, .stats-extra-range").empty();
			bigLabel.html("Armor");
			input.keyup(function(event) {
					bigStat.html(input.val());
			}).trigger('keyup');					
			break;
		case "2h-mace":
		case "2h-axe":
		case "bow":
		case "diabo":
		case "crossbow":
		case "2h-mighty":
		case "polearm":
		case "staff":
		case "2h-sword":
		case "axe":
		case "ceremonial-knife":
		case "hand-crossbow":
		case "dagger":
		case "fist-weapon":
		case "mace":
		case "mighty-weapon":
		case "spear":
		case "sword":
		case "wand":
			var stats = $(".item-preview .stats"),
					input1 = $("#base_dps"),
					input2 = $("#base_damage_min"),
					input3 = $("#base_damage_max"),
					input4 = $("#base_speed"),
					speedStat = $(".stats-extra-percent").html(""),
					damageStat = $(".stats-extra-range").html(""),
					bigStat = stats.find(".big-stat"),
					bigLabel = stats.find(".stat-helper");
			bigLabel.html("Damage per Second");
			$("#base_armor-label, #base_armor-element, #base_block_chance-element, #base_block_chance-label, #base_block_amount_min-element, #base_block_amount_min-label, #base_block_amount_max-element, #base_block_amount_max-label").hide();
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label").show();
			input1.keyup(function(event) {
					bigStat.html(input1.val());
			}).trigger('keyup');					
			input2.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Damage</span>");
			}).trigger('keyup');					
			input3.keyup(function(event) {
					damageStat.html(input2.val() + "-" + input3.val() + " <span class='stat-helper'>Damage</span>");
			}).trigger('keyup');					
			input4.keyup(function(event) {
					speedStat.html(input4.val() + " <span class='stat-helper'>Attacks per Second</span>");
			}).trigger('keyup');					
			break;
		default:
			$(".stats .big-stat, .stats .stat-helper").html("");
			$(".stats-speed").html("");
			$(".stats-damage").html("");
			$(".item-preview .stats").removeClass("stats-armor stats-dps");
			$("#base_dps-element, #base_damage_min-element, #base_damage_max-element, #base_speed-element, #base_dps-label, #base_damage_min-label, #base_damage_max-label, #base_speed-label, #base_armor-label, #base_armor-element").hide();
			break;
	}

});
$("#quality").select2({
	placeholder: 'Choose the item\'s quality...',
	allowClear: true
});
$("#sockets").select2({
	placeholder: 'No Sockets...',
	allowClear: true
});
$("#sockets").bind("change", function() {
	var sockets = $(this).find(":selected").val(),
			container = $(".item-preview .item .sockets");
	container.empty();
	if(sockets > 0) {
		for(i=0; i<sockets; i++) {
			var select = $("<select name='socket"+i+"' style='width: 300px'><option></option></select>"),
					itemType = $("#itemType").val(),
					effect = "unknown";
			$.each(gems, function(k,v) {
				switch(itemType) {
					case "spirit-stone":
					case "voodoo-mask":
					case "wizard-hat":
					case "helm":
						effect = v[1];						
						break;
					case "shield":
					case "belt":
					case "boots":
					case "bracers":
					case "chest-armor":
					case "cloak":
					case "gloves":
					case "pants":
					case "mighty-belt":
					case "shoulder":
					default:
						effect = v[3];
						break;
					case "2h-mace":
					case "2h-axe":
					case "bow":
					case "diabo":
					case "crossbow":
					case "2h-mighty":
					case "polearm":
					case "staff":
					case "2h-sword":
					case "axe":
					case "ceremonial-knife":
					case "hand-crossbow":
					case "dagger":
					case "fist-weapon":
					case "mace":
					case "mighty-weapon":
					case "spear":
					case "sword":
					case "wand":
						effect = v[2];							
						break;
				}
				select.append("<option value='" + k + "'>" + v[0] + " (" + effect + ")</option>");
			});
			container.append($("<li>").append(select));
		}
		container.find("select").select2();
	}
});
$("#quality").bind("change", function() {
	var name = $(this).find(":selected").html(),
			top = $(".top p"),
			nameClass = $(this).find(":selected").val(),
			container = $(".item-preview .item-type"),
			quality = $(".item-preview .item-type .quality").html(name);
	top.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
	top.addClass("quality-" + nameClass);
	container.removeClass("quality-1 quality-2 quality-3 quality-4 quality-5 quality-6 quality-7");
	container.addClass("quality-" + nameClass);
});
$("#attributes").select2({
	placeholder: 'What attributes does this item have?',
	allowClear: true
});
$("#attributes").bind("change", function() {
	var attrs = $(this).val(),
			elements = $(".item-preview .item ul.attrs");
	// Add new Elements to the Item for Editing
	if(attrs) {
		$.each(attrs, function(k,v) {
			var exists = elements.find("." + v),
					attr = $("<li></li>");
			if(!exists.length) {
				var label = td[v],
						input = "<input type='text' name='" + v + "' value=''/>";
				label = label.replace("VVV", input);
				attr.html(label);
				attr.addClass(v);
				elements.append(attr);
			}
		});			
	}
	// Remove deleted elements from the Item
	elements.find("li").each(function() {
		if(!attrs || attrs.indexOf($(this).attr("class")) == -1) {
			$(this).remove();
		}
	});
});
$("#attributes").trigger('change');
$("#quality").trigger('change');
$("#itemType").trigger('change');
$("#name").trigger("keyup");
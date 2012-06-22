<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_DisplayItem extends Zend_View_Helper_Abstract
{
	protected $_typesMap = array(
		'amulet' => 'Amulet',
		'belt' => 'Belt',
		'boots' => 'Boots',
		'bracers' => 'Bracers',
		'chest-armor' => 'Chest Armor',
		'cloak' => 'Cloak',
		'gloves' => 'Gloves',
		'helm' => 'Helm',
		'pants' => 'Pants',
		'mighty-belt' => 'Mighty Belt',
		'ring' => 'Ring',
		'shoulder' => 'Shoulder',
		'spirit-stone' => 'Spirit Stone',
		'voodoo-mask' => 'Voodoo Mask',
		'wizard-hat' => 'Wizard Hat',
		'2h-mace' => 'Two-Handed Mace',
		'2h-axe' => 'Two-Handed Axe',
		'bow' => 'Bow',
		'diabo' => 'Diabo',
		'crossbow' => 'Crossbow',
		'2h-mighty' => 'Two-Handed Mighty Weapon',
		'polearm' => 'Polearm',
		'staff' => 'Staff',
		'2h-sword' => 'Two-Handed Sword',
		'axe' => 'Axe',
		'ceremonial-knife' => 'Ceremonial Knife',
		'hand-crossbow' => 'Hand Crossbow',
		'dagger' => 'Dagger',
		'fist-weapon' => 'Fist Weapon',
		'mace' => 'Mace',
		'mighty-weapon' => 'Mighty Weapon',
		'spear' => 'Spear',
		'sword' => 'Sword',
		'wand' => 'Wand',
		'mojo' => 'Mojo',
		'source' => 'Source',
		'quiver' => 'Quiver',
		'shield' => 'Shield',
	);
	
	protected $_statMap = array(
		'armor' => 'Armor',
		'dps' => 'Damage Per Second',
	);
	
	protected static $_gemMap = array(
		'chipped_amethyst' => array('Chipped Amethyst' ,'+5% Life' ,'Each Hit Adds +2 Life' ,'+6 Vitality'),
		'chipped_emerald' => array('Chipped Emerald' ,'+5% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 10%' ,'+6 Dexterity'),
		'chipped_ruby' => array('Chipped Ruby' ,'Increased Experience Rewarded per Kill by 5%' ,'+2-4 Damage' ,'+6 Strength'),
		'chipped_topaz' => array('Chipped Topaz' ,'5% Better Chance of Finding Magical Items' ,'Melee attackers take 2 damage per hit' ,'+6 Intelligence'),
		'flawed_amethyst' => array('Flawed Amethyst' ,'+6% Life' ,'+10 Vitality' ,'Each Hit Adds +3 Life'),
		'flawed_emerald' => array('Flawed Emerald' ,'+7% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 15%' ,'+10 Dexterity'),
		'flawed_ruby' => array('Flawed Ruby' ,'Increased Experience Rewarded per Kill by 7%' ,'+4-8 Damage' ,'+10 Strength'),
		'flawed_topaz' => array('Flawed Topaz' ,'7% Better Chance of Finding Magical Items' ,'Melee attackers take 3 damage per hit' ,'+10 Intelligence'),
		'amethyst' => array('Amethyst' ,'+7% Life' ,'Each Hit Adds +6 Life' ,'+14 Vitality'),
		'emerald' => array('Emerald' ,'+9% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 20%' ,'+14 Dexterity'),
		'ruby' => array('Ruby' ,'Increased Experience Rewarded per Kill by 9%' ,'+8-16 Damage' ,'+14 Strength'),
		'topaz' => array('Topaz' ,'9% Better Chance of Finding Magical Items' ,'Melee attackers take 6 damage per hit' ,'+14 Intelligence'),
		'flawless_amethyst' => array('Flawless Amethyst' ,'+8% Life' ,'Each Hit Adds +10 Life' ,'+18 Vitality'),
		'flawless_emerald' => array('Flawless Emerald' ,'+11% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 25%' ,'+18 Dexterity'),
		'flawless_ruby' => array('Flawless Ruby' ,'Increased Experience Rewarded per Kill by 11%' ,'+10-20 Damage' ,'+18 Strength'),
		'flawless_topaz' => array('Flawless Topaz' ,'11% Better Chance of Finding Magical Items' ,'Melee attackers take 10 damage per hit' ,'+18 Intelligence'),
		'perfect_amethyst' => array('Perfect Amethyst' ,'+9% Life' ,'Each Hit Adds +15 Life' ,'+22 Vitality'),
		'perfect_emerald' => array('Perfect Emerald' ,'13% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 30%' ,'+22 Dexterity'),
		'perfect_ruby' => array('Perfect Ruby' ,'Increased Experience Rewarded per Kill by 13%' ,'+11-22 Damage' ,'+22 Strength'),
		'perfect_topaz' => array('Perfect Topaz' ,'13% Better Chance of Finding Magical Items' ,'Melee attackers take 15 damage per hit' ,'+22 Intelligence'),
		'radiant_amethyst' => array('Radiant Amethyst' ,'+10% Life' ,'Each Hit Adds +25 Life' ,'+26 Vitality'),
		'radiant_emerald' => array('Radiant Emerald' ,'15% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 35%' ,'+26 Dexterity'),
		'radiant_ruby' => array('Radiant Ruby' ,'Increased Experience Rewarded per Kill by 15%' ,'+12-24 Damage' ,'+26 Strength'),
		'radiant_topaz' => array('Radiant Topaz' ,'15% Better Chance of Finding Magical Items' ,'Melee attackers take 30 damage per hit' ,'+26 Intelligence'),
		'square_amethyst' => array('Square Amethyst' ,'+11% Life' ,'Each Hit Adds +35 Life' ,'+30 Vitality'),
		'square_emerald' => array('Square Emerald' ,'17% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 40%' ,'+30 Dexterity'),
		'square_ruby' => array('Square Ruby' ,'Increased Experience Rewarded per Kill by 17%' ,'+13-26 Damage' ,'+30 Strength'),
		'square_topaz' => array('Square Topaz' ,'17% Better Chance of Finding Magical Items' ,'Melee attackers take 50 damage per hit' ,'+30 Intelligence'),
		'flawless_square_amethyst' => array('Flawless Square Amethyst' ,'+12% Life' ,'Each Hit Adds +65 Life' ,'+34 Vitality'),
		'flawless_square_emerald' => array('Flawless Square Emerald' ,'19% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 45%' ,'+34 Dexterity'),
		'flawless_square_ruby' => array('Flawless Square Ruby' ,'Increased Experience Rewarded per Kill by 19%' ,'+14-28 Damage' ,'+34 Strength'),
		'flawless_square_topaz' => array('Flawless Square Topaz' ,'19% Better Chance of Finding Magical Items' ,'Melee attackers take 100 damage per hit' ,'+34 Intelligence'),
		'perfect_square_amethyst' => array('Perfect Square Amethyst' ,'+13% Life' ,'Each hit adds +105 Life' ,'+38 Vitality'),
		'perfect_square_emerald' => array('Perfect Square Emerald' ,'+21% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 50%' ,'+38 Dexterity'),
		'perfect_square_ruby' => array('Perfect Square Ruby' ,'Increases Experience Rewarded per Kill by 21%' ,'+15-30 Damage' ,'+38 Strength'),
		'perfect_square_topaz' => array('Perfect Square Topaz' ,'21% Better Chance of Finding Magical Items' ,'Melee attackers take 200 damage per hit' ,'+38 Intelligence'),
		'radiant_square_amethyst' => array('Radiant Square Amethyst' ,'+14% Life' ,'Each Hit Adds +190 Life' ,'+42 Vitality'),
		'radiant_square_emerald' => array('Radiant Square Emerald' ,'+23% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 60%' ,'+42 Dexterity'),
		'radiant_square_ruby' => array('Radiant Square Ruby' ,'Increases Experience Rewarded per Kill by 23%' ,'+16-32 Damage' ,'+42 Strength'),
		'radiant_square_topaz' => array('Radiant Square Topaz' ,'23% Better Chance of Finding Magical Items' ,'Melee attackers take 350 damage per hit' ,'+42 Intelligence'),
		'star_amethyst' => array('Star Amethyst' ,'+15% Life' ,'Each Hit Adds +300 Life' ,'+46 Vitality'),
		'star_emerald' => array('Star Emerald' ,'+25 Extra Gold from Monsters' ,'Critical Hit Damage Increased by 70%' ,'+46 Dexterity'),
		'star_ruby' => array('Star Ruby' ,'Increases Experience Rewarded per Kill by 25%' ,'+17-34 Damage' ,'+46 Strength'),
		'star_topaz' => array('Star Topaz' ,'25% Better Chance of Finding Magical Items' ,'Melee attackers take 600 damage per hit' ,'+46 Intelligence'),
		'flawless_star_amethyst' => array('Flawless Star Amethyst' ,'+16% Life' ,'Each Hit Adds +400 Life' ,'+50 Vitality'),
		'flawless_star_emerald' => array('Flawless Star Emerald' ,'+27% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 80%' ,'+50 Dexterity'),
		'flawless_star_ruby' => array('Flawless Star Ruby' ,'Increases Experience Rewarded per Kill by 27%' ,'+18-36 Damage' ,'+50 Strength'),
		'flawless_star_topaz' => array('Flawless Star Topaz' ,'27% Better Chance of Finding Magical Items' ,'Melee attackers take 900 damage per hit' ,'+50 Intelligence'),
		'perfect_star_amethyst' => array('Perfect Star Amethyst' ,'+17% Life' ,'Each Hit Adds +500 Life' ,'+54 Vitality'),
		'perfect_star_emerald ' => array('Perfect Star Emerald ' ,'+29% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 90%' ,'+54 Dexterity'),
		'perfect_star_ruby' => array('Perfect Star Ruby' ,'Increases Experience Rewarded per Kill by 29%' ,'+19-38 Damage' ,'+54 Strength'),
		'perfect_star_topaz ' => array('Perfect Star Topaz ' ,'29% Better Chance of Finding Magical Items' ,'Melee attackers take 1250 damage per hit' ,'+54 Intelligence'),
		'radiant_star_amethyst' => array('Radiant Star Amethyst' ,'+18% Life' ,'Each Hit Adds +600 Life' ,'+58 Vitality'),
		'radiant_star_emerald' => array('Radiant Star Emerald' ,'+31% Extra Gold from Monsters' ,'Critical Hit Damage Increased by 100%' ,'+58 Dexterity'),
		'radiant_star_ruby' => array('Radiant Star Ruby' ,'Increases Experience Rewarded per Kill by 31%' ,'+20-40 Damage' ,'+58 Strength'),
		'radiant_star_topaz' => array('Radiant Star Topaz' ,'31% Better Chance of Finding Magical Items' ,'Melee attackers take 1800 damage per hit' ,'+58 Intelligence'),
	);
	
	protected static $_attrMap = array(
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
		'arcane-resist' => '+[v] Arcane Resistance',
		'cold-resist' => '+[v] Cold Resistance',
		'fire-resist' => '+[v] Fire Resistance',
		'lightning-resist' => '+[v] Lightning Resistance',
		'physical-resist' => '+[v] Physical Resistance',
		'poison-resist' => '+[v] Poison Resistance',
		'thorns' => 'Melee attackers take [v] damage per hit',
		// Offensive Stats
		'attack-speed' => 'Attack speed increased by [v]%',
		'critical-hit' => 'Critical Hit Chance increased by [v]%',
		'critical-hit-damage' => 'Critical Hit Damage increased by [v]%',
		'plus-damage' => '+[v]% Damage',
		'min-damage' => '+[v] Minimum Damage',
		'max-damage' => '+[v] Maximum Damage',
		'arcane-damage' => '+[v] Arcane Damage',
		'cold-damage' => '+[v] Cold Damage',
		'fire-damage' => '+[v] Fire Damage',
		'holy-damage' => '+[v] Holy Damage',
		'lightning-damage' => '+[v] Lightning Damage',
		'poison-damage' => '+[v] Poison Damage',
		'elite-damage' => 'Increases Damage against Elites by [v]%',
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
		// Etc
		'plus-movement' => '+[v]% Movement Speed',
		'plus-pickup-radius' => 'Increases Gold and Health pickup by [v] yards',
		'plus-experience' => 'Monster kills grant +[v] experience',
		'plus-gold-find' => '+[v]% Extra Gold from Monsters',
		'plus-magic-find' => '[v]% Better Chance of finding Magic Items',
		'health-globes' => 'Health Globes grant +[v] Life',
		'life-steal' => '[v]% of Damage Dealt is Converted to Life',
		'life-kill' => '+[v] Life after each Kill',
		'life-hit' => 'Each hit adds +[v] Life',
		'level-reduce' => 'Level Requirement reduced by [v]',
		'indestructable' => 'Ignores durability loss',
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
		'fury-max' => '+[v] Maximum Fury',
		// Demon Hunter
		'hatred-regen' => 'Increases Hatred Regeneration by [v] per Second',
		'max-discipline' => '+[v] Maximum Discipline',
		'dh-chakram' => 'Reduces resource cost of Chakram by [v] Hatred',
		'dh-evasive-fire' => 'Increases Evasive Fire damage by [v]%',
		'dh-grenades' => 'Increases Grenades Damage by [V]%',
		'dh-impale' => 'Reduces resource cost of Impale by [v] Hatred',
		'dh-spike-trap' => 'Increases Spike Trap damage by [v]%',
		'dh-bola-shot' => 'Increases Bola Shot damage by [v]%',
		'dh-elemental-arrow' => 'Increases Elemental Arrow damage by [v]%',
		'dh-entangling-shot' => 'Increases Entangling Shot damage by [v]%',
		'dh-hungering-arrow' => 'Increases Hungering Arrow damage by [v]%',
		'dh-multishot' => 'Increases Critical Hit Chance of Multishot by [v]%',
		'dh-rapid-fire' => 'Increases Critical Hit Chance of Rapid Fire by [v]%',
		// Monk
		'spirit-spent-life' => 'Gain [v] per Spirit Spent',
		'spirit-regen' => 'Increases Spirit Regeneration by [v] per Second',
		'mk-crippling-wave' => 'Increases Crippling Wave damage by [v]%',
		'mk-cyclone-strike' => 'Reduces resource cost of Cyclone Strike by [v] Spirit',
		'mk-deadly-reach' => 'Increases Deadly Reach damage by [v]%',
		'mk-exploding-palm' => 'Increases Exploding Palm damage by [v]%',
		'mk-fists-of-thunder' => 'Increases Fist of Thunder damage by [v]%',
		'mk-sweeping-wind' => 'Increases Sweeping Wind damage by [v]%',
		'mk-way-of-the-hundred-fists' => 'Increases Way of the Hundred Fists damage by [v]%',
		'mk-lashing-tail-kick' => 'Reduces resource cost of Lashing Tail Kick by [v] Spirit',
		'mk-tempest-rush' => 'Increases Critical Hit Chance of Tempest Rush by [v]%',
		'mk-wave-of-light' => 'Increases Critical Hit Chance of Wave of Light by [v]%',
		// Witch Doctor
		'mana-regen' => 'Increases Mana Regeneration by [v] per Second',
		'mana-max' => '+[v] Maximum Mana',
		'wd-firebomb' => 'Reduces resource cost of Firebomb by [v] Mana',
		'wd-haunt' => 'Increases Haunt Damage by [v]%',
		'wd-acid-clouds' => 'Increases Critical Hit Chance of Acid Clouds by [v]%',
		'wd-firebats' => 'Reduces resource cost of Firebats by [v] Mana',
		'wd-zombie-dogs' => 'Reduces cooldown of Summon Zombie Dogs by [v] Seconds',
		'wd-plague-of-toads' => 'Increases Plague of Toads damage by [v]%',
		'wd-poison-darts' => 'Increaeses Poison Darts damage by [v]%',
		'wd-spirit-barrage' => 'Increases Spirit Barrage damage by [v]%',
		'wd-wall-of-zombies' => 'Reduces cooldown of Wall of Zombies by [v] Seconds',
		'wd-zombie-charger' => 'Reduces resource cost of Zombie Charger by [v] Mana',
		// Wizard
		'ap-on-crit' => 'Critical Hits grant [v] Arcane Power',
		'ap-max' => '+[v] Maximum Arcane Power',
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
	);
	
	public $_qualityMap = array(
		1 => 'Inferior',
		2 => 'Normal',
		3 => 'Superior',
		4 => 'Magic',
		5 => 'Rare',
		6 => 'Legendary',
		7 => 'Set',
	);
	
	public static function getAttributeMap() {
		return static::$_attrMap;
	}
	public function gemEffect($name, $socket = null) {
		switch($this->_item->type) {
			case 'helm': 
				$loc = 1;
				break;
			case '2h-mace': 
			case '2h-axe': 
			case 'bow': 
			case 'diabo': 
			case 'crossbow': 
			case '2h-mighty': 
			case 'polearm': 
			case 'staff': 
			case '2h-sword': 
			case 'axe': 
			case 'ceremonial-knife': 
			case 'hand-crossbow': 
			case 'dagger': 
			case 'fist-weapon': 
			case 'mace': 
			case 'mighty-weapon': 
			case 'spear': 
			case 'sword':
				$loc = 2;			
				break;
			case 'amulet': 
			case 'belt': 
			case 'boots': 
			case 'bracers': 
			case 'chest-armor': 
			case 'cloak': 
			case 'gloves': 
			case 'pants': 
			case 'mighty-belt': 
			case 'ring': 
			case 'shoulder': 
			case 'spirit-stone': 
			case 'voodoo-mask': 
			case 'wizard-hat': 
			case 'wand': 
			case 'mojo': 
			case 'source': 
			case 'quiver': 
			case 'shield':
				$loc = 3;			
				break;
			default:
				$loc = 0;
				break;
		}
		return static::$_gemMap[$name][$loc];
	}
 	public function prettyDisplay($type, $value = null) {
		if($value == null) {
			if(isset($this->_statMap[$type])) {
				return $this->_statMap[$type];
			}
		}
		if(isset(self::$_attrMap[$type])) {
			if($value !== null) {
				if(is_array($value)) {
					return str_replace("[v]", implode("-", $value), self::$_attrMap[$type]);
				}
				if(is_float($value)) {
					return str_replace("[v]", number_format(($value * 100), 2), self::$_attrMap[$type]);
				}
				if(is_numeric($value)) {
					return str_replace("[v]", $value, self::$_attrMap[$type]);
				}
				return str_replace("[v]", $value, self::$_attrMap[$type]);
			}
			return self::$_attrMap[$type];				
		}
		if(isset($this->_typesMap[$type])) {
			return $this->_typesMap[$type];
		}
		return 'Placeholder ['.$type.']';
	}
	
	public function _renderStat($k, $v) {
		if($k == 'armor') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-armor'), 
				$this->view->htmlTag("span", array('class' => 'big-stat'), $v)."".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), $this->prettyDisplay($k))
			);			
		}
		if($k == 'block-chance') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-block-chance'),
				"+".$this->view->htmlTag("span", array(), $v)."% ".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), ' Chance to Block')
			);				
		}
		if($k == 'block-amount') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-block-amount'),
				$this->view->htmlTag("span", array(), $v['min']."-".$v['max'])." ".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), ' Block Amount')
			);
		}
		if($k == 'dps') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-dps'), 
				$this->view->htmlTag("span", array('class' => 'big-stat'), $v)."".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), $this->prettyDisplay($k))
			);						
		}
		if($k == 'damage') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-damage'),
				$this->view->htmlTag("span", array(), $v['min']."-".$v['max'])." ".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), 'Damage')
			);
		}
		if($k == 'speed') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-speed'),
				$this->view->htmlTag("span", array(), number_format($v, 2))." ".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), 'Attacks per Second')
			);			
		}
	}
	
	private function _renderTop() {
		$attrs = array();
		if(isset($this->_item->quality)) {
			$attrs['class'] = 'quality-'.$this->_item->quality;
		}
		return $this->view->htmlTag("p", $attrs, $this->_item->name);
	}
	private function _renderItem() {
		$html = '';
		$html .= $this->view->htmlTag("p", array('class' => 'item-type quality-'.$this->_item->quality), $this->_qualityMap[$this->_item->quality]." ".$this->prettyDisplay($this->_item->type));
		if(!empty($this->_item->stats)) {
			$statHtml = '';
			foreach($this->_item->stats as $k => $v) {
				$statHtml .= $this->_renderStat($k, $v);
			}
			$html .= $statHtml;
		}
		if(!empty($this->_item->attrs)) {
			$attrHtml = '';
			foreach($this->_item->attrs as $k => $v) {
				if($k == 'sockets') {
					for($i = 1; $i <= $v; $i++) {
						$attrHtml .= $this->view->htmlTag("li", array('class' => 'is-socket'), 'Empty Socket');					
					}
				} else {
					$attrHtml .= $this->view->htmlTag("li", array(), $this->prettyDisplay($k, $v));					
				}
			}
			$html .= $this->view->htmlTag("ul", array('class' => 'attrs'), $attrHtml);
		}
		if(!empty($this->_item->sockets)) {
			$socketHtml = '';
			foreach($this->_item->sockets as $socket) {
				$socketHtml .= $this->view->htmlTag("li", array('class' => 'gem_'.$socket), $this->gemEffect($socket));
			}
			$html .= $this->view->htmlTag("ul", array('class' => 'sockets'), $socketHtml);
		}
		return $html;
	}
	private function _renderBottom() {
		if($this->_item->_createdBy->id) {
			return "Created by: ".$this->_item->_createdBy->username;
		}
		return " ";
	}
	public function displayItem($item) {
		$this->_item = $item;
		return $this->view->htmlTag("div", array('class' => 'd3-item'),
			$this->view->htmlTag("div", array('class' => 'top'), $this->_renderTop())."".
			$this->view->htmlTag("div", array('class' => 'item'), $this->_renderItem())."".
			$this->view->htmlTag("div", array('class' => 'bottom'), $this->_renderBottom())			
		);
	}
} // END class D3Up_View_Helper_DisplayItem extends Zend_View_Helper_Abstract
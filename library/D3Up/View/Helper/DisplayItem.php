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
		'chipped_amethyst' => array('Chipped Amethyst' , array('plus-life', 5) , array('life-hit', 2), array('vitality', 6)),
		'chipped_emerald' => array('Chipped Emerald' , array('plus-gold-find', 5), array('critical-hit-damage', 10), array('dexterity', 6)),
		'chipped_ruby' => array('Chipped Ruby' , array('plus-experience-percent', 5), array('damage', '2-4') ,array('strength',6)),
		'chipped_topaz' => array('Chipped Topaz' , array('plus-magic-find', 5), array('thorns', 2), array('intelligence', 6)),
		'flawed_amethyst' => array('Flawed Amethyst' , array('plus-life', 6), array('life-hit', 3), array('vitality', 10)),
		'flawed_emerald' => array('Flawed Emerald' , array('plus-gold-find', 7), array('critical-hit-damage', 15), array('dexterity', 10)),
		'flawed_ruby' => array('Flawed Ruby' , array('plus-experience-percent', 7), array('damage', '4-8'), array('strength', 10)),
		'flawed_topaz' => array('Flawed Topaz' , array('plus-magic-find', 7), array('thorns', 3), array('intelligence', 10)),
		'amethyst' => array('Amethyst' , array('plus-life', 7) , array('life-hit', 6), array('vitality', 14)),
		'emerald' => array('Emerald' , array('plus-gold-find', 9), array('critical-hit-damage', 20), array('dexterity', 14)),
		'ruby' => array('Ruby' , array('plus-experience-percent', 9), array('damage', '8-16') ,array('strength', 14)),
		'topaz' => array('Topaz' , array('plus-magic-find', 9), array('thorns', 6), array('intelligence', 14)),
		'flawless_amethyst' => array('Flawless Amethyst' , array('plus-life', 8) , array('life-hit', 10), array('vitality', 18)),
		'flawless_emerald' => array('Flawless Emerald' , array('plus-gold-find', 11), array('critical-hit-damage', 25), array('dexterity', 18)),
		'flawless_ruby' => array('Flawless Ruby' , array('plus-experience-percent', 11), array('damage', '10-20') ,array('strength', 18)),
		'flawless_topaz' => array('Flawless Topaz' , array('plus-magic-find', 11), array('thorns', 10), array('intelligence', 18)),
		'perfect_amethyst' => array('Perfect Amethyst' , array('plus-life', 9) , array('life-hit', 15), array('vitality', 22)),
		'perfect_emerald' => array('Perfect Emerald', array('plus-gold-find', 13), array('critical-hit-damage', 30), array('dexterity', 22)),
		'perfect_ruby' => array('Perfect Ruby' , array('plus-experience-percent', 13), array('damage', '11-22') ,array('strength', 22)),
		'perfect_topaz' => array('Perfect Topaz' , array('plus-magic-find', 13), array('thorns', 15), array('intelligence', 22)),
		'radiant_amethyst' => array('Radiant Amethyst' , array('plus-life', 10) , array('life-hit', 25), array('vitality', 26)),
		'radiant_emerald' => array('Radiant Emerald', array('plus-gold-find',15), array('critical-hit-damage', 35), array('dexterity', 26)),
		'radiant_ruby' => array('Radiant Ruby' , array('plus-experience-percent', 15), array('damage', '12-24') ,array('strength', 26)),
		'radiant_topaz' => array('Radiant Topaz' , array('plus-magic-find', 15), array('thorns', 30), array('intelligence', 26)),
		'square_amethyst' => array('Square Amethyst' , array('plus-life', 11) , array('life-hit', 35), array('vitality', 30)),
		'square_emerald' => array('Square Emerald', array('plus-gold-find', 17), array('critical-hit-damage', 40), array('dexterity', 30)),
		'square_ruby' => array('Square Ruby' , array('plus-experience-percent', 17), array('damage', '13-26') ,array('strength', 30)),
		'square_topaz' => array('Square Topaz' , array('plus-magic-find', 17), array('thorns', 50), array('intelligence', 30)),
		'flawless_square_amethyst' => array('Flawless Square Amethyst' , array('plus-life', 12) , array('life-hit', 65), array('vitality', 34)),
		'flawless_square_emerald' => array('Flawless Square Emerald', array('plus-gold-find', 19), array('critical-hit-damage', 45), array('dexterity', 34)),
		'flawless_square_ruby' => array('Flawless Square Ruby' , array('plus-experience-percent', 19), array('damage', '14-28') ,array('strength', 34)),
		'flawless_square_topaz' => array('Flawless Square Topaz' , array('plus-magic-find', 19), array('thorns', 100), array('intelligence', 34)),
		'perfect_square_amethyst' => array('Perfect Square Amethyst' , array('plus-life', 13) ,array('life-hit', 105), array('vitality', 38)),
		'perfect_square_emerald' => array('Perfect Square Emerald' , array('plus-gold-find', 21), array('critical-hit-damage', 50), array('dexterity', 38)),
		'perfect_square_ruby' => array('Perfect Square Ruby' , array('plus-experience-percent', 21), array('damage', '15-30') ,array('strength', 38)),
		'perfect_square_topaz' => array('Perfect Square Topaz' , array('plus-magic-find', 21), array('thorns', 200), array('intelligence', 38)),
		'radiant_square_amethyst' => array('Radiant Square Amethyst' , array('plus-life', 14) , array('life-hit', 190), array('vitality', 42)),
		'radiant_square_emerald' => array('Radiant Square Emerald' , array('plus-gold-find', 23), array('critical-hit-damage', 60), array('dexterity', 42)),
		'radiant_square_ruby' => array('Radiant Square Ruby' , array('plus-experience-percent', 23), array('damage', '16-32') ,array('strength', 42)),
		'radiant_square_topaz' => array('Radiant Square Topaz' , array('plus-magic-find', 23), array('thorns', 350), array('intelligence', 42)),
		'star_amethyst' => array('Star Amethyst' , array('plus-life', 15) , array('life-hit', 300), array('vitality', 46)),
		'star_emerald' => array('Star Emerald' , array('plus-gold-find', 25), array('critical-hit-damage', 70), array('dexterity', 46)),
		'star_ruby' => array('Star Ruby' , array('plus-experience-percent', 25), array('damage', '17-34') ,array('strength', 46)),
		'star_topaz' => array('Star Topaz' , array('plus-magic-find', 25), array('thorns', 600), array('intelligence', 46)),
		'flawless_star_amethyst' => array('Flawless Star Amethyst' , array('plus-life', 16) , array('life-hit', 400), array('vitality', 50)),
		'flawless_star_emerald' => array('Flawless Star Emerald' , array('plus-gold-find', 27), array('critical-hit-damage', 80), array('dexterity', 50)),
		'flawless_star_ruby' => array('Flawless Star Ruby' , array('plus-experience-percent', 27), array('damage', '18-36') ,array('strength', 50)),
		'flawless_star_topaz' => array('Flawless Star Topaz' , array('plus-magic-find', 27), array('thorns', 900), array('intelligence', 50)),
		'perfect_star_amethyst' => array('Perfect Star Amethyst' , array('plus-life', 17) , array('life-hit', 500), array('vitality', 54)),
		'perfect_star_emerald' => array('Perfect Star Emerald', array('plus-gold-find', 29), array('critical-hit-damage', 90), array('dexterity', 54)),
		'perfect_star_ruby' => array('Perfect Star Ruby' , array('plus-experience-percent', 29), array('damage', '19-38') ,array('strength', 54)),
		'perfect_star_topaz' => array('Perfect Star Topaz', array('plus-magic-find', 29), array('thorns', 1250), array('intelligence', 54)),
		'radiant_star_amethyst' => array('Radiant Star Amethyst' , array('plus-life', 18) , array('life-hit', 600), array('vitality', 58)),
		'radiant_star_emerald' => array('Radiant Star Emerald' , array('plus-gold-find', 31), array('critical-hit-damage', 100), array('dexterity', 58)),
		'radiant_star_ruby' => array('Radiant Star Ruby' , array('plus-experience-percent', 31), array('damage', '20-40') ,array('strength', 58)),
		'radiant_star_topaz' => array('Radiant Star Topaz' , array('plus-magic-find', 31), array('thorns', 1800), array('intelligence', 58)),
	);
	
	protected static $_attrMap = array(
		// Base Stats
		'strength' => '+[v] Strength',
		'intelligence' => '+[v] Intelligence',
		'vitality' => '+[v] Vitality',
		'dexterity' => '+[v] Dexterity',
		// Defensive Stats
		'damage' => '+[v] Damage',
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
		'plus-experience-percent' => 'Increased Experience Rewarded per Kill by [v]%',
		'plus-gold-find' => '+[v]% Extra Gold from Monsters',
		'plus-magic-find' => '[v]% Better Chance of finding Magic Items',
		'health-globes' => 'Health Globes grant +[v] Life',
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
	public function gemEffect($name, $type = null) {
		if($type == null) {
			$type = $this->_item->type;
		}
		switch($type) {
			case 'spirit-stone': 
			case 'voodoo-mask': 
			case 'wizard-hat': 
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
			case 'wand':
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
		return $effect = static::$_gemMap[$name][$loc];
		return $this->prettyDisplay($effect[0], $effect[1]);
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
				if($socket == null) {
					$socketHtml .= $this->view->htmlTag("li", array('class' => 'is-socket'), 'Empty Socket');					
				} else {
					$effect = $this->gemEffect($socket);
					$socketHtml .= $this->view->htmlTag("li", array('class' => 'gem_'.$socket), $this->prettyDisplay($effect[0], $effect[1]));					
				}
			}
			$html .= $this->view->htmlTag("ul", array('class' => 'sockets'), $socketHtml);
		}
		return $html;
	}
	private function _renderBottom() {
		if($this->_item->_createdBy->id) {
			$extra = "";
			if($this->_item->_original->id) {
				$extra = " (Copied from <a href='/i/".$this->_item->_original->id."'>Here</a>)";
			}
		}
		if(isset($this->_item->rating) && isset($this->_item->rating['total'])) {
			return "Perfection Rating: ".$this->_item->rating['total']."%";				
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
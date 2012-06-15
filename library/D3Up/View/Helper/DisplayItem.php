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
		'mace' => 'mace',
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
	
	protected $_attrMap = array(
		// Base Stats
		'strength' => '+[v] Strength',
		'intelligence' => '+[v] Intelligence',
		'vitality' => '+[v] Vitality',
		'dexterity' => '+[v] Dexterity',
		// Defensive Stats
		'resist-all' => '+[v] Resistance to All Elements',
		'armor' => '+[v] Armor',
		'plus-life' => '',
		'life-regen' => '',
		'plus-block' => '',
		'cc-reduce' => '',
		'elite-reduce' => '',
		'melee-reduce' => '',
		'range-reduce' => '',
		'arcane-resist' => '',
		'cold-resist' => '',
		'fire-resist' => '',
		'lightning-resist' => '',
		'physical-resist' => '',
		'poison-resist' => '',
		'thorns' => '',
		// Offensive Stats
		'attack-speed' => '',
		'critical-hit' => '',
		'critical-hit-damage' => '',
		'plus-damage' => '+[v]% Damage',
		'min-damage' => '+[v] Minimum Damage',
		'max-damage' => '+[v] Maximum Damage',
		'arcane-damage' => '',
		'cold-damage' => '',
		'fire-damage' => '',
		'holy-damage' => '+[v] Holy Damage',
		'lightning-damage' => '',
		'poison-damage' => '',
		'elite-damage' => '',
		// Procs
		'chance-bleed' => '',
		'chance-blind' => '',
		'chance-chill' => '',
		'chance-fear' => '',
		'chance-freeze' => '',
		'chance-immobilize' => '',
		'chance-knockback' => '',
		'chance-slow' => '',
		'chance-stun' => '',
		// Etc
		'plus-movement' => '',
		'plus-pickup-radius' => '',
		'plus-experience' => '',
		'plus-gold-find' => '',
		'plus-magic-find' => '',
		'health-globes' => '',
		'life-steal' => '',
		'life-kill' => '',
		'life-hit' => '',
		'level-reduce' => '',
		'indestructable' => '',
		// Barbarian
		'bb-bash' => '',
		'bb-cleave' => '',
		'bb-frenzy' => '',
		'bb-rend' => '',
		'bb-revenge' => '',
		'bb-weapon-throw' => '',
		'bb-hammer-of-the-ancients' => '',
		'bb-whirlwind' => '',
		'bb-overpower' => '',
		'bb-seismic-slam' => 'Increases Critical Hit Chance of Seismic Slam by [v]%',
		'fury-max' => '',
		// Demon Hunter
		'hatred-regen' => '',
		'max-discipline' => '',
		'dh-chakram' => '',
		'dh-evasive-fire' => '',
		'dh-grenades' => '',
		'dh-impale' => '',
		'dh-spike-trap' => '',
		'dh-bola-shot' => '',
		'dh-elemental-arrow' => '',
		'dh-entangling-shot' => '',
		'dh-hungering-arrow' => '',
		'dh-multishot' => '',
		'dh-rapid-fire' => '',
		// Monk
		'spirit-spent-life' => '',
		'spirit-regen' => '',
		'mk-crippling-wave' => '',
		'mk-cyclone-strike' => '',
		'mk-deadly-reach' => '',
		'mk-exploding-palm' => '',
		'mk-fists-of-thunder' => '',
		'mk-sweeping-wind' => '',
		'mk-way-of-the-hundred-fists' => '',
		'mk-lashing-tail-kick' => '',
		'mk-tempest-rush' => '',
		'mk-wave-of-light' => '',
		// Witch Doctor
		'mana-regen' => '',
		'mana-max' => '',
		'wd-firebomb' => '',
		'wd-haunt' => '',
		'wd-acid-clouds' => '',
		'wd-firebats' => '',
		'wd-zombie-dogs' => '',
		'wd-plague-of-toads' => '',
		'wd-poison-darts' => '',
		'wd-spirit-barrage' => '',
		'wd-wall-of-zombies' => '',
		'wd-zombie-charger' => '',
		// Wizard
		'ap-on-crit' => 'Critical Hits grant [v] Arcane Power',
		'ap-max' => '',
		'wz-arcane-torrent' => '',
		'wz-disintegrate' => '',
		'wz-electrocute' => '',
		'wz-explosive-blast' => '',
		'wz-hydra' => '',
		'wz-ray-of-frost' => '',
		'wz-energy-twister' => '',
		'wz-magic-missle' => '',
		'wz-arcane-orb' => '',
		'wz-blizzard' => '',
		'wz-meteor' => '',
		'wz-shock-pulse' => '',
		'wz-spectral-blades' => '',
	);
	
	protected $_qualityMap = array(
		1 => 'Inferior',
		2 => 'Normal',
		3 => 'Superior',
		4 => 'Magic',
		5 => 'Rare',
		6 => 'Legendary',
		7 => 'Set',
	);
	
	public function prettyDisplay($type, $value = null) {
		if($value == null) {
			if(isset($this->_statMap[$type])) {
				return $this->_statMap[$type];
			}
		}
		if(isset($this->_attrMap[$type])) {
			if($value !== null) {
				if(is_array($value)) {
					return str_replace("[v]", implode("-", $value), $this->_attrMap[$type]);
				}
				if(is_float($value)) {
					return str_replace("[v]", number_format(($value * 100), 2), $this->_attrMap[$type]);
				}
				return str_replace("[v]", $value, $this->_attrMap[$type]);
			}
			return $this->_attrMap[$type];				
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
		return $html;
	}
	private function _renderBottom() {
		return "Bottom";
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
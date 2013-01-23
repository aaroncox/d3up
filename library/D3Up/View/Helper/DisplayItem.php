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
		'chest' => 'Chest Armor',
		'cloak' => 'Cloak',
		'gloves' => 'Gloves',
		'helm' => 'Helm',
		'pants' => 'Pants',
		'mighty-belt' => 'Mighty Belt',
		'ring' => 'Ring',
		'shoulders' => 'Shoulders',
		'spirit-stone' => 'Spirit Stone',
		'voodoo-mask' => 'Voodoo Mask',
		'wizard-hat' => 'Wizard Hat',
		'2h-mace' => 'Two-Handed Mace',
		'2h-axe' => 'Two-Handed Axe',
		'bow' => 'Bow',
		'daibo' => 'Daibo',
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
	
	protected static $_attrMap = null;
	
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
			case 'daibo': 
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
			case 'chest': 
			case 'cloak': 
			case 'gloves': 
			case 'pants': 
			case 'mighty-belt': 
			case 'ring': 
			case 'shoulders': 
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
		return $effect = D3Up_Tool_Gems::$gems[$name][$loc];
		return $this->prettyDisplay($effect[0], $effect[1]);
	}
 	public function prettyDisplay($type, $value = null) {
		if($value == null) {
			if(isset($this->_statMap[$type])) {
				return $this->_statMap[$type];
			}
		}
		if($type == 'damage') {
			$type = 'ruby-damage';
		}
		if(isset(self::$_attrMap[$type])) {
			if($value !== null) {
				if($value instanceOf Shanty_Mongo_Document) {
					$value = $value->export();
				}
				if(is_array($value)) {
					$value = implode("-", $value);
				}
				$value = "<span class='value'>". $value ."</span>";
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
			)."";				
		}
		if($k == 'block-amount') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-block-amount'),
				$this->view->htmlTag("span", array(), $v['min']."-".$v['max'])." ".
				$this->view->htmlTag("span", array('class' => 'stat-helper'), ' Block Amount')
			);
		}
		if($k == 'dps') {
			return $this->view->htmlTag("p", array('class' => 'stats stats-dps'), 
				$this->view->htmlTag("span", array('class' => 'big-stat'), round($v, 1))."".
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
				$this->view->htmlTag("span", array(), number_format(round($v,2), 2))." ".
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
	private function _getIcon() {
		return $this->view->htmlTag("img", array("src" => "http://media.blizzard.com/d3/icons/items/large/".$this->_item->icon.".png"));
	}
	private function _renderItem() {
		$html = '';
		if($this->_item->icon || $this->_item->icon != '') {
			$html .= $this->view->htmlTag("div", array('class' => 'item-icon item-quality-'.$this->_item->quality), $this->_getIcon());
		}
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
		if($this->_item->set) {
			$html .= $this->view->htmlTag("div", array('class' => 'setBonus quality-7', 'data-id' => $this->_item->set), "&nbsp;");			
		}
		return $html;
	}
	private function _renderBottom() {
		if($this->_item->_createdBy && $this->_item->_createdBy->id) {
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
		return $this->view->htmlTag("div", array('class' => 'd3-item', 'data-json' => json_encode($item->cleanExport())),
			$this->view->htmlTag("div", array('class' => 'top'), $this->_renderTop())."".
			$this->view->htmlTag("div", array('class' => 'item'), $this->_renderItem())."".
			$this->view->htmlTag("div", array('class' => 'bottom'), $this->_renderBottom())			
		);
	}
	
	public function __construct() {
		static::$_attrMap = D3Up_Tool_Attributes::$attributes;
	}
} // END class D3Up_View_Helper_DisplayItem extends Zend_View_Helper_Abstract
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
{
	public $route = 'item';	
	protected static $_documentType = 'item';
	
	protected $_requirements = array(
		'_createdBy' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
		'_original' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),			// If we are copying the item, this is the original.
		'attrs' => array('Document:D3Up_Mongo_Record_Item_Attributes'),
	);
	
	public static $slotTypeMap = array(
		'amulet' => array('amulet'),
		'pants' => array('pants'),
		'boots' => array('boots'),
		'bracers' => array('bracers'),
		'gloves' => array('gloves'),
		'chest' => array('chest', 'cloak'),
		'belt' => array('belt', 'mighty-belt'),
		'ring1' => array('ring'),
		'ring2' => array('ring'),
		'shoulders' => array('shoulders'),
		'helm' => array('helm', 'spirit-stone', 'wizard-hat', 'voodoo-mask'),
		'mainhand' => array('2h-mace', '2h-axe', 'bow', 'diabo', 'crossbow', '2h-mighty', 'polearm', 'staff', '2h-sword', 'wand', 'ceremonial-knife', 'axe', 'dagger', 'hand-crossbow', 'fist-weapon', 'mace', 'mighty-weapon', 'spear', 'sword'),
		'offhand' => array('axe', 'dagger', 'hand-crossbow', 'fist-weapon', 'mace', 'mighty-weapon', 'spear', 'sword', 'mojo', 'source', 'quiver', 'shield'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Item(array('item' => $this));
	}
	
	public function save() {
		$this->rating = D3Up_Tool_MaxStat::getInstance()->calc($this);
		return parent::save();
	}
	
	public function cleanExport() {
		$export = $this->export();
		// Get rid of some mongo settings
		unset($export['_id'], $export['_created'], $export['_createdBy']);
		// Build some 'friendly' names
		$helper = new D3Up_View_Helper_DisplayItem();
		// Build the 'friendly' gems display
		$sockets = array();
		if(isset($export['sockets'])) {
			foreach($export['sockets'] as $k => $v) {
				if($v == null) {
					$sockets[$k] = "Empty Socket";
				} else {
					$effect = $helper->gemEffect($v, $export['type']);
					if(isset($export['socketAttrs'][$effect[0]])) {
						$export['socketAttrs'][$effect[0]] += $effect[1];
					} else {
						$export['socketAttrs'][$effect[0]] = $effect[1];							
					}
					$sockets[$k] = $helper->prettyDisplay($effect[0], $effect[1]);					
				}
			}
		}
		$export['slots'] = array();
		foreach(self::$slotTypeMap as $slot => $types) {
			if(in_array($export['type'], $types)) {
				$export['slots'][] = $slot;
			}
		}
		// if($export['id'] == 28) {
		// 	echo "<pre>"; var_dump($export); exit;			
		// }
		// Build the 'friendly' attrs display
		$attrs = array();
		if(isset($export['attrs'])) {
			foreach($export['attrs'] as $k => $v) {
				$attrs[$k] = $helper->prettyDisplay($k, $v); 
			}			
		}
		$display = array(
			'quality' => $helper->_qualityMap[$export['quality']],
			'type' => ucwords(str_replace("-", " ", $export['type'])),
			'attrs' => $attrs,
			'sockets' => $sockets,
		);
		$export['display'] = $display;
		return $export;
	}
} // END class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_GearSet extends Epic_Mongo_Document
{
		
	protected $_requirements = array(
		'helm' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'shoulders' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'amulet' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'chest' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'gloves' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'bracers' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'belt' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'pants' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'ring1' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'ring2' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'boots' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'mainhand' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
		'offhand' => array('Document:D3Up_Mongo_Record_Item', 'AsReference'),
	);
	
	public $_gearMap = array(
		'helm' => array('spirit-stone','voodoo-mask','wizard-hat','helm'),
		'shoulders' => array('shoulders'),
		'amulet' => array('amulet'),
		'chest' => array('chest','cloak'),
		'gloves' => array('gloves'),
		'bracers' => array('bracers'),
		'belt' => array('belt','mighty-belt'),
		'pants' => array('pants'),
		'ring1' => array('ring'),
		'ring2' => array('ring'),
		'boots' => array('boots'),
		'mainhand' => array('2h-mace', '2h-axe', 'bow', 'diabo', 'crossbow', '2h-mighty', 'polearm', 'staff', '2h-sword', 'ceremonial-knife', 'wand', 'axe', 'hand-crossbow', 'dagger', 'fist-weapon', 'mace', 'mighty-weapon', 'spear', 'sword'),
		'offhand' => array('axe', 'hand-crossbow', 'dagger', 'fist-weapon', 'mace', 'mighty-weapon', 'spear', 'sword', 'mojo', 'source', 'quiver', 'shield'),
	);

	public function getSlots() {
		$slots = array_keys($this->_requirements);
		unset($slots[13]);
		return $slots;
	}
	
	public function getAcceptableTypes($type) {
		return $this->_gearMap[$type];
	}
} // END class D3Up_Mongo_GearSet extends Epic_Mongo_Document
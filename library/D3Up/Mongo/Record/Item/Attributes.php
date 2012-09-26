<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Item_Attributes extends Epic_Mongo_Document
{
	public function getAttributesArray($type = null) {
		$attrs = $this->export();
		// Unset the Placeholders
		unset($attrs['armor'], $attrs["holy-damage"], $attrs["cold-damage"], $attrs["arcane-damage"], $attrs["lightning-damage"], $attrs["poison-damage"], $attrs["fire-damage"]);
		switch($type) {
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
				unset($attrs['attack-speed'], $attrs['plus-damage'], $attrs['min-damage'], $attrs['max-damage']);
				break;
		}
		// Sort
		arsort($attrs);
		return $attrs;
	}
} // END class D3Up_Mongo_Record_Item_Attributes extends Epic_Mongo_Document
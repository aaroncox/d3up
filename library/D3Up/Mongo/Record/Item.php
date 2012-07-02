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
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Item(array('item' => $this));
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
			'sockets' => $sockets
		);
		$export['display'] = $display;
		return $export;
	}
} // END class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
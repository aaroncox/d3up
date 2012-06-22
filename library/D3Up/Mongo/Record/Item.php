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
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Item(array('item' => $this));
	}
} // END class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
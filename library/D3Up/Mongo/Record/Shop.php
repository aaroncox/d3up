<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Shop extends Epic_Mongo_Document_Record
{
	public $route = 'shop';	
	protected static $_documentType = 'shop';
	
	protected $_requirements = array(
		'_owner' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Shop(array('shop' => $this));
	}
} // END class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
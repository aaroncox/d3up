<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Sale extends Epic_Mongo_Document_Record
{
	public $route = 'sale';	
	protected static $_documentType = 'sale';
	
	protected $_requirements = array(
		'item' => array('Document:D3Up_Mongo_Record_Item'),
		'seller' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Sale(array('sale' => $this));
	}
} // END class D3Up_Mongo_Record_Sale extends Epic_Mongo_Document_Record
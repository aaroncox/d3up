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
	
	// public static function fetchAll($query = array(), $sort = array(), $limit = false) {
	// 	if(!isset($query['_cancelled'])) {
	// 		$query['_cancelled'] = array('$ne' => true);			
	// 	}
	// 	if(!isset($query['_completed'])) {
	// 		$query['_completed'] = array('$ne' => true);			
	// 	}
	// 	return parent::fetchAll($query, $sort, $limit);
	// }

	// public static function fetchOne($query = array()) {
	// 	if(!isset($query['_cancelled'])) {
	// 		$query['_cancelled'] = array('$ne' => true);			
	// 	}
	// 	if(!isset($query['_completed'])) {
	// 		$query['_completed'] = array('$ne' => true);			
	// 	}
	// 	return parent::fetchOne($query);
	// }
} // END class D3Up_Mongo_Record_Sale extends Epic_Mongo_Document_Record
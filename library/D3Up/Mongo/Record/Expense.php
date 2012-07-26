<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Expense extends Epic_Mongo_Document_Record
{
	public $route = 'expense';	
	protected static $_documentType = 'expense';
	
	protected $_requirements = array(
		'profile' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Expense(array('expense' => $this));
	}
} // END class D3Up_Mongo_Record_Expense extends Epic_Mongo_Document_Record
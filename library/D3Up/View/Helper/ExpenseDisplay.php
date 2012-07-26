<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_ExpenseDisplay extends Zend_View_Helper_Abstract
{
	protected $_types = array(
		"generic" => "Generic Expense (Unspecified)",
		"essenses" => "Essenses",
		"tome-secrets" => "Tome of Secrets",
		"tome-jc" => "Tome of Jewelcrafting",
		"tome-bs" => "Tome of Blacksmithings",
	);
	
	public function expenseDisplay($type) {
		return $this->_types[$type];
	}
} // END class D3Up_View_Helper_MethodCleaner extends Zend_View_Helper_Abstract


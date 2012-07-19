<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_MethodCleaner extends Zend_View_Helper_Abstract
{
	protected $_methods = array(
		'flat' => 'Buyout Only',
		'offer' => 'Taking Offers',
		'ah' => 'Gold AH',
	);
	
	public function methodCleaner($method) {
		return $this->_methods[$method];
	}
} // END class D3Up_View_Helper_MethodCleaner extends Zend_View_Helper_Abstract
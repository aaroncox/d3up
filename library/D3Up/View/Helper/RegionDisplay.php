<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_RegionDisplay extends Zend_View_Helper_Abstract
{
	protected $_regions = array(
		1 => 'The Americas',
		2 => 'Europe',
		3 => 'Asia',
	);

	protected $_short = array(
		1 => 'US',
		2 => 'EU',
		3 => 'AS',
	);
	
	public function regionDisplay($id, $format = null) {
		if($format) {
			switch($format) {
				case "short":
					return $this->_short[$id];
					break;
			}
		}
		return $this->_regions[$id];
	}
} // END class D3Up_View_Helper_MethodCleaner extends Zend_View_Helper_Abstract
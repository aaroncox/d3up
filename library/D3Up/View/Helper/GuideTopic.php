<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_GuideTopic extends Zend_View_Helper_Abstract
{
	protected $_topics = array(
		'class' => 'Class Guide',
		'general' => 'General Guide',
		'farming' => 'Farming Guide',
		'leveling' => 'Leveling Guide',
		'pvp' => 'PVP Guide',
	);
	
	public function guideTopic($key) {
		return $this->_topics[$key];
	}
} // END class D3Up_View_Helper_GuideTopic extends Zend_View_Helper_Abstract
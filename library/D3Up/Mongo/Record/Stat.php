<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Stat extends Epic_Mongo_Document_Record
{
	public $route = 'stat';	
	protected static $_documentType = 'stat';
	
	protected $_requirements = array(
		// '_owner' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	protected $_stats = array();
	protected $_averages = array();
	
	public function addStat($name, $grouping, $value = 1) {
		if(!isset($this->_stats[$name])) {
			$this->_stats[$name] = array();
		}
		if(!isset($this->_stats[$name][$grouping])) {
			$this->_stats[$name][$grouping] = 0;
		}
		$this->_stats[$name][$grouping] += $value;
		// var_dump($this->_stats);
	}
	
	public function averageStats() {
		foreach($this->_stats as $name => $stats) {
			$this->_averages[$name] = array();
			foreach($stats as $grouping => $value) {
				$this->_averages[$name][$grouping] = round($value / $this->_stats['classes_played'][$grouping], 2);
			}
		}
		var_dump($this->_averages, $this->_stats);
		var_dump($this->_averages);
	}

} // END class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
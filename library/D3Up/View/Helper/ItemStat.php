<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_ItemStat extends D3Up_View_Helper_DisplayItem
{
	public $_shortName = array(
		'plus-magic-find' => 'magic-find',
		'max-damage' => 'max-dmg',
		'min-damage' => 'min-dmg',
		'critical-hit-damage' => 'crit-damage',
		'attack-speed' => 'IAS',
		'poison-resist' => 'poison-res',
		'arcane-resist' => 'arcane-res',
		'fire-resist' => 'fire-res',
		'cold-resist' => 'cold-res',
		'lightning-resist' => 'light-res',
		'life-regen' => 'Life/Sec',
		'physical-resist' => 'phys-res',
		'plus-gold-find' => 'gold-find',
	);
	public function itemStat($stat, $value, $per = false) {
		switch($stat) {
			// Percentages
			case "critical-hit-damage":
				$value = $value."%";
				break;
		}
		$perClass = "unknown";
		if(is_numeric($per)) {
			if($per >= 100) {
				$perClass = 'max';
			} elseif($per > 90) {
				$perClass = '90';
			} elseif($per > 80) {
				$perClass = '80';				
			} elseif($per > 70) {
				$perClass = '70';				
			} elseif($per > 60) {
				$perClass = '60';				
			} elseif($per > 50) {
				$perClass = '50';				
			} elseif($per > 40) {
				$perClass = '40';
			} elseif($per > 30) {
				$perClass = '30';
			} else {
				$perClass = 'min';
			}
			// $perfection = " (<span class='per-".$perClass."'>".$per."%</span>)";
		}
		if(!$per) {
			$per = "??";
		}
		if(isset($this->_shortName[$stat])) {
			$stat = $this->_shortName[$stat];
		}
		return $this->view->htmlTag("div", array("class" => "item-stat"), 
			$this->view->htmlTag("span", array("class" => "value per-".$perClass, "title" => $per."% Perfect"), $value)."".
			$this->view->htmlTag("span", array("class" => "stat"), ucwords(str_replace("-", " ", $stat)))
		)."";
	}
} // END class D3Up_View_Helper_ItemStat extends D3Up_View_Helper_DisplayItem
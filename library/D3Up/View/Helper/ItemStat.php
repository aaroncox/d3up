<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_ItemStat extends D3Up_View_Helper_DisplayItem
{
	public function itemStat($stat, $value) {
		switch($stat) {
			// Percentages
			case "critical-hit-damage":
				$value = $value."%";
				break;
		}
		return $this->view->htmlTag("div", array("class" => "item-stat"), 
			$this->view->htmlTag("span", array("class" => "value"), $value)."".
			$this->view->htmlTag("span", array("class" => "stat"), ucwords(str_replace("-", " ", $stat)))
		)."";
	}
} // END class D3Up_View_Helper_ItemStat extends D3Up_View_Helper_DisplayItem
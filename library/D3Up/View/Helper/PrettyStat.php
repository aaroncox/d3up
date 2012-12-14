<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_PrettyStat extends Zend_View_Helper_Abstract
{
	public function prettyStat($value, $roundTo = 2) {
		if(!$value) return '~';
		if(!is_numeric($value)) return '~';
		$val = (float) $value;
		if($val >= 1000000000000) {
			return round($val / 1000000000000, $roundTo) ."t";
		}
		if($val >= 1000000000) {
			return round($val / 1000000000, $roundTo) ."b";
		}
		if($val >= 1000000) {
			return round($val / 1000000, $roundTo) ."m";
		}
		if($val >= 1000) {
			return round($val / 1000, $roundTo) ."k";
		}
		return round($val, $roundTo);
	}
} // END class D3Up_View_Helper_PrettyStat extends Zend_View_Helper_Abstrat
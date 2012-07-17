<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_PrettyStat extends Zend_View_Helper_Abstract
{
	public function prettyStat($value) {
		if(!$value) return '~';
		if(!is_numeric($value)) return '~';
		$val = (float) $value;
		if($val >= 1000000000) {
			return round($val / 1000000000, 2) ."b";
		}
		if($val >= 1000000) {
			return round($val / 1000000, 2) ."m";
		}
		if($val >= 1000) {
			return round($val / 1000, 2) ."k";
		}
		return round($val, 1);
	}
} // END class D3Up_View_Helper_PrettyStat extends Zend_View_Helper_Abstrat
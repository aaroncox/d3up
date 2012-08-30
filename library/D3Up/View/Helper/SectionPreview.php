<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_SectionPreview extends Zend_View_Helper_Abstract {
	public function sectionPreview($guide, $limit = 5) {
		if(!$guide->sections) {
			return null;
		}
		$preview = "";
		$count = 1;
		$skipped = 0;
		foreach($guide->sections as $idx => $section) {
			if($count > $limit) {
				$skipped++;
				continue;
			}
			$preview .= "".$this->view->htmlTag("span", array(), $this->view->guideLink($guide, array('section' => $idx, 'text' => $section->title)));
			if($count < $limit) {
				$preview .= ", ";
			}
			$count++;
		}
		if($skipped > 0) {
			$preview .= " (and ".$this->view->guideLink($guide, array('text' => $skipped))." more...)";			
		}
		return $preview;
		exit;
	}
} // END class D3Up_View_Helper_SectionPreview extends Zend_View_Helper_Abstract
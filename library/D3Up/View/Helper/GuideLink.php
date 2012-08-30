<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_GuideLink extends Epic_View_Helper_MLink
{
	public function guideLink($guide, $params = array()) {
		if(!$guide instanceOf Epic_Mongo_Document) {
			return false;
		}
		$urlParams['action'] = 'view';		
		if(isset($params['action'])) {
			$urlParams['action'] = $params['action'];
		}
		$linkText = $guide->title;
		if(isset($params['text'])) {
			$linkText = $params['text'];
		}
		$section = '';
		if(isset($params['section'])) {
			$section = "#section-".$params['section'];
		}
		if(isset($params['button']) && $params['button'] == true) {
			return $this->view->htmlTag("a", array(
				'class' => 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
				'href' => $this->view->url(array(
					'post' => $guide,
				)+$urlParams, 'guide', true).$section,
			), '<span class="ui-button-text">'.$linkText.'</span>');			
		}
		return $this->view->htmlTag("a", array(
			'href' => $this->view->url(array(
				'post' => $guide,
			)+$urlParams, 'guide', true).$section,
		), $linkText);
	}
} // END class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
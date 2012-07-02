<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
{
	public function itemLink($item, $params = array()) {
		if(!$item instanceOf Epic_Mongo_Document) {
			return false;
		}
		$urlParams['action'] = 'view';		
		if(isset($params['action'])) {
			$urlParams['action'] = $params['action'];
		}
		$linkText = $item->title ?: $item->name;
		if(isset($params['text'])) {
			$linkText = $params['text'];
		}
		if(isset($params['button']) && $params['button'] == true) {
			return $this->view->htmlTag("a", array(
				'class' => 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
				'href' => $this->view->url(array(
					'record' => $item,
				)+$urlParams, 'item', true),
			), '<span class="ui-button-text">'.$linkText.'</span>');			
		}
		return $this->view->htmlTag("a", array(
			'class' => 'quality-'.$item->quality,
			'data-json' => json_encode($item->cleanExport()),
			'href' => $this->view->url(array(
				'record' => $item,
			)+$urlParams, 'item', true),
		), $linkText);
	}
} // END class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
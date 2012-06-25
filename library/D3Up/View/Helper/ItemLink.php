<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
{
	public function itemLink($item) {
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
		return $this->view->htmlTag("a", array(
			'class' => 'quality-'.$item->quality,
			'data-json' => json_encode($item->cleanExport()),
			'href' => $this->view->url(array(
				'record' => $item,
			)+$urlParams, $item->route, true),
		), $linkText);
	}
} // END class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
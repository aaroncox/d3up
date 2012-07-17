<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_SaleLink extends Epic_View_Helper_MLink
{
	public function saleLink($sale, $params = array()) {
		if(!$sale instanceOf Epic_Mongo_Document) {
			return false;
		}
		$urlParams['action'] = 'view';		
		if(isset($params['action'])) {
			$urlParams['action'] = $params['action'];
		}
		$linkText = $sale->item->title ?: $sale->item->name;
		if(isset($params['text'])) {
			$linkText = $params['text'];
		}
		if(isset($params['button']) && $params['button'] == true) {
			return $this->view->htmlTag("a", array(
				'class' => 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only',
				'href' => $this->view->url(array(
					'record' => $sale,
				)+$urlParams, 'sale', true),
			), '<span class="ui-button-text">'.$linkText.'</span>');			
		}
		return $this->view->htmlTag("a", array(
			'class' => 'quality-'.$sale->item->quality,
			'data-json' => json_encode($sale->item->cleanExport()),
			'href' => $this->view->url(array(
				'record' => $sale,
			)+$urlParams, 'sale', true),
		), $linkText);
	}
} // END class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
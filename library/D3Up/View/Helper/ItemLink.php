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
		$slot = null;
		if(isset($params['slot'])) {
		  $slot = $params['slot'];
		}
		if(isset($params['button']) && $params['button'] == true) {
			return $this->view->htmlTag("a", array(
				'class' => 'button',
				'href' => $this->view->url(array(
					'record' => $item,
				)+$urlParams, 'item', true),
			), '<span class="ui-button-text">'.$linkText.'</span>');			
		}
		return $this->view->htmlTag("a", array(
			'class' => 'quality-'.$item->quality,
			'data-json' => json_encode($item->cleanExport()),
			'data-slot' => $slot,
			'data-set' => $item->set,
			'href' => $this->view->url(array(
				'record' => $item,
			)+$urlParams, 'item', true),
		), $linkText);
	}
} // END class D3Up_View_Helper_ItemLink extends Epic_View_Helper_MLink
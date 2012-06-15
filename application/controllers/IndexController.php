<?php
/**
 *  IndexController
 */
class IndexController extends Epic_Controller_Action {  
  public function indexAction()
  {
		$items = array();
		
		// Helmet
		$item = Epic_Mongo::newDoc('item');
		$item->name = "The Hope";
		$item->type = "wizard-hat";
		$item->quality = 5;
		$item->stats = array(
			'armor' => 598,
		);
		$item->attrs = array(
			'strength' => 34,
			'intelligence' => 172,
			'resist-all' => 58,
			'armor' => 190,
			'crit-ap' => 9,
			'sockets' => 1,
		);
		$item->gems = array(
			'life' => 0.12
		);
		$items[] = $item;
		
		// 2H Mace
		$item = Epic_Mongo::newDoc('item');
		$item->name = "Cat's Knock";
		$item->type = "2h-mace";
		$item->quality = 5;
		$item->stats = array(
			'dps' => 823.3,
			'damage' => array(
				'min' => 827,
				'max' => 1003,
			),
			'speed' => 0.9,
		);
		$item->attrs = array(
			'max-damage' => 9,
			'holy-damage' => array(
				'min' => 72,
				'max' => 167
			),
			'plus-damage' => 37,
			'dexterity' => 113,
			'vitality' => 105,
			'crit-seismic-slam' => 0.06,
		);
		$items[] = $item;
		$this->view->items = $items;		
	}
}
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class AdminController extends Epic_Controller_Action
{
	public function preDispatch() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if(!$profile || $profile->id != 2) {
			throw new Exception("Access Denied");
		}
	}
	public function updateGearCountsAction() {
		foreach(Epic_Mongo::db('build')->fetchAll() as $build) {
			$build->equipmentCount = count($build->equipment);
			$build->save();
		}
	}
	public function fixBuildStatsAction() {
		foreach(Epic_Mongo::db('build')->fetchAll() as $build) {
			if($build->stats) {
				foreach($build->stats as $k => $v) {
					$build->stats->$k = floatVal($v);
				}
				$build->save();
			}
		}
	}
	public function removeBadFieldsAction() {
		$slots = Epic_Mongo::db('gearset')->getSlots();
		foreach(Epic_Mongo::db('build')->fetchAll() as $build) {
			foreach($build->equipment as $slot => $item) {
				if(!in_array($slot, $slots)) {
					echo "Bad: ". $slot;
					unset($build->equipment->$slot);
				}
 				// var_dump($slot);
			}
			$build->save();
		}
	}
	public function convertDamageTypesAction() {
		$query = array(
			// "id" => 17377
		);
		foreach(Epic_Mongo::db('item')->fetchAll($query) as $item) {
			foreach($item->attrs as $attr => $value) {
				// var_dump($attr);
				if(in_array($attr, array('arcane-damage', 'fire-damage', 'lightning-damage', 'cold-damage', 'poison-damage', 'holy-damage'))) {
					// $attr = str_replace("plus-", "", $attr);
					$newValue = explode("-", $value);
					if(count($newValue) > 1) {
						$newValue = array(
						  'min' => (float) $newValue[0],
						  'max' => (float) $newValue[1]
						);
						$item->attrs->$attr = $newValue;						
						$item->save();
					} else {
						
					}
					// var_dump($item->attrs->$attr);
				}
			}
			// var_dump($item); 
		}
		echo "Done"; exit;
	}
	public function resaveItemsAction() {
		$query = array(
			'rating' => array('$exists' => false)
		);
		foreach(Epic_Mongo::db('item')->fetchAll($query) as $item) {
			$item->save();
		}
		foreach(Epic_Mongo::db('sale')->fetchAll($query) as $sale) {
			$sale->item->save();
		}
		echo "Resaved all items"; exit;
	}
} // END class AdminController extends Epic_Controller_Action
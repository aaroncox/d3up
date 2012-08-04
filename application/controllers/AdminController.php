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
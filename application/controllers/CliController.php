<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class CliController extends Epic_Controller_Action
{
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
		$start = microtime(true);
		$i = 0;
		$items = Epic_Mongo::db('item')->fetchAll();
		$sales = Epic_Mongo::db('sale')->fetchAll();
		$adapter = new Zend_ProgressBar_Adapter_Console();
		$bar = new Zend_ProgressBar($adapter, 0, count($items) + count($sales));
		foreach($items as $item) {
			$i++;
			$bar->update($i);		
			$item->save();
		}
		foreach($sales as $sale) {
			$i++;
			$bar->update($i);		
			$sale->item->save();
		}
		$end = microtime(true);
		$diff = $end - $start;
		var_dump($start, $end, $diff." sec");
		
		echo "Resaved ".count($items)." items and ".count($sales)." sales items"; exit;
	}
	public function resaveUsersAction() {
		foreach(Epic_Mongo::db('profile')->fetchAll() as $user) {
			$user->save();
		}
		echo "Resaved all users"; exit;
	}
	public function convertGuidesAction() {
		$i = 0;
		$guides = Epic_Mongo::db('guide')->fetchAll();
		$adapter = new Zend_ProgressBar_Adapter_Console();
		$bar = new Zend_ProgressBar($adapter, 0, count($guides));
		foreach($guides as $guide) {
			$i++;
			foreach($guide->sections as $idx => $section) {
				if(!$section->type) {
					$guide->sections[$idx]->type = 'generic';					
				}
			}
			if($guide->passives) {
				$passives = $guide->passives;
				$section = new D3Up_Mongo_Post_Guide_Section();
				$idx = 0;
				foreach($passives as $skill) {
					// var_dump($section->skills); exit;
					$new = $section->skills->new();
					$new->setFromArray($skill->export());
					$section->skills[$idx] = $new;
					$idx++;
				}
				$section->title = 'Passives';
				$section->type = 'passives';
				$guide->sections->addDocument($section);
				unset($guide->passives);
				// var_dump($section); exit;
			}
			if($guide->skills) {
				$skills = $guide->skills;
				$section = new D3Up_Mongo_Post_Guide_Section();
				$idx = 0;
				foreach($skills as $skill) {
					// var_dump($section->skills); exit;
					$new = $section->skills->new();
					$new->setFromArray($skill->export());
					$section->skills[$idx] = $new;
					$idx++;
				}

				$section->title = 'Skills';
				$section->type = 'skills';
				$guide->sections->addDocument($section);
				unset($guide->skills);
			}
			$bar->update($i);	
			// var_dump($guide->sections->export()); exit;
			$guide->save();
		}
		echo "Converted ".count($guides)." guides"; exit;
	}
	public function lowertagsAction() {
		$i = 0;
		$guides = Epic_Mongo::db("build")->fetchAll();
		$adapter = new Zend_ProgressBar_Adapter_Console();
		$bar = new Zend_ProgressBar($adapter, 0, count($builds));
		
		foreach($builds as $build) {
			$build->_characterBt = strtolower($build->_characterBt);
			$build->save();
			$i++;
			$bar->update($i);	
		}
		echo "done"; exit;
		
	}
} // END class AdminController extends Epic_Controller_Action
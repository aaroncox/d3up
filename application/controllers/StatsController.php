<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class StatsController extends Epic_Controller_Action
{
	public function indexAction() {
		
	}
	public function generateAction() {
		$stats = Epic_Mongo::newDoc('stat');
		$stats->classes = array();
		$query = array(
			'equipmentCount' => array('$gt' => 10),
			'stats' => array('$exists' => true),
		);
		foreach(Epic_Mongo::db('build')->fetchAll($query) as $build) {
			$stats->addStat("classes_played", $build->class);
			// var_dump($build); exit;
			var_Dump($build->stats); exit;
		}
		var_dump($stats->averageStats());
		exit;
	}
} // END class StatsController extends Epic_Controller_Action
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class ConceptController extends D3Up_Controller_Action
{
	public function indexAction() {
		
	}
	public function calcAvgAction() {
		$ranges = 
		array(
			1 => array(80, 1000),
			2 => array(75, 79),
			3 => array(70, 74),
			4 => array(65, 69),
			5 => array(60, 64),
			6 => array(55, 59),
			7 => array(50, 54),
			8 => array(45, 49),
			9 => array(40, 44),
			10 => array(35, 39),
			11 => array(30, 34),
			12 => array(25, 29),
			13 => array(20, 24),
			14 => array(0, 19)
		);
		foreach(Epic_Mongo::db('sale')->fetchAll(array("soldFor" => array('$exists' => 1))) as $sale) {
			$sale->item->save();
			// $sale->item->rating = D3Up_Tool_MaxStat::calc($sale->item);
			// var_dump($sale->export()); exit;
		}
		exit;
	}
	public function averagesAction() {
		$query = array(
			'type' => 'pants'
		);
		$db = Shanty_Mongo::getWriteConnection()->selectDB('com_d3up');
		// var_dump(floor(2000000/1000000)); exit;
		$result = $db->execute("
		mapAverages = function(v) {
			if(this.attrs) {
				this.attrs.forEach(function(z) {
					emit(z, { count : 1});
				});				
			}
			if(this.stats) {
				this.stats.forEach(function(z) {
					emit(z, { count : 1});
				});				
			}
		};
		reduceAverages = function(k, v) {
			var total = 0;
			for ( var i=0; i<v.length; i++ )
				total += v[i].count;
			return { count : total };
		};
		db.runCommand(
		 { mapreduce : 'records',
		   map : mapAverages,
		   reduce : reduceAverages,
		   out : 'averages'
		 }
		);
		");
		var_dump($result); exit;
	}
} // END class ConceptController extends Epic_Controller_Action
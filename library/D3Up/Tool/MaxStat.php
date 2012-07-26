<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Tool_MaxStat
{
	protected static $_statMap = array(
		// Stats
		'dexterity' => 0,
		'intelligence' => 1,
		'strength' => 2,
		'vitality' => 3,
		// Life
		'life-regen' => 4,
		'life-kill' => 5,
		'life-hit' => 6,
		'spirit-spent-life' => 7,
		'life-steal' => 8,
		// Misc
		'plus-magic-find' => 9, 
		'plus-gold-find' => 10,
		'plus-experience' => 11,
		'plus-movement' => 12,
		'plus-pickup-radius' => 13,
		'level-reduce' => 14,
		// Damage Abilities
		'plus-damage' => 15, 
		'critical-hit' => 16, 
		'critical-hit-damage' => 17,
		'attack-speed' => 18,
		'min-damage' => 19,
		'max-damage' => 20,
		// Defensive
		'armor' => 21, 
		'plus-block' => 22,
		'melee-reduce' => 23,
		'range-reduce' => 24, 
		'elite-reduce' => 25,
		'thorns' => 26, 
		'cc-reduce' => 27,
		// Resists
		'resist-all' => 28,
		'physical-resist' => 29,
		'cold-resist' => 30,
		'fire-resist' => 31, 
		'lightning-resist' => 32,
		'poison-resist' => 33,
		'arcane-resist' => 34,
		'plus-life' => 35,
	);
	protected static $_limits = array(
		array(
			'types' => 'axe|ceremonial-knife|hand-crossbow|dagger|fist-weapon|mace|mighty-weapon|spear|sword|wand|2h-mace|2h-axe|bow|diabo|crossbow|2h-mighty|polearm|staff|2h-sword',
			'values' => array(350, 350, 350, 350, 0, 2878, 959, 64, 3, 0, 0, 24, 0, 0, 18, 50, 0, 100, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		),
		array(
			'types' => 'mojo|source|quiver',
			'values' => array(178, 178, 178, 178, 234, 0, 0, 0, 0, 18, 20, 24, 0, 0, 0, 0, 8.5, 0, 15, 0, 0, 0, 0, 0, 0, 0, 979, 0, 0, 0, 0, 0, 0, 0, 0, 9),
		),
		array(
			'types' => 'shield',
			'values' => array(178, 178, 178, 178, 234, 0, 0, 0, 0, 18, 20, 24, 0, 0, 0, 0, 8.5, 0, 15, 0, 0, 397, 9, 6, 6, 7, 2544, 14, 80, 60, 60, 60, 60, 60, 60, 16),
		),
		array(
			'types' => 'spirit-stone',
			'values' => array(258, 178, 178, 178, 234, 0, 0, 30, 0, 18, 20, 24, 0, 7, 16, 0, 4.5, 0, 0, 0, 0, 397, 0, 0, 0, 0, 1454, 14, 70, 50, 50, 50, 50, 50, 50, 9),
		),
		array(
			'types' => 'voodoo-mask',
			'values' => array(178, 258, 178, 178, 234, 0, 0, 0, 0, 18, 20, 24, 0, 7, 16, 0, 4.5, 0, 0, 0, 0, 397, 0, 0, 0, 0, 1454, 14, 70, 50, 50, 50, 50, 50, 50, 9),
			),
		array(
			'types' => 'wizard-hat',
			'values' => array(178, 258, 178, 178, 234, 0, 0, 0, 0, 18, 20, 24, 0, 7, 16, 0, 4.5, 0, 0, 0, 0, 397, 0, 0, 0, 0, 1454, 14, 70, 50, 50, 50, 50, 50, 50, 9),
		),
		array(
			'types' => 'cloak',
			'values' => array(178, 178, 178, 258, 410, 0, 0, 0, 0, 18, 20, 24, 0, 7, 16, 0, 0, 0, 0, 0, 0, 397, 0, 0, 6, 0, 2544, 0, 70, 50, 50, 50, 50, 50, 50, 9),
		),
		array(
			'types' => 'mighty-belt',
			'values' => array(178, 178, 258, 178, 234, 0, 0, 0, 3, 18, 20, 24, 0, 7, 16, 0, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0, 2544, 0, 70, 50, 50, 50, 50, 50, 50, 9),
		),
		array(
			'types' => 'helm' ,
			'values' => array(200,300,200,200, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 6, 0, 0, 0, 0, 397, 0, 0, 0, 0, 1454, 14, 80, 60, 60, 60, 60, 60, 60, 12),
		),
		array(
			'types' => 'belt',
			'values' => array(200, 200, 300, 200, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0, 2544, 0, 80, 60, 60, 60, 60, 60, 60, 12),
		),
		array(
			'types' => 'amulet',
			'values' => array(302, 302, 302, 302, 410, 1971, 657, 0, 0, 40, 40, 24, 0, 0, 0, 0, 8.5, 65, 9, 27, 27, 360, 0, 4, 4, 0, 1712, 14, 70, 50, 50, 50, 50, 50, 50, 14),
		),
		array(
			'types' => 'boots',
			'values' => array(300, 200, 200, 200, 342, 0, 0, 0, 0, 20, 25, 24, 12, 7, 18, 0, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0, 1454, 0, 80, 60, 60, 60, 60, 60, 60, 0),
		),
		array(
			'types' => 'bracers',
			'values' => array(200, 200, 200, 200, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 6, 0, 0, 0, 0, 265, 0, 6, 6, 0, 1454, 0, 80, 60, 60, 60, 60, 60, 60, 0),
		),
		array(
			'types' => 'chest-armor',
			'values' => array(200, 200, 200, 300, 599, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 0, 0, 0, 0, 0, 397, 0, 6, 6, 7, 2544, 0, 80, 60, 60, 60, 60, 60, 60, 12),
		),
		array(
			'types' => 'gloves',
			'values' => array(300, 300, 200, 200, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 10, 50, 9, 0, 0, 265, 0, 0, 0, 0, 1454, 0, 80, 60, 60, 60, 60, 60, 60, 0),
		),
		array(
			'types' => 'pants',
			'values' => array(200, 200, 200, 300, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 0, 0, 0, 0, 0, 397, 0, 0, 0, 0, 1454, 0, 80, 60, 60, 60, 60, 60, 60, 0),
		),
		array(
			'types' => 'ring',
			'values' => array(178, 178, 178, 178, 234, 985, 328, 0, 0, 18, 20, 222, 0, 0, 0, 0, 4.5, 35, 9, 27, 27, 240, 0, 0, 0, 0, 979, 14, 70, 50, 50, 50, 50, 50, 50, 9),
		),
		array(
			'types' => 'shoulder',
			'values' => array(200, 200, 300, 200, 342, 0, 0, 0, 0, 20, 25, 24, 0, 7, 18, 0, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0, 1454, 0, 80, 60, 60, 60, 60, 60, 60, 12),
		)
	);
	private static $_typeMap = array();
	
	/**
	* Class Instance - Singleton Pattern
	*
	* @var self
	**/
	static protected $_instance = NULL;

	/**
	* Returns (or creates) the Instance - Singleton Pattern
	*
	* @return self
	* @author Corey Frang
	**/
	static public function getInstance()
	{
	 if (static::$_instance === NULL) {
			foreach(static::$_limits as $idx => $dataSet) {
				foreach(explode("|", $dataSet['types']) as $t) {
					static::$_typeMap[$t] = $idx;
				}
			}
	   static::$_instance = new static();
	 }
	 return static::$_instance;
	}
	
	public static function calc($item) {

		if(!in_array($item->type, static::$_typeMap)) {
			return false;
		}
		$idx = array_search($item->type, array_flip(static::$_typeMap));
		$ratings = array();
		if($item->attrs) {
			foreach($item->attrs as $key => $value) {
				if(!in_array($key, array_keys(static::$_statMap))) {
					continue;
				}
				$perfect = static::$_limits[static::$_typeMap[$item->type]]['values'][static::$_statMap[$key]];
				if($perfect == 0) {
					// var_dump($item->type, $key); exit;
				} else {
					$rating = round($value / $perfect * 100, 1);					
					$ratings[$key] = $rating;
				}
			}			
		}
		if(count($ratings) > 0) {
			$ratings['total'] = array_sum($ratings) / count($ratings);
		}
		return $ratings;
	}
} // END class D3Up_Tool_MaxStat
/*
// 2H Weapons
// 1H Weapons
'axe|ceremonial-knife|hand-crossbow|dagger|fist-weapon|mace|mighty-weapon|spear|sword|wand'
// Singles


*/
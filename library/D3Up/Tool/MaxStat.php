<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Tool_MaxStat
{
	public static $_statMap = array(
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
		'sockets' => 36,
		// Elemental Damage Bonuses on Weapons
		'cold-damage' => 37,
		'poison-damage' => 38,
		'holy-damage' => 39,
		'arcane-damage' => 40,
		'lightning-damage' => 41,
		'fire-damage' => 42,
	);
	protected static $_limits = array(
		array(
			'types' => 'axe|ceremonial-knife|hand-crossbow|dagger|fist-weapon|mace|mighty-weapon|spear|sword|wand',
			'values' => array(
				350,		// dexterity
				350,    // intelligence
				350,    // strength
				350,    // vitality
				0,      // life-regen
				2878,   // life-kill
				959,    // life-hit
				64,     // spirit-spent-life
				3,      // life-steal
				0,      // plus-magic-find
				0,      // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				18,     // level-reduce
				50,     // plus-damage
				0,      // critical-hit
				100,    // critical-hit-damage
				11,     // attack-speed
				352,    // min-damage
				447,    // max-damage
				0,      // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				0,      // thorns
				0,      // cc-reduce
				0,      // resist-all
				0,      // physical-resist
				0,      // cold-resist
				0,      // fire-resist
				0,      // lightning-resist
				0,      // poison-resist
				0,      // arcane-resist
				0,      // plus-life
				1       // sockets
			),
		),
		array(
		  'types' => '2h-mace|2h-axe|bow|daibo|crossbow|2h-mighty|polearm|staff|2h-sword',
		  'values' => array(
				595,		// dexterity
				595,    // intelligence
				595,    // strength
				595,    // vitality
				0,      // life-regen
				5756,   // life-kill
				1918,   // life-hit
				0,      // spirit-spent-life
				6,      // life-steal
				0,      // plus-magic-find
				0,      // plus-gold-find
				0,      // plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				18,     // level-reduce
				50,     // plus-damage
				0,      // critical-hit
				200,    // critical-hit-damage
				11,     // attack-speed
				478,    // min-damage
				611,    // max-damage
				0,      // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				0,      // thorns
				0,      // cc-reduce
				0,      // resist-all
				0,      // physical-resist
				0,      // cold-resist
				0,      // fire-resist
				0,      // lightning-resist
				0,      // poison-resist
				0,      // arcane-resist
				0,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'mojo|source|quiver',
			'values' => array(
				301,		// dexterity
				301,    // intelligence
				301,    // strength
				301,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				0,      // level-reduce
				0,      // plus-damage
				10,    // critical-hit
				0,      // critical-hit-damage
				15,     // attack-speed
				0,      // min-damage
				0,      // max-damage
				0,      // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				979,    // thorns
				0,      // cc-reduce
				0,      // resist-all
				0,      // physical-resist
				0,      // cold-resist
				0,      // fire-resist
				0,      // lightning-resist
				0,      // poison-resist
				0,      // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'shield',
			'values' => array(
				350,		// dexterity
				350,		// intelligence
				350,    // strength
				350,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				0,      // level-reduce
				0,      // plus-damage
				10,     // critical-hit
				0,      // critical-hit-damage
				15,     // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				9,      // plus-block
				6,      // melee-reduce
				6,      // range-reduce
				7,      // elite-reduce
				2544,   // thorns
				14,     // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				16,			// plus-life
				1       // sockets
			),        
		),          
		array(
			'types' => 'spirit-stone',
			'values' => array(
				300,		// dexterity
				200,    // intelligence
				200,    // strength
				200,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				30,     // spirit-spent-life
				0,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				16,     // level-reduce
				0,      // plus-damage
				6,    // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				14,     // cc-reduce
				70,     // resist-all
				50,     // physical-resist
				50,     // cold-resist
				50,     // fire-resist
				50,     // lightning-resist
				50,     // poison-resist
				50,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'voodoo-mask',
			'values' => array(
				200,		// dexterity
				300,		// intelligence
				200,    // strength
				200,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				16,     // level-reduce
				0,      // plus-damage
				6,    // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				14,     // cc-reduce
				70,     // resist-all
				50,     // physical-resist
				50,     // cold-resist
				50,     // fire-resist
				50,     // lightning-resist
				50,     // poison-resist
				50,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),          
		array(
			'types' => 'wizard-hat',
			'values' => array(
				200,		// dexterity
				300,    // intelligence
				200,    // strength
				200,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				16,     // level-reduce
				0,      // plus-damage
				6,    // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				14,     // cc-reduce
				70,     // resist-all
				50,     // physical-resist
				50,     // cold-resist
				50,     // fire-resist
				50,     // lightning-resist
				50,     // poison-resist
				50,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'cloak',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				200,    // strength
				300,    // vitality
				410,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				16,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				6,      // range-reduce
				0,      // elite-reduce
				2544,   // thorns
				0,      // cc-reduce
				70,     // resist-all
				50,     // physical-resist
				50,     // cold-resist
				50,     // fire-resist
				50,     // lightning-resist
				50,     // poison-resist
				50,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'mighty-belt',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				300,    // strength
				200,    // vitality
				234,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				3,      // life-steal
				18,     // plus-magic-find
				20,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				16,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				2544,   // thorns
				0,      // cc-reduce
				70,     // resist-all
				50,     // physical-resist
				50,     // cold-resist
				50,     // fire-resist
				50,     // lightning-resist
				50,     // poison-resist
				50,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'helm',
			'values' => array(
				200,		// dexterity
				300,    // intelligence
				200,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				6,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				14,     // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				12,     // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'belt',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				300,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				2544,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				12,     // plus-life
				0,			// sockets
			),        
		),
		array(
			'types' => 'amulet',
			'values' => array(
				350,		// dexterity
				350,    // intelligence
				350,    // strength
				350,    // vitality
				599,    // life-regen
				2878,   // life-kill
				959,    // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				45,     // plus-magic-find
				50,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				0,      // level-reduce
				0,      // plus-damage
				10,     // critical-hit
				100,    // critical-hit-damage
				9,      // attack-speed
				27,     // min-damage
				27,     // max-damage
				397,    // armor
				0,      // plus-block
				6,      // melee-reduce
				6,      // range-reduce
				0,      // elite-reduce
				1712,   // thorns
				14,     // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				16,     // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'boots',
			'values' => array(
				300,		// dexterity
				200,    // intelligence
				200,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				12,     // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				0,      // plus-life
				0,			// sockets
			),        
		),
		array(
			'types' => 'bracers',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				200,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				6,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				6,      // melee-reduce
				6,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				0,      // plus-life
				0,			// sockets
			),        
		),
		array(
			'types' => 'chest',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				200,    // strength
				300,    // vitality
				599,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				6,      // melee-reduce
				6,      // range-reduce
				7,      // elite-reduce
				2544,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				12,     // plus-life
				3,			// sockets
			),        
		),
		array(
			'types' => 'gloves',
			'values' => array(
				300,		// dexterity
				300,    // intelligence
				200,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				10,     // critical-hit
				50,     // critical-hit-damage
				9,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				0,      // plus-life
				0,			// sockets
			),        
		),
		array(
			'types' => 'pants',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				200,    // strength
				300,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				397,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				1454,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				0,      // plus-life
				2,			// sockets
			),        
		),
		array(
			'types' => 'ring',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				200,    // strength
				200,    // vitality
				342,    // life-regen
				1439,    // life-kill
				479,    // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				22,    	// plus-experience
				0,      // plus-movement
				0,      // plus-pickup-radius
				0,      // level-reduce
				0,      // plus-damage
				6,    	// critical-hit
				50,     // critical-hit-damage
				9,      // attack-speed
				36,     // min-damage
				86,     // max-damage
				240,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				979,    // thorns
				14,     // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				12,      // plus-life
				1,			// sockets
			),        
		),
		array(
			'types' => 'shoulders',
			'values' => array(
				200,		// dexterity
				200,    // intelligence
				300,    // strength
				200,    // vitality
				342,    // life-regen
				0,      // life-kill
				0,      // life-hit
				0,      // spirit-spent-life
				0,      // life-steal
				20,     // plus-magic-find
				25,     // plus-gold-find
				24,     // plus-experience
				0,      // plus-movement
				7,      // plus-pickup-radius
				18,     // level-reduce
				0,      // plus-damage
				0,      // critical-hit
				0,      // critical-hit-damage
				0,      // attack-speed
				0,      // min-damage
				0,      // max-damage
				265,    // armor
				0,      // plus-block
				0,      // melee-reduce
				0,      // range-reduce
				0,      // elite-reduce
				2544,   // thorns
				0,      // cc-reduce
				80,     // resist-all
				60,     // physical-resist
				60,     // cold-resist
				60,     // fire-resist
				60,     // lightning-resist
				60,     // poison-resist
				60,     // arcane-resist
				12,     // plus-life
				0,			// sockets
			),        
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
	static public function getArray() {
	  $return = array();
	  foreach(static::$_limits as $data) {
	    $keys = explode("|", $data['types']);
	    foreach($keys as $key) {
        $return[$key] = array();
	      foreach($data['values'] as $idx => $value) {
	        $name = array_search($idx, static::$_statMap);
	        $return[$key][$name] = $value; 
          
	      }
	    }
	  }
	  return $return;
	}
	public static function calcStat($stat, $value, $type, $asArray = false) {
    // var_dump($stat, $value, $type);
    if(!in_array($type, static::$_typeMap)) {
			return false;
		}
		if(!in_array($stat, array_keys(static::$_statMap))) {
			return false;
		}
		
	  $perfect = static::$_limits[static::$_typeMap[$type]]['values'][static::$_statMap[$stat]];
		if($perfect == 0) {
		  return false;
			// var_dump($item->type, $key); exit;
		} else {
			$rating = round($value / $perfect * 100, 1);					
		}
		if($asArray == true) {
		  return array(
		    'rating' => $rating,
		    'perfect' => $perfect,
		    'value' => $value,
		  );
		}
		return "<span class='percent'>".$rating."%</span> of ".$perfect;
	}
	public static function calc($item) {

		if(!in_array($item->type, static::$_typeMap)) {
			return false;
		}
		if(!$item->attrs) {
			return false;
		}
		$idx = array_search($item->type, array_flip(static::$_typeMap));
		$ratings = array();
		$perfect = false;
		if($item->attrs) {
			foreach($item->attrs as $key => $value) {
				if(!in_array($key, array_keys(static::$_statMap))) {
					continue;
				}
				if(isset(static::$_typeMap[$item->type]) && isset(static::$_statMap[$key])) {
				  if(isset(static::$_limits[static::$_typeMap[$item->type]]['values'][static::$_statMap[$key]])) {
    				$perfect = static::$_limits[static::$_typeMap[$item->type]]['values'][static::$_statMap[$key]];				  				    
				  }
				}
				if(!$perfect) {
					// var_dump($item->type, $key); exit;
				} else {
          if(!is_array($value) && !is_object($value)) {
  					$rating = round($value / $perfect * 100, 1);					
  					$ratings[$key] = $rating;            
          }
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
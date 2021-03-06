<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class AjaxController extends D3Up_Controller_Action
{
  public function compareAction() {
    $this->view->params = $params = $this->getRequest()->getParams();
    // Get our Build
    $id = (int) $params['build'];
    $build = $this->view->build = Epic_Mongo::db('build')->fetchOne(array("id" => $id));    
    if(!$build) {
      echo "A build must be selected to compare against."; exit;
    }
		// Create an Item!
		$this->view->item = $item = Epic_Mongo::newDoc('item');
    $item->_createdBy = Epic_Mongo::db('user')->fetchOne(array('id' => (int) $build->_createdBy->id));
		$item->_d3bit = true;
		$item->name = $params['name'];
		$item->quality = array_search($params['quality'], $this->_qualityMap);
		if(!isset($params['type']) || $params['type'] == "Unknown") {
		  throw new Exception("The type of item must be defined before a compare can occur.");
		}
		$item->stats = array();
		$item->type = $this->_typeMap[$params['type']];
		if(isset($params['dps'])) {
			if(in_array($item->type, array('axe','ceremonial-knife','hand-crossbow','dagger','fist-weapon','mace','mighty-weapon','spear','sword','wand','2h-mace','2h-axe','bow','daibo','crossbow','2h-mighty','polearm','staff','2h-sword'))) {
				$item->stats += array(
					'dps' => (int) $params['dps'],
				);
			} else {
				$item->stats += array(
					'armor' => (int) $params['dps'],
				);
			}			
		}
		foreach(explode(",", $params['stats']) as $v) {
			$parts = explode(" ", trim($v));
      if(count($parts) > 1) {
       	$name = array_search(strtolower($parts[1]), array_map('strtolower', $this->_statMap));
        // var_dump($name);
  			if($name) {				
	
  			  if($name == "sockets") {
  		      $sockets = array();
  		      $total = (int) $parts[0];
            for($i = 0; $i < $total; $i++) {
              $sockets[] = "";
            }
            $item->sockets = $sockets;
					} else if(in_array($name, array("poison-damage", "lightning-damage", "arcane-damage", "holy-damage", "fire-damage", "cold-damage", "minmax-damage"))) {
						$pieces = explode("-", $parts[0]);
						if(count($pieces) > 1) {
							$item->attrs->$name = array(
								'min' => $pieces[0],
								'max' => $pieces[1]
							);							
						}
  			  } else {
    				$item->attrs->$name = (float) $parts[0];							    
  			  }
  			} 
      } else {
        
      }
		}
    // exit;
		if(isset($params['meta'])) {
		 	$parts = explode(",", $params['meta']);
      // var_dump($parts); 
		 	if($item->sockets) {
		 	  $newSockets = array();
		 	  for($i = 0; $i < count($item->sockets); $i ++) {
		 	    $matched = false;
		 	    $socket = array_pop($parts);
		 	    $p = explode(" ", $socket);
		 	    array_push($parts, $socket);
		 	    if(count($p) > 1) {
      			$name = array_search(strtolower($p[1]), array_map('strtolower', $this->_statMap));
      			$match = array($name, (int) $p[0]);
  		 	    foreach(D3Up_Tool_Gems::$gems as $slug => $gem) {
  		 	      foreach($gem as $stat => $value) {
  		 	        if(is_array($value) && $match == $value) {
  		 	          $matched = true;
  		 	          array_pop($parts);
                  $newSockets[] = $slug;
                  break;
  		 	        }
  		 	      }
  		 	    }		 	      
		 	    }
		 	    if(!$matched) {
		 	      $newSockets[] = "";
 		 	    }
		 	  }
		 	  $item->sockets = $newSockets;
		 	}
      // var_dump($item->sockets); exit;
	 	  
		 	if(count($parts)) {
		 	 	$range = explode("-", $parts[0]);
    		if(count($range) > 1) {
    			if(in_array($item->type, array('axe','ceremonial-knife','hand-crossbow','dagger','fist-weapon','mace','mighty-weapon','spear','sword','wand','2h-mace','2h-axe','bow','daibo','crossbow','2h-mighty','polearm','staff','2h-sword'))) {
    				$item->stats += array(
    					'damage' => array(
    					  'min' => (int) $range[0],
    					  'max' => (int) $range[1],
    					)
    				);
    			} elseif(in_array($item->type, array('shield'))) {
    				$item->stats += array(
    					'block-amount' => array(
    					  'min' => (int) $range[0],
    					  'max' => (int) $range[1],
    					)
    				);
    			} else {

    			}
    		}
        // var_dump($parts);
        if(isset($parts[1])) {
          // var_dump($parts); 
    		  
          if(in_array($item->type, array('axe','ceremonial-knife','hand-crossbow','dagger','fist-weapon','mace','mighty-weapon','spear','sword','wand','2h-mace','2h-axe','bow','daibo','crossbow','2h-mighty','polearm','staff','2h-sword'))) {
    				$item->stats += array(
    					'speed' => (float) $parts[1],
    				);
    			} elseif(in_array($item->type, array('shield'))) {
    				$item->stats += array(
    					'block-chance' => (float) $parts[1],
    				);
    			}
        } 
		 	}
		}
    // var_dump($item->export()); exit;
		$query = array(
		  'type' => $item->type,
		  'stats' => $item->stats,
		  'attrs' => $item->attrs->export(),
		  'sockets' => $item->sockets,
		  '_createdBy' => $build->_createdBy->createReference(),
		);
		// Has this user scanned this item?
    $test = Epic_Mongo::db('item')->fetchOne($query);
    if(isset($params['dump'])) {
      echo "<pre>"; 
      var_dump($params, $item->export(), "Existing Items: " . (bool) $test); exit;      
    }
    
    if($test) {
      // Just use it instead...
      $this->view->item = $item = $test;
			$item->_created = time();
			$item->save();
    } else {
  		$item->save();      
    }
		$this->view->slots = $item->getPossibleSlots();
    $this->_helper->layout->setLayout('d3bit');
  }
  public function buildsAction() {
    $username = $this->getRequest()->getParam("username");
    if(!$username) {
      echo json_encode(array("errors" => "You must provide a username to fetch your builds.")); exit;
    }
    $user = Epic_Mongo::db("user")->fetchOne(array("username" => strtolower(trim($username))));
    if(!$user) {
      echo json_encode(array("errors" => "Invalid Username, please check that it is correct.")); exit;
    }
    $query = array(
      "_createdBy" => $user->createReference()
    );
    $builds = Epic_Mongo::db('build')->fetchAll($query);
    if(!count($builds)) {
      echo json_encode(array("errors" => "No builds are associated to this username.")); exit;
    }
    $data = array();
    foreach($builds as $build) {
      $data[$build->id] = $build->name;
    }
    echo json_encode(array("builds" => $data)); exit;
  }
	public function testAction() {
		
	}
	// 2012-08-14T17:53:16-05:00 INFO (6): -----------
	// 2012-08-14T17:53:16-05:00 INFO (6): controller: ajax
	// 2012-08-14T17:53:16-05:00 INFO (6): action: uploaditem
	// 2012-08-14T17:53:16-05:00 INFO (6): module: default
	// 2012-08-14T17:53:16-05:00 INFO (6): filename: tooltip.png
	// 2012-08-14T17:53:16-05:00 INFO (6): fileformat: .png
	// 2012-08-14T17:53:16-05:00 INFO (6): xyz: placeholder
	// 2012-08-14T17:53:16-05:00 INFO (6): n: ETERNITY TALE
	// 2012-08-14T17:53:16-05:00 INFO (6): q: Rare
	// 2012-08-14T17:53:16-05:00 INFO (6): d: 0
	// 2012-08-14T17:53:16-05:00 INFO (6): t: Ring
	// 2012-08-14T17:53:16-05:00 INFO (6): a: 
	// 2012-08-14T17:53:16-05:00 INFO (6): s: asdfasdfasdfasdf
	// -------------------------------------------
	//   postParameters.Add("n", name);
	//   postParameters.Add("q", quality);
	//   postParameters.Add("d", dps);
	//   postParameters.Add("t", type);
	//   postParameters.Add("a", stats);
	//   postParameters.Add("s", Properties.Settings.Default.Secret.Trim());
	public function uploaditemAction() {
		// Log the AJAX request for analysis
		$writer = new Zend_Log_Writer_Stream('/tmp/d3up-ajax');
		$logger = new Zend_Log($writer);
		$logger->info("-----------");
		foreach($this->getRequest()->getParams() as $k => $v) {
			$logger->info($k . ": " . $v);			
		}
		// Get what was sent
		$params = $this->getRequest()->getParams();
		// Create an Item!
		$this->view->item = $item = Epic_Mongo::newDoc('item');
		$item->_d3bit = true;
		$item->name = $params['n'];
		$item->quality = array_search($params['q'], $this->_qualityMap);
		$item->type = $this->_typeMap[$params['t']];
		if(isset($params['d'])) {
			if(in_array($item->type, array('axe','ceremonial-knife','hand-crossbow','dagger','fist-weapon','mace','mighty-weapon','spear','sword','wand','2h-mace','2h-axe','bow','daibo','crossbow','2h-mighty','polearm','staff','2h-sword'))) {
				$item->stats = array(
					'dps' => $params['d'],
				);
			} else {
				$item->stats = array(
					'armor' => $params['d'],
				);
			}			
		}
		foreach(explode(", ", $params['a']) as $v) {
			$parts = explode(" ", $v);
			$name = array_search(strtolower($parts[1]), array_map('strtolower', $this->_statMap));
			if($name) {
				$item->attrs->$name = (float) $parts[0];									
			}
		}
		$item->save();
		echo json_encode(array(
			'status' => 'success',
			'link' => 'http://beta.d3up.com/i/'.$item->id,
			'msg' => 'Test Message from D3Up!',
		));
		exit;
	}
	
	protected $_qualityMap = array(
		null => '',
	 	1 => 'Unknown',
	 	2 => 'Normal',
	 	3 => 'Superior',
	 	4 => 'Magic',
	 	5 => 'Rare',
	 	6 => 'Legendary',
	 	7 => 'Set',
	);

	protected $_typeMap = array(
		'Axe' => 'axe', 
		'Ceremonial Knife' => 'ceremonial-knife', 
		'Hand Crossbow' => 'hand-crossbow', 
		'Dagger' => 'dagger', 
		'Fist Weapon' => 'fist-weapon', 
		'Mace' => 'mace', 
		'Mighty Weapon' => 'mighty-weapon', 
		'Spear' => 'spear', 
		'Sword' => 'sword',
		'Wand' => 'wand',
		'Two-Handed Axe' => '2h-axe', 
		'Bow' => 'bow', 
		'Daibo' => 'daibo', 
		'Crossbow' => 'crossbow', 
		'Two-Handed Mace' => '2h-mace', 
		'Two-Handed Mighty Weapon' => '2h-mighty', 
		'Polearm' => 'polearm', 
		'Staff' => 'staff', 
		'Two-Handed Sword' => '2h-sword', 
		'Mojo' => 'mojo', 
		'Source' => 'source', 
		'Quiver' => 'quiver', 
		'Enchantress Focus' => 'unknown',
		'Scoundrel Token' => 'unknown',
		'Templar Relic' => 'unknown',
		'Shield' => 'shield',
		'Ring' => 'ring', 
		'Amulet' => 'amulet', 
		'Shoulders' => 'shoulders',
		'Helm' => 'helm', 
		'Pants' => 'pants', 
		'Gloves' => 'gloves', 
		'Chest Armor' => 'chest', 
		'Bracers' => 'bracers', 
		'Boots' => 'boots', 
		'Belt' => 'belt', 
		'Cloak' => 'cloak', 
		'Mighty Belt' => 'mighty-belt', 
		'Spirit Stone' => 'spirit-stone', 
		'Voodoo Mask' => 'voodoo-mask', 
		'Wizard Hat' => 'wizard-hat', 
	);

	protected $_statMap = array(
	  'sockets' => "Soc",
		// Base Stats 
		'strength' => "Str",
		'intelligence' => "Int",
		'vitality' => "Vit",
		'dexterity' => "Dex",
		// Defensive Stats 
		'resist-all' => "AR",
		'armor' => "Armor",
		'plus-life' => "Life%",
		'life-regen' => "LRegen",
		'plus-block' => "Block",
		'cc-reduce' => "ReCC",
		'elite-reduce' => "RDElite",
		'melee-reduce' => "RDMelee",
		'range-reduce' => "RDRanged",
		'arcane-resist' => "ArcR",
		'cold-resist' => "ColdR",
		'fire-resist' => "FireR",
		'lightning-resist' => "LtnR",
		'physical-resist' => "PhyR",
		'poison-resist' => "PoisonR",
		'thorns' => "Thorn",
		// Offensive Stats
		// 'damage' => "Dmg",
		'attack-speed' => "AtkSpd",
		'critical-hit' => "Crit",
		'critical-hit-damage' => "CritD",
		'plus-damage' => "Dmg%",
		'min-damage' => "MinD",
		'max-damage' => "MaxD",
		'minmax-damage' => "Dmg",
		'plus-aps' => 'APS',
		// Elemental Damage 
		'plus-arcane-damage' => "ArcD%",
		'plus-cold-damage' => "ColdD%",
		'plus-fire-damage' => "FireD%",
		'plus-holy-damage' => "HolyD%",
		'plus-lightning-damage' => "LtnD%",
		'plus-poison-damage' => "PoisonD%",
		'plus-arcane-damage-skills' => "ArcSk%",
		'plus-cold-damage-skills' => "ColdSk%",
		'plus-fire-damage-skills' => "FireSk%",
		'plus-holy-damage-skills' => "HolySk%",
		'plus-lightning-damage-skills' => "LtnSk%",
		'plus-poison-damage-skills' => "PoisonSk%",
		'arcane-damage' => "ArcD",
		'cold-damage' => "ColdD",
		'fire-damage' => "FireD",
		'holy-damage' => "HolyD",
		'lightning-damage' => "LtnD",
		'poison-damage' => "PoisonD",
		'elite-damage' => "EliteD",
		'demon-damage' => "DemonD",
		'human-damage' => "HumanD",
		'chance-bleed' => "Bleed",
		'chance-blind' => "Blind",
		'chance-chill' => "Chill",
		'chance-fear' => "Fear",
		'chance-freeze' => "Freeze",
		'chance-immobilize' => "Immobilize",
		'chance-knockback' => "Knockback",
		'chance-slow' => "Slow",
		'chance-stun' => "Stun",
		// Etc 
		'plus-movement' => "MvSpd",
		'plus-pickup-radius' => "Pick",
		'plus-experience' => "Exp",
		'plus-experience-percent' => "???",
		'plus-gold-find' => "GF",
		'plus-magic-find' => "MF",
		'health-globes' => "GlobeHP",
		'life-steal' => "LS",
		'life-kill' => "LoK",
		'life-hit' => "LoH",
		'level-reduce' => "LvlRe",
		'indestructible' => "Ind",
		// Barbarian 
		'bb-bash' => "B-Bash",
		'bb-cleave' => "B-Cleave",
		'bb-frenzy' => "B-Frenzy",
		'bb-rend' => "B-Rend",
		'bb-revenge' => "B-Revenge",
		'bb-weapon-throw' => "B-WThrow",
		'bb-hammer-of-the-ancients' => "B-HoA",
		'bb-whirlwind' => "B-WW",
		'bb-overpower' => "B-OP",
		'bb-seismic-slam' => "B-SS",
		'fury-max' => "MaxFury",
		// Demon Hunter 
		'hatred-regen' => "HateRegen",
		'max-discipline' => "MaxDisc",
		'dh-chakram' => "D-Chakram",
		'dh-evasive-fire' => "D-EFire",
		'dh-grenades' => "D-Grenades",
		'dh-impale' => "D-Impale",
		'dh-spike-trap' => "D-STrap",
		'dh-bola-shot' => "D-BS",
		'dh-elemental-arrow' => "D-EA",
		'dh-entangling-shot' => "D-ES",
		'dh-hungering-arrow' => "D-HA",
		'dh-multishot' => "D-MS",
		'dh-rapid-fire' => "D-RF",
		// Monk
		'spirit-spent-life' => "LPS",
		'spirit-regen' => "SpiritRegen",
		'mk-crippling-wave' => "M-CWave",
		'mk-cyclone-strike' => "M-CStrike",
		'mk-deadly-reach' => "M-DReach",
		'mk-exploding-palm' => "M-EPalm",
		'mk-fists-of-thunder' => "M-FoT",
		'mk-sweeping-wind' => "M-SWind",
		'mk-way-of-the-hundred-fists' => "M-WotHF",
		'mk-lashing-tail-kick' => "M-LTK",
		'mk-tempest-rush' => "M-TR",
		'mk-wave-of-light' => "M-WoL",
		// Witch Doctor
		'mana-regen' => "ManaRegen",
		'mana-max' => "MaxMana",
		'wd-firebomb' => "W-FBomb",
		'wd-haunt' => "W-Haunt",
		'wd-acid-cloud' => "W-ACloud",
		'wd-firebats' => "W-FBats",
		'wd-zombie-dogs' => "W-ZDogs",
		'wd-plague-of-toads' => "W-PoT",
		'wd-poison-darts' => "W-PD",
		'wd-spirit-barrage' => "W-SB",
		'wd-wall-of-zombies' => "W-WoZ",
		'wd-zombie-charger' => "W-ZC",
		// Wizard 
		'ap-on-crit' => "ArcPCrit",
		'ap-max' => "MaxArcP",
		'wz-arcane-torrent' => "Z-ATorrent",
		'wz-disintegrate' => "Z-DisInt",
		'wz-electrocute' => "Z-Elec",
		'wz-explosive-blast' => "Z-EB",
		'wz-hydra' => "Z-Hydra",
		'wz-ray-of-frost' => "Z-RoF",
		'wz-energy-twister' => "Z-ET",
		'wz-magic-missle' => "Z-MM",
		'wz-arcane-orb' => "Z-AO",
		'wz-blizzard' => "Z-Blizz",
		'wz-meteor' => "Z-Meteor",
		'wz-shock-pulse' => "Z-SP",
		'wz-spectral-blade' => "Z-SB",
	);

} // END class AjaxController extends Epic_Controller_Action
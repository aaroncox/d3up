<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class AjaxController extends Epic_Controller_Action
{
  public function compareAction() {
    echo "<pre>"; var_dump($this->getRequest()->getParams()); exit;
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
			if(in_array($item->type, array('axe','ceremonial-knife','hand-crossbow','dagger','fist-weapon','mace','mighty-weapon','spear','sword','wand','2h-mace','2h-axe','bow','diabo','crossbow','2h-mighty','polearm','staff','2h-sword'))) {
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
			$name = array_search($parts[1], $this->_statMap);
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
	 	1 => 'Inferior',
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
		'Daibo' => 'diabo', 
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
		// Base Stats 
		'strength' => "Str",
		'intelligence' => "Int",
		'vitality' => "Dex",
		'dexterity' => "Vit",
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
		'damage' => "Dmg",
		'attack-speed' => "AtkSpd",
		'critical-hit' => "Crit",
		'critical-hit-damage' => "CritD",
		'plus-damage' => "Dmg%",
		'min-damage' => "MinD",
		'max-damage' => "MaxD",
		'minmax-damage' => "Dmg",
		// Elemental Damage 
		'plus-arcane-damage' => "ArcD",
		'plus-cold-damage' => "ColdD",
		'plus-fire-damage' => "FireD",
		'plus-holy-damage' => "HolyD",
		'plus-lightning-damage' => "LtnD",
		'plus-poison-damage' => "PoisonD",
		'arcane-damage' => "ArcD",
		'cold-damage' => "ColdD",
		'fire-damage' => "FireD",
		'holy-damage' => "HolyD",
		'lightning-damage' => "LtnD",
		'poison-damage' => "PoisonD",
		'elite-damage' => "???",
		'chance-bleed' => "Bleed",
		'chance-blind' => "???",
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
		'wd-acid-clouds' => "W-ACloud",
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
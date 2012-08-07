<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Item extends Epic_Form
{

	protected $_item = null;
	
	protected $_attributes = array(
		// Base Attributes
		'strength' => '+ Strength',
		'intelligence' => '+ Intelligence',
		'vitality' => '+ Vitality',
		'dexterity' => '+ Dexterity',
		// Defense
		'resist-all' => '+ Resistance to All Elements',
		'armor' => '+ Armor',
		'plus-life' => '+% Life',
		'life-regen' => 'Regenerates  Life per Second',
		// Percent Reductions
		'cc-reduce' => 'Reduces the duration of control impairing effects by %',
		'elite-reduce' => 'Reduces damage from elites by %',
		'melee-reduce' => 'Reduces damage from melee attacks by %',
		'range-reduce' => 'Reduces damage from ranged attacks by %',
		// Shield Attributes
		'plus-block' => '+% Chance to Block',
		// Resistances
		'arcane-resist' => '+ Arcane Resistance',
		'cold-resist' => '+ Cold Resistance',
		'fire-resist' => '+ Fire Resistance',
		'lightning-resist' => '+ Lightning Resistance',
		'physical-resist' => '+ Physical Resistance',
		'poison-resist' => '+ Poison Resistance',
		'thorns' => 'Melee attackers take  damage per hit',
		// Offense
		'attack-speed' => 'Attack speed increased by %',
		'plus-attack-speed' => 'Attack speed increased by %',
		'critical-hit' => 'Critical Hit Chance increased by %',
		'critical-hit-damage' => 'Critical Hit Damage increased by %',
		'plus-damage' => '+% Damage',
		'min-damage' => '+ Minimum Damage',
		'max-damage' => '+ Maximum Damage',
		'minmax-damage' => '+ Min/Max Damage',
		'life-steal' => '% of Damage Dealt is Converted to Life (Steal)',
		'life-kill' => '+ Life after each Kill',
		'life-hit' => 'Each hit adds + Life',		
		// Weapon Flat damage ranges
		'arcane-damage' => '+Min/Max Arcane Damage',
		'cold-damage' => '+Min/Max Cold Damage',
		'fire-damage' => '+Min/Max Fire Damage',
		'holy-damage' => '+Min/Max Holy Damage',
		'lightning-damage' => '+Min/Max Lightning Damage',
		'poison-damage' => '+Min/Max Poison Damage',
		// Elemental Bonus Damage
		'plus-arcane-damage' => 'Adds +% to Arcane Damage',
		'plus-cold-damage' => 'Adds +% to Cold Damage',
		'plus-fire-damage' => 'Adds +% to Fire Damage',
		'plus-holy-damage' => 'Adds +% to Holy Damage',
		'plus-lightning-damage' => 'Adds +% to Lightning Damage',
		'plus-poison-damage' => 'Adds +% to Poison Damage',
		// Percent Increases
		'elite-damage' => 'Increases Damage against Elites by %',
		'demon-damage' => '+% Damage to Demons',
		// Procs
		'chance-bleed' => '% chance to inflict Bleed for  damage over 5 seconds',
		'chance-blind' => '% chance to Blind on Hit',
		'chance-chill' => '% chance to Chill on Hit',
		'chance-fear' => '% chance to Fear on Hit',
		'chance-freeze' => '% chance to Freeze on Hit',
		'chance-immobilize' => '% chance to Immobilize on Hit',
		'chance-knockback' => '% chance to Knockback on Hit',
		'chance-slow' => '% chance to Slow on Hit',
		'chance-stun' => '% chance to Stun on Hit',
		// Misc
		'plus-movement' => '+% Movement Speed',
		'plus-pickup-radius' => 'Increases Gold and Health pickup by  yards',
		'plus-experience' => 'Monster kills grant + experience',
		'plus-gold-find' => '+% Extra Gold from Monsters',
		'plus-magic-find' => '% Better Chance of finding Magic Items',
		'health-globes' => 'Health Globes grant + Life',
		'level-reduce' => 'Level Requirement reduced by ',
		'indestructable' => 'Ignores durability loss',
		// Barbarian
		'fury-max' => '+ Maximum Fury',
		'fury-spent-life' => 'Gain  Life per Fury Spent',
		'bb-bash' => 'Increases bash damage by %',
		'bb-cleave' => 'Increases cleave damage by %',
		'bb-frenzy' => 'Increases frenzy damage by %',
		'bb-rend' => 'Reduces resource cost of Rend by  Fury',
		'bb-revenge' => 'Increases Critical Hit Chance of Revenge by %',
		'bb-weapon-throw' => 'Reduces resource cost of Weapon Throw by  Fury',
		'bb-hammer-of-the-ancients' => 'Reduces resource cost of Hammer of the Ancients by  Fury',
		'bb-whirlwind' => 'Increases Critical Hit Chance of Whirlwind by %',
		'bb-overpower' => 'Increases Critical Hit Chance of Overpower by %',
		'bb-seismic-slam' => 'Increases Critical Hit Chance of Seismic Slam by %',
		// Demon Hunter
		'hatred-regen' => 'Increases Hatred Regeneration by  per Second',
		'max-discipline' => '+ Maximum Discipline',
		'discipline-regen' => 'Increases Discipline Regeneration by  per Second',
		'dh-cluster-arrow' => 'Reduces resource cost of Cluster Arrow by  Hatred.',
		'dh-chakram' => 'Reduces resource cost of Chakram by  Hatred',
		'dh-evasive-fire' => 'Increases Evasive Fire damage by %',
		'dh-grenades' => 'Increases Grenades Damage by [V]%',
		'dh-impale' => 'Reduces resource cost of Impale by  Hatred',
		'dh-spike-trap' => 'Increases Spike Trap damage by %',
		'dh-bola-shot' => 'Increases Bola Shot damage by %',
		'dh-elemental-arrow' => 'Increases Elemental Arrow damage by %',
		'dh-entangling-shot' => 'Increases Entangling Shot damage by %',
		'dh-hungering-arrow' => 'Increases Hungering Arrow damage by %',
		'dh-multishot' => 'Increases Critical Hit Chance of Multishot by %',
		'dh-rapid-fire' => 'Increases Critical Hit Chance of Rapid Fire by %',
		// Monk
		'spirit-spent-life' => 'Gain  per Spirit Spent',
		'spirit-regen' => 'Increases Spirit Regeneration by  per Second',
		'mk-crippling-wave' => 'Increases Crippling Wave damage by %',
		'mk-cyclone-strike' => 'Reduces resource cost of Cyclone Strike by  Spirit',
		'mk-deadly-reach' => 'Increases Deadly Reach damage by %',
		'mk-exploding-palm' => 'Increases Exploding Palm damage by %',
		'mk-fists-of-thunder' => 'Increases Fist of Thunder damage by %',
		'mk-sweeping-wind' => 'Increases Sweeping Wind damage by %',
		'mk-way-of-the-hundred-fists' => 'Increases Way of the Hundred Fists damage by %',
		'mk-lashing-tail-kick' => 'Reduces resource cost of Lashing Tail Kick by  Spirit',
		'mk-tempest-rush' => 'Increases Critical Hit Chance of Tempest Rush by %',
		'mk-wave-of-light' => 'Increases Critical Hit Chance of Wave of Light by %',
		// Witch Doctor
		'mana-regen' => 'Increases Mana Regeneration by  per Second',
		'mana-max' => '+ Maximum Mana',
		'mana-kill' => 'Grants  Mana per Kill',
		'wd-firebomb' => 'Reduces resource cost of Firebomb by  Mana',
		'wd-haunt' => 'Increases Haunt Damage by %',
		'wd-acid-clouds' => 'Increases Critical Hit Chance of Acid Clouds by %',
		'wd-firebats' => 'Reduces resource cost of Firebats by  Mana',
		'wd-zombie-dogs' => 'Reduces cooldown of Summon Zombie Dogs by  Seconds',
		'wd-plague-of-toads' => 'Increases Plague of Toads damage by %',
		'wd-poison-darts' => 'Increaeses Poison Darts damage by %',
		'wd-spirit-barrage' => 'Increases Spirit Barrage damage by %',
		'wd-wall-of-zombies' => 'Reduces cooldown of Wall of Zombies by  Seconds',
		'wd-zombie-charger' => 'Reduces resource cost of Zombie Charger by  Mana',
		// Wizard
		'ap-on-crit' => 'Critical Hits grant  Arcane Power',
		'ap-max' => '+ Maximum Arcane Power',
		'wz-arcane-torrent' => 'Reduces resource cost of Arcane Torrent by  Arcane Power',
		'wz-disintegrate' => 'Reduces resource cost of Disintegrate by  Arcane Power',
		'wz-electrocute' => 'Increases Electrocute damage by %',
		'wz-explosive-blast' => 'Increases Critical Hit Chance of Explosive Blast by %',
		'wz-hydra' => 'Reduces resource cost of Hydra by  Arcane Power',
		'wz-ray-of-frost' => 'Increases Critical Hit Chance of Ray of Frost by %',
		'wz-energy-twister' => 'Increases Critical Hit Chance of Energy Twister by %',
		'wz-magic-missle' => 'Increases Magic Missle damage by %',
		'wz-arcane-orb' => 'Increases Critical Hit Chance of Arcane Orb by %',
		'wz-blizzard' => 'Increases duration of Blizzard by  Seconds',
		'wz-meteor' => 'Reduces resource cost of Meteor by  Arcane Power',
		'wz-shock-pulse' => 'Increases Shock Pulse damage by %',
		'wz-spectral-blade' => 'Increases Spectral Blade damage by %'
	);

	public function getItem()
	{
		if (!$this->_item instanceOf Epic_Mongo_Document_Record) {
			$this->_item = Epic_Mongo::newDoc('item');			
		}
		return $this->_item;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setItem($item)
	{
		$this->_item = $item;
		return $this;
	}
	
	protected $_build = null;
	protected $_slot = null;
	
	public function setBuildToEquip($id) {
		$this->_build = Epic_Mongo::db('build')->fetchOne(array("id" => (int) $id));
	}

	public function setSlot($slot) {
		$this->_slot = $slot;
		if(!$slot) return null;
		$acceptable = Epic_Mongo::db('gearset')->getAcceptableTypes($slot);
		$this->itemType->setValue(array_pop($acceptable));
	}
	
	public function getBuild() {
		return $this->_build;
	}
	
	protected $_return = null;
	
	public function setReturnMethod($method) {
		$this->_return = $method;
	}

	/**
	 * Checks if the document is new
	 *
	 * @return boolean
	 * @author Corey Frang
	 **/
	public function isNewRecord()
	{
		return ($this->_item) ? false : true;
	}

  public function __construct($options = null)
	{
		parent::__construct( $options );
		
	}

	/**
	 * init - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function init()
	{
		parent::init();
		$item = $this->getItem();

		$this->addElement("text", "name", array(
			'required' => true,
			'label' => 'Name',
			'validators' => array(
				array('StringLength', false, array(2, 50)),
			),
			'filters' => array('StripTags'),
			'tabindex' => 10,
		));

		$this->addElement("select", "itemType", array(
			'required' => true,
			'label' => 'Type',
			'data-placeholder' => 'What type of item is this?',
			'multiOptions' => array(
				null => '',
				'amulet' => 'Amulet',
				'belt' => 'Belt',
				'boots' => 'Boots',
				'bracers' => 'Bracers',
				'chest' => 'Chest Armor',
				'cloak' => 'Cloak',
				'gloves' => 'Gloves',
				'helm' => 'Helm',
				'pants' => 'Pants',
				'mighty-belt' => 'Mighty Belt',
				'ring' => 'Ring',
				'shoulders' => 'Shoulders',
				'spirit-stone' => 'Spirit Stone',
				'voodoo-mask' => 'Voodoo Mask',
				'wizard-hat' => 'Wizard Hat',
				'2h-mace' => 'Two-Handed Mace',
				'2h-axe' => 'Two-Handed Axe',
				'bow' => 'Bow',
				'diabo' => 'Diabo',
				'crossbow' => 'Crossbow',
				'2h-mighty' => 'Two-Handed Mighty Weapon',
				'polearm' => 'Polearm',
				'staff' => 'Staff',
				'2h-sword' => 'Two-Handed Sword',
				'axe' => 'Axe',
				'ceremonial-knife' => 'Ceremonial Knife',
				'hand-crossbow' => 'Hand Crossbow',
				'dagger' => 'Dagger',
				'fist-weapon' => 'Fist Weapon',
				'mace' => 'Mace',
				'mighty-weapon' => 'Mighty Weapon',
				'spear' => 'Spear',
				'sword' => 'Sword',
				'wand' => 'Wand',
				'mojo' => 'Mojo',
				'source' => 'Source',
				'quiver' => 'Quiver',
				'shield' => 'Shield',
			),
			'filters' => array('StripTags'),
			'tabindex' => 15,
		));
		
		$this->addElement("select", "quality", array(
			'required' => true,
			'label' => 'Quality',
			'data-placeholder' => 'What quality/rarity is this item?',
			'multiOptions' => array(
				null => '',
			 	1 => 'Inferior',
			 	2 => 'Normal',
			 	3 => 'Superior',
			 	4 => 'Magic',
			 	5 => 'Rare',
			 	6 => 'Legendary',
			 	7 => 'Set',
			),
			'filters' => array('StripTags'),
			'tabindex' => 20,
		));
		
		$this->addElement("select", "attributes", array(
			'label' => 'Which stats does this item have?',
			'data-placeholder' => 'Select all of the stats you wish to display',
			'multiple' => true,
			'multiOptions' => array(null => '') + $this->_attributes,
			'tabindex' => 25,			
		));
		$this->attributes->setRegisterInArrayValidator(false);
		
		$this->addElement("select", "sockets", array(
			'label' => 'Does this item have sockets?',
			'multiOptions' => array(
				null => '0 Sockets',
				1 => '1 Socket',
				2 => '2 Sockets',
				3 => '3 Sockets',
			),
			'filters' => array('StripTags'),
			'tabindex' => 30,
		));
				
		$attrs = array();
		if($item->attrs) {
			$attrs = $item->attrs->export();
		}
		
		$sockets = null;
		if($item->sockets) {
			$sockets = count($item->sockets); 
		}

		if(!$item->isNewDocument()) {
			$this->setDefaults(array(
				'name' => $item->name,
				'itemType' => $item->type,
				'quality' => $item->quality,
				'attributes' => array_keys($attrs),
				'sockets' => $sockets,
			));			
		}

		$this->setButtons(array("save" => "Create Item"));		
	}
	
	public function save() {
		$item = $this->getItem();

		// Set the Name of the Item
		$item->name = $this->name->getValue();
		// Are we a new item? If so, add some meta
		if(!$item->_created) {
			$item->_created = time();
		}
		// Set the Quality of the Item
		$item->quality = (int) $this->quality->getValue();
		// Set the Type of the Item
		$item->type = $this->itemType->getValue();
		// Did we specify sockets? Lets set them up
		if($socketCount = (int) $this->sockets->getValue()) {
			$sockets = array();
			for($i = 0; $i < $socketCount; $i++) {
				if(isset($this->_allData['socket'.$i])) {
					$sockets[$i] = $this->_allData['socket'.$i];					
				}
			}
			$item->sockets = $sockets;
		} else {
			$item->sockets = null;
		}
		// Determine and set Item Specific Values (Armor vs Weapons)
		switch($this->itemType->getValue()) {
			case "shield":
				$stats = array(
					'armor' => (int) $this->_allData['stat_armor'],
					'block-chance' => (float) $this->_allData['stat_block-chance'],
					'block-amount' => array(
						'min' => (int) $this->_allData['stat_block-min'],
						'max' => (int) $this->_allData['stat_block-max'],
					)
				);
				$item->stats = $stats;
				break;
			case "belt":
			case "boots":
			case "bracers":
			case "chest":
			case "cloak":
			case "gloves":
			case "helm":
			case "pants":
			case "mighty-belt":
			case "shoulders":
			case "spirit-stone":
			case "voodoo-mask":
			case "wizard-hat":
				$stats = array(
					'armor' => (int) $this->_allData['stat_armor'],
				);
				$item->stats = $stats;
				break;
			case "2h-mace":
			case "2h-axe":
			case "bow":
			case "diabo":
			case "crossbow":
			case "2h-mighty":
			case "polearm":
			case "staff":
			case "2h-sword":
			case "axe":
			case "ceremonial-knife":
			case "hand-crossbow":
			case "dagger":
			case "fist-weapon":
			case "mace":
			case "mighty-weapon":
			case "spear":
			case "sword":
			case "wand":
				$stats = array(
					'dps' => (float) $this->_allData['stat_dps'],
					'speed' => (float) $this->_allData['stat_speed'],
					'damage' => array(
						'min' => (int) $this->_allData['stat_damage-min'],
						'max' => (int) $this->_allData['stat_damage-max'],
					),
				);
				$item->stats = $stats;
				break;
			default:
				break;
		}
		// Determine Valid Attributes to Save (Somewhat Protected the form)
		$valid = $this->_attributes; //D3Up_View_Helper_DisplayItem::getAttributeMap();
		// Loop through attributes passed in and parse them into the attrs array
		$attrs = new D3Up_Mongo_Record_Item_Attributes();
		foreach($this->_allData as $key => $value) {
			if(array_key_exists($key, $valid)) {
				$testRange = explode("-", $value);
				if(count($testRange) > 1) {
					$attrs[$key] = array(
						'min' => (float) $testRange[0],
						'max' => (float) $testRange[1]
					);
				} else {
					if(is_float($value) || is_numeric($value)) {
						if($value > 99999) {
							$attrs[$key] = (float) 99999;						
						} else {
							$attrs[$key] = (float) $value;												
						}
					} else {
						$attrs[$key] = $value;
					}					
				}
			}
		}		
		if(isset($this->_allData['setBonus'])) {
			$item->set = $this->_allData['setBonus'];
		}
		// Assign the attrs to the item
		$item->attrs = $attrs;
		// Do we have a user creating this? If so, add it.
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$item->_createdBy = $profile;
		}
		// Are we equipping this onto a build?
		if($this->_build && $this->_slot) {
			// What type of item is this?
			$type = $this->_slot;
			// Save the Item
			$item->save();
			// Equip the new Item
			$this->_build->equipment->$type = $item;
			// Save the Build
			$this->_build->save();
			// Redirect to the build now
		}
		// Do we have a return path?
		if($this->_return) {
			$item->save();
			return $this->_return;
		}
		// var_dump($item->export()); exit;
		// Return the Item
		return $item->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}
	public function render()
	{
		$this->removeDecorator('FloatClear');
		$this->getDecorator('HtmlTag')->setOption('class','r2-Record-form')->setOption('id', 'ad-edit');
		return parent::render();
	}
} // END class D3Up_Form_Record_Item extends Epic_Form
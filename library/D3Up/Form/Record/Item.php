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
		'strength' => 'Strength',
		'intelligence' => 'Intelligence',
		'vitality' => 'Vitality',
		'dexterity' => 'Dexterity',
		'resist-all' => 'Resistance to All Elements',
		'armor' => 'Armor',
		'plus-life' => '% Life',
		'life-regen' => 'Regenerates Life per Second',
		'plus-block' => 'Chance to Block',
		'cc-reduce' => 'Reduces the duration of control impairing effects',
		'elite-reduce' => 'Reduces damage from elites',
		'melee-reduce' => 'Reduces damage from melee attacks',
		'range-reduce' => 'Reduces damage from ranged attacks',
		'arcane-resist' => 'Arcane Resistance',
		'cold-resist' => 'Cold Resistance',
		'fire-resist' => 'Fire Resistance',
		'lightning-resist' => 'Lightning Resistance',
		'physical-resist' => 'Physical Resistance',
		'poison-resist' => 'Poison Resistance',
		'thorns' => 'Melee attackers take damage per hit',
		'attack-speed' => 'Attack speed increased',
		'critical-hit' => 'Critical Hit Chance increased',
		'critical-hit-damage' => 'Critical Hit Damage increased',
		'plus-damage' => '+% Damage',
		'min-damage' => 'Minimum Damage',
		'max-damage' => 'Maximum Damage',
		'arcane-damage' => 'Arcane Damage',
		'cold-damage' => 'Cold Damage',
		'fire-damage' => 'Fire Damage',
		'holy-damage' => 'Holy Damage',
		'lightning-damage' => 'Lightning Damage',
		'poison-damage' => 'Poison Damage',
		'elite-damage' => 'Increases Damage against Elites',
		'chance-bleed' => 'Chance to inflict Bleed',
		'chance-blind' => 'Chance to Blind on Hit',
		'chance-chill' => 'Chance to Chill on Hit',
		'chance-fear' => 'Chance to Fear on Hit',
		'chance-freeze' => 'Chance to Freeze on Hit',
		'chance-immobilize' => 'Chance to Immobilize on Hit',
		'chance-knockback' => 'Chance to Knockback on Hit',
		'chance-slow' => 'Chance to Slow on Hit',
		'chance-stun' => 'Chance to Stun on Hit',
		'plus-movement' => 'Movement Speed',
		'plus-pickup-radius' => 'Increases Gold and Health pickup',
		'plus-experience' => 'Experience',
		'plus-gold-find' => 'Gold Find',
		'plus-magic-find' => 'Magic Find',
		'health-globes' => 'Health Globes grant Life',
		'life-steal' => 'Damage Dealt is Converted to Life',
		'life-kill' => 'Life after each Kill',
		'life-hit' => 'Each hit adds Life',
		'level-reduce' => 'Level Requirement reduced',
		'indestructable' => 'Ignores durability loss',
		'bb-bash' => 'Increases bash damage',
		'bb-cleave' => 'Increases cleave damage',
		'bb-frenzy' => 'Increases frenzy damage',
		'bb-rend' => 'Reduces resource cost of Rend',
		'bb-revenge' => 'Increases Critical Hit Chance of Revenge',
		'bb-weapon-throw' => 'Reduces resource cost of Weapon Throw',
		'bb-hammer-of-the-ancients' => 'Reduces resource cost of Hammer of the Ancients',
		'bb-whirlwind' => 'Increases Critical Hit Chance of Whirlwind',
		'bb-overpower' => 'Increases Critical Hit Chance of Overpower',
		'bb-seismic-slam' => 'Increases Critical Hit Chance of Seismic Slam',
		'fury-max' => 'Maximum Fury',
		'hatred-regen' => 'Increases Hatred Regeneration',
		'max-discipline' => 'Maximum Discipline',
		'dh-chakram' => 'Reduces resource cost of Chakram',
		'dh-evasive-fire' => 'Increases Evasive Fire damage',
		'dh-grenades' => 'Increases Grenades Damage',
		'dh-impale' => 'Reduces resource cost of Impale',
		'dh-spike-trap' => 'Increases Spike Trap damage',
		'dh-bola-shot' => 'Increases Bola Shot damage',
		'dh-elemental-arrow' => 'Increases Elemental Arrow damage',
		'dh-entangling-shot' => 'Increases Entangling Shot damage',
		'dh-hungering-arrow' => 'Increases Hungering Arrow damage',
		'dh-multishot' => 'Increases Critical Hit Chance of Multishot',
		'dh-rapid-fire' => 'Increases Critical Hit Chance of Rapid Fire',
		'spirit-spent-life' => 'Gain Life per Spirit Spent',
		'spirit-regen' => 'Increases Spirit Regeneration',
		'mk-crippling-wave' => 'Increases Crippling Wave damage',
		'mk-cyclone-strike' => 'Reduces resource cost of Cyclone Strike',
		'mk-deadly-reach' => 'Increases Deadly Reach damage',
		'mk-exploding-palm' => 'Increases Exploding Palm damage',
		'mk-fists-of-thunder' => 'Increases Fist of Thunder damage',
		'mk-sweeping-wind' => 'Increases Sweeping Wind damage',
		'mk-way-of-the-hundred-fists' => 'Increases Way of the Hundred Fists damage',
		'mk-lashing-tail-kick' => 'Reduces resource cost of Lashing Tail Kick',
		'mk-tempest-rush' => 'Increases Critical Hit Chance of Tempest Rush',
		'mk-wave-of-light' => 'Increases Critical Hit Chance of Wave of Light',
		'mana-regen' => 'Increases Mana Regeneration',
		'mana-max' => 'Maximum Mana',
		'wd-firebomb' => 'Reduces resource cost of Firebomb',
		'wd-haunt' => 'Increases Haunt Damage',
		'wd-acid-clouds' => 'Increases Critical Hit Chance of Acid Clouds',
		'wd-firebats' => 'Reduces resource cost of Firebats',
		'wd-zombie-dogs' => 'Reduces cooldown of Summon Zombie Dogs',
		'wd-plague-of-toads' => 'Increases Plague of Toads damage',
		'wd-poison-darts' => 'Increaeses Poison Darts damage',
		'wd-spirit-barrage' => 'Increases Spirit Barrage damage',
		'wd-wall-of-zombies' => 'Reduces cooldown of Wall of Zombies',
		'wd-zombie-charger' => 'Reduces resource cost of Zombie Charger',
		'ap-on-crit' => 'Critical Hits grant Arcane Power',
		'ap-max' => 'Maximum Arcane Power',
		'wz-arcane-torrent' => 'Reduces resource cost of Arcane Torrent',
		'wz-disintegrate' => 'Reduces resource cost of Disintegrate',
		'wz-electrocute' => 'Increases Electrocute damage',
		'wz-explosive-blast' => 'Increases Critical Hit Chance of Explosive Blast',
		'wz-hydra' => 'Reduces resource cost of Hydra',
		'wz-ray-of-frost' => 'Increases Critical Hit Chance of Ray of Frost',
		'wz-energy-twister' => 'Increases Critical Hit Chance of Energy Twister',
		'wz-magic-missle' => 'Increases Magic Missle damage',
		'wz-arcane-orb' => 'Increases Critical Hit Chance of Arcane Orb',
		'wz-blizzard' => 'Increases duration of Blizzard',
		'wz-meteor' => 'Reduces resource cost of Meteor',
		'wz-shock-pulse' => 'Increases Shock Pulse damage',
		'wz-spectral-blade' => 'Increases Spectral Blade damage',
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
		));

		$this->addElement("select", "itemType", array(
			'required' => true,
			'label' => 'What kind of item is this?',
			'multiOptions' => array(
				null => '',
				'amulet' => 'Amulet',
				'belt' => 'Belt',
				'boots' => 'Boots',
				'bracers' => 'Bracers',
				'chest-armor' => 'Chest Armor',
				'cloak' => 'Cloak',
				'gloves' => 'Gloves',
				'helm' => 'Helm',
				'pants' => 'Pants',
				'mighty-belt' => 'Mighty Belt',
				'ring' => 'Ring',
				'shoulder' => 'Shoulder',
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
		));
		
		$this->addElement("select", "quality", array(
			'required' => true,
			'label' => 'What is the quality/rarity of the item?',
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
		));
		
		$this->addElement("select", "attributes", array(
			'label' => 'What types of stats are on this item?',
			'multiple' => true,
			'multiOptions' => array(null => '') + $this->_attributes,
		));
		$this->attributes->setRegisterInArrayValidator(false);
		
		$this->addElement("select", "sockets", array(
			'label' => 'Does this item have sockets?',
			'multiOptions' => array(
				null => '',
				1 => '1 Socket',
				2 => '2 Sockets',
				3 => '3 Sockets',
			),
			'filters' => array('StripTags'),
		));
		
		$this->addElement("text", "base_armor", array(
			'label' => "What is the displayed Armor value?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_dps", array(
			'label' => "What is the displayed DPS?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_damage_min", array(
			'label' => "What is the displayed Minimum Damage?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_damage_max", array(
			'label' => "What is the displayed Maximum Damage?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_speed", array(
			'label' => "What is the displayed Attack Speed?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));
		
		$this->addElement("text", "base_block_chance", array(
			'label' => "What is the displayed Block Chance?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_block_amount_min", array(
			'label' => "What is the displayed Minimum Block Value?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));

		$this->addElement("text", "base_block_amount_max", array(
			'label' => "What is the displayed Maximum Block Value?",
			'validators' => array(
				array('Float')
			),
			'filters' => array('StripTags'),
		));
		
		$attrs = array();
		if($item->attrs) {
			$attrs = $item->attrs->export();
		}
		
		$sockets = null;
		if($item->sockets) {
			$sockets = count($item->sockets); 
		}

		$this->setDefaults(array(
			'name' => $item->name,
			'itemType' => $item->type,
			'quality' => $item->quality,
			'attributes' => array_keys($attrs),
			'sockets' => $sockets,
		));
				
		if(isset($item->stats['armor'])) {
			$this->base_armor->setValue($item->stats['armor']);
		}
		if(isset($item->stats['block-chance'])) {
			$this->base_block_chance->setValue($item->stats['block-chance']);
		}
		if(isset($item->stats['block-amount']) && is_array($item->stats['block-amount']->export())) {
			$this->setDefaults(array(
				'base_block_amount_min' => $item->stats['block-amount']['min'],
				'base_block_amount_max' => $item->stats['block-amount']['max'],				
			));
		}
		
		if(isset($item->stats['dps'])) {
			$this->base_dps->setValue($item->stats['dps']);
		}
		if(isset($item->stats['damage']) && is_array($item->stats['damage']->export())) {
			$this->setDefaults(array(
				'base_damage_min' => $item->stats['damage']['min'],
				'base_damage_max' => $item->stats['damage']['max'],				
			));
		}
		if(isset($item->stats['speed'])) {
			$this->base_speed->setValue($item->stats['speed']);
		}
		// echo "<pre>";
		// var_dump($item->export()); 
		
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
				$sockets[$i] = $this->_allData['socket'.$i];
			}
			$item->sockets = $sockets;
		} else {
			$item->sockets = null;
		}
		// Determine and set Item Specific Values (Armor vs Weapons)
		switch($this->itemType->getValue()) {
			case "shield":
				$stats = array(
					'armor' => (int) $this->_allData['base_armor'],
					'block-chance' => (float) $this->_allData['base_block_chance'],
					'block-amount' => array(
						'min' => (int) $this->_allData['base_block_amount_min'],
						'max' => (int) $this->_allData['base_block_amount_max'],
					)
				);
				$item->stats = $stats;
				break;
			case "belt":
			case "boots":
			case "bracers":
			case "chest-armor":
			case "cloak":
			case "gloves":
			case "helm":
			case "pants":
			case "mighty-belt":
			case "shoulder":
			case "spirit-stone":
			case "voodoo-mask":
			case "wizard-hat":
				$stats = array(
					'armor' => (int) $this->_allData['base_armor'],
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
					'dps' => (float) $this->_allData['base_dps'],
					'speed' => (float) $this->_allData['base_speed'],
					'damage' => array(
						'min' => (int) $this->_allData['base_damage_min'],
						'max' => (int) $this->_allData['base_damage_max'],
					),
				);
				$item->stats = $stats;
				break;
			default:
				break;
		}
		// Determine Valid Attributes to Save (Somewhat Protected the form)
		$valid = D3Up_View_Helper_DisplayItem::getAttributeMap();
		// Loop through attributes passed in and parse them into the attrs array
		$attrs = array();
		foreach($this->_allData as $key => $value) {
			if(array_key_exists($key, $valid)) {
				if(is_float($value)) {
					$attrs[$key] = (float) $value;						
				} elseif(is_numeric($value)) {
					$attrs[$key] = (float) $value;
				} else {
					$attrs[$key] = $value;
				}
			}
		}		
		// Assign the attrs to the item
		$item->attrs = $attrs;
		// Do we have a user creating this? If so, add it.
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$item->_createdBy = $profile;
		}
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
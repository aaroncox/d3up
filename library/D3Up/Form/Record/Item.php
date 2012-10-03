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
	
	protected $_attributes = null;

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
		foreach(D3Up_Tool_Attributes::$attributes as $k => $v) {			
			$this->_attributes[$k] = str_replace("[v]", "", $v);
		}
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
				'daibo' => 'Daibo',
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
		  $this->setButtons(array("save" => "Save Item"));		
		} else {
		  $this->setButtons(array("save" => "Create Item"));		
		}

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
		var_dump($this->_allData);
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
			case "daibo":
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
					'dps' => (float) ($this->_allData['stat_damage-min'] + $this->_allData['stat_damage-max']) / 2 * $this->_allData['stat_speed'],
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
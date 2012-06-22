<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Hero extends Epic_Form
{
	protected $_hero = null;

	public function getHero()
	{
		if (!$this->_hero instanceOf Epic_Mongo_Document_Record) {
			$this->_hero = Epic_Mongo::newDoc('hero');			
		}
		return $this->_hero;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setHero($hero)
	{
		$this->_hero = $hero;
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
		return ($this->_hero) ? false : true;
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
		
		$this->addElement("text", "name", array(
			'required' => true,
			'label' => 'Name',
			'validators' => array(
				array('StringLength', false, array(2, 50)),
			),
		));

		$this->addElement("select", "class", array(
			'required' => true,
			'label' => 'What class is this hero?',
			'multiOptions' => array(
				null => '',
				'wizard' => 'Wizard',
				'barbarian' => 'Barbarian',
				'witch-doctor' => 'Witch Doctor',
				'monk' => 'Monk',
				'demon-hunter' => 'Demon Hunter',
			)
		));
		
		$this->setButtons(array("save" => "Create Hero"));		
	}
	
	public function save() {
		$hero = $this->getHero();
		// Set the Name of the Hero
		$hero->name = $this->name->getValue();
		// Are we a new hero? If so, add some meta
		if(!$hero->_created) {
			$hero->_created = time();
			// Set a default GearSet
			$hero->equipment = new D3Up_Mongo_Record_GearSet();
		}
		// Set the Quality of the Hero
		$hero->class = $this->class->getValue();
		// Do we have a user creating this? If so, add it.
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$hero->_createdBy = $profile;
		}
		// Return the Hero
		return $hero->save();
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
} // END class D3Up_Form_Record_Hero extends Epic_Form
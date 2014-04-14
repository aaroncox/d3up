<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Build extends Epic_Form
{
	protected $_build = null;

	public function getBuild()
	{
		if (!$this->_build instanceOf Epic_Mongo_Document_Record) {
			$this->_build = Epic_Mongo::newDoc('build');			
		}
		return $this->_build;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setBuild($build)
	{
		$this->_build = $build;
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
		return ($this->_build) ? false : true;
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
		$build = $this->getBuild();
		
		$this->addElement("text", "name", array(
			'required' => true,
			'label' => 'Name of this Build',
			'validators' => array(
				array('StringLength', false, array(2, 50)),
			),
			'filters' => array('StripTags'),
			'tabindex' => 10,
		));

		$this->addElement("select", "class", array(
			'required' => true,
			'label' => 'What class is this build?',
			'multiOptions' => array(
				null => '',
				'barbarian' => 'Barbarian',
				'demon-hunter' => 'Demon Hunter',
				'monk' => 'Monk',
				'witch-doctor' => 'Witch Doctor',
				'wizard' => 'Wizard',
			),
			'tabindex' => 30,
		));

		$this->addElement("text", "level", array(
			'label' => 'Character Level',
			'validators' => array(
				new Zend_Validate_Between(array('min' => 0, 'max' => 70))
			),
		));

		$this->addElement("text", "paragon", array(
			'label' => 'Paragon Level',
			'validators' => array(
				new Zend_Validate_Between(array('min' => 0, 'max' => 10000))
			)
		));

		$this->addElement("checkbox", "hardcore", array(
			'label' => 'Hardcore?',
		));		
		
		$this->addElement("checkbox", "private", array(
			'label' => 'Private?',
			'tabindex' => 25,
		));
		
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile && $profile->_twitchUser) {
			$this->addElement("checkbox", "twitch", array(
				'label' => 'Enabled Twitch.tv?',
				'description' => 'Do you want to enable your Twitch.tv Stream on this build?',
				'tabindex' => 25,
			));
		}
		
		$this->addElement("markdown", "description", array(
			'required' => false,
			'label' => 'Build Information',
			'filters' => array('StripTags'),
			'tabindex' => 30,
			'rows' => 10,
			'cols' => 40,
		));
		
		$this->addElement("checkbox", "defaultToDescription", array(
			'label' => 'Default Tab as Build Information?',
			'description' => 'This will make the build information be the first thing shown when users visit your build.',
			'tabindex' => 25,
		));
		
		
		$this->setDefaults(array(
			'name' => $build->name,
			'description' => $build->descriptionSource,
			'defaultToDescription' => $build->_defaultToDescription,
			'private' => $build->private,
			'level' => $build->level ?: 70,
			'paragon' => $build->paragon ?: 0,
			'twitch' => $build->_twitchEnabled,
			'hardcore' => $build->hardcore,
			'profileUrl' => $build->profileUrl,
		));
		
		if($build->isNewDocument()) {
			$this->setButtons(array("save" => "Create Build"));					
		} else {
			$this->class->setValue($build->class);
			$this->setButtons(array("save" => "Save Build"));		
		}

	}
	
	public function save() {
		$build = $this->getBuild();
		// Set the Name of the Build
		$build->name = $this->name->getValue();
		// Are we a new build? If so, add some meta
		if(!$build->_created) {
			$build->_created = time();
			// Set a default GearSet
			$build->gear = new D3Up_Mongo_Record_GearSet();
		}
		// Set the Class of the Build
		$build->class = $this->class->getValue();
		// Set the Level
		$build->level = (int) $this->level->getValue();
		// Set the Paragon Level
		$build->paragon = (int) $this->paragon->getValue();
		// Set if it's hardcore
		$build->hardcore = (bool) $this->hardcore->getValue();
		// Should we default to the builds description?
		$build->_defaultToDescription = (bool) $this->defaultToDescription->getValue();
		// Set the builds Description
		$build->description = $this->description->getRenderedValue();
		$build->descriptionSource = $this->description->getValue();
		// Do we show the TwitchTV stream of the user on this build?
		// Set the Profile URL
		// $build->profileUrl = $this->profileUrl->getValue();
		// Set privacy
		$build->private = (bool) $this->private->getValue();
		// Do we have a user creating this? If so, add it.
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$build->_createdBy = $profile;
			if($profile->_twitchUser) {
				$enabled = (bool) $this->twitch->getValue();
				$build->_twitchEnabled = $enabled;
			}
		}
		// Return the Build
		return $build->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}
	public function render(Zend_View_Interface $view = NULL)
	{
		$this->removeDecorator('FloatClear');
		$this->getDecorator('HtmlTag')->setOption('class','r2-Record-form')->setOption('id', 'ad-edit');
		return parent::render($view);
	}
} // END class D3Up_Form_Record_Build extends Epic_Form
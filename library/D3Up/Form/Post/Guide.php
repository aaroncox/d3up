<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Post_Guide extends Epic_Form
{
	protected $_guide = null;

	public function getGuide()
	{
		if (!$this->_guide instanceOf Epic_Mongo_Document_Post) {
			$this->_guide = Epic_Mongo::newDoc('guide');			
		}
		return $this->_guide;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setGuide($guide)
	{
		$this->_guide = $guide;
		return $this;
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
		
		$guide = $this->getGuide();
		
		$this->addElement("text", "title", array(
			'required' => true,
			'label' => 'Guide Title',
			'description' => 'A descriptive title of what this guide is (ie: "Inferno WW Barb")',
			'value' => $guide->title,
		));
		
		$this->addElement("select", "topic", array(
			'required' => true,
			'label' => 'Guide Topic',
			'multiOptions' => array(
				null => 'Select a Topic',
				'general' => 'General Guide',
				'class' => 'Class Guide',
				'farming' => 'Farming Guide',
				'leveling' => 'Leveling Guide',
				'pvp' => 'PVP Guide',
			),
			'value' => $guide->topic,
		));
		
		$this->addElement("select", "class", array(
			'required' => false,
			'label' => 'Specific Class',
			'multiOptions' => array(
				null => 'No Specific Class',
				'barbarian' => 'Barbarian',
				'demon-hunter' => 'Demon Hunter',
				'monk' => 'Monk',
				'witch-doctor' => 'Witch Doctor',
				'wizard' => 'Wizard',
			),
			'value' => $guide->class,
		));
					
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$guide = $this->getGuide();
		$guide->title = $this->title->getValue();
		$guide->topic = $this->topic->getValue();
		$guide->class = $this->class->getValue();
		if($guide->isNewDocument()) {
			$guide->_created = time();
			$guide->_published = false;
		} else {
			$guide->_updated = time();
		}
		$profile = D3Up_Auth::getInstance()->getProfile();
		// var_dump($profile); exit;
		$guide->author = $profile;			
		$guide->save();
		return $guide;
	}
	
	public function process($data) {
		$this->removeElement("referrer");
		if($this->isValid($data)) {
			return $doc = $this->save();
		}
		return false;
	}
} // END class D3Up_Form_Post_Guide extends Epic_Form
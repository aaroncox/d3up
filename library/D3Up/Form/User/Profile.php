<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_User_Profile extends Epic_Form
{
	protected $_user = null;

	public function getUser()
	{
		if(!$this->_user) {
			throw new Exception("No user selected.");
		}
		return $this->_user;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setUser($user)
	{
		$this->_user = $user;
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
		$user = $this->getUser();
		
		$this->addElement("text", "battletag", array(
			'label' => 'Battle.net BattleTag',
			'description' => '(Optional) Enter your BattleTag, ie. YourName#1111, which is used for Character Imports.',
		));
		$this->addElement("select", "region", array(
			'label' => 'Which region do you play in?',
			'description' => '(Optional) Select the region you play in to help customize the site.',
			'multiOptions' => array(
				null => 'Pick a Region',
				1 => 'The Americas',
				2 => 'Europe',
				3 => 'Asia',
			)
		));		
		$this->setDefaults(array(
			'region' => $user->region,
			'battletag' => $user->battletag
		));
		
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$user = $this->getUser();
		// Set the Region of the User
		$user->region = $this->region->getValue();
		// Set the BattleTag
		$user->battletag = $this->battletag->getValue();
		// Return the User
		return $user->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}

} // END class D3Up_Form_User_Profile extends Epic_Form
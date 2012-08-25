<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_User_Profile extends Epic_Form
{
	protected $_profile = null;

	public function getProfile()
	{
		if(!$this->_profile) {
			throw new Exception("No profile selected.");
		}
		return $this->_profile;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setProfile($profile)
	{
		$this->_profile = $profile;
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

		$profile = $this->getProfile();

		$this->addElement("text", "displayName", array(
			'label' => 'Display Name',
			'description' => 'The name displayed when you comment or create something',
			'value' => $profile->displayName ?: $profile->username,
		));
		
		$this->addElement("text", "email", array(
			'label' => 'Email Address',
			'description' => 'Used for gravatar.com Avatar\'s and password resets',
			'value' => $profile->email,
		));
		
		$this->addElement("select", "region", array(
			'required' => true,
			'label' => 'Which region do you play in?',
			'description' => 'In order to sell goods, we need to know which region you play in.',
			'multiOptions' => array(
				null => 'Pick a Region',
				1 => 'The Americas',
				2 => 'Europe',
				3 => 'Asia',
			)
		));
		
		$this->addElement("text", "battletag", array(
			'label' => 'Battle.net BattleTag',
			'description' => '(Optional) Enter your BattleTag (YourName#1111) to make communicating with other users easier.',
			'value' => $profile->battletag,
		));
		
		$this->addElement("text", "apiKey", array(
			'disabled' => true,
			'label' => 'API Key',
			'description' => 'If you\'re using a 3rd party application that interfaces with D3Up, this is your secret key!',
			'value' => $profile->apiKey,
		));
		
		$this->setDefaults(array(
			'region' => $profile->region,
		));
		
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$profile = $this->getProfile();
		// Set the Region of the Profile
		$profile->region = $this->region->getValue();
		// Set the Email Address of the Profile
		$profile->email = $this->email->getValue();
		// Set the Display Name
		$profile->displayName = $this->displayName->getValue();
		// Set the Battle.net Battletag
		$profile->battletag = $this->battletag->getValue();
		// Return the Profile
		return $profile->save();
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

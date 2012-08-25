<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Auth_Form_Register extends Epic_Auth_Form_Register
{
	/**
	 * init - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function init()
	{
		parent::init();
		$this->addElement("text", "battletag", array(
			'label' => 'Battle.net BattleTag',
			'description' => '(Optional) Enter your BattleTag (YourName#1111) to make communicating with other users easier.',
		));
		$this->addElement("select", "region", array(
			'label' => 'Which region do you play in?',
			'description' => '(Optional) Pick which region you play in to help customize the site and which Bazaar you\'ll see',
			'multiOptions' => array(
				null => 'Pick a Region',
				1 => 'The Americas',
				2 => 'Europe',
				3 => 'Asia',
			)
		));
		$this->username->setDescription("Please choose a unique username");
		$this->email->setDescription("The only thing this will ever be used for is 'Forgot Password' links.");
		$this->password1->setDescription("Please, do NOT NOT NOT use your Diablo 3 password.");
		$this->password2->setDescription("Please, do NOT NOT NOT use your Diablo 3 password.");
	}
	public function process($data) {
		$this->password2->setRequired(true)->setValidators(array(new Epic_Auth_Validator_IdenticalValidator($data['password1'])));
		if($this->isValid($data)) {
			$user = Epic_Mongo::newDoc('profile');
			$user->username = strtolower($this->username->getValue());
			$user->password = md5($this->password1->getValue());
			$user->email = $this->email->getValue();
			$user->battletag = $this->battletag->getValue();
			$user->region = $this->region->getValue();
			$user->_registered = time();
			$user->save();
			return true;
		}
		return false;
	}
} // END class D3Up_Auth_Form_Register extends Epic_Auth_Form_Register
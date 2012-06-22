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
		$this->username->setDescription("Please choose a unique username");
		$this->email->setDescription("The only thing this will ever be used for is 'Forgot Password' links.");
		$this->password1->setDescription("Please, do NOT NOT NOT use your Diablo 3 password.");
		$this->password2->setDescription("Please, do NOT NOT NOT use your Diablo 3 password.");
	}
	public function process($data) {
		$this->password2->setRequired(true)->setValidators(array(new Epic_Auth_Validator_IdenticalValidator($data['password1'])));
		if($this->isValid($data)) {
			$user = Epic_Mongo::newDoc('user');
			$user->username = $this->username->getValue();
			$user->password = md5($this->password1->getValue());
			$user->email = $this->email->getValue();
			$user->battletag = $this->battletag->getValue();
			$user->_registered = time();
			$user->save();
			return true;
		}
		return false;
	}
} // END class D3Up_Auth_Form_Register extends Epic_Auth_Form_Register
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Auth extends Epic_Auth
{
	public function getProfile() {
		if($this->_profile && $this->_profile instanceOf D3Up_Mongo_User_Profile) {
			return $this->_profile;			
		}
		$identity = $this->getIdentity();
		return $this->_profile = Epic_Mongo::db('profile')->find($identity['id']);
	}
	/**
	 * private constructor - singleton pattern
	 *
	 * @return void
	 * @author Corey Frang
	 **/
	protected function __construct()
	{
	}

	/**
	 * Returns (or creates) the Instance - Singleton Pattern
	 *
	 * @return self
	 * @author Corey Frang
	 **/
	static public function getInstance()
	{
		// Zend_Session::setOptions(array('remember_me_seconds' => 2592000));
		if (self::$_instance === NULL) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
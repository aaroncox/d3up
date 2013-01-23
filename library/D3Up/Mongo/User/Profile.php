<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_User_Profile extends Epic_Mongo_Document_User
{
	public function save($entierDocument = false) {
		if(!$this->apiKey) {
			// First 10 Characters of md5(email) + MongoDB ObjectID
			$key = substr(md5($this->email),0,10) . $this->_id;
			$this->apiKey = $key;
		}
		return parent::save($entierDocument = false);
	}
	
	public function getEditForm() {
		return new D3Up_Form_User_Profile(array('profile' => $this));
	}
	
} // END class D3Up_Mongo_User_Profile extends Epic_Mongo_User
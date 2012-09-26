<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Controller_Action extends Epic_Controller_Action
{
	public function preDispatch() {
	  $this->view->featuredGuide = 30;
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
		$this->view->navRecentNews = Epic_Mongo::db('update')->fetchAll(array(), array("_created" => -1), 5);
		if(!$profile) {
			$loginForm = $this->view->loginForm = new Epic_Auth_Form_Login();
			$loginForm->username->setLabel(null)->setAttrib('placeholder', 'Username');
			$loginForm->password->setLabel(null)->setAttrib('placeholder', 'Password');
			$this->_handleForm($loginForm);
		} else {
			$query = array('_createdBy' => $profile->createReference());
			$sort = array("paragon" => -1, "level" => -1);
			$this->view->userBuilds = Epic_Mongo::db('build')->fetchAll($query, $sort, 5);
		}
	}
} // END class D3Up_Controller_Action
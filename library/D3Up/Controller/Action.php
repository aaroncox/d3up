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
		// $this->getResponse()->setHeader('Expires', '', true);
		// $this->getResponse()->setHeader('Cache-Control', 'private', true);
		// $this->getResponse()->setHeader('Pragma', '', true);
	  $this->view->featuredGuide = array('$in' => array(
	   88, // General
	   30, // Monk
	   19, // DH
	   11, // Barb
	   59, // Wizard
	   9, // WD
	  ));
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
		$this->view->navRecentNews = Epic_Mongo::db('update')->fetchAll(array(), array("_created" => -1), 5);
		if(!$profile) {
			if(isset($_COOKIE['d3up_user']))  {
				setcookie("d3up_user", false, time() - (10 * 365 * 24 * 60 * 60), "/");				
			}
			$loginForm = $this->view->loginForm = new Epic_Auth_Form_Login();
			$loginForm->username->setLabel(null)->setAttrib('placeholder', 'Username');
			$loginForm->password->setLabel(null)->setAttrib('placeholder', 'Password');
			$loginForm->setAction("/user/login");
		} else {
			if(!isset($_COOKIE['d3up_user'])) {
				setcookie("d3up_user", true, time() + (10 * 365 * 24 * 60 * 60), "/");
			}
			$query = array('_createdBy' => $profile->createReference());
			$sort = array("paragon" => -1, "level" => -1);
			$this->view->userBuilds = Epic_Mongo::db('build')->fetchAll($query, $sort, 5);
		}
	}
} // END class D3Up_Controller_Action
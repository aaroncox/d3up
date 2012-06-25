<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class UserController extends Epic_Controller_Action
{
	public function indexAction() {
		
	}
	public function loginAction() {
		$form = $this->view->form = new Epic_Auth_Form_Login();
		$this->_handleForm($form);
		if(Epic_Auth::getInstance()->getProfile()) {
			$this->_redirect("/user");
		}
	}
	public function logoutAction() {
		Epic_Auth::getInstance()->clearIdentity();
		$this->_redirect("/");
	}
	public function registerAction() {
		$form = $this->view->form = new D3Up_Auth_Form_Register();
		$this->_handleForm($form);		
	}
	public function forgotAction() {
		
	}
	public function heroesAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$heroes = $this->view->heroes = Epic_Mongo::db('hero')->fetchAll(array('_createdBy' => $profile->createReference()));			
		} else {
			$this->view->notLoggedIn = true;
		}
	}
	public function itemsAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$items = $this->view->items = Epic_Mongo::db('item')->fetchAll(array('_createdBy' => $profile->createReference()));			
		} else {
			$this->view->notLoggedIn = true;
		}
	}
} // END class UserController extends Epic_Controller_Action
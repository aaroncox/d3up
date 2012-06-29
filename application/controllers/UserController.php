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
			$this->_redirect("/");
		}
	}
	public function logoutAction() {
		Epic_Auth::getInstance()->clearIdentity();
		$this->_redirect("/");
	}
	public function registerAction() {
		$form = $this->view->form = new D3Up_Auth_Form_Register();
		$this->_handleForm($form);		
		if(Epic_Auth::getInstance()->getProfile()) {
			$this->_redirect("/");
		}
	}
	public function forgotAction() {
		
	}
	public function buildsAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$builds = Epic_Mongo::db('build')->fetchAll(array('_createdBy' => $profile->createReference()));			
			$paginator = Zend_Paginator::factory($builds);
			$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
			$this->view->builds = $paginator;			
		} else {
			$this->view->notLoggedIn = true;
		}
	}
	public function itemsAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$items = Epic_Mongo::db('item')->fetchAll(array('_createdBy' => $profile->createReference()), array("_created" => -1));			
			$paginator = Zend_Paginator::factory($items);
			$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
			$this->view->items = $paginator;
		} else {
			$this->view->notLoggedIn = true;
		}
	}
} // END class UserController extends Epic_Controller_Action
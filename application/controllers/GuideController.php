<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class GuideController extends Epic_Controller_Action
{
	public function getGuide() {
		return $this->view->guide = $this->getRequest()->getParam('post');
	}
	public function indexAction() {
		
	}
	public function viewAction() {
		$this->getGuide();
		$this->view->profile = D3Up_Auth::getInstance()->getProfile();
		if($this->getRequest()->isPost()) {
			var_dump($this->getRequest()->getParams()); exit;
		}
	}
	public function editAction() {
		$guide = $this->getGuide();
		$this->view->form = $form = $guide->getEditForm();
		if($this->getRequest()->isPost()) {
			if($guide = $form->process($this->getRequest()->getParams())) {
				$this->_redirect("/guide/".$guide->id."/".$guide->slug);
			}
		}		
	}
	public function createAction() {
		$this->view->form = $form = new D3Up_Form_Post_Guide();
		if($this->getRequest()->isPost()) {
			if($guide = $form->process($this->getRequest()->getParams())) {
				$this->_redirect("/guide/".$guide->id."/".$guide->slug);
			}
		}
	}
} // END class GuideController extends Epic_Controller_Action
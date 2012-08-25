<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class PostController extends Epic_Controller_Action
{
	public function getPost() {
		return $this->view->post = $this->getRequest()->getParam('post');
	}
	public function createAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile && $profile->id == 2 && $type = $this->getRequest()->getParam('type')) {
			$post = Epic_Mongo::newDoc($type);
			$this->view->form = $form = $post->getEditForm();
			$this->_handleForm($form);
		} else {
			$this->_redirect("/user/login");
		}
	}	
	public function editAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile && $profile->id == 2 && $type = $this->getRequest()->getParam('type')) {
			$post = $this->getPost();
			$this->view->form = $form = $post->getEditForm();
			$this->_handleForm($form);
		}
	}
	public function listAction() {
		$this->view->type = $type = $this->getRequest()->getParam('type');
		$query = array();
		$sort = array("_created" => -1);
		$posts = Epic_Mongo::db($type)->fetchAll($query, $sort);
		$paginator = Zend_Paginator::factory($posts);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(5);
		$this->view->posts = $paginator;
	}
	public function viewAction() {
		$this->getPost();
		$this->view->type = $type = $this->getRequest()->getParam('type');
	}
	public function replyAction() {
		$post = $this->getPost();
		$this->view->commentForm = $commentForm = new D3Up_form_Record_Build_Comment(array('replyTo' => $post));
		$this->_handleForm($commentForm);
		if($this->_request->isXmlHttpRequest()) {
			$this->getResponse()->setHeader('Content-type', 'application/json');
			$params = $this->getRequest()->getParams();
			$this->_helper->layout->disableLayout();
	    $this->_helper->viewRenderer->setNoRender(true);
			echo json_encode(array('form' => $commentForm->render())); exit;
    }	  		
	}
} // END class PostController extends Epic_Controller_Action
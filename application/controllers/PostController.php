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
	
	public function viewAction() {
		
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
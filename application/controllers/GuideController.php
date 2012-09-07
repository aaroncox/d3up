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
		$featured = 1;
		$query = array(
			'published' => true,
			'id' => array('$ne' => $featured),
		);
		$fQuery = array(
			'id' => $featured
		);
		$sort = array(
			'votes' => -1,
			'views' => -1
		);
		if($filterClass = $this->view->filterClass = $this->getRequest()->getParam('class')) {
			$query['class'] = $filterClass;
		}
		if($filterType = $this->view->filterType = $this->getRequest()->getParam('type')) {
			$query['topic'] = $filterType;
		}
		
		$this->view->featured = $featured = Epic_Mongo::db('guide')->fetchOne($fQuery);
		
		$guides = Epic_Mongo::db('guide')->fetchAll($query, $sort);
		$paginator = Zend_Paginator::factory($guides);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(15)->setPageRange(3);
		$this->view->guides = $paginator;
		
		if($this->_request->isXmlHttpRequest()) {
			$this->_helper->layout->disableLayout();
		}
		
	}
	public function checkVote() {
		if($profile = D3Up_Auth::getInstance()->getProfile()) {
			$record = $this->getGuide();
			$this->view->alreadyVoted = Epic_Mongo::db('vote')->check($record, $profile);
			if($vote = $this->getRequest()->getParam('vote')) {
				if($vote == "up" || $vote == "down") {
					Epic_Mongo::db('vote')->vote($record, $profile, $vote);
					if($this->_request->isXmlHttpRequest()) {
						exit;
					}
				}
			}
		} else {
			// echo "not logged in";
		}
	}
	public function viewAction() {
		$guide = $this->getGuide();
		// var_dump($guide->sections); exit;
		$guide->viewCounter();
		$profile = $this->view->profile = D3Up_Auth::getInstance()->getProfile();
		if($profile) {
			$this->checkVote();
			$this->view->alreadyVoted = Epic_Mongo::db('vote')->check($guide, $profile);
		}
		// if($profile && $guide->author->id === $profile->id) {
			if($this->getRequest()->getParam("sections")) {
				if($sections = $this->getRequest()->getParam('sections')) {
					$guide->setSections($sections);
				}
				echo json_encode($guide->save());
				exit;
			}			
		// }
	}
	public function editAction() {
		$guide = $this->getGuide();
		$profile = D3Up_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You aren't logged in!");
		}
		if($profile->id != $guide->author->id) {
			throw new Exception("This isn't your guide to edit.");
		}
		$this->view->form = $form = $guide->getEditForm();
		if($this->getRequest()->isPost()) {
			if($guide = $form->process($this->getRequest()->getParams())) {
				$this->_redirect("/guide/".$guide->id."/".$guide->slug);
			}
		}		
	}
	public function createAction() {
		$profile = D3Up_Auth::getInstance()->getProfile();
		if($profile) {			
			$this->view->form = $form = new D3Up_Form_Post_Guide();
			if($this->getRequest()->isPost()) {
				if($guide = $form->process($this->getRequest()->getParams())) {
					$this->_redirect("/guide/".$guide->id."/".$guide->slug);
				}
			}
		} else {
			$this->_redirect('/user/login');
		}
	}
	public function publishAction() {
		$guide = $this->getGuide();
		if($confirm = $this->getRequest()->getParam("confirm")) {
			$guide->published = true;
			$guide->save();
			$this->_redirect("/guide/".$guide->id."/".$guide->slug);
		}
	}
	public function unpublishAction() {
		$guide = $this->getGuide();
		if($confirm = $this->getRequest()->getParam("confirm")) {
			$guide->published = false;
			$guide->save();
			$this->_redirect("/guide/".$guide->id."/".$guide->slug);
		}		
	}
	
	public function revisionsAction() {
		$guide = $this->getGuide();
		$query = array(
			'_originalId' => $guide->id,
		);
		$sort = array(
			'_timestamp' => -1
		);
		$profile = $this->view->profile = D3Up_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You must be logged in to view revisions.");
		}
		if($guide->author->id !== $profile->id) {
			throw new Exception("You are not the owner of this guide.");
		}
		$this->view->revisions = $revisions = Epic_Mongo::db('revision')->fetchAll($query, $sort);
		$paginator = Zend_Paginator::factory($revisions);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(1)->setPageRange(3);
		$this->view->revision = $paginator;
	}
	
	public function restoreAction() {
		$guide = $this->getGuide();
		$profile = $this->view->profile = D3Up_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You must be logged in to view revisions.");
		}
		if($guide->author->id !== $profile->id) {
			throw new Exception("You are not the owner of this guide.");
		}
		$query = array(
			'id' => (int) $this->getRequest()->getParam("version"),
		);
		$sort = array(
			'_timestamp' => -1
		);
		$revision = Epic_Mongo::db('revision')->fetchOne($query, $sort);
		$guide->sections = $revision->sections;
		$guide->save();
		$guide->saveRevision();
		$this->_redirect("/guide/".$guide->id."/".$guide->slug);
	}
} // END class GuideController extends Epic_Controller_Action
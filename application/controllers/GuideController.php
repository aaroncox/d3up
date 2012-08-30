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
			// 'published' => true,
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
		if($profile && $guide->author->id === $profile->id) {
			if($this->getRequest()->isPost()) {
				$filter = new Epic_Filter_HtmlPurifier();
				if($sections = $this->getRequest()->getParam('sections')) {
					$sectionsArray = array();
					foreach($sections as $idx => $section) {
						$sec = array(
							'title' => null,
							'content' => null,
						);
						if($section['title'] != "null" && $section['title'] != "") {
							$cleaned = html_entity_decode(urldecode($section['title']));
							$sec['title'] = strip_tags($cleaned);
						}
						if($section['content'] != "null") {
							$cleaned = strip_tags($section['content'], '<p><a><img><div><li><ul><ol><br/><br><pre><span><strong><em><bold><blockquote>');
							$sec['content'] = $cleaned;
						}
						if($section['hidden'] == "true") {
							$sec['hidden'] = true;
						} else {
							$sec['hidden'] = null;
						}
						$sectionsArray[] = $sec;
					}
					$guide->sections = $sectionsArray;
				}
				if(!$guide->skills) {
					$guide->skills = array();
				}	
				if($skills = $this->getRequest()->getParam('skills')) {
					$skillsSet = array();
					foreach($skills as $idx => $skill) {
						$skillArray = array(
							'skill' => null,
							'content' => null,
						);
						if($skill['skill'] != "null" && $skill['skill'] != "") {
							$skillArray['skill'] = $skill['skill'];
						}
						if($skill['content'] != "null") {
							$cleaned = strip_tags($skill['content'], '<p><a><img><div><li><ul><ol><br/><br><pre><span><strong><em><bold><blockquote>');
							$skillArray['content'] = $cleaned;							
						}
						$skillsSet[$idx] = $skillArray;
					}
					$guide->skills = $skillsSet;
				}
				if($passives = $this->getRequest()->getParam('passives')) {
					$passivesSet = array();
					foreach($passives as $idx => $skill) {
						$skillArray = array(
							'skill' => null,
							'content' => null,
						);
						if($skill['skill'] != "null" && $skill['skill'] != "") {
							$skillArray['skill'] = $skill['skill'];
						}
						if($skill['content'] != "null") {
							$cleaned = strip_tags($skill['content'], '<p><a><img><div><li><ul><ol><br/><br><pre><span><strong><em><bold><blockquote>');
							$skillArray['content'] = $cleaned;							
						}
						$passivesSet[$idx] = $skillArray;
					}					
					$guide->passives = $passivesSet;
				}
				$guide->save();
			}			
		}
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
} // END class GuideController extends Epic_Controller_Action
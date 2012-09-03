<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class BuildController extends Epic_Controller_Action
{
	public function indexAction() {
		$query = array(
			'private' => array('$ne' => true),
			'stats.dps' => array('$gt' => 0),
			'stats.ehp' => array('$gt' => 0),
			'actives' => array('$exists' => true),
			'passives' => array('$exists' => true),
		);
		$sort = array(
			'_created' => -1,
		);
		if($this->view->sortBy = $sortBy = $this->getRequest()->getParam('sort')) {
			$sort = array();
			switch($sortBy) {
				case "dps":
				case "ehp":
					$query['stats.'.$sortBy] = array('$ne' => null);
					$sort['stats.'.$sortBy] = -1;
					break;
				case "votes":
				case "views":
					$sort[$sortBy] = -1;
					break;
			}
		}
		// var_dump($sort, $query);
		if($class = $this->getRequest()->getParam('class')) {
			if($class != "null") {				
				$this->view->class = $query['class'] = $class;
			}
		}
		if($hasGuide = $this->getRequest()->getParam('guide')) {
			if($hasGuide == "true") {				
				$this->view->hasGuide = $query['guideIsPublished'] = true;
			}
		}
		$builds = Epic_Mongo::db('build')->fetchAll($query, $sort);	
		$paginator = Zend_Paginator::factory($builds);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(15)->setPageRange(3);
		$this->view->builds = $paginator;
		if($this->_request->isXmlHttpRequest()) {
			$this->_helper->layout->disableLayout();
		}
	}
	public function createAction() {
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$this->view->characters = D3Up_Tool_Crawler::getInstance()->getCharacters($profile);
		}
		if(!$this->getRequest()->getParam('character-id') && $region = $this->getRequest()->getParam('region') && $tag = $this->getRequest()->getParam('battletag')) {
			echo json_encode(D3Up_Tool_Crawler::getCharactersByTag($tag, $region)); exit;
		}
		// Create a new Build
		$build = Epic_Mongo::newDoc('build');
		$form = $this->view->form = $build->getEditForm();
		$login = $this->view->login = new Epic_Auth_Form_Login();		
		$this->_handleForm($login);
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				$build = Epic_Mongo::db('build')->find($result['upserted']);
				$character = $this->getRequest()->getParam('character-id');
				$battletag = $this->getRequest()->getParam('battletag');
				$region = $this->getRequest()->getParam('region');
				if($profile && $character) {
					D3Up_Tool_Crawler::getInstance()->crawl($build, $profile, $character);										
				}
				if($battletag && $region && $character) {
					$fakeProfile = Epic_Mongo::newDoc('profile');
					$fakeProfile->region = $region;
					$fakeProfile->battletag = $battletag;
					D3Up_Tool_Crawler::getInstance()->crawl($build, $fakeProfile, $character);					
				}
				// var_dump($result, $this->getRequest()->getParams()); exit;
				$this->_redirect("/b/".$build->id);				
			}
		}
	}
	public function editAction() {
		$id = $this->getRequest()->getParam("id");
		if($id) {
			$this->view->record = $build = Epic_Mongo::db('build')->fetchOne(array("id" => (int) $id));			
			$profile = Epic_Auth::getInstance()->getProfile();
			if(!$profile) {
				throw new Exception("You aren't logged in!");
			}
			if($profile->id != $build->_createdBy->id) {
				throw new Exception("This isn't your build to edit.");
			}
			// Get Form for Item
			$form = $this->view->form = $build->getEditForm();
			if($this->getRequest()->isPost()) {
				$result = $form->process($this->getRequest()->getParams());
				if($result) {
					$this->_redirect("/b/".$build->id);				
				}
			}
		}		
	}
} // END class HeroController extends Epic_Controller_Action
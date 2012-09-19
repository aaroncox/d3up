<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class BuildController extends D3Up_Controller_Action
{
	public function indexAction() {
		$query = array(
			'private' => array('$ne' => true),
			'stats.dps' => array('$gt' => 0),
			'stats.ehp' => array('$gt' => 0),
			// 'votes' => array('$gt' => -5),
			'actives' => array('$exists' => true),
			'passives' => array('$exists' => true),
		);
		if($this->view->selectedActives = $skills = $this->getRequest()->getParam("skills")) {
			if($skills != "null") {
				$query['actives']['$all'] = array_values(explode("|", $skills));				
			}
		}
		if($this->view->selectedPassives = $passives = $this->getRequest()->getParam("passives")) {
			if($passives != "null") {
				$query['passives']['$all'] = array_values(explode("|", $passives));
			}
		}
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
		// echo "<pre>"; var_dump($sort, $query); echo "</pre>";
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
			$this->view->noScript = true;
			$this->_helper->layout->disableLayout();
		}
	}
	public function createAction() {
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if($profile && $profile->region) {
			$this->view->characters = D3Up_Tool_Crawler::getInstance()->getCharacters($profile);
		}
		if(!$this->getRequest()->getParam('character-id') && !$this->getRequest()->getParam('character-id-manual') && $this->getRequest()->getParam('region') && $this->getRequest()->getParam('battletag')) {
			$tag = $this->getRequest()->getParam('battletag');
			$region = $this->getRequest()->getParam('region');
			echo json_encode(D3Up_Tool_Crawler::getCharactersByTag($tag, (int) $region)); exit;
		}
		// Create a new Build
		$build = Epic_Mongo::newDoc('build');
		$form = $this->view->form = $build->getEditForm();
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				$build = Epic_Mongo::db('build')->find($result['upserted']);
				$battletag = $this->getRequest()->getParam('battletag');
				$region = $this->getRequest()->getParam('region');
				$character = $this->getRequest()->getParam('character-id', null);
				if($character == "") {
					$character = $this->getRequest()->getParam('character-id-manual', null);
					$fakeProfile = Epic_Mongo::newDoc('profile');
					$fakeProfile->region = $region;
					$fakeProfile->battletag = $battletag;
					D3Up_Tool_Crawler::getInstance()->crawl($build, $fakeProfile, $character);					
					$build->_characterBt = $fakeProfile->battletag;
					$build->_characterRg = $fakeProfile->region;
				} else {
					D3Up_Tool_Crawler::getInstance()->crawl($build, $profile, $character);															
					$build->_characterBt = $profile->battletag;
					$build->_characterRg = $profile->region;
				}
				$build->_characterId = $character;
				$build->_lastCrawl = time();
				$build->save();
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
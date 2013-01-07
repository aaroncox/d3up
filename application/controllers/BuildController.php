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
		// throw new Exception("Currently disabled until I have a chance to fix a bug.");
		$query = array(
			'private' => array('$ne' => true),
			// 'stats.dps' => array('$gt' => 0),
			// 'stats.ehp' => array('$gt' => 0),
			// 'votes' => array('$gt' => -5),
			// 'actives' => array('$exists' => true),
			// 'passives' => array('$exists' => true),
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
		if($isHardcore = $this->getRequest()->getParam("isHardcore")) {
			if($isHardcore == "true") {
				$this->view->isHardcore = $query['hardcore'] = true;
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
		
		if($this->_request->isXmlHttpRequest() && !$this->getRequest()->getParam('character-id') && !$this->getRequest()->getParam('character-id-manual') && $this->getRequest()->getParam('region') && $this->getRequest()->getParam('battletag')) {
			$tag = str_replace(" ", "", $this->getRequest()->getParam('battletag'));
			$region = $this->getRequest()->getParam('region');
			echo json_encode(D3Up_Tool_Crawler::getCharactersByTag($tag, (int) $region)); exit;
		}
		// Create a new Build
		$build = Epic_Mongo::newDoc('build');
		$form = $this->view->form = $build->getEditForm();
		$battletag = null;
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			$battletag = str_replace(" ", "", $this->getRequest()->getParam('battletag'));
			if($profile) {				
				$battletag = str_replace(" ", "", $this->getRequest()->getParam('battletag')) ?: str_replace(" ", "", $profile->battletag);
			}
			$build = Epic_Mongo::db('build')->find($result['upserted']);
			if($result && $battletag && ($this->getRequest()->getParam('character-id') || $this->getRequest()->getParam('character-id-manual'))) {
				$character = $this->getRequest()->getParam('character-id', null);
				$region = $this->getRequest()->getParam('region');
				if($character == "") {
					$character = $this->getRequest()->getParam('character-id-manual', null);
					$fakeProfile = Epic_Mongo::newDoc('profile');
					$fakeProfile->region = $region;
					$fakeProfile->battletag = $battletag;
					$build->_characterId = $character;
					$build->_characterBt = strtolower($fakeProfile->battletag);
					$build->_characterRg = $fakeProfile->region;
					D3Up_Tool_Crawler::getInstance()->crawl($build, $fakeProfile, $character);					
				} else {
					$build->_characterId = $character;
					$build->_characterBt = strtolower($profile->battletag);
					$build->_characterRg = $profile->region;
					D3Up_Tool_Crawler::getInstance()->crawl($build);															
				}
				$build->_characterId = $character;
				$build->_lastCrawl = time();
				$build->save();
			}
			if($build) {
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
	public function taglistAction() {
		$this->view->battletag = $battletag = str_replace("-", "#", $this->getRequest()->getParam("bt"));
		$query = array(
			'battletag' => new MongoRegex("/".$battletag."/i")
		);
		$users = Epic_Mongo::db("user")->fetchAll($query);
		if($users) {
			$query = array(
				'$or' => array()
			);
			foreach($users as $user) {
				$query['$or'][]['_createdBy'] = $user->createReference();
			}
			// var_dump($query); exit;
			$sort = array(
				'_lastCrawl' => -1,
			);
			$this->view->builds = Epic_Mongo::db("build")->fetchAll($query, $sort);	
		} else {
			throw new Exception("BattleTag not found in the database.");
		}
	}
	public function searchAction() {
		$this->view->search = $search = $this->getRequest()->getParam('search');
		$query = array(
			'_characterBt' => strtolower($search),
			'private' => false,
		);
		$sort = array(
			'_lastCrawl' => -1,
		);
		$this->view->builds = Epic_Mongo::db("build")->fetchAll($query, $sort);	
		// var_dump(Epic_Mongo::db('build')->fetchOne(array('id'=>1))->export(), $this->getRequest()->getParams()); exit;
	}
} // END class HeroController extends Epic_Controller_Action

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
		);
		$sort = array(
			'_created' => -1,
		);
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
		if($isGeared = $this->getRequest()->getParam('geared')) {
			if($isGeared == "true") {				
				$query['equipmentCount'] = array(
					'$gt' => 10
				);
				$this->view->isGeared = true;
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
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {		
			// Create a new hero
			$build = Epic_Mongo::newDoc('build');
			// Get Form for hero
			$form = $this->view->form = $build->getEditForm();
			if($this->getRequest()->isPost()) {
				$result = $form->process($this->getRequest()->getParams());
				if($result) {
					$i = Epic_Mongo::db('build')->find($result['upserted']);
					$this->_redirect("/b/".$i->id);				
				}
			}
		} else {
			$this->_redirect("/user/builds");
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
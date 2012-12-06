<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class GroupController extends D3Up_Controller_Action
{
	public function getGroup() {
		$id = $this->getRequest()->getParam('id');
		return $this->view->group = $group = Epic_Mongo::db('group')->fetchOne(array("id" => (int) $id));
	}
	public function indexAction() {
		
	}
	public function removeAction() {
		$group = $this->getGroup();		
		$toRemove = Epic_Mongo::db('build')->fetchOne(array("id" => (int) $this->getRequest()->getParam("build")));
		if($group->owner->id == $toRemove->id) {
			throw new Exception("You cannot remove the leader of the group!");
		}
		foreach($group->members as $key => $member) {
			if($member->id == $toRemove->id) {
				$group->members[$key] = null;
				$group->save();
			}
			// var_dump($key, $member->id);
		}
		$this->_redirect("/group/" . $group->id); 
		// var_dump($group); exit;
	}
	public function addAction() {
		$group = $this->getGroup();		
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You must be logged in to edit your groups.");
		}
		if($profile->id != $group->owner->id) {
			throw new Exception("This isn't your group.");
		}
		$newMember = Epic_Mongo::db('build')->fetchOne(array("id" => (int) $this->getRequest()->getParam("build-id")));
		foreach($group->members as $member) {
			if($member->id == $newMember->id) {
				throw new Exception("This build is already a member of this group.");
			}
		}
		$group->members->addDocument($newMember);
		$group->save();
		$this->_redirect("/group/" . $group->id);
	}
	public function viewAction() {
		$group = $this->getGroup();
	}
	public function editAction() {
		$group = $this->getGroup();
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You must be logged in to edit your groups.");
		}
		if($profile->id != $group->owner->id) {
			throw new Exception("This isn't your group.");
		}
		$group = $this->getGroup();
		$form = $this->view->form = $group->getEditForm();
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				$this->_redirect("/group/" . $result['group']->id);
			}
		}
	}
	public function createAction() {
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You must be logged in to create groups.");
		}
		// Create a new Group
		$group = Epic_Mongo::newDoc('group');
		$form = $this->view->form = $group->getEditForm();
		// var_dump($this->getRequest()->getParams()); exit;
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				$this->_redirect("/group/" . $result['group']->id);
			}
		}
	}
}
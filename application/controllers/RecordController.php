<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class RecordController extends Epic_Controller_Action
{
	public function getRecord() {
		return $this->view->record = $this->getRequest()->getParam('record');
	}
	public function indexAction() {		
	}
	public function editAction() {
		$record = $this->getRequest()->getParam('record');
		switch($record->_type) {
			case "item":
				$this->_redirect("/item/edit/id/".$record->id);
				break;
		}
		var_dump($record); exit;
	}
	public function viewAction() {
		$record = $this->getRecord();
		// NOTE - This logic kinda sucks, but it works for now (Mainly AJAX handling)
		// See if someone owns the hero and if someone is currently logged in
		if($record->_createdBy && $profile = Epic_Auth::getInstance()->getProfile()) {
			// See if the createdBy and current user match
			if($record->_createdBy->createReference() == $profile->createReference()) {
				// Now see if they've issued an action against the hero
				if($a = $this->getRequest()->getParam('a')) {
					// Do something based on the action
					switch($a) {
						// Equiping an Item into a slot
						case "equip":
							$slot = $this->getRequest()->getParam('slot');
							$newItem = $this->getRequest()->getParam('newItem');
							$item = Epic_Mongo::db('item')->fetchOne(array('id' => (int) $newItem));
							$record->equipment[$slot] = $item;
							echo json_encode($record->save()); exit;
							break;
					}
				}
			}
		}
	}
} // END class RecordController extends Epic_Controller_Action
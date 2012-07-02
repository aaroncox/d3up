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
	public function deleteAction() {
		$record = $this->getRecord();
		if($confirm = $this->getRequest()->getParam("confirm")) {
			unset($record->_createdBy);
			$record->save();
			$this->_redirect("/user/items");
		}
	}
	public function copyAction() {
		// Get the record
		$record = $this->getRecord();
		// Get this user
		$profile = Epic_Auth::getInstance()->getProfile();
		// Check to see if the user has already copied this item
		$query = array(
			'_original' => $record->createReference(),
			'_createdBy' => $profile->createReference(), 
		);
		$dupe = Epic_Mongo::db("item")->fetchOne($query);
		if($dupe) {
			$this->_redirect("/i/".$dupe->id);
			throw new Exception("You've already copied this item to your items. To prevent abuse, you can't copy an item to your items more than once.");
		}
		$new = Epic_Mongo::newDoc('item');
		$export = $record->export();
		unset($export['id'], $export['_id'], $export['_createdBy']);
		$new->setFromArray($export);
		$new->_original = $record;
		$new->_createdBy = $profile;
		$new->save();
		$this->_redirect("/i/".$new->id);
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
							// If we are wearing a 2h weapon, blank out the offhand
							if(isset($record->equipment['mainhand']->id)) {
								switch($record->equipment['mainhand']->type) {
									case '2h-mace': 
									case '2h-axe': 
									case 'diabo': 
									case 'crossbow': 
									case '2h-mighty': 
									case 'polearm': 
									case 'staff': 
									case '2h-sword':
										$record->equipment['offhand'] = null;
										break;
								}								
							}
							if(in_array($item->type, array('2h-mace', '2h-axe', 'diabo', 'crossbow', '2h-mighty', 'polearm', 'staff', '2h-sword'))) {								
								$record->equipment['offhand'] = null;
							}
							$record->equipment[$slot] = $item;
							echo json_encode($record->save()); exit;
							break;
						case "passive-skills":
							$record->passives = $this->getRequest()->getParam('passives');
							echo json_encode($record->save()); exit;
							break;
					}
				}
			}
		}
	}
} // END class RecordController extends Epic_Controller_Action
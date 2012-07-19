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
			case "build":
				$this->_redirect("/build/edit/id/".$record->id);
				break;
		}
		var_dump($record); exit;
	}
	public function deleteAction() {
		$record = $this->getRecord();
		if($confirm = $this->getRequest()->getParam("confirm")) {
			unset($record->_createdBy);
			$type = $record->_type;
			$record->save();
			$this->_redirect("/user/".$type."s");
		}
	}
	public function copyAction() {
		// Get the record
		$record = $this->getRecord();
		// Get this user
		$profile = Epic_Auth::getInstance()->getProfile();
		if(!$profile) {
			throw new Exception("You aren't logged in, therefore you cannot use the Copy feature.");
		}
		// Check to see if the user has already copied this item
		if($record instanceOf D3Up_Mongo_Record_Item) {
			$query = array(
				'_original' => $record->createReference(),
				'_createdBy' => $profile->createReference(), 
			);
			$dupe = Epic_Mongo::db("item")->fetchOne($query);
			if($dupe) {
				// $this->_redirect();
				throw new Exception("You've already copied this item to your items, here's a <a href='/i/".$dupe->id."'>link to your copy</a>. To prevent abuse, you can't copy an item to your items more than once.");
			}
			if($confirm = $this->getRequest()->getParam("confirm")) {			
				$new = Epic_Mongo::newDoc('item');
				$export = $record->export();
				unset($export['id'], $export['_id'], $export['_createdBy']);
				$new->attrs->setFromArray($export['attrs']);
				unset($export['attrs']);
				$new->setFromArray($export);	
				$new->_original = $record;
				$new->_createdBy = $profile;
				$new->save();
				$this->_redirect("/i/".$new->id);		
			}
		}
		if($record instanceOf D3Up_Mongo_Record_Build) {
			if($confirm = $this->getRequest()->getParam("confirm")) {
				if($record->_original->id) {
					echo "Checking Original Status";
					$query = array(
						'_original' => $record->_original->createReference(),
						'_createdBy' => $profile->createReference(), 
					);
				} else {
					// Check to see if THIS user has copied this build already
					echo "Checking User/Build Status";
					$query = array(
						'_original' => $record->createReference(),
						'_createdBy' => $profile->createReference(), 
					);					
				}
				$dupe = Epic_Mongo::db("build")->fetchOne($query);
				// echo "<pre>"; var_dump($query, $dupe); exit;
				if($dupe) {
					// $this->_redirect("/b/".$dupe->id);
					throw new Exception("You've already copied this build to your builds. To prevent abuse, you can't copy a build to your builds more than once.");
				}
				$new = Epic_Mongo::newDoc('build');
				$export = $record->export();
				unset($export['id'], $export['_id'], $export['_createdBy'], $export['equipment']);
				$new->setFromArray($export);			
				foreach($record->equipment as $slot => $item) {
					$newItem = Epic_Mongo::newDoc('item');
					$exportItem = $item->export();
					unset($exportItem['id'], $exportItem['_id'], $exportItem['_createdBy'], $exportItem['_original']);
					$newItem->setFromArray($exportItem);			
					$newItem->_original = $item;
					$newItem->_createdBy = $profile;
					$newItem->save();
					$new->equipment->$slot = $newItem;
				}
				if($record->_original->id) {
					$new->_original = $record->_original;					
				} else {
					$new->_original = $record;					
				}
				$new->_createdBy = $profile;
				$new->save();
				$this->_redirect("/b/".$new->id."/edit");
			}
			// echo "<pre>"; var_dump($record, $export); exit;
		}
	}
	public function viewAction() {
		$record = $this->getRecord();
		// if($record->_type == "build") {
			// Get all the comments and the comment form
			// $this->view->commentForm = $commentForm = new D3Up_form_Record_Build_Comment(array('build' => $record));
			// $this->_handleForm($commentForm);
			// Get all the comments for this build
			// $comments = Epic_Mongo::db('comment')->fetchAll(array('build' => $record->createReference()), array('_created' => -1));
			// $paginator = Zend_Paginator::factory($comments);
			// $paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
			// $this->view->comments = $paginator;
		// }
		// NOTE - This logic kinda sucks, but it works for now (Mainly AJAX handling)
		// See if someone owns the hero and if someone is currently logged in
		if($record->_createdBy && $profile = Epic_Auth::getInstance()->getProfile()) {
			// See if the createdBy and current user match
			if($record->_createdBy->createReference() == $profile->createReference()) {
				// Is this a build?
				if($record->_type == "build") {
					// Add the Guide form since we own it
					$this->view->guideForm = $guideForm = new D3Up_Form_Record_Build_Guide(array('build' => $record));					
					$this->_handleForm($guideForm);
				}
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
							$record->equipmentCount = count($record->equipment);
							$record->stats = $this->getRequest()->getParam('stats');
							$this->getResponse()->setHeader('Content-type', 'application/json');
							echo json_encode($record->save()); exit;
							break;
						case "passive-skills":
							$record->passives = $this->getRequest()->getParam('passives');
							$this->getResponse()->setHeader('Content-type', 'application/json');
							echo json_encode($record->save()); exit;
							break;
					}
				}
			}
		}
	}
	public function purchaseAction() {
		$record = $this->getRecord();
		if($confirm = $this->getRequest()->getParam('confirm')) {
			
		}
	}
	public function offersAction() {
		$record = $this->getRecord();
		
	}
} // END class RecordController extends Epic_Controller_Action
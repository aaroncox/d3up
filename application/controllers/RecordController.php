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
		$record = $this->getRecord();
		switch($record->_type) {
			case "item":
				$this->_redirect("/item/edit/id/".$record->id);
				break;
			case "build":
				$this->_redirect("/build/edit/id/".$record->id);
				break;
			case "sale":
				$profile = Epic_Auth::getInstance()->getProfile();
				if($profile->createReference() != $record->seller->createReference()) {
					throw new Exception("This is not your ".$record->_type);
				}
				$this->view->form = $form = $record->getEditForm();
				$this->_handleForm($form);
				break;
		}
	}
	public function deleteAction() {
		$record = $this->getRecord();
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile->createReference() != $record->_createdBy->createReference()) {
			throw new Exception("This is not your ".$record->_type);
		}
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
					// throw new Exception("You've already copied this build to your builds. To prevent abuse, you can't copy a build to your builds more than once.");
				}
				$new = Epic_Mongo::newDoc('build');
				$export = $record->export();
				unset($export['id'], $export['_id'], $export['_createdBy'], $export['equipment'], $export['views'], $export['votes']);
				$new->setFromArray($export);			
				foreach(Epic_Mongo::db('gearset')->getSlots() as $slot) {
					$item = $record->equipment->$slot;
					$newItem = Epic_Mongo::newDoc('item');
					$exportItem = $item->export();
					unset($exportItem['id'], $exportItem['_id'], $exportItem['_createdBy'], $exportItem['_original'], $exportItem['_type']);
					if($exportItem['attrs']) {
						$newItem->attrs->setFromArray($exportItem['attrs']);
						unset($exportItem['attrs']);						
					}
					try {
						$newItem->setFromArray($exportItem);									
					} catch (Exception $e) {
						echo "<pre>"; var_dump($exportItem); exit;						
					}
					// $newItem->_original = $item;
					$newItem->_createdBy = $profile;
					// var_dump($newItem); exit;
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
	public function checkVote() {
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$record = $this->getRecord();
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
		$record = $this->getRecord();
		if($record->_type == "build") {
			$this->checkVote();
			$record->viewCounter();
		}
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
							foreach($this->getRequest()->getParam('stats') as $k => $v) {
								$record->stats->$k = floatVal($v);
							}
							$this->getResponse()->setHeader('Content-type', 'application/json');
							echo json_encode($record->save()); exit;
							break;
						case "active-skills":
							$record->actives = $this->getRequest()->getParam('actives');
							foreach($this->getRequest()->getParam('stats') as $k => $v) {
								$record->stats->$k = floatVal($v);
							}
							$this->getResponse()->setHeader('Content-type', 'application/json');
							echo json_encode($record->save()); exit;
							break;
						case "passive-skills":
							$record->passives = $this->getRequest()->getParam('passives');
							foreach($this->getRequest()->getParam('stats') as $k => $v) {
								$record->stats->$k = floatVal($v);
							}
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
	public function crawlAction() {
		$record = $this->getRecord();
		if($confirm = $this->getRequest()->getParam("confirm")) {			
			$this->view->status = D3Up_Tool_Crawler::getInstance()->crawl($record);
		}
	}
} // END class RecordController extends Epic_Controller_Action
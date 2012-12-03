<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class RecordController extends D3Up_Controller_Action
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
				$this->_redirect("/user/items");
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
					if(!$item->id) {
						continue;
					}
					$newItem = Epic_Mongo::newDoc('item');
					$exportItem = $item->export();
					unset($exportItem['id'], $exportItem['_id'], $exportItem['_createdBy'], $exportItem['_original'], $exportItem['_type']);
					if(isset($exportItem['attrs'])) {
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
	public function getSimilarAction() {
		$this->getSimilarItems();
		$items = $this->view->similar;
		$this->getResponse()->setHeader('Content-type', 'application/json');
		$data = array();
		$helper = new D3Up_View_Helper_PrettyStat();
		if($items && count($items) > 0) {
			foreach($items as $item) {
				$data[$item->id] = array(
					'item' => $item->cleanExport()
				);
			}			
		}
		echo json_encode($data); exit;
	}
	public function getSimilarItems() {
		$item = $this->getRecord();
		if(!$item->rating) {
			return null;
		}
		$query = array(
			'type' => array(
				'$in' => Epic_Mongo::db('item')->getSlotByType($item->type)
			)
		);
		$toCompare = json_decode($this->getRequest()->getParam('attrs'));
		if(empty($toCompare) && $item->rating && $item->rating instanceOf Shanty_Mongo_Document) {
			$toCompare = array_keys($item->rating->export());
			unset($toCompare['total']);
  		foreach($toCompare as $attr) {
  			$query['rating'] = array(
  				'$ne' => $item->rating->export()
  			);
  			if($item->rating[$attr]) {
  				$value = $item->rating[$attr];
  				$query['rating.'.$attr] = array(
  					'$gt' => ($value - 10),
  					'$lt' => ($value + 10),
  				);

  				// var_dump($item->rating[$attr]);
  			}
  		}
  		// Get rid of the total
  		unset($query['rating.total']);
  		$query['id'] = array(
  			'$ne' => $item->id
  		);
  		$items = Epic_Mongo::db('item')->fetchAll($query, array(), 8);							
  		$this->view->similar = $items;
		}
	}
	public function checkTwitch() {
		$record = $this->getRecord();
		$ttl = 60 * 5; // 5 Minutes
		// echo "S: ".$record->_twitchLastCheck."<br/>";
		// echo "C: ".(time())."<br/>";
		// Lets only check to see if they are online every 5 minutes
		if($record->_twitchLastCheck < time()) {
			// echo "Checking Online Status";
			// Make request to see if the user is online
			$channelName = strtolower($record->_createdBy->_twitchUser);
			$json_array = json_decode(file_get_contents("https://api.twitch.tv/kraken/streams/$channelName"), true);
			// If they are online, update the timestamp on their record
			$record->_twitchLastCheck = time() + $ttl;
			if($json_array['stream']['name'] == "live_user_$channelName") {
				$record->_twitchOnline = true;
				$record->_twitchLastSeen = time();
			} else {
				$record->_twitchOnline = false;
			}
			$record->save();
		}
		// exit;
	}
	
	public function viewAction() {
		$record = $this->getRecord();
		if($record->_type == "build") {
		  $this->view->editForm = $record->getEditForm();
		  $this->view->editForm->setAction("/build/edit/id/" . $record->id);
			$this->checkVote();
			$this->view->resync = $this->getRequest()->getParam("resync");
			if($record->_twitchEnabled && $record->_createdBy->_twitchUser) {
				$this->checkTwitch();
			}
		}
		// Count a View
		$record->viewCounter();
		if($record->_type == 'item') {
			// $this->getSimilarItems();
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
							if($newItem == "") {
                // Blank out the Item
                $record->equipment[$slot] = null;
							} else {
							  // Fetch the new Item
							 	$item = Epic_Mongo::db('item')->fetchOne(array('id' => (int) $newItem));
  							// If we are wearing a 2h weapon, blank out the offhand
  							if(isset($record->equipment['mainhand']->id)) {
  								switch($record->equipment['mainhand']->type) {
  									case '2h-mace': 
  									case '2h-axe': 
  									case 'daibo': 
  									case '2h-mighty': 
  									case 'polearm': 
  									case 'staff': 
  									case '2h-sword':
  										$record->equipment['offhand'] = null;
  										break;
  								}								
  							}
  							if(in_array($item->type, array('2h-mace', '2h-axe', 'daibo', 'crossbow', '2h-mighty', 'polearm', 'staff', '2h-sword'))) {								
  								$record->equipment['offhand'] = null;
  							}
  							$record->equipment[$slot] = $item;
  							$record->equipmentCount = count($record->equipment); 
							}
							$stats = array();
							foreach($this->getRequest()->getParam('stats') as $k => $v) {
 								$stats[$k] = floatVal($v);
							}
							$record->stats = $stats;
							$this->getResponse()->setHeader('Content-type', 'application/json');
							echo json_encode($record->save()); exit;
							break;
						case "skills":
							$record->actives = $this->getRequest()->getParam('actives');
							$record->passives = $this->getRequest()->getParam('passives');
							$stats = array();
							foreach($this->getRequest()->getParam('stats') as $k => $v) {
								$stats[$k] = floatVal($v);
							}
							$record->stats = $stats;
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
		if($profile = Epic_Auth::getInstance()->getProfile()) {		
			$record = $this->getRecord();
			if($record->_createdBy->createReference() == $profile->createReference()) {
				$this->view->characters = D3Up_Tool_Crawler::getInstance()->getCharacters($profile);
				if($character = $this->getRequest()->getParam("character")) {			
					$record->_characterId = $character;
					$record->_characterBt = strtolower($profile->battletag);
					$record->_characterRg = $profile->region;
					$this->view->status = D3Up_Tool_Crawler::getInstance()->crawl($record, $profile, $character);
					$record->crawlCount++;
					$record->save();
				}
			} else {
				throw new Exception("This isn't your profile!");
			}
		} else {
			throw new Exception("You are not logged in!");
		}
	}
	public function resyncAction() {
		$record = $this->getRecord();
		$profile = D3Up_Auth::getInstance()->getProfile();
		// For me so I can sync anyone in dev.
		if(APPLICATION_ENV === 'development') {
			D3Up_Tool_Crawler::getInstance()->crawl($record, $record->_createdBy, $record->_characterId);		  
  		$this->_redirect("/b/" . $record->id ."?resync=true");
		}
		if(!$record->_characterId) {
			throw new Exception("[ID] This build isn't attached to a Battle.net Profile");
		}
		if(!$record->_characterBt) {
			throw new Exception("[BT] This build isn't attached to a Battle.net Profile");
		}
		if(!$record->_characterBt) {
			throw new Exception("[RG] This build isn't attached to a Battle.net Profile");
		}
		if($record->_createdBy && $profile && $profile->id == $record->_createdBy->id) {
  		if(time() <= $record->_lastCrawl + 60 * 2) {
        throw new Exception("Profiles may only be crawled once every 2 minutes. This profile has been updated too recently to be updated again, try again later!");
  		}
  		if(!$record->_characterRg || !$record->_characterBt || !$record->_characterId) {
    		$this->_redirect("/b/" . $record->id ."/crawl");
  		}
  		if(!$record->_createdBy->region) {
  		  throw new Exception("You do not have the 'Region' field filled out on your profile! Click <a href='/user/edit'>edit profile</a> and choose your region");
  		}
  		D3Up_Tool_Crawler::getInstance()->crawl($record, $record->_createdBy, $record->_characterId);		  
  	} elseif($record->_createdBy->id) {
			throw new Exception("This isn't an anonymous build, someone owns this build and you cannot sync it from Battle.net.");
		} else {
  		if(time() <= $record->_lastCrawl + 60 * 60 * 1) {
  			throw new Exception("Anonymous Profiles may only be crawled once every hour. This profile has been updated too recently to be updated again, try again later!");
  		}
  		$fakeProfile = Epic_Mongo::newDoc('profile');
  		$fakeProfile->region = $record->_characterRg;
  		$fakeProfile->battletag = strtolower($record->_characterBt);
  		D3Up_Tool_Crawler::getInstance()->crawl($record, $fakeProfile, $record->_characterId);		  
		}
		$record->crawlCount++;
		$record->_lastCrawl = time();
		$record->save();
		$this->_redirect("/b/" . $record->id ."?resync=true");
	}
	public function convertAction() {
	  $record = $this->getRecord();
	  $record->_d3bit = null;
	  $record->save();
	  $this->_redirect('/user/items');
	}
	public function jsonAction() {
		$record = $this->getRecord();
		echo json_encode($record->cleanExport()); exit;
	}
} // END class RecordController extends Epic_Controller_Action
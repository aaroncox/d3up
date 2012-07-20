<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class UserController extends Epic_Controller_Action
{
	public function indexAction() {
		
	}
	public function loginAction() {
		$form = $this->view->form = new Epic_Auth_Form_Login();
		$this->_handleForm($form);
		if(Epic_Auth::getInstance()->getProfile()) {
			$this->_redirect("/");
		}
	}
	public function logoutAction() {
		Epic_Auth::getInstance()->clearIdentity();
		$this->_redirect("/");
	}
	public function registerAction() {
		$form = $this->view->form = new D3Up_Auth_Form_Register();
		$this->_handleForm($form);		
		if(Epic_Auth::getInstance()->getProfile()) {
			$this->_redirect("/");
		}
	}
	public function forgotAction() {
		
	}
	public function buildsAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$builds = Epic_Mongo::db('build')->fetchAll(array('_createdBy' => $profile->createReference()));			
			$paginator = Zend_Paginator::factory($builds);
			$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
			$this->view->builds = $paginator;			
		} else {
			$this->view->notLoggedIn = true;
		}
	}
	public function itemsAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$query = array(
				"_createdBy" => $profile->createReference(),
			);
			if($slot = $this->getRequest()->getParam('slot')) {
				$possible = D3Up_Mongo_Record_Item::$slotTypeMap;
				$query['type']['$in'] = $possible[$slot];
				$this->view->slotType = $slot;
			}
			if($type = $this->getRequest()->getParam('type')) {
				$this->view->itemType = $query['type'] = $type;
			}
			$query['method'] = array('$ne' => 'ah');
			if($sellMethod = $this->getRequest()->getParam('sellMethod')) {
				$this->view->sellMethod = $query['method'] = $sellMethod;
			}
			$sort = array();
			if($sortAttr = $this->getRequest()->getParam('sort')) {
				$sortAttrs = explode(",", $sortAttr);
				foreach($sortAttrs as $k => $v) {
					switch($v) {
						// Special Cases
						case "base_armor":
							$key = 'stats.armor';
							break;
						case "base_dps":
							$key = 'stats.dps';
							break;
						default:
							$key = 'attrs.'.$v;
							break;
					}
					$query[$key] = array(
						'$ne' => '',
						'$exists' => true
					);				
					$sort[$key] = -1;
				}
				$this->view->sortAttrs = $sortAttrs;
			} else {
				$sort['_created'] = -1;
			}
			$items = Epic_Mongo::db('item')->fetchAll($query, $sort);			
			$paginator = Zend_Paginator::factory($items);
			$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20)->setPageRange(3);
			$this->view->items = $paginator;
			if($this->_request->isXmlHttpRequest()) {
				$this->view->disableScripts = true;
				$this->_helper->layout->disableLayout();
			}
			// $paginator = Zend_Paginator::factory($items);
			// $paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
			// $this->view->items = $items;
		} else {
			$this->view->notLoggedIn = true;
		}
	}
	public function shopAction() {
		$this->view->profile = $profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {
			$profile->_lastSeen = time();
			$profile->save();
			$this->view->selectItem = $this->getRequest()->getParam("selectItem");
			if(!$profile->region) {
				$this->view->form = $form = new D3Up_Form_User_Shop(array('user' => $profile));
				$this->_handleForm($form);
			} else {
				$query = array('_createdBy' => $profile->createReference());
				if($filter = $this->getRequest()->getParam('filter')) {
					$query['type'] = $filter;
				}
				if($action = $this->getRequest()->getParam("a")) {
					switch($action) {
						case "cancel":
							$query = array(
								'seller' => $profile->createReference(),
								'id' => (int) $this->getRequest()->getParam('saleId'),
							);
							$sale = Epic_Mongo::db('sale')->fetchOne($query);
							if(!$sale) {
								throw new Exception("Cannot locate auction");
							}
							$sale->_cancelled = true;
							echo json_encode($sale->save()); exit;
							break;
						case "completeSale":
							// Get the Sale
							$query = array(
								'seller' => $profile->createReference(),
								'id' => (int) $this->getRequest()->getParam('completeSaleId'),
							);
							$sale = Epic_Mongo::db('sale')->fetchOne($query);
							if(!$sale) {
								throw new Exception("Cannot locate auction");
							}
							// Did it sell?
							$result = $this->getRequest()->getParam('completeSaleResult');
							if($result == 'true') {
								$sale->soldFor = (int) $this->getRequest()->getParam('completeSaleValue');
								if($sale->method == "ah") {
									
								}
								$sale->soldOn = time();
								$sale->soldSuccess = true;
							} else {
								$sale->soldOn = time();
								$sale->soldSuccess = false;
							}
							$sale->_completed = true;
							$sale->save();
							$this->_redirect("/user/shop");
							break;
						case "postSale":
							// Get the item we want to sell
							$query = array(
								'id' => (int) $this->getRequest()->getParam('itemId'),
							);
							$item = Epic_Mongo::db('item')->fetchOne($query);
							// See if we're already selling this item...
							$query = array(
								'seller' => $profile->createReference(),
								'item.id' => $item->id,
							);
							$sale = Epic_Mongo::db('sale')->fetchOne($query);
							if($sale) {
								throw new Exception("You've already listed this item for sale!");
							}
							$sale = Epic_Mongo::newDoc('sale');
							$sale->item = $item;
							$sale->seller = $profile;
							$sale->method = $this->getRequest()->getParam('sellMethod');
							switch($sale->method) {
								case "ah":
									$sale->bid = (int) $this->getRequest()->getParam('ahBid');
									$sale->buyout = (int) $this->getRequest()->getParam('ahBuyout');
									break;
								case "bid":
									break;
								case "flat":
									break;
								case "offer":
									break;
							}
							$sale->value = (int) $this->getRequest()->getParam('sellValue');
							if($sale->method == 'ah') {				
								$sale->end = time() + (36 * 60 * 60);
							} else {
								$sale->duration = (int) $this->getRequest()->getParam('sellDuration');								
								$sale->end = time() + (86400 * $sale->duration);
							}
							$sale->save();
							$this->_redirect("/user/shop");
							break;
						case "getItems":	
							$this->getResponse()->setHeader('Content-type', 'application/json');
							$data = array();
							$items = Epic_Mongo::db('item')->fetchAll($query, array("_created" => -1));							
							foreach($items as $item) {
								$data[$item->id] = json_encode($item->cleanExport());
							}
							echo json_encode($data); exit;
							break;
					}
				}
			}
			// Get what items you're currently selling
			$query = array(
				'seller' => $profile->createReference(),
				'_cancelled' => array('$exists' => false),
				'_completed' => array('$exists' => false),
			);
			$this->view->forSale = Epic_Mongo::db('sale')->fetchAll($query);
			// Now get items that you've completed
			$query['_completed'] = true;
			$sort = array(
				'soldOn' => -1,
			);
			$this->view->completed = Epic_Mongo::db('sale')->fetchAll($query, $sort);
			// Now get all items that've completed
			unset($query['seller']);
			$query['_completed'] = true;
			$this->view->allcompleted = Epic_Mongo::db('sale')->fetchAll($query, $sort);
		} else {
			$this->view->notLoggedIn = true;
		}		
	}
} // END class UserController extends Epic_Controller_Action
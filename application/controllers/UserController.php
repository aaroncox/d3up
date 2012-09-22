<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class UserController extends D3Up_Controller_Action
{
	public function editAction() {
		$profile = D3Up_Auth::getInstance()->getProfile();
		$form = $this->view->form = $profile->getEditForm();
		$this->_handleForm($form);
		// var_dump($profile); exit;
	}
	public function indexAction() {
		
	}
	public function loginAction() {
		$form = $this->view->form = new Epic_Auth_Form_Login();
		if($this->view->afterReset = $this->getRequest()->getParam('afterReset')) {
			if($this->getRequest()->isPost()) {
				if($form->process($this->getRequest()->getParams())) {
					$this->_redirect("/");
				}
			}
		} else {
			$this->_handleForm($form);			
		}
		if(D3Up_Auth::getInstance()->getProfile()) {
			$this->_redirect("/");
		}
	}
	public function logoutAction() {
		D3Up_Auth::getInstance()->clearIdentity();
		$this->_redirect("/");
	}
	public function registerAction() {
		$form = $this->view->form = new D3Up_Auth_Form_Register();
		$this->_handleForm($form);		
		if(D3Up_Auth::getInstance()->getProfile()) {
			$this->_redirect("/");
		}
	}
	public function forgotAction() {
		
	}
	public function buildsAction() {
		$profile = D3Up_Auth::getInstance()->getProfile();
		if(!$profile) {
		  $this->_redirect("/user/login");
		}
		$query = array(
      '_createdBy' => $profile->createReference(),
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
	public function itemsAction() {
    $profile = $this->view->profile = Epic_Auth::getInstance()->getProfile();
    if(!$profile) {
      return $this->_redirect("/user/login");
    }
    if($this->view->profile) {
    	$query = array(
    		'_createdBy' => $profile->createReference()
    	);
    	$this->view->builds = Epic_Mongo::db('build')->fetchAll($query);
    }
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
			$this->_helper->viewRenderer('itemsBody');
			$this->_helper->layout->disableLayout();
		}
	}
	public function shopAction() {
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
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
						case "postExpense":
							$expense = Epic_Mongo::newDoc('expense');
							$expense->profile = $profile;
							$expense->type = $this->getRequest()->getParam('expenseType');
							$expense->amount = $this->getRequest()->getParam('expenseAmount');
							$expense->date = time();
							$expense->save();
							// var_dump($expense->export(), $this->getRequest()->getParams()); exit;
							break;
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
								// Find the Original and remove the profile
								$toRemove = Epic_Mongo::db('item')->fetchOne(array("id" => $sale->item->id));
								if($toRemove) {
									$toRemove->_createdBy = null;
									$toRemove->save();
								}
							} else {
								$sale->soldOn = time();
								$sale->soldSuccess = false;
							}
							$sale->_completed = true;
							$sale->save();
							// $this->_redirect("/user/shop");
							break;
						case "postSale":
							// Get the item we want to sell
							$query = array(
								'id' => (int) $this->getRequest()->getParam('itemId'),
							);
							$item = Epic_Mongo::db('item')->fetchOne($query);
							$sale = Epic_Mongo::newDoc('sale');
							$sale->item = $item;
							$sale->seller = $profile;
							$sale->region = (int) $profile->region;
							$sale->method = $this->getRequest()->getParam('sellMethod');
							$sale->bid = (float) $this->getRequest()->getParam('ahBid');
							$sale->buyout = (float) $this->getRequest()->getParam('ahBuyout');
							$sale->value = (float) $this->getRequest()->getParam('sellValue');
							if($sale->method == 'ah' || $sale->method == 'rmah') {				
								$sale->end = time() + (36 * 60 * 60);
							} else {
								$sale->duration = (int) $this->getRequest()->getParam('sellDuration');								
								$sale->end = time() + (86400 * $sale->duration);
							}
							$sale->save();
							$this->_redirect("/user/shop");
							break;
						case "getSimilar":
							$toCompare = json_decode($this->getRequest()->getParam('attrs'));
							$item = Epic_Mongo::db("item")->fetchOne(array("id" => (int) $this->getRequest()->getParam("id")));
							$query = array(
								"item.type" => $item->type,
								'soldOn' => array('$ne' => null),
							);
							if(empty($toCompare)) {
								$toCompare = array_keys($item->rating->export());
								unset($toCompare['total']);
							}
							foreach($toCompare as $attr) {
								if($item->rating[$attr]) {
									$value = $item->rating[$attr];
									$query['item.rating.'.$attr] = array(
										'$gt' => ($value - 10),
										'$lt' => ($value + 10),
									);
									// var_dump($item->rating[$attr]);
								}
							}
							$sales = Epic_Mongo::db('sale')->fetchAll($query, array("soldOn" => -1), 5);							
							// $sale = Epic_Mongo::db('sale')

							// var_dump($item->export(), "----", $query, "----", $sales->export()); exit;
							$this->getResponse()->setHeader('Content-type', 'application/json');
							$data = array();
							$helper = new D3Up_View_Helper_PrettyStat();
							foreach($sales as $sale) {
								$data[$sale->id] = array(
									'method' => $sale->method,
									'date' => date("Y-m-d", $sale->soldOn),
									'status' => $sale->soldSuccess,
									'price' => $helper->prettyStat($sale->soldFor?:$sale->buyout),
									'item' => $sale->item->cleanExport()
								);
							}
							// var_dump($data);
							echo json_encode($data); exit;
							break;
						case "getItems":	
							$this->getResponse()->setHeader('Content-type', 'application/json');
							$data = array();
							$items = Epic_Mongo::db('item')->fetchAll($query, array("name" => 1));							
							foreach($items as $item) {
								$data[] = json_encode($item->cleanExport());
							}
							echo json_encode($data); exit;
							break;
					}
				}
			}
			$this->view->expenses = Epic_Mongo::db('expense')->fetchAll(array('profile' => $profile->createReference()), array("date" => -1));
			$query = array(
				'seller' => $profile->createReference(),
				'_cancelled' => array('$exists' => false),
			);
			$this->view->allSales = Epic_Mongo::db('sale')->fetchAll($query);
			// Get what items you're currently selling
			$query['_completed'] = array('$exists' => false);
			$this->view->forSale = Epic_Mongo::db('sale')->fetchAll($query);
			// Now get items that you've completed
			$query['_completed'] = true;
			$sort = array(
				'soldOn' => -1,
			);
			$this->view->completed = Epic_Mongo::db('sale')->fetchAll($query, $sort);
			// Now get all items that've completed
			unset($query['seller']);
		} else {
			$this->view->notLoggedIn = true;
		}		
		$query = array('_completed' => true);
		if($profile) {
			$query['region'] = (int) $profile->region;
		}
		// var_dump($query);
		$sort = array('soldOn' => -1);
		$this->view->allcompleted = Epic_Mongo::db('sale')->fetchAll($query, $sort, 50);
	}
	public function reportsAction() {
		// phpinfo(); exit;
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
		$query = array(
			'seller' => $profile->createReference(),
			'soldFor' => array('$exists' => true),
			'soldOn' => array('$exists' => true),
		);
		$completed = $this->view->completed = Epic_Mongo::db('sale')->fetchAll($query);
		$json = array();
		foreach($completed as $complete) {
			$date = date("Y-m-d", $complete->soldOn);
			if(isset($json[$date])) {
				$json[$date] += $complete->soldFor;				
			} else {
				$json[$date] = $complete->soldFor;								
			}
		}
		$this->view->json = array(
			'completed' => json_encode($json)
		);
	}
	public function resetAction() {
		$form = $this->view->form = new Epic_Auth_Form_ResetPassword();
		if($this->getRequest()->isPost()) {
			if($form->process($this->getRequest()->getParams())) {
				// Send the Email
				$this->view->user = $user = Epic_Mongo::db('user')->fetchOne(array('email' => $form->email->getValue()));
				$mail = new Zend_Mail();
				$mail->addTo($form->email->getValue());
				$mail->setBodyHtml($this->view->render('user/forgot-email.phtml'));
				$mail->setFrom('password-goblin@d3up.com', 'D3Up.com Password Goblins');
				$mail->setSubject('D3Up.com - Reset Password Process');
				$mail->send();
				$this->view->sent = 'success';
			} else{
				$this->view->sent = 'failed';
			}
		}
	}
	public function changePasswordAction() {
		$user = D3Up_Auth::getInstance()->getProfile();
		$form = $this->view->form = new Epic_Auth_Form_ChangePassword(array('user' => $user));
		$id = $this->getRequest()->getParam('id');
		$hash = $this->getRequest()->getParam('key');
		if($id && $hash) {
			if($user = Epic_Mongo::db('user')->find(new MongoId($id))) {
				if($user->resetHash == $hash && $user->resetDate > time() - (60*60*6)) {
					$form->setUser($user);
					$form->removeElement("current_password");
					if($this->getRequest()->isPost()) {
						if($form->process($this->getRequest()->getParams())) {
							$this->_redirect('/user/login?afterReset=true');
						}
					}
				} else {
					throw new Exception("This password reset link is now expired, please issue a new one.");
				}
			} else {
				throw new Exception("This reset link is invalid, please issue a new one");
			}
		} else {
			$this->_handleForm($form);			
		}
	}
	public function guidesAction() {
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
		if($profile) {
			$query = array(
				'author' => $profile->createReference(),
			);
			$guides = Epic_Mongo::db('guide')->fetchAll($query);
			$paginator = Zend_Paginator::factory($guides);
			$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(15)->setPageRange(3);
			$this->view->guides = $paginator;
		} else {
			$this->_redirect('/user/login');
		}
	}
	public function deleteItemsAction() {
		$this->view->profile = $profile = D3Up_Auth::getInstance()->getProfile();
		if(!$profile) {
		  $this->_redirect('/user/login');
		}
		$query = array(
			'_createdBy' => $profile->createReference(),
		);
		if($ids = $this->getRequest()->getParam("ids")) {
      $query['id']['$in'] = array_map(function($value) {
        return (int) $value;
      }, explode(",", $ids));
		}
		$this->view->items = $items = Epic_Mongo::db('item')->fetchAll($query); 		  
		$this->view->ids = $ids;
		$this->view->selected = $ids?"the selected":"all of your";
		if($confirm = $this->getRequest()->getParam('confirm')) {
      foreach($items as $item) {
        $item->_createdBy = null;
        $item->save();
      }
      $this->_redirect('/user/items');
		}
	}
} // END class UserController extends Epic_Controller_Action
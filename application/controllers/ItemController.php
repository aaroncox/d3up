<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class ItemController extends Epic_Controller_Action
{
	public function indexAction() {
		$query = array();
		if($slot = $this->getRequest()->getParam('slot')) {
			$possible = D3Up_Mongo_Record_Item::$slotTypeMap;
			$query['type']['$in'] = $possible[$slot];
			$this->view->slotType = $slot;
		}
		if($type = $this->getRequest()->getParam('type')) {
			$this->view->itemType = $query['type'] = $type;
		}
		// echo "<pre>"; 
		// var_dump($query); exit;
		$sort = array();
		if($sortAttr = $this->getRequest()->getParam('sort')) {
			$sortAttrs = explode(",", $sortAttr);
			foreach($sortAttrs as $k => $v) {
				switch($v) {
					// Special Cases
					case "has_sockets":
						$query['sockets'] = array('$exists' => true);
						break;
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
				if($key) {
					$query[$key] = array(
						'$ne' => '',
						'$exists' => true
					);				
					$sort[$key] = -1;					
				}
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
	}
	public function createAction() {
		// Create a new Item
		$item = Epic_Mongo::newDoc('item');
		// Get Form for Item
		$form = $this->view->form = $item->getEditForm();
		$form->itemType->setValue($this->getRequest()->getParam("slot"));
		$form->setBuildToEquip($this->getRequest()->getParam("b"));
		$form->setReturnMethod($this->getRequest()->getParam("return"));
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				if(!is_array($result)) {
					switch($result) {
						case "build":
							$build = $form->getBuild();
							$this->_redirect("/b/".$build->id);
							break;
						case "store":
							$item = $form->getItem();
							$this->_redirect("/user/shop?selectItem=".$item->id);
							break;
					}
				} else {
					$i = Epic_Mongo::db('item')->find($result['upserted']);
					$this->_redirect("/i/".$i->id);									
				}
			}
		}
	}
	public function editAction() {
		$id = $this->getRequest()->getParam("id");
		if($id) {
			$this->view->record = $item = Epic_Mongo::db('item')->fetchOne(array("id" => (int) $id));			
			$profile = Epic_Auth::getInstance()->getProfile();
			if(!$profile) {
				throw new Exception("You aren't logged in!");
			}
			if($profile->id != $item->_createdBy->id) {
				throw new Exception("This isn't your item to edit.");
			}
			// Get Form for Item
			$form = $this->view->form = $item->getEditForm();
			if($this->getRequest()->isPost()) {
				$result = $form->process($this->getRequest()->getParams());
				if($result) {
					$this->_redirect("/i/".$item->id);				
				}
			}
		}		
	}
	public function fetchAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		$type = $this->getRequest()->getParam('type');
		if($profile && $type) {
			$acceptable = Epic_Mongo::db('gearset')->getAcceptableTypes($type);
			$query = array(
				'_createdBy' => $profile->createReference(),
				'type' => array('$in' => $acceptable),
			);
			$items = Epic_Mongo::db('item')->fetchAll($query);
			$data = array();
			foreach($items as $item) {
				$data[$item->id] = json_encode($item->cleanExport());
			}
			echo json_encode($data); exit;
		}
		return false;
	}
	public function salesHistoryAction() {
		$query = array();
		if($slot = $this->getRequest()->getParam('slot')) {
			$possible = D3Up_Mongo_Record_Item::$slotTypeMap;
			$query['item.type']['$in'] = $possible[$slot];
			$this->view->slotType = $slot;
		}
		if($type = $this->getRequest()->getParam('type')) {
			$this->view->itemType = $query['item.type'] = $type;
		}
		$query['method'] = 'ah';
		$query['soldFor'] = array('$exists' => true);
		$query['soldOn'] = array('$exists' => true);
		if($limit = $this->getRequest()->getParam('limit')) {
			$this->view->limit = $query['soldFor']['$lte'] = (int) $limit * 0.85;
		}
		// echo "<pre>"; 
		// var_dump($query); exit;
		$sort = array('soldOn' => -1);
		if($sortAttr = $this->getRequest()->getParam('sort')) {
			$sort = array();
			$sortAttrs = explode(",", $sortAttr);
			foreach($sortAttrs as $k => $v) {
				switch($v) {
					// Special Cases
					case "base_armor":
						$key = 'item.stats.armor';
						break;
					case "base_dps":
						$key = 'item.stats.dps';
						break;
					default:
						$key = 'item.attrs.'.$v;
						break;
				}
				$query[$key] = array(
					'$ne' => '',
					'$exists' => true
				);				
				$sort[$key] = -1;
			}
			$sort['soldOn'] = -1;
			$this->view->sortAttrs = $sortAttrs;
		} else {
			$sort['_created'] = -1;
		}
		$items = Epic_Mongo::db('sale')->fetchAll($query, $sort); 
		$paginator = Zend_Paginator::factory($items);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20)->setPageRange(3);
		$this->view->items = $paginator;
		if($this->_request->isXmlHttpRequest()) {
			$this->view->disableScripts = true;
			$this->_helper->layout->disableLayout();
		}		
	}
	public function bazaarAction() {
		$query = array();
		if($slot = $this->getRequest()->getParam('slot')) {
			$possible = D3Up_Mongo_Record_Item::$slotTypeMap;
			$query['item.type']['$in'] = $possible[$slot];
			$this->view->slotType = $slot;
		}
		if($type = $this->getRequest()->getParam('type')) {
			$this->view->itemType = $query['item.type'] = $type;
		}
		if($limit = $this->getRequest()->getParam('limit')) {
			$this->view->limit = $query['value']['$lte'] = (int) $limit;
		}
		$query['method'] = array('$ne' => 'ah');
		if($sellMethod = $this->getRequest()->getParam('sellMethod')) {
			$this->view->sellMethod = $query['method'] = $sellMethod;
		}
		// echo "<pre>"; 
		// var_dump($query); exit;
		$sort = array();
		if($sortAttr = $this->getRequest()->getParam('sort')) {
			$sortAttrs = explode(",", $sortAttr);
			foreach($sortAttrs as $k => $v) {
				switch($v) {
					// Special Cases
					case "base_armor":
						$key = 'item.stats.armor';
						break;
					case "base_dps":
						$key = 'item.stats.dps';
						break;
					default:
						$key = 'item.attrs.'.$v;
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
		$items = Epic_Mongo::db('sale')->fetchAll($query, $sort); 
		$paginator = Zend_Paginator::factory($items);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20)->setPageRange(3);
		$this->view->items = $paginator;
		if($this->_request->isXmlHttpRequest()) {
			$this->view->disableScripts = true;
			$this->_helper->layout->disableLayout();
		}
	}
} // END class ItemController extends Epic_Controller_Action
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class ItemController extends Epic_Controller_Action
{
	public function createAction() {
		// Create a new Item
		$item = Epic_Mongo::newDoc('item');
		// Get Form for Item
		$form = $this->view->form = $item->getEditForm();
		if($this->getRequest()->isPost()) {
			$result = $form->process($this->getRequest()->getParams());
			if($result) {
				$i = Epic_Mongo::db('item')->find($result['upserted']);
				$this->_redirect("/i/".$i->id);				
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
} // END class ItemController extends Epic_Controller_Action
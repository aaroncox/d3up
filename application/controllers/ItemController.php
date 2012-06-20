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
} // END class ItemController extends Epic_Controller_Action
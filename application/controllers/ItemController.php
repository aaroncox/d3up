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
		$item = Epic_Mongo::newDoc('item');
		$this->view->form = $form = $item->getEditForm($item);
		$this->_handleForm($form);
	}
} // END class ItemController extends Epic_Controller_Action
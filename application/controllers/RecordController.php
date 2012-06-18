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
	public function viewAction() {
		$record = $this->getRecord();
	}
} // END class RecordController extends Epic_Controller_Action
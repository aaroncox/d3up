<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class AjaxController extends Epic_Controller_Action
{
	public function uploaditemAction() {
		$writer = new Zend_Log_Writer_Stream('/tmp/d3up-ajax');
		$logger = new Zend_Log($writer);

		$logger->info("-----------");
		foreach($this->getRequest()->getParams() as $k => $v) {
			$logger->info($k . ": " . $v);			
		}
		exit;
	}
} // END class AjaxController extends Epic_Controller_Action
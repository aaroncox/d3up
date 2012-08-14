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
		echo "<pre>"; var_dump($this->getRequest()->getParams()); exit;
	}
} // END class AjaxController extends Epic_Controller_Action
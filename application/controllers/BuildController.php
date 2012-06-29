<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class BuildController extends Epic_Controller_Action
{
	public function createAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {		
			// Create a new hero
			$build = Epic_Mongo::newDoc('build');
			// Get Form for hero
			$form = $this->view->form = $build->getEditForm();
			if($this->getRequest()->isPost()) {
				$result = $form->process($this->getRequest()->getParams());
				if($result) {
					$i = Epic_Mongo::db('build')->find($result['upserted']);
					$this->_redirect("/b/".$i->id);				
				}
			}
		} else {
			$this->_redirect("/user/builds");
		}
	}} // END class HeroController extends Epic_Controller_Action
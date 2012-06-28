<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class HeroController extends Epic_Controller_Action
{
	public function createAction() {
		$profile = Epic_Auth::getInstance()->getProfile();
		if($profile) {		
			// Create a new hero
			$hero = Epic_Mongo::newDoc('hero');
			// Get Form for hero
			$form = $this->view->form = $hero->getEditForm();
			if($this->getRequest()->isPost()) {
				$result = $form->process($this->getRequest()->getParams());
				if($result) {
					$i = Epic_Mongo::db('hero')->find($result['upserted']);
					$this->_redirect("/h/".$i->id);				
				}
			}
		} else {
			$this->_redirect("/user/heroes");
		}
	}} // END class HeroController extends Epic_Controller_Action
<?php
/**
 *  IndexController
 */
class IndexController extends Epic_Controller_Action {  
  public function indexAction()
  {
		$query = array(
		);
		$sort = array(
			'_created' => -1,
		);
		$items = Epic_Mongo::db('item')->fetchAll($query, $sort);	
		$paginator = Zend_Paginator::factory($items);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
		$this->view->items = $paginator;
		$heroes = Epic_Mongo::db('hero')->fetchAll($query, $sort);	
		$paginator = Zend_Paginator::factory($heroes);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
		$this->view->heroes = $paginator;
		$this->view->counts = array(
			'heroes' => count(Epic_Mongo::db("hero")->fetchAll()),
			'items' => count(Epic_Mongo::db("item")->fetchAll()),
		);
	}
}
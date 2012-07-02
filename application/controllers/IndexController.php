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
		$this->view->items = $items = Epic_Mongo::db('item')->fetchAll($query, $sort, 200);	
		$paginator = Zend_Paginator::factory($items);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
		$this->view->items = $paginator;
		$builds = Epic_Mongo::db('build')->fetchAll($query, $sort);	
		$paginator = Zend_Paginator::factory($builds);
		$paginator->setCurrentPageNumber($this->getRequest()->getParam('page', 1))->setItemCountPerPage(20);
		$this->view->builds = $paginator;
		$this->view->counts = array(
			'builds' => count(Epic_Mongo::db("build")->fetchAll()),
			'items' => count(Epic_Mongo::db("item")->fetchAll()),
		);
	}
}
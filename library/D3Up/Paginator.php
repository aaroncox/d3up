<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Paginator extends Zend_Paginator
{
	public function __construct($docs, $page = 1, $limit = 20) {
		parent::__construct(new D3Up_Paginator_Adapter_Iterator($docs));
		$this->setItemCountPerPage($limit);
		$this->setCurrentPageNumber($page);
	}
} // END class D3Up_Paginator extends Zend_Paginator
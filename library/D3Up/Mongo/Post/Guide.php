<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Post_Guide extends Epic_Mongo_Document_Post
{
	public $route = 'guide';	
	protected static $_documentType = 'guide';
	
	protected $_requirements = array(
		'author' => array('Document:D3Up_Mongo_User_Profile', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Post_Guide(array('guide' => $this));
	}
	
	public function save() {
		$filter = new Epic_Filter_Slug();
		$this->slug = $filter->filter($this->title);
		return parent::save();
	}
	
	public function viewCounter() {
		if(Epic_Mongo::db('view')->track($this, $_SERVER)) {
			$this->views++;
			$this->save();
		}
	}
	
}
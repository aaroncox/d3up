<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Post_Update extends Epic_Mongo_Document_Post
{
	public $route = 'update';	
	protected static $_documentType = 'update';
	
	protected $_requirements = array(
		'profile' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Post_Update(array('update' => $this));
	}
	
	public function getReplies() {
		$query = array(
			'replyTo' => $this->createReference(),
		);
		$sort = array(
			'_created' => -1,
		);
		return static::fetchAll($query, $sort);
	}
} // END class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
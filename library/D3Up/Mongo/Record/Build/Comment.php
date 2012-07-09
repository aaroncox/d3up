<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Build_Comment extends Epic_Mongo_Document_Record
{
	public $route = 'comment';	
	protected static $_documentType = 'comment';
	
	protected $_requirements = array(
		'profile' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
		'build' => array('Document:D3Up_Mongo_Record_Build', 'AsReference'),
		'replyTo' => array('Document:D3Up_Mongo_Record_Build_Comment', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Build_Comment(array('comment' => $this));
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
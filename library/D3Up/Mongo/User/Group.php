<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_User_Group extends Epic_Mongo_Document_User
{
	public $route = 'group';	
	protected static $_documentType = 'group';
	
	protected $_requirements = array(
		'owner' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
		'members' => array('DocumentSet:Epic_Mongo_DocumentSet'),
		'members.$' => array('Document:D3Up_Mongo_Record_Build', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_User_Group(array('group' => $this));
	}
	
} // END class D3Up_Mongo_User_Profile extends Epic_Mongo_User
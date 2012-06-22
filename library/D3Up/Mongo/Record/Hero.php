<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
{
	public $route = 'hero';	
	protected static $_documentType = 'hero';
	
	protected $_requirements = array(
		'equipment' => array('Document:D3Up_Mongo_Record_GearSet'),
		'_createdBy' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Hero(array('hero' => $this));
	}
} // END class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
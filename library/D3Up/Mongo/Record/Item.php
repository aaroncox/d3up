<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
{
	protected static $_documentType = 'item';
	
	public function getEditForm() {
		return new D3Up_Form_Record_Item(array('item' => $this));
	}
} // END class D3Up_Mongo_Record_Item extends Epic_Mongo_Document_Record
<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Post_Guide_Section extends Epic_Mongo_Document {
	protected $_requirements = array(
		'skills' => array('DocumentSet:D3Up_Mongo_Post_Guide_Sections'),
		'skills.$' => array('Document:D3Up_Mongo_Post_Guide_Section'),
		'passives' => array('DocumentSet:D3Up_Mongo_Post_Guide_Sections'),
		'passives.$' => array('Document:D3Up_Mongo_Post_Guide_Section'),
	);
	
}

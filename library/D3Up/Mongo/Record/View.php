<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_View extends Epic_Mongo_Document
{
	protected static $_collectionName = 'views';
	
	protected $_requirements = array(
		'object' => array('Document:Epic_Mongo_Document', 'AsReference'),
	);
	
	public function track($doc, $who) {
		$query = array(
			'object' => $doc->createReference(),
			'who' => $who['REMOTE_ADDR'],
			'when' => array('$gt' => time()), //00)
		);
		$exists = Epic_Mongo::db('view')->fetchOne($query);
		if(!$exists) {
			// Record Visit for 15 minutes
			$visit = Epic_Mongo::newDoc('view');
			$visit->object = $doc;
			$visit->who = $who['REMOTE_ADDR'];
			$visit->when = time() + 900;
			$visit->save();
			return true;
		} else {
			// Ignore visit
			return false;
		}
	}
} // END class D3Up_Mongo_Record_View extends Epic_Mongo_Document_Record
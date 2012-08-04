<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Vote extends Epic_Mongo_Document
{
	protected static $_collectionName = 'votes';
	
	protected $_requirements = array(
		'object' => array('Document:Epic_Mongo_Document', 'AsReference'),
		'who' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
	);
	
	public function check($doc, $who) {
		$query = array(
			'object' => $doc->createReference(),
			'who' => $who->createReference(),
		);
		$exists = Epic_Mongo::db('vote')->fetchOne($query);
		if($exists) {
			// echo "vote exists";
			return $exists->how;
		} else {
			// Ignore visit
			// echo "vote doesn't exist";
			return false;
		}
	}
	
	public function vote($doc, $who, $how = 'up') {
		$query = array(
			'object' => $doc->createReference(),
			'who' => $who->createReference(),
		);
		$exists = Epic_Mongo::db('vote')->fetchOne($query);
		if(!$exists) {
			// Record Vote
			// echo "New Vote";
			$vote = Epic_Mongo::newDoc('vote');
			$vote->object = $doc;
			$vote->who = $who;
			$vote->how = $how;
			$vote->when = time();
			$vote->save();
		} else {
			if($exists->how == $how) {
				// echo "Removing Vote";
				if($how == 'up') {
					// echo "Removing 1";
					$doc->votes--;					
				} else {
					// echo "Adding 1";
					$doc->votes++;
				}
				$exists->delete();			
				$doc->save();
				// Leave
				return;
			} else {
				echo "Swapping Vote";
				if($how == 'up') {
					// echo "Removing 1";
					$doc->votes++;					
				} else {
					// echo "Adding 1";
					$doc->votes--;
				}
				$exists->how = $how; 
				$exists->save();
			}
		}
		if($how == 'up') {
			// echo "Adding 1";
			$doc->votes++;					
		} else {
			// echo "Removing 1";
			$doc->votes--;
		}
		$doc->save();
	}
} // END class D3Up_Mongo_Record_Vote extends Epic_Mongo_Document_Record
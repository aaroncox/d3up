<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Record_Build extends Epic_Mongo_Document_Record
{
	public $route = 'build';	
	protected static $_documentType = 'build';
	
	protected $_requirements = array(
		'equipment' => array('Document:D3Up_Mongo_Record_GearSet'),
		'_createdBy' => array('Document:Epic_Mongo_Document_User', 'AsReference'),
		'_original' => array('Document:D3Up_Mongo_Record_Build', 'AsReference'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Record_Build(array('build' => $this));
	}
	
	public function viewCounter() {
		if(Epic_Mongo::db('view')->track($this, $_SERVER)) {
			$this->views++;
			$this->save();
		}
	}
	
	public function cleanExport() {
		$export = $this->export(); 
		$toRemove = array(
			'_id', 
			'_characterBt', 
			'_characterRg', 
			'_characterId', 
			'_created', 
			'_createdBy',
			'_defaultToDescription',
			'_lastCrawl',
		  '_twitchChannel',
		  '_twitchEnabled',
		  '_twitchLastCheck',
		  '_twitchLastSeen',
		  '_twitchOnline',
		  '_twitchUser',
		  '_type',
			'crawlCount',
			'equipment',
			'description',
			'descriptionSource',
			'equipmentCount',
			'private',
			'profileUrl',
			'views',
		);
		foreach($toRemove as $remove) {
			unset($export[$remove]);
		}
		return $export;
	}
} // END class D3Up_Mongo_Record_Hero extends Epic_Mongo_Document_Record
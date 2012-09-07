<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Post_Guide_Revision extends D3Up_Mongo_Post_Guide {
	public $route = 'revision';	
	protected static $_documentType = 'revision';
	
	protected $_requirements = array(
		'original' => array('Document:D3Up_Mongo_Post_Guide', 'AsReference'),
	);
	
	public function makeRevision($document) {
		$fields = array(
			'title',
			'author',
			'sections',
			'class',
			'description',
			'slug', 
			'topic',
			'_updated',
		);
		$this->original = $document;
		foreach($fields as $field) {
			$this->$field = $document->$field;
		}
		// $this->save();
	}
}

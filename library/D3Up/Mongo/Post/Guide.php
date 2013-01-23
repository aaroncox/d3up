<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Mongo_Post_Guide extends Epic_Mongo_Document_Post
{
	public $route = 'guide';	
	protected static $_documentType = 'guide';
	
	protected $_requirements = array(
		'author' => array('Document:D3Up_Mongo_User_Profile', 'AsReference'),
		'sections' => array('DocumentSet:D3Up_Mongo_Post_Guide_Sections'),
		'sections.$' => array('Document:D3Up_Mongo_Post_Guide_Section'),
	);
	
	public function getEditForm() {
		return new D3Up_Form_Post_Guide(array('guide' => $this));
	}
	
	public function save($entierDocument = false) {
		$filter = new Epic_Filter_Slug();
		$this->slug = $filter->filter($this->title);
		return parent::save($entierDocument = false);
	}
	
	public function viewCounter() {
		if(Epic_Mongo::db('view')->track($this, $_SERVER)) {
			$this->views++;
			$this->save();
		}
	}
	
	public function saveRevision() {
		$rev = Epic_Mongo::newDoc('revision');
		$rev->makeRevision($this);
	}
	
	public function setSections($sections) {
		// Save a Revision of the Guide
		$this->sections = new D3Up_Mongo_Post_Guide_Sections;
		// var_dump($sections); exit;
		$count = 0;
		foreach($sections as $section) {
			// Bad Data?
			if(!is_array($section)) {
				continue;
			}
			$doc = Epic_Mongo::newDoc('section');
			$doc->title = trim(strip_tags($section['title']));
			if($section['content'] == 'null') {
				$section['content'] = null;
			} else {
				$doc->content = trim(strip_tags($section['content'], '<p><a><img><div><li><i><b><sub><strike><sup><u><font><h1><h2><h3><h4><h5><h6><h7><ul><ol><br/><br><pre><span><strong><em><bold><blockquote>'));				
			}
			$doc->type = $section['type'];
			$doc->hidden = ($section['hidden'] == 'true') ? true : false;
			$doc->skills = null;
			$doc->passives = null;
			if($section['youtube'] && $section['youtube'] != null) {
				$doc->youtube = $section['youtube'];
			}
			if($section['skills'] && $section['skills'] != null) {
				$doc->skills = new D3Up_Mongo_Post_Guide_Sections;
				foreach($section['skills'] as $idx => $skill) {
					if(!$skill || $skill['skill'] == 'null' || $skill['skill'] == '') {
						continue;
					}
					$doc->skills[$idx] = new D3Up_Mongo_Post_Guide_Section;
					$doc->skills[$idx]->skill = $skill['skill'];
					if($skill['content'] == 'null') {
						$doc->skills[$idx]->content = null;
					} else {
						$doc->skills[$idx]->content = $skill['content'];	
					}
				}
			}
			// Append the new Doc into the Sections
			$this->sections[$count] = $doc;
			// var_dump($doc->export());
			$count++;
		}
		// var_dump($this->export());
		$this->save();
		$this->saveRevision();
		// var_dump($this->export()); 
		// exit;
		// var_dump($sections); exit;
	}
	
}
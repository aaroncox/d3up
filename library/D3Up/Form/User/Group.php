<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_User_Group extends Epic_Form
{
	protected $_group = null;

	public function getGroup()
	{
		if(!$this->_group) {
			throw new Exception("No group selected.");
		}
		return $this->_group;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setGroup($group)
	{
		$this->_group = $group;
		return $this;
	}

	/**
	 * init - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function init()
	{
		parent::init();

		$group = $this->getGroup();

		$this->addElement("text", "name", array(
			'required' => true,
			'label' => 'A name for the group',
			'description' => 'The name displayed on all builds that are members.',
			'validators' => array(
				array('StringLength', false, array(2, 50)),
			),
			'filters' => array('StripTags'),
			'value' => $group->name,
		));

		$this->addElement("markdown", "description", array(
			'required' => false,
			'label' => 'Group Description',
			'description' => 'A description of the group, feel free to add links/etc using Markdown syntax.',
			'filters' => array('StripTags'),
			'tabindex' => 30,
			'rows' => 10,
			'cols' => 40,
			'value' => $group->descriptionSource,
		));
		
		if($group->isNewDocument()) {
			$this->addElement("select", "builds", array(
				'label' => 'Add builds to group',
				'description' => 'Which of your builds should be added upon group creation?',
				'multiple' => 'multiple',
				'RegisterInArrayValidator' => false,
				// 'multiOptions' => $names,
			));

			$query = array(
				'_createdBy' => D3Up_Auth::getInstance()->getProfile()->createReference(),
			);
			$builds = Epic_Mongo::db('build')->fetchAll($query, array('paragon' => -1, 'level' => -1));
			$names = array();
			foreach($builds as $build) {
				$names[$build->id] = $build->name;
				$desc = "[L".($build->level?:0)."/P".($build->paragon?:0)."/] " . $build->name . " (".$build->class.")";
				$this->builds->addMultiOption($build->id, $desc);
			}			
		}
		
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$group = $this->getGroup();
		// Set the Display Name
		$group->name = $this->name->getValue();
		// Set the Description Block
		$group->description = $this->description->getRenderedValue();
		$group->descriptionSource = $this->description->getValue();
		// Do we need to intially add members?
		if($group->isNewDocument()) {
			foreach($this->builds->getValue() as $id) { 
				$build = Epic_Mongo::db('build')->fetchOne(array("id" => (int) $id));
				$group->members->addDocument($build);
			}			
		}
		// Group Owner
		$group->owner = D3Up_Auth::getInstance()->getProfile();
		// Return the Group
		return $group->save() + array('group' => $group);
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}
} // END class D3Up_Form_User_Group extends Epic_Form

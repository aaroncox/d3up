<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_User_Shop extends Epic_Form
{
	protected $_user = null;

	public function getUser()
	{
		if(!$this->_user) {
			throw new Exception("No user selected.");
		}
		return $this->_user;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setUser($user)
	{
		$this->_user = $user;
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
		$user = $this->getUser();
		
		$this->addElement("select", "region", array(
			'required' => true,
			'label' => 'Which region do you play in?',
			'description' => 'In order to sell goods, we need to know which region you play in.',
			'multiOptions' => array(
				null => 'Pick a Region',
				1 => 'The Americas',
				2 => 'Europe',
				3 => 'Asia',
			)
		));
		
		$this->setDefaults(array(
			'region' => $user->region,
		));
		
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$user = $this->getUser();
		// Set the Region of the User
		$user->region = $this->region->getValue();
		// Return the User
		return $user->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}
	public function render()
	{
		$this->removeDecorator('FloatClear');
		$this->getDecorator('HtmlTag')->setOption('class','r2-Record-form')->setOption('id', 'ad-edit');
		return parent::render();
	}
} // END class D3Up_Form_User_Shop
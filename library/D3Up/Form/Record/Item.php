<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Item extends Epic_Form
{
	protected $_item = null;

	public function getItem()
	{
		if (!$this->_item instanceOf Epic_Mongo_Document_Record) {
			$this->_item = Epic_Mongo::newDoc('item');			
		}
		return $this->_item;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setItem($item)
	{
		$this->_item = $item;
		return $this;
	}

	/**
	 * Checks if the document is new
	 *
	 * @return boolean
	 * @author Corey Frang
	 **/
	public function isNewRecord()
	{
		return ($this->_item) ? false : true;
	}

  public function __construct($options = null)
	{
		parent::__construct( $options );
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
		
		$this->addElement("text", "name", array(
			'order' => 75,
			'required' => true,
			'label' => 'Name',
		));

		$this->addElement("select", "type", array(
			'order' => 80,
			'required' => true,
			'label' => 'Type',
			'multiOptions' => array(
				'Armor',
				'Weapon'
			)
		));
		
		$this->setButtons(array("save" => "Save"));		
	}
	
	public function save() {

	}
	public function process($data) {
		if($this->isValid($data)) {
			$this->save();
			return true;
		}
		return false;
	}
	public function render()
	{
		$this->removeDecorator('FloatClear');
		$this->getDecorator('HtmlTag')->setOption('class','r2-Record-form')->setOption('id', 'ad-edit');
		return parent::render();
	}
} // END class D3Up_Form_Record_Item extends Epic_Form
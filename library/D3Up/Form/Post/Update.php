<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Post_Update extends Epic_Form
{
	protected $_update = null;

	public function getUpdate()
	{
		if (!$this->_update instanceOf Epic_Mongo_Document_Post) {
			$this->_update = Epic_Mongo::newDoc('update');			
		}
		return $this->_update;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setUpdate($update)
	{
		$this->_update = $update;
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
		
		$update = $this->getUpdate();
		
		$this->addElement("text", "version", array(
			'required' => true,
			'label' => 'Version',
			'value' => $update->version,
		));
		$this->addElement("markdown", "source", array(
			'required' => true,
			'class' => 'markDownEditor',
			'label' => 'Notes',
			'cols' => '50',
			'rows' => 5,
			'value' => $update->source,
		));
					
		$this->setButtons(array("save" => "Save"));		

	}
	
	public function save() {
		$update = $this->getUpdate();
		$update->version = $this->version->getValue();
		$update->source = $this->source->getValue();
		$update->body = $this->source->getRenderedValue();
		if($update->isNewDocument()) {
			$update->_created = time();
		} else {
			$update->_updated = time();
		}
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$update->profile = $profile;			
		}
		return $update->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		$this->removeElement("referrer");
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
} // END class D3Up_Form_Record_Guide_Guide extends Epic_Form
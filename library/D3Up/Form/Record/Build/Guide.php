<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Build_Guide extends Epic_Form
{
	protected $_build = null;

	public function getBuild()
	{
		if (!$this->_build instanceOf Epic_Mongo_Document_Record) {
			$this->_build = Epic_Mongo::newDoc('build');			
		}
		return $this->_build;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setBuild($build)
	{
		$this->_build = $build;
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
		
		$build = $this->getBuild();
				
		$this->addElement("markdown", "source", array(
			'required' => true,
			'class' => 'markDownEditor',
			'label' => 'Guide',
			'description' => '',
			'cols' => '50',
			'rows' => 10,
			'value' => $build->source,
		));
		
		$this->addElement("checkbox", "published", array(
			'label' => 'Publish to Everyone?',
			'value' => $build->guideIsPublished,
		));
		
		$this->setButtons(array("save" => "Update Guide"));		
	}
	
	public function save() {
		$build = $this->getBuild();
		$build->guide = $this->source->getRenderedValue();
		$build->source = $this->source->getValue();
		$build->guideIsPublished = (bool) $this->published->getValue();
		$build->save();
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
} // END class D3Up_Form_Record_Guide_Guide extends Epic_Form
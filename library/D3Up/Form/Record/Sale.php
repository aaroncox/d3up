<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Sale extends Epic_Form
{
	protected $_sale = null;

	public function getSale()
	{
		if (!$this->_sale instanceOf Epic_Mongo_Document_Record) {
			$this->_sale = Epic_Mongo::newDoc('sale');			
		}
		return $this->_sale;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setSale($sale)
	{
		$this->_sale = $sale;
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
		$sale = $this->getSale();
		
		$this->addElement("select", "method", array(
			'required' => true,
			'label' => 'Sales Method',
			'multiOptions' => array(
				'ah' => 'Gold AH'
			)
		));
		
		$this->addElement("text", "bid", array(
			'required' => true,
			'label' => 'Minimum Bid',
			'validators' => array(
				array(new D3Up_Validate_Double()),
			),
			'filters' => array('StripTags'),
		));
		
		$this->addElement("text", "buyout", array(
			'label' => 'Buyout',
			'validators' => array(
				array(new D3Up_Validate_Double()),
			),
			'filters' => array('StripTags'),
		));
		
		$this->addElement("text", "soldFor", array(
			'label' => 'How much did it sell for?',
			'description' => 'The amount you received on your Auction House "Completed" tab.',
			'validators' => array(
				array(new D3Up_Validate_Double()),
			),
			'filters' => array('StripTags'),
		));
		
		$this->setDefaults(array(
			'bid' => $sale->bid,
			'buyout' => $sale->buyout,
			'soldFor' => $sale->soldFor,
			'method' => $sale->method,
		));
		
		if($sale->isNewDocument()) {
			$this->setButtons(array("save" => "Create Sale"));					
		} else {
			$this->setButtons(array("save" => "Save"));		
		}

	}
	
	public function save() {
		$sale = $this->getSale();
		// Set the Bid
		$sale->bid = (int) $this->bid->getValue();
		$sale->buyout = (int) $this->buyout->getValue();
		$sale->method = $this->method->getValue();
		$sale->soldFor = $this->soldFor->getValue();
		// var_dump($sale); exit;
		// Return the Sale
		return $sale->save();
	}
	
	protected $_allData = array();
	public function process($data) {
		if($this->isValid($data)) {
			$this->_allData = $data;
			return $saved = $this->save();
		}
		return false;
	}
} // END class D3Up_Form_Record_Sale extends Epic_Form
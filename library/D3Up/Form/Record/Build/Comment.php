<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Form_Record_Build_Comment extends Epic_Form
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
	
	protected $_comment = null;

	public function getComment()
	{
		if (!$this->_comment instanceOf Epic_Mongo_Document_Record) {
			$this->_comment = Epic_Mongo::newDoc('comment');			
		}
		return $this->_comment;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setComment($comment)
	{
		$this->_comment = $comment;
		return $this;
	}
	
	protected $_replyTo = null;

	public function getReplyTo()
	{
		if (!$this->_comment instanceOf Epic_Mongo_Document_Record) {
			$this->_replyTo = Epic_Mongo::newDoc('comment');			
		}
		return $this->_replyTo;
	}

	/**
	 * setRecord($Record) - undocumented function
	 *
	 * @return void
	 * @author Aaron Cox <aaronc@fmanet.org>
	 **/
	public function setReplyTo($replyTo)
	{
		$this->_replyTo = $replyTo;
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
		
		$comment = $this->getComment();
		
		$this->addElement("markdown", "source", array(
			'required' => true,
			'class' => 'markDownEditor',
			'label' => 'Leave a Comment',
			'description' => '',
			'cols' => '50',
			'rows' => 5,
			'value' => $comment->source,
		));
	
		$this->addElement("hidden", "replyTo");
		if($replyTo = $this->getReplyTo()) {
			$this->replyTo->setValue($replyTo->id);
		}
				
		$this->setButtons(array("save" => "Comment"));		

	}
	
	public function save() {
		$build = $this->getBuild();
		$comment = Epic_Mongo::newDoc('comment');
		$comment->source = $this->source->getValue();
		$comment->body = $this->source->getRenderedValue();
		if($comment->isNewDocument()) {
			$comment->_created = time();
		} else {
			$comment->_updated = time();
		}
		if($profile = Epic_Auth::getInstance()->getProfile()) {
			$comment->profile = $profile;			
		}
		if($this->replyTo && $replyToID = $this->replyTo->getValue()) {
			$this->setReplyTo(Epic_Mongo::db('comment')->fetchOne(array('id' => (int) $replyToID)));
		}
		if($replyTo = $this->getReplyTo()) {
			$comment->replyTo = $replyTo;
		} else {
			$comment->build = $build;
		}
		return $comment->save();
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
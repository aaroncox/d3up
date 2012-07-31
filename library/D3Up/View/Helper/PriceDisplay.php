<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_View_Helper_PriceDisplay extends Zend_View_Helper_Abstract
{
	protected $_icons = array(
		'ah' => 'goldcoin.png',
		'rmah' => 'rmah.png',
	);
	public $pretty = null;
	function priceDisplay($sale, $type = 'asking') {
		$this->pretty = new D3Up_View_Helper_PrettyStat();
		return $this->$type($sale);
	}
	function buyout($sale) {
		$html = "<img src='/images/".$this->_icons[$sale->method]."'> ".$this->pretty->prettyStat($sale->buyout);
		return $html; 
	}
	function bid($sale) {
		$html = "<img src='/images/".$this->_icons[$sale->method]."'> ".$this->pretty->prettyStat($sale->bid);
		return $html; 
	}
	function soldFor($sale) {
		$soldFor = 0;
		switch($sale->method) {
			case "ah":
				$soldFor = $this->pretty->prettyStat($sale->soldFor / 0.85);
				break;
			case "rmah":
				$soldFor = $this->pretty->prettyStat($sale->soldFor + 1);
				break;
		}
		$html = "<div class='item-stat'>";
		$html .= "<span class='value'><img src='/images/".$this->_icons[$sale->method]."'> ".$soldFor."</span>";
		$html .= "<span class='stat'>".$this->pretty->prettyStat($sale->soldFor)." after AH Cut</span>";
		$html .= "</div>";
		// var_dump($html); exit;
		return $html;
		/* <div class='item-stat'>
			<? if($sale->method == 'ah'): ?>
				<span class='value'>
					<img src="/images/goldcoin.png"> <?= $this->prettyStat($sale->soldFor / 0.85) ?>
				</span>
				<span class="stat">
					<?= $this->prettyStat($sale->soldFor) ?> after AH cut
				</span>
			<? else: ?>
			<? endif ?>
		</div> */
	}
	function asking($sale) {
		$html = "";
		$html .= "<img src='/images/".$this->_icons[$sale->method]."'> ";
		switch($sale->method) {
			case "rmah":
			case "ah":
				$html .= $this->pretty->prettyStat($sale->buyout);
				$html .= "(Bid: ".$this->pretty->prettyStat($sale->bid).")";
				break;
		}
		return $html;
	}
} // END class D3Up_View_Helper_SoldFor extends Zend_View_Helper_Abstract
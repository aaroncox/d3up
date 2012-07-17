<?php
/**
 * Momentum Workshop
 *
 * @author Corey Frang
 * @category MW
 * @package MW_View
 * @subpackage Helper
 * @copyright Copyright (c) 2009 Momentum Workshop, Inc
 */

/**
 *  MW_View_Helper_TimeAgo
 *
 * undocumented
 *
 * @author Corey Frang
 * @category MW
 * @package MW_View
 * @subpackage Helper
 * @copyright Copyright (c) 2009 Momentum Workshop, Inc
 * @version $Id: TimeAgo.php 370 2010-05-04 18:39:21Z puppet $
 */
class Epic_View_Helper_TimeAgo extends Zend_View_Helper_Abstract {
  
  protected $_now = null;
  public function getNow()
  {
    if (!$this->_now) $this->_now = new Zend_Date();
    return $this->_now;
  }
  
  public function wrapTitle(Zend_Date $date, $text)
  {
    $title = $date->toString(Zend_Date::W3C);
    return "<span title=\"".$this->view->escape($title)."\" class='timeAgo'>".$text."</span>";
  }
  
  public function timeAgo($date)
  {
    if (is_numeric($date)) $date = new Zend_Date($date, Zend_Date::TIMESTAMP);
    if ($date instanceOf Zend_Date)
    {
      $date->setLocale('en_US');
      $now = $this->getNow();
      $diff = $now->getTimestamp() - $date->getTimestamp();
      $direction = 'ago';
      if ($diff < 0)
      {
        // date in future
        $diff = abs($diff);
        $direction = '';
      }
      if ($diff < 60)
      {
        return $this->wrapTitle($date, $diff."s ".$direction);
      }
      $diff = floor($diff/60);
      
      if ($diff < 60)
      {
        return $this->wrapTitle($date, $diff."m ".$direction);
      }
      $diff = floor($diff/60);
      if ($diff < 24)
      {
        return $this->wrapTitle($date, $diff."h ".$direction);
      }
			
			$remain = $diff;
      $diff = floor($diff/24);
      $remain = $remain - ($diff * 24);
      if ($diff < 15)
      {
        return $this->wrapTitle($date, $diff."d ".$remain."h".$direction);
      }
      if ($date->get(Zend_Date::YEAR) != $now->get(Zend_Date::YEAR))
        $formatString = Zend_Date::MONTH_NAME_SHORT." ".Zend_Date::DAY_SHORT." ".Zend_Date::YEAR." ".Zend_Date::TIME_SHORT;
      else
        $formatString = Zend_Date::MONTH_NAME_SHORT." ".Zend_Date::DAY_SHORT." ".Zend_Date::TIME_SHORT;
      return $this->wrapTitle($date, $date->toString($formatString));
      
    }
  }
}

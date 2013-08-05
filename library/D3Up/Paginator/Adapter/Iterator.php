<?php
/**
 * undocumented class
 *
 * @package default
 * @author Aaron Cox
 **/
class D3Up_Paginator_Adapter_Iterator implements Zend_Paginator_Adapter_Interface
{
  /**
   * Iterator which implements Countable
   *
   * @var Iterator
   */
  protected $_iterator = null;

  /**
   * Item count
   *
   * @var integer
   */
  protected $_count = null;

  /**
   * Constructor.
   *
   * @param  Iterator $iterator Iterator to paginate
   * @throws Zend_Paginator_Exception
   */
  public function __construct(Iterator $iterator)
  {
      if (!$iterator instanceof Countable) {
          /**
           * @see Zend_Paginator_Exception
           */
          require_once 'Zend/Paginator/Exception.php';

          throw new Zend_Paginator_Exception('Iterator must implement Countable');
      }

      $this->_iterator = $iterator;

			$frontendOptions = array(
			   'lifetime' => 7200, // cache lifetime of 2 hours
			   'automatic_serialization' => true
			);

			$backendOptions = array(
			    'cache_dir' => '/tmp/' // Directory where to put the cache files
			);

			// getting a Zend_Cache_Core object
			$cache = Zend_Cache::factory('Core',
			                             'File',
			                             $frontendOptions,
			                             $backendOptions);
			$name = "zend_cache_count_".$iterator->getCollection();
			if(($result = $cache->load($name)) == null) {
				$count = $iterator->count();
				$cache->save($count, $name);
				$this->_count = $count;
			} else {
				$this->_count = $cache->load($name);
			}

  }

  /**
   * Returns an iterator of items for a page, or an empty array.
   *
   * @param  integer $offset Page offset
   * @param  integer $itemCountPerPage Number of items per page
   * @return LimitIterator|array
   */
  public function getItems($offset, $itemCountPerPage)
  {
      if ($this->_count == 0) {
          return array();
      }

      // @link http://bugs.php.net/bug.php?id=49906 | ZF-8084
      // return new LimitIterator($this->_iterator, $offset, $itemCountPerPage);
      return new Zend_Paginator_SerializableLimitIterator($this->_iterator, $offset, $itemCountPerPage);
  }

  /**
   * Returns the total number of rows in the collection.
   *
   * @return integer
   */
  public function count()
  {
      return $this->_count;
  }

} // END class D3Up_Paginator_Adapter_Iterator extends Zend_Paginator_Adapter_Iterator
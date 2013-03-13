<?php

class Bootstrap extends Epic_Application_Bootstrap
{
  public function _initApplication()
  {
		if(APPLICATION_ENV == "production") {
			// Setup plugin loader
			$classFileIncCache = APPLICATION_PATH . '/../cache/pluginLoaderCache.php';
	    if (file_exists($classFileIncCache)) {
	        include_once $classFileIncCache;
	    }
			Zend_Loader_PluginLoader::setIncludeFileCache($classFileIncCache);			
		}

		// ini_set('session.gc_maxlifetime', 2592000);
		// 	  ini_set('session.cookie_lifetime', 25920000);
    $this->bootstrap(array('mongo','view')); 
		if(APPLICATION_ENV != "production") {
			$logger = new Zend_Log();
			$writer = new Zend_Log_Writer_Firebug();
			$logger->addWriter($writer);
			Zend_Registry::set('logger',$logger);
		} 	
  }

}

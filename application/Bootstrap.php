<?php

class Bootstrap extends Epic_Application_Bootstrap
{
  public function _initApplication()
  {
    $this->bootstrap(array('mongo','view')); 
		if(APPLICATION_ENV != "production") {
			$logger = new Zend_Log();
			$writer = new Zend_Log_Writer_Firebug();
			$logger->addWriter($writer);
			Zend_Registry::set('logger',$logger);
		} 	
		if(APPLICATION_ENV == "production") {
			$classFileIncCache = APPLICATION_PATH . '/../cache/pluginLoaderCache.php';
	    if (file_exists($classFileIncCache)) {
	        include_once $classFileIncCache;
	    }
			Zend_Loader_PluginLoader::setIncludeFileCache($classFileIncCache);			
		}
  }

}

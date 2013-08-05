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

	protected function _initCache() {
		$dir = "/tmp/d3up-pages";
		$frontendOptions = array(
			'lifetime' => 3600,
			// 'content_type_memorization' => true,
			'default_options'           => array(
				'cache' => true,
				'cache_with_get_variables' => true,
				'cache_with_cookie_variables' => true,
        'make_id_with_cookie_variables' => false,
			// 	'cache_with_post_variables' => true,
			// 	'cache_with_session_variables' => true,
			// 	'cache_with_cookie_variables' => true,
			),
			'regexps' => array(
				// cache the whole IndexController
				// '^/.*' => array('cache' => true),
				'^/build*' => array('cache' => true),
				// place more controller links here to cache them
			)
		);
		$backendOptions = array(
			'cache_dir' =>$dir
		);
		$cache = Zend_Cache::factory(
			'Page',
			'File',
			$frontendOptions,
			$backendOptions
		);
		$cache->start();
	}

}

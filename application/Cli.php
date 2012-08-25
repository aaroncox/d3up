<?php
require_once("Bootstrap.php");

class Cli extends Bootstrap
{
  public function _initCLI()
  {
    try {
      $opts = new Zend_Console_Getopt(array(
         'controller|c=s' => 'Controller - default: cli',
         'action|a=s' => 'Action to perform - default: index',  
         'verbose|v' => 'Verbose messages will be dumped to the default output.',  
         'development|d' => 'Enables development mode.',          
        ));
      $opts->parse();      
    } catch (Zend_Console_Getopt_Exception $e) {
      exit($e->getMessage() ."\n\n". $e->getUsageMessage());  
    }
    if (isset($opts->h))
    {
      echo $opts->getUsageMessage();
      exit;
    }
    if (!isset($opts->a))
    {
      $opts->a = 'index';      
    }
    if (!isset($opts->c))
    {
      $opts->c = 'cli';      
    }
    $this->bootstrap('frontcontroller','auth');
    
    // Epic_Auth::getInstance()->setCliOverride(true);
    
    $front = $this->getResource('frontcontroller');

    $request = new Zend_Controller_Request_Simple($opts->a, $opts->c, $opts->m);
    
    $front->setRequest($request);
    
    $front->setRouter(new Epic_Controller_Router_Cli());
    $front->setResponse(new Zend_Controller_Response_Cli());
    $front->setParam('disableOutputBuffering', true);
    
    $front->throwExceptions(true);
  }
  
  // override 
  public function _initIPAuth()
  {
    
  }
}

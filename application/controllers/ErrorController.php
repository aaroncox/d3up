<?php
/**
 * ErrorController
 **/
class ErrorController extends Epic_Controller_Action 
{
  /**
   * errorAction() is the action that will be called by the "ErrorHandler" 
   * plugin.  When an error/exception has been encountered
   * in a ZF MVC application (assuming the ErrorHandler has not been disabled
   * in your bootstrap) - the Errorhandler will set the next dispatchable 
   * action to come here.  This is the "default" module, "error" controller, 
   * specifically, the "error" action.  These options are configurable. 
   * 
   * @see http://framework.zend.com/manual/en/zend.controller.plugins.html
   *
   * @return void
   */
  public function errorAction() 
  { 
      // Ensure the default view suffix is used so we always return good 
      // content
      $this->_helper->viewRenderer->setViewSuffix('phtml');
      // $this->view->layout()->disableLayout();

      // Grab the error object from the request
      $errors = $this->_getParam('error_handler'); 
      
      if ($this->getRequest()->getParam('format') == 'json-form') {
        # code...
      }

      if ($errors->exception instanceOf MW_Auth_Exception)
      {
        $this->getResponse()->setHttpResponseCode(403);
        $this->view->message = $errors->exception->getMessage();
        $this->_request->setParam('referrer', $this->_request->getServer('REQUEST_URI'));
        if (!MW_Auth::getInstance()->getUser()) 
        {
          $this->_request->setParam('action', 'login');

          $router = $this->getFrontController()->getRouter();

          $auth = $router->getRoute('mw_auth_user');
          $routeDefs = $auth->getDefaults();
          return $this->_forward('login', $routeDefs['controller'], $routeDefs['module']);
          
        }
      }
      
      // $errors will be an object set as a parameter of the request object, 
      // type is a property
      switch ($errors->type) { 
          case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER: 
          case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION: 

              // 404 error -- controller or action not found 
              $this->getResponse()->setHttpResponseCode(404); 
              $this->view->message = 'Page not found'; 
              break; 
          default: 
              // application error 
              $this->getResponse()->setHttpResponseCode(500); 
              $this->view->message = 'Application error'; 
              break; 
      } 
      
      if ($errors->exception instanceOf MW_Controller_404Exception)
      {
        $this->getResponse()->setHttpResponseCode(404);
        $this->view->message = $errors->exception->getMessage();
      }

      // pass the environment to the view script so we can conditionally 
      // display more/less information
      $this->view->env       = APPLICATION_ENV; 
      
      // pass the actual exception object to the view
      $this->view->exception = $errors->exception; 
      
      // pass the request to the view
      $this->view->request   = $errors->request; 
  } 
} // END class ErrorController
<?php
class Router {
    private $routes = [];

    public function addRoute($path, $handler) {
        $this->routes[$path] = $handler;
    }

    public function dispatch($path) {
        if (array_key_exists($path, $this->routes)) {
            $handler = $this->routes[$path];
            $this->callHandler($handler);
        } else {
            $this->notFound();
        }
    }

    private function callHandler($handler) {
        list($controller, $action) = explode('@', $handler);

        require_once 'controllers/' . $controller . '.php';
        $controllerInstance = new $controller();
           // Get query parameters from the URL
           $params = $_GET;
           
        $controllerInstance->$action($params);
    }

    private function notFound() {
        header('HTTP/1.0 404 Not Found');
        echo '404 Not Found';
    }
}
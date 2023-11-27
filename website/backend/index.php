<?php
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'Router.php';

$router = new Router();


$router->addRoute('/', 'HomeController@index');
$router->addRoute('/getAllCategories', 'CategoryController@getAllCategories');
$router->addRoute('/getAllProducts', 'ProductController@getAllProducts');
$router->addRoute('/getFilterProducts', 'ProductController@filterProducts');
$router->addRoute('/getProductDetails', 'ProductController@ProductDetails');


// Get the requested path from the URL
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Dispatch the request to the appropriate controller
$router->dispatch($path);
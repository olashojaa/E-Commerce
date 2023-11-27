<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->options('(:any)','options_handler');

$routes->group('api', ['namespace' => 'App\Controllers'], function ($routes) {
    $routes->post('login', 'AuthController::login');
    $routes->post('logout', 'AuthController::logout');
    $routes->group('',['filter' => 'authenticateRequest'], function ($routes) {

    $routes->resource('roles');
    $routes->resource('permissions');
    $routes->resource('categories');
    $routes->resource('products');
    $routes->resource('users');
    $routes->resource('carousel');
    $routes->post('products/(:num)', 'Products::update/$1');
    $routes->post('carousel/(:num)', 'Carousel::update/$1');

    });
});

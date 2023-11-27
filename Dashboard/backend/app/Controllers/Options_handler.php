<?php 
namespace App\Controllers;

class Options_handler extends BaseController {
    public function index() {
        // Respond to the preflight request
        $this->response->setJSON('')->setStatusCode(200);
    }
}
<?php
require_once 'models/ProductModel.php';
require_once 'views/JsonView.php';

class ProductController {

    private $ProductModel;


    public function __construct() {

        $this->ProductModel = new ProductModel();
    }

    public function getAllProducts() {
        $products = $this->ProductModel->getAllProducts( );
        JsonView::render($products);
    }
   
    public function filterProducts($params) {
       
        // Validate and sanitize user input
        $categories_id = isset($params['checkedcategories']) ? $params['checkedcategories'] : null;
        $searchQuery = isset($params['searchQuery']) ? $this->validateString($params['searchQuery']) : null;
        $minPrice = isset($params['minPrice']) ? $this->validateNumeric($params['minPrice']) : null;
        $maxPrice = isset($params['maxPrice']) ? $this->validateNumeric($params['maxPrice']) : null;
        $sortByName = isset($params['sortByName']) ? $this->validatesort($params['sortByName']) : null;

        $filteredProducts = $this->ProductModel->filterProducts($searchQuery,$categories_id, $minPrice, $maxPrice,$sortByName);

        JsonView::render($filteredProducts);
    }

    public function ProductDetails($params) {
        // Validate and sanitize user input
        $id = isset($params['id']) ? $this->validateNumeric($params['id']) : null;
        
        $productDetails = $this->ProductModel->getProductDeatails($id);
        JsonView::render($productDetails);
}

    private function validateNumeric($num) {
        //check if $num is numeric
        return is_numeric($num) ? $num : null;
    }

    private function validateString ($str) {
        
        return is_string($str) ? $str : null;
    }


    private function validatesort($sort) {

        $allowedvalue = ["ASC", "DESC"]; 
        return in_array($sort, $allowedvalue)?$sort : null;
    }
}
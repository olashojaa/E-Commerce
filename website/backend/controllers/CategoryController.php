<?php
require_once 'models/CategoryModel.php';
require_once 'views/JsonView.php';

class CategoryController {
    private $CategoryModel;

    public function __construct() {
        $this->CategoryModel = new CategoryModel();
    }

    public function getAllCategories() {
        $categories = $this->CategoryModel->getAllCategories();
        JsonView::render($categories);

    }
}

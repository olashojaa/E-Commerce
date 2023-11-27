<?php

require_once './Database.php';
require_once 'models/ProductModel.php';

class CategoryModel {

    private $connection;

    public function __construct() {
        $db = Database::getInstance();
        $this->connection=$db->getConnection();
    }

    public function getAllCategories() {
       
        $stmt = $this->connection->prepare("SELECT id,name FROM categories");
        $stmt->execute();
        $result = $stmt->get_result();

        $categories = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
        }
        return $categories;
    }

    public function getTopCategoriesWithTopProducts() {
        $topCategories = $this->getTopCategories();

        foreach ($topCategories as &$category) {
            $categoryId = $category['id'];
            $topProducts = $this->getTopProductsInCategory($categoryId);
            $category['top_products'] = $topProducts;
        }

        return $topCategories;
    }

    private function getTopProductsInCategory($categoryId) {

        $stmt = $this->connection->prepare("SELECT * FROM products where category_id=$categoryId and products.is_top=1 order by price limit 5");
        $stmt->execute();
        $result = $stmt->get_result();
    
        $topProducts = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $topProducts[] = $row;
            }
            $result->free(); // Free the result set
        }

        return $topProducts;
    }

//get top category from admin
    public  function getTopCategories() {

        $stmt = $this->connection->prepare("SELECT id,name FROM categories where is_top=1 limit 5");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $categories = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
        }

        return $categories;
    }
}
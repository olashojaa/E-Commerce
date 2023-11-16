<?php

require_once './Database.php';

class ProductModel {
    private $connection;

    public function __construct() {
        $db = Database::getInstance();
        $this->connection=$db->getConnection();
    }

    public function getAllProducts() {

        $stmt = $this->connection->prepare("SELECT * FROM products");
        $stmt->execute();
        $result = $stmt->get_result();

        $products = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }

        return $products;
    }

    //get top products from admin
    public function getTopProducts() {

        $stmt = $this->connection->prepare("SELECT * FROM products where is_top=1");
        $stmt->execute();
        $result = $stmt->get_result();
        
        $products = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }

        return $products;
    }

    public function getProductDeatails($id) {

        $stmt = $this->connection->prepare("SELECT * FROM products where id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $products = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }

        return $products;
    }

    public function filterProducts($category_id, $minPrice, $maxPrice,$sortByName) {
        $query = "SELECT * FROM products WHERE 1";

        if ($category_id) {
            // If a category is specified, add it to the query
            $query .= " AND category_id = '$category_id'";
        }

        if ($minPrice !== null) {
            // If a minimum price is specified, add it to the query
            $query .= " AND price >= $minPrice";
        }

        if ($maxPrice !== null) {
            // If a maximum price is specified, add it to the query
            $query .= " AND price <= $maxPrice";
        }

         // Add sorting if requested
         if ($sortByName!== null) {
            $query .= " ORDER BY name ".$sortByName;
        }
        
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $products = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
        }

        return $products;
    }

   
}
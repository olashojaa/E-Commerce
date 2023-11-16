<?php

require_once './Database.php';

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
//get top category from admin
    public  function getTopCategories() {

        $stmt = $this->connection->prepare("SELECT id,name FROM categories where is_top=1");
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
<?php

require_once './Database.php';

class CarouselModel {
    private $connection;

    public function __construct() {
        $db = Database::getInstance();
        $this->connection=$db->getConnection();
    }

    public function getCarousel() {

        $stmt = $this->connection->prepare("SELECT p.id as product_id,c.Img FROM carousels c join products p on c.product_id=p.id");
        $stmt->execute();
        $result = $stmt->get_result();

        $carousel = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $carousel[] = $row;
            }
        }

        return $carousel;
    }

}
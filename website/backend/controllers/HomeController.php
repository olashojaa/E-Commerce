<?php
require_once 'models/CategoryModel.php';
require_once 'models/CarouselModel.php';
require_once 'models/ProductModel.php';
require_once 'views/JsonView.php';

class HomeController {
    private $CategoryModel;
    private $ProductModel;
    private $CarouselModel;

    public function __construct() {
        $this->CategoryModel = new CategoryModel();
        $this->ProductModel = new ProductModel();
        $this->CarouselModel = new CarouselModel();
    }

    public function index() {
      

        $result=[];

        $topCategories = $this->CategoryModel->getTopCategories();
        $result['topCategories']=$topCategories;

        $topProducts = $this->ProductModel->getTopProducts();
        $result['topProducts']=$topProducts;

        $carousel = $this->CarouselModel->getCarousel();
        $result['carousel']=$carousel;

        JsonView::render($result);

    }
}
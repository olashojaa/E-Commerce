<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use App\Models\CarouselModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;

class Products extends BaseController
{
    protected $productModel;
    protected $carouselModel;
    public function __construct()
    {
        $this->productModel = new ProductModel();
        $this->carouselModel = new CarouselModel();
    }

    // Get all products
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_ProductListComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);


        $products = $this->productModel->findAll();
        
        return $this->response->setJSON($products);
    }

    // Get a single product by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_ProductUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $product = $this->productModel->find($id);

        if ($product === null) {
            return $this->response->setJSON(['error' => 'Product not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($product);
    }

    // Create a new product
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_ProductAddComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

 // Load the upload library
 $upload = $this->request->getFile('img');

 // Check if the file is valid
 if ($upload->isValid() && !$upload->hasMoved())
 {
  
     // Set the file name and move it to the uploads directory
     $newName = $upload->getRandomName();
     
     $upload->move(ROOTPATH . 'public/uploads', $newName);
     
     // Perform additional actions if needed, e.g., store the file name in the database
$path=base_url('uploads/'. $newName);
 }
 
$data = $this->request->getPost();
$data['Img']=$path;

        if ($this->productModel->insert($data)) {
            return $this->response->setJSON(['message' => 'Product created successfully']);
        } else {
            return $this->response->setJSON($this->productModel->errors())->setStatusCode(404);
        }
    }

    // Update a product by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_ProductUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getPost();
        if($this->request->getFile('img'))
        {
        $upload = $this->request->getFile('img');

        // Check if the file is valid
        if ($upload->isValid() && !$upload->hasMoved())
        {
         
            // Set the file name and move it to the uploads directory
            $newName = $upload->getRandomName();
            
            $upload->move(ROOTPATH . 'public/uploads', $newName);
            
            // Perform additional actions if needed, e.g., store the file name in the database
       $path=base_url('uploads/'. $newName);
       $data['Img']=$path;
        }
    }
     

        if ($this->productModel->update($id, $data)) {
            return $this->response->setJSON(['message' => 'Product updated successfully']);
        } else {
            return $this->response->setJSON($this->productModel->errors())->setStatusCode(404);
        }
    }

    // Delete a product by ID
    public function delete($id): ResponseInterface
    {
        $product = $this->productModel->find($id);

        if ($product) {
            // Delete carousels associated with the post
            $this->carouselModel->where('product_id',$id)->delete();

            // Delete the post itself
            $this->productModel->delete($id);
            // Return a success message or redirect to a success page
            return $this->response->setJSON(['status' => 'success', 'message' => 'Product deleted successfully']);
        } else {
            // Return an error message or redirect to an error page
            return $this->response->setJSON(['status' => 'error', 'message' => 'Product not found']);
        }

    }
}

<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\CarouselModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
class Carousel extends BaseController
{    
    protected $carouselModel;
    public function __construct()
    {
        $this->carouselModel = new CarouselModel();
    }

    // Get all carousels
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_CarouselListComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);


        $carousels = $this->carouselModel->findAll();
        
        return $this->response->setJSON($carousels);
    }

    // Get a single carousel by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_CarouselUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $carousel = $this->carouselModel->find($id);

        if ($carousel === null) {
            return $this->response->setJSON(['error' => 'Carousel not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($carousel);
    }

    // Create a new carousel
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_CarouselAddComponent'))
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

        if ($this->carouselModel->insert($data)) {
            return $this->response->setJSON(['message' => 'Carousel created successfully']);
        } else {
            return $this->response->setJSON($this->carouselModel->errors())->setStatusCode(404);
        }
    }

    // Update a carousel by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_CarouselUpdateComponent'))
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
     
    
        if ($this->carouselModel->update($id, $data)) {
            return $this->response->setJSON(['message' => 'Carousel updated successfully']);
        } else {
            return $this->response->setJSON($this->carouselModel->errors())->setStatusCode(404);
        }
    }

    // Delete a carousel by ID
    public function delete($id): ResponseInterface
    {
        $carousel = $this->carouselModel->find($id);

        if ($carousel) {
            // Delete the post itself
            $this->carouselModel->delete($id);
            // Return a success message or redirect to a success page
            return $this->response->setJSON(['status' => 'success', 'message' => 'Carousel deleted successfully']);
        } else {
            // Return an error message or redirect to an error page
            return $this->response->setJSON(['status' => 'error', 'message' => 'Carousel not found']);
        }

    }
    }


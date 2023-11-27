<?php


namespace App\Controllers;

use App\Models\CategoryModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;

class Categories extends BaseController
{
    protected $categoryModel;

    public function __construct()
    {
        $this->categoryModel = new CategoryModel();
    }

    // Get all categories
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_CategoryListComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $categories = $this->categoryModel->findAll();
        
        return $this->response->setJSON($categories);


    }

    // Get a single category by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_CategoryUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $category = $this->categoryModel->find($id);
if($category['is_top']==1)
$category['is_top']=true;
else
$category['is_top']=false;
        if ($category === null) {
            return $this->response->setJSON(['error' => 'Category not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($category);
    }

    // Create a new category
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_CategoryAddComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);

        if ($this->categoryModel->insert($data)) {
            return $this->response->setJSON(['message' => 'Category created successfully']);
        } else {
            return $this->response->setJSON($this->categoryModel->errors())->setStatusCode(404);
        }
    }

    // Update a category by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_CategoryUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);

        if ($this->categoryModel->update($id, $data)) {
            return $this->response->setJSON(['message' => 'Category updated successfully']);
        } else {
            return $this->response->setJSON($this->categoryModel->errors())->setStatusCode(404);
        }
    }

    // Delete a category by ID
    public function delete($id): ResponseInterface
    {
        if ($this->categoryModel->delete($id)) {
            return $this->response->setJSON(['message' => 'Category deleted successfully']);
        } else {
            return $this->response->setJSON($this->categoryModel->errors())->setStatusCode(404);
        }
    }
}
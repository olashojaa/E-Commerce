<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\PermissionModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;

class Permissions extends BaseController
{
    
    protected $permissionModel;

    public function __construct()
    {
        $this->permissionModel = new PermissionModel();
    }

    // Get all permissions
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_PermissionListComponent'))
         return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);
        
        $permissions = $this->permissionModel->findAll();
        
        return $this->response->setJSON($permissions);
    }

    // Get a single permission by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_PermissionUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $permission = $this->permissionModel->find($id);
        
        if ($permission === null) {
            return $this->response->setJSON(['error' => 'Permission not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($permission);
    }

    // Create a new permission
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_PermissionAddComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);
        
        $data = $this->request->getJSON(true);

        if ($this->permissionModel->insert($data)) {
            return $this->response->setJSON(['message' => 'Permission created successfully']);
        } else {
            return $this->response->setJSON($this->permissionModel->errors())->setStatusCode(404);
        }
    }

    // Update a permission by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_PermissionUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);
        if ($this->permissionModel->update($id, $data)) {
            return $this->response->setJSON(['message' => 'Permission updated successfully']);
        } else {
            return $this->response->setJSON($this->permissionModel->errors())->setStatusCode(404);
        }
    }

    // Delete a permission by ID
    public function delete($id): ResponseInterface
    {
        if ($this->permissionModel->delete($id)) {
            return $this->response->setJSON(['message' => 'Permission deleted successfully']);
        } else {
            return $this->response->setJSON($this->permissionModel->errors())->setStatusCode(404);
        }
    }
}

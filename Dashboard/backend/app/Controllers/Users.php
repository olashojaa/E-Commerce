<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;

class Users extends BaseController
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    // Get all users
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_AdminListComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $users = $this->userModel->join('roles','roles.id=users.role_id')->select('users.*,roles.name as role')->findAll();
        
        return $this->response->setJSON($users);
    }

    // Get a single user by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_AdminUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $user = $this->userModel->find($id);
        
        if ($user === null) {
            return $this->response->setJSON(['error' => 'User not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($user);
    }

    // Create a new user
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_AdminAddComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        if ($this->userModel->insert($data)) {
            return $this->response->setJSON(['message' => 'User created successfully']);
        } else {
            return $this->response->setJSON($this->userModel->errors())->setStatusCode(404);
        }
    }

    // Update a user by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_AdminUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);

        if ($this->userModel->update($id, $data)) {
            return $this->response->setJSON(['message' => 'User updated successfully']);
        } else {
            return $this->response->setJSON($this->userModel->errors())->setStatusCode(404);
        }
    }

    // Delete a user by ID
    public function delete($id): ResponseInterface
    {
        if ($this->userModel->delete($id)) {
            return $this->response->setJSON(['message' => 'User deleted successfully']);
        } else {
            return $this->response->setJSON($this->userModel->errors())->setStatusCode(404);
        }
    }
}
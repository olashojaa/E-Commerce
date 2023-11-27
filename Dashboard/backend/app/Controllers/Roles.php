<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\RoleModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\PermissionModel;

class Roles extends BaseController
{
    
    protected $roleModel;
    protected $permissionModel;

    public function __construct()
    {
        $this->roleModel = new RoleModel();
        $this->permissionModel = new PermissionModel();
    }

    // Get all roles
    public function index(): ResponseInterface
    {
        if(!$this->checkPermission('_RoleListComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $roles = $this->roleModel->findAll();
        $rolesWithPermissions=[];
        foreach($roles as $role)
        {
            $role['permissions']=$this->roleModel->getRolePermissions($role['id']);
            $rolesWithPermissions[]=$role;

        }
        return $this->response->setJSON($rolesWithPermissions);
    }

    // Get a single role by ID
    public function show($id): ResponseInterface
    {
        if(!$this->checkPermission('_RoleUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $role = $this->roleModel->find($id);
        $permissions=$this->roleModel->getRolePermissions($id);
        $permissionId=[];
        foreach($permissions as $permission)
        {
            array_push($permissionId,$permission->id);
        }
$role['permissions']=$permissionId;
        if ($role === null) {
            return $this->response->setJSON(['error' => 'Role not found'])->setStatusCode(404);
        }

        return $this->response->setJSON($role);
    }

    // Create a new role
    public function create(): ResponseInterface
    {
        if(!$this->checkPermission('_RoleAddComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);

        $data = $this->request->getJSON(true);
        if ($this->roleModel->insert($data)) {
            //addPermission
            $insertedId = $this->roleModel->getInsertID();
            if($data['permissions'])
            foreach($data['permissions'] as $permissionId)
            {
                if (!$this->roleModel->hasPermission($insertedId, $permissionId)) 
                $this->roleModel->addPermission($insertedId,$permissionId);
            }
            return $this->response->setJSON(['message' => 'Role with Permissions created successfully']);
        } else {
            return $this->response->setJSON($this->roleModel->errors())->setStatusCode(404);
        }
    }

    // Update a role by ID
    public function update($id): ResponseInterface
    {
        if(!$this->checkPermission('_RoleUpdateComponent'))
        return $this->response->setJSON(['error' => 'Unauthorized'])->setStatusCode(401);
        
        $data = $this->request->getJSON(true);

        if ($this->roleModel->update($id, $data)) {
            $data_id["id"]=$id;
            $this->roleModel->deleteRelatedPermissions($data_id);
            if($data['permissions'])
            foreach($data['permissions'] as $permissionId)
            {
                if (!$this->roleModel->hasPermission($id, $permissionId)) 
                $this->roleModel->addPermission($id,$permissionId);
            }
            return $this->response->setJSON(['message' => 'Role with Permissions updated successfully']);
        } else {
            return $this->response->setJSON($this->roleModel->errors())->setStatusCode(404);
        }
    }

    // Delete a role by ID
    public function delete($id): ResponseInterface
    {
        if ($this->roleModel->delete($id)) {
            return $this->response->setJSON(['message' => 'Role deleted successfully']);
        } else {
            return $this->response->setJSON($this->roleModel->errors())->setStatusCode(404);
        }
    }

   
}

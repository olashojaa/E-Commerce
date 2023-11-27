<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Entities\Role;

class RoleModel extends Model
{
    protected $table            = 'roles';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['name'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = ['deleteRelatedPermissions'];
    protected $afterDelete    = [];


    public function addPermission($roleId, $permissionId)
    {
        $data = [
            'role_id' => $roleId,
            'permission_id' => $permissionId,
        ];

        return $this->db->table('role_permissions')->insert($data);
    }

    public function getRolePermissions($roleId)
    {
        return $this->db->table('role_permissions rp')
                         ->join('permissions p','rp.permission_id=p.id')
                        ->where('role_id', $roleId)
                        ->select('p.id,p.name,p.gaurd_name')
                        ->get()
                        ->getResult();
    }
 

    public function hasPermission($roleId, $permissionId)
    {
        return $this->db->table('role_permissions')
            ->where('role_id', $roleId)
            ->where('permission_id', $permissionId)
            ->countAllResults() > 0;
    }

    public function deleteRelatedPermissions($data)
    {
        $roleId = $data['id'];

        // Delete related rows in role_permission
        $this->db->table('role_permissions')
            ->where('role_id', $roleId)
            ->delete();
    }
}

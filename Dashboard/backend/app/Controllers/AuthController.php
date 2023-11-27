<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Models\RoleModel;
use App\Helpers\JWTHelper;

class AuthController extends BaseController
{
    protected $userModel;
    protected $roleModel;
    protected $jwthelper;
    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->roleModel = new RoleModel();
        $this->jwthelper=new JWTHelper();
    }
    public function login()
    {
     
        $data = $this->request->getJSON(true);
        $username = $data['username'];
        $password = $data['password'];
        $user = $this->userModel->where('username', $username)->first();

        if ($user) {
            $hashedPasswordFromDatabase = $user['password']; // Replace 'password' with your actual column name

            // Verify the password
            if (password_verify($password, $hashedPasswordFromDatabase)) {
        $payload = array(
            "permissions" => $this->roleModel->getRolePermissions($user['role_id']),
            "role_id" => $user['role_id'],
            "uid" => $user['id'],
            "email" => $user['email']
        );
 
        $token = $this->jwthelper->generate_jwt($payload);
                return $this->response->setJSON(['status' => 'success', 'message' => 'Login successful','token'=>$token]);
            } else {
                return $this->response->setJSON(['status' => 'error','message' => 'Authentication failed']);
            }
        } else {
            return $this->response->setJSON(['status' => 'error','message' => 'User not found']);
        }
  
            // return $this->response->setJSON(['status' => 'success', 'message' => 'Login successful']);

    }

    public function logout()
    {
        // Implement your logout logic here
        // Destroy user session or invalidate JWT token

        // For example:
        // Destroy user session
        session()->destroy();

        // Respond with success
        return $this->response->setJSON(['status' => 'success', 'message' => 'Logout successful']);
    }
}

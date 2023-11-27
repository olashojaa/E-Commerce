<?php
namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Helpers\JWTHelper;

class AuthenticateRequest implements FilterInterface
{
    protected $jwthelper;
    public function __construct() {
        $this->jwthelper=new JWTHelper();
    }
    public function before(RequestInterface $request, $arguments = null)
    {
        $authorizationHeader = $request->getHeaderLine('Authorization');
    //    return true;
        if ($authorizationHeader=='' ) {
            // Unauthorized: No Authorization header or multiple values
            return service('response')->setStatusCode(401);
        }

        try {
            if (strpos($authorizationHeader, 'Bearer ') === 0) 
            $token = substr($authorizationHeader, 7);
            $token = substr($token, 1,-1);
            $data=$this->jwthelper->decode_jwt($token);
            $request->userData=$data;


        } catch (\Exception $e) {
            // Token verification failed
            var_dump($e->getMessage());
            // return service('response')->setStatusCode(401);
        }

        return $request;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // This method is called after the controller has been executed
    }
}
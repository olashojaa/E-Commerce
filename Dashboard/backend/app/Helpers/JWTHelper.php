<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use stdClass;
use Firebase\JWT\Key;


class JWTHelper{
   public function generate_jwt(array $data): string
    {
        $key = getenv('TOKEN_SECRET'); // Replace with your secret key
        $token = JWT::encode($data, $key, 'HS256');
        return $token;
    }

 public   function decode_jwt(string $token): object
    {
        $key = getenv('TOKEN_SECRET');

        try {
            $decodedToken = JWT::decode($token, new Key($key, 'HS256'));
            return (object) $decodedToken;
        } catch (\Firebase\JWT\ExpiredException $e) {
            // Handle token expired exception
            throw $e;
        } catch (\Firebase\JWT\BeforeValidException $e) {
            // Handle token not yet valid exception
            throw $e;
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            // Handle invalid signature exception
            throw $e;
        } catch (\Exception $e) {
            // Handle other exceptions
            throw $e;
        }
    
}
}
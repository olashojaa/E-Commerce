<?php
require_once 'config.php';

//singltone design pattern

class Database {
    private static $instance;
    private $connection;

    private function __construct() {
        // private constructor to prevent direct instantiation
        $this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    }

    public static function getInstance() {
        if (!self::$instance) {
            // create a new instance if it doesn't exist 
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function disconnect() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
}
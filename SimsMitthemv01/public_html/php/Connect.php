<?php

class Connect {

    private $servername = "henkla.se.mysql";
    private $username = "henkla_se";
    private $password = "7837hl";
    private $dbname = "henkla_se";
    public $connect;

    // public function __construct() {
    //
    //
    // }

    public function openConnection() {

        $this->connect = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname) or die("Connection failed: " . $this->connect->connect_error);
        return $this->connect;
    }

    public function closeConnection() {

        mysqli_close($this->connect);
    }
}

?>

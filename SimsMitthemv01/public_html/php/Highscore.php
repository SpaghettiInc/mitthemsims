<?php

//require_once("Connect.php");

class Highscore {


    private $servername = "henkla.se.mysql";
    private $username = "henkla_se";
    private $password = "7837hl";
    private $dbname = "henkla_se";

    public function getHtmlTable() {
        $myConn = $this->openConnection();

        $sql = "SELECT * FROM highscore ORDER BY score DESC";
        $result = $myConn->query($sql);

        if ($result->num_rows > 0) {

           // output data of each row
           while($row = $result->fetch_assoc()) {
               echo "
                <tr>
                  <td>" . $row["name"] . "</td>
                  <td>" . $row["date"] . "</td>
                  <td>" . $row["score"] . "</td>
                </tr>
        ";
           }

        } else {
           echo "0 results";
        }
        mysqli_close($myConn);
    }

    private function openConnection() {
        $connect = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname) or die("Connection failed: ");
        return $connect;
    }

    public function getTop25() {

        $myConn = $this->openConnection();

        $sql = "SELECT score FROM highscore ORDER BY score ASC LIMIT 1";

        $result = $myConn->query($sql);

        if ($result->num_rows > 0) {

            $row = $result->fetch_assoc();
        }

        mysqli_close($myConn);
        return $row["score"];

    }

    public function writeHighscore() {


        // Code
    }
}



?>

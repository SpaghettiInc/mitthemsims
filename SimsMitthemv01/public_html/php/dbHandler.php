<?php

class dbHandler {

    // database connection information
    private $servername = "henkla.se.mysql";
    private $username = "henkla_se";
    private $password = "7837hl";
    private $dbname = "henkla_se";

    // returns a html table with the database content
    public function getHtmlTable() {
        $myConn = $this->openConnection();

        $sql = "SELECT name, date, score FROM highscore ORDER BY score DESC LIMIT 25";
        $result = mysqli_query($myConn, $sql);
        $ggrip = [];
        if ($result->num_rows > 0) {

           // output data of each row
           while($row = $result->fetch_assoc()) {
               $ggrip[] = $row;
           }

           echo json_encode($ggrip);
        }
        mysqli_close($myConn);
        return;
    }

    // opens up a connection to the actual database
    private function openConnection() {

        $connect = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname) or die("Connection failed: ");
        return $connect;
    }

    // returns the current lowest highscore (for comparison later)
    public function getTop25() {

        $myConn = $this->openConnection();

        $sql = "SELECT score, name FROM highscore ORDER BY score, date, id DESC LIMIT 25,1";
        $result = mysqli_query($myConn, $sql);

        if ($result->num_rows > 0) {

            // output data of each row
            while($row = $result->fetch_assoc()) {
                //return $row['score'];
                echo json_encode($row);
            }
        }
        
        mysqli_close($myConn);
        return;
    }

    // write a post (name and score) to the database
    public function writeHighscore($name1, $score) {

        // open up a connection
        $con = $this->openConnection();

        // escape any illegal characters from input
        $name = mysqli_real_escape_string($con, $name1);

        // we need the date of today
        $date = date("Y-m-d");

        // build the query string
        $query = "INSERT INTO highscore VALUES('', '{$name}', '{$date}', {$score})";

        // send the query string to the database
        mysqli_query($con, $query);

        // close connection
        mysqli_close($con);
    }
}

?>

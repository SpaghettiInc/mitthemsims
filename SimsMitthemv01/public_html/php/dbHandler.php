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
        $returnArr = [];
        if ($result->num_rows > 0) {

           // output data of each row
           while($row = $result->fetch_assoc()) {
               $returnArr[] = $row;
           }

           echo json_encode($returnArr);
        }
        mysqli_close($myConn);
        return;
    }



    // returns the current lowest highscore (for comparison later)
    public function getTop25() {

        $myConn = $this->openConnection();

        $sql = "SELECT score, name FROM highscore ORDER BY score DESC LIMIT 25,1";
        $result = mysqli_query($myConn, $sql);
        if ($result) {
            // output data of each row
            $row = mysqli_fetch_assoc($result);
            if ($row['score'] != null) {
                echo json_encode($row);
                mysqli_free_result($result);
            } else {
                mysqli_free_result($result);
                $sl = "SELECT MIN(score) AS score FROM highscore";
                $rs = mysqli_query($myConn, $sl);
                $rw = mysqli_fetch_assoc($rs);
                echo json_encode($rw);
                mysqli_free_result($rs);
            }
        }
        mysqli_close($myConn);
    }

    // write a post (name and score) to the database
    public function writeHighscore($name1, $score1) {
        // open up a connection
        $con = $this->openConnection();

        // escape any illegal characters from input
        $name2 = mysqli_real_escape_string($con, $name1);
        
        if(!is_numeric($score1)){
            mysqli_close($con);
            return;
        }
        
        if(strlen($name2) > 16){
            $name2 = substr($name2, 0 ,16);
        }
        
        $sName = htmlspecialchars($name2, ENT_SUBSTITUTE);
        // we need the date of today
        $date = date("Y-m-d");

        // build the query string
        $query = "INSERT INTO highscore VALUES('', '{$sName}', '{$date}', {$score1})";

        // send the query string to the database
        mysqli_query($con, $query);

        // close connection
        mysqli_close($con);
    }
    
        // opens up a connection to the actual database
    private function openConnection() {

        $connect = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname) or die("Connection failed: ");
        return $connect;
    }
    
}

?>

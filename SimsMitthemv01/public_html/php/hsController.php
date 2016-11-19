<?php

//include_once('php/vsh.php');

if( isset($_POST['name']) ) {

    // $servername = "henkla.se.mysql";
    // $username = "henkla_se";
    // $password = "7837hl";
    // $dbname = "henkla_se";
    //
    // $con = mysqli_connect($servername, $username, $password, $dbname);
    // //= $this->openConnection();
    //
    //
    // //$name = "Knugen";
    // //$score = 6;
    // //$_POST['name'];
    // //$score = $_POST['score'];
    // $name = $_POST['name'];
    // $score = $_POST['score'];
    // $date = date("Y-m-d");
    // //$name  = mysql_real_escape_string($con, $name);
    // //$score = mysql_real_escape_string($con, $score);
    //
    //
    // $query = "INSERT INTO highscore VALUES('', '{$name}', '{$date}', {$score})";
    //
    // mysqli_query($con, $query);
    //
    // mysqli_close($con);


    $kalle = new vsh;
    $kalle->writeHighscore($_POST['name'], $_POST['score']);
}
 ?>

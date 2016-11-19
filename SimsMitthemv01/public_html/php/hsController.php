<?php

include_once('dbHandler.php');

if( isset($_POST['name']) ) {

    $dbHandler = new dbHandler;
    $dbHandler->writeHighscore($_POST['name'], $_POST['score']);
}
 ?>

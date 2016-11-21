<?php

include_once('dbHandler.php');

$dbHandler = new dbHandler;

if( isset($_POST['name']) ) {
    $dbHandler->writeHighscore($_POST['name'], $_POST['score']);
}

if( isset($_POST['request']) ) {

    $dbHandler->getTop25();
}
 ?>

<?php

include_once('dbHandler.php');

$dbHandler = new dbHandler;

if( isset($_POST['name']) ) {
    $dbHandler->writeHighscore($_POST['name'], $_POST['score']);
}

if( isset($_POST['get_param']) ) {
    $dbHandler->getTop25();
}

if( isset($_POST['date']) ) {
    $dbHandler->getHtmlTable();
}

 ?>

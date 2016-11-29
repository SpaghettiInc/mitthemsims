<?php

ini_set('display_errors', 'On');
error_reporting(-1);

// FORM SETTINGS
$recipient = "lthlarsson@gmail.com";            // who will recieve the email?
$subject = "Web: ";              // what will the email subject look like?

//
$f_name = "";               // name from form
$f_email = "";              // email from form
$f_phone = "";              // phone from form (if entered)
$f_subject = "";            // subject from form
$f_message = "";            // the message from form
$f_identity = "";           // the identity of the sender
$f_lang = "";               // which language is being used?

// Grab stuff from the form
if ( isset($_POST["submit"]) ) {

    $f_name = $_POST["name"];
    $f_email = $_POST["email"];
    $f_phone = $_POST["phone"];
    $f_subject = $_POST["subject"];
    $f_message = $_POST["message"];
    $f_identity = getUserIP();
    $f_lang = $_POST["lang"];


    switch ($f_lang) {

        case "sv":

            echo '

<!DOCTYPE html>

<html lang="sv">

  <head>
    <title></title>
    <meta charset="utf-8" />
    <script src="js/library/jquery-3.1.1.js"></script>
    <script src="js/library/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <script src="js/game-changer.js"></script>
  </head>
  <body id="body">

    <div id="wrapper" class="bg-trans-white-90">

      <header id="header">

        <img src="../img/logo.png" alt="Mitthem logo (logo.png)" id="top-logo" class="" />

        <div id="language-switcher">
          <a href="../en/kontakt.html"><i class="fa fa-globe"></i>
          <span class="swe">English</span></a>
        </div>

      </header>

      <nav id="nav">

          <ul>
            <li class="swe"><a href="../index.html">Vilka är vi?</a></li>
            <li class="swe"><a href="../hur.html">Hur sorterar man?</a></li>
            <li class="swe"><a href="../spel.html">Spela spelet!</a></li>
            <li class="swe"><a href="../kontakt.html" id="current">Kontakta oss</a></li>
          </ul>

      </nav>

      <section id="content">

        <h1 class="swe">Tack för ditt meddelande!</h1>
        <p>Observera att vi har tillgång till din IP-adress! Detta för att
        undvika missbruk av mailformuläret.</p>

        <div id="form-box-confirmation">

            <p><strong>Namn:</strong> ' . $f_name . '</p>
            <p><strong>E-post:</strong> ' . $f_email . '</p>
            <p><strong>Telefonnummer:</strong> ' . $f_phone . '</p>
            <p><strong>Rubrik:</strong> ' . $f_subject . '</p>
            <p><strong>Meddelande:</strong></p><p class="green-indent">' . $f_message . '</p>
            <p><strong>Din IP-adress:</strong> ' . $f_identity . '</p>

        </div>

      </section>

    </div>

    <footer id="footer" class="bg-trans-black-80">

        <div id="company-info">

            <img src="../img/logo-small.png" alt="Logotype, small (logo-small.png)" id="bottom-logo"/>
            <p>Miljögatan 4<br />
            123 45&nbsp;&nbsp;Återvinningsberga<br />
            098 - 123 45 67</p>

        </div>

        <div id="social-buttons">

            <i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
            <i class="fa fa-twitter fa-2x" aria-hidden="true"></i>
            <i class="fa fa-instagram fa-2x" aria-hidden="true"></i>
            <i class="fa fa-envelope fa-2x" aria-hidden="true"></i>

        </div>

    </footer>

  </body>

</html>


            ';


        break;

        case "en":

        break;

        default:

            echo "Could not definiate which language to use!";
            echo "Message are being sent, but no preview is possible.";
    }

    $subject .= $f_subject;
    $message = "<b>Namn:</b> " . $f_name . "<br />" . "<b>E-mail:</b> <a href=\"mailto:"
    . $f_email . "\">" . $f_email . "</a><br />" . "<b>Telefonnummer:</b> " . $f_phone . "<br />"
    . "<b>Rubrik:</b> " . $f_subject . "<br />"
    . "<b>Meddelande:<br />---------------------------------</b><p>"
    . $f_message . "</p><b>---------------------------------</b><br />"
    . "<b>IP-adress:</b> " . $f_identity;

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <info@henkla.se>' . "\r\n";

    mail($recipient,$subject,$message,$headers);
}

function getUserIP() {
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;

}

?>

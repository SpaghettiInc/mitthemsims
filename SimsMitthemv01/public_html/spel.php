<!DOCTYPE html>

<html lang="sv">

  <head>
    <title></title>
    <meta charset="utf-8" />
    <script src="js/library/jquery-3.1.1.js"></script>
    <script src="js/library/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <script src="js/game-changer.js"></script>
  </head>
  <body id="body">

    <div id="wrapper">

      <header id="header">

        <img src="img/logo.png" alt="Mitthem logo (logo.png)" id="top-logo" class="" />

      </header>

      <nav id="nav">

        <ul>
          <li><a href="index.html">Varför sortera?</a></li>
          <li><a href="hur.html">Hur sortera?</a></li>
          <li><a href="spel.html">Spela spelet!</a></li>
        </ul>

      </nav>

      <div id="content">

        <!-- User will click this button when they want to start
        the game. When so, this button will go hidden. -->

        <p id="start-game-text">
          Några förklarande ord om spelet. Orkar inte komma med några
          specifika exempel nu. Duger inte detta menar du?</p>
        <input type="button" id="start-game-button" class="button" value="Starta spelet" />
        <input type="button" id="show-highscore-button" class="button" value="Visa topplista" />

        <!-- This is section is not used for now and is thus kept
        hidden. -->
        <aside id="aside">
          #aside
        </aside>

      </div> <!-- END #content-->

      <footer id="footer">
        #footer
      </footer>

    </div> <!-- END #wrapper -->

    <!-- This is the actual game section and will start out hidden.
    When the user choses to start the game, this section will become
    visible (and the game will begin). -->
    <section id="game" class="modal">

      <input type="button" id="end-game-button" class="button" value="Stäng spelet" />

    </section>

    <!-- This section will display the current highscore. It
    will start out hidden and show upon either request or when
    the game is over. -->
    <section id="highscore" class="modal">

      <h1>Topplista</h1>
      <table id="highscore-table">
        <?php

            include_once('php/Highscore.php');

            $hs = new Highscore();
            $hs->getHtmlTable();

        ?>

      </table>

      <input type="button" id="close-highscore-button" class="button" value="Stäng topplistan" />

    </section>


  </body>

</html>

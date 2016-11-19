<!DOCTYPE html>

<html lang="sv">

    <head>
      <title></title>
      <meta charset="utf-8" />
      <script src="js/library/jquery-3.1.1.js"></script>
      <script src="js/library/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link rel="stylesheet" type="text/css" href="css/game-style.css" />
      <script src="js/game-changer.js"></script>
      <script src="js/language-switcher.js"></script>
      <script src="js/mitthemscripts.js"></script>
    </head>
    <body id="body">

        <div id="wrapper">

            <header id="header">

              <img src="img/logo.png" alt="Mitthem logo (logo.png)" id="top-logo" class="" />

              <div id="language-switcher">
                <i class="fa fa-globe" style="font-size:16px"></i>
                <span class="swe">English</span>
              </div>

            </header>

            <nav id="nav">

              <ul>
                <li class="swe"><a href="index.html">Varför sortera?</a></li>
                <li class="swe"><a href="hur.html">Hur sortera?</a></li>
                <li class="swe"><a href="spel.html">Spela spelet!</a></li>
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



            </div> <!-- END #content-->


        </div> <!-- END #wrapper -->

<!-- ************************************************************************************ -->

        <!-- This is the actual game section and will start out hidden.
        When the user choses to start the game, this section will become
        visible (and the game will begin). -->
        <section id="game" class="modal">

            <aside id="button-box">

                <i id="gameStarter" class="white transparent game-button fa fa-play" aria-hidden="true"></i>
                <i id="end-game-button" class="white transparent game-button fa fa-close" aria-hidden="true"></i>
                <i id="replay" class="white transparent game-button fa fa-refresh" aria-hidden="true"></i>
                <i id="sound" class="white transparent game-button fa fa-volume-up" aria-hidden="true"></i>

            </aside>

            <section id="game-area">

                <h1 id="cdText"></h1>

                <section id="game-greeter" class="">

                    <?php
                    $servername = "henkla.se.mysql";
                    $username = "henkla_se";
                    $password = "7837hl";
                    $dbname = "henkla_se";

                    $con = mysqli_connect($servername, $username, $password, $dbname);
                    if(!$con){
                        echo "No connection feck u";
                    }else{
                        echo "fine";
                    }
                    //= $this->openConnection();


                    $name = "Marklair";
                    $score = 6;

                    //$name  = mysql_real_escape_string($con, $name);
                    //$score = mysql_real_escape_string($con, $score);
                    $date = date("Y-m-d");

                    $query = "INSERT INTO highscore VALUES('', '{$name}', '{$date}', {$score})";

                    mysqli_query($con, $query);

                       mysqli_close($con);

                       ?>

                    <h1>Välkommen till spelet!</h1>
                    <p>Så här spelar man:</p>
                    <ul>
                        <li>Lorem ipsum</li>
                        <li>Dolor sit</li>
                        <li>Amet.</li>
                    </ul>

                </section>

                <aside id="myClock">

                    <span class="minutes opacity"></span>
                    <span class="seconds opacity"></span>

                </aside>

                <div id="game-over" class="">

                    <p id="myScore"></p>



                </div>


                <div id="gameStart">
                    <!-- THIS IS WHERE THE OBJECTS WILL BE DROPPED -->
                    <div class="bin-container center-content" id="thrashDiv">
                        <figure id="glasBin" class="block">
                            <img alt="Glas" src="img/game/garbage-containers/glas.png">
                            <figcaption>Glasavfall</figcaption>
                        </figure>
                        <figure id="matBin" class="block">
                            <img alt="Mat" src="img/game/garbage-containers/mat.png">
                            <figcaption>Matavfall</figcaption>
                        </figure>
                        <figure id="papperBin" class="block">
                            <img alt="Papper" src="img/game/garbage-containers/papper.png">
                            <figcaption>Papper</figcaption>
                        </figure>
                        <figure id="metallBin" class="block">
                            <img alt="Metall" src="img/game/garbage-containers/metall.png">
                            <figcaption>Metallavfall</figcaption>
                        </figure>
                        <figure id="plastBin" class="block">
                            <img alt="Plast" src="img/game/garbage-containers/plast.png">
                            <figcaption>Plastavfall</figcaption>
                        </figure>
                    </div>

                    <!-- THIS IS THE OBJECTS TO BE DROPPED IN THE BINS ABOVE -->
                    <div id ="mydiv" class="trash-container center-content"></div>
                </div>

            </section>

        </section>

<!-- ************************************************************************************ -->

        <!-- This section will display the current highscore. It
        will start out hidden and show upon either request or when
        the game is over. -->
        <section id="highscore" class="modal">


            <h1>Topplista</h1>
            <table id="highscore-table">

                <form method="post">
                    <input type="submit" name="show_score" value="fungers nua">
                </form>
            </table>

            <input type="button" id="close-highscore-button" class="button" value="Stäng topplistan" />

        </section>


    </body>

</html>

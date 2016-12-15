/*
 *
 * AUTHOR: Martin Karttunen, Henrik Larsson
 * SIMS Project for the company Mitthem
 * PURPOSE: Trash disposing game
 *
 */

//Main Scripting page for the game
$(function () {

    //Very basic guard against phone users, since the game is not implemented on touch devices it's there to save them from having a bad experience.
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $("#start-game-box").hide();
        $("#content").append("<h2>Spelet stödjer ännu inte mobila enheter, testa gärna spelet hemma vid datorn</h2>");
    } else {
        $("#start-game-box").show();
    }

    //Check whether you are on the english or swedish side of the website
    var level = "";

    if ($("html").attr("lang") === "en") { level = "../"; }

    //Setting whether the elements should be hidden or shown prior to game start
    $("#highscore").hide();
    $("#game").hide();
    $("#aside").hide();
    $("#jsguard").remove();
    $("#content").show();
    $("#submitButton").hide();
    $("#submitName").hide();
    $("#myClock").hide();
    $("#myScore").hide();
    $('#replay').hide();
    $("#game-over").hide();

    // Main class contains game functions and images.
    // returns {mitthemscriptsL#9.GAME}
    function GAME() {

        //Array containing the images to be dropped
        this.images = [$('<img />',
                    {id: 'img0',
                        class: 'trash padding',
                        src: level + 'img/game/trash/glasflaska.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img1',
                        class: 'trash padding',
                        src: level + 'img/game/trash/matavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img2',
                        class: 'trash padding',
                        src: level + 'img/game/trash/pappersavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img3',
                        class: 'trash padding',
                        src: level + 'img/game/trash/metallavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img4',
                        class: 'trash padding',
                        src: level + 'img/game/trash/plastavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img5',
                        class: 'trash padding',
                        src: level + 'img/game/trash/batteri.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img6',
                        class: 'trash padding',
                        src: level + 'img/game/trash/eslampa.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img7',
                        class: 'trash padding',
                        src: level + 'img/game/trash/ofargatglas.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img8',
                        class: 'trash padding',
                        src: level + 'img/game/trash/hussopa.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img9',
                        class: 'trash padding',
                        src: level + 'img/game/trash/kartong.png',
                        alt: "No picture found"}),

            $('<img />',
                    {id: 'img10',
                        class: 'trash padding',
                        src: level + 'img/game/trash/bonus_event/gpp.png',
                        alt: "No Picture found"}),
            $('<img />',
                    {id: 'img11',
                        class: 'trash padding',
                        src: level + 'img/game/trash/bonus_event/bp.png',
                        alt: "No Picture found"})];

        //Mapping the thrash to the corresponding bin through inner object
        this.binBind = {
            img0: 'glasBin',
            img1: 'matBin',
            img2: 'papperBin',
            img3: 'metallBin',
            img4: 'plastBin',
            img5: 'battBin',
            img6: 'enSparBin',
            img7: 'ofargatBin',
            img8: 'husBin',
            img9: 'kartongBin',
            img10: 'matBin'
        };

        //Adding some audio objects
        this.glass = new Audio(level + 'sound/glass_break.mp3');
        this.batteries = new Audio(level + 'sound/batteries.mp3');
        this.cardboard = new Audio(level + 'sound/cardboard.mp3');
        this.light_bulb = new Audio(level + 'sound/light_bulb.mp3');
        this.paper = new Audio(level + 'sound/paper.mp3');
        this.plastics = new Audio(level + 'sound/plastics.mp3');
        this.removing_plastics = new Audio(level + 'sound/removing_plastics.mp3');
        this.trashbag = new Audio(level + 'sound/trashbag.mp3');
        this.error = new Audio(level + 'sound/error.mp3');
        this.metal_throw = new Audio(level + 'sound/metal_throw.mp3');
        this.game_music = new Audio(level + 'sound/gameMusic.mp3');
        this.food = new Audio(level + 'sound/food.mp3');
        this.game_music.volume = 0.05;
        this.game_music.loop = true;
        this.glass.volume = 0.07;
        this.metal_throw.volume = 0.07;
        this.batteries.volume = 0.5;
        this.cardboard.volume = 0.5;
        this.light_bulb.volume = 0.6;
        this.paper.volume = 0.4;
        this.plastics.volume = 0.5;
        this.removing_plastics.volume = 0.3;
        this.trashbag.volume = 0.3;
        this.error.volume = 0.06;
        this.food.volume = 0.4;

        //Adds a getPic function to retrieve a picture from the class
        this.getPic = function (imgNr) {
            return this.images[imgNr];
        };

        // Game points
        this.points = 0;

        // Function to mute all sounds
        this.muteAll = function () {
            this.glass.muted = true;
            this.metal_throw.muted = true;
            this.game_music.muted = true;
            this.batteries.muted = true;
            this.cardboard.muted = true;
            this.light_bulb.muted = true;
            this.paper.muted = true;
            this.plastics.muted = true;
            this.removing_plastics.muted = true;
            this.trashbag.muted = true;
            this.error.muted = true;
            this.food.muted = true;
        };

        // Function to unmute game sound function
        this.unMuteAll = function () {
            this.glass.muted = false;
            this.metal_throw.muted = false;
            this.game_music.muted = false;
            this.batteries.muted = false;
            this.cardboard.muted = false;
            this.light_bulb.muted = false;
            this.paper.muted = false;
            this.plastics.muted = false;
            this.removing_plastics.muted = false;
            this.trashbag.muted = false;
            this.error.muted = false;
            this.food.muted = false;
        };

        // Bool used in the points function
        this.status = true;
    }

    //Creates a new image object
    var gameObject = new GAME();

    gameObject.muteAll();


    /* - - - - - - - - - - - - - - - - - - - - - - - - - - -
     ON CLICK FUNCTIONS
     - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // Clicking on "start game" button
    $("#start-game-button").click(function () {
        $("#wrapper").hide();
        $("#footer").hide();
        $("#game").show();
    });

    // Anonymous on click function to mute the game sounds
    $("#sound").click(function () {
        if (gameObject.glass.muted) {
            $("#sound").toggleClass("fa-volume-up").removeClass("fa-volume-off");
            gameObject.unMuteAll();
        } else {
            $("#sound").toggleClass("fa-volume-off").removeClass("fa-volume-up");
            gameObject.muteAll();
        }
    });

    // Anonymous click function to starts the game and also plays the game music
    $('#gameStarter').click(function () {
        gameObject.game_music.play();
        startGame();
    });

    // Clicking on "end game" button
    $("#end-game-button").click(function () {
        onCloseGame();
    });


    // Anonomous click function to close and clear the highscore
    $("#close-highscore-button").click(function () {
        $("#highscore-table").children().remove();
        $("#highscore").hide();
        $("#wrapper").show();
        $("#footer").show();
    });

    // Click function to show the highscore
    $("#show-highscore-button").click(function () {
        $("#wrapper").hide();
        $("#footer").hide();
        $("#highscore").show();
        printHighScore("Ggus");

    });

    // Anonomous on click function bound to the replay button,
    // performs the actions needed to restart the game
    $('#replay').click(function () {
        gameObject.points = 0;
        $('#replay').hide();
        $('#score').text('');
        $("#cdText").show();
        $("#game-over").hide();
        $("#mydiv").children().remove();
        $("#highscore-table-area").children().remove();
        startGame();
    });

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - -
     DATABASE REQUESTS
     - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // Ajax post request to add a user to the highscore
    // Sends name and score to database through php
    $("#submitButton").click(function () {
        var submitName = $("#submitName").val();
        var submitScore = gameObject.points;
        $.ajax({
            url: level + "php/hsController.php",
            type: "post",
            data: {
                "name": submitName,
                "score": submitScore
            },
            success: function (data) {
                console.log("in first succezz");
                $("#appraise").hide();
                $("#submitButton").hide();
                $("#submitName").hide();

                printHighScore("inGame");

            }
        });
    });

    // Check to see whether the person is qualified to get on the highscore
    // Using ajax post request to get the lowest qualified score
    // @returns {void}
    function checkPoints() {
        $.ajax({
            url: level + "php/hsController.php",
            type: "post",
            dataType: 'json',
            data: {
                get_param: "score",
                name: "name"
            },
            success: function (data) {          //on recieve of reply
                console.log("inside success");
                console.log(JSON.stringify(data));
                if (data === null) {
                    console.log(data);
                    if (level.length === 0) {
                        $("#appraise").text("Bra gjort! Nu får du skriva in \n\
                                                dig på topplistan.");
                    } else {
                        $("#appraise").text("Well done! You made it to the highscore.");
                    }
                    $("#submitButton").show();
                    $("#submitName").show();
                } else if(gameObject.points > parseInt(data['score'])){
                    if (level.length === 0) {
                        $("#appraise").text("Bra gjort! Nu får du skriva in \n\
                                                dig på topplistan.");
                    } else {
                        $("#appraise").text("Well done! You made it to the highscore.");
                    }
                    $("#submitButton").show();
                    $("#submitName").show();
                }else {
                    if (level.length === 0) {
                        $("#appraise").text("Inte illa! Tyvärr räcker det inte \n\
                            riktigt för att ta sig in på topplistan.");
                    } else {
                        $("#appraise").text("Not bad! Unfortunately, it is not \n\
                            enough to make it to the highscore.");
                    }

                }
            }
        });
    }

    // Function to print the highscore, using ajax a post request is made to the server
    // @param {string} printId - used to check whether it's ingame or in the show highscore part
    // @returns {void}
    function printHighScore(printId) {
        $.ajax({
            url: level + "php/hsController.php",
            type: "post",
            dataType: 'json',
            data: {
                name: "name",
                date: "date",
                score: "score"
            },
            // on recieve of reply
            success: function (data) {
                console.log(JSON.stringify(data));
                if (printId === "inGame") {
                    if (level.length === 0) {
                        $("#highscore-table-area").append($("<tr><td>" +
                                "Namn" + "</td><td>" + "Datum" + "</td><td>" +
                                "Poäng" + "</td></tr>"));
                    } else {
                        $("#highscore-table-area").append($("<tr><td>" +
                                "Name" + "</td><td>" + "Date" + "</td><td>" +
                                "Points" + "</td></tr>"));
                    }

                    for (var i in data) {
                        $("#highscore-table-area").append($("<tr><td>" +
                                data[i]['name'] + "</td><td>" + data[i]['date'] +
                                "</td><td>" +
                                data[i]['score'] + "</td></tr>"));
                    }
                } else {
                    if (level.length === 0) {
                        $("#highscore-table").append($("<tr><td>" +
                                "Namn" + "</td><td>" + "Datum" + "</td><td>" +
                                "Poäng" + "</td></tr>"));
                    } else {
                        $("#highscore-table").append($("<tr><td>" + "Name" +
                                "</td><td>" + "Date" + "</td><td>" + "Points" +
                                "</td></tr>"));
                    }

                    for (var i in data) {
                        $("#highscore-table").append($("<tr><td>" +
                                data[i]['name'] + "</td><td>" + data[i]['date'] +
                                "</td><td>" + data[i]['score'] + "</td></tr>"));
                    }
                }
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - -
     GAME BINS DROPPABLE FUNCTIONS
     - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // When dropped it checks whether the ID corresponds to the correct thrash
    // If its correct it sends the ui-object to the trashAccept function,
    // If not correct it sends it to the trashReturn function
    $("#glasBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img0") {
                gameObject.glass.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#matBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img1" || ui.draggable.attr('id') === "img11") {
                gameObject.food.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#papperBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img2") {
                gameObject.paper.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#metallBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img3") {
                gameObject.metal_throw.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#plastBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img4") {
                gameObject.plastics.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#battBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img5") {
                gameObject.batteries.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#enSparBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img6") {
                gameObject.light_bulb.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#ofargatBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img7") {
                gameObject.glass.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#husBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img8") {
                gameObject.food.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    $("#kartongBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img9") {
                gameObject.cardboard.play();
                trashAccept(ui);
            } else {
                gameObject.error.play();
                trashReturn(ui);
            }
        }
    });

    // Sets status to true, calls the animation function for points, does a scale animation
    // on the thrash when done the callback function returns the thrash to its original position
    // a callback function then removes the picture from the div, updates the points and calls the
    // function to spawn the next trash
    // @param {ui} ui
    // @returns {void}
    function trashAccept(ui) {
        gameObject.status = true;
        plusPoint();
        $(ui.draggable).toggle("scale", function () {
            $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                $("#mydiv").children().remove();
                updatePoints2(gameObject.status);
                spawnRandomImg(gameObject);
            });
        });
    }

    // Function that returns the thrash to it's original position on wrong placement
    // it sets the status to false to indicate wrong, then it does a shake animation,
    // Since toggle makes the picture hidden I call the show function with a callback to
    // animate the trash to it's original position
    // @param {UI} ui
    // @returns {void}
    function trashReturn(ui) {
        gameObject.status = false;
        minPoint();
        $(ui.draggable).toggle('shake', 'fast').show(function () {
            $(ui.draggable).animate({top: 0, left: 0}, 'fast');
            updatePoints2(gameObject.status);
        });
    }


    /* - - - - - - - - - - - - - - - - - - - - - - - - - - -
     GAME HELPER FUNCTIONS
     - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


    // Function that spawns the random trash
    // @param {GAME} gameObject
    // @returns {void}
    function spawnRandomImg(gameObject) {
        var binTrack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //Array for keeping track of spawned bins
        var index = 11; //Index to randomize

        $('#thrashDiv').children().hide(); //Hiding all bins

        var rnd = (Math.floor(Math.random() * index)); //First thrash
        var rndCheck = rnd; //Check if the thrash is special event
        index--; //Decrementing Index
        var rndImage = gameObject.getPic(rnd); //Get correct thrash
        var boundBin = gameObject.binBind['img' + rnd]; //Get correct bin

        binTrack.splice(rnd, 1); //Removing index corresponding to the bin from array

        $('#' + boundBin).show(); //Showing the proper bin

        // Check if it's a special event if so the other bin needs to be removed
        // So we do not get a clash as to say it picks the same
        if (rnd === 10) {
            binTrack.splice(1, 1);
            index--;
        } else {
            binTrack.splice(9, 1);
            index--;
        }

        // Spawning the next two bins randomly
        rnd = (Math.floor(Math.random() * index));
        index--;
        boundBin = gameObject.binBind['img' + binTrack[rnd]];
        $('#' + boundBin).show();
        binTrack.splice(rnd, 1);

        rnd = (Math.floor(Math.random() * index));
        boundBin = gameObject.binBind['img' + binTrack[rnd]];
        $('#' + boundBin).show();

        //If it's the plastic bag that spawned it has to be made clickable so you can remove the bag.
        if (rndCheck === 10) {
            $(rndImage).appendTo($('#mydiv')).draggable().on('click', function () {
                $("#mydiv").children().remove();
                bonusTime();
                gameObject.removing_plastics.play();
                gameObject.deadline = gameObject.deadline + 5000;
                $(gameObject.images[11]).appendTo($('#mydiv')).draggable().show();
            }).show();
        } else {
            $(rndImage).appendTo($('#mydiv')).draggable().show();
        }
    }

    //Function that is called when plus or minus points are given based on correct trash drop
    // @param {bool} status
    // @returns {void}
    function updatePoints2(status) {
        if (status) {
            gameObject.points = gameObject.points + 50;
        } else if (gameObject.points > 0) {
            gameObject.points = gameObject.points - 100;
            if (gameObject.points < 0) {
                gameObject.points = 0;
            }
        }
    }

    // @returns data containing the total time, minutes and seconds remaining
    function getTimeRemaining() {
        var time = gameObject.deadline - Date.parse(new Date());
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / 1000 / 60) % 60);
        return {
            'total': time,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // Our timer that gives our game timer
    // @param {string} id - The id to the clock div
    // @returns {void}
    function initializeClock(id) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        updateClock(); // Running the fucntion once to avoid delay
        var timeinterval = setInterval(updateClock, 1000);

        //Inner function to update the clock on screen, runs every 1s
        function updateClock() {
            var time = getTimeRemaining();
            minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

            // If the time goes to zero, end the game and print points to screen
            if (time.total <= 0) {
                clearInterval(timeinterval);

                // Printing clock to the span, slice extracts the two last letters of the string
                minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

                // Just a check to see whether the game was ended or closed
                if (time.total > -100) {
                    onGameOver();
                    if (level.length === 0) {
                        $('#myScore').text(gameObject.points + ' poäng!').show();
                    } else {
                        $('#myScore').text(gameObject.points + ' points!').show();
                    }
                    checkPoints();
                } else {
                    minutesSpan.innerHTML = ('00');
                    secondsSpan.innerHTML = ('00');
                }
            }
        }
    }

    // Function that runs when the game is over, resets the game and prepares
    // it for replay.
    function onGameOver() {
        $("#mydiv").children(0).animate({top: 0, left: 0});
        $("#mydiv").children().remove();
        $("#gameStart").hide('scale', 'fast');
        $("#game-over").show();
        $('#myClock').hide();
        $('#replay').show();
    }

    //Function that resets all elements when the game is closed
    function onCloseGame() {
        gameObject.deadline = 0;
        gameObject.points = 0;
        gameObject.game_music.pause();
        $("#highscore-table-area").children().remove();
        $("#mydiv").children(0).animate({top: 0, left: 0});
        $("#mydiv").children().remove();
        $('#thrashDiv').children().hide();
        $('#myScore').text('').hide();
        $("#game-over").hide();
        $('#myClock').hide();
        $("#game-greeter").show();
        $('#replay').hide();
        $('#gameStarter').show();
        $("#game").hide();
        $("#wrapper").show();
        $("#footer").show();
    }

    // Function that animates plus points
    // @returns {void}
    function plusPoint() {
        $("#surprise").animate({opacity: 1, fontSize: "8em"}, 400, function () {
            $("#surprise").animate({opacity: 0, fontSize: "15em"}, 400);
            $("#surprise").animate({fontSize: "2em"}, 0);
        });
    }

    // Function that animates that the user got minus points
    // @returns {void}
    function minPoint() {
        $("#minus").animate({opacity: 1, fontSize: "4em"}, 600, function () {
            $("#minus").animate({opacity: 0, fontSize: "15em"}, 200);
            $("#minus").animate({fontSize: "2em"}, 0);
        });
    }

    // Function to animate the time gained from bonus event
    // @returns {void}
    function bonusTime() {
        $("#time").animate({opacity: 1, fontSize: "4em"}, 600, function () {
            $("#time").animate({opacity: 0, fontSize: "15em"}, 200);
            $("#time").animate({fontSize: "2em"}, 0);
        });
    }

    //Function to start the game
    function startGame() {
        $('#gameStarter').hide();
        $("#cdText").show();
        var count = 3;
        gameCd();

        //Simple inner function for a game countdown
        function gameCd() {
            $("#game-greeter").hide("fade", 300, function () {
                if (count > 0) {
                    $("#cdText").text(count);
                    count--;
                    setTimeout(gameCd, 1000);
                } else {
                    $("#cdText").text("").hide("fade", 300, function () {
                        $('#gameStart').show('fade', 1000, function () {
                            gameObject.deadline = Date.parse(new Date()) + 25000;
                            initializeClock('myClock');
                        });
                        $("#myClock").show('fade', 1000);
                        spawnRandomImg(gameObject); //Spawns the first thrash
                    });
                }
            });
        }
    }
});

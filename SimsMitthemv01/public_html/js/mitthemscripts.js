/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Main Script page for testing for MITTHEM
//
$(function () {
    /**
     * Creating the IMAGES class with constructor and store the images in an array.
     * @returns {mitthemscripts_L9.IMAGES}
     */
    function IMAGES() {

        //Array containing the images to be dropped
        this.images = [$('<img />',
                    {id: 'img0',
                        class: 'trash padding',
                        src: 'img/game/trash/glasflaska.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img1',
                        class: 'trash padding',
                        src: 'img/game/trash/matavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img2',
                        class: 'trash padding',
                        src: 'img/game/trash/pappersavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img3',
                        class: 'trash padding',
                        src: 'img/game/trash/metallavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img4',
                        class: 'trash padding',
                        src: 'img/game/trash/plastavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img5',
                        class: 'trash padding',
                        src: 'img/game/trash/batteri.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img6',
                        class: 'trash padding',
                        src: 'img/game/trash/eslampa.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img7',
                        class: 'trash padding',
                        src: 'img/game/trash/ofargatglas.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img8',
                        class: 'trash padding',
                        src: 'img/game/trash/hussopa.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img9',
                        class: 'trash padding',
                        src: 'img/game/trash/kartong.png',
                        alt: "No picture found"}),
            
            $('<img />',
                    {id: 'img10',
                        class: 'trash padding',
                        src: 'img/game/trash/bonus_event/gpp.png',
                        alt: "No Picture found"}),
            $('<img />',
                    {id: 'img11',
                        class: 'trash padding',
                        src: 'img/game/trash/bonus_event/bp.png',
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
        this.glass_audio = new Audio('sound/glass_break.mp3');
        this.metal_throw = new Audio('sound/metal_throw.mp3');
        this.game_music = new Audio('sound/gameMusic.mp3');
        this.game_music.volume = 0.05;
        this.game_music.loop = true;
        this.glass_audio.volume = 0.07;
        this.metal_throw.volume = 0.07;


        //Adds a getPic function to retrieve a picture from the class
        this.getPic = function (imgNr) {
            return this.images[imgNr];
        };

        this.points = 0;

        //Mute all function
        this.muteAll = function () {
            this.glass_audio.muted = true;
            this.metal_throw.muted = true;
            this.game_music.muted = true;
        };

        //Function to unmute function
        this.unMuteAll = function () {
            this.glass_audio.muted = false;
            this.metal_throw.muted = false;
            this.game_music.muted = false;
        };

        this.status = true;
    }

    //Hiding all elements prior to game start
    $("#submitButton").hide();
    $("#submitName").hide();
    $("#myClock").hide();
    $("#score").hide();
    $('#replay').hide();
    $("#game-over").hide();


    //Creates a new image object
    var imgObject = new IMAGES();

    /**
     * Anonomous function to mute the game sounds
     */
    $("#sound").click(function () {
        if (imgObject.glass_audio.muted) {
            $("#sound").toggleClass("fa-volume-up").removeClass("fa-volume-off");
            imgObject.unMuteAll();
        } else {
            $("#sound").toggleClass("fa-volume-off").removeClass("fa-volume-up");
            imgObject.muteAll();
        }
    });

    /**
     * Anonomous click function to start the game also plays the music
     */
    $('#gameStarter').click(function () {
        imgObject.game_music.play();
        startGame();
    });

    /**
     * Anonomous on click function that replays the game
     */
    $('#replay').click(function () {
        imgObject.points = 0;
        $('#replay').hide();
        $('#score').text('');
        $("#cdText").show();
        $("#game-over").hide();
        $("#mydiv").children().remove();
        startGame();
    });


    /**
     * Function that animates plus points
     * @returns {undefined}
     */
    function plusPoint() {
        $("#surprise").animate({opacity: 1, fontSize: "8em"}, 400, function () {
            $("#surprise").animate({opacity: 0, fontSize: "15em"}, 400);
            $("#surprise").animate({fontSize: "2em"}, 0);
        });
    }


    /**
     * Function that animates what user get minus points
     * @returns {undefined}
     */
    function minPoint() {
        $("#minus").animate({opacity: 1, fontSize: "4em"}, 600, function () {
            $("#minus").animate({opacity: 0, fontSize: "15em"}, 200);
            $("#minus").animate({fontSize: "2em"}, 0);
        });
    }

    /**
     * Function to animate the time gained from bonus event
     * @returns {undefined}
     */
    function bonusTime() {
        $("#time").animate({opacity: 1, fontSize: "4em"}, 600, function () {
            $("#time").animate({opacity: 0, fontSize: "15em"}, 200);
            $("#time").animate({fontSize: "2em"}, 0);
        });
    }

    /**
     * Ajax post request to add a user to the highscore
     * Sends name and score to database through php
     */
    $("#submitButton").click(function () {
        var submitName = $("#submitName").val();
        var submitScore = imgObject.points;
        $.ajax({
            url: "php/hsController.php",
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

                printHighScore();

            }
        });
    });

    /**
     * Check to see whether the person is qualified to get on the highscore
     * Using ajax post request to get the lowest qualified score
     * @returns {undefined}
     */
    function checkPoints() {
        $.ajax({
            url: "php/hsController.php",
            type: "post",
            dataType: 'json',
            data: {
                get_param: "score",
                name: "name"
            },
            success: function (data) {          //on recieve of reply
                console.log("inside success");
                console.log(data);
                if (imgObject.points > parseInt(data['score'])) {
                    console.log(data);
                    $("#appraise").text("Bra gjort! Nu får du skriva in dig på topplistan.");
                    $("#submitButton").show();
                    $("#submitName").show();
                } else {
                    $("#appraise").text("Inte illa! Tyvärr räcker det inte riktigt för att ta sig in på topplistan.");
                }
            }
        });
    }

    /**
     * Function to print the highscore, using ajax a post request is made to the server
     * @returns {undefined}
     */
    function printHighScore() {
        $.ajax({
            url: "php/hsController.php",
            type: "post",
            dataType: 'json',
            data: {
                name: "name",
                date: "date",
                score: "score"
            },
            success: function (data) {          //on recieve of reply
                console.log(JSON.stringify(data));
                $("#highscore-table-area").append($("<tr><td>" + "Namn" + "</td><td>" + "Datum" + "</td><td>" + "Poäng" + "</td></tr>"));

                for (var i in data) {
                    $("#highscore-table-area").append($("<tr><td>" + data[i]['name'] + "</td><td>" + data[i]['date'] + "</td><td>" + data[i]['score'] + "</td></tr>"));
                }
            }
        });
    }

    /**
     * When dropped it checks whether the ID corresponds to the correct thrash
     * If its correct it updates points to true and then gets rid of the image,
     * If not correct it shakes and then gets returns the thrash to starting position
     */
    $("#glasBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img0") {
                imgObject.glass_audio.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });

    $("#matBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img1" || ui.draggable.attr('id') === "img11") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });

    $("#papperBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img2") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });

    $("#metallBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img3") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });

    $("#plastBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img4") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });
    
    $("#battBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img5") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });
    
    $("#enSparBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img6") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });
    
    $("#ofargatBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img7") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });
    
    
    $("#husBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img8") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });
    
    $("#kartongBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img9") {
                imgObject.metal_throw.play();
                thrashAccept(ui);
            } else {
                thrashReturn(ui);
            }
        }
    });

    /**
     * Sets status to true, calls the animation function for points, does a scale animation
     * on the thrash when done the callback function returns the thrash to its original position
     * a callback function then remove picture from the div, updates the points and calls the
     * function to spawn the next trash
     * @param {type} ui
     * @returns {void}
     */
    function thrashAccept(ui) {
        imgObject.status = true;
        plusPoint();
        $(ui.draggable).toggle("scale", function () {
            $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                $("#mydiv").children().remove();
                updatePoints2(imgObject.status);
                spawnRandomImg(imgObject);
            });
        });
    }
    
    /**
     * Function that returns the thrash to it's original position on wrong placement
     * it set's the status to false to indicate wrong, then it does a shake animation,
     * Since toggle makes the picture hidden I call the show function with a callback to
     * animate the trash to it's original position
     * @param {type} ui
     * @returns {undefined}
     */
    function thrashReturn(ui) {
        imgObject.status = false;
        minPoint();
        $(ui.draggable).toggle('shake', 'fast').show(function () {
            $(ui.draggable).animate({top: 0, left: 0}, 'fast');
            updatePoints2(imgObject.status);
        });
    }

    //Function that spawns the random image
    function spawnRandomImg(imgObject) {
        var threeRnd = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //Array for keeping track of spawned bins
        var index = 11; //Index to randomize

        $('#thrashDiv').children().hide(); //Hiding all bins

        var rnd = (Math.floor(Math.random() * index)); //First thrash
        var rndCheck = rnd; //Check if the thrash is special event
        index--; //Decrementing Index
        var rndImage = imgObject.getPic(rnd); //Get correct thrash
        var boundBin = imgObject.binBind['img' + rnd]; //Get correct bin

        threeRnd.splice(rnd, 1); //Removing bin from array
        
        $('#' + boundBin).show(); //Showing the proper bin

        //Check if it's special event if so the other bin needs to be removed
        //So we do not get a clash
        if (rnd === 10) {
            threeRnd.splice(1, 1);
            index--;
        } else {
            threeRnd.splice(9, 1);
            index--;
        }

        //Spawning the next two bins randomly
        rnd = (Math.floor(Math.random() * index));
        index--;
        boundBin = imgObject.binBind['img' + threeRnd[rnd]];
        $('#' + boundBin).show();
        threeRnd.splice(rnd, 1);

        rnd = (Math.floor(Math.random() * index));
        boundBin = imgObject.binBind['img' + threeRnd[rnd]];
        $('#' + boundBin).show();


        //If it's the plastic bag that spawned it has to be made clickable so you can remove the bag.
        if (rndCheck === 10) {
            $(rndImage).appendTo($('#mydiv')).draggable().on('click', function () {
                $("#mydiv").children().remove();
                bonusTime();
                imgObject.deadline = imgObject.deadline + 5000;
                $(imgObject.images[11]).appendTo($('#mydiv')).draggable().show();
            }).show();
        } else {
            $(rndImage).appendTo($('#mydiv')).draggable().show();
        }
    }

    /**
     * 
     * @param {bool} status
     */
    function updatePoints2(status) {
        if (status) {
            imgObject.points = imgObject.points + 50;
        } else if (imgObject.points > 0) {
            imgObject.points = imgObject.points - 100;
            if (imgObject.points < 0) {
                imgObject.points = 0;
            }
        }
    }

    /**
     *
     * @returns {mitthemscripts_L9.getTimeRemaining.mitthemscriptsAnonym$5}
     * Returns the time remaining
     *
     */
    function getTimeRemaining() {
        var time = imgObject.deadline - Date.parse(new Date());
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / 1000 / 60) % 60);
        return {
            'total': time,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    /**
     *
     * @param {string} id
     * Function that initializes the timer
     */
    function initializeClock(id) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        updateClock(); // run function once at first to avoid delay
        var timeinterval = setInterval(updateClock, 1000);

        //Inner function to update the clock on screen, runs every 1s
        function updateClock() {
            var time = getTimeRemaining();
            minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

            //If the time goes to zero end the game and print points to screen
            if (time.total <= 0) {
                clearInterval(timeinterval);
                $("#mydiv").children(0).animate({top: 0, left: 0});
                $("#mydiv").children().remove();
                $("#gameStart").toggle('scale', 'fast');
                $("#game-over").show();
                $('#myClock').hide();
                $('#replay').show();
                $('#myScore').text(imgObject.points + ' poäng!');
                checkPoints();
            }
        }
    }

    //Function to start the game
    function startGame() {
        $('#gameStarter').remove();

        var count = 3;
        gameCd();

        function gameCd() {
            $("#game-greeter").hide("fade", 300, function () {

                if (count > 0) {
                    $("#cdText").text(count);
                    count--;
                    setTimeout(gameCd, 1000);
                } else {
                    $("#cdText").text("").hide("fade", 300, function () {
                        //$("#score").hide();
                        $('#gameStart').toggle('fade', 1000, function () {
                            imgObject.deadline = Date.parse(new Date()) + 25000;
                            initializeClock('myClock');
                        });
                        $("#myClock").show('fade', 1000);
                        spawnRandomImg(imgObject); //Spawns the first thrash
                    });
                }
            });
        }
    }
});


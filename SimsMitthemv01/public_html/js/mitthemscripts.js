/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Main Script page for testing for MITTHEM
//
$(function () {
   /**
    * Creating the IMAGES class and stores all images in a vector.
    * @returns {mitthemscripts_L9.IMAGES}
    */
    function IMAGES() {
        this.images = [$('<img />',
                    {id: 'img0',
                        class: 'trash padding',
                        src: 'pictures/trash/glasflaska.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img1',
                        class: 'trash padding',
                        src: 'pictures/trash/matavfall.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img2',
                        class: 'trash padding',
                        src: 'pictures/trash/pappersavfall.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img3',
                        class: 'trash padding',
                        src: 'pictures/trash/metallavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img4',
                        class: 'trash padding',
                        src: 'pictures/trash/plastavfall.jpg',
                        alt: "No picture found"})];
    }
    //Creates a new image object
    var imgObject = new IMAGES();

    //Adds a getPic function to retrieve a picture from the class
    imgObject.getPic = function (imgNr) {
        return this.images[imgNr];
    };

    imgObject.points = 0;

    $('#gameStarter').click(function () {
        var deadline = Date.parse(new Date()) + 31000;
        initializeClock('myClock', deadline);
        startGame();
    });

    //Spawns the first image
    spawnRandomImg(imgObject);

    
    /**
     * When dropped it checks whether the ID corresponds to the correct thrash
     * If its correct it updates points to true and then gets rid of the image,
     * If not correct it shakes and then gets rid of picture
     */
    $("#glasBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img0") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                $(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
                updatePoints2(false);
            }
        }
    });

    $("#matBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img1") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                updatePoints2(false);
                $(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            }
        }
    });


    $("#papperBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img2") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                updatePoints2(false);
                $(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            }
        }
    });

    $("#metallBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img3") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            }
        }
    });

    $("#plastBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img4") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                updatePoints2(false);
                $(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        spawnRandomImg(imgObject);
                    });
                });
            }
        }
    });

    //Function that spawns the random image
    function spawnRandomImg(imgObject) {
        var rnd = (Math.floor(Math.random() * 5));
        var rndImage = imgObject.getPic(rnd);
        $(rndImage).appendTo($('#mydiv')).draggable().show();
    }

    //Function to update the points.
    function updatePoints2(status) {
        
        if (status) {
            imgObject.points++;
            var oldPoints = document.getElementById("points").innerHTML;
            document.getElementById("points").innerHTML = oldPoints + "<i class=\"fa fa-check\" style=\"color:green;padding:5px;\"></i>";
        } else {
            var oldPoints = document.getElementById("points").innerHTML;
            document.getElementById("points").innerHTML = oldPoints + "<i class=\"fa fa-close\" style=\"color:red;padding:5px;\"></i>";
        }
    }

/**
 * 
 * @param {type} eTime
 * @returns {mitthemscripts_L9.getTimeRemaining.mitthemscriptsAnonym$5}
 * Returns the time remaining
 * 
 */
    function getTimeRemaining(eTime) {
        var time = eTime - Date.parse(new Date());
        //Date.parse(eTime)
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
 * @param {type} id
 * @param {type} eTime
 * @returns {undefined}
 * Function that initializes the timer
 */
    function initializeClock(id, eTime) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        updateClock(); // run function once at first to avoid delay
        
        
        var timeinterval = setInterval(updateClock, 1000);
        
        //Inner function to update the clock on screen, runs every 1s
        function updateClock() {
            var time = getTimeRemaining(eTime);
            minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);
            
            //If the time goes to zero end the game and print points to screen
            if (time.total <= 0) { 
                clearInterval(timeinterval);
                //alert(imgObject.points);
                $("#gameStart").toggle('scale', 'fast');
                $('#meHeads').text('There ya go ' + imgObject.points + ' pointserruuuu');
                
            }
        }
    }
    
    //Function to start the game
    function startGame() {
        $('#gameStart').toggle('shake', 500);
        $('#gameStarter').remove();
    }
});





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
                        src: 'img/game/trash/glasflaska.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img1',
                        class: 'trash padding',
                        src: 'img/game/trash/matavfall.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img2',
                        class: 'trash padding',
                        src: 'img/game/trash/pappersavfall.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img3',
                        class: 'trash padding',
                        src: 'img/game/trash/metallavfall.png',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img4',
                        class: 'trash padding',
                        src: 'img/game/trash/plastavfall.jpg',
                        alt: "No picture found"}),
            $('<img />',
                    {id: 'img5',
                        class: 'trash padding',
                        src: 'img/game/trash/bonus_event/gpp.png',
                        alt: "No Picture found"}),
            $('<img />',
                    {id: 'img6',
                        class: 'trash padding',
                        src: 'img/game/trash/bonus_event/gp.png',
                        alt: "No Picture found"}),
            $('<img />',
                    {id: 'img7',
                        class: 'trash padding',
                        src: 'img/game/trash/bonus_event/bp.png',
                        alt: "No Picture found"})];
        
        this.binBind = {
            img0:'glasBin',
            img1:'matBin',
            img2:'papperBin',
            img3:'metallBin',
            img4:'plastBin',
            img5:'matBin',
            img6:'plastBin'
        };
        
        
        
        this.glass_audio = new Audio('sound/glass_break.mp3');
        this.metal_throw = new Audio('sound/metal_throw.mp3');
        this.glass_audio.volume = 0.2;
        this.metal_throw.volume = 0.2;
        //Adds a getPic function to retrieve a picture from the class
        this.getPic = function (imgNr) {
            return this.images[imgNr];
        };
        this.points = 0;
        
        this.muteAll = function (){
            this.glass_audio.muted = true;
            this.metal_throw.muted = true;
        };
        
        this.unMuteAll = function (){
            this.glass_audio.muted = false;
            this.metal_throw.muted = false;
        };
        this.status = true;
    }

    
    $("#score").hide();
    $('#replay').hide();
    //Creates a new image object
    var imgObject = new IMAGES();

    $("#sound").click(function(){
        if(imgObject.glass_audio.muted){
            imgObject.unMuteAll(); 
        }else{
           imgObject.muteAll(); 
        }
        
    });

    $('#gameStarter').click(function () {
        startGame();
    });

    $('#replay').click(function () {
        imgObject.points = 0;
        $('#replay').hide();
        $('#score').text('');
        $("#cdText").show();
        startGame();
    });

    /**
     * When dropped it checks whether the ID corresponds to the correct thrash
     * If its correct it updates points to true and then gets rid of the image,
     * If not correct it shakes and then gets rid of picture
     */
    $("#glasBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img0") {
                imgObject.status = true;
                imgObject.glass_audio.play();
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                imgObject.status = false;
                $(ui.draggable).toggle('shake', 'fast').show(function(){
                    $(ui.draggable).animate({top: 0, left: 0}, 'fast');
                    updatePoints2(imgObject.status);
                });
                /*$(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });*/
            }
        }
    });

    $("#matBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img1" || ui.draggable.attr('id') === "img6" || ui.draggable.attr('id') === "img7") {
                imgObject.metal_throw.play();
                imgObject.status = true;
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                imgObject.status = false;
                
                $(ui.draggable).toggle('shake', 'fast').show(function(){
                    $(ui.draggable).animate({top: 0, left: 0}, 'fast');
                    updatePoints2(imgObject.status);
                });
                
                
                /*$(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });*/
            }
        }
    });


    $("#papperBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img2") {
                imgObject.metal_throw.play();
                imgObject.status = true;
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                imgObject.status = false;
                
                $(ui.draggable).toggle('shake', 'fast').show(function(){
                    $(ui.draggable).animate({top: 0, left: 0}, 'fast');
                    updatePoints2(imgObject.status);
                });
                
                
                /*$(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });*/
            }
        }
    });

    $("#metallBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img3") {
                imgObject.metal_throw.play();
                imgObject.status = true;
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                imgObject.status = false;
                
                $(ui.draggable).toggle('shake', 'fast').show(function(){
                    $(ui.draggable).animate({top: 0, left: 0}, 'fast');
                    updatePoints2(imgObject.status);
                });
                
                /*$(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });*/
            }
        }
    });

    $("#plastBin").droppable({
        drop: function (event, ui) {
            if (ui.draggable.attr('id') === "img4") {
                imgObject.metal_throw.play();
                imgObject.status = true;
                $(ui.draggable).toggle("scale", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });
            } else {
                imgObject.status = false;
                $(ui.draggable).toggle('shake', 'fast').show(function(){
                    $(ui.draggable).animate({top: 0, left: 0}, 'fast');
                    updatePoints2(imgObject.status);
                });
                
                /*$(ui.draggable).toggle("shake", function () {
                    $(ui.draggable).animate({top: 0, left: 0}, 0, function () {
                        $("#mydiv").children().remove();
                        updatePoints2(imgObject.status);
                        spawnRandomImg(imgObject);
                    });
                });*/
            }

        }
    });

    //Function that spawns the random image
    function spawnRandomImg(imgObject) {
        var threeRnd = [0,1,2,3,4,5];
        var index = 6;
        $('#thrashDiv').children().hide();

        
        var rnd = (Math.floor(Math.random() * index));
        var rndCheck = rnd;
        index--;
        var rndImage = imgObject.getPic(rnd);
        var boundBin = imgObject.binBind['img' + rnd];
        threeRnd.splice(rnd,1);
        
        if(rnd === 5){
            threeRnd.splice(1,1);
            index--;
        }else{
            threeRnd.splice(4,1);
            index--;
        }
        
        

        $('#' + boundBin).show();

        rnd = (Math.floor(Math.random() * index));
        index--;
        boundBin = imgObject.binBind['img' + threeRnd[rnd]];
        $('#' + boundBin).show();
        threeRnd.splice(rnd,1);

        rnd = (Math.floor(Math.random() * index));
        boundBin = imgObject.binBind['img' + threeRnd[rnd]];
        $('#' + boundBin).show();
        
                
        if(rndCheck === 5){
            $(rndImage).appendTo($('#mydiv')).draggable().on('click', function(){
                $("#mydiv").children().remove();
                imgObject.deadline = imgObject.deadline + 5000;
                $(imgObject.images[6]).appendTo($('#mydiv')).draggable().show();
                $(imgObject.images[7]).appendTo($('#mydiv')).draggable().show();
            }).show();
        }else{
        $(rndImage).appendTo($('#mydiv')).draggable().show();
        }
        /*{
            revert: function(event, ui){
                $(this).data("ui-draggable").originalPosition = {
                    top: 0,
                    left: 0
                };
                return !event;
            }
        }*/
        
    }


    //Function to update the points.
    function updatePoints2(status) {
        if (status) {
            imgObject.points++;
            imgObject.deadline = imgObject.deadline + 2000;
        }else if(imgObject.points > 0){
            imgObject.points--;
            imgObject.deadline = imgObject.deadline - 3000;
        }
        $("#testScore").text(imgObject.points);    
    }

/**
 *
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
 * @param {type} id
 * @returns {undefined}
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
                $("#score").show();
                $('#score').text('You got ' + imgObject.points + ' points');
                $('#myClock').hide();
                $('#replay').show();
            }
        }
    }

    //Function to start the game
    function startGame() {
        $('#gameStarter').remove();
        var count = 3;
        gameCd();
        
        function gameCd() {
        if (count > 0) {
            //console.log(count);
            $("#cdText").text(count);
            count--;
            setTimeout(gameCd, 500);
        }else {
        $("#cdText").text("Start!!!").hide(500, function(){
        $("#score").hide();
        $('#gameStart').toggle('shake', 500);
        spawnRandomImg(imgObject); //Spawns the first thrash
        imgObject.deadline = Date.parse(new Date()) + 30000;
        initializeClock('myClock');
        $("#myClock").show();
        });
        }
    }
    }
});

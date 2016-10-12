/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//A lot of test functions when learning the language, take
//it with a grain of SALT really silly if you remove comments
//around pictures in the index.html :p
//
$(function(){    
    //Makes the picture of id albinboy draggable, 
    //and contains it in an area
    $("#albinboy").draggable({
        containment: "#container"
    });
    
    //$("#marklarboy").draggable();
    $("#gothboy").draggable();
   // $("#simonboy").draggable();
    $("#maxboy").draggable();
    //Makes the text with ID dragme dragable and also adds the css class redtext which makes the text red
    $("#dragme").draggable().addClass("redtext");
    $("#dragme").text("Fyllejew improved");
    var score = 0;
    
    
    $("#albinboy").droppable({
        accept: "#maxboy",
        drop: function(event, ui){
            //$("#maxboy").fadeOut('fast').fadeIn("fast");
            $("#maxboy").toggleClass("coolclass");
            score++;
            alert(score);   
        }
    });
    
    //Listener to hower which changes the text with id title on mouseover
    $('#title').hover(function(){
        $('#title').text('Don\'t touch me');
    }, function(){
        $('#title').text('Thank you');
    });
    
    //Makes the title animate to green with a dark backgroud
    $("#title").click(function(){
       $("#title").animate({
        color: "green",
        backgroundColor: "rgb( 20, 20, 20 )"
        });
    });
    
    $("#card").click(function(){
        $("#card").toggleClass("flipped"); 
    });
    
    //Function that runs when the picture is clicked sending it in a sliding motion
    //by adding and removing classes, the classes changes the position of the image
    //and the added number is how long time this is supposed to take in ms. 1000ms = 1s
   $("#maxboy").click(function(){
        for(var i = 0; i<10; i++){
            $("#maxboy").toggleClass("newClass", 1000);
            $("#maxboy").toggleClass("otherClass", 1000);
    }
    });
    
    $("#albinboy").click(function(){
        for(var i = 0; i<10; i++){
            $("#albinboy").toggleClass("newClass", 600);
            $("#albinboy").toggleClass("otherClass", 600);
    }
    });
    
    $("#simonboy").click(function(){
        for(var i = 0; i<10; i++){
            $("#simonboy").toggleClass("newClass", 700);
            $("#simonboy").toggleClass("otherClass", 700);
    }
    });
    
    $("#marklarboy").click(function(){
        for(var i = 0; i<10; i++){
            $("#marklarboy").toggleClass("newClass", 500);
            $("#marklarboy").toggleClass("otherClass", 500);
    }
    });
    
    $("#gothboy").click(function(){
        for(var i = 0; i<10; i++){
            $("#gothboy").toggleClass("newClass", 400);
            $("#gothboy").fadeOut('fast').fadeIn("fast");
            $("#gothboy").toggleClass("otherClass", 400);
            $("#gothboy").toggleClass("otherclassagain", 400);
            $("#gothboy").toggleClass("class3", 400);
    }
    });
    
});
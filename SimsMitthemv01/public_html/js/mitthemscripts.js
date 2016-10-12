/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
//Main Script page for testing for MITTHEM
//
$(function(){
    //alert("ggrip");
    //Makes the picture of ID square draggable
    $("#square").draggable({
        containment: "#container"
    });
    $("#heart").draggable({
        containment: "#container"
    });
    $("#triangle").draggable({
        containment: "#container"
    });
    
    $("#star").draggable({
        containment: "#container"
    });
    
    //Makes the pic of ID albinboy droppable, accepts pictures
    //that has the css class "pic" attached to it
    $("#albinboy").droppable({
        accept: function(d){
            if(d.hasClass("pic")){
                return true;
            }
        },
        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui){
            $(ui.draggable).toggle("explode");
        }
    });
    
    /*$("#star").click(function(){
        $("#star").toggle("explode");   
    });*/
});
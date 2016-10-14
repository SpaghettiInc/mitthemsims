/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Main Script page for testing for MITTHEM
//
$(function(){
    //Makes the picture of ID square draggable
    /*$(".trash").draggable({
        containment: "#container"
    });*/
    spawnRandomImg();
    //appendImg(img);
    //img.appendTo($('#mydiv')).draggable();
    /*
    $('#glasTrash').click(function(){
       randomImgReturn(); 
    });
   
    var img = $('<img />',
               {id: 'glasTrash',
                class: 'thrash padding',
                src: 'pictures/trash/glasflaska.jpg',
                width: 100,
                height: 100}).appendTo($('#mydiv'));
    img.draggable();
    var img2 = $('<img />',
               {id: 'glasTrash',
                class: 'thrash padding',
                src: 'pictures/trash/glasflaska.jpg',
                width: 100, 
                height: 100}).appendTo($('#mydiv'));
            
    */
    //Makes the pic of ID albinboy droppable, accepts pictures
    //that has the css class "pic" attached to it
    $("#glasBin").droppable( {

        accept: function(d) {

            return true;
        },
        
        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            //if(ui.draggable.attr('id') == "glasTrash") {
            if(ui.draggable.attr('id') === "img0") {
                updatePoints2(true);
                $(ui.draggable).toggle("scale");

                
            } else {
                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
            $('#mydiv').children().remove();    
            //$(ui.draggable.element).remove();
                spawnRandomImg();
                //appendImg(img);
        }
    });

    $("#matBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') === "img1") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");
                

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                
                // put back object where it came from
            }
            $('#mydiv').children().remove();
            //$(ui.draggable.element).remove();
            spawnRandomImg();
            //appendImg(img);
        }
    });

    //Makes the pic of ID albinboy droppable, accepts pictures
    //that has the css class "pic" attached to it
    $("#papperBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') === "img2") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");
                

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                
                // put back object where it came from
            }
            $('#mydiv').children().remove();
            //$(ui.draggable.element).remove();
            spawnRandomImg();
            //appendImg(img);
        }
        
    });

    $("#metallBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') === "img3") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");
                

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                
                // put back object where it came from
            }
            $('#mydiv').children().remove();
            //$(ui.draggable.element).remove();
            spawnRandomImg();
            //appendImg(img);
        }
    });

    $("#plastBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') === "img4") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
               
                // put back object where it came from
            }
             $(ui.draggable.element).remove();
             spawnRandomImg();
             //appendImg(img);
        }
    });
    /*
    function appendImg(img){
        $('#mydiv').append(img).draggable();
    };
*/
   function spawnRandomImg(){
    var x = ( Math.floor(Math.random()*5));
    var imgId = "img" + x;
    if(x === 0){
    img = $('<img />',
               {id: imgId,
                class: 'thrash padding',
                src: 'pictures/trash/glasflaska.jpg',
                width: 100,
                height: 100});
        }else if(x === 1){
            img = $('<img />',
               {id: imgId,
                class: 'thrash padding',
                src: 'pictures/trash/matavfall.jpg',
                width: 100,
                height: 100});
        }else if (x === 3){
            img = $('<img />',
               {id: imgId,
                class: 'thrash padding',
                src: 'pictures/trash/metallavfall.png',
                width: 100,
                height: 100});
        }else if(x === 2){
            img = $('<img />',
               {id: imgId,
                class: 'thrash padding',
                src: 'pictures/trash/pappersavfall.jpg',
                width: 100,
                height: 100});
        }else if (x === 4){
            img = $('<img />',
               {id: imgId,
                class: 'thrash padding',
                src: 'pictures/trash/plastavfall.jpg',
                width: 100,
                height: 100});
        }
        //.appendTo($('#mydiv')
    //return img;
    $(img).appendTo($('#mydiv')).draggable();
}
});



function updatePoints(pts) {

    var oldPoints = parseInt(document.getElementById("points").innerHTML);
    document.getElementById("points").innerHTML = oldPoints + pts;
}

function updatePoints2(status) {

    if (status) {

        var oldPoints = document.getElementById("points").innerHTML;
        document.getElementById("points").innerHTML = oldPoints + "<i class=\"fa fa-check\" style=\"color:green;padding:5px;\"></i>"

    } else {

        var oldPoints = document.getElementById("points").innerHTML;
        document.getElementById("points").innerHTML = oldPoints + "<i class=\"fa fa-close\" style=\"color:red;padding:5px;\"></i>"
    }

}


function infoBox(str) {

        document.getElementById("info-box").innerHTML = str;
}

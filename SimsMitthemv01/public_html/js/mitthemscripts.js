/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Main Script page for testing for MITTHEM
//
$(function(){
    //Makes the picture of ID square draggable
    $(".trash").draggable({
        containment: "#container"
    });

    //Makes the pic of ID albinboy droppable, accepts pictures
    //that has the css class "pic" attached to it
    $("#glasBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') == "glasTrash") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
        }
    });

    $("#matBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') == "matTrash") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
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

            if(ui.draggable.attr('id') == "papperTrash") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
        }
    });

    $("#metallBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') == "metallTrash") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
        }
    });

    $("#plastBin").droppable( {

        accept: function(d) {

            return true;
        },

        //When dropped it explodes it
        //Temporary thingie, doesnt actually remove it or anything
        drop: function(event, ui) {

            if(ui.draggable.attr('id') == "plastTrash") {

                updatePoints2(true);
                $(ui.draggable).toggle("scale");

            } else {

                updatePoints2(false);
                $(ui.draggable).toggle("shake");
                // put back object where it came from
            }
        }
    });


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

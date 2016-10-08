/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){    
    //alert('ggrip');
    $("#dragme").draggable({
        classes: {
            "ui-draggable": "ggrip"
        }
    });
    
    $("#title").click(function(){
       $("#title").animate({
        color: "green",
        backgroundColor: "rgb( 20, 20, 20 )"
        });
    });
    
    $('#title').hover(function(){
        $('#title').text('Don\'t touch me');
    }, function(){
        $('#title').text('Thank you');
    });
});
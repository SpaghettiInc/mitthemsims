
$(document).ready(function() {

  $("#highscore").hide();
  $("#game").hide();
  $("#aside").hide();

  /*  Clicking on "start game" button */
  $("#start-game-button").click(function() {

    $("#wrapper").hide();
    $("#footer").hide();
    $("#game").show();
  });

  /*  Clicking on "end game" button */
  $("#end-game-button").click(function() {

    $("#game").hide();
    $("#wrapper").show();
    $("#footer").show();
  });

  /*  Clicking on "show highscore" button */
  /*
  $("#show-highscore-button").click(function() {

    $("#wrapper").hide();
    $("#footer").hide();
    $("#highscore").show();

});*/

  /*  Clicking on "close highscore" button */
  $("#close-highscore-button").click(function() {

    $("#highscore").hide();
    $("#wrapper").show();
  });

});

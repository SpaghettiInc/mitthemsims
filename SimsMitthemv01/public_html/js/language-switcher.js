
$(document).ready(function() {

  var lang = "swe";

  $("#language-switcher").mouseenter(function() {
    $("#language-switcher").css("color", "green");
    $("#language-switcher").css("border-bottom", "4px solid green");
  });
  $("#language-switcher").mouseleave(function() {
    $("#language-switcher").css("color", "black");
    $("#language-switcher").css("border-bottom", "none");
  });


  $(".eng").hide();
  $(".swe").show();

  $("#language-switcher").click(function() {

    if (lang === "swe") {
      lang = "eng";
      $(".swe").hide();
      $(".eng").show();
    }

    else if (lang === "eng") {
      lang = "swe";
      $(".eng").hide();
      $(".swe").show();
    }

  });

});

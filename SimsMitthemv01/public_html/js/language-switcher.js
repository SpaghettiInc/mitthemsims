
$(document).ready(function() {

    $("#language-switcher").click(function() {

        var doc = document.location.href.match(/[^\/]+$/)[0];

        if ( $("html").attr("lang") === "en" ) {

            window.location.href = "../" + doc;
        }
        else if ( $("html").attr("lang") === "sv" ) {

            window.location.href = "en/" + doc;
        }
    });
});

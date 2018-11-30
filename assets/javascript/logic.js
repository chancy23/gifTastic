$(document).ready(function() {
    var topics = ["Irritated", "Laughing", "Happy", "Sad", "Angry", "Eye Roll", "Finger Snaps", "Excited"];

    //Hide favorites area until a GIFs are added to it
    $("#favoriteGifsArea").hide();

    //functions ================================================================
    function createButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>").addClass("btn btn-light gifButton");
            gifButton.attr("data-button", topics[i]).text(topics[i]);
            $("#gifButtons").append(gifButton);
        }; 
    };
    createButtons();
    
    // on click events/functions================================================

    $("#gifButtons").on("click", ".gifButton", function() {
        var apiKey = "&api_key=BBccJQM11fXinnCUWdUrWfK9kpo2qWPq&";
        var searchTerm =  $(this).attr("data-button");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + apiKey + "&limit=10";

        //Testing section
        //console.log("this is the term to search: " + searchTerm);
        //console.log("this is the queryURL " + queryURL);

        //display the still gif for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var $gifDiv = $("<div>").addClass("gifDiv rounded");
                var $p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                var $gifTitle = $("<h5>").text(results[i].title).css("textTransform", "capitalize").css("width", "260px");
                var $gifStill = $("<img>").attr("src", results[i].images.fixed_width_still.url).addClass("gif");
                
                //Add the data still and animate attributes for onclick events later
                $gifStill.attr("data-still", results[i].images.fixed_width_still.url);
                $gifStill.attr("data-animate", results[i].images.fixed_width.url);
                $gifStill.attr("data-state", "still");

                var $addFavorite = $("<button>").addClass("btn btn-light gifFave fa fa-bookmark-o").css("font-size", "18px");
                $addFavorite.attr("src", results[i].images.fixed_width.url);

                $gifDiv.append($gifTitle,).append($gifStill).append($p);
                $p.append($addFavorite);
                $("#displayGifs").prepend($gifDiv);
            };
        });
    });

    $(".addTopic").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#addTopicTerm").val().trim();
        topics.push(newTopic);
        createButtons();
        $("#addTopicTerm").val("");
    });

    //onclick event to animate gif or still it if animated.
    $("#displayGifs").on("click", ".gif", function() {
        var gifState = $(this).attr("data-state");

        if (gifState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

    $("#displayGifs").on("click", ".gifFave", function() {
        var $favoriteGif = $("<img>").attr("src", $(this).attr("src")).css("margin", "5px").css("width", "260px");
        $("#favoriteGifsArea").append($favoriteGif);
        $("#favoriteGifsArea").show();
    });
});
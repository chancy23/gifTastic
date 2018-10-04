$(document).ready(function() {

    //Initial array of gif topics to populate in buttons and add new ones to
    var topics = ["Irritated", "Laughing", "Happy", "Sad", "Angry", "Eye Roll", "Finger Snaps", "Excited"];

    //Hide favorites area until a GIFs are added to it
    $("#favoriteGifsArea").hide();


    //functions ================================================================

    //Make buttons from array
    function createButtons() {
        
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>").addClass("btn btn-light gifButton");
            gifButton.attr("data-button", topics[i]).text(topics[i]);
            //load those buttons to page
            $("#gifButtons").append(gifButton);

            //Testing section
            //console.log(gifButton);
        }; 
    };
    //Load the premade buttons when the page loads.
    createButtons();
    
    // on click events/functions================================================

    //on click of the topic button, call the api, with the value of hte button and return gifs
    $("#gifButtons").on("click", ".gifButton", function() {
        var apiKey = "&api_key=BBccJQM11fXinnCUWdUrWfK9kpo2qWPq&";
        //get the search term from the search text field
        var searchTerm =  $(this).attr("data-button");
        
        //create a variable to hold the request URL plus search term and API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + apiKey + "&limit=10";

        //Testing section
        //console.log("this is the term to search: " + searchTerm);
        //console.log("this is the queryURL " + queryURL);

        //Ajax call to display the still gif for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            //create a variable to hold the repetitive part of the call
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //New div for each GIF to display the title, rating, and image
                var $gifDiv = $("<div>").addClass("gifDiv rounded");
                //Create a p tag add the rating to it
                var $p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                //Add title above image, give it title case and limit width to not run over the image width
                var $gifTitle = $("<h5>").text(results[i].title).css("textTransform", "capitalize").css("width", "260px");

                //Create img tag for each gif with a src of the still image and assign to variable
                var $gifStill = $("<img>").attr("src", results[i].images.fixed_width_still.url).addClass("gif");
                //Add the data still and animate attributes for onclick events later
                $gifStill.attr("data-still", results[i].images.fixed_width_still.url);
                $gifStill.attr("data-animate", results[i].images.fixed_width.url);
                $gifStill.attr("data-state", "still");

                //Add favorite button to each gif
                var $addFavorite = $("<button>").addClass("btn btn-light gifFave fa fa-bookmark-o").css("font-size", "18px");
                //Make the animated gif the source for the favorited images
                $addFavorite.attr("src", results[i].images.fixed_width.url);

                //Add title, image, and p variables to gifdiv
                $gifDiv.append($gifTitle,).append($gifStill).append($p);
                //Then add favorite button below the image
                $p.append($addFavorite);
                //Finally prepend the gif div and to the div for displaying gifs
                $("#displayGifs").prepend($gifDiv);
            };
        });
    });

    //onclick event to add new topic button based on text search input and then clear text input
    $(".addTopic").on("click", function(event) {
        event.preventDefault();

        //Take value from text input
        var newTopic = $("#addTopicTerm").val().trim();
        //Push new string to the topics array
        topics.push(newTopic);
        //Render text to button using createButton function
        createButtons();
        //Clear text input after hitting the Submit button
        $("#addTopicTerm").val("");
    });

    //onclick event to animate gif or still it if animated.
    $("#displayGifs").on("click", ".gif", function() {
        //Get the data-state attribute from the image that was clicked
        var gifState = $(this).attr("data-state");
        //If image state is still, then change it to the data animate src url ("get")
        //Then change its data-state to animated ("set")
        if (gifState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        //else change state to still.
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

    //on click event on add to favorite button to add to favorites div
    $("#displayGifs").on("click", ".gifFave", function() {
        //Create var for gif that is favorited, set attr to animated src URL, and make it fit into column 2 wide at full screen
        var $favoriteGif = $("<img>").attr("src", $(this).attr("src")).css("margin", "5px").css("width", "260px");
        //Append to the favorites area
        $("#favoriteGifsArea").append($favoriteGif);
        //Show area once favorite is added
        $("#favoriteGifsArea").show();
    });

})
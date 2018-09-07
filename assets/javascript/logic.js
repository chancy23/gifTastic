$(document).ready(function() {

    //intial array of gif topics to populate in buttons and to add to upon new topic creation from user
    var topics = ["Irritated", "Laughing", "Happy", "Sad", "Angry", "Eye Roll", "Finger Snaps", "Excited"];

    //hide favorites area until a GIFs are added to it
    $("#favoriteGifsArea").hide();


    //functions ================================================================

    //need to make buttons in js with the values from the topics array
    function createButtons() {
        
        $("#gifButtons").empty();
        //add text from array strings to display on button (for loop)
        for (var i = 0; i < topics.length; i++) {
            //create the button and add the class and then add the text from the for loop array
            var gifButton = $("<button>").addClass("btn btn-light gifButton");
            gifButton.attr("data-button", topics[i])
            gifButton.text(topics[i]);
            //load those buttons to page
            $("#gifButtons").append(gifButton);

            //test for buttons
            console.log(gifButton);
        }; 
    };
    //calls function to load the premade buttons when the page loads.
    createButtons();
    
    // on click events/functions================================================

    //on click of the topic button, call the api, with the value of hte button and return gifs
    $("#gifButtons").on("click", ".gifButton", function() {
        var apiKey = "&api_key=BBccJQM11fXinnCUWdUrWfK9kpo2qWPq&";
        //get the search term from the search text field
        var searchTerm =  $(this).attr("data-button");
            //console.log("this is the term to search: " + searchTerm);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + apiKey + "&limit=10";
            //test queryURL for Troubleshooting
            //console.log("this is the queryURL " + queryURL);

        //do the ajax call to display the gif as a still for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            //create a variable to hold the repetive part of the call
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //create a new div for each gif to display the rating and image
                var gifDiv = $("<div>").addClass("gifDiv rounded");

                //create a p tag add the rating to it
                var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

                //add title above image, give title case and limit width to not overlap the gif image
                var gifTitle = $("<h5>").text(results[i].title);
                gifTitle.css("textTransform", "capitalize").css("width", "260px");

                //create img tag for each gif assign to variable
                //add src attr to img and the still image url
                var gifStill = $("<img>").attr("src", results[i].images.fixed_width_still.url);
                //add the data still and animate attributes for onclick events later
                gifStill.attr("data-still", results[i].images.fixed_width_still.url);
                gifStill.attr("data-animate", results[i].images.fixed_width.url);
                gifStill.attr("data-state", "still");
                gifStill.addClass("gif");

                //add favorite button to each gif
                var addFavorite = $("<button>").addClass("btn btn-light gifFave fa fa-bookmark-o");
                addFavorite.css("font-size", "18px");
                addFavorite.attr("src", results[i].images.fixed_width.url);

                //add title, image, and p variables to gifdiv
                gifDiv.append(gifTitle).append(gifStill).append(p);

                //add favorite button below the image
                p.append(addFavorite);

                //prepend the gif div and to the div for displaying gifs
                $("#displayGifs").prepend(gifDiv);
            };
        });
    });

    //onclick event to add new topic button based on text search input and then clear text input
    $(".addTopic").on("click", function(event) {
        //stop from resetting page and allow user to hit enter as well as click
        event.preventDefault();

        //take value from text input
        var newTopic = $("#addTopicTerm").val().trim();
            //console.log("this is the new topic " + newTopic);
        
        //push new string to the topics array
        topics.push(newTopic);

        //render text to button using createButton function
        createButtons();

        //clear text input after hitting the submit button
        $("#addTopicTerm").val("");
    });

    //onclick event to animate gif or still it if animated.
    $("#displayGifs").on("click", ".gif", function() {
        var gifState = $(this).attr("data-state");
        //if gif state is still, then change it to the data animate src url
        //then change its data-state to animated
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
        //create var for gif that is favorited and add the animated src URL from the api call
        var favoriteGif = $("<img>").attr("src", $(this).attr("src"));
        //give the image some margins and set the width
        favoriteGif.css("margin", "5px").css("width", "260px");

        //append to the favorites give
        $("#favoriteGifsArea").append(favoriteGif);

        //show area once favorite is added (how to get it not to flash on page refresh though without creating with js)
        $("#favoriteGifsArea").show();

        //below is trying to get local storage to work from sandbox version **ignore**
            //localStorage.clear(); 
            //push favorite gif to the favorite gifs array
            //favoriteGifs.push(favoriteGif);
            //display the array on the page
            //$("#favoriteGifsArea").append(favoriteGifs);
            //set the array to local storage,
            //localStorage.setItem("favoritedGifs", favoriteGifs);
            //$("#favoriteGifsArea").append(localStorage.getItem("favoritedgifs"));
            //console.log("this is favorite gifs array " + favoriteGifs);
    });

})
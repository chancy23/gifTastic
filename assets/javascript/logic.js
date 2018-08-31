$(document).ready(function() {

    //intial array of gif topics to populate in buttons and to add to upon new topic creation from user
    var topics = ["Irritated", "Laughing", "Happy", "Sad", "Angry", "Eye Roll"];


    //functions ================================================================

    //need to make buttons in js with the values from the topics array
    function createButtons() {
        
        $("#gifButtons").empty();
        //add text from array strings to display on button (for loop)
        for (var i = 0; i < topics.length; i++) {
            //create the button and add the class and then add the text from the for loop array
            var gifButton = $("<button>").addClass("btn btn-outline-dark gifButton");
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
        //prevent hitting enter from refreshing page

        var apiKey = "&api_key=BBccJQM11fXinnCUWdUrWfK9kpo2qWPq&";
        var searchTerm =  $(this).attr("data-button");
            console.log("this is the term to search: " + searchTerm);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + apiKey + "&limit=10";
            //test queryURL for Troubleshooting
            console.log("this is the queryURL " + queryURL);

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
                var gifDiv = $("<div>");

                //create a p tag add the rating to it
                var p = $("<p>").text("Rating: " + results[i].rating);

                //create img tag for each gif assign to variable
                //add src attr to img and the still image url
                var gifStill = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                //add the data still and animate attributes for onclick events later
                gifStill.attr("data-still", results[i].images.fixed_height_still.url);
                gifStill.attr("data-animate", results[i].images.fixed_height.url);
                gifStill.attr("data-state", "still");
                gifStill.addClass("gif");

                //add p and image elements to the new gifDiv
                
                gifDiv.append(gifStill);
                gifDiv.append(p);

                //display gifs in dom, with the rating
                //append the div and to the div for displaying gifs
                $("#displayGifs").prepend(gifDiv);

            };
        });
    });

    //onclick event to add new topic button based on text search input and then clear text input
    $(".addTopic").on("click", function(event) {
        //stop from resetting page and allow user to hit enter as well as click
        event.preventDefault();

        //clear button area div so don't duplicate buttons
        //$("#gifButtons").empty();

        //take value from text input
        var newTopic = $("#addTopicTerm").val().trim();
            //console.log("this is the new topic " + newTopic);

        //push new string to the topics array
        topics.push(newTopic)

        //render text to button using createButton function
        createButtons();

        //clear text input after hitting the submit button
        $("#addTopicTerm").empty();
    });

    //onclick event to animate gif// or still it if animated.
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


})
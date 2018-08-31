$(document).ready(function() {

    //intial array of gif topics to populate in buttons and to add to upon new topic creation from user
    var topics = ["irritated", "laughing", "happy", "sad", "angry", "eye roll"];

    var gifButton;

    //functions ================================================================

    //need to make buttons in js with the values from the array
    function createButtons() {
        
        $("#gifButtons").empty();
        //add text from array strings to display on button (for loop)
        for (var i = 0; i < topics.length; i++) {
            //create the button and add the class and then add the text from the for loop array
            gifButton = $("<button>").addClass("btn btn-outline-dark gifButton");
            gifButton.attr("data-button", topics[i])
            gifButton.text(topics[i]);
            //load those buttons to page
            $("#gifButtons").append(gifButton);

            //test for buttons
            console.log(gifButton);
        }; 
    };
    createButtons();
    

    //on click of the topic button, call the api, with the value of hte button and return gifs
    $("#gifButtons").on("click", ".gifButton", function(event) {
        //prevent hitting enter from refreshing page
        event.preventDefault();

        var apiKey = "&api_key=BBccJQM11fXinnCUWdUrWfK9kpo2qWPq&";
        var searchTerm =  $(this).attr("data-button");
            console.log("this is the term to search: " + searchTerm);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + apiKey;
            //test queryURL for Troubleshooting
            console.log("this is the queryURL " + queryURL);
        

        //do the ajax call to display the gif as a still for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            //console.log("these are the results " + results);
            for (var i = 0; i < results.length; i++) {
                //create a new div for each gif to display the rating and image
                var gifDiv = $("<div>");

                //create a p tag add the rating to it
                var p = $("<p>").text("Rating: " + results[i].rating);

                //create img tag for each gif assign to variable
                //add src attr to img
                var gifStill = $("<img>").attr("src", results[i].images.original_still.url)

                //add image to p element and add p element to the new gifDiv
                p.append(gifStill);
                gifDiv.append(p);

                //append the div and its contents to the div for displaying gifs
                $("#displayGifs").prepend(gifDiv);

            };
        });
    });

    //display gifs in dom, with the rating

    //need to make new buttons based on user input and add to page (use create Buttons function)

    //when user clicks on those, needs to call the giphy api and display with rating

    //do a clear button to reset the dom/remove added buttons



    // on click events=================

    
    










})
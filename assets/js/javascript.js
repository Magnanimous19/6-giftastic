$(document).ready(function() {

    var topics = ["Dog", "Cat", "Rabbit", "Bird"];

    $("#enterButton").on("click", function(event) {
        event.preventDefault();

        var userInput = $("#user-input").val();
        topics.push(userInput);

        displayBtn();

    });

    //Function for Gify
    function gifOutput() {
        var animalName = $(this).attr("animal-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.attr({'data-still' : results[i].images.fixed_height_still.url});
                animalImage.attr({'data-state' : "still"});                
                animalImage.attr({'data-animate' : results[i].images.fixed_height.url});
                animalImage.addClass("image");
            
                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gifsHere").prepend(animalDiv);
            }
        });    
    }

    //Function for Buttons
    function displayBtn() {
        $("#buttonSpace").empty();

            for (var i = 0; i < topics.length; i++) {
                var btn = $(`<button>`);
                btn.addClass("btn-default");
                btn.addClass("btn");
                btn.addClass("gif-btn");
                btn.attr("animal-name", topics[i]);
                btn.text(topics[i]);
                $("#buttonSpace").append(btn);
            }
    }

    displayBtn();

    //Still or Animate Gifs 
    $(document).on("click", ".gif-btn", gifOutput);
    $(document).on("click", ".image", function() {  

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
    });
});


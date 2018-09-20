var topics = ["Ouch", "Sorry", "Florida", "Oops", "Great White", "Messi Skills", "Explosion", "Denver", "Hmm", "Wink"];

var buttons = 10;

function displayGifs() {

  var gifSearch = $(this).attr("data-name");
  console.log(gifSearch);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EWaEUtoOHx2oq192nJfWzXjbVuiTu3IF&q=" + gifSearch + "&limit=10&offset=0&rating=PG-13&lang=en";

  // Creating an AJAX call for the specific gify button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Creating a div to hold the gifs
    var gifDiv = $("<div class='holding'>");

    // Storing the response data
    var repo = response.data;


    for (var i = 0; i < repo.length; i++) {

      var rating = repo[i].rating;
      console.log(rating);

      // Creating an element to have the rating displayed
      var rate = $("<p>").html("Rating: " + rating);
      rate.attr("class", "rating");


      // Retrieving the URL for the still gif
      var stillURL = repo[i].images.fixed_height_still.url;

      // Retrieving the URL for the  moving gif
      var movingURL = repo[i].images.fixed_height.url;

      // Creating an element to hold the gif
      var stillimage = $('<img>').attr("src", stillURL)
        .attr("data-gif", movingURL)
        .attr("data-index", i)
        .attr("data-img", stillURL)
        .attr("class", "stillimage");


      // Appending the gifs
      gifDiv.append(stillimage);

      // Adding them to html
      $("#gifsholder").html(gifDiv);

    }

  });

}


// Function for displaying gif data
function myButtons() {

  $("#buttonsholder").empty();

  // Looping through the array of gif topics
  for (var i = 0; i < topics.length; i++) {


    var a = $("<button>");

    a.addClass("my-button");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttonsholder").append(a);

  }
}

// This function handles the search 
$("#addgif").on("click", function (event) {
  event.preventDefault();


  var gifSubmit = $("#gifsearch").val().trim();

  if (gifSubmit == "") {
    return;
  } else if (buttons == 10) {
    topics.shift();
    $("button:first").remove();
    topics.push(gifSubmit);
    myButtons();



  } else {

    topics.push(gifSubmit);
    buttons++;

    myButtons();
  }
});

$(document).on("click", ".my-button", displayGifs);

// Calling the myButtons function to display my topics
myButtons();

// Switching between gif-states
$(document).on("click", ".stillimage", function () {
  var index = $(this).attr("data-index");
  var state = $(this).attr("data-gif");
  var state2 = $(this).attr("data-img");
  console.log(index);
  console.log(state);
  if ($(this).attr("src") == state2) {
    $(this).attr("src", state);
  }
  else {
    $(this).attr("src", state2);
  };
});






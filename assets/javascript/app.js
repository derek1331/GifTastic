var gifs = ["Children Falling", "Deal With It", "Florida", "The Leftovers", "Tom Brady", "Messi Skills", "Hot Dog Eating", "The Challenge CT", "Hmm"];


// displayMovieInfo function re-renders the HTML to display the appropriate content

function displayMovieInfo() {

  var fify = $(this).attr("data-name");
  console.log(fify);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EWaEUtoOHx2oq192nJfWzXjbVuiTu3IF&q=" + fify + "&limit=10&offset=0&rating=PG-13&lang=en";


  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // Storing the response data
    var repo = response.data;
    

    for (var i = 0; i < repo.length; i++) {

      var rating = repo[i].rating;
      console.log(rating);

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      movieDiv.append(pOne);

      // Retrieving the URL for the still image
      var stillURL = repo[i].images.fixed_height_still.url;
      
      // // Retrieving the URL for the  moving image
      // var movingURL = repo[i].images.fixed_height.url;
      
      
      // Creating an element to hold the image
      var stillimage = $('<img>').attr("src", stillURL);

      // Appending the image
      movieDiv.append(stillimage);

      // Putting the entire movie above the previous movies
      $("#movies-view").prepend(movieDiv);

      // $(".temp").on("click", function (event) {
      //   event.preventDefault();
      //   movieDiv.append(movingimage);
      // });





    }

  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("hello");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".hello", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


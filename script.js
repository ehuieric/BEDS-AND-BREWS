//displays last search result upon reloading
function setInitialDisplay() {

  if (!localStorage.getItem("searchedCity")) {
    breweryCall("Cleveland");
    hotelSearch("Cleveland");
  } else {
    breweryCall(localStorage.getItem("searchedCity"));
    hotelSearch(localStorage.getItem("searchedCity"));
  }
}

//calls setInitialDisplay function
setInitialDisplay();

//Brewery API call
function breweryCall(inputtedCity) {

  var cityName = inputtedCity;
  var breweryType = $("#breweryType").val();
  var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityName;
  
  //Updates the breweryURL if a breweryType was selected
  if (breweryType) {
    breweryURL = breweryURL + "&by_type=" + breweryType;
  }

  $.ajax({

    url: breweryURL,

    method: "GET"

  }).then(function (response) {

    //Grabs the HTML element that the api information will be appended too
    var mainDiv = $(".breweries");

    //clear previous search results
    mainDiv.empty();

    //sets variable to the length of the array returned by the API call
    var arrayLength = response.length;

    //Loop to display multiple resutls
    for (var i = 0; i < arrayLength; i++) {

      //created variables for the inforamtion we want to display
      var breweryName = response[i].name;
      var breweryAddress = response[i].street;
      var breweryWebsite = response[i].website_url;

      //create html elements to display information
      var createdDiv = $("<div>").attr("class", "brewery box");
      var createdH2 = $("<h2>" + breweryName + "<h2>").attr("class", "breweryName");
      var createdP1 = $("<p> <span>Address:</span> " + breweryAddress + "<p>").attr("class", "breweryAddress");
      var createdP2 = $("<p> <span>Website:</span> <a href=" + breweryWebsite + ">" + breweryWebsite + "</a></p>").attr("class", "breweryWebsite");

      //appends created HTML elements
      createdDiv.append(createdH2, "<hr>", createdP1, createdP2)
      mainDiv.append(createdDiv);
    }
  })
}

//add click event to search button
//calls the API functions
$(".searchButton").on("click", function (event) {

  event.preventDefault();

  var inputtedCity = $(".input").val();

  //sets local storage
  localStorage.setItem("searchedCity", inputtedCity);

  breweryCall(inputtedCity);
  hotelSearch(inputtedCity);
});

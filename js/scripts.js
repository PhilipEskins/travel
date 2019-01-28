function TravelLog () {
  this.places = [];
}

TravelLog.prototype.addPlace = function(place) {
  this.places.push(place);
}

TravelLog.prototype.findPlace = function(location) {
  for (var i=0; i<this.places.length; i++) {
    if (this.places[i].location == location) {
      return this.places[i];
    }
  };
  return false;
}

// Business logic for Places --------
function Place(location, landmarks, timeOfYear, notes) {
  this.location = location,
  this.landmarks = landmarks,
  this.timeOfYear = timeOfYear,
  this.notes = notes;
}


//User Interface Logic --------

var travelLog = new TravelLog();

function displayPlaces(travelLogToDisplay) {
  var placeList = $("ul#places");
  var htmlForPlaceInfo= "";
  travelLogToDisplay.places.forEach(function(place){
    htmlForPlaceInfo += "<li id= " + place.location + ">" + place.location + "</li>";
  });
  placeList.html(htmlForPlaceInfo);
}

function showPlace(placeShowing) {
  var place = travelLog.findPlace(placeShowing);
  $("#show-place").show();
  $(".location").html(place.location);
  $(".landmark").html(place.landmarks);
  $(".time").html(place.timeOfYear);
  $(".note").html(place.notes);
}

function attachPlaceListeners () {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
};

$(document).ready(function() {
  attachPlaceListeners();
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    var inputtedLocation = $("input#new-location").val();
    var inputtedLandmark = $("input#new-landmark").val();
    var inputtedTime = $("input#new-time").val();
    var inputtedNote = $("input#new-note").val();
    var newEntry = new Place(inputtedLocation, inputtedLandmark, inputtedTime, inputtedNote);
    travelLog.addPlace(newEntry);
    displayPlaces(travelLog);
  })
})

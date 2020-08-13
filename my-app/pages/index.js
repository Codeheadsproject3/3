let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;

console.log('hi')
function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */
infoPane = document.getElementById('panel');

    // Try HTML5 geolocation
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 12
        });
        bounds.extend(pos);

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);

        /* TODO: Step 3B2, Call the Places Nearby Search */
        getNearbyPlaces(pos);
    }, () => {
        // Browser supports geolocation, but user has denied permission
        handleLocationError(true, infoWindow);
    });
    } else {
    // Browser doesn't support geolocation
    handleLocationError(false, infoWindow);
    }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Sydney, Australia
    pos = {lat: 43.0731, lng: -89.4012};
    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 12
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Geolocation permissions denied. Using default location.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    getNearbyPlaces(pos);
}
// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
    location: position,
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: 'dog park'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
    }
}

// Set markers at the location of each place result
function createMarkers(places) {
    places.forEach(place => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
    });

    
// Add click listener to each marker
google.maps.event.addListener(marker, 'click', () => {
    let request = {
    placeId: place.place_id,
    fields: ['name', 'formatted_address', 'geometry', 'rating',
        'website', 'photos', 'place_id']
    };
    /* Only fetch the details of a place when the user clicks on a marker.
    * If we fetch the details for all place results as soon as we get
    * the search response, we will hit API rate limits. */
    service.getDetails(request, (placeResult, status) => {
    showDetails(placeResult, marker, status)
    console.log(`This is the place ID: ${request.placeId}`)
    console.log(`This is the places info: ${JSON.stringify(placeResult)}`)
    console.log(`This is the places info: ${placeResult.name}`)
    console.log(`This is the places info: ${placeResult.rating}`)
    const parkData = {
        parkID: request.placeId, //figure out what we are calling these columns
        name: placeResult.name,
        address: placeResult.formatted_address,
        rating:placeResult.rating,
        popularity: 0
    }

    returnParkData(parkData.parkID)
    
    $.ajax("/maps/api",{
        type: "POST",
        data: parkData
    }).then(function(){
        console.log(`New park added to table`);
    });
    /*$.ajax({
    url : "/maps/api", // Url of backend (can be python, php, etc..)
    type: "POST", // data type (can be get, post, put, delete)
    data : parkData, // data in json format
  	async : true, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
    success: function(response, textStatus, jqXHR) {
    	console.log(response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
		console.log(jqXHR);
      	console.log(textStatus);
      	console.log(errorThrown);
    }
}); */
    
    });
});


    // Adjust the map bounds to include the location of this marker
    bounds.extend(place.geometry.location);
    });
    /* Once all the markers have been placed, adjust the bounds of the map to
    * show all the markers within the visible area. */
    map.fitBounds(bounds);
}

// Builds an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    let placeInfowindow = new google.maps.InfoWindow();
    placeInfowindow.setContent('<div><h4><strong>' + placeResult.name +
        '</strong></h4>' + '<h4>Rating: ' + placeResult.rating + '</h4>' + `<a href="/dashboard/${placeResult.place_id}" id="thread" data-id='${placeResult.place_id}' class="btn btn-primary btn-block">Go to thread</a>` + '</div>');
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    //showPanel(placeResult);
    } else {
    console.log('showDetails failed: ' + status);
    }
}
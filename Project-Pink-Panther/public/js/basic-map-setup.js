function initMap() {
  const myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 12,
    styles: mapStyles.silver,
  });

  getCoords(myMap);
  getUploads(myMap);
  sendCoords();
}

function getCoords(map) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      centerMap(position.coords, map);
    },
    (error) => console.log("ERROR", error)
  );
}

function centerMap({ latitude, longitude }, map) {
  const position = { lat: latitude, lng: longitude };
  map.setCenter(position);

  new google.maps.Marker({ position, map, title: "Tu ubicacion" });
}

function getUploads(map) {
  axios
    .get("/api/uploads")
    .then((response) => printUploads(response.data, map))
    .catch((err) => console.log(err));
}

function printUploads(uploads, map) {
  uploads.forEach((elm) => {
    let position = {
      lat: elm.location.coordinates[0],
      lng: elm.location.coordinates[1],
    };

    new google.maps.Marker({ map, position });
  });
}

// function sendCoords(coords) {
//     document.querySelector('#lng').value = coords.longitude
//     document.querySelector("#lat").value = coords.latitude;

// }
function sendCoords() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      document.querySelector("#lng").value = position.coords.longitude;
      document.querySelector("#lat").value = position.coords.latitude;
    },
    (error) => console.log("ERROR", error)
  );
}

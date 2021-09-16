function initMap() {
  const myMap = new google.maps.Map(document.querySelector("#myMap"), {
    zoom: 15,
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

function sendCoords() {
  const lngInput = document.querySelector("#lng");
  const latInput = document.querySelector("#lat");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (lngInput) lngInput.value = position.coords.longitude;
      if (latInput) latInput.value = position.coords.latitude;
    },
    (error) => console.log("ERROR", error)
  );
}

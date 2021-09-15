function initMap() {

    const myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,
            styles: mapStyles.silver
        }
    )
    
    getCoords(myMap)
    getUploads(myMap)
}


function getCoords (map) {

    navigator.geolocation.getCurrentPosition(
        position => centerMap(position.coords, map),
        error => console.log('ERROR', error)
    )
}


function centerMap ({ latitude, longitude }, map) {
    const position = { lat: latitude, lng: longitude }
    map.setCenter(position)

    new google.maps.Marker({ position, map, title: "Tu Ubicacion" })
}



function getUploads(map) {

    axios
        .get('/api/uploads')
        .then(response => printUploads(response.data, map))
        .catch(err => console.log(err))
}


function printUploads(uploads, map) {

    uploads.forEach(elm => {

        let position = {
            lat: elm.location.coordinates[0],
            lng: elm.location.coordinates[1]
        }

        new google.maps.Marker({ map, position, title: document.querySelector('#tagName').innerText})
    })
}

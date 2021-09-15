function initMap() {

    const myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 12,
            center: directions.ironhackMAD.coords,
            styles: mapStyles.silver
        }
    )

    new google.maps.Marker({
        map: myMap,
        position: directions.ironhackMAD.coords,
        title: directions.ironhackMAD.title
    })

    getPlaces(myMap)
}

function getPlaces(map) {

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

        new google.maps.Marker({ map, position, title: elm.name })
    })
}

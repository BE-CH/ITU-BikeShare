let lat, long;

function initMap() {
    // The location of Uluru
    const copenahgen = { lat: 55.71, lng: 12.57 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: copenahgen,
    });

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement('button');
    locationButton.textContent = 'Find lokation';
    locationButton.classList.add('custom-map-control-button');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener('click', () => {
        // Try HTML5 geolocation.
        loader(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    loader(false);
                    calcNearestLocation(pos);
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Du er her.');
                    infoWindow.open(map);
                    new google.maps.Marker({
                        position: pos,
                    });
                    map.setCenter(pos);
                    map.setZoom(12);
                },
                () => {
                    handleLocationError(true, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
        }
    });

    const markers = allLocations.map((location, i) => {
        const image = {
            url: 'images/shop.svg',

            scaledSize: new google.maps.Size(35, 35),
        };

        const marker = new google.maps.Marker({
            position: location.coord,
            title: location.name,
            label: location.name,
            map,
            icon: image,
            optimized: true,
        });

        marker.addListener('click', () => {
            openShop(i);
        });
        return marker;
    });

    new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Fejl: Vi kan ikke finde din lokation.' : 'Fejl: Din browser giver ikke tilladelse til at finde lokation.');
    infoWindow.open(map);
}

let shopIsOpen = false;
function openShop(location) {
    let shopInfo = document.getElementById('shopInfo');
    if (shopIsOpen) {
        $('#shopInfo').removeClass('shopInfo').delay(200);
        shopInfo.innerHTML = '';
    }
    $('#shopInfo').addClass('shopInfo');

    let shop = getLocalStorage('allLocations')[location];

    let nameHeader = document.createElement('h5');
    let nameTxt = document.createTextNode(shop.name);
    nameHeader.appendChild(nameTxt);

    let addressField = document.createElement('p');
    let addressTxt = document.createTextNode(shop.address);
    addressField.appendChild(addressTxt);

    let openingHoursField = document.createElement('p');
    let openingHours = document.createTextNode('Åbent hver dag: ' + shop.openingHours);
    openingHoursField.appendChild(openingHours);

    let bikesStored = document.createElement('p');
    let bikes = document.createTextNode('Ledige cykler: ' + shop.availableBikes);
    bikesStored.appendChild(bikes);

    let button = document.createElement('button');
    if (shop.availableBikes > 0) {
        button.setAttribute('onclick', `location.href='rentBike.html?location=${location}'`);
        let butTxt = document.createTextNode('Gå til butik');
        button.appendChild(butTxt);
    } else {
        button.setAttribute('disabled', 'true');
        button.classList.add('noBikes');
        let butTxt = document.createTextNode('Ingen ledige cykler. Vælg en anden shop.');
        button.appendChild(butTxt);
    }

    shopInfo.append(nameHeader, addressField, openingHours, bikesStored, button);

    shopIsOpen = true;
}

function loader(open) {
    if (open) {
        let image = document.createElement('img');
        image.setAttribute('src', 'images/loader.gif');
        image.setAttribute('id', 'loader');
        document.getElementById('mapContainer').appendChild(image);
    } else {
        document.getElementById('loader').remove();
    }
}

function calcNearestLocation(pos) {
    const locations = getLocalStorage('allLocations');
    let minDist = Number.POSITIVE_INFINITY;
    let closestLocation = undefined;
    for (let i = 0; i < locations.length; i++) {
        if (haversine(pos, locations[i].coord) < minDist) {
            closestLocation = i;
            minDist = haversine(pos, locations[i].coord);
        }
    }
    openShop(closestLocation);
    let distanceAway = document.createElement('p');
    distanceAway.setAttribute('id', 'distanceAway');
    let distText = minDist < 1000 ? Math.round(minDist * 10) / 10 + ' meter væk' : Math.round((minDist / 1000) * 10) / 10 + ' km væk';
    let dist = document.createTextNode(distText);
    distanceAway.appendChild(dist);
    document.getElementById('shopInfo').appendChild(distanceAway);
}

function haversine(pos1, pos2) {
    const R = 6371e3; // metres
    const lat1 = (pos1.lat * Math.PI) / 180;
    const lat2 = (pos2.lat * Math.PI) / 180;
    const latDiff = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const longDiff = ((pos2.lng - pos1.lng) * Math.PI) / 180;

    const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(longDiff / 2) * Math.sin(longDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}

function initMap() {
    // The location of Uluru
    const copenahgen = { lat: 55.71, lng: 12.57 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: copenahgen,
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

let shopIsOpen = false;
function openShop(location) {
    let shopInfo = document.getElementById('shopInfo');
    if (shopIsOpen) {
        $('#shopInfo').removeClass('shopInfo').delay(200);
        shopInfo.innerHTML = '';
    }
    $('#shopInfo').addClass('shopInfo');

    let shop = allLocations[location];

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
    button.setAttribute('onclick', `location.href='rentBike.html?location=${location}'`);
    let butTxt = document.createTextNode('Gå til butik');
    button.appendChild(butTxt);

    shopInfo.append(nameHeader, addressField, openingHours, bikesStored, button);

    shopIsOpen = true;
}

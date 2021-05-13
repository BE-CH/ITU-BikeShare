let bikeTypes = {
    citybike: {
        title: 'Citybike',
        description:
            'Avenue Broadway er en smart citybike med et gennemført flot design. Cyklen har 7 indvendige Shimano gear og rullebremser,  samt hydroformede aluminiumsrør gør denne citybike perfekt til kørsel på jævnt terran.',
        img: 'citybike.png',
    },
    mountainbike: {
        title: 'Mountain bike',
        description: 'Superior XP 979 er en hurtig mountainbike perfekt til offroading. Cyklen er udstyret med 1x12 Shimano XT/SLX gear og Shimano XT hydrauliske skivebremser.',
        img: 'mountainbike.png',
    },
    ladybike: {
        title: 'Damecykel',
        description:
            'Kildemoes City 257 er en praktisk damecykel med lav indstigning. Den er bygget på et holdbart og let stel i aluminium. Cyklen er udstyret med 7 indvendige gear, en fodbremse samt en fælgbremse. ',
        img: 'damecykel.png',
    },
    ebike: {
        title: 'Elcykel',
        description:
            'Riese & Müller superchargeren praler ikke med sine indre værdier, den har dem bare. To integrerede Bosch PowerTube batterier.  Magura MT4 skivebremser, luftaffjedring og store dæk.',
        img: 'elcykel.png',
    },
    echristania: {
        title: 'El ladcykel',
        description:
            'Mustang Family elladcykel har kraftige skivebremser, parkeringsbremse og 4 børneseler  så der er fuld fokus på sikkerheden. Mustang Family er både sikker for dig og din familie. ',
        img: 'elLadcykel.png',
    },
};

const apiKey = 'AIzaSyCKOqKObTh0OqKcHyFiq19fNiIWW9PyLWg';

let allLocations = [
    {
        name: 'FriBikeShop Østerbro',
        availableBikes: 10,
        coord: { lat: 55.7072734, lng: 12.5755586 },
        address: 'Østerbrogade 140, 2100 København',
        openingHours: '10-17',
    },
    {
        name: 'BartHolt Cykler',
        availableBikes: 7,
        coord: { lat: 55.7069002, lng: 12.5755175 },
        address: 'Østerbrogade 138, 2100 København',
        openingHours: '09-17',
    },
    {
        name: 'Saxil Cykler Østerbro',
        availableBikes: 11,
        coord: { lat: 55.7056537, lng: 12.5738675 },
        address: 'Østerfælled Torv 19, 2100 København',
        openingHours: '10-22',
    },
    {
        name: 'CykelExperten Vanløse',
        availableBikes: 10,
        coord: { lat: 55.6978498, lng: 12.4726715 },
        address: 'Slotsherrensvej 103, 2720 Vanløse',
        openingHours: '08-15',
    },
];

function initMap() {
    // The location of Uluru
    const copenahgen = { lat: 55.71, lng: 12.57 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
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
        $('#shopInfo').removeClass('shopInfo', () => {
            $('#shopInfo').addClass('shopInfo');
        });
        shopInfo.innerHTML = '';
    } else {
        $('#shopInfo').addClass('shopInfo');
    }

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
    let butTxt = document.createTextNode('Gå til butik');
    button.appendChild(butTxt);

    shopInfo.append(nameHeader, addressField, openingHours, bikesStored, button);

    shopIsOpen = true;
}

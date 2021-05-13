let allbikes = {
    citybike: {
        title: "Citybike",
        description: "Avenue Broadway er en smart citybike med et gennemført flot design. Cyklen har 7 indvendige Shimano gear og rullebremser,  samt hydroformede aluminiumsrør gør denne citybike perfekt til kørsel på jævnt terran.",
        img: "citybike.png"
    }, 
    mountainbike: {
        title: "Mountain bike",
        description: "Superior XP 979 er en hurtig mountainbike perfekt til offroading. Cyklen er udstyret med 1x12 Shimano XT/SLX gear og Shimano XT hydrauliske skivebremser.",
        img: "mountainbike.png"
    },
    ladybike: {
        title: "Damecykel",
        description: "Kildemoes City 257 er en praktisk damecykel med lav indstigning. Den er bygget på et holdbart og let stel i aluminium. Cyklen er udstyret med 7 indvendige gear, en fodbremse samt en fælgbremse. ",
        img: "damecykel.png"
    },
    ebike: {
        title: "Elcykel",
        description: "Riese & Müller superchargeren praler ikke med sine indre værdier, den har dem bare. To integrerede Bosch PowerTube batterier.  Magura MT4 skivebremser, luftaffjedring og store dæk.",
        img: "elcykel.png"
    },
    echristania: {
        title: "El ladcykel",
        description: "Mustang Family elladcykel har kraftige skivebremser, parkeringsbremse og 4 børneseler  så der er fuld fokus på sikkerheden. Mustang Family er både sikker for dig og din familie. ",
        img: "elLadcykel.png"
    }
}

const apiKey = "AIzaSyCKOqKObTh0OqKcHyFiq19fNiIWW9PyLWg";

let allLocations = [
    {
        name: "FriBikeShop Østerbro",
        availableBikes: 10,
        coord: {lat: 55.71, lng: 12.57}
    }, 
    {
        name: "BartHolt Cykler Østerbro",
        availableBikes: 7,
        coord: {lat: 55.51, lng: 12.27}
    },
    {
        name: "Saxil Cykler Østerbro",
        availableBikes: 11,
        coord: {lat: 55.65, lng: 12.87}
    },
    {
        name: "Amager cykler",
        availableBikes: 10,
        coord: {lat: 55.65, lng: 12.3}
    }
]

function initMap() {
    // The location of Uluru
    const uluru = { lat: 55.71, lng: 12.57 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: uluru,
    });

    const markers = allLocations.map((location, i) => {
        return new google.maps.Marker({
        position: location.coord,
        label: labels[i % labels.length],
        });
    });

    new MarkerClusterer(map, markers, {
        imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}
const bikeTypesStorage = localStorage.getItem('bikeTypes');
const allLocationsStorage = localStorage.getItem('allLocations');
const allFaqsStorage = localStorage.getItem('allFaqs');
const activeRentStorage = localStorage.getItem('activeRent');
const accountsStorage = localStorage.getItem('accounts');
const sessionStorage = localStorage.getItem('session');

$(document).ready(() => {
    if (allLocationsStorage === null) {
        localStorage.setItem('allLocations', JSON.stringify(allLocations));
    }

    if (activeRentStorage === null) {
        localStorage.setItem('activeRent', JSON.stringify(activeRent));
    }

    if (accountsStorage === null) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    if (!isLoggedIn()) {
        if ($('#scripttag').data('page') !== 'login' && $('#scripttag').data('page') !== 'createAccount') {
            window.location.replace('login.html');
        }
    }
});

let bikeTypes = {
    citybike: {
        title: 'Citybike',
        description:
            'Avenue Broadway er en smart citybike med et gennemført flot design. Cyklen har 7 indvendige Shimano gear og rullebremser,  samt hydroformede aluminiumsrør gør denne citybike perfekt til kørsel på jævnt terran.',
        img: 'citybike.png',
        price: {
            hour: [100, 150, 200],
            allDay: 250,
            minute: 2.5,
        },
    },
    mountainbike: {
        title: 'Mountain bike',
        description: 'Superior XP 979 er en hurtig mountainbike perfekt til offroading. Cyklen er udstyret med 1x12 Shimano XT/SLX gear og Shimano XT hydrauliske skivebremser.',
        img: 'mountainbike.png',
        price: {
            hour: [100, 150, 200],
            allDay: 350,
            minute: 3,
        },
    },
    ladybike: {
        title: 'Damecykel',
        description:
            'Kildemoes City 257 er en praktisk damecykel med lav indstigning. Den er bygget på et holdbart og let stel i aluminium. Cyklen er udstyret med 7 indvendige gear, en fodbremse samt en fælgbremse. ',
        img: 'damecykel.png',
        price: {
            hour: [125, 175, 200],
            allDay: 250,
            minute: 2.5,
        },
    },
    ebike: {
        title: 'Elcykel',
        description:
            'Riese & Müller superchargeren praler ikke med sine indre værdier, den har dem bare. To integrerede Bosch PowerTube batterier.  Magura MT4 skivebremser, luftaffjedring og store dæk.',
        img: 'elcykel.png',
        price: {
            hour: [150, 175, 200],
            allDay: 300,
            minute: 3.5,
        },
    },
    echristania: {
        title: 'El ladcykel',
        description:
            'Mustang Family elladcykel har kraftige skivebremser, parkeringsbremse og 4 børneseler  så der er fuld fokus på sikkerheden. Mustang Family er både sikker for dig og din familie. ',
        img: 'elLadcykel.png',
        price: {
            hour: [200, 250, 275],
            allDay: 350,
            minute: 4.5,
        },
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

let allFaqs = [
    {
        title: 'Kom godt i gang',
        faqs: [
            {
                question: 'Hvilke platforme understøtter BikeShare?',
                answer: 'BikeShare kan tilgås på alle web browsere, samt ved hjælp af BikeShare-appen som kan hentes både på IOS og til Android',
                id: 1,
            },
            {
                question: 'Hvor skal cyklerne afleveres?',
                answer: 'Cyklerne kan afleveres i en cykelshop nær dig. Vi udvidder konstant antallet af cykelshops rundt omkring i landet, og dækker på nuværende tidspunkt omkring 80% af Danmark.',
                id: 2,
            },
            {
                question: 'Hvordan lejer jeg en cykel?',
                answer: 'Hent BikeShare-appen, eller brug vores webside. Opret en konto og tilføj de relevante oplysninger samt et betalingskort, så er du klar til at køre. Du kan finde cykler tæt på dig og priser under “Lej en cykel”',
                id: 3,
            },
        ],
    },
    {
        title: 'Om vores cykler',
        faqs: [
            {
                question: 'Hvem kan passe cyklerne?',
                answer: 'Alle cyklerne passer til personer, der måler ca. 155 cm eller mere. Tilpas sadlen ved at bruge håndtaget under sadlen. Cyklerne passer ikke til børn, og der er ikke mulighed for børnesæder.',
                id: 4,
            },
            {
                question: 'Er alle cyklerne forsikret?',
                answer: 'Ja. Alle BikeShare cykler er dækket af tredjeparts forsikring selskaber og du vil blot skulle betale en selvrisiko i tilfælde af der skulle ske et uheld. Denne pris reduceres automatisk til et specifikt beløb afhængig af ulykken. ',
                id: 5,
            },
            {
                question: 'Hvor hurtigt kan en el-cykel kører?',
                answer: 'Bycyklerne har en elmotor, der assisterer dig op til 23 km/t og ladcyklen op til 15 km/t. Motoren giver kun assistance, når du træder pedalerne rundt. Når du bruger bremserne, slår motoren automatisk fra.',
                id: 6,
            },
        ],
    },
];

let activeRent = {
    active: false,
};

let accounts = [];

function getLocalStorage(string) {
    return JSON.parse(localStorage.getItem(string));
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};

function isLoggedIn() {
    if (sessionStorage === null) {
        return false;
    } else {
        const session = getLocalStorage('session');
        const email = session.split(':')[0];
        const password = session.split(':')[1];
        let emailFound = false;
        let emailI = 0;

        for (let i = 0; i < getLocalStorage('accounts').length; i++) {
            const acc = getLocalStorage('accounts')[i];
            if (acc.email === atob(email)) {
                emailFound = true;
                emailI = i;
                break;
            }
        }

        if (emailFound) {
            if (getLocalStorage('accounts')[emailI].password === password) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

function getUserInfo(key) {
    if (isLoggedIn()) {
        const session = getLocalStorage('session');
        const email = session.split(':')[0];
        const password = session.split(':')[1];
        let emailFound = false;
        let emailI = 0;

        for (let i = 0; i < getLocalStorage('accounts').length; i++) {
            const acc = getLocalStorage('accounts')[i];
            if (acc.email === atob(email)) {
                emailFound = true;
                emailI = i;
                break;
            }
        }

        if (emailFound) {
            return getLocalStorage('accounts')[emailI][key];
        } else {
            return null;
        }
    }
}

const currentLocation = new URLSearchParams(window.location.search).get('location');
$('#shopName').text(getLocalStorage('allLocations')[currentLocation].name);

function setupRent() {
    let bikePicker = document.getElementById('bikePicker');

    let select = document.createElement('select');

    Object.keys(bikeTypes).forEach((key) => {
        let option = document.createElement('option');
        let optionTxt = document.createTextNode(bikeTypes[key].title);
        option.setAttribute('value', key);
        option.appendChild(optionTxt);
        select.appendChild(option);
    });

    select.setAttribute('name', 'bikeSelector');
    select.setAttribute('id', 'bikeType');
    select.setAttribute('onchange', 'changeBike()');

    let label = document.createElement('label');
    let labelTxt = document.createTextNode('Vælg cykeltype: ');
    label.appendChild(labelTxt);
    label.setAttribute('for', 'bikeSelector');

    bikePicker.append(label, select);
    changeBike();
}

// The chosen bike.
let activeBike = false;

function changeBike() {
    let bike = document.getElementById('bikeType').value;

    if (activeBike) {
        document.getElementById('currentBike').remove();
    }
    activeBike = true;

    let container = document.createElement('div');
    container.setAttribute('class', 'bikecard');
    container.setAttribute('id', 'currentBike');

    let titleCon = document.createElement('h3');
    let titleTxt = document.createTextNode(bikeTypes[bike].title);
    titleCon.appendChild(titleTxt);

    let image = document.createElement('img');
    image.setAttribute('src', 'images/' + bikeTypes[bike].img);

    let prices = [];
    Object.keys(bikeTypes[bike].price).forEach((key) => {
        if (key == 'hour') {
            for (let i = 0; i < bikeTypes[bike].price[key].length; i++) {
                let time = i == 0 ? 'Time' : 'Timer';
                prices.push(createLine(i + 1 + ' ' + time, bikeTypes[bike].price[key][i], bike));
            }
        } else if (key == 'allDay') {
            prices.push(createLine('Hel dag', bikeTypes[bike].price[key], bike));
        } else if (key == 'minute') {
            prices.push(createLine('Minutpris', bikeTypes[bike].price[key], bike));
        }
    });

    let priceContainer = document.createElement('div');
    priceContainer.setAttribute('id', 'priceContainer');
    prices.forEach((div) => {
        priceContainer.appendChild(div);
    });
    container.append(titleCon, image, priceContainer);

    document.getElementById('bikePicker').appendChild(container);
}

function createLine(text, value, bike) {
    let container = document.createElement('div');
    container.setAttribute('class', 'price');

    let field = document.createElement('p');
    let fieldTxt = document.createTextNode(text);
    field.appendChild(fieldTxt);

    let priceField = document.createElement('p');
    let price = document.createTextNode(value + ',-');
    priceField.appendChild(price);

    let button = document.createElement('button');
    let butTxt = document.createTextNode('Lej!');
    button.appendChild(butTxt);
    button.setAttribute('class', 'rentBut');
    button.setAttribute('onclick', 'modal("' + bike + '","' + value + '","' + text + '")');

    container.append(field, priceField, button);
    return container;
}

function rent(bike, price, time) {
    let pickupTime;
    try {
        pickupTime = document.getElementById('timeSelector').value;
    } catch (e) {}
    let timeamount = time.split(' ');
    if (timeamount.length == 2 && (timeamount[1] == 'Time' || timeamount[1] == 'Timer')) {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() + 2);
        setLocalStorage('activeRent', {
            start: pickupTime,
            startDate,
            pickupTime,
            bike,
            price,
            location: currentLocation,
        });
        updateLocation();
    } else if (timeamount.length == 2 && timeamount[1] == 'dag') {
        startDate.setHours(pickupTime.split(':')[0]);
        startDate.setMinutes(pickupTime.split(':')[1]);
        setLocalStorage('activeRent', {
            start: pickupTime,
            startDate,
            pickupTime,
            bike,
            price,
            location: currentLocation,
        });
        updateLocation();
    } else if (timeamount.length == 1) {
        const date = new Date();
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        currentTime = hours + ':' + minutes;
        setLocalStorage('activeRent', {
            bike,
            price,
            location: currentLocation,
            start: currentTime,
            startDate: date,
        });
        updateLocation();
    } else {
        console.error('Error');
    }
}

let openModal = false;

function modal(bike, price, time) {
    let timeamount = time.split(' ');
    if (openModal) {
        document.getElementById('confirmModal').remove();
    }
    let container = document.createElement('div');
    container.setAttribute('id', 'confirmModal');

    let header = document.createElement('h3');
    let headerTxt = document.createTextNode('Lej en: ' + bikeTypes[bike].title + ' i ' + time);
    header.appendChild(headerTxt);
    container.appendChild(header);

    if (timeamount.length == 2 && (timeamount[1] == 'Time' || timeamount[1] == 'Timer' || timeamount[1] == 'dag')) {
        let pickup = document.createElement('input');
        if (timeamount[1] == 'dag') {
            pickup.setAttribute('type', 'date');
        } else {
            pickup.setAttribute('type', 'time');
        }
        pickup.setAttribute('name', 'selectTime');
        pickup.setAttribute('id', 'timeSelector');
        let date = new Date().addHours(0.5);

        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        currentTime = hours + ':' + minutes;

        pickup.setAttribute('value', currentTime);

        let label = document.createElement('label');
        let labelTxt = document.createTextNode('Vælg afhentnings tidspunkt: ');
        label.appendChild(labelTxt);
        label.setAttribute('for', 'selectTime');

        container.append(label, pickup);
    } else if (timeamount[0] == 'Minutpris') {
        let pickup = document.createElement('p');
        let pickupText = document.createTextNode('Start nu!');
        pickup.appendChild(pickupText);

        container.appendChild(pickup);
    } else {
        let pickup = document.createElement('p');
        let pickupText = document.createTextNode('Fejl! Beklager');
        pickup.appendChild(pickupText);

        container.appendChild(pickup);
    }

    let place = document.createElement('p');
    let placeTxt = document.createTextNode(`Hos ${getLocalStorage('allLocations')[currentLocation].name}`);
    place.appendChild(placeTxt);

    let priceField = document.createElement('p');
    let priceAmount = document.createTextNode('Pris: ' + price + ' ,-');
    priceField.appendChild(priceAmount);

    let confirmBut = document.createElement('button');
    let butTxt = document.createTextNode('Bekræft');
    confirmBut.appendChild(butTxt);
    confirmBut.setAttribute('id', 'confirmBut');
    confirmBut.setAttribute('onclick', 'rent("' + bike + '","' + price + '","' + time + '")');

    let closeBut = document.createElement('button');
    let closeTxt = document.createTextNode('X');
    closeBut.appendChild(closeTxt);
    closeBut.setAttribute('id', 'closeBut');
    closeBut.setAttribute('onclick', 'closeModal()');

    container.append(place, priceField, confirmBut, closeBut);
    $('body').append(container);

    openModal = true;
}

function closeModal() {
    if (openModal) {
        document.getElementById('confirmModal').remove();
    }
    openModal = false;
}

function updateLocation() {
    const allLocations = getLocalStorage('allLocations');
    allLocations[currentLocation].availableBikes -= 1;

    setLocalStorage('allLocations', allLocations);
}

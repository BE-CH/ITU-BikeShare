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
                prices.push(createLine(i + 1 + ' Time', bikeTypes[bike].price[key][i], bike));
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
    button.setAttribute('onclick', 'rent("' + bike + '","' + value + '","' + text + '")');

    container.append(field, priceField, button);
    return container;
}

function rent(bike, price, time) {
    console.log('rent: ' + bikeTypes[bike].title + ' for ' + time + ' price: ' + price);
}

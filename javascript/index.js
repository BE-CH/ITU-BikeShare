const currentDate = new Date();

$('#firstnameLoggedIn').text(getUserInfo('firstname')); // set firstname

function checkActiveRent() {
    const userObject = getUserObject(getLocalStorage('session'));
    const activeRent = userObject.activeRent;

    if (activeRent != null && activeRent.active != false) {
        const startDate = new Date(activeRent.startDate);
        const endDate = new Date(activeRent.endDate);

        if (startDate.getTime() < currentDate.getTime()) {
            //active rent
            let secsStarted = currentDate.getTime() - startDate.getTime();
            let minutes = secsStarted / 1000 / 60;

            let secsLeft = endDate.getTime() - currentDate.getTime();
            let minutesLeft = secsLeft / 1000 / 60;

            let price;
            let time = '';
            if (activeRent.type == 'minutes') {
                price = minutes * activeRent.price;
                time = Math.round(minutes * 10) / 10 + ' min';
            } else {
                price = activeRent.price;
                let hours = 0;
                if (minutesLeft > 60) {
                    hours = Math.floor(minutesLeft / 60);
                    time += hours + ' timer og ';
                    minutesLeft = minutesLeft % 60;
                    time += Math.round(minutesLeft * 10) / 10 + ' min tilbage';
                } else {
                    time += Math.round(minutesLeft * 10) / 10 + ' min tilbage';
                }
            }
            $('#activeRentText').html(`${activeRent.bike} <br>${time} pris: ${Math.round(price * 10) / 10} DKK <br> <button onclick="stopRent()" id='stopRent'>Stop</button>`);
        } else {
            $('#activeRentText').html(` <h3>${activeRent.bike}</h3> <br><i> Start: ${startDate.toLocaleString()} <br> Slut: ${endDate.toLocaleString()}</i> `);
        }
        console.log(activeRent);
    } else {
        $('#activeRentText').text('Ingen aktive udlejninger');
    }
}

function stopRent() {
    const userObject = getUserObject(getLocalStorage('session'));
    const activeRent = userObject.activeRent;

    const startDate = new Date(activeRent.startDate);
    const endDate = new Date(activeRent.endDate);

    let price;

    if (activeRent.type == 'minutes') {
        let secondsUsed = (currentDate.getTime() - startDate.getTime()) / 1000;
        let minutes = Math.ceil(secondsUsed / 60);
        price = minutes * activeRent.price;
    } else {
        let fine = 0;
        if (currentDate.getTime() > endDate.getTime()) {
            fine = 50;
        }
        price = parseInt(parseInt(activeRent.price) + fine);
    }

    alert('Samlet pris: ' + price + ' DKK');

    userObject.activeRent = { active: false };

    updateLoggedInAccount(userObject);

    location.href = 'index.html';
}

function checkActiveRent() {
    if (getLocalStorage('activeRent').active) {
        const activeRent = getLocalStorage('activeRent');
        $('#activeRentText').text(`- ${activeRent.bike} ()`);
    }
}

$('#firstnameLoggedIn').text(getUserInfo('firstname')); // set firstname

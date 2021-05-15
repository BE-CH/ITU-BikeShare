function checkActiveRent() {
    if (getLocalStorage('activeRent').active) {
        const activeRent = getLocalStorage('activeRent');
        $('#activeRentText').text(`- ${activeRent.bike} ()`);
    }
}

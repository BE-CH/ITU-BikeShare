$(document).ready(() => {
    localStorage.removeItem('session');

    setTimeout(function () {
        window.location.replace('login.html');
    }, 5000);
});

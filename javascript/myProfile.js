$(document).ready(() => {
    $('#firstname').val(getUserInfo('firstname')); // set firstname
    $('#lastname').val(getUserInfo('lastname')); // set lastname
    $('#email').val(getUserInfo('email')); // set email
    $('#phonenumber').val(getUserInfo('phonenumber')); // set phonenumber
    $('#password').val(atob(getUserInfo('password'))); // set password
    $('#last4').text(getUserInfo('last4digits')); // set last4digits
    $('#expireDate').text(getUserInfo('expiredate')); // set expiredate

    $('#saveMyAccountSettings').submit((event) => {
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const email = $('#email').val();
        const phonenumber = $('#phonenumber').val();
        const password = $('#password').val();

        if (firstname && lastname && email && phonenumber && password) {
            updateUserInformation(firstname, lastname, email, phonenumber, password);
        } else {
            alert('Du skal udfylde alle felter for at gemme oplysningerne!');
        }

        event.preventDefault();
    });
});

function updateUserInformation(firstname, lastname, email, phonenumber, password) {
    if (isLoggedIn()) {
        const userObject = getUserObject(getLocalStorage('session'));
        const originalEmail = userObject.email;
        const originalPassword = userObject.password;

        if (email.trim() === originalEmail.trim() || !emailAlreadyRegistered(email)) {
            userObject.firstname = firstname.trim();
            userObject.lastname = lastname.trim();
            userObject.email = email.trim();
            userObject.phonenumber = phonenumber.trim();
            userObject.password = btoa(password);

            updateLoggedInAccount(userObject);

            if (userObject.email !== originalEmail || userObject.password !== originalPassword) {
                alert('Du har skiftet din email/password. Du skal logge ind igen!');
                localStorage.removeItem('session');
                window.location.replace('login.html');
            } else {
                alert('Dine oplysninger er nu opdateret!');
            }
        } else {
            alert('Der er allerede en konto med denne email!');
        }
    } else {
        return false;
    }
}

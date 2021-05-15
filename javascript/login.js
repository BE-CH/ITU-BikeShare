$('#login-form').submit(function (event) {
    const email = $('#username-field').val();
    const password = $('#password-field').val();

    if (email && password) {
        let emailFound = false;
        let iAcc = 0;
        const registeredAccounts = getLocalStorage('accounts');

        for (let i = 0; i < registeredAccounts.length; i++) {
            const acc = registeredAccounts[i];
            if (acc.email === email.toLowerCase().trim()) {
                emailFound = true;
                iAcc = i;
                break;
            }
        }

        if (emailFound) {
            if (registeredAccounts[iAcc].email === email.toLowerCase().trim()) {
                const registeredAccount = registeredAccounts[iAcc];

                if (registeredAccount.password === btoa(password.trim())) {
                    setLocalStorage('session', `${btoa(email.trim())}:${btoa(password.trim())}`);
                    window.location.replace('index.html');
                } else {
                    alert('Password matcher ikke!');
                }
            } else {
                alert('Der skete en fejl! Kontakt support');
            }
        } else {
            alert('Der findes ingen konto med denne adresse!');
        }
    } else {
        alert('Du skal udfyle både email og password!');
    }

    event.preventDefault();
});

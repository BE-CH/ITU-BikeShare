$('#createAccount').submit(function (event) {
    const firstname = $('#firstname').val();
    const lastname = $("input[name='lastname'").val();
    const email = $("input[name='email'").val();
    const phonenumber = $("input[name='phonenumber'").val();
    const password = $("input[name='password'").val();
    const passwordAgain = $("input[name='passwordAgain'").val();
    const cardnumber = $("input[name='cardnumber'").val();
    const expiredate = $("input[name='expiredate'").val();
    const cvc = $("input[name='cvc'").val();

    if (firstname && lastname && email && phonenumber && password && passwordAgain && cardnumber && expiredate && cvc) {
        const accounts = getLocalStorage('accounts');

        if (!emailAlreadyRegistered(email.toLowerCase().trim())) {
            if (passwordAgain === password) {
                const userData = {
                    email: email.toLowerCase().trim(),
                    firstname,
                    lastname,
                    email,
                    phonenumber,
                    password: btoa(password.trim()),
                    cardnumber: btoa(cardnumber),
                    last4digits: cardnumber.slice(-4),
                    expiredate,
                    cvc: btoa(cvc),
                };

                accounts.push(userData);

                setLocalStorage('accounts', accounts);
                alert('Du har nu oprettet en bruger! Du kan nu logge ind');
                window.location.replace('login.html');
            } else {
                alert('Dine adgangskoder er ikke ens!');
            }
        } else {
            alert('Der er allerede en konto med denne email. Log ind i stedet!');
            window.location.replace('login.html');
        }
    } else {
        alert('Du skal udfylde alle felter!');
    }

    event.preventDefault();
});

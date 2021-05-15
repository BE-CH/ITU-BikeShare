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
        let alreadyRegistered = false;
        const accounts = getLocalStorage('accounts');

        for (let i = 0; i < accounts.length; i++) {
            const element = accounts[i];
            if (element.email === email.toLowerCase().trim()) {
                alreadyRegistered = true;
                break;
            }
        }

        if (!alreadyRegistered) {
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
            alert('Du er allerede registeret! Log ind!');
            window.location.replace('login.html');
        }
    } else {
        alert('Du skal udfylde alle felter!');
    }

    event.preventDefault();
});

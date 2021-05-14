function loadFaqs() {
    allFaqs.forEach((topic) => {
        let container = document.createElement('div');
        container.setAttribute('class', 'faqTopic');

        let header = document.createElement('h3');
        let headerTxt = document.createTextNode(topic.title);
        header.appendChild(headerTxt);

        container.append(header);

        topic.faqs.forEach((faq) => {
            container.appendChild(createFaq(faq));
        });

        document.getElementById('faqs').appendChild(container);
    });
}

function createFaq(faq) {
    let container = document.createElement('div');
    container.setAttribute('class', 'question');

    let header = document.createElement('h5');
    let headerTxt = document.createTextNode(faq.question);
    header.appendChild(headerTxt);
    header.setAttribute('onclick', 'dropdown(' + faq.id + ')');

    let dropDown = document.createElement('div');
    dropDown.setAttribute('class', 'faqDropdown');
    dropDown.setAttribute('id', faq.id);
    let answer = document.createElement('p');
    let answerTxt = document.createTextNode(faq.answer);

    answer.appendChild(answerTxt);
    dropDown.appendChild(answer);

    container.append(header, dropDown);
    return container;
}

function dropdown(id) {
    $('#' + id + '').slideToggle();
}

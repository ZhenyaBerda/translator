/* API: trnsl.1.1.20200304T215227Z.578073318c88e6ff.4e6da65a5cadf78e43b42476df0e56a6b7abded3
 */

'use strict';
const englishForm = document.getElementById('en'),
    enTranslate = document.getElementById('en-translate'),
    rusForm = document.getElementById('rus'),
    rusTranslate = document.getElementById('rus-translate'),
    key = 'trnsl.1.1.20200304T215227Z.578073318c88e6ff.4e6da65a5cadf78e43b42476df0e56a6b7abded3';

const formBody = (text, lang) => {
    return `key=${key}&lang=${lang}&text=${text}`;
};

const getData = (body) => {
    return fetch('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
};

document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target;

    console.log(target);

    if (target.closest('#en')) {
        if (enTranslate.value === '') {
            return;
        }

        getData(formBody(enTranslate.value, 'en-ru'))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                rusTranslate.value = data.text;
            })
            .catch((reject) => console.error(reject.text()));
    }

    if (target.closest('#rus')) {
        if (rusTranslate.value === '') {
            return;
        }

        getData(formBody(rusTranslate.value, 'ru-en'))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                enTranslate.value = data.text;
            })
            .catch((reject) => console.error(reject.text()));
    }
});
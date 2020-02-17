import CalendarConverter from 'julian-gregorian'

function convertDate(e, f) {
    const year = e.querySelector('.date_year').value;
    const month = e.querySelector('.date_month').value;
    const day = e.querySelector('.date_day').value;
    if (!!year && !!month && !!day) {
        const dateInput = e.querySelector('.date_input');
        dateInput.value = CalendarConverter[f](+year, +month, +day).replace(/ /g, '/');
        dateInput.dispatchEvent(new InputEvent('keyup', { 'bubbles': true }));
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createConvertButton(text, convert) {
    let julian = Object.assign(document.createElement('input'), {
        type: 'button',
        value: text
    });
    julian.setAttribute('class', 'grey super small button')
    julian.addEventListener('click', () => {
        convertDate(e, convert);
    });
    insertAfter(julian, e.querySelector('div.vertically-aligned'))
}

document.querySelectorAll('.date_field').forEach((e, i) => {
    createConvertButton('To Julian', 'fromGregorianToJulian');
    createConvertButton('To Gregorian', 'fromJulianToGregorian');
});
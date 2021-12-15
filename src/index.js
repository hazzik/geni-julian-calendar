import CalendarConverter from '@the_hazzik/julian-gregorian-converter'

function formatDate(date, format) {
    return format.replace('YYYY', date.year).replace('MM', date.month).replace('DD', date.day);
}

function convertDate(e, f) {
    const year = +e.querySelector('.date_year').value;
    const month = +e.querySelector('.date_month').value;
    const day = +e.querySelector('.date_day').value;
    if (!!year && !!month && !!day) {
        const dateInput = e.querySelector('.date_input');
        const format = dateInput.getAttribute('label');
        dateInput.value = formatDate(CalendarConverter[f]({year, month, day}), format);
        dateInput.dispatchEvent(new InputEvent('keyup', { 'bubbles': true }));
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createConvertButton(e, text, convert) {
    const julian = Object.assign(document.createElement('input'), {
        type: 'button',
        value: text
    });
    julian.setAttribute('class', 'grey super small button')
    julian.addEventListener('click', () => {
        convertDate(e, convert);
    });
    insertAfter(julian, e.querySelector('div.vertically-aligned'))
}

function createButtons(element) {
    element.querySelectorAll('.date_field').forEach((e) => {
        createConvertButton(e, 'To Julian', 'fromGregorianToJulian');
        createConvertButton(e, 'To Gregorian', 'fromJulianToGregorian');
    });
}

try {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.id == 'edit_profile' || node.id == 'lightbox_container') {
                    createButtons(node);
                }
            });
        });
    });
    observer.observe(document.querySelector("body"), { subtree: true, childList: true });
    createButtons(document);
} catch(ex) {
    console.error(ex);
}
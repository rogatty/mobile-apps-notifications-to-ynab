function getAmountInGr(str, sign) {
    return parseInt(str.replace(',', '').replace('.', ''), 10) * sign;
}

function getDate(originalFormat) {
    const matches = originalFormat.match(/(\d{2})-(\d{2})-(\d{4})/);
    return `${matches[3]}-${matches[2]}-${matches[1]};`
}

function parseCardPayment(message) {
    // Message: Odnotowaliśmy transakcję na rachunku o numerze:1111 Data:06-02-2021 Kwota:111.11PLN  Citi Handlowy
    const matches = message.match(/Odnotowaliśmy transakcję na rachunku o numerze:\d{4} Data:(\d{2}-\d{2}-\d{4}) Kwota:((?:\d|,){1,10}.\d{2})PLN.*/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse card payment message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[2], -1),
        date: getDate(matches[1]),
        vendor: null,
    };
}

function parseIncomingTransfer(message) {
    // Message: Zasilenie konta: 1111 Data:08-02-2021 Kwota zasilenia:1,111.11PLN  Citi Handlowy
    const matches = message.match(/Zasilenie konta: \d{4} Data:(\d{2}-\d{2}-\d{4}) Kwota zasilenia:((?:\d|,){1,10}.\d{2})PLN.*/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse incoming transfer message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[2], 1),
        date: getDate(matches[1]),
        vendor: null,
    };
}

function parseOutgoingTransfer(message) {
    // Message: Obciążenie rachunku o numerze: 1111 Data: 17-09-2021 Kwota obciążenia: 1,111.11PLN  Citi Handlowy
    const matches = message.match(/Obciążenie rachunku o numerze: \d{4} Data: (\d{2}-\d{2}-\d{4}) Kwota obciążenia: ((?:\d|,){1,10}.\d{2})PLN*/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse outgoing transfer message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[2], -1),
        date: getDate(matches[1]),
        vendor: null,
    };
}

function parse(title, message) {
    if (title === 'Obciążenie Konta Osobistego Citibank (transakcja bezgotówkowa/bankomat obcy)') {
        return parseCardPayment(message);
    } else if (title === 'Zasilenie konta') {
        return parseIncomingTransfer(message);
    } else if (title === 'Obciążenie Konta Citibank') {
        return parseOutgoingTransfer(message);
    }

    console.log(`Unknown notification title: ${title}`);
    return null;
}

module.exports = {
    parse,
};

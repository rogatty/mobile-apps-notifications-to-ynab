function getAmountInGr(str, sign) {
    return parseInt(str.replace(',', '').replace(/\s+/g, ''), 10) * sign;
}

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function parseCardPayment(message) {
    // Message: 11,11 PLN w JMP S.A. BIEDRONKA 4744 POZNAN (POZNA
    const matches = message.match(/((?:\d|\s){1,7},\d{2}) PLN w (.+)/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse card payment message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[1], -1),
        date: getToday(),
        vendor: matches[2],
    };
}

function parseOutcomingTransfer(message) {
    // Message: 111,11 PLN do PAYPRO SPÓŁKA AKCYJNA UL.KANCLERSKA 15 60-327 POZNAŃ POLSKA
    const matches = message.match(/((?:\d|\s){1,7},\d{2}) PLN do (.+)/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse outcoming transfer message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[1], -1),
        date: getToday(),
        vendor: matches[2],
    };
}

function parseOutcomingBlik(message) {
    // Message: 11,11 PLN
    const matches = message.match(/((?:\d|\s){1,7},\d{2}) PLN/);

    if (!matches || !matches[1]) {
        throw new Error(`Can't parse outcoming BLIK message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[1], -1),
        date: getToday(),
        vendor: null,
    };
}

function parseIncomingTransfer(message) {
    // Message: 1 111,11 PLN wpłynęło od PAYPRO SPÓŁKA AKCYJNA
    const matches = message.match(/((?:\d|\s){1,7},\d{2}) PLN wpłynęło od (.+)/);

    if (!matches || !matches[1] || !matches[2]) {
        throw new Error(`Can't parse incoming transfer message: ${message}`);
    }

    return {
        amountInGr: getAmountInGr(matches[1], 1),
        date: getToday(),
        vendor: matches[2],
    };
}

function parse(title, message) {
    if (title === 'Nowa operacja kartą') {
        return parseCardPayment(message);
    }

    if (title === 'Przelew z konta') {
        return parseOutcomingTransfer(message);
    }

    if (title === 'Płatność BLIK') {
        return parseOutcomingBlik(message);
    }

    if (title === 'Nowy przelew') {
        return parseIncomingTransfer(message);
    }

    if (['Transakcja BLIK', 'Mobilna autoryzacja'].includes(title)) {
        return null;
    }

    throw new Error(`Unknown notification title: ${title}`);
}

module.exports = {
    parse,
};

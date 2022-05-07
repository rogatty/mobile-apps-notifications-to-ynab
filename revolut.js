function getAmountInGr(str, sign) {
    return parseInt(str.replace(',', ''), 10) * sign;
}

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function parsePayment(title, message) {
    // Title: Backblaze
    // Message:  💼 Zapłacono 1,11 USD (11,11 zł) w: X
    // Message:  💼 Zapłacono 1,11 € (11,11 zł) w: Y
    // Notice there is nbsp between amount and currency
    const matches = message.match(/Zapłacono ((?:\d|,){1,10}.\d{2})\s(?:[A-Z]{3}|[£€$]) \(((?:\d|,){1,10}.\d{2})\szł\).*/);

    if (!matches || !matches[1] || !matches[2]) {
        console.log(message, matches);
        throw new Error(`Can't parse payment message: ${message}`);
    }

    return {
        // Use zł and drop the original currency to keep budget simple.
        // It creates a need to reconcile the Revolut account from time to time,
        // but I'm fine with it.
        amountInGr: getAmountInGr(matches[2], -1),
        date: getToday(),
        vendor: title,
    };
}

function parse(title, message) {
    if (message.includes('Zapłacono')) {
        return parsePayment(title, message);
    }

    throw new Error(`Unknown notification message: ${message}`);
}

module.exports = {
    parse,
};

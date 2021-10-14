const ynab = require('ynab');
const {YNAB_PAYEES, YNAB_ACCOUNTS, YNAB_TOKEN, YNAB_BUDGET} = require('./secrets');

function mapTransactionVendorToPayee(vendor) {
    if (vendor === null) {
        return null;
    }

    // @see https://api.youneedabudget.com/v1#/Payees/getPayees
    const payee = YNAB_PAYEES.find(({pattern}) => pattern.test(vendor));

    if (!payee) return null;

    return payee.id;
}

function mapTransactionToYnab(account, { amountInGr, date, vendor }) {
    let accountId = YNAB_ACCOUNTS[account];

    if (!accountId) {
        throw new Error(`No account ID for: ${account}`);
    }

    let payeeId = mapTransactionVendorToPayee(vendor);

    return {
        account_id: accountId,
        payee_id: payeeId,
        memo: payeeId ? null : vendor,
        cleared: ynab.SaveTransaction.ClearedEnum.Uncleared,
        approved: false,
        flag_color: ynab.SaveTransaction.FlagColorEnum.Yellow,
        date,
        // https://api.youneedabudget.com/#formats
        amount: amountInGr * 10,
    };
}

async function sendToYnab(account, transaction, dryRun) {
    const ynabTransaction = mapTransactionToYnab(account, transaction);

    console.log('Sending to YNAB:');
    console.log(ynabTransaction);

    if (dryRun) {
        return;
    }

    try {
        const ynabAPI = new ynab.API(YNAB_TOKEN);
        await ynabAPI.transactions.createTransaction(YNAB_BUDGET, { transaction: ynabTransaction });
    } catch (e) {
        throw e;
    }
}

module.exports = {
    sendToYnab,
}

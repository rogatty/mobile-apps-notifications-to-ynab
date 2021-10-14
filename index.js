const mbank = require('./mbank');
const citibank = require('./citibank');
const {sendToYnab} = require('./ynab');

async function run() {
    const account = process.argv[2];
    const notificationTitle = process.argv[3];
    const notificationMessage = process.argv[4];
    const dryRun = process.argv[5];

    console.log(`Account: ${account}`)
    console.log(`Title: ${notificationTitle}`)
    console.log(`Message: ${notificationMessage}`)

    let transaction;

    if (account === 'mbank') {
        transaction = mbank.parse(notificationTitle, notificationMessage);
    } else if (account === 'citibank') {
        transaction = citibank.parse(notificationTitle, notificationMessage);
    } else {
        throw new Error(`Unsupported account: ${account}`);
    }

    if (transaction === null) {
        console.log('Ignoring notification');
        return;
    }

    await sendToYnab(account, transaction, dryRun === '1');
}

run().catch((e) => {
   console.log(e);
   throw e;	
});

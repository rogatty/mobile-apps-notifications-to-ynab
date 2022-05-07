## How to run the script
1. Run `npm install`.
2. Copy `secrets.js.dist` to `secrets.js` and fill it. You can use https://api.youneedabudget.com/v1#/ to find all the IDs.
3. Run the script passing account name, notification title and notification text:
    ```
    node index.js "mbank" "Przelew z konta" "11,11 PLN do PAYU SPÓŁKA AKCYJNA"
    Account: mbank
    Title: Przelew z konta
    Message: 11,11 PLN do PAYU SPÓŁKA AKCYJNA
    Sending to YNAB:
    {
      account_id: 'XXX',
      payee_id: null,
      memo: 'PAYU SPÓŁKA AKCYJNA',
      cleared: 'uncleared',
      approved: false,
      flag_color: 'yellow',
      date: '2021-10-14',
      amount: -11110
    }
    ```
    You can pass `1` as an additional argument to run in dry mode which does the parsing but skips the YNAB API request.

## How to run the script automatically
1. Install https://play.google.com/store/apps/details?id=pl.mbank, https://play.google.com/store/apps/details?id=com.konylabs.cbplpat or https://play.google.com/store/apps/details?id=com.revolut.revolut.
2. Enable mobile app notifications for all transactions.
3. Find a way to pass these notifications to this script. I use https://play.google.com/store/apps/details?id=com.llamalab.automate, https://f-droid.org/packages/com.termux/ and https://f-droid.org/packages/com.termux.tasker/ with Node.js running on my phone.

## What would be nice to implement
- Make it easier to use different banking apps
- Streamline setup if possible, but I didn't find an easier way to scrape mobile apps notifications yet
- Add tests
- Add TypeScript to avoid bugs, but it would complicate deployment process (for me, it's Syncthing between my laptop and phone)

## Contributions
I'm not really expecting that anyone will want to use it, but if so, I'd love to make it easy to contribute.
Just let me know what you need.

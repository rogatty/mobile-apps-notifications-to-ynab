## How to use it
1. Install https://play.google.com/store/apps/details?id=pl.mbank or https://play.google.com/store/apps/details?id=com.konylabs.cbplpat
2. Enable mobile app notifications for all transactions.
3. Find a way to pass these notifications to this script. I use https://play.google.com/store/apps/details?id=com.llamalab.automate, https://f-droid.org/packages/com.termux/ and https://f-droid.org/packages/com.termux.tasker/ with Node.js running on my phone.
4. Copy secrets.js.dist to secrets.js and fill it. You can use https://api.youneedabudget.com/v1#/ to find all the IDs.
5. Run script using e.g. `node index.js "mbank" "Przelew z konta" "11,11 PLN do PAYU SPÓŁKA AKCYJNA"`

## What would be nice to implement
- Make it easier to use different banking apps
- Streamline setup if possible, but I didn't find an easier way to scrape mobile apps notifications yet
- Tests
- TypeScript to avoid bugs, but it would complicate deployment process (for me, it's Syncthing between my laptop and phone)

## Contributions
I'm not really expecting that anyone will want to use it, but if so, I'd love to make it easy to contribute.
Just let me know what you need.

/* NOTES ON VARIOUS FEATURES FOR USE ON LEGACY PROJECT */

// VENMO INTEGRATION

/* Simple payments can be achieved by sending the user to a custom link, populating the query with the necessary info:

https://venmo.com/?txn=pay&recipients=example%40email.com&amount=30&note=Haircut%20via%20ShortCut&audience=friends

https://venmo.com/?txn=pay&recipients=
+ barber's email (with '%40' for the @ symbol)
+ '&amount='
+ haircut price
+ '&note=Haircut%20via%20ShortCut&audience=friends' (change 'ShortCut' to our app name)

This will take the user to a different page to confirm their payment, so make sure this opens in a
new tab! And indicate in the copy that this will happen, so the user expects it. Can we make this
open in a modal or pop-up instead?

*/

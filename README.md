## Satoshi's Law is an application for lawyers to track thier billable hours and be paid for them via the bitcoin lightning network.

### This app was built for the Bitcoin Games Hackathon put on for the Bitcoin2019 Conference -- https://www.bitcoin2019conference.com/hackathon

Special thanks to William O'Beirne for writing a Lightning App tutorial, which I relied on to get the backend of my application communicating with my lightning node. That tutorial can be found here: https://medium.com/@wbobeirne/making-a-lightning-web-app-part-1-4a13c82f3f78

## Technologies

* React
* Node
* Express
* Bootstrap/Reactstrap

## APIs

* Clockify (for logging time sessions) https://clockify.me/developers-api

## Installation

If you want to try this application locally, you will need to clone this repository (for the frontend) as well as this one (for the backend) https://github.com/joshakeman/satoshis-law-BE

**Note: the backend needs to be configured to your lightning node. Reference the backend repo linked above for how to do this.

To install this frontend and run it locally:
* Clone this repository
* cd into the repository
* run yarn install (or equivalent for npm)
* run yarn start (or equivalent for npm)

That should fire up your front end on port 3000. For the lightning invoicing to function, you'll need to also download and run the backend of this project which can be found at the repository linked above.

## How To Use

* Choose a case and client with the dropdowns in the top left corner of the app.
* Start your timer by clicking the start button. The time will begin to run, and you will be able to see how long it's running (in seconds). As the clock runs, the number of satoshis earned for your time will update.
* Click 'stop' to pause the timer. You can resume or, if you want to end the session and create a lightning invoice to send to your client, click the 'Stack sats' button.
* On clicking the 'Stack sats' button the app will generate an invoice payable to your node (this will only work if: (1) you have downloaded the backend to this app and it is running, AND (2) you configured the backend with your lightning node's information. See the README in the backend repository for how to do this.

And that's it! The app is very simple right now. I had about a week to build it in my sparetime in order to meet the deadline for the hackathon, so it's not very polished. Hopefully I can improve on it in the future!



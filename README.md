# solar-calculator
Web app for calculating solar energy potential for a given region

## How to run
Clone the repo, and in the solar-calculator-app directory, run
```
npm install
```

An API key is required to run the app but is not included in this repository.
To add it back, create a file solar-calculator-app/src/apiKey.js with the following line, setting the constant to a valid key for the Google Maps API.
```
export const GOOGLE_MAPS_API_KEY = "YOUR API KEY HERE";
```

Launch the app with
```
npm start
```
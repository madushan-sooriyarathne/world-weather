# World-Weather

World weather is a web app made using vanilla JS.

### What can it do

-   Show weather data of your current location (location access in browser must be allowed)
-   add cities to saved city list
-   delete cities from saved city list (one by one or all at once)
-   get weather data for saved cities
-   get forecast for current and saved cities

See it in action [here](https://world-weather-app.netlify.com/)

![Screenshot](https://i.ibb.co/gmbczWC/screenshot.png)

## Setting up

1. Clone this project to your computer - `git clone https://github.com/madushan-sooriyarathne/world-weather.git`

2. Go to the cloned directory - `cd world-weather`

3. Install npm packages - `npm install`

4. Visit [openweathermap.org](https://openweathermap.org/api) and create an account

5. After creating an account log-in to your account and create a API key

6. Open `/src/js/config.js` file and replace `key` value with your api key

## Running the Project

-   Open project in development server with hot-reloading enabled - `npm run start`

-   Build the final project to deploy - `npm run build`

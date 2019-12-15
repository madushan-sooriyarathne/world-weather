export default {
    api: {
        key: "YOUR API KEY HERE",
        baseUrl: "https://api.openweathermap.org/data/2.5/weather",
        forecastUrl: "https://api.openweathermap.org/data/2.5/forecast?id=",
        coordUrl: "https://api.openweathermap.org/data/2.5/weather"
    },

    searchUrl: "https://get-cities-ids.herokuapp.com/",
    proxy: "https://cors-anywhere.herokuapp.com/"
    // proxy: "https://crossorigin.me/"
};

/*
API Call ref

Search By City: http://samples.openweathermap.org/data/2.5/weather?q={CITY},{COUNTRY CODE}&appid={API KEY}

Search By City ID: http://samples.openweathermap.org/data/2.5/weather?id={CITY ID}&appid={API KEY}

Search By Zip Code: http://samples.openweathermap.org/data/2.5/weather?zip={ZIP CODE},{COUNTRY CODE}&appid={API KEY}

Search By Latitude & Longitude: http://samples.openweathermap.org/data/2.5/weather?lat={LATITUDE}&lon={LONGITUDE}&appid={API KEY}


//Forecast URL
http://api.openweathermap.org/data/2.5/forecast?id={CITY ID}&appid={API KEY}

*/

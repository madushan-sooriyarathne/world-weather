import "../sass/main.scss";

//models
import Search from "./models/Search";
import MainCityWeather from "./models/MainCityWeather";
import CityWeather from "./models/CityWeather";
import Forecast from "./models/Forecast";
import LocalStorage from "./models/LocalStorage";

// Views
import * as searchView from "./views/searchView";
import * as mainCityView from "./views/mainCityView";
import * as addedCityView from "./views/addedCityView";
import * as forecastView from "./views/forecastView";

import { elements, renderLoader, showError, clearUI } from "./views/base";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

/*
    State
    - Search Object
    - Main City Object
    - Added Cities object list
    - Forecast Object list
*/

const state = {
    addedCities: ["1246294", "7287240", "2922849", "2766725"],
    addedCitiesData: []
};

// CONTROLLERS

// Search
const searchController = async () => {
    //Get Input value
    let query = searchView.getValue();

    if (query) {
        // Add Current Search to the state
        state.search = new Search(query);

        try {
            //Clear Pagination
            clearUI(elements.searchPagination);
            // Show the loading screen
            renderLoader(elements.searchResPlaceholder);

            // Fetch the data from API
            await state.search.getData();
            // Populate UI With results
            searchView.showSearchResults(state.search.result);
        } catch (err) {
            showError(
                elements.searchResPlaceholder,
                "There were no results, sorry!",
                "notfound"
            );
            console.log(err);
        }
    }
};

// Main City
const mainCityController = async () => {
    // Get the weather data for acquired coordinates
    state.mainCity = new MainCityWeather(state.coords);

    try {
        await state.mainCity.getWeatherData();

        // Update the UI with fetched data
        mainCityView.showMainCity(state.mainCity.weather);
    } catch (err) {
        showError(
            elements.mainCityPlaceholder,
            "Error loading weather data!",
            "error"
        );
        console.log(err);
    }
};

// Added City
const addedCityController = async () => {
    // Fetch the data for saved ids and save data in state
    for (let id of state.addedCities) {
        try {
            const subCity = new CityWeather(id);
            await subCity.getWeatherData();
            state.addedCitiesData.push(subCity.weather);
        } catch (error) {
            showError(
                elements.subCityPlaceholder,
                "Something went wrong while loading weather data",
                "error"
            );
            console.log(error.message);
        }
    }

    if (state.addedCitiesData.length > 0) {
        // Populate UI with fetched data
        addedCityView.addCities(state.addedCitiesData);
    }
};

// Forecast
const forecastController = async id => {
    //Fetch the forecast data for main city
    try {
        // Clear Pagination
        clearUI(elements.forecastPagination);

        state.cityForecast = new Forecast(id);
        await state.cityForecast.fetchData();

        // Get the data of selected city from state.addedCityData
        const selectedCity = state.addedCitiesData.filter(
            item => item.id == id
        )[0];

        // if user clicked on one of added Cities, selectedCity variable will not be empty
        // if so pass selectedCity to forecastView
        if (selectedCity) {
            forecastView.addCurrentWeather(selectedCity);
            forecastView.addForecasts(state.cityForecast.result.list);
        } else {
            // if not, that means user has clicked on main city. in that case pass main city data to forecast view
            forecastView.addCurrentWeather(state.mainCity.weather, true);

            forecastView.addForecasts(state.cityForecast.result.list);
        }
    } catch (err) {
        showError(
            elements.forecastPlaceholder,
            "Error loading forecast data",
            "error"
        );
        console.log(err);
    }
};

// MAIN EVENT LISTENERS

// Forecast close event
elements.forecastClose.addEventListener("click", event => {
    elements.forecastWindow.classList.remove("visible");
});

// Forecast View Pagination
elements.forecastPagination.addEventListener("click", event => {
    const button = event.target.closest(".btn__page");

    if (button) {
        clearUI(elements.forecastPlaceholder);
        clearUI(elements.forecastPagination);
        forecastView.addForecasts(
            state.cityForecast.result.list,
            parseInt(button.dataset.goto)
        );
    }
});

// Clear Cities
elements.clearCitiesBtn.addEventListener("click", event => {
    // Clear local storage
    state.storage.clearLocalStorage();

    // Clear saved cities id list
    state.addedCities = [];

    // clear loaded city weather data
    state.addedCitiesData = [];

    // show no cities saved message
    showError(
        elements.subCityPlaceholder,
        `You don't have any cities saved. Click "Add Cities" button to add some`,
        "empty"
    );
});

// Delete individual cities
elements.forecastCurrent.addEventListener("click", event => {
    const btn = event.target.closest(".btn__remove");
    if (btn) {
        if (state.addedCities.includes(btn.dataset.remove)) {
            // delete the id of the city
            state.addedCities.splice(
                state.addedCities.findIndex(el => el === btn.dataset.remove),
                1
            );

            // delete the loaded weather data
            delete state.addedCitiesData.splice(
                state.addedCitiesData.findIndex(
                    el => el.id === parseInt(btn.dataset.remove)
                ),
                1
            );

            // delete from local storage
            state.storage.deleteCity(btn.dataset.remove);

            if (state.addedCities.length == 0) {
                showError(
                    elements.subCityPlaceholder,
                    `You don't have any cities saved. Click "Add Cities" button to add some`,
                    "empty"
                );
            } else {
                // Clear added Cities placeholder
                clearUI(elements.subCityPlaceholder);

                // re render added city list
                addedCityView.addCities(state.addedCitiesData);
            }
            // remove forecast overlay
            elements.forecastWindow.classList.remove("visible");
        }
    }
});

// Search & Add cities to the list
elements.searchForm.addEventListener("submit", async event => {
    event.preventDefault();
    await searchController();
});

// Search View Results
elements.searchResPlaceholder.addEventListener("click", async event => {
    const item = event.target.closest(".search-add");

    if (item) {
        if (!state.addedCities.includes(item.id)) {
            state.addedCities.push(item.id);
            state.storage.addCity(item.id);

            // Show loading animation until data loads and re-rendered
            renderLoader(elements.subCityPlaceholder);
            try {
                // Get the weather data for newly added city
                const subCity = new CityWeather(item.id);
                await subCity.getWeatherData();

                // Push fetched data to state
                state.addedCitiesData.push(subCity.weather);

                //Re render added Cities
                addedCityView.addCities(state.addedCitiesData);
            } catch (err) {
                showError(
                    elements.subCityPlaceholder,
                    "Something went wrong while loading weather data",
                    "error"
                );
                console.log(err.message);
            }
        }
    }
});

// Search View Pagination
elements.searchPagination.addEventListener("click", event => {
    const btn = event.target.closest(".btn__page");

    if (btn) {
        // clear pagination before inject new page to DOM
        clearUI(elements.searchPagination);

        // inject next page to DOM
        searchView.showSearchResults(
            state.search.result,
            parseInt(btn.dataset.goto)
        );
    }
});

// Added Cities Click event
elements.subCityPlaceholder.addEventListener("click", async event => {
    const city = event.target.closest(".forecast-btn");
    if (city) {
        // Make overlay visible
        elements.forecastWindow.classList.add("visible");

        forecastController(city.id);
    }
});

// Main City Click event
elements.mainCityPlaceholder.addEventListener("click", event => {
    const city = event.target.closest(".forecast-btn");

    if (city) {
        elements.forecastWindow.classList.add("visible");

        forecastController(city.id);
    }
});

// Add City Button click event
elements.addCityBtn.addEventListener("click", event => {
    // Clear the input field
    searchView.clearInput();

    // Clear search results
    clearUI(elements.searchResPlaceholder);
});

// Get the weather data from API When Page load
window.addEventListener("load", async event => {
    // Get the Geo Coordinates
    navigator.geolocation.getCurrentPosition(
        async pos => {
            // Save coordinates to state
            state.coords = {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            };

            await mainCityController();
        },
        err => {
            // Show Location not available screen
            showError(
                elements.mainCityPlaceholder,
                `Sorry! I don't have access to your location. Please enable it`,
                "denied"
            );
        }
    );

    //Show loading animation
    renderLoader(elements.mainCityPlaceholder);

    //Show Loading animation for added cities
    renderLoader(elements.subCityPlaceholder);

    // Initialize localstorage object
    state.storage = new LocalStorage();
    state.addedCities = state.storage.getSavedCities();

    if (!state.addedCities.length > 0) {
        // Show error message saying no saved cities
        showError(
            elements.subCityPlaceholder,
            `You don't have any cities saved. Click "Add Cities" button to add some`,
            "empty"
        );
    } else {
        await addedCityController();
    }
});

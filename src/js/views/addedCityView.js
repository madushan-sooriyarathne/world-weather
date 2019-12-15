import * as utilities from "../utilities";

import { elements, clearUI } from "./base";

export const addSubCity = data => {
    // Date calculation
    const date = new Date(parseInt(data.dt) * 1000);

    const markup = `
    <div class="cities__added--sub forecast-btn" id="${data.id}">
        <object type="image/svg+xml" data="img/svg/${
            data.weather[0].icon
        }.svg" class="icon-main">
            ${data.weather[0].description}
        </object>
        <div class="details">
            <div class="details__location">
                <h3 class="details__location--city">${data.name}</h3>
                <p class="details__location--country">${data.sys.country}</p>
            </div>
            <div class="details__datetime">
                <div class="details__datetime--time">${date
                    .toLocaleTimeString()
                    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</div>
                <div class="details__datetime--date">${date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                )}</div>
            </div>
        </div>
        <div class="status">
            <h3 class="temp">${utilities.tempConvert(
                parseInt(data.main.temp)
            )} °C</h3>
            <p class="state">${data.weather[0].main}</p>
        </div>
    </div>

    `;

    elements.subCityPlaceholder.insertAdjacentHTML("beforeend", markup);
};

export const addCities = cityList => {
    // Clear the UI Before inject the cities
    clearUI(elements.subCityPlaceholder);

    // Inject each one of cities to the DOM
    cityList.forEach(city => {
        addSubCity(city);
    });
};

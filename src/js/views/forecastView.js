import * as utilities from "../utilities";

import { elements, clearUI, renderPaginationButtons } from "./base";

const addForecastCard = data => {
    // Date calculation
    const date = new Date(parseInt(data.dt) * 1000);

    const markup = `

    <div class="forecast__item"">
        <object type="image/svg+xml" data="img/svg/${
            data.weather[0].icon
        }.svg" class="icon-main">
            ${data.weather[0].description}
        </object>
        <div class="details">
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
            <span class="other-temp">${utilities.tempConvert(
                parseInt(data.main.temp_min)
            )} °C - ${utilities.tempConvert(
        parseInt(data.main.temp_max)
    )} °C</span>
        </div>
    </div>
    `;

    elements.forecastPlaceholder.insertAdjacentHTML("beforeend", markup);
};

export const addCurrentWeather = (data, mainCity = false) => {
    //Clear UI before inject new html
    clearUI(elements.forecastCurrent);

    // Remove Button
    const removeBtn = mainCity
        ? ""
        : `<a href="#" class="btn btn__remove btn__small" data-remove="${data.id}">Remove this location</a>`;

    const date = new Date(parseInt(data.dt) * 1000);
    const outerElementMarkup = `
    <div class="cities__main">
        <h2 class="location">${data.name}, ${data.sys.country}</h2>

        <object type="image/svg+xml" data="img/svg/${
            data.weather[0].icon
        }.svg" class="icon-main">
            ${data.weather[0].description}
        </object>
        <div class="status">
            <h3 class="temp">${utilities.tempConvert(
                parseInt(data.main.temp)
            )} °C</h3>
            <p class="state">${data.weather[0].main}</p>
        </div>
        <div class="details">
            <div class="details__item">
                <object type="image/svg+xml" data="img/svg/thermometer-cold.svg">
                    Min Temp
                </object>
                <p>${utilities.tempConvert(parseInt(data.main.temp_min))} °C</p>
            </div>
            <div class="details__item">
                <object type="image/svg+xml" data="img/svg/thermometer-hot.svg">
                    Max Temp
                </object>
                <p>${utilities.tempConvert(parseInt(data.main.temp_max))} °C</p>
            </div>
            <div class="details__item">
                <object type="image/svg+xml" data="img/svg/pressure.svg">
                    Pressure
                </object>
                <p>${data.main.pressure} Pha</p>
            </div>
            <div class="details__item">
                <object type="image/svg+xml" data="img/svg/drop.svg">
                    Humidity
                </object>
                <p>${data.main.humidity}%</p>
            </div>
        </div>
        <div class="datetime">
            <div class="datetime__time">${date
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</div>
            <div class="datetime__date">${date.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric"
            })}</div>
        </div>
    </div>
    ${removeBtn}    
    
    `;

    // Add outer element to DOM
    elements.forecastCurrent.insertAdjacentHTML(
        "afterbegin",
        outerElementMarkup
    );
};

export const addForecasts = (dataset, page = 1, resPerPage = 4) => {
    // clear ui Before inject the elements to DOM
    clearUI(elements.forecastPlaceholder);

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // Add Forecast one by one to DOM
    dataset.slice(start, end).forEach(forecast => {
        addForecastCard(forecast);
    });

    // Inject pagination buttons to the DOM
    renderPaginationButtons(
        elements.forecastPagination,
        page,
        dataset.length,
        resPerPage
    );
};

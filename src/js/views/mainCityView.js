import * as utilities from "../utilities";

import { elements, clearUI } from "./base";

export const showMainCity = data => {
    // Clear UI Before inject this element to DOM
    clearUI(elements.mainCityPlaceholder);

    // Date calculation
    const date = new Date(parseInt(data.dt) * 1000);

    const markup = `
        <div class="cities__main forecast-btn" id="${data.id}">
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
    `;
    elements.mainCityPlaceholder.insertAdjacentHTML("afterbegin", markup);
};

import config from "../config";

export default class MainCityWeather {
    constructor(pos) {
        this._latitude = pos.lat;
        this._longitude = pos.long;
    }

    get weather() {
        return this._weather;
    }

    async getWeatherData() {
        const response = await fetch(
            `${config.proxy}${config.api.coordUrl}?lat=${this._latitude}&lon=${this._longitude}&appid=${config.api.key}`
        );
        this._weather = await response.json();
    }
}

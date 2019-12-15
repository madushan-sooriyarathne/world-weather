import config from "../config";

export default class CityWeather {
    constructor(cityid) {
        this._cityid = cityid;
    }

    get cityid() {
        return this._cityid;
    }

    get weather() {
        return this._weather;
    }

    async getWeatherData() {
        const response = await fetch(
            `${config.proxy}${config.api.baseUrl}?id=${this._cityid}&appid=${config.api.key}`
        );
        this._weather = await response.json();
    }
}

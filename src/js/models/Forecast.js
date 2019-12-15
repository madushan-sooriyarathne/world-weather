import config from "../config";

export default class Forecast {
    constructor(cityid) {
        this._cityid = cityid;
    }

    get cityid() {
        return this._cityid;
    }

    get result() {
        return this._result;
    }

    async fetchData() {
        try {
            const response = await fetch(
                `${config.api.forecastUrl}${this._cityid}&appid=${config.api.key}`
            );
            this._result = await response.json();
        } catch (err) {
            console.log(err.message);
        }
    }
}

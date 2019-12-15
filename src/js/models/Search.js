import config from "../config";

export default class Search {
    constructor(query) {
        this._query = query;
    }

    get query() {
        return this._query;
    }

    get result() {
        return this._result;
    }

    async getData() {
        try {
            let response = await fetch(
                `${config.proxy}${config.searchUrl}?q=${this._query}`
            );
            this._result = await response.json();
            // console.log(data);
        } catch (err) {
            throw Error(err.message);
        }
    }
}

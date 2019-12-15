/* Data Structure 
{
    addedCities: [citieIds...]
}


*/

export default class LocalStorage {
    consturctor() {
        //Nothing in here
    }

    getSavedCities() {
        try {
            const cities = JSON.parse(window.localStorage.getItem("cities"));

            if (cities.addedCities) {
                return cities.addedCities;
            } else {
                return [];
            }
        } catch (err) {
            // JSON.parse will throw a exception if there is no data in the string
            // if so, here we catch that error and return a empty array
            return [];
        }
    }

    initializeStorage(data = {}) {
        // if no arguments is passed. the default empty object will be used
        // Data has to be a object
        window.localStorage.setItem("cities", JSON.stringify(data));
    }

    addCity(cityId) {
        let savedCities = this.getSavedCities();
        savedCities.push(cityId);

        // Save the data in the local Storage
        this.initializeStorage({
            addedCities: savedCities
        });
    }

    deleteCity(cityId) {
        let savedCities = this.getSavedCities();
        if (savedCities.length > 0) {
            savedCities.splice(
                savedCities.findIndex(el => el === cityId),
                1
            );

            // Save the updated data to the local storage
            this.initializeStorage({
                addedCities: savedCities
            });
        }
    }

    clearLocalStorage() {
        window.localStorage.clear(); // Delete all the data in localStorage
    }
}

export const elements = {
    addCityBtn: document.querySelector("#add-cities"),
    searchField: document.querySelector(".search-input"),
    searchForm: document.querySelector(".search-form"),
    searchResPlaceholder: document.querySelector(".search-result"),
    mainCityPlaceholder: document.querySelector(".cities__main-placeholder"),
    subCityPlaceholder: document.querySelector(".cities__added-placeholder"),
    forecastPlaceholder: document.querySelector(".forecast-placeholder"),
    forecastBtn: document.querySelectorAll(".forecast-btn"),
    forecastWindow: document.querySelector("#forecast"),
    forecastClose: document.querySelector("#forecast-close-btn"),
    forecastOuter: document.querySelector(".forecast"),
    searchPagination: document.querySelector(".search-pagination"),
    forecastPagination: document.querySelector(".forecast-pagination"),
    forecastCurrent: document.querySelector(".forecast-current"),
    clearCitiesBtn: document.querySelector("#clear-cities")
};

export const showError = (parent, message, icon) => {
    // Clear UI before show error
    clearUI(parent);

    const markup = `
        <div class="error-message">
        <img src="img/svg/${icon}.svg" alt="${icon}">
        <p>${message}</p>
        </div>
    `;
    parent.insertAdjacentHTML("beforeend", markup);
};

export const clearUI = parent => {
    parent.innerHTML = "";
};

export const renderLoader = parent => {
    // Clear UI before show loading animation
    clearUI(parent);

    const markup = `
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    `;
    parent.insertAdjacentHTML("beforeend", markup);
};

// Type: prev | next
const createButtons = (type, page) => `
    <a class="btn__page btn__page--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
}>
        <div class="content">
            <img src="img/svg/${
                type === "prev" ? "left" : "right"
            }-arrow.svg" type="image/svg+xml" class="pagination-${type}"></img>
            <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        </div>
    </a>
`;

export const renderPaginationButtons = (
    parent,
    page,
    noOfResults,
    resPerPage
) => {
    const pages = Math.ceil(noOfResults / resPerPage);

    let markup;
    if (page === 1 && pages > 1) {
        markup = createButtons("next", page);
    } else if (page > 1 && page < pages) {
        markup = `${createButtons("prev", page)}
        ${createButtons("next", page)}`;
    } else if (page === pages && pages > 1) {
        markup = createButtons("prev", page);
    } else {
        markup = ``;
    }

    parent.insertAdjacentHTML("beforeend", markup);
};

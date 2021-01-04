import { elements, clearUI, renderPaginationButtons } from "./base";

const addToSearchUI = item => {
    const markup = `
    <div class="search-result__card">
        <h1 class="city">${item.name}, <span>${item.country}</span></h1>
        <a href="#" class="btn btn__add search-add" id="${item.id}">Add</a>
    </div>
    `;

    elements.searchResPlaceholder.insertAdjacentHTML("beforeend", markup);
};

export const showSearchResults = (results, page = 1, resPerPage = 5) => {
    // Clear UI before inject the search results to DOM
    clearUI(elements.searchResPlaceholder);

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // inject results to DOM one by one
    results.slice(start, end).forEach(item => {
        addToSearchUI(item);
    });

    // Inject pagination buttons to the DOM
    renderPaginationButtons(
        elements.searchPagination,
        page,
        results.length,
        resPerPage
    );
};

export const getValue = () => elements.searchField.value;

export const clearInput = () => (elements.searchField.value = "");

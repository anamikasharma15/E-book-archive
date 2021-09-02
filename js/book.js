const url = ` https://openlibrary.org/search.json?q=${searchText}`;
fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data));
    // .catch(error => displayError(error));
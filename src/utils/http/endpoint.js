const ENDPOINTS = {
    searchBreweries: (queryParam) => `search?query=${queryParam}`,
    getBrewery: (id) => `${id}`
};

export default ENDPOINTS;
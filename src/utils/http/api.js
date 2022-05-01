import { service } from "./fetch";
import ENDPOINTS from "./endpoint";

export function searchBreweries(searchQuery) {
    return service
      .get(ENDPOINTS.searchBreweries(searchQuery))
      .then(res => res.data)
      .catch(err => err);
};

export function getBrewery(id) {
    return service
        .get(ENDPOINTS.getBrewery(id))
        .then(res => res.data)
        .catch(err => err);
}
import { service } from "./fetch";
import ENDPOINTS from "./endpoint";

export function getBanks(cityName, category, value) {
    return service
      .get(ENDPOINTS.getBanks(cityName, category, value))
      .then(res => res.data)
      .catch(err => err);
};
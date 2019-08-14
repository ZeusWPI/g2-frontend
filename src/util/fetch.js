import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const http = axios.create({
    baseURL: "/",
    headers: { "Cache-Control": "no-cache" },

    // Enable caching by default.
    adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

/**
 * Fetch data from the backend.
 *
 * @param {*} url URL/endpoint to fetch.
 * @param {*} [type="GET"] Type of the request (GET | POST)
 * @param {*} [options={}] Axios options.
 * @returns
 */
export function fetch(url, type = "GET", options = {}) {
    // Create the initial data object.
    const query = {
        loading: true,
        data: null,
        error: null
    };

    // Execute the request using Axios.
    http({
        method: type,
        url: url,
        ...options
    })
        // Retrieve the data.
        .then(response => {
            query.data = response.data;
        })

        // Catch potential errors.
        .catch(error => {
            query.error = error;
        })

        // Disable loading.
        .finally(() => {
            query.loading = false;
        });

    return query;
}

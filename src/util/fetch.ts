import Vue from "vue";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import Query from "../data/structs/Query";
import Project from "../data/models/Project";
import Model, { ModelFactory } from "../data/structs/Model";

/* const http = axios.create({
    baseURL: "/",
    headers: { "Cache-Control": "no-cache" },

    // Enable caching by default.
    //adapter: cacheAdapterEnhancer(axios.defaults.adapter)
}); */

/**
 * Fetch data from the backend.
 *
 * @param {*} url URL/endpoint to fetch.
 * @param {*} [type="GET"] Type of the request (GET | POST)
 * @param {*} [options={}] Axios options.
 * @returns
 */
export function fetch<T extends Model>(
    url: string,
    create: Function,
    type: string = "GET",
    options: Object = {}
) {
    // Create the initial data object.
    const query = new Query<T>();

    // Set the initial query state.
    Vue.set(query, "loading", true);

    axios(url, options)
        .then(
            response => {
                const data = response.data;
                let model;

                if (Array.isArray(data)) {
                    model = new Array<T>();

                    for (const value of data) {
                        const valueModel = create();
                        valueModel.parse(value);

                        model.push(valueModel);
                    }
                } else {
                    model = create();
                    model.parse(data);
                }

                // Update the data in the query.
                Vue.set(query, "data", model);
            },
            error => {
                // Update the error in the query.
                Vue.set(query, "error", error);
            }
        )
        .finally(() => {
            // Update the loading in the query.
            Vue.set(query, "loading", false);
        });

    return query;
}

import Vue from "vue";
import axios from "axios";
import Model from "../data/structs/Model";
import Query from "@/data/structs/Query";

export interface FetchActions<T extends Model> {
    onStartLoading(): void;
    onEndLoading(): void;
    onData(model: T): void;
    onError(error: string): void;
}

/**
 * Fetch data from the backend.
 *
 * @param url URL/endpoint to fetch.
 * @param create Function to create a model to return when the data was fetched successfully
 * @param method Type of the request (GET | POST)
 * @param options Axios options.
 * @returns
 */
export function fetch<T>(
    url: string,
    create: Function,
    method: any = "GET",
    options: Object = {}
): Promise<T | string> {
    return new Promise((resolve, reject) => {
        axios({ method, url, ...options }).then(
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

                resolve(model);
            },
            error => {
                reject(error);
            }
        );
    });
}

export function fetchQuery<T>(fetch: Promise<T | string>): Query<T> {
    // Create the initial data object.
    const query = new Query<T>();

    // Set the initial query state.
    Vue.set(query, "loading", true);

    fetch
        .then(
            response => {
                // Update the data in the query.
                Vue.set(query, "data", response);
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

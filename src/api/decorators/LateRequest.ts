import Vue from "vue";
import { EchoPromise } from "echofetch";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";

export function LateRequest<T>(reqOptions: {
    /**
     * Request to complete
     * @param value
     */
    request: (...args: any[]) => EchoPromise<T>;

    /**
     * Arguments to pass to the request.
     * WARNING: The first of the arguments will be the given origin[path] variable.
     */
    requestArguments?: [unknown];

    /**
     * Path of the original variable to watch & use as variable.
     */
    origin: string;

    /**
     * Optional path to use when specifying an object (such as EchoPromise)
     */
    path?: string;
}): VueDecorator {
    return createDecorator((options: ComponentOptions<Vue>, key: string): void => {
        // If no watchers are present, create the section.
        if (typeof options.watch !== "object") {
            options.watch = Object.create(null);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const watch: any = options.watch;

        if (typeof watch[reqOptions.origin] === "object" && !Array.isArray(watch[reqOptions.origin])) {
            watch[reqOptions.origin] = [watch[reqOptions.origin]];
        } else if (typeof watch[reqOptions.origin] === "undefined") {
            watch[reqOptions.origin] = [];
        }

        /**
         * Watch handler used for watching the given "origin".
         * When the "origin" succeeded, handle the request.
         * @param value
         */
        function watchHandler<T>(this: Vue, value: EchoPromise<T> | string | number) {
            let pathValue;

            // If the given type is a primitive type.
            if (typeof value === "string" || typeof value === "number") {
                // Ignore the given "path" since this is a primitive type.
                pathValue = value;
            }

            // If the type is an EchoPromise
            else if (typeof value === "object" && typeof value.isSuccess === "function") {
                pathValue = (reqOptions.path ?? "").split(".").reduce((o, i) => o[i], value.requireData() as any);
            }

            // Set the value of the given path.
            (this as any)[key] = reqOptions.request(pathValue, ...(reqOptions.requestArguments ?? []));
        }

        // Add the watcher to the watchers list
        watch[reqOptions.origin].push({
            handler: watchHandler,
            deep: true,
            immediate: true
        });

        // Add an initial "null"-value to the data list.
        options.mixins?.push({
            data(this: Vue) {
                return {
                    [key]: null
                };
            }
        });
    });
}

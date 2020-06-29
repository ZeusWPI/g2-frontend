import Vue from "vue";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";

/**
 * Decorator for getting/mutating state from a store.
 * @param getterName Name of the getter (getter inside Vuex module)
 * @param actionName Name of the action to use (action inside Vuex module)
 */
export function StoreModel(
    getterName: string,
    actionName: string
): VueDecorator {
    return createDecorator(
        (options: ComponentOptions<Vue>, key: string): void => {
            if (options.computed === undefined) {
                options.computed = {};
            }

            options.computed[key] = {
                get(this: Vue) {
                    return this.$store.getters[getterName];
                },

                set(this: Vue, ...args: [unknown]) {
                    return this.$store.dispatch(actionName, args);
                }
            };
        }
    );
}

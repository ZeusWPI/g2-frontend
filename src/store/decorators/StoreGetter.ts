import Vue from "vue";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";

/**
 * Decorator for getting from a store.
 * @param getterName Name of the getter (getter inside Vuex module)
 */
export function StoreGetter(getterName: string): VueDecorator {
    return createDecorator((options: ComponentOptions<Vue>, key: string): void => {
        if (options.computed === undefined) {
            options.computed = {};
        }

        options.computed[key] = {
            get(this: Vue) {
                return this.$store.getters[getterName];
            }
        };
    });
}

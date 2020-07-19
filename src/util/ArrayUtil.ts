import Vue from "vue";

export class ArrayUtil {
    /**
     * Delete a value from an array by value.
     * @param array
     * @param value
     */
    static delete<T>(array: Array<T>, value: T) {
        array.splice(array.indexOf(value), 1);
    }

    /**
     * Update a value inside an array by its old value.
     * @param array
     * @param oldValue
     * @param newValue
     */
    static update<T>(array: Array<T>, oldValue: T, newValue: T) {
        const index = array.indexOf(oldValue);
        array[index] = newValue;

        // Reactive update of array
        Vue.set(array, index, newValue);
    }
}

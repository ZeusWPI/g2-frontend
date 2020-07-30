import { InputFields } from "@/types/fields/InputFields";

export class InputFieldUtil {
    /**
     * Map the InputField-objects on an object with values.
     * @param fields Object containing all the different InputField-objects
     */
    static getValues(fields: InputFields): any {
        return Object.fromEntries(Object.entries(fields).map(([key]) => [key, fields[key].value]));
    }

    /**
     * Clear a given set of fields.
     * @param fields Object containing all the different InputField-objects
     */
    static clear(fields: InputFields) {
        Object.entries(fields).forEach(([key]) => {
            fields[key].value = "";
            fields[key].error = "";
        });
    }
}

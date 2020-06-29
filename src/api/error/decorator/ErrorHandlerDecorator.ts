import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { EchoPromise } from "echofetch";

/**
 * Decorator for handling potential errors of an EchoPromise.
 */
export function HandleError<T>(errorOptions: CustomErrorOptions): Function {
    return (target: any, key: string) => {
        // Property Value
        let value = target[key];

        // Property Getter
        const getter = () => value;

        // Property Setter
        const setter = (newValue: EchoPromise<T>) => {
            value = newValue;
        };

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        };
    };
}

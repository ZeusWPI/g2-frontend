import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { CustomError } from "@/api/error/types/CustomError";

/**
 * Payload that will be passed to the component specified in the error component binding.
 */
export class ErrorComponentPayload {
    /**
     * Error Value
     */
    public error: CustomError;

    /**
     * Error Options
     */
    public options: CustomErrorOptions;
}

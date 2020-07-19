import { EchoError } from "echofetch";

/**
 * Wrapper around an EchoError containing some extra information in order to better display the error.
 */
export interface CustomError extends EchoError {
    /**
     * Custom message.
     * This will be used when an error code matches a given CustomErrorMessage.
     */
    customMessage?: string;

    /**
     * Custom description.
     * This will be used when an error code matches a given CustomErrorMessage.
     */
    customDescription?: string;
}

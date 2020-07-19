import { EchoError } from "echofetch";
import { CustomError } from "@/api/error/types/CustomError";
import { CustomErrorMessage } from "@/api/error/types/CustomErrorMessage";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldError } from "@/types/fields/InputFieldError";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import ErrorBus from "@/api/error/ErrorBus";

/**
 * List with custom error messages for certain response codes/messages
 */
const globalCustomMessages: Array<CustomErrorMessage> = [
    {
        code: "401",
        message: "You are not logged in",
        description: "You are currently nog logged in. Please login and try again!"
    },
    {
        code: "404",
        message: "Page not found",
        description:
            "We cannot find the page you are looking for. The page is no longer available or was moved to a different location."
    },

    {
        code: "500",
        message: "Internal server error.",
        description: "We are having issues with the server. Please try again later."
    },

    {
        code: "502",
        message: "Server is currently offline.",
        description: "We are having issues with the server. Please try again later."
    },

    {
        code: "network_error",
        message: "Unable to connect to server",
        description:
            "We are unable to connect to the server to retrieve information. Please check if you have a valid internet connection & try again later."
    }
];

export class ErrorHandler {
    /**
     * Handle an error.
     * @param error Error to handle, received from an EchoFetch service.
     * @param options Custom error options. Allows to provide the styling for the error.
     * @param fields Optional list with input fields. Individual input errors will be displayed on the correct field.
     * @param emit Should the error be emitted on the ErrorBus. (only used on internal ErrorPlaceholder)
     */
    static handle(error: EchoError, options: CustomErrorOptions, fields: InputFields = {}, emit = false): CustomError {
        const customError: CustomError = error;

        // Add custom status code for network errors.
        if (error.message.startsWith("Network Error")) {
            customError.code = "network_error";
        }

        // Handle custom message.
        this.handleCustomMessage(customError, options);

        // Handle field errors.
        this.handleInputFields(error, fields);

        // Handle general errors.
        this.handleGeneral(customError);

        // Emit full page errors on the ErrorBus.
        if (emit) {
            // Emit the error on the ErrorBus.
            ErrorBus.$emit("error", error, options);
        }

        // If the error type is a snackbar, spawn a snackbar.
        if (options.style === "SNACKBAR") {
            SnackbarHandler.open({
                message: customError.customMessage ?? "",
                color: "error"
            });
        }

        return customError;
    }

    /**
     * Update the custom error message & description with the correct data based on
     * the given CustomError Messages.
     * @param customError Custom Error.
     * @param options Error options
     */
    static handleCustomMessage(customError: CustomError, options: CustomErrorOptions) {
        // Stitch the given global & given custom error messages together.
        // The given messages have a higher priority.
        const messages = [...globalCustomMessages, ...(options.customMessages || [])];

        // Check if the error code is present inside the messages.
        const message = messages.find(
            message => message.code === customError.response?.status.toString() || message.code === customError.code
        );

        // Update the custom error when the message is present.
        if (message) {
            customError.customMessage = message.message;
            customError.customDescription = message.description;
        } else {
            customError.customMessage = customError.message;
        }
    }

    /**
     * Handle general errors.
     * This will update the custom error message with the message from the first general error.
     * @param customError Custom Error.
     */
    static handleGeneral(customError: CustomError) {
        // Check if the general errors are undefined.
        if (
            !customError ||
            !customError.response ||
            !customError.response.data ||
            !customError.response.data.generalErrors
        ) {
            return;
        }

        const generalErrors = customError.response.data.generalErrors;

        // Check if any general error was found.
        if (generalErrors.length > 0) {
            // Modify the custom error message to contain the first general error.
            customError.message = generalErrors[0].message;
        }
    }

    /**
     * Handle the error for the given InputFields.
     * This will add an error on every given field with an error.
     * @param error Error to handle, received from an EchoFetch service.
     * @param fields List with input fields. Individual input errors will be displayed on the correct field.
     */
    static handleInputFields(error: EchoError, fields: InputFields) {
        // Check if the input errors are undefined.
        if (!error || !error.response || !error.response.data || !error.response.data.inputErrors) {
            return;
        }

        const inputErrors = error.response.data.inputErrors;

        // Set the error messages for every field.
        for (const fieldName of Object.keys(fields)) {
            const fieldValue = fields[fieldName];
            const fieldNewError = inputErrors.find((inputError: InputFieldError) => inputError.field === fieldName);

            // Set the new error message, when available.
            if (fieldNewError) {
                fieldValue.error = fieldNewError.message;
            }

            // Otherwise set an empty error. (necessary for reset of previous error)
            else {
                fieldValue.error = "";
            }
        }
    }
}

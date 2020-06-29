import { CustomErrorMessage } from "@/api/error/types/CustomErrorMessage";

/**
 * Options on how to display the error.
 */
export interface CustomErrorOptions {
    /**
     * Way to display the error on screen.b
     */
    style: "SNACKBAR" | "CARD" | "SECTION" | "NONE";

    /**
     * Should the error be displayed on a separate page.
     * This will keep the route of the current page but will remove all the router view contents.
     */
    displayFullPage?: boolean;

    /**
     * List with custom error messages for a specific HTTP status code.
     */
    customMessages?: Array<CustomErrorMessage>;
}

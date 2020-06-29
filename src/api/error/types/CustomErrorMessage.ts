/**
 * Custom error message for a given code.
 * All errors with the given "code" will use the message & description provided here.
 */
export class CustomErrorMessage {
    /**
     * HTTP status code.
     */
    public code: string;

    /**
     * Custom message to display when an error with the specified code occurs.
     */
    public message: string;

    /**
     * Custom description to display with the error message.
     */
    public description: string;
}

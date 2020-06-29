export class Snackbar {
    /**
     * Message to display.
     */
    message: string;

    /**
     * Location on the X-axis.
     */
    x?: "right" | "left" | "center" = "right";

    /**
     * Location on the Y-axis.
     */
    y?: "top" | "bottom" = "bottom";

    /**
     * Color of the snackbar.
     */
    color?: string = "primary";

    /**
     * Timeout delay before disappearing
     */
    timeout?: number = 8000;
}

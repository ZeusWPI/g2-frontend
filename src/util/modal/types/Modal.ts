export class Modal {
    /**
     * Component to display inside the modal.
     */
    component: unknown | Function;

    /**
     * Payload to pass to the component.
     * The modal component will receive this data as the prop "payload".
     */
    componentPayload?: unknown = {};

    /**
     * Width of the modal
     */
    width?: number = 600;

    /**
     * Should the modal fill the entire screen.
     */
    fullscreen?: boolean = false;

    /**
     * Should the modal be responsive.
     * This will make the modal fullscreen when the screen becomes to small.
     */
    responsive?: boolean = true;

    /**
     * Animation while opening/closing the modal.
     */
    transition?: string = "dialog-transition";
}

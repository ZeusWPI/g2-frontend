export class ContextMenuLink {
    /**
     * Text to display.
     */
    text: string;

    /**
     * Icon to display.
     */
    icon: string;

    /**
     * Action to execute when clicking on the item.
     */
    action: () => void;
}

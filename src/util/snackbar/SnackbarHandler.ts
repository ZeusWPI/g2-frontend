import { Snackbar } from "@/util/snackbar/types/Snackbar";
import SnackbarBus from "@/util/snackbar/SnackbarBus";

export class SnackbarHandler {
    /**
     * Open a snackbar.
     * @param snackbar Snackbar to open.
     */
    static open(snackbar: Snackbar): void {
        // Snackbar could be passed as an inline object.
        // This will not contain the default values.
        // Create an empty snackbar so default values are present.
        const snackbarInstance = { ...new Snackbar(), ...snackbar };

        // Emit the snackbar open event on the ModalBus.
        SnackbarBus.$emit("snackbar-open", snackbarInstance);
    }

    /**
     * Close any open modal.
     */
    static close(): void {
        // Emit the snackbar close event on the ModalBus.
        SnackbarBus.$emit("snackbar-close");
    }
}

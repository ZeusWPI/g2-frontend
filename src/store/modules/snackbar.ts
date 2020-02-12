export class SnackbarData {
    public message: string;
    public x: string;
    public y: string;
    public color: string;
    public timeout: number;

    constructor() {
        this.message = "";
        this.x = "right";
        this.y = "bottom";
        this.color = "info";
        this.timeout = 6000;
    }
}

export const snackbar = {
    namespaced: true,

    state: {
        open: false,
        data: {}
    },

    mutations: {
        /**
         * Open/close the snackbar.
         *
         * @param state
         * @param open
         */
        SET_OPEN(state, open: boolean) {
            state.open = open;
        },

        /**
         * Set the snackbar data.
         *
         * @param state
         * @param data
         */
        SET_DATA(state, data: SnackbarData) {
            // Join a new snackbar with the given data.
            // This is so you only have to provide the changes.
            state.data = {
                ...new SnackbarData(),
                ...data
            };
        }
    },

    actions: {
        /**
         * Open a new snackbar.
         *
         * @param context
         * @param data
         */
        open(context, data: SnackbarData) {
            context.commit("SET_OPEN", false);
            context.commit("SET_DATA", data);
            context.commit("SET_OPEN", true);
        },

        /**
         * Close the opened snackbar.
         *
         * @param context
         */
        close(context) {
            context.commit("SET_OPEN", false);
        }
    }
};

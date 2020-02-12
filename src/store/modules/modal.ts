export class ModalData {
    public title: string;
    public content: string;
    public component: string;
    public width: number;

    constructor() {
        this.title = "";
        this.content = "";
        this.component = "";
        this.width = 600;
    }
}

export const modal = {
    namespaced: true,

    state: {
        open: false,
        data: {}
    },

    mutations: {
        /**
         * Open/close the modal.
         *
         * @param state
         * @param open
         */
        SET_OPEN(state, open: boolean) {
            state.open = open;
        },

        /**
         * Set the snackbar modal.
         *
         * @param state
         * @param data
         */
        SET_DATA(state, data: ModalData) {
            
            // Join a new modal with the given data.
            // This is so you only have to provide the changes.
            state.data = {
                ...new ModalData(),
                ...data
            };
        }
    },

    actions: {
        /**
         * Open a new modal.
         *
         * @param context
         * @param data
         */
        open(context, data: ModalData) {
            context.commit("SET_OPEN", false);
            context.commit("SET_DATA", data);
            context.commit("SET_OPEN", true);
        },

        /**
         * Close the opened modal.
         *
         * @param context
         */
        close(context) {
            context.commit("SET_OPEN", false);
        }
    },
};

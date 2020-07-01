import { User } from "@/api/models/User";
import { EchoPromise } from "echofetch";
import AuthService from "@/api/services/AuthService";

export const session = {
    namespaced: true,

    state: {
        currentUser: null
    },

    mutations: {
        /**
         * Set the logged in user.
         * @param state Vuex state.
         * @param currentUser User that is logged in.
         */
        SET_CURRENTUSER(state: any, currentUser: EchoPromise<User>) {
            state.currentUser = currentUser;
        }
    },

    actions: {
        /**
         * Fetch the current logged in user & update the store.
         * @param context Vuex context.
         */
        fetch(context: any) {
            context.commit("SET_CURRENTUSER", AuthService.get());
        }
    },

    getters: {
        /**
         * Get the current user.
         * @param state Vuex state.
         */
        currentUser(state: any): EchoPromise<User> {
            return state.currentUser;
        },

        /**
         * Get if the user is authenticated (logged in).
         * @param state Vuex state.
         */
        isAuthenticated(state: any): boolean {
            return state.currentUser.isSuccess();
        },

        /**
         * Get if the user is admin (logged in).
         * @param state Vuex state.
         */
        isAdmin(state: any): boolean {
            return state.currentUser.isSuccess() && state.currentUser.requireData().admin;
        }
    }
};

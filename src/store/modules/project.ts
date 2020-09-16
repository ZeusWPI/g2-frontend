import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import { Optional } from "@/types/Optional";

export const project = {
    namespaced: true,

    state: {
        currentProject: null
    },

    mutations: {
        /**
         * Set the current project that is being viewed.
         * @param state Vuex state.
         * @param currentProject The current project.
         */
        SET_CURRENT_PROJECT(state: any, currentProject: Optional<EchoPromise<Project>>) {
            state.currentProject = currentProject;
        }
    },

    actions: {
        /**
         * Fetch the current logged in user & update the store.
         * @param context Vuex context.
         * @param currentProject The current project.
         */
        setCurrentProject(context: any, currentProject: Optional<EchoPromise<Project>>) {
            context.commit("SET_CURRENT_PROJECT", currentProject);
        }
    },

    getters: {
        /**
         * Get the project.
         * @param state Vuex state.
         */
        currentProject(state: any): Optional<EchoPromise<Project>> {
            return state.currentProject;
        }
    }
};

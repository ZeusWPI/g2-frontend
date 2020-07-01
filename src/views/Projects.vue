<template>
    <v-container class="container--small">
        <!-- Action bar -->
        <v-row justify="space-between">
            <v-col cols="12" sm="">
                <v-text-field
                    v-model="search"
                    label="Search for a project"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    hide-details
                />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed @click="openCreate">
                    Nieuw project
                    <v-icon right dark>mdi-plus-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Projects -->
        <v-row>
            <!-- Loading -->
            <template v-if="projects.isLoading()">
                <project-card v-for="index of 8" :key="index" :loading="true" />
            </template>

            <!-- No Data -->
            <template v-else-if="projects.isSuccess() && projectsFiltered.length <= 0">
                <v-col cols="12">
                    <h2>No projects found</h2>
                    There are no projects available for the given search parameters.
                </v-col>
            </template>

            <!-- Data -->
            <template v-else-if="projects.isSuccess()">
                <project-card v-for="(project, index) of projectsFiltered" :key="index" :project="project" />
            </template>

            <!-- Error -->
            <template v-else-if="projects.isError()">
                <error-placeholder :error="projects.error" :options="{ style: 'SECTION', displayFullPage: true }" />
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import ProjectService from "@/api/services/ProjectService";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import { ModalHandler } from "@/util/modal/ModalHandler";
import ProjectCreateModal from "@/components/projects/modals/ProjectCreateModal.vue";

@Component({
    components: { ProjectCard, ErrorPlaceholder }
})
export default class ProjectsView extends Vue {
    /**
     * List with available projects
     */
    projects: EchoPromise<Project[]> = ProjectService.getAll();

    /**
     * Search field value.
     */
    search = "";

    /**
     * Get the list with projects, filtered on the given search string.
     */
    get projectsFiltered(): Project[] {
        const projects = this.projects.data || [];

        return projects.filter(project => project.name.includes(this.search));
    }

    /**
     * Open the create projects modal.
     */
    openCreate() {
        ModalHandler.open({
            component: ProjectCreateModal,
            responsive: true
        });
    }
}
</script>

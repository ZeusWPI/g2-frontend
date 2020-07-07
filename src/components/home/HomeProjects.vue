<template>
    <div>
        <!-- Loading -->
        <template v-if="popularProjects.isLoading()">
            <v-skeleton-loader v-for="index of 3" :key="index" type="list-item-avatar-three-line" />
        </template>

        <!-- Data -->
        <template v-else-if="popularProjects.isSuccess()">
            <v-card>
                <!-- Create a new project. -->
                <v-btn absolute dark fab top right color="secondary" @click="openCreate">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-card-title>
                    {{ t("home.projects") }}
                </v-card-title>

                <project-list :projects="popularProjects.data" />
            </v-card>
        </template>

        <!-- Error -->
        <template v-else-if="popularProjects.isError()">
            <error-placeholder :error="popularProjects.error" :style="{ style: 'CARD' }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import ProjectService from "@/api/services/ProjectService";
import ProjectList from "@/components/projects/ProjectList.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import { ModalHandler } from "@/util/modal/ModalHandler";
import ProjectCreateModal from "@/components/projects/modals/ProjectCreateModal.vue";

@Component({
    components: { ErrorPlaceholder, ProjectList }
})
export default class HomeProjects extends Vue {
    /**
     * Popular projects.
     */
    popularProjects: EchoPromise<Project[]> = ProjectService.getAll("popular", 5);

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

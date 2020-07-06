<template>
    <div>
        <!-- Loading -->
        <template v-if="repositories.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="repositories.isSuccess()">
            <!-- Actions -->
            <v-row justify="space-between">
                <v-col>
                    <v-text-field v-model="search" label="Search for a repository" outlined dense />
                </v-col>

                <v-col cols="auto">
                    <v-btn color="primary" depressed @click="openEdit">
                        <v-icon left>
                            mdi-pencil
                        </v-icon>

                        {{ t("edit") }}
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Repositories -->
            <repositories-table :repositories="repositories.data" :search.sync="search" />
        </template>

        <!-- Error -->
        <template v-else-if="repositories.isError()">
            <error-placeholder :error="repositories.error" :options="{ style: 'SECTION' }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { Repository } from "@/api/models/Repository";
import ProjectService from "@/api/services/ProjectService";
import RepositoriesTable from "@/components/projects/tables/RepositoriesTable.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder, RepositoriesTable }
})
export default class ProjectRepositories extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Repositories for the given project.
     */
    repositories: EchoPromise<Repository[]> = ProjectService.repositories(this.project.id);

    /**
     * Search value.
     */
    search = "";

    /**
     * Edit the linked repositories of the project.
     */
    openEdit() {
        ModalHandler.open({
            component: () => import("./modals/ProjectRepositoriesModal.vue"),
            componentPayload: {
                project: this.project,
                projectRepositories: this.repositories.requireData()
            },
            fullscreen: true,
            transition: "dialog-bottom-transition"
        });
    }
}
</script>

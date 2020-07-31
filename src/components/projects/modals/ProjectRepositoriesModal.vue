<template>
    <v-card tile>
        <!-- Toolbar -->
        <v-toolbar color="primary" dark flat>
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>Repository Manager</v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
                <v-btn dark text @click="save" :disabled="loading" :loading="loading">
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
            <!-- Loading -->
            <template v-if="repositories.isLoading()">
                <v-skeleton-loader type="table" />
            </template>

            <!-- Data -->
            <template v-else-if="repositories.isSuccess()">
                <!-- Search -->
                <v-row>
                    <v-col cols="12" sm="" align-self="center">
                        <v-chip
                            v-for="(repository, index) of tableSelected"
                            :key="index"
                            class="mr-2 mb-2"
                            close
                            @click:close="removeSelection(repository)"
                        >
                            {{ repository.name }}
                        </v-chip>
                    </v-col>

                    <v-col cols="12" sm="" align-self="center">
                        <v-text-field
                            v-model="tableSearch"
                            label="Search for repository"
                            append-icon="mdi-magnify"
                            hide-details
                            outlined
                            dense
                        />
                    </v-col>
                </v-row>

                <!-- Table -->
                <v-data-table
                    v-model="tableSelected"
                    :items="repositories.data"
                    :headers="tableHeaders"
                    :search="tableSearch"
                    show-select
                    item-key="name"
                >
                </v-data-table>
            </template>

            <!-- Error -->
            <template v-else-if="repositories.isError()">
                <error-placeholder :error="repositories.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { EchoPromise } from "echofetch";
import { Repository } from "@/api/models/Repository";
import { ArrayUtil } from "@/util/ArrayUtil";
import { Project } from "@/api/models/Project";
import RepositoryService from "@/api/services/RepositoryService";
import ProjectService from "@/api/services/ProjectService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import { RouterUtil } from "@/util/RouterUtil";

@Component({
    components: { ErrorPlaceholder }
})
export default class ProjectRepositoriesModal extends Vue {
    /**
     * Payload passed as prop.
     */
    @Prop()
    payload: {
        project: Project;
        projectRepositories: Repository[];
    };

    /**
     * Available repositories.
     */
    repositories: EchoPromise<Repository[]> = RepositoryService.getAll();

    /**
     * If the update request is loading.
     */
    loading = false;

    /**
     * Table headers.
     */
    tableHeaders = [
        {
            text: "Name",
            value: "name"
        },

        {
            text: "Description",
            value: "description"
        },

        {
            text: "URL",
            value: "url"
        }
    ];

    /**
     * Table search value.
     */
    tableSearch = "";

    /**
     * Selected repositories.
     */
    tableSelected: Repository[] = this.payload.projectRepositories;

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Remove a repository from the selection.
     * @param repository Repository to remove from the selection.
     */
    removeSelection(repository: Repository) {
        ArrayUtil.delete(this.tableSelected, repository);
    }

    /**
     * Save the changes.
     */
    async save() {
        this.loading = true;

        // Find all the newly selected repositories.
        const linkRepositories = this.tableSelected.filter(
            repository => !this.payload.projectRepositories.includes(repository)
        );

        // Find all the unselected repositories.
        const unlinkRepositories = this.payload.projectRepositories.filter(
            repository => !this.tableSelected.includes(repository)
        );

        // Link the selected repositories.
        for (const repository of linkRepositories) {
            try {
                await ProjectService.linkEntity(this.payload.project.id, repository.id);
            } catch (error) {
                ErrorHandler.handle(error, {
                    style: "SNACKBAR"
                });

                this.loading = false;

                return;
            }
        }

        // Unlink the selected repositories.
        for (const repository of unlinkRepositories) {
            try {
                await ProjectService.unlinkEntity(this.payload.project.id, repository.id);
            } catch (error) {
                ErrorHandler.handle(error, {
                    style: "SNACKBAR"
                });

                this.loading = false;

                return;
            }
        }

        this.loading = false;

        // Send success snackbar.
        SnackbarHandler.open({
            message: "Linked repositories have been updated",
            color: "success"
        });

        // Close the modal.
        ModalHandler.close();

        // Reload the page.
        await RouterUtil.reload(this.$router);
    }
}
</script>

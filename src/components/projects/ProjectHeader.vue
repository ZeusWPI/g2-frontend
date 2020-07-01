<template>
    <div>
        <v-row justify="space-between" no-gutters>
            <!-- General Information -->
            <v-col cols="auto">
                <!-- Title -->
                <inline-edit v-model="project.name" :update="updateName">
                    <div class="project__title">
                        {{ project.name }}
                    </div>
                </inline-edit>

                <!-- Description -->
                <inline-edit v-model="project.description" :update="updateDescription">
                    <div class="project__description text--secondary">
                        {{ project.description }}
                    </div>
                </inline-edit>
            </v-col>

            <!-- Actions -->
            <v-col cols="auto" class="d-flex align-center">
                <v-btn color="error" text @click="openDelete">
                    <v-icon left>mdi-delete</v-icon>

                    Delete
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import { EchoPromise } from "echofetch";
import ProjectService from "@/api/services/ProjectService";
import InlineEdit from "@/components/util/InlineEdit.vue";
import ConfirmModal from "@/components/layout/modals/confirm/ConfirmModal.vue";

@Component({
    components: { InlineEdit }
})
export default class ProjectHeader extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Update the project name.
     * @param value New value.
     */
    updateName(value: string): EchoPromise<unknown> {
        return ProjectService.update(this.project.project_id, {
            name: value
        });
    }

    /**
     * Update the project description.
     * @param value New value.
     */
    updateDescription(value: string): EchoPromise<unknown> {
        return ProjectService.update(this.project.project_id, {
            description: value
        });
    }

    /**
     * Open the delete confirmation modal.
     */
    openDelete() {
        ModalHandler.open({
            component: ConfirmModal,
            componentPayload: {
                message:
                    "Are you sure you want to delete this project? This action cannot be undone forever (very long time)",
                action: (modifications: ConfirmModalModifications) => {
                    modifications.loading = true;

                    ProjectService.delete(this.project.project_id)
                        .then(() => {
                            // Close the modal
                            ModalHandler.close();

                            // Navigate to the projects page.
                            this.$router.push("/projects");

                            // Send a confirmation snackbar.
                            SnackbarHandler.open({
                                message: "Project has been successfully deleted.",
                                color: "success"
                            });
                        })
                        .catch(error =>
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR"
                            })
                        )
                        .finally(() => (modifications.loading = false));
                }
            }
        });
    }
}
</script>

<style lang="scss">
.project {
    &__title {
        font-size: 2em;
    }
}
</style>

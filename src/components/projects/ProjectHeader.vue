<template>
    <div>
        <v-row justify="space-between" no-gutters>
            <!-- General Information -->
            <v-col cols="auto">
                <!-- Title -->
                <div class="project__title">
                    {{ project.name }}
                </div>

                <!-- Description -->
                <div class="project__description text--secondary">
                    {{ project.description }}
                </div>
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
import ConfirmModal from "@/components/layout/modals/confirm/ConfirmModal.vue";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";

@Component
export default class ProjectHeader extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

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

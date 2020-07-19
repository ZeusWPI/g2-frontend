<template>
    <v-card :loading="loading" :tile="$vuetify.breakpoint.smAndDown">
        <v-card-title class="modal__title">
            {{ t("projects.create.title") }}

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-subtitle>
            {{ t("projects.create.desc") }}
        </v-card-subtitle>

        <v-card-text>
            <v-form :disabled="loading">
                <!-- Name -->
                <v-text-field
                    v-model="fields.name.value"
                    :rules="fields.name.rules"
                    :error-messages="fields.name.error"
                    :label="t('projects.create.fields.name')"
                    outlined
                    required
                />

                <!-- Description -->
                <v-text-field
                    v-model="fields.description.value"
                    :rules="fields.description.rules"
                    :error-messages="fields.description.error"
                    :label="t('projects.create.fields.description')"
                    outlined
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <v-btn @click="close" text color="red" :disabled="loading">
                {{ t("close") }}
            </v-btn>

            <v-btn @click="create" text color="primary" :disabled="loading" :loading="loading">
                {{ t("create") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import ProjectService from "@/api/services/ProjectService";

@Component
export default class ProjectCreateModal extends Vue {
    /**
     * If the request is loading.
     */
    loading = false;

    /**
     * Input fields.
     */
    fields = {
        name: new InputField(),
        description: new InputField()
    };

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Create the projects.
     */
    create() {
        this.loading = true;

        ProjectService.create(InputFieldUtil.getValues(this.fields))
            .then(project => {
                SnackbarHandler.open({
                    message: "Project has been created",
                    color: "success"
                });

                // Go to the created projects.
                this.$router.push(`/projects/${project.id}`);

                // Close the modal.
                ModalHandler.close();

                // Clear the input fields.
                InputFieldUtil.clear(this.fields);
            })
            .catch(error =>
                ErrorHandler.handle(
                    error,
                    {
                        style: "SNACKBAR"
                    },
                    this.fields
                )
            )
            .finally(() => (this.loading = false));
    }
}
</script>

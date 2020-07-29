<template>
    <v-card :tile="$vuetify.breakpoint.smAndDown">
        <v-card-title class="modal__title">
            {{ t("tags.create.title") }}

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-subtitle>
            {{ t("tags.create.desc") }}
        </v-card-subtitle>

        <v-card-text>
            <!-- Preview -->
            <div class="pb-5">
                <project-tag :tag="previewTag" />
            </div>

            <v-form :disabled="loading">
                <!-- Name -->
                <v-text-field
                    v-model="fields.name.value"
                    :rules="fields.name.rules"
                    :error-messages="fields.name.error"
                    label="Name"
                    placeholder="Name of the tag"
                    outlined
                    required
                />

                <!-- Color -->
                <v-row align="center">
                    <v-col>
                        <v-text-field
                            v-model="fields.color.value"
                            :rules="fields.color.rules"
                            :error-messages="fields.color.error"
                            label="Color"
                            placeholder="Color of the tag"
                            outlined
                            required
                        />
                    </v-col>

                    <v-col cols="auto" class="mb-8">
                        <v-btn :color="fields.color.value" large depressed @click="randomColor">
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- Description -->
                <v-text-field
                    v-model="fields.description.value"
                    :rules="fields.description.rules"
                    :error-messages="fields.description.error"
                    label="Description"
                    placeholder="Description of the tag"
                    outlined
                    required
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <!-- Cancel -->
            <v-btn color="error" text @click="close" :disabled="loading">
                {{ t("cancel") }}
            </v-btn>

            <!-- Confirm -->
            <v-btn color="primary" depressed @click="create" :disabled="loading" :loading="loading">
                {{ t("create") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { InputField } from "@/types/fields/InputField";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import { Tag } from "@/api/models/Tag";
import TagService from "@/api/services/TagService";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { RouterUtil } from "@/util/RouterUtil";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
@Component({
    components: { ProjectTag }
})
export default class CreateTagModal extends Vue {
    /**
     * If the update request is loading.
     */
    loading = false;

    /**
     * If the tag is scoped to a project.
     * A scope is just a visual guide, no constraints will be defined in the backend.
     */
    scoped = false;

    /**
     * Input fields.
     */
    fields = {
        name: new InputField(),
        color: new InputField(),
        description: new InputField()
    };

    /**
     * Preview tag to display.
     */
    get previewTag(): Tag {
        return {
            name: this.fields.name.value || "Tag preview",
            description: this.fields.description.value || "This is a preview tag",
            color: this.fields.color.value
        } as Tag;
    }

    /**
     * When the component is created.
     */
    created() {
        this.randomColor();
    }

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Update the color field with a random color.
     */
    randomColor() {
        this.fields.color.value = `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .toUpperCase()}`;
    }

    /**
     * Create a new tag.
     */
    create() {
        this.loading = true;

        TagService.create(InputFieldUtil.getValues(this.fields))
            .then(() => {
                // Close the modal.
                this.close();

                // Send a confirmation snackbar.
                SnackbarHandler.open({
                    message: "Tag has been successfully deleted.",
                    color: "success"
                });

                // Reload the page.
                RouterUtil.reload(this.$router);
            })
            .catch(error => {
                ErrorHandler.handle(error, {
                    style: "SNACKBAR"
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
</script>

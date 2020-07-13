<template>
    <v-card :tile="$vuetify.breakpoint.smAndDown">
        <v-card-title class="modal__title">
            Edit tags

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-subtitle>
            Edit the tags for:
        </v-card-subtitle>

        <v-card-text>
            <!-- Loading -->
            <template v-if="tags.isLoading()">
                <v-skeleton-loader type="table" />
            </template>

            <!-- Data -->
            <template v-else-if="tags.isSuccess()">
                <!-- Search -->
                <v-text-field
                    v-model="tableSearch"
                    label="Search for a tag"
                    append-icon="mdi-magnify"
                    hide-details
                    outlined
                    dense
                />

                <!-- Table -->
                <v-data-table
                    v-model="tableSelected"
                    :search="tableSearch"
                    :headers="tableHeaders"
                    :items="tags.data"
                    show-select
                    item-key="name"
                    mobile-breakpoint="0"
                >
                    <!-- Tag -->
                    <template v-slot:item.name="{ item }">
                        <project-tag :tag="item" />
                    </template>
                </v-data-table>
            </template>

            <!-- Error -->
            <template v-else-if="tags.isError()">
                <error-placeholder :error="tags.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <!-- Cancel -->
            <v-btn color="error" text @click="close" :disabled="loading">
                {{ t("cancel") }}
            </v-btn>

            <!-- Confirm -->
            <v-btn color="primary" depressed @click="save" :disabled="loading" :loading="loading">
                {{ t("confirm") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { EchoPromise } from "echofetch";
import { Tag } from "@/api/models/Tag";
import { ArrayUtil } from "@/util/ArrayUtil";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import { RouterUtil } from "@/util/RouterUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import TagService from "@/api/services/TagService";
import IssueService from "@/api/services/IssueService";
import PullsService from "@/api/services/PullsService";
import BranchService from "@/api/services/BranchService";
import ProjectService from "@/api/services/ProjectService";

@Component({
    components: { ProjectTag, ErrorPlaceholder }
})
export default class EditTagsModal extends Vue {
    /**
     * Payload passed as prop.
     */
    @Prop()
    payload: {
        project: Project;
        type: "project" | "issue" | "pull" | "branch";
        id: number;
    };

    /**
     * Get all the available tags.
     */
    tags: EchoPromise<Tag[]> = TagService.getAll(false, this.payload.project.id);

    /**
     * If the update request is loading.
     */
    loading = false;

    /**
     * Table headers.
     */
    tableHeaders = [
        {
            value: "name"
        }
    ];

    /**
     * Table search value.
     */
    tableSearch = "";

    /**
     * Selected repositories.
     */
    tableSelected: Tag[] = this.payload.project.tags;

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Save the changes.
     */
    async save() {
        this.loading = true;

        // Find all the newly selected tags.
        const linkTags = this.tableSelected.filter(tag => !this.payload.project.tags.includes(tag));

        // Find all the unselected tags.
        const unlinkTags = this.payload.project.tags.filter(tag => !this.tableSelected.includes(tag));

        // Link the selected tags.
        for (const tag of linkTags) {
            try {
                // Issue
                if (this.payload.type === "issue") {
                    await IssueService.linkTag(this.payload.id, tag.id);
                }

                // Pull
                else if (this.payload.type === "pull") {
                    await PullsService.linkTag(this.payload.id, tag.id);
                }

                // Branch
                else if (this.payload.type === "branch") {
                    await BranchService.linkTag(this.payload.id, tag.id);
                }

                // Project
                else if (this.payload.type === "project") {
                    await ProjectService.linkTag(this.payload.id, tag.id);
                }
            } catch (error) {
                ErrorHandler.handle(error, {
                    style: "SNACKBAR"
                });

                this.loading = false;

                return;
            }
        }

        // Unlink the selected tags.
        for (const tag of unlinkTags) {
            try {
                // Issue
                if (this.payload.type === "issue") {
                    await IssueService.unlinkTag(this.payload.id, tag.id);
                }

                // Pull
                else if (this.payload.type === "pull") {
                    await PullsService.unlinkTag(this.payload.id, tag.id);
                }

                // Branch
                else if (this.payload.type === "branch") {
                    await BranchService.unlinkTag(this.payload.id, tag.id);
                }

                // Project
                else if (this.payload.type === "project") {
                    await ProjectService.unlinkTag(this.payload.id, tag.id);
                }
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
            message: "Linked tags have been updated",
            color: "success"
        });

        // Close the modal.
        ModalHandler.close();

        // Reload the page.
        await RouterUtil.reload(this.$router);
    }
}
</script>

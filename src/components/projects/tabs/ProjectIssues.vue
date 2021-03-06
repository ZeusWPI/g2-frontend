<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field v-model="search" :label="t('issues.search')" append-icon="mdi-magnify" outlined dense />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed @click="openNew">
                    {{ t("issues.new.button") }}
                </v-btn>
            </v-col>
        </v-row>

        <!-- Loading -->
        <template v-if="issues.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="issues.isSuccess()">
            <issue-pull-table :project="project" :data="issues.data" :search.sync="search" type="issue" />
        </template>

        <!-- Error -->
        <template v-else-if="issues.isError()">
            <error-placeholder :error="issues.error" :options="{ style: 'SECTION' }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import ProjectService from "@/api/services/ProjectService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import IssuePullTable from "@/components/projects/tables/IssuePullTable.vue";
import { Repository } from "@/api/models/Repository";
import { ModalHandler } from "@/util/modal/ModalHandler";
import NewIssuePullModal from "@/components/projects/modals/NewIssuePullModal.vue";

@Component({
    components: { IssuePullTable, ErrorPlaceholder }
})
export default class ProjectIssues extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Issues to display.
     */
    issues: EchoPromise<Issue[]> = ProjectService.issues(this.project.id);

    /**
     * Repositories for the given project.
     */
    @Prop()
    repositories: EchoPromise<Repository[]>;

    /**
     * Search value.
     */
    search = "";

    /**
     * Open the new issue modal.
     */
    openNew() {
        ModalHandler.open({
            component: NewIssuePullModal,
            componentPayload: {
                type: "issues",
                repositories: this.repositories
            },
            responsive: true
        });
    }
}
</script>

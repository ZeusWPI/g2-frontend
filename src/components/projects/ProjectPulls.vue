<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field v-model="search" :label="t('pulls.search')" append-icon="mdi-magnify" outlined dense />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed>
                    {{ t("pulls.new") }}
                </v-btn>
            </v-col>
        </v-row>

        <!-- Loading -->
        <template v-if="pulls.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="pulls.isSuccess()">
            <issue-pull-table :data="pulls.data" :search.sync="search" type="pulls" />
        </template>

        <!-- Error -->
        <template v-else-if="pulls.isError()">
            <error-placeholder :error="pulls.error" :options="{ style: 'SECTION' }" />
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
     * Pulls to display.
     */
    pulls: EchoPromise<Issue[]> = ProjectService.pulls(this.project.id);

    /**
     * Search value.
     */
    search = "";
}
</script>

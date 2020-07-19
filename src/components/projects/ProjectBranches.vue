<template>
    <div>
        <!-- Loading -->
        <template v-if="branches.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="branches.isSuccess()">
            <!-- Actions -->
            <v-text-field v-model="search" :label="t('branches.search')" outlined dense />

            <!-- Repositories -->
            <branches-table :branches="branches.data" :search.sync="search" />
        </template>

        <!-- Error -->
        <template v-else-if="branches.isError()">
            <error-placeholder :error="branches.error" :options="{ style: 'SECTION' }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Branch } from "@/api/models/Branch";
import BranchesTable from "@/components/projects/tables/BranchesTable.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectService from "@/api/services/ProjectService";
import { Project } from "@/api/models/Project";

@Component({
    components: { ErrorPlaceholder, BranchesTable }
})
export default class ProjectBranches extends Vue {
    /**
     * Project to display.
     */
    @Prop({ required: true })
    project: Project;

    /**
     * Branches to display.
     */
    branches: EchoPromise<Branch[]> = ProjectService.branches(this.project.id);

    /**
     * Search value.
     */
    search = "";
}
</script>

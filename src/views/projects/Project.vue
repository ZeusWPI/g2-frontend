<template>
    <v-container>
        <!-- Loading -->
        <template v-if="project.isLoading()">
            <page-loader />
        </template>

        <!-- Data -->
        <template v-else-if="project.isSuccess()">
            <!-- Header -->
            <v-row>
                <v-col cols="12">
                    <project-header :project="project.data" />
                </v-col>
            </v-row>

            <v-divider class="mt-2 mb-3" />

            <!-- Tab Menu -->
            <v-tabs background-color="transparent" v-model="_tab">
                <!-- Overview -->
                <v-tab to="overview">
                    <v-icon left>mdi-view-dashboard-outline</v-icon>
                    Overview
                </v-tab>

                <!-- Issues -->
                <v-tab to="issues">
                    <v-icon left>mdi-alert-circle-outline</v-icon>
                    Issues

                    <v-chip class="ml-2" x-small>
                        {{ project.data.statistics.issuesCount }}
                    </v-chip>
                </v-tab>

                <!-- Pull Requests -->
                <v-tab to="pulls">
                    <v-icon left>mdi-source-pull</v-icon>
                    Pull Requests

                    <v-chip class="ml-2" x-small>
                        {{ project.data.statistics.pullsCount }}
                    </v-chip>
                </v-tab>

                <!-- Branches -->
                <v-tab to="branches">
                    <v-icon left>mdi-source-branch</v-icon>
                    Branches
                </v-tab>

                <!-- Repositories -->
                <v-tab to="repositories">
                    <v-icon left>mdi-source-repository</v-icon>
                    Repositories
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="_tab" class="project__tabs__content">
                <!-- Overview -->
                <v-tab-item value="overview" transition="none" reverse-transition="none">
                    <project-overview :project="project.data" />
                </v-tab-item>

                <!-- Issues -->
                <v-tab-item value="issues" class="container--small" transition="none" reverse-transition="none">
                    <project-issues :project="project.data" :repositories="repositories" />
                </v-tab-item>

                <!-- Pull Requests -->
                <v-tab-item value="pulls" class="container--small" transition="none" reverse-transition="none">
                    <project-pulls :project="project.data" :repositories="repositories" />
                </v-tab-item>

                <!-- Branches -->
                <v-tab-item value="branches" class="container--small" transition="none" reverse-transition="none">
                    <project-branches :project="project.data" />
                </v-tab-item>

                <!-- Repositories -->
                <v-tab-item value="repositories" class="container--small" transition="none" reverse-transition="none">
                    <project-repositories :project="project.data" :repositories="repositories" />
                </v-tab-item>
            </v-tabs-items>
        </template>

        <!-- Error -->
        <template v-if="project.isError()">
            <error-placeholder :error="project.error" :options="{ style: 'SECTION', displayFullPage: true }" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectService from "@/api/services/ProjectService";
import ProjectIssues from "@/components/projects/ProjectIssues.vue";
import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectRepositories from "@/components/projects/ProjectRepositories.vue";
import ProjectPulls from "@/components/projects/ProjectPulls.vue";
import { Repository } from "@/api/models/Repository";
import ProjectOverview from "@/components/projects/ProjectOverview.vue";
import PageLoader from "@/components/layout/PageLoader.vue";
import ProjectBranches from "@/components/projects/ProjectBranches.vue";

@Component({
    components: {
        ProjectBranches,
        PageLoader,
        ProjectOverview,
        ProjectPulls,
        ProjectHeader,
        ProjectIssues,
        ProjectRepositories,
        ErrorPlaceholder
    }
})
export default class ProjectView extends Vue {
    /**
     * Id of the projects.
     * Should be passed as a prop by the router.
     */
    @Prop()
    id: number;

    /**
     * Model for the tab menu.
     */
    @PropSync("tab", { default: "overview" })
    _tab: string;

    /**
     * Project to display.
     */
    project: EchoPromise<Project> = ProjectService.get(this.id);

    /**
     * Repositories to display.
     */
    repositories: EchoPromise<Repository[]> = ProjectService.repositories(this.id);
}
</script>

<style lang="scss" scoped>
.project {
    &__header {
        display: flex;

        @media screen and (max-width: 400px) {
            flex-direction: column;
        }

        &__img {
            height: 200px;
            align-self: flex-start;
        }

        &__content {
            padding: 10px 15px;
        }
    }

    &__tabs {
        &__content {
            background-color: transparent;
            margin-top: 20px;
        }
    }
}
</style>

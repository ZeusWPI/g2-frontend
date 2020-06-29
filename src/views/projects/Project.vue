<template>
    <v-container>
        <!-- Loading -->
        <template v-if="project.isLoading()">
            <v-skeleton-loader type="article" />
            <v-skeleton-loader type="table" />
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
            <v-tabs
                background-color="transparent"
                v-model="tab"
                :show-arrows="false"
            >
                <!-- Issues -->
                <v-tab href="#tab-issues">
                    <v-icon left>mdi-alert-circle-outline</v-icon>
                    Issues

                    <v-chip class="ml-2" x-small>
                        4
                    </v-chip>
                </v-tab>

                <!-- Repositories -->
                <v-tab href="#tab-repositories">
                    <v-icon left>mdi-source-repository</v-icon>
                    Repositories
                </v-tab>

                <!-- Pull Requests -->
                <v-tab href="#tab-prs">
                    <v-icon left>mdi-source-pull</v-icon>
                    Pull Requests

                    <v-chip class="ml-2" x-small>
                        2
                    </v-chip>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="project__tabs__content">
                <!-- Issues -->
                <v-tab-item value="tab-issues" class="container--small">
                    <project-issues />
                </v-tab-item>

                <!-- Repositories -->
                <v-tab-item value="tab-repositories" class="container--small">
                    <project-repositories />
                </v-tab-item>

                <!-- Pull Requests -->
                <v-tab-item value="tab-prs">
                    <project-issues />
                </v-tab-item>
            </v-tabs-items>
        </template>

        <!-- Error -->
        <template v-if="project.isError()">
            <error-placeholder
                :error="project.error"
                :options="{ style: 'SECTION', displayFullPage: true }"
            />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectService from "@/api/services/ProjectService";
import ProjectIssues from "@/components/projects/ProjectIssues.vue";
import ProjectHeader from "@/components/projects/ProjectHeader.vue";
import ProjectRepositories from "@/components/projects/ProjectRepositories.vue";

@Component({
    components: {
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
     * Project to display.
     */
    project: EchoPromise<Project> = ProjectService.get(this.id);

    /**
     * Model for the tab menu.
     */
    tab = null;
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

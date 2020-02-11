<template>
    <v-row>
        <!-- Loading -->
        <template v-if="project.loading">
            <v-container style="height: 400px;">
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col class="subtitle-1 text-center" cols="12">
                        Bezig met ophalen van het project
                    </v-col>
                    <v-col cols="6">
                        <v-progress-linear indeterminate rounded height="6" />
                    </v-col>
                </v-row>
            </v-container>
        </template>

        <!-- Data -->
        <template v-else-if="project.data">
            <!-- Header -->
            <v-col cols="12">
                <v-card>
                    <div class="project__header">
                        <!-- <img
                            class="project__header__img"
                            src="https://zeus.gent/assets/images/Logos_Slotmachiin.svg"
                        /> -->

                        <div class="project__header__content">
                            <h1 style="color: var(--v-primary-base)">
                                {{ project.data.name }}
                            </h1>
                            <p>
                                {{ project.data.description }}
                            </p>
                        </div>
                    </div>
                </v-card>
            </v-col>

            <!-- Issues -->
            <v-col
                cols="12"
                md="9"
                :order="$vuetify.breakpoint.smAndDown ? 2 : -1"
            >
                <v-card>
                    <v-card-title>Issues</v-card-title>

                    <issues :issues="issues" />
                </v-card>
            </v-col>

            <!-- Sidebar -->
            <v-col
                cols="12"
                md="3"
                :order="$vuetify.breakpoint.smAndDown ? 1 : -1"
            >
                <v-row no-gutters>
                    <!-- Information -->
                    <v-col cols="12" class="pb-5">
                        <v-card>
                            <v-card-title>Information</v-card-title>

                            <v-card-text>
                                <div class="project__information">
                                    <ul>
                                        <li>
                                            <b>Project:</b>
                                            {{ project.data.name }}
                                        </li>
                                        <li>
                                            <b>Repositories:</b>
                                            {{ project.data.repo_ids.length }}
                                        </li>
                                        <li><b>Open issues:</b> TODO</li>
                                    </ul>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Repositories -->
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Repositories</v-card-title>

                            <repositories :repositories="repositories" />
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </template>
    </v-row>
</template>

<script>
import Repositories from "@/components/Repositories";
import Issues from "@/components/Issues";

import { getProject, getProjectRepositories } from "../data/project";
export default {
    name: "Project",

    components: {
        Repositories,
        Issues
    },

    data: function() {
        return {
            project: getProject(this.$route.params.id),
            repositories: [],
            issues: []
        };
    },

    watch: {
        project: {
            deep: true,
            handler: function(newVal, oldVal) {
                if (newVal.data) {
                    this.repositories = getProjectRepositories(this.project);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.project {
    &__header {
        display: flex;

        @media screen and (max-width: 400px) {
            flex-direction: column;
        }

        &__img {
            max-width: 100%;
            align-self: flex-start;
        }

        &__content {
            padding: 10px 15px;
        }
    }
}
</style>

<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field
                    v-model="tableSearch"
                    label="Search for an issue"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed>New Issue</v-btn>
            </v-col>
        </v-row>

        <!-- Issues -->
        <v-card outlined>
            <v-row class="px-2">
                <!-- Open/closed switch -->
                <v-col>
                    <v-btn text style="font-weight: bold">
                        <v-icon left>
                            mdi-alert-circle-outline
                        </v-icon>

                        2 open
                    </v-btn>

                    <v-btn text class="text--secondary">
                        <v-icon left>
                            mdi-alert-circle-check-outline
                        </v-icon>

                        2 closed
                    </v-btn>
                </v-col>

                <!-- Repository selection -->
                <v-col cols="auto">
                    <v-select :items="[]" label="Repository" flat solo dense />
                </v-col>

                <!-- Sort options -->
                <v-col cols="auto">
                    <v-select :items="[]" label="Sort" flat solo dense />
                </v-col>
            </v-row>

            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="issues"
                :items-per-page="25"
                hide-default-header
                mobile-breakpoint="0"
            >
                <!-- Status -->
                <template v-slot:item.status="{ item }">
                    <div class="issue__icon">
                        <!-- Open -->
                        <v-icon v-if="item.status === 'open'" color="success">
                            mdi-alert-circle-outline
                        </v-icon>

                        <!-- Closed -->
                        <v-icon v-else color="error">
                            mdi-alert-circle-check-outline
                        </v-icon>
                    </div>
                </template>

                <!-- Title & labels -->
                <template v-slot:item.title="{ item }">
                    <v-row>
                        <!-- Title -->
                        <v-col cols="12" sm="auto" class="issue__title">
                            {{ item.title }}
                        </v-col>

                        <!-- Labels -->
                        <v-col class="issue__labels">
                            <v-chip
                                v-for="label of item.labels"
                                :key="label.title"
                                :color="label.color"
                                class="mr-2"
                                small
                            >
                                {{ label.title }}
                            </v-chip>
                        </v-col>

                        <!-- Description -->
                        <v-col
                            cols="12"
                            class="issue__description text--secondary"
                        >
                            Opened by {{ item.author }}, 5 days ago
                        </v-col>
                    </v-row>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectIssues extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Table search value.
     */
    tableSearch = "";

    /**
     * Table headers.
     */
    get tableHeaders() {
        const headers = [
            {
                value: "status",
                mobile: true,
                sortable: false,
                align: "center"
            },

            {
                text: "Title",
                value: "title",
                mobile: true
            },

            {
                text: "Repository",
                value: "repository"
            }
        ];

        return (
            headers
                // Hide headers that should not be displayed on the mobile view.
                .filter(header =>
                    this.$vuetify.breakpoint.smAndDown ? header.mobile : true
                )
        );
    }

    /**
     * Temporary fake data with issues.
     */
    issues = [
        {
            status: "open",
            title: "Latest projects are incorrect",
            repository: "g2-frontend",
            author: "Maartenvn",
            labels: [
                {
                    title: "Bug",
                    color: "red"
                },

                {
                    title: "Beginner friendly",
                    color: "green"
                }
            ]
        },

        {
            status: "open",
            title: "Add better projects view",
            repository: "g2-frontend",
            author: "Bert",
            labels: [
                {
                    title: "Improvement",
                    color: "#3498db"
                },

                {
                    title: "Beginner friendly",
                    color: "green"
                }
            ]
        },

        {
            status: "closed",
            title: "Make sure bananas are yellow",
            repository: "other-repo",
            author: "Ernie",
            labels: [
                {
                    title: "IMPORTANT",
                    color: "error"
                },

                {
                    title: "Banana",
                    color: "#f1c40f"
                }
            ]
        }
    ];
}
</script>

<style lang="scss">
.issue {
    &__title {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0;
    }

    &__labels {
        padding-bottom: 0;
    }

    &__description {
        font-size: 0.9em;

        @media screen and (min-width: 600px) {
            padding-top: 0;
        }
    }

    &__icon {
        padding: 0;
        text-align: center;
    }
}
</style>

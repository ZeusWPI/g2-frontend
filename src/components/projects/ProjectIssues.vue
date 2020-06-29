<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field label="Search for an issue" outlined dense />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed>New Issue</v-btn>
            </v-col>
        </v-row>

        <!-- Issues -->
        <v-card outlined>
            <v-list>
                <v-list-item
                    v-for="(issue, index) of issues"
                    :key="index"
                    @click="void 0"
                >
                    <v-list-item-content>
                        <!-- Title -->
                        <v-list-item-title>
                            {{ issue.title }}
                            <v-chip
                                v-for="label of issue.labels"
                                :key="label.title"
                                :color="label.color"
                                class="ml-2"
                                small
                            >
                                {{ label.title }}
                            </v-chip>
                        </v-list-item-title>

                        <!-- Subtitle -->
                        <v-list-item-subtitle>
                            g2-frontend
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
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
     * Temporary fake data with issues.
     */
    issues = [
        {
            title: "Latest projects are incorrect",
            repository: "g2-frontend",
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
            title: "Add better projects view",
            repository: "g2-frontend",
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
            title: "Make sure bananas are yellow",
            repository: "other-repo",
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

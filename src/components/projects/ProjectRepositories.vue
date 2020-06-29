<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field label="Search for a repository" outlined dense />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed>
                    <v-icon left>
                        mdi-pencil
                    </v-icon>

                    Modify
                </v-btn>
            </v-col>
        </v-row>

        <!-- Repositories -->
        <v-card outlined>
            <v-list>
                <v-list-item
                    v-for="(repository, index) of repositories"
                    :key="index"
                    @click="void 0"
                >
                    <v-list-item-content>
                        <!-- Title -->
                        <v-list-item-title>
                            {{ repository.name }}
                        </v-list-item-title>

                        <!-- Subtitle -->
                        <v-list-item-subtitle>
                            {{ repository.description }}
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
export default class ProjectRepositories extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Temporary fake data with repositories.
     */
    repositories = [
        {
            name: "Tab",
            description:
                ":moneybag: Yes. We have to drink. But we also have to pay. This does the paying part."
        },

        {
            name: "helios-server",
            description: "Helios server"
        }
    ];
}
</script>

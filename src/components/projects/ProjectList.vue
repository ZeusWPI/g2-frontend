<template>
    <v-list>
        <v-list-item v-for="(project, index) of projects" :key="index" :to="`/projects/${project.id}`">
            <!-- Project image -->
            <v-list-item-avatar>
                <v-img :src="project.image">
                    <template v-slot:placeholder>
                        <v-avatar :color="getProjectColor(project)" size="90%">
                            {{ project.name.toUpperCase().charAt(0) }}
                        </v-avatar>
                    </template>
                </v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <!-- Name -->
                <v-list-item-title>
                    {{ project.name }}
                </v-list-item-title>

                <!-- Description -->
                <v-list-item-subtitle>
                    {{ project.description }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectList extends Vue {
    /**
     * Projects to display.
     */
    @Prop()
    projects: Project[];

    /**
     * Get the color for a given project based on the name.
     * @param project Project.
     */
    getProjectColor(project: Project): string {
        let hash = 0;

        for (let i = 0; i < project.name.length; i++) {
            hash = project.name.charCodeAt(i) + ((hash << 5) - hash);
        }

        hash %= 360;

        return `hsl(${hash}, 100%, 30%)`;
    }
}
</script>

<template>
    <div>
        <!-- Loading -->
        <v-row v-if="projects.loading">
            <!-- Projects -->
            <v-col
                v-for="index in 8"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
                <project-card loading />
            </v-col>
        </v-row>

        <!-- Data -->
        <v-row v-else-if="projects.data">
            <!-- Entries found -->
            <template v-if="projects.data.length > 0">
                <!-- Projects -->
                <v-col
                    v-for="(project, index) of projects.data"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <project-card :project="project" />
                </v-col>
            </template>

            <!-- No entries found -->
            <template v-else>
                Geen projecten gevonden.
            </template>
        </v-row>

        <div v-else>{{ projects.error }}</div>
    </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "../data/project";

export default {
    name: "Projects",

    components: {
        ProjectCard
    },

    data: function() {
        return {
            projects: getProjects()
        };
    }
};
</script>

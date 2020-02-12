<template>
    <div>
        <!-- Action bar -->
        <v-row>
            <v-spacer />
            <v-col cols="auto">
                <v-btn color="primary" @click="openCreateProject">
                    Nieuw project
                    <v-icon right dark>mdi-plus-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>

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
                <div class="center--width">
                    <h3>Geen projecten gevonden.</h3>
                    <p>
                        Maak een project aan om het hier weer te kunnen geven.
                    </p>
                </div>
            </template>
        </v-row>

        <div v-else>{{ projects.error }}</div>
    </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard";
import ProjectCreateModal from "@/components/modals/ProjectCreateModal";
import { getProjects } from "../data/project";
import { fetchQuery } from "@/util/fetch";

export default {
    name: "Projects",

    components: {
        ProjectCard
    },

    data: function() {
        return {
            projects: fetchQuery(getProjects())
        };
    },

    methods: {
        openCreateProject() {
            this.$store.dispatch("modal/open", {
                title: "Nieuw project aanmaken",
                content:
                    "Maak een nieuw G2 project aan. Je hebt later de mogelijkheid om repositories toe te voegen.",
                component: ProjectCreateModal,
                width: 700
            });
        }
    }
};
</script>

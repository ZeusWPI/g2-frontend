<template>
    <v-row>
        <!-- Repositories -->
        <v-col cols="12" md="6" lg="4">
            <project-card />
        </v-col>
    </v-row>
</template>

<script>
import ProjectCard from "@/components/ProjectCard";

export default {
    name: "Projects",

    components: {
        ProjectCard
    }
};
</script>

<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <!-- Loading -->
        <template v-if="loading">
            <v-skeleton-loader type="image, article, actions" />
        </template>

        <!-- Data -->
        <v-card v-else-if="project" class="fill-height" :to="`/projects/${project.project_id}`">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" />

            <v-card-title>
                {{ project.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ project.description }}
            </v-card-subtitle>

            <v-card-actions>
                <v-spacer />

                <v-btn text color="primary" :to="`projects/${project.project_id}`">
                    Meer informatie
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectCard extends Vue {
    /**
     * If the component is loading.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Project to display.
     */
    @Prop()
    project: Project;
}
</script>

<template>
    <v-col cols="12" sm="6" md="4" lg="3">
        <!-- Loading -->
        <template v-if="loading">
            <v-skeleton-loader type="image, article, actions" />
        </template>

        <!-- Data -->
        <v-card v-else-if="project" class="fill-height d-flex flex-column" :to="`/projects/${project.id}`">
            <v-img :src="project.image" height="200px">
                <template v-slot:placeholder>
                    <img class="project__image" src="@/assets/img/logo--primary.svg" :alt="project.name" />
                </template>
            </v-img>

            <v-card-title>
                {{ project.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ project.description }}
            </v-card-subtitle>

            <v-spacer />

            <v-card-actions>
                <v-spacer />

                <v-btn text color="primary" :to="`projects/${project.id}`">
                    {{ t("projects.more") }}
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

<style lang="scss" scoped>
.project {
    &__image {
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.05);

        path {
            fill: var(--v-primary-base);
        }
    }
}
</style>

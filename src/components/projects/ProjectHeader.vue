<template>
    <div>
        <v-row justify="space-between" no-gutters>
            <!-- General Information -->
            <v-col cols="auto">
                <!-- Title -->
                <div class="project__title">
                    {{ project.name }}
                </div>

                <!-- Description -->
                <div class="project__description">
                    {{ project.description }}
                </div>

                <!-- Statistics -->
                <!--<v-row class="project__statistics">
                    <v-col cols="auto" class="d-flex">
                        <v-icon left>mdi-source-repository</v-icon>
                        5 repositories
                    </v-col>

                    <v-divider class="divider--vertical" vertical />

                    <v-col cols="auto" class="d-flex">
                        <v-icon left>mdi-alert-circle-outline</v-icon>
                        25 issues
                    </v-col>

                    <v-divider class="divider--vertical" vertical />

                    <v-col cols="auto" class="d-flex">
                        <v-icon left>mdi-source-pull</v-icon>
                        5 pull requests
                    </v-col>
                </v-row> -->
            </v-col>

            <!-- Actions -->
            <v-col cols="auto" class="d-flex align-center">
                <v-btn color="primary" text>Hello</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectHeader extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;
}
</script>

<style lang="scss">
.project {
    &__title {
        font-size: 2em;
    }

    &__description {
        color: var(--v-secondary-base);
    }

    &__statistics {
        margin-top: 10px;
    }
}
</style>

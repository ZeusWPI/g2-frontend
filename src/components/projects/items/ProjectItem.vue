<template>
    <v-list-item :to="`/projects/${project.id}`">
        <v-list-item-avatar>
            <img src="https://zeus.gent/assets/images/Logos_Tab.svg" />
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>
                {{ project.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
                {{ project.description }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectItem extends Vue {
    /**
     * Project to display
     */
    @Prop()
    project: Project;
}
</script>

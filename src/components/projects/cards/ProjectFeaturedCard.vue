<template>
    <v-row>
        <v-col cols="auto">
            <author-item :author="feature.author" />
        </v-col>

        <v-col>
            <b>{{ feature.author.name }}</b> has featured a {{ feature.type }} in <b>{{ project.name }}</b>

            <v-card class="mt-3" outlined>
                <!-- Issue -->
                <template v-if="feature.type === 'issue'">
                    <issue-pull-item class="px-3" :item="feature.data.issue" />
                </template>

                <!-- Pull -->
                <template v-if="feature.type === 'pull'">
                    <issue-pull-item class="px-3" :item="feature.data.pull" />
                </template>

                <!-- Project -->
                <template v-if="feature.type === 'project'">
                    <project-item :project="feature.data.project" />
                </template>

                <!-- Branch -->
                <template v-if="feature.type === 'branch'">
                    <branch-item class="px-3" :branch="feature.data.branch" />
                </template>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Feature } from "@/api/models/Feature";
import { Project } from "@/api/models/Project";
import AuthorItem from "@/components/projects/items/AuthorItem.vue";
import IssuePullItem from "@/components/projects/items/IssuePullItem.vue";
import ProjectItem from "@/components/projects/items/ProjectItem.vue";
import BranchItem from "@/components/projects/items/BranchItem.vue";

@Component({
    components: { BranchItem, ProjectItem, IssuePullItem, AuthorItem }
})
export default class ProjectFeaturedCard extends Vue {
    /**
     * Project of the feature.
     */
    @Prop()
    project: Project;

    /**
     * Feature to display.
     */
    @Prop()
    feature: Feature;
}
</script>

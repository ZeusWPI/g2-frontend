<template>
    <div>
        <v-row>
            <!-- Content -->
            <v-col cols="12" md="8">
                <!-- Featured -->
                <project-features :project="project" :features="features" />
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4">
                <!-- Maintainers -->
                <project-maintainers :maintainers="maintainers" />

                <!-- Contributors -->
                <project-contributors :contributors="contributors" />

                <!-- Subprojects -->
                <project-subprojects />

                <!-- Tags -->
                <project-tags :project="project" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { EchoPromise } from "echofetch";
import { Author } from "@/api/models/Author";
import { Feature } from "@/api/models/Feature";
import IssuePullItem from "@/components/projects/items/IssuePullItem.vue";
import ProjectMaintainers from "@/components/projects/tabs/overview/ProjectMaintainers.vue";
import ProjectService from "@/api/services/ProjectService";
import ProjectFeaturedCard from "@/components/projects/cards/ProjectFeaturedCard.vue";
import ProjectFeatures from "@/components/projects/tabs/overview/ProjectFeatures.vue";
import ProjectSubprojects from "@/components/projects/tabs/overview/ProjectSubprojects.vue";
import ProjectTags from "@/components/projects/tabs/overview/ProjectTags.vue";
import ProjectContributors from "@/components/projects/tabs/overview/ProjectContributors.vue";

@Component({
    components: {
        ProjectContributors,
        ProjectTags,
        ProjectSubprojects,
        ProjectFeatures,
        ProjectFeaturedCard,
        ProjectMaintainers,
        IssuePullItem
    }
})
export default class ProjectOverview extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Project maintainers.
     */
    maintainers: EchoPromise<Author[]> = ProjectService.maintainers(this.project.id);

    /**
     * Project contributors.
     */
    contributors: EchoPromise<Author[]> = ProjectService.contributors(this.project.id);

    /**
     * Project features.
     */
    features: EchoPromise<Feature[]> = ProjectService.features(this.project.id);
}
</script>

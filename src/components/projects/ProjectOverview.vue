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
                <project-maintainers-card :maintainers="maintainers" />

                <!-- Subprojects -->
                <project-subprojects />

                <!-- Tags -->
                <project-tags :tags="tags" />
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
import ProjectMaintainers from "@/components/projects/ProjectMaintainers.vue";
import ProjectService from "@/api/services/ProjectService";
import ProjectFeaturedCard from "@/components/projects/cards/ProjectFeaturedCard.vue";
import ProjectFeatures from "@/components/projects/ProjectFeatures.vue";
import ProjectSubprojects from "@/components/projects/ProjectSubprojects.vue";
import { Tag } from "@/api/models/Tag";
import ProjectTags from "@/components/projects/ProjectTags.vue";

@Component({
    components: {
        ProjectTags,
        ProjectSubprojects,
        ProjectFeatures,
        ProjectFeaturedCard,
        ProjectMaintainersCard: ProjectMaintainers,
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
     * Project features.
     */
    features: EchoPromise<Feature[]> = ProjectService.features(this.project.id);

    /**
     * Project tags.
     */
    tags: EchoPromise<Tag[]> = ProjectService.tags(this.project.id);
}
</script>

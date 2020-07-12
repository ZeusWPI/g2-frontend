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

                <!-- Maintainers -->
                <div>
                    <v-card-title>
                        Sub projects

                        <v-chip class="ml-2" small>
                            1
                        </v-chip>
                    </v-card-title>

                    <v-list flat color="transparent">
                        <v-list-item>
                            <v-list-item-avatar>
                                <img src="https://zeus.gent/assets/images/Logos_Tab.svg" />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    Some subproject
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Some description about a subproject
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>

                <!-- Tags -->
                <div>
                    <v-card-title>
                        Tags

                        <v-chip class="ml-2" small>
                            3
                        </v-chip>
                    </v-card-title>

                    <v-card-text>
                        <v-chip color="brown" class="mr-2 mb-2" small>
                            Rust
                        </v-chip>

                        <v-chip color="red" class="mr-2 mb-2" small>
                            HTML
                        </v-chip>

                        <v-chip color="green" class="mr-2 mb-2" small>
                            Beginner friendly
                        </v-chip>
                    </v-card-text>
                </div>
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
import ProjectMaintainersCard from "@/components/projects/cards/ProjectMaintainersCard.vue";
import ProjectService from "@/api/services/ProjectService";
import ProjectFeaturedCard from "@/components/projects/cards/ProjectFeaturedCard.vue";
import ProjectFeatures from "@/components/projects/ProjectFeatures.vue";

@Component({
    components: { ProjectFeatures, ProjectFeaturedCard, ProjectMaintainersCard, IssuePullItem }
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
}
</script>

<template>
    <div>
        <v-card-title>Featured</v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="features.isLoading()">
                <v-skeleton-loader class="mb-6" v-for="index of 4" :key="index" type="article" />
            </template>

            <!-- Data -->
            <template v-else-if="features.isSuccess()">
                <project-featured-card
                    v-for="(feature, index) of features.data"
                    :key="index"
                    :project="project"
                    :feature="feature"
                />
            </template>

            <!-- Error -->
            <template v-else-if="features.isError()">
                <error-placeholder :error="features.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Feature } from "@/api/models/Feature";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectFeaturedCard from "@/components/projects/cards/ProjectFeaturedCard.vue";
import { Project } from "@/api/models/Project";

@Component({
    components: { ProjectFeaturedCard, ErrorPlaceholder }
})
export default class ProjectFeatures extends Vue {
    /**
     * Project.
     */
    @Prop()
    project: Project;

    /**
     * Project features.
     */
    @Prop()
    features: EchoPromise<Feature[]>;
}
</script>

<template>
    <div>
        <v-card-title>
            Subprojects

            <v-chip v-if="subprojects.isSuccess()" class="ml-2" small>
                {{ subprojects.data.length }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="subprojects.isLoading()">
                <v-progress-circular class="py-8" size="40" width="3" color="primary" indeterminate />
            </template>

            <!-- Data -->
            <template v-else-if="subprojects.isSuccess()">
                <!-- Data available -->
                <template v-if="subprojects.data.length >= 0">
                    <project-item
                        v-for="(subproject, index) of subprojects.data"
                        :key="index"
                        :project="subproject"
                        :show-tags="false"
                    />
                </template>

                <!-- Data empty -->
                <template v-else>
                    No subprojects available.
                </template>
            </template>

            <!-- Error -->
            <template v-else-if="subprojects.isError()">
                <error-placeholder :error="subprojects.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectItem from "@/components/projects/items/ProjectItem.vue";

@Component({
    components: { ProjectItem, ErrorPlaceholder }
})
export default class ProjectSubprojects extends Vue {
    /**
     * List with subprojects.
     */
    @Prop()
    subprojects: EchoPromise<Project[]>;
}
</script>

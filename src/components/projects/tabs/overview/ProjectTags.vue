<template>
    <div>
        <v-card-title>
            {{ t("tags.name") }}

            <v-chip class="ml-2" small>
                {{ project.tags.length }}
            </v-chip>

            <v-spacer />

            <v-btn color="primary" text @click="openTags">
                <v-icon left>
                    mdi-tag-multiple-outline
                </v-icon>

                {{ t("project.tags.edit") }}
            </v-btn>
        </v-card-title>

        <v-card-text>
            <!-- Data available -->
            <template v-if="project.tags.length >= 0">
                <project-tag v-for="(tag, index) of project.tags" :key="index" :tag="tag" />
            </template>

            <!-- Data empty -->
            <template v-else>
                {{ t("project.tags.empty") }}
            </template>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { Project } from "@/api/models/Project";
import AuthorItem from "@/components/projects/items/AuthorItem.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";

@Component({
    components: { ProjectTag, ErrorPlaceholder, AuthorItem }
})
export default class ProjectTags extends Vue {
    /**
     * Project.
     */
    @Prop({ required: true })
    project: Project;

    /**
     * Open the tags edit modal.
     */
    openTags() {
        ModalHandler.open({
            component: () => import("../../modals/EditTagsModal.vue"),
            componentPayload: {
                item: this.project,
                type: "project"
            },
            responsive: true
        });
    }
}
</script>

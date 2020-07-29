<template>
    <div>
        <v-card-title>
            Tags

            <v-chip class="ml-2" small>
                {{ project.tags.length }}
            </v-chip>

            <v-spacer />

            <v-btn color="primary" text @click="openTags">
                <v-icon left>
                    mdi-tag-multiple-outline
                </v-icon>

                Edit tags
            </v-btn>
        </v-card-title>

        <v-card-text>
            <project-tag v-for="(tag, index) of project.tags" :key="index" :tag="tag" />
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

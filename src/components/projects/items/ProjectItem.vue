<template>
    <context-menu :items="contextItems">
        <div class="project">
            <v-row no-gutters align="center">
                <v-col cols="auto">
                    <v-list-item-avatar class="repository__image">
                        <v-img :src="project.image" width="auto" height="100%" class="repository__image">
                            <template v-slot:placeholder>
                                <v-avatar :color="color" size="90%">
                                    {{ project.name.toUpperCase().charAt(0) }}
                                </v-avatar>
                            </template>
                        </v-img>
                    </v-list-item-avatar>
                </v-col>

                <v-col>
                    <!-- Name -->
                    <div class="project__name">
                        <a class="no-decoration">{{ project.name }}</a>
                    </div>

                    <!-- Tags -->
                    <div v-if="showTags" class="project__tags">
                        <project-tag v-for="(tag, index) of project.tags" :key="index" :tag="tag" />
                    </div>

                    <!-- Description -->
                    <div class="project__description text--secondary">
                        {{ project.description }}
                    </div>
                </v-col>
            </v-row>
        </div>
    </context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import { ColorUtil } from "@/util/ColorUtil";
import ContextMenu from "@/components/util/ContextMenu.vue";
import { ContextMenuLink } from "@/types/ContextMenuLink";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component({
    components: { ContextMenu, ProjectTag }
})
export default class ProjectItem extends Vue {
    /**
     * Project to display
     */
    @Prop()
    project: Project;

    /**
     * Should the tags be displayed.
     */
    @Prop({ default: true })
    showTags: boolean;

    /**
     * Get the color for the project based on the name.
     */
    get color(): string {
        return ColorUtil.getColorFromString(this.project.name);
    }

    /**
     * Get the context items to display inside the context menu.
     */
    get contextItems(): ContextMenuLink[] {
        return [
            {
                text: "Edit tags",
                icon: "mdi-tag-multiple-outline",
                action: () =>
                    // Open a modal for editing the tags for the given item.
                    ModalHandler.open({
                        component: () => import("../modals/EditTagsModal.vue"),
                        componentPayload: {
                            project: this.project,
                            id: this.project.id,
                            type: "project"
                        }
                    })
            },

            {
                text: "Feature item",
                icon: "mdi-star-circle-outline",
                action: () => console.log("HERE")
            }
        ];
    }
}
</script>

<style lang="scss" scoped>
.project {
    &__name {
        font-weight: bold;
        font-size: 1.2em;
    }

    &__tags {
        margin-top: 5px;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    &__description {
        font-size: 0.9em;
    }
}
</style>

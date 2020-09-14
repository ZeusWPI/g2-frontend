<template>
    <item-context-menu :item="project" type="project">
        <v-list-item>
            <v-row no-gutters align="center">
                <v-col cols="auto">
                    <!-- Image -->
                    <item-image :item="project" />
                </v-col>

                <v-col>
                    <!-- Name -->
                    <div class="project__name">
                        <!-- Regular text when 'isCard' is true -->
                        <template v-if="isCard">
                            {{ project.name }}
                        </template>

                        <!-- Link when 'isCard' is false -->
                        <template v-else>
                            <router-link class="no-decoration" :to="`/projects/${project.id}`">
                                {{ project.name }}
                            </router-link>
                        </template>
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
        </v-list-item>
    </item-context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ColorUtil } from "@/util/ColorUtil";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ContextMenu from "@/components/util/ContextMenu.vue";
import ItemContextMenu from "@/components/projects/items/context/ItemContextMenu.vue";
import ItemImage from "@/components/projects/items/image/ItemImage.vue";

@Component({
    components: { ItemImage, ItemContextMenu, ContextMenu, ProjectTag }
})
export default class ProjectItem extends Vue {
    /**
     * Project to display
     */
    @Prop({ required: true })
    project: Project;

    /**
     * If true, the entire item will be clickable.
     * If false, only the project name will be clickable.
     */
    @Prop({ default: false })
    isCard: boolean;

    /**
     * Should the tags be displayed.
     */
    @Prop({ default: true })
    showTags: boolean;
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

<template>
    <item-context-menu :item="project" type="project">
        <item :to="card ? route : null" :hover="card">
            <v-row align="center">
                <!-- Image -->
                <v-col cols="auto">
                    <item-image :item="project" />
                </v-col>

                <!-- Content -->
                <v-col>
                    <!-- Name -->
                    <div class="project__name">
                        <!-- Item name (when card) -->
                        <template v-if="card">
                            {{ project.name }}
                        </template>

                        <!-- Item link (when not card) -->
                        <template v-else>
                            <router-link class="no-decoration" :to="route">
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

                <!-- Actions -->
                <v-col cols="auto">
                    <item-feature-button :item="project" type="project" />
                    <item-tags-button :item="project" type="project" />
                </v-col>
            </v-row>
        </item>
    </item-context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ColorUtil } from "@/util/ColorUtil";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ContextMenu from "@/components/util/ContextMenu.vue";
import ItemContextMenu from "@/components/projects/items/context/ItemContextMenu.vue";
import ItemFeatureButton from "@/components/projects/items/context/ItemFeatureButton.vue";
import ItemTagsButton from "@/components/projects/items/context/ItemTagsButton.vue";
import Item from "@/components/projects/items/context/Item.vue";
import ItemImage from "@/components/projects/items/context/ItemImage.vue";

@Component({
    components: { ItemImage, Item, ItemTagsButton, ItemFeatureButton, ItemContextMenu, ContextMenu, ProjectTag }
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
     * If true, the entire item will be clickable.
     * If false, only the project name will be clickable.
     */
    @Prop({ default: false })
    card: boolean;
    /**
     * Get the color for the project based on the name.
     */
    get color(): string {
        return ColorUtil.getColorFromString(this.project.name);
    }
    /**
     * Route for the current project.
     */
    get route() {
        return {
            name: "Project",
            params: {
                id: this.project.id
            }
        };
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

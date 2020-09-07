<template>
    <item-context-menu :item="branch" type="branch">
        <v-row align="center">
            <!-- Content -->
            <v-col>
                <!-- Name -->
                <div class="branch__name">
                    <a class="no-decoration" :href="branch.url">{{ branch.name }}</a>
                </div>

                <!-- Tags -->
                <div class="branch__tags">
                    <project-tag v-for="(tag, index) of branch.tags" :key="index" :tag="tag" />
                </div>

                <!-- Repository -->
                <div class="branch__description text--secondary">
                    <b>Repository:</b>

                    <a class="no-decoration" :href="branch.repository.url">
                        {{ branch.repository.name }}
                    </a>
                </div>
            </v-col>

            <!-- Repository -->
            <v-col>
                <item-repository-badge :repository="branch.repository" />
            </v-col>

            <!-- Actions -->
            <v-col cols="auto">
                <item-feature-button :item="branch" type="branch" />
                <item-tags-button :item="branch" type="branch" />
            </v-col>
        </v-row>
    </item-context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Branch } from "@/api/models/Branch";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ContextMenu from "@/components/util/ContextMenu.vue";
import ItemContextMenu from "@/components/projects/items/context/ItemContextMenu.vue";
import ItemFeatureButton from "@/components/projects/items/context/ItemFeatureButton.vue";
import ItemTagsButton from "@/components/projects/items/context/ItemTagsButton.vue";
import ItemRepositoryBadge from "@/components/projects/items/context/ItemRepositoryBadge.vue";

@Component({
    components: { ItemRepositoryBadge, ItemTagsButton, ItemFeatureButton, ItemContextMenu, ContextMenu, ProjectTag }
})
export default class BranchItem extends Vue {
    /**
     * Branch to display.
     */
    @Prop()
    branch: Branch;
}
</script>

<style lang="scss" scoped>
.branch {
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

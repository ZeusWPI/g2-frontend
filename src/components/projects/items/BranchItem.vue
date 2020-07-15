<template>
    <context-menu :items="contextItems">
        <div class="branch">
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
        </div>
    </context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Branch } from "@/api/models/Branch";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ContextMenu from "@/components/util/ContextMenu.vue";
import { ContextMenuLink } from "@/types/ContextMenuLink";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { Project } from "@/api/models/Project";

@Component({
    components: { ContextMenu, ProjectTag }
})
export default class BranchItem extends Vue {
    /**
     * Branch to display.
     */
    @Prop()
    branch: Branch;

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
                            item: this.branch,
                            type: "branch"
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

<template>
    <context-menu :items="contextItems">
        <slot />
    </context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Branch } from "@/api/models/Branch";
import { ContextMenuLink } from "@/types/ContextMenuLink";
import { ModalHandler } from "@/util/modal/ModalHandler";
import ContextMenu from "@/components/util/ContextMenu.vue";
import ConfirmModal from "@/components/layout/modals/confirm/ConfirmModal.vue";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";
import ProjectService from "@/api/services/ProjectService";
import { SnackbarHandler } from "@/util/snackbar/SnackbarHandler";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import IssueService from "@/api/services/IssueService";
import PullsService from "@/api/services/PullsService";
import BranchService from "@/api/services/BranchService";
import { EchoError } from "echofetch";
import { RouterUtil } from "@/util/RouterUtil";
import { FeatureUtil } from "@/util/projects/FeatureUtil";

@Component({
    components: { ContextMenu }
})
export default class ItemContextMenu extends Vue {
    /**
     * Item to display.
     */
    @Prop({ required: true })
    item: Project | Issue | Pull | Branch;

    /**
     * Type of item to display.
     */
    @Prop({ required: true })
    type: "project" | "issue" | "pull" | "branch";

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
                        component: () => import("../../modals/EditTagsModal.vue"),
                        componentPayload: {
                            item: this.item,
                            type: this.type
                        }
                    })
            },

            {
                text: !this.item.featured ? "Feature item" : "Unfeature item",
                icon: !this.item.featured ? "mdi-star" : "mdi-star-off",
                action: () => FeatureUtil.toggleFeatured(this.item, this.type, true)
            }
        ];
    }
}
</script>

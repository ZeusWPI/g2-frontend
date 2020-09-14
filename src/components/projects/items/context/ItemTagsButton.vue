<template>
    <v-btn @click="editTags" icon>
        <v-icon>
            <template>
                mdi-tag-multiple-outline
            </template>
        </v-icon>
    </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Branch } from "@/api/models/Branch";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component
export default class ItemFeatureButton extends Vue {
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
     * Open the modal to edit the tags for the given item.
     */
    async editTags() {
        // Open a modal for editing the tags for the given item.
        ModalHandler.open({
            component: () => import("@/components/projects/modals/EditTagsModal.vue"),
            componentPayload: {
                item: this.item,
                type: this.type
            }
        });
    }
}
</script>

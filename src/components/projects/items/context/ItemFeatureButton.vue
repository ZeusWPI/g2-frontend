<template>
    <v-btn color="yellow" @click="toggleFeatured" :disabled="loading" :loading="loading" icon>
        <v-icon>
            <!-- Featured -->
            <template v-if="item.featured">
                mdi-star-outline
            </template>

            <!-- Not featured -->
            <template v-else>
                mdi-star
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
import { FeatureUtil } from "@/util/projects/FeatureUtil";

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
     * If the request is loading.
     */
    loading = false;

    /**
     * Feature/unfeature the item.
     */
    async toggleFeatured() {
        this.loading = true;

        await FeatureUtil.toggleFeatured(this.item, this.type, false);

        this.loading = false;
    }
}
</script>

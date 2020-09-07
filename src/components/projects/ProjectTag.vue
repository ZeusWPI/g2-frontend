<template>
    <v-tooltip :disabled="!tag.description" top>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                :to="searchLink"
                :color="tag.color"
                :class="showPadding ? 'mr-2 mb-2' : ''"
                small
                v-bind="attrs"
                v-on="on"
                dark
            >
                {{ tag.name }}
            </v-chip>
        </template>

        <span>{{ tag.description }}</span>
    </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "@/api/models/Tag";

@Component
export default class ProjectTag extends Vue {
    /**
     * Tag to display.
     */
    @Prop({ required: true })
    tag: Tag;

    /**
     * Should the tag have padding.
     */
    @Prop({ default: true })
    showPadding: boolean;

    /**
     * Get the router link to search page.
     */
    get searchLink() {
        return {
            name: "Search",
            query: {
                q: `tag:"${this.tag.name}"`
            }
        };
    }
}
</script>

<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                :to="`/search?q=tag:&quot;${tag.name}&quot;`"
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
    @Prop()
    tag: Tag;

    /**
     * Should the tag have padding.
     */
    @Prop({ default: true })
    showPadding: boolean;
}
</script>

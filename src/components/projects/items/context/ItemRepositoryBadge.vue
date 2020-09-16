<template>
    <v-chip
        class="badge"
        :href="repository.url"
        :color="color"
        :text-color="$vuetify.theme.dark ? 'white' : ''"
        small
        dark
        outlined
    >
        {{ repository.name }}
    </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ColorUtil } from "@/util/ColorUtil";
import { Repository } from "@/api/models/Repository";

@Component
export default class ItemRepositoryBadge extends Vue {
    /**
     * Repository to display.
     */
    @Prop({ required: true })
    repository: Repository;

    /**
     * Get the color for the repository based on the repository name.
     */
    get color(): string {
        return ColorUtil.getColorFromString(`${this.repository.id}:${this.repository.name}`);
    }
}
</script>

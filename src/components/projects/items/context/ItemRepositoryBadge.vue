<template>
    <v-chip :href="repository.url" :color="color" small dark>
        {{ repository.name }}
    </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ColorUtil } from "@/util/ColorUtil";
import { Repository } from "@/api/models/Repository";

@Component
export default class ItemRepositoryBadge extends Vue {
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

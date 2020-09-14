<template>
    <v-list-item-avatar :color="color">
        <!-- Image -->
        <v-img :src="item.image" width="auto" height="100%">
            <template v-slot:placeholder>
                <div class="image__placeholder">
                    <span class="white--text headline">
                        {{ item.name.toUpperCase().charAt(0) }}
                    </span>
                </div>
            </template>
        </v-img>
    </v-list-item-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ColorUtil } from "@/util/ColorUtil";
import { Repository } from "@/api/models/Repository";

@Component
export default class ItemImage extends Vue {
    /**
     * Item to display an image for
     */
    @Prop({ required: true })
    item: Project | Repository;

    /**
     * Get the color for the item based on the name.
     */
    get color(): string {
        return ColorUtil.getColorFromString(this.item.name);
    }
}
</script>

<style lang="scss" scoped>
.image {
    &__placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
}
</style>

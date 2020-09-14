<template>
    <item :href="card ? repository.url : null" :href-new-tab="card" :hover="card">
        <v-row align="center">
            <!-- Image -->
            <v-col cols="auto">
                <item-image :item="repository" />
            </v-col>

            <!-- Content -->
            <v-col>
                <!-- Name -->
                <div class="repository__name">
                    <a class="no-decoration" :href="repository.url" target="_blank">
                        {{ repository.name }}
                    </a>
                </div>

                <!-- Description -->
                <div class="repository__description text--secondary">
                    {{ repository.description }}
                </div>
            </v-col>
        </v-row>
    </item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ColorUtil } from "@/util/ColorUtil";
import { Repository } from "@/api/models/Repository";
import Item from "@/components/projects/items/context/Item.vue";
import ItemImage from "@/components/projects/items/context/ItemImage.vue";

@Component({
    components: { ItemImage, Item }
})
export default class RepositoryItem extends Vue {
    /**
     * Repository to display
     */
    @Prop()
    repository: Repository;

    /**
     * If true, the entire item will be clickable.
     * If false, only the project name will be clickable.
     */
    @Prop({ default: false })
    card: boolean;

    /**
     * Get the color for the repository based on the name.
     */
    get color(): string {
        return ColorUtil.getColorFromString(this.repository.name);
    }
}
</script>

<style lang="scss" scoped>
.repository {
    &__name {
        font-weight: bold;
        font-size: 1.2em;
    }

    &__description {
        font-size: 0.9em;
    }
}
</style>

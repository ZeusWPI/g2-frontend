<template>
    <item-context-menu :item="item" :type="type">
        <v-row align="center">
            <!-- Status -->
            <v-col cols="auto" class="item__icon">
                <!-- Open -->
                <v-icon v-if="item.status === 'open'" color="success">
                    mdi-alert-circle-outline
                </v-icon>

                <!-- Closed -->
                <v-icon v-else color="error">
                    mdi-alert-circle-check-outline
                </v-icon>
            </v-col>

            <!-- Content -->
            <v-col>
                <!-- Title -->
                <div class="item__title">
                    <a class="no-decoration" :href="item.url" target="_blank">{{ item.title }}</a>
                </div>

                <!-- Labels -->
                <div class="item__labels">
                    <project-tag v-for="tag of item.tags" :key="tag.name" :tag="tag" />
                    <project-label v-for="label of item.labels" :key="label.name" :label="label" />
                </div>

                <!-- Description -->
                <div class="item__description text--secondary">
                    {{ t("projects.table.desc") }}

                    <!-- Author -->
                    <a class="no-decoration" :href="item.author.url">{{ item.author.name }}</a> ,

                    <!-- Time ago -->
                    {{ timeSince }}
                </div>
            </v-col>
        </v-row>
    </item-context-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import ProjectLabel from "@/components/projects/ProjectLabel.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ContextMenu from "@/components/util/ContextMenu.vue";
import ItemContextMenu from "@/components/projects/items/context/ItemContextMenu.vue";

@Component({
    components: { ItemContextMenu, ContextMenu, ProjectTag, ProjectLabel }
})
export default class IssuePullItem extends Vue {
    /**
     * Issue/pull to display.
     */
    @Prop({ required: true })
    item: Issue | Pull;

    /**
     * Is the given item an issue or a pull.
     */
    @Prop({ required: true })
    type: "issue" | "pull";

    /**
     * Get the time since the creation as a formatted string.
     */
    get timeSince(): string {
        const now = new Date();
        const created = new Date(this.item.timestamp);

        const diff = Math.abs(created.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 3600 * 24));
        const hours = Math.floor(diff / 36e5);
        const minutes = Math.floor(diff / 1000 / 60);

        if (hours >= 24) {
            return `${days} day(s) ago`;
        }

        if (minutes >= 60) {
            return `${hours} hour(s) ago`;
        }

        if (minutes < 1) {
            return "Just now";
        }

        return `${minutes} minute(s) ago`;
    }
}
</script>

<style lang="scss">
.item {
    &__title {
        font-weight: bold;
        font-size: 1.2em;
    }

    &__labels {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    &__description {
        font-size: 0.9em;
    }

    &__icon {
        padding: 0 15px;
        text-align: center;
    }
}
</style>

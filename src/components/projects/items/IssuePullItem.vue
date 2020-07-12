<template>
    <v-row>
        <!-- Title -->
        <v-col cols="12" sm="auto" class="table__title">
            <a class="no-decoration" :href="item.url" target="_blank">{{ item.title }}</a>
        </v-col>

        <!-- Labels -->
        <v-col class="table__labels">
            <v-menu v-for="label of item.labels" :key="label.name" open-on-hover top offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-chip :color="label.color" class="mr-2 mb-2" small v-bind="attrs" v-on="on" dark>
                        {{ label.name }}
                    </v-chip>
                </template>

                <v-card>
                    <v-card-title>
                        <v-chip :color="label.color" class="mr-2 mb-2" small dark>
                            {{ label.name }}
                        </v-chip>
                    </v-card-title>

                    <v-card-text>
                        {{ label.description }}
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-col>

        <!-- Description -->
        <v-col cols="12" class="table__description text--secondary">
            {{ t("projects.table.desc") }}

            <!-- Author -->
            <a class="no-decoration" :href="item.author.url">{{ item.author.name }}</a> ,

            <!-- Time ago -->
            {{ getTimeSince(item) }}
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";

@Component
export default class IssuePullItem extends Vue {
    /**
     * Issue/pull to display.
     */
    @Prop()
    item: Issue | Pull;

    /**
     * Get the time since the creation of a given item as a formatted string.
     * @param item Item to get the time for.
     */
    getTimeSince(item: Issue | Pull): string {
        const now = new Date();
        const created = new Date(item.timestamp);

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

<template>
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
        <div>
            <!-- Title -->
            <v-col cols="12" sm="auto" class="item__title">
                <a class="no-decoration" :href="item.url" target="_blank">{{ item.title }}</a>
            </v-col>

            <!-- Labels -->
            <v-col class="item__labels">
                <v-tooltip top v-for="label of item.labels" :key="label.name">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip :color="label.color" class="mr-2 mb-2" small v-bind="attrs" v-on="on" dark>
                            {{ label.name }}
                        </v-chip>
                    </template>

                    <span>{{ label.description }}</span>
                </v-tooltip>
            </v-col>

            <!-- Description -->
            <v-col cols="12" class="item__description text--secondary">
                {{ t("projects.table.desc") }}

                <!-- Author -->
                <a class="no-decoration" :href="item.author.url">{{ item.author.name }}</a> ,

                <!-- Time ago -->
                {{ getTimeSince(item) }}
            </v-col>
        </div>
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

<style lang="scss">
.item {
    &__title {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0;
    }

    &__labels {
        padding-bottom: 0;
    }

    &__description {
        font-size: 0.9em;

        @media screen and (min-width: 600px) {
            padding-top: 0;
        }
    }

    &__icon {
        padding: 0 15px;
        text-align: center;
    }
}
</style>

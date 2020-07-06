<template>
    <v-card outlined>
        <v-row class="px-2">
            <!-- Open/closed switch -->
            <v-col>
                <v-btn
                    text
                    :class="tableFilters.status === 'open' ? 'text--bold' : 'text--secondary'"
                    @click="tableFilters.status = 'open'"
                >
                    <v-icon left>
                        mdi-alert-circle-outline
                    </v-icon>

                    {{ getStatusAmount("open") }} open
                </v-btn>

                <v-btn
                    text
                    :class="tableFilters.status === 'closed' ? 'text--bold' : 'text--secondary'"
                    @click="tableFilters.status = 'closed'"
                >
                    <v-icon left>
                        mdi-alert-circle-check-outline
                    </v-icon>

                    {{ getStatusAmount("closed") }} closed
                </v-btn>
            </v-col>

            <!-- Author selection -->
            <v-col :hidden="$vuetify.breakpoint.smAndDown">
                <v-select v-model="tableFilters.authors" :items="tableAuthors" label="Author" flat solo dense multiple>
                    <template v-slot:selection="{ index, item }">
                        <span v-if="index === 0">{{ item }}</span>

                        <span v-if="index === 1">, ...</span>
                    </template>
                </v-select>
            </v-col>

            <!-- Repository selection -->
            <v-col :hidden="$vuetify.breakpoint.smAndDown">
                <v-select
                    v-model="tableFilters.repositories"
                    :items="tableRepositories"
                    label="Repository"
                    flat
                    solo
                    dense
                    multiple
                >
                    <template v-slot:selection="{ index, item }">
                        <span v-if="index === 0">{{ item }}</span>

                        <span v-if="index === 1">, ...</span>
                    </template>
                </v-select>
            </v-col>

            <!-- Sort options -->
            <v-col :hidden="$vuetify.breakpoint.smAndDown">
                <v-select v-model="tableFilters.sort" :items="tableFilters.sortOptions" label="Sort" flat solo dense />
            </v-col>
        </v-row>

        <v-data-table
            :headers="tableHeaders"
            :search="tableSearch"
            :items="tableItems"
            :items-per-page="25"
            hide-default-header
            mobile-breakpoint="0"
        >
            <!-- Status -->
            <template v-slot:item.status="{ item }">
                <div class="table__icon">
                    <!-- Open -->
                    <v-icon v-if="item.status === 'open'" color="success">
                        mdi-alert-circle-outline
                    </v-icon>

                    <!-- Closed -->
                    <v-icon v-else color="error">
                        mdi-alert-circle-check-outline
                    </v-icon>
                </div>
            </template>

            <!-- Title & labels -->
            <template v-slot:item.title="{ item }">
                <v-row>
                    <!-- Title -->
                    <v-col cols="12" sm="auto" class="table__title">
                        {{ item.title }}
                    </v-col>

                    <!-- Labels -->
                    <v-col class="table__labels">
                        <v-chip
                            v-for="label of item.labels"
                            :key="label.name"
                            :color="label.color"
                            class="mr-2 mb-2"
                            small
                        >
                            {{ label.name }}
                        </v-chip>
                    </v-col>

                    <!-- Description -->
                    <v-col cols="12" class="table__description text--secondary">
                        {{ t("projects.table.desc") }}

                        <!-- Author -->
                        <a :href="item.author.url">{{ item.author.name }}</a> ,

                        <!-- Time ago -->
                        {{ getTimeSince(item) }}
                    </v-col>
                </v-row>
            </template>

            <!-- No Data -->
            <template v-slot:no-data>
                <!-- Issues -->
                <template v-if="type === 'issues'">
                    <v-icon class="mb-3 text--secondary" size="70">mdi-alert-circle-outline</v-icon>

                    <h2>{{ t("issues.empty.title") }}</h2>

                    <p>{{ t("issues.empty.desc") }}</p>
                </template>

                <!-- Pulls -->
                <template v-if="type === 'pulls'">
                    <v-icon class="mb-3 text--secondary" size="70">mdi-source-pull</v-icon>

                    <h2>{{ t("pulls.empty.title") }}</h2>

                    <p>{{ t("pulls.empty.desc") }}</p>
                </template>
            </template>

            <!-- No matched data -->
            <template v-slot:no-results>
                <!-- Issues -->
                <template v-if="type === 'issues'">
                    <v-icon class="mb-3 text--secondary" size="70">mdi-alert-circle-outline</v-icon>

                    <h2>{{ t("issues.unmatched.title") }}</h2>

                    <p>{{ t("issues.unmatched.desc") }}</p>
                </template>

                <!-- Pulls -->
                <template v-if="type === 'pulls'">
                    <v-icon class="mb-3 text--secondary" size="70">mdi-source-pull</v-icon>

                    <h2>{{ t("pulls.unmatched.title") }}</h2>

                    <p>{{ t("pulls.unmatched.desc") }}</p>
                </template>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";

@Component
export default class IssuePullTable extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Issue/Pull to display.
     */
    @Prop()
    data: Array<Issue | Pull>;

    /**
     * Is the table used for issues or pulls.
     */
    @Prop()
    type: "issues" | "pulls";

    /**
     * Table search value.
     */
    @PropSync("search")
    tableSearch: string;

    /**
     * Table filters for selecting/sorting the issues.
     */
    tableFilters = {
        /**
         * Selected status option.
         */
        status: "open",

        /**
         * Selected sort option.
         */
        sort: "newest",

        /**
         * Available sort options.
         */
        sortOptions: [
            {
                value: "newest",
                text: "Newest"
            },

            {
                value: "oldest",
                text: "Oldest"
            }
        ],

        /**
         * Selected repositories.
         */
        repositories: [],

        /**
         * Selected authors.
         */
        authors: []
    };

    /**
     * Table headers.
     */
    get tableHeaders() {
        const headers = [
            {
                value: "status",
                mobile: true,
                sortable: false,
                align: "center"
            },

            {
                text: "Title",
                value: "title",
                mobile: true
            },

            {
                text: "Repository",
                value: "repository.name"
            }
        ];

        return (
            headers
                // Hide headers that should not be displayed on the mobile view.
                .filter(header => (this.$vuetify.breakpoint.smAndDown ? header.mobile : true))
        );
    }

    /**
     * Table items.
     * Will filter the issues based on some set parameters.
     */
    get tableItems() {
        return this.getData(true);
    }

    /**
     * Get the repositories available for the given data.
     */
    get tableRepositories(): string[] {
        return [...new Set(this.data.map(item => item.repository.name))];
    }

    /**
     * Get the authors available for the given data.
     */
    get tableAuthors(): string[] {
        return [...new Set(this.data.map(item => item.author.name))];
    }

    /**
     * Get the data with the applied filters & sorting options.
     * @param filterStatus Should only data from the selected status be displayed.
     */
    getData(filterStatus: boolean) {
        return (
            this.data

                // Filter with the correct selected status.
                .filter(item => item.status === this.tableFilters.status || !filterStatus)

                // Filter with the correct repository.
                .filter(item =>
                    this.tableFilters.repositories.length > 0
                        ? (this.tableFilters.repositories as string[]).includes(item.repository.name)
                        : true
                )

                // Filter with the correct author.
                .filter(item =>
                    this.tableFilters.authors.length > 0
                        ? (this.tableFilters.authors as string[]).includes(item.author.name)
                        : true
                )

                // Sort the data based on the given sort option.
                .sort((a, b) => {
                    // Newest
                    if (this.tableFilters.sort === "newest") {
                        return b.timestamp - a.timestamp;
                    }

                    // Oldest
                    if (this.tableFilters.sort === "oldest") {
                        return a.timestamp - b.timestamp;
                    }

                    return 0;
                })
        );
    }

    /**
     * Get the amount of entries for a given "status".
     * @param status Status to count.
     */
    getStatusAmount(status: string) {
        return (
            this.getData(false)

                // Filter the items that have the same status as the given status.
                .filter(item => item.status === status).length
        );
    }

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

<style lang="scss" scoped>
.table {
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
        padding: 0;
        text-align: center;
    }
}
</style>

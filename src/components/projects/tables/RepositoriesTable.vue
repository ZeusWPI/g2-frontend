<template>
    <v-card :outlined="$vuetify.theme.dark">
        <v-data-table
            :items="repositories"
            :headers="tableHeaders"
            :search="tableSearch"
            :items-per-page="25"
            mobile-breakpoint="0"
        >
            <!-- Image -->
            <template v-slot:item.image="{ item }">
                <v-list-item-avatar class="repository__image">
                    <v-img :src="item.image" width="auto" height="100%" class="repository__image">
                        <template v-slot:placeholder>
                            <v-avatar :color="getRepositoryColor(item)" size="90%">
                                {{ item.name.toUpperCase().charAt(0) }}
                            </v-avatar>
                        </template>
                    </v-img>
                </v-list-item-avatar>
            </template>

            <template v-slot:item.name="{ item }">
                <div class="repository">
                    <!-- Title -->
                    <div class="repository__name">
                        <a class="no-decoration" :href="item.url" target="_blank">
                            {{ item.name }}
                        </a>
                    </div>

                    <!-- Description -->
                    <div class="text--secondary">
                        {{ item.description }}
                    </div>
                </div>
            </template>

            <!-- No Data -->
            <template v-slot:no-data>
                <v-icon class="my-3 text--secondary" size="70">mdi-source-repository</v-icon>

                <h2>{{ t("repositories.empty.title") }}</h2>

                <p>{{ t("repositories.empty.desc") }}</p>

                <v-btn class="mb-3" color="primary" depressed @click="editAction">
                    <v-icon left>
                        mdi-plus-circle-outline
                    </v-icon>

                    {{ t("repositories.empty.button") }}
                </v-btn>
            </template>

            <!-- No matched data -->
            <template v-slot:no-results>
                <v-icon class="my-3 text--secondary" size="70">mdi-source-repository</v-icon>

                <h2>{{ t("repositories.unmatched.title") }}</h2>

                <p>{{ t("repositories.unmatched.desc") }}</p>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { Repository } from "@/api/models/Repository";
import { ColorUtil } from "@/util/ColorUtil";

@Component
export default class RepositoriesTable extends Vue {
    /**
     * Repositories to display.
     */
    @Prop()
    repositories: Repository[];

    /**
     * Table search value.
     */
    @PropSync("search")
    tableSearch: string;

    /**
     * Edit repositories action.
     */
    @Prop()
    editAction: () => void;

    /**
     * Table headers.
     */
    tableHeaders = [
        {
            value: "image",
            sortable: false,
            filterable: false,
            align: "center",
            width: "1%"
        },

        {
            text: "Repository",
            value: "name"
        }
    ];

    /**
     * Get the color for a given repository based on the name.
     * @param repository Repository
     */
    getRepositoryColor(repository: Repository): string {
        return ColorUtil.getColorFromString(repository.name);
    }
}
</script>

<style lang="scss" scoped>
.repository {
    padding: 12px 0;

    &__image {
        margin: 0;
    }

    &__name {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0;
    }
}
</style>

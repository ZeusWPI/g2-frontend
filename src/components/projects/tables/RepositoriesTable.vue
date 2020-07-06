<template>
    <v-card outlined>
        <v-data-table
            :items="repositories"
            :headers="tableHeaders"
            :search="tableSearch"
            :items-per-page="25"
            mobile-breakpoint="0"
            @click:row="openRepository"
        >
            <template v-slot:item.name="{ item }">
                <div class="repository" v-ripple>
                    <!-- Title -->
                    <div class="repository__name">
                        {{ item.name }}
                    </div>

                    <!-- Description -->
                    <div class="text--secondary">
                        {{ item.description }}
                    </div>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { Repository } from "@/api/models/Repository";

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
     * Table headers.
     */
    tableHeaders = [
        {
            text: "Repository",
            value: "name"
        }
    ];

    /**
     * Open the selected repository.
     * @param repository Repository to open.
     */
    openRepository(repository: Repository) {
        window.open(repository.url, "_blank");
    }
}
</script>

<style lang="scss" scoped>
.repository {
    padding: 12px 0;
    cursor: pointer;

    &__name {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0;
    }
}
</style>

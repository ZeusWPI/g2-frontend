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
            <template v-slot:item.name="{ item }">
                <repository-item :repository="item" />
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
import RepositoryItem from "@/components/projects/items/RepositoryItem.vue";

@Component({
    components: { RepositoryItem }
})
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
            text: "Repository",
            value: "name"
        }
    ];
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

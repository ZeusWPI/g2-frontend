<template>
    <v-card :outlined="$vuetify.theme.dark">
        <v-data-table
            :items="branches"
            :headers="tableHeaders"
            :search="tableSearch"
            :items-per-page="25"
            mobile-breakpoint="0"
        >
            <template v-slot:item.name="{ item }">
                <branch-item :branch="item" />
            </template>

            <!-- No Data -->
            <template v-slot:no-data>
                <v-icon class="my-3 text--secondary" size="70">mdi-source-branch</v-icon>

                <h2>{{ t("branches.empty.title") }}</h2>

                <p>{{ t("branches.empty.desc") }}</p>
            </template>

            <!-- No matched data -->
            <template v-slot:no-results>
                <v-icon class="my-3 text--secondary" size="70">mdi-source-branch</v-icon>

                <h2>{{ t("branches.unmatched.title") }}</h2>

                <p>{{ t("branches.unmatched.desc") }}</p>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { Branch } from "@/api/models/Branch";
import BranchItem from "@/components/projects/items/BranchItem.vue";

@Component({
    components: { BranchItem }
})
export default class BranchesTable extends Vue {
    /**
     * Branches to display.
     */
    @Prop()
    branches: Branch[];

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
            text: "Branch",
            value: "name"
        }
    ];
}
</script>

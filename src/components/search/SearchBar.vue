<template>
    <v-autocomplete
        v-model="searchSelected"
        :search-input.sync="searchValue"
        :items="searchEntries"
        :loading="searchLoading"
        :menu-props="{ closeOnContentClick: true }"
        label="Search or jump to..."
        auto-select-first
        return-object
        flat
        solo-inverted
        hide-details
        :autofocus="autofocus"
    >
        <!-- Prepend (default search entry) -->
        <template v-slot:prepend-item>
            <v-list-item v-if="searchValue && searchValue.length > 0" @click="openSearch">
                <v-list-item-icon class="mr-3">
                    <v-icon>
                        mdi-magnify
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-title>
                    {{ searchValue }}
                </v-list-item-title>
            </v-list-item>
        </template>

        <!-- No Data -->
        <template v-slot:no-data>
            <v-list-item v-if="!searchValue || searchValue.length === 0">
                <v-list-item-title>
                    No projects found
                </v-list-item-title>
            </v-list-item>

            <span v-else></span>
        </template>
    </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SearchService from "@/api/services/SearchService";
import { Project } from "@/api/models/Project";
import { RouterUtil } from "@/util/RouterUtil";

@Component
export default class SearchBar extends Vue {
    /**
     * Should the search bar be automatically in focus when the item is created.
     */
    @Prop({ default: false })
    autofocus: boolean;

    /**
     * Value from the searchbar.
     */
    searchValue: string | null = null;

    /**
     * Value selected from the searchbar.
     */
    searchSelected: { text: string; value: Project } | null = null;

    /**
     * Search entries
     * This is the list with projects received from the server when typing a search query.
     */
    searchEntries: Array<{ text: string; value: Project }> = [];

    /**
     * If the search is loading.
     */
    searchLoading = false;

    /**
     * Go to the search page with given query parameter.
     */
    openSearch() {
        // Emit that an item from search has been selected.
        this.$emit("searchSelected");

        this.$router.push({
            name: "Search",
            query: {
                q: this.searchValueEncoded
            }
        });

        // Refresh the current route when already on the search page.
        if (this.$route.name === "Search") {
            RouterUtil.reload(this.$router);
        }
    }

    /**
     * Update the search entries list when a new search query is entered.
     */
    @Watch("searchValue")
    updateSearch() {
        // Set the searchbar is currently loading.
        this.searchLoading = true;

        // Create a copy of the search value.
        // This is to make sure that when the result is returned from the search it is the latest & correct value.
        // Sometimes certain requests get handles slower than more recent requests, causing incorrect search behavior.
        const searchValueCopy = this.searchValue;

        // Execute the search.
        SearchService.search(searchValueCopy ?? "", 5)
            .then(result => {
                // Only display the projects.
                // For other items such as issues, pulls the first option has to be clicked
                // to be redirected to the search page.
                const projects = result.projects;

                // Update the search entries.
                this.searchEntries = projects.map(project => {
                    return {
                        text: project.name,
                        value: project
                    };
                });
            })
            .catch(error => console.log(error))
            .finally(() => (this.searchLoading = false));
    }

    /**
     * Handle when clicked on a project search result.
     */
    @Watch("searchSelected")
    handleSearch() {
        // Emit that an item from search has been selected.
        this.$emit("searchSelected");

        // Go to the selected project.
        this.$router.push(`/projects/${this.searchSelected?.value.id}`);
    }

    /**
     * Convert the search value to a url string.
     */
    get searchValueEncoded(): string {
        return encodeURI(this.searchValue ?? "");
    }
}
</script>

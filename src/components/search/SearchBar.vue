<template>
    <v-autocomplete
        v-model="searchSelected"
        :search-input.sync="searchValue"
        :items="searchEntries"
        :loading="searchLoading"
        label="Search or jump to..."
        return-object
        flat
        solo-inverted
        hide-details
    >
        <!-- Prepend (default search entry) -->
        <template v-slot:prepend-item>
            <v-list-item v-if="searchValue && searchValue.length > 0" :to="`/search?q=${searchValueEncoded}`">
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
import { Component, Vue, Watch } from "vue-property-decorator";
import SearchService from "@/api/services/SearchService";
import { Project } from "@/api/models/Project";

@Component
export default class SearchBar extends Vue {
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
     */
    searchEntries: Array<{ text: string; value: Project }> = [];

    /**
     * If the search is loading.
     */
    searchLoading = false;

    /**
     * Update the search entries list when a new search query is entered.
     */
    @Watch("searchValue")
    updateSearch() {
        // Set the searchbar is currently loading.
        this.searchLoading = true;

        // Create a copy of the search value.
        // This is to make sure that when the result is returned from the search it is the latest & correct value.
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
     * Handle when clicked on a search result.
     */
    @Watch("searchSelected")
    handleSearch() {
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

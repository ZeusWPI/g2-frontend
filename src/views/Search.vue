<template>
    <v-container v-if="searchValue !== null">
        <!-- Filters -->
        <v-row>
            <!-- Free search -->
            <v-col cols="12" md="">
                <search-keyword-filter :filters.sync="filters.keyword" :query="searchQueryList" />
            </v-col>

            <!-- Tags -->
            <v-col cols="12" md="">
                <search-tag-filter :filters.sync="filters.tag" :query="searchQueryList" />
            </v-col>

            <!-- Projects -->
            <v-col cols="12" md="">
                <search-project-filter :filters.sync="filters.project" :query="searchQueryList" />
            </v-col>
        </v-row>

        <!-- Loading -->
        <template v-if="searchValue.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="searchValue.isSuccess()">
            <!-- Tabs -->
            <v-tabs v-model="tab" vertical background-color="transparent">
                <v-tab href="#projects">
                    <v-icon left>mdi-account</v-icon>
                    Projects

                    <v-chip class="ml-2" small>
                        {{ searchValue.data.projects.length }}
                    </v-chip>
                </v-tab>

                <v-tab href="#issues">
                    <v-icon left>mdi-alert-circle-outline</v-icon>
                    Issues

                    <v-chip class="ml-2" small>
                        {{ searchValue.data.issues.length }}
                    </v-chip>
                </v-tab>

                <v-tab href="#pulls">
                    <v-icon left>mdi-source-pull</v-icon>
                    Pulls

                    <v-chip class="ml-2" small>
                        {{ searchValue.data.pulls.length }}
                    </v-chip>
                </v-tab>

                <v-tab href="#branches">
                    <v-icon left>mdi-source-branch</v-icon>
                    Branches

                    <v-chip class="ml-2" small>
                        {{ searchValue.data.branches.length }}
                    </v-chip>
                </v-tab>

                <v-tabs-items v-model="tab" class="transparent">
                    <!-- Projects -->
                    <v-tab-item value="projects">
                        <v-card
                            class="ma-3 pa-3"
                            v-for="(project, index) of searchValue.data.projects"
                            :key="index"
                            outlined
                        >
                            <project-item :project="project" />
                        </v-card>
                    </v-tab-item>

                    <!-- Issues -->
                    <v-tab-item value="issues">
                        <v-card
                            class="ma-3 px-3"
                            v-for="(issue, index) of searchValue.data.issues"
                            :key="index"
                            outlined
                        >
                            <issue-pull-item :item="issue" type="issue" />
                        </v-card>
                    </v-tab-item>

                    <!-- Pulls -->
                    <v-tab-item value="pulls">
                        <v-card class="ma-3 px-3" v-for="(pull, index) of searchValue.data.pulls" :key="index" outlined>
                            <issue-pull-item :item="pull" type="pull" />
                        </v-card>
                    </v-tab-item>

                    <!-- Branches -->
                    <v-tab-item value="branches">
                        <v-card
                            class="ma-3 pa-3"
                            v-for="(branch, index) of searchValue.data.branches"
                            :key="index"
                            outlined
                        >
                            <branch-item :branch="branch" />
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </template>

        <!-- Error -->
        <template v-else-if="searchValue.isError()">
            <error-placeholder :error="searchValue.error" :options="{ style: 'SECTION' }" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { SearchWrapper } from "@/api/wrappers/SearchWrapper";
import SearchService from "@/api/services/SearchService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectItem from "@/components/projects/items/ProjectItem.vue";
import IssuePullItem from "@/components/projects/items/IssuePullItem.vue";
import BranchItem from "@/components/projects/items/BranchItem.vue";
import SearchTagFilter from "@/components/search/filters/SearchTagFilter.vue";
import SearchProjectFilter from "@/components/search/filters/SearchProjectFilter.vue";
import SearchKeywordFilter from "@/components/search/filters/SearchKeywordFilter.vue";

@Component({
    components: {
        SearchKeywordFilter,
        SearchProjectFilter,
        SearchTagFilter,
        BranchItem,
        IssuePullItem,
        ProjectItem,
        ErrorPlaceholder
    }
})
export default class SearchView extends Vue {
    /**
     * Search value received from the server.
     */
    searchValue: EchoPromise<SearchWrapper> | null = null;

    /**
     * Search query.
     */
    searchQuery: string;

    /**
     * Filters
     */
    filters = {
        /**
         * Selected tags as filter label format.
         */
        tag: [] as string[],

        /**
         * Selected projects as filter label format.
         */
        project: [] as string[],

        /**
         * Selected keywords as filter label format.
         */
        keyword: [] as string[]
    };

    /**
     * Model for the tab menu.
     */
    tab: string | null = null;

    /**
     * When the component is created.
     */
    created() {
        this.searchQuery = decodeURI((this.$route.query.q as string) ?? "");
        this.searchValue = SearchService.search(this.searchQuery);
    }

    /**
     * Convert the "searchQuery" to a list format using the separator.
     */
    get searchQueryList(): string[] {
        // Group 1: match all tags with a prefix (<prefix>:"<name>")
        // Group 2: match all tags with a prefix without quotes (<prefix>:<name>)
        // Group 3: match regular strings
        return this.searchQuery.match(/([^" ]+:"[^"]+")|([^" ]+:[^" ]+)|([^" ]+)/g) ?? [];
    }

    /**
     * Update the query when any of the queries update.
     */
    @Watch("filters", { deep: true })
    updateSearchQuery() {
        // Concat all filters into a single list.
        const filters = this.filters.tag.concat(this.filters.project).concat(this.filters.keyword);

        // Calculate the new search query.
        const newSearchQuery = filters.join(" ");

        if (this.searchQuery !== newSearchQuery) {
            this.searchQuery = encodeURI(newSearchQuery);

            // Update the history state without refreshing the page.
            history.pushState(null, "", `?q=${this.searchQuery}`);

            // Update the search result.
            this.searchValue = SearchService.search(this.searchQuery);
        }
    }
}
</script>

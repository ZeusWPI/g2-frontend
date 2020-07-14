<template>
    <div>
        <!-- Loading -->
        <template v-if="projects.isLoading()"> </template>

        <!-- Data -->
        <template v-else-if="projects.isSuccess()">
            <v-select
                v-model="selected"
                :items="projects.data"
                :menu-props="{ bottom: true, offsetY: true }"
                item-text="name"
                return-object
                label="Projects"
                deletable-chips
                chips
                small-chips
                multiple
                outlined
            >
            </v-select>
        </template>

        <!-- Error -->
        <template v-else-if="projects.isError()">
            <error-placeholder :error="projects.error" :options="{ style: 'SECTION', displayFullPage: true }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectService from "@/api/services/ProjectService";
import { Project } from "@/api/models/Project";
import { Tag } from "@/api/models/Tag";

@Component({
    components: { ErrorPlaceholder }
})
export default class SearchTagFilter extends Vue {
    /**
     * Selected projects as filter label format.
     * This only contains the filter labels for this filter.
     */
    @PropSync("filters")
    _filters: string[];

    /**
     * Optional query list with filters, used to feed the filters.
     */
    @Prop({ default: [] })
    query: string[];

    /**
     * Get the available projects.
     */
    projects: EchoPromise<Project[]> = ProjectService.getAll();

    /**
     * Selected data.
     */
    selected: Project[] = [];

    /**
     * When the component is created.
     */
    created() {
        // Feed the filters using the query list.
        this._filters = this.query.filter(filter => filter.startsWith("project:"));
    }

    /**
     * Update the filters when the "selected" value changes.
     */
    @Watch("selected")
    updateFilters() {
        this._filters = this.selected.map(project => `project:"${project.name}"`);
    }

    /**
     * Update the selected when the projects become available.
     */
    @Watch("tags")
    updateSelected() {
        if (this.projects.isSuccess()) {
            this.selected = this._filters

                // Find the project that corresponds with the given filter.
                .map(filter => this.projects.requireData().find(project => project.name === filter))

                // Filter all the filters that do not match an available tag.
                .filter(selected => selected !== undefined) as Project[];
        }
    }
}
</script>

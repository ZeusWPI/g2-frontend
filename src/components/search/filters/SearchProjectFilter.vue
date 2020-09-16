<template>
    <div>
        <!-- Loading | Data -->
        <template v-if="projects.isLoading() || projects.isSuccess()">
            <v-select
                v-model="selected"
                :items="items"
                :menu-props="{ bottom: true, offsetY: true }"
                :loading="projects.isLoading()"
                :label="t('search.filters.projects')"
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
import { Project } from "@/api/models/Project";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectService from "@/api/services/ProjectService";

@Component({
    components: { ErrorPlaceholder }
})
export default class SearchProjectFilter extends Vue {
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
    selected: string[] = [];

    /**
     * When the component is created.
     */
    created() {
        const filters = this.query.filter(filter => filter.startsWith("project:"));

        // Feed the filters using the query list.
        this._filters = filters;

        // Update the selected based on the given filters.
        this.selected = filters.map(filter => filter.replace("project:", "").replace(/"/g, ""));
    }

    /**
     * Get the items to display inside the selection menu.
     */
    get items(): string[] {
        // Concatenate the projects with the provided projects that are not in the project list.
        // This is to allow searching for projects that don't exists to prevent confusion with search.
        return this.projects.isSuccess()
            ? this.projects
                  .requireData()
                  .map(project => project.name)
                  .concat(this.selected)
            : this.selected;
    }

    /**
     * Update the filters when the "selected" value changes.
     */
    @Watch("selected")
    updateFilters() {
        this._filters = this.selected.map(projectName => `project:"${projectName}"`);
    }
}
</script>

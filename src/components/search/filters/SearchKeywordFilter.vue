<template>
    <v-text-field v-model="value" label="Keywords" outlined />
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import debounce from "debounce";

@Component({
    components: { ProjectTag, ErrorPlaceholder }
})
export default class SearchTagFilter extends Vue {
    /**
     * Selected tags as filter label format.
     * This only contains the filter labels for this filter.
     */
    @PropSync("filters", { required: true })
    _filters: string[];

    /**
     * Optional query list with filters, used to feed the filters.
     */
    @Prop({ default: [] })
    query: string[];

    /**
     * Input field value.
     */
    value = "";

    /**
     * When the component is created.
     */
    created() {
        // Feed the filters using the query list.
        // This regex matches everything that starts with "<value>:".
        const filters = this.query.filter(filter => !filter.match(/^[^:]*:/g));

        // Update the filters
        this._filters = filters;

        // Update the value based on the given filters.
        this.value = filters.join(" ");
    }

    /**
     * Update the filters when the "selected" value changes.
     */
    @Watch("value")
    updateFilters() {
        this.updateFiltersDebounce();
    }

    /**
     * Update the filters, but debounced.
     * This will only update the filters 300ms after the user has stopped typing.
     */
    updateFiltersDebounce = debounce(function() {
        this._filters = this.value.split(" ");
    }, 300);
}
</script>

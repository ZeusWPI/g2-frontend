<template>
    <div>
        <!-- Loading | Data -->
        <template v-if="tags.isLoading() || tags.isSuccess()">
            <v-select
                v-model="selected"
                :items="tags.isSuccess() ? tags.data : []"
                :menu-props="{ bottom: true, offsetY: true }"
                :loading="tags.isLoading()"
                item-text="name"
                label="Tags"
                deletable-chips
                chips
                small-chips
                multiple
                outlined
            >
            </v-select>
        </template>

        <!-- Error -->
        <template v-else-if="tags.isError()">
            <error-placeholder :error="tags.error" :options="{ style: 'SECTION', displayFullPage: true }" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Tag } from "@/api/models/Tag";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import TagService from "@/api/services/TagService";

@Component({
    components: { ErrorPlaceholder }
})
export default class SearchTagFilter extends Vue {
    /**
     * Selected tags as filter label format.
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
     * Get the available tags.
     */
    tags: EchoPromise<Tag[]> = TagService.getAll();

    /**
     * Selected data.
     */
    selected: string[] = [];

    /**
     * When the component is created.
     */
    created() {
        const filters = this.query.filter(filter => filter.startsWith("tag:"));

        // Feed the filters using the query list.
        this._filters = filters;

        // Update the selected based on the given filters.
        this.selected = filters.map(filter => filter.replace("tag:", "").replace('"', ""));
    }

    /**
     * Update the filters when the "selected" value changes.
     */
    @Watch("selected")
    updateFilters() {
        this._filters = this.selected.map(tagName => `tag:"${tagName}"`);
    }
}
</script>

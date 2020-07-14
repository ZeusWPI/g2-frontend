<template>
    <div>
        <!-- Loading -->
        <template v-if="tags.isLoading()"> </template>

        <!-- Data -->
        <template v-else-if="tags.isSuccess()">
            <v-select
                v-model="selected"
                :items="tags.data"
                :menu-props="{ bottom: true, offsetY: true }"
                item-text="name"
                return-object
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
    selected: Tag[] = [];

    /**
     * When the component is created.
     */
    created() {
        // Feed the filters using the query list.
        // This regex matches everything that starts with "<value>:".
        this._filters = this.query.filter(filter => filter.startsWith("tag:"));
    }

    /**
     * Update the filters when the "selected" value changes.
     */
    @Watch("selected")
    updateFilters() {
        this._filters = this.selected.map(tag => `tag:"${tag.name}"`);
    }

    /**
     * Update the selected when the tags become available.
     */
    @Watch("projects")
    updateSelected() {
        if (this.tags.isSuccess()) {
            this.selected = this._filters

                // Find the tag that corresponds with the given filter.
                .map(filter => this.tags.requireData().find(tag => tag.name === filter))

                // Filter all the filters that do not match an available tag.
                .filter(selected => selected !== undefined) as Tag[];
        }
    }
}
</script>

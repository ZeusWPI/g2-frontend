<template>
    <div>
        <v-card-title>
            Tags

            <v-chip v-if="tags.isSuccess()" class="ml-2" small>
                {{ tags.data.length }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="tags.isLoading()">
                <v-skeleton-loader type="chip" />
            </template>

            <!-- Data -->
            <template v-else-if="tags.isSuccess()">
                <project-tag v-for="(tag, index) of tags.data" :key="index" :tag="tag" />
            </template>

            <!-- Error -->
            <template v-else-if="tags.isError()">
                <error-placeholder :error="tags.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Tag } from "@/api/models/Tag";
import AuthorItem from "@/components/projects/items/AuthorItem.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";

@Component({
    components: { ProjectTag, ErrorPlaceholder, AuthorItem }
})
export default class ProjectTags extends Vue {
    /**
     * List with tags.
     */
    @Prop()
    tags: EchoPromise<Tag[]>;
}
</script>

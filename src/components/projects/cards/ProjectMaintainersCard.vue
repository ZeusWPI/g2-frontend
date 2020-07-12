<template>
    <div>
        <v-card-title>
            Maintainers

            <v-chip v-if="maintainers.isSuccess()" class="ml-2" small>
                {{ maintainers.data.length }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="maintainers.isLoading()">
                <author-item v-for="index in 3" :key="index" :loading="true" :show-name="true" />
            </template>

            <!-- Data -->
            <template v-else-if="maintainers.isSuccess()">
                <author-item
                    v-for="(author, index) of maintainers.data"
                    :key="index"
                    :author="author"
                    :show-name="true"
                />
            </template>

            <!-- Error -->
            <template v-else-if="maintainers.isError()">
                <error-placeholder :error="maintainers.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Author } from "@/api/models/Author";
import { EchoPromise } from "echofetch";
import AuthorItem from "@/components/projects/items/AuthorItem.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder, AuthorItem }
})
export default class ProjectMaintainersCard extends Vue {
    /**
     * List with maintainers.
     */
    @Prop()
    maintainers: EchoPromise<Author[]>;
}
</script>

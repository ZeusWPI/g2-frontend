<template>
    <div>
        <v-card-title>
            {{ t("maintainers.title") }}

            <v-chip v-if="maintainers.isSuccess()" class="ml-2" small>
                {{ maintainers.data.length }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="maintainers.isLoading()">
                <v-progress-circular class="py-8" size="40" width="3" color="primary" indeterminate />
            </template>

            <!-- Data -->
            <template v-else-if="maintainers.isSuccess()">
                <!-- Data available -->
                <template v-if="maintainers.data.length >= 0">
                    <v-row no-gutters>
                        <author-item v-for="(author, index) of maintainers.data" :key="index" :author="author" />
                    </v-row>
                </template>

                <!-- Data empty -->
                <template v-else>
                    {{ t("maintainers.empty") }}
                </template>
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
export default class ProjectMaintainers extends Vue {
    /**
     * List with maintainers.
     */
    @Prop()
    maintainers: EchoPromise<Author[]>;
}
</script>

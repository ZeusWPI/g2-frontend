<template>
    <div>
        <v-card-title>
            Contributors

            <v-chip v-if="contributors.isSuccess()" class="ml-2" small>
                {{ contributors.data.length }}
            </v-chip>
        </v-card-title>

        <v-card-text>
            <!-- Loading -->
            <template v-if="contributors.isLoading()">
                <v-row no-gutters>
                    <author-item v-for="index in 3" :key="index" :loading="true" />
                </v-row>
            </template>

            <!-- Data -->
            <template v-else-if="contributors.isSuccess()">
                <!-- Data available -->
                <template v-if="contributors.data.length >= 0">
                    <v-row no-gutters>
                        <author-item v-for="(author, index) of contributors.data" :key="index" :author="author" />
                    </v-row>
                </template>

                <!-- Data empty -->
                <template v-else>
                    No contributors available.
                </template>
            </template>

            <!-- Error -->
            <template v-else-if="contributors.isError()">
                <error-placeholder :error="contributors.error" :options="{ style: 'SECTION' }" />
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
export default class ProjectContributors extends Vue {
    /**
     * List with contributors.
     */
    @Prop()
    contributors: EchoPromise<Author[]>;
}
</script>

<template>
    <v-container class="container--small">
        <!-- Header -->
        <v-row justify="space-between" align="center">
            <v-col>
                <h2>
                    {{ t("tags.info.title") }}
                </h2>

                <p class="text--secondary">
                    {{ t("tags.info.desc") }}
                </p>
            </v-col>

            <v-col cols="12" sm="auto">
                <v-btn color="primary" depressed @click="openCreate">
                    <v-icon left>
                        mdi-plus-circle-outline
                    </v-icon>

                    {{ t("tags.create.button") }}
                </v-btn>
            </v-col>
        </v-row>

        <!-- Searchbar -->
        <v-text-field v-model="search" :label="t('tags.search')" outlined dense />

        <!-- Loading -->
        <template v-if="tags.isLoading()">
            <v-skeleton-loader type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="tags.isSuccess()">
            <tags-table :tags="tags.data" :search.sync="search" />
        </template>

        <!-- Error -->
        <template v-else-if="tags.isError()">
            <error-placeholder :error="tags.error" :options="{ style: 'SECTION' }" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Tag } from "@/api/models/Tag";
import TagsTable from "@/components/projects/tables/TagsTable.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import TagService from "@/api/services/TagService";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component({
    components: { ErrorPlaceholder, TagsTable }
})
export default class Tags extends Vue {
    /**
     * List with available tags.
     */
    tags: EchoPromise<Tag[]> = TagService.getAll();

    /**
     * Search value.
     */
    search = "";

    /**
     * Open the create modal.
     */
    openCreate() {
        ModalHandler.open({
            component: () => import("@/components/projects/modals/TagCreateModal.vue")
        });
    }
}
</script>

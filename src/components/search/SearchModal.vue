<template>
    <v-card>
        <v-card-title class="modal__title">
            {{ t("search.label") }}
        </v-card-title>

        <v-card-subtitle>
            <v-row>
                <v-col cols="auto">
                    <v-icon>
                        mdi-keyboard-return
                    </v-icon>

                    {{ t("search.action.select") }}
                </v-col>

                <v-col cols="auto">
                    <v-icon>
                        mdi-swap-vertical
                    </v-icon>

                    {{ t("search.action.navigate") }}
                </v-col>

                <v-col cols="auto">
                    <v-icon>
                        mdi-keyboard-esc
                    </v-icon>

                    {{ t("search.action.close") }}
                </v-col>
            </v-row>
        </v-card-subtitle>

        <v-card-text>
            <search-bar :autofocus="true" @searchSelected="close" />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "@/components/search/SearchBar.vue";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component({
    components: { SearchBar }
})
export default class SearchModal extends Vue {
    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }
}
</script>

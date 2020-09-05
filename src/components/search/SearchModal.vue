<template>
    <v-card>
        <v-card-title>
            <search-bar :autofocus="true" @searchSelected="close" />
        </v-card-title>
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

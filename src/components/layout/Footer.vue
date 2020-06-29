<template>
    <v-footer absolute class="font-weight-medium">
        <!-- Empty Spacer -->
        <v-col class="text-center" cols="12" md="2"></v-col>

        <!-- Zeus WPI -->
        <v-col class="text-center" cols="12" md="7">
            Made with
            <v-icon class="footer__heart">
                mdi-heart
            </v-icon>
            by Zeus WPI
        </v-col>

        <!-- Dark theme toggle -->
        <v-col
            class="text-center d-flex"
            cols="12"
            md="2"
            style="justify-content: center;"
        >
            <v-switch v-model="dark" label="Dark mode" />
        </v-col>
    </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreModel } from "@/store/decorators/StoreModel";

@Component
export default class Footer extends Vue {
    /**
     * If dark theme is enabled.
     */
    @StoreModel("theme/dark", "theme/toggleDark")
    dark: boolean;
}
</script>

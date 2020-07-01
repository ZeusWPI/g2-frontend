<template>
    <v-footer height="auto" class="font-weight-medium footer">
        <!-- Select Language -->
        <v-col class="text-center d-flex justify-center" cols="12" md="2">
            <v-select v-model="language" :items="languages" label="Language" flat solo dense hide-details />
        </v-col>

        <!-- Zeus WPI -->
        <v-col class="text-center" cols="12" md="7">
            Made with
            <v-icon class="footer__heart">
                mdi-heart
            </v-icon>
            by Zeus WPI
        </v-col>

        <!-- Dark theme toggle -->
        <v-col class="text-center d-flex justify-center" cols="12" md="2">
            <v-switch v-model="dark" label="Dark mode" />
        </v-col>
    </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreModel } from "@/store/decorators/StoreModel";
import { languages } from "@/plugins/i18n";

@Component
export default class Footer extends Vue {
    /**
     * If dark theme is enabled.
     */
    @StoreModel("theme/dark", "theme/toggleDark")
    dark: boolean;

    /**
     * Selected language.
     */
    @StoreModel("i18n/languageInput", "i18n/setLanguageInput")
    language: {
        text: string;
        value: string;
    };

    /**
     * Get language options
     */
    get languages() {
        return languages.map(language => {
            return {
                text: language.name,
                value: language.code
            };
        });
    }
}
</script>

<style lang="scss" scoped>
.footer {
    &__heart {
        color: #ff3860;
    }
}
</style>

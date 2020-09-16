<template>
    <div :class="`error-section ${payload.options.displayFullPage ? 'text-center' : ''}`">
        <!-- Image (only if fullscreen) -->
        <div v-if="payload.options.displayFullPage" class="error-section__image">
            <v-img height="100%" src="@/assets/img/error.svg" contain />
        </div>

        <!-- Message -->
        <div class="error-section__message">
            {{ payload.error.customMessage }}
        </div>

        <!-- Description -->
        <div class="error-section__description">
            {{ payload.error.customDescription }}
        </div>

        <!-- Home button (only if fullscreen) -->
        <div class="error-section__actions">
            <v-btn color="primary" depressed to="/">
                {{ t("error.home") }}
                <v-icon right>mdi-home</v-icon>
            </v-btn>

            <v-btn depressed @click="reloadRoute()">
                {{ t("refresh") }}
                <v-icon right>mdi-refresh</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouterUtil } from "@/util/RouterUtil";
import { ErrorComponentPayload } from "@/api/error/types/component/ErrorComponentPayload";

@Component
export default class ErrorSection extends Vue {
    /**
     * Payload of the error.
     */
    @Prop()
    payload: ErrorComponentPayload;
    /**
     * Reload the current route.
     */
    reloadRoute() {
        RouterUtil.reload(this.$router);
    }
}
</script>

<style lang="scss">
.error-section {
    &__image {
        height: 150px;
        width: 100%;
        margin-bottom: 50px;
    }
    &__actions {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        > * {
            margin: 0 8px;
        }
    }
    &__message {
        font-size: 1.9em;
        font-weight: 500;
        padding-bottom: 20px;
    }
    &__description {
        font-size: 1.1em;
    }
}
</style>

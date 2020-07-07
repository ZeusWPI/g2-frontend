<template>
    <v-card :class="`error-card ${payload.options.displayFullPage ? 'text-center' : ''}`">
        <!-- Image (only if fullscreen) -->
        <div v-if="payload.options.displayFullPage" class="error-card__image">
            <v-img height="100%" src="@/assets/img/error.svg" contain />
        </div>

        <!-- Message -->
        <v-card-title :class="`error-card__message ${payload.options.displayFullPage ? 'justify-center' : ''}`">
            {{ payload.error.customMessage }}
        </v-card-title>

        <!-- Description -->
        <v-card-text class="error-card__description">
            {{ payload.error.customDescription }}
        </v-card-text>

        <!-- Home button (only if fullscreen) -->
        <v-card-actions class="error-card__actions">
            <v-btn color="primary" depressed to="/">
                Home Page
                <v-icon right>mdi-home</v-icon>
            </v-btn>

            <v-btn depressed @click="reloadRoute($router)">
                Refresh
                <v-icon right>mdi-refresh</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ErrorComponentPayload } from "@/api/error/types/component/ErrorComponentPayload";
import { RouterUtil } from "@/util/RouterUtil";

@Component
export default class ErrorCard extends Vue {
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

<style lang="scss" scoped>
.error-card {
    padding: 20px;

    &__image {
        height: 150px;
        width: 100%;
        margin-bottom: 50px;
    }

    &__actions {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }

    &__message {
        font-size: 1.9em;
        padding-bottom: 20px;
        text-wrap: normal;
    }

    &__description {
        font-size: 1.1em;
    }
}
</style>

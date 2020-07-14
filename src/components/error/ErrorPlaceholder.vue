<template>
    <div>
        <!-- Full Page error -->
        <v-container v-if="options.displayFullPage">
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <component :is="errorComponent" :payload="errorComponentPayload" />
                </v-col>
            </v-row>
        </v-container>

        <!-- Regular error -->
        <div v-else>
            <component v-if="errorComponent" :is="errorComponent" :payload="errorComponentPayload" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { ErrorComponentPayload } from "@/api/error/types/component/ErrorComponentPayload";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import ErrorCard from "@/components/error/placeholders/ErrorCard.vue";
import ErrorSection from "@/components/error/placeholders/ErrorSection.vue";

@Component
export default class ErrorPlaceholder extends Vue {
    /**
     * Error to display.
     */
    @Prop({ required: true })
    error: EchoError;

    /**
     * Display options.
     */
    @Prop({ default: {}, required: true })
    options: CustomErrorOptions;

    /**
     * If this is the placeholder is the full page placeholder.
     */
    @Prop({ default: false })
    isFullPage: boolean;

    /**
     * Error component to use.
     */
    get errorComponent() {
        switch (this.options.style) {
            case "CARD": {
                return ErrorCard;
            }

            case "SECTION": {
                return ErrorSection;
            }

            default: {
                return null;
            }
        }
    }

    /**
     * Payload to pass to the error component.
     */
    get errorComponentPayload() {
        const payload = new ErrorComponentPayload();
        payload.error = ErrorHandler.handle(this.error, this.options, {}, !this.isFullPage);
        payload.options = this.options;

        return payload;
    }
}
</script>

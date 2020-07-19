<template>
    <v-card :tile="$vuetify.breakpoint.smAndDown">
        <v-card-title class="modal__title">
            {{ t(`${payload.type}.new.title`) }}

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-subtitle>
            {{ t(`${payload.type}.new.desc`) }}
        </v-card-subtitle>

        <v-card-text>
            <!-- Loading -->
            <template v-if="payload.repositories.isLoading()">
                <v-skeleton-loader v-for="index of 3" :key="index" type="list" />
            </template>

            <!-- Data -->
            <template v-else-if="payload.repositories.isSuccess()">
                <v-card
                    class="repository-card mb-3"
                    v-for="(repository, index) of payload.repositories.data"
                    :key="index"
                    :href="getNewUrl(repository)"
                    outlined
                >
                    <v-card-title>
                        {{ repository.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ repository.description }}
                    </v-card-subtitle>
                </v-card>
            </template>

            <!-- Error -->
            <template v-else-if="payload.repositories.isError()">
                <error-placeholder :error="payload.repositories.error" :options="{ style: 'SECTION' }" />
            </template>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Repository } from "@/api/models/Repository";
import { EchoPromise } from "echofetch";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import { ModalHandler } from "@/util/modal/ModalHandler";

@Component({
    components: { ErrorPlaceholder }
})
export default class NewIssuePullModal extends Vue {
    /**
     * Payload
     */
    @Prop()
    payload: {
        /**
         * Type to use.
         */
        type: "issues" | "pulls";

        /**
         * Available repositories
         */
        repositories: EchoPromise<Repository[]>;
    };

    /**
     * Close the modal.
     */
    close() {
        ModalHandler.close();
    }

    /**
     * Get the url for creating a new issue/pull for a given repository.
     * @param repository Repository.
     */
    getNewUrl(repository: Repository): string {
        if (this.payload.type === "issues") {
            return repository.newIssueUrl;
        }

        if (this.payload.type === "pulls") {
            return repository.newIssueUrl;
        }

        return "";
    }
}
</script>

<style lang="scss" scoped>
.repository-card {
    &:hover {
        background-color: #eeeeee;
    }

    &.theme--dark:hover {
        background-color: #616161;
    }
}
</style>

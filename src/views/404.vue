<template>
    <error-placeholder :error="error" :options="{ style: 'CARD', displayFullPage: true }" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder }
})
export default class NotFound extends Vue {
    /**
     * 404 error to display using the error placeholder
     */
    get error() {
        return {
            code: "404",
            message: ""
        };
    }
}
</script>

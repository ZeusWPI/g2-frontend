<template>
    <div>
        <!-- Loading -->
        <div v-if="test.loading">Loading...</div>

        <!-- Data -->
        <div v-else>{{ test.data }}</div>
    </div>
</template>

<script>
    import { fetch } from "../util/fetch";

    export default {
        data: () => ({
            test: fetch("https://www.mocky.io/v2/5185415ba171ea3a00704eed")
        })
    };
</script>

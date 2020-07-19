<template>
    <v-row align="center" justify="center" style="margin-top: 200px">
        <v-progress-circular size="80" width="3" color="primary" indeterminate />
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PageLoader extends Vue {}
</script>

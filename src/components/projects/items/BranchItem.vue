<template>
    <v-list-item :href="branch.url">
        <v-list-item-content>
            <v-list-item-title>
                {{ branch.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
                {{ branch.repository.name }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Branch } from "@/api/models/Branch";

@Component
export default class BranchItem extends Vue {
    /**
     * Branch to display
     */
    @Prop()
    branch: Branch;
}
</script>

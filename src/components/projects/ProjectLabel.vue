<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                :color="label.color"
                class="mr-2 mb-2"
                small
                v-bind="attrs"
                v-on="on"
                :dark="$vuetify.theme.dark"
                outlined
            >
                {{ label.name }}
            </v-chip>
        </template>

        <span :disabled="!label.description">{{ label.description }}</span>
    </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Label } from "@/api/models/Label";

@Component
export default class ProjectLabel extends Vue {
    /**
     * Label to display.
     */
    @Prop()
    label: Label;
}
</script>

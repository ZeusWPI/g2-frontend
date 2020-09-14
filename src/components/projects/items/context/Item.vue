<template>
    <v-card :class="classes" :href="href" :target="hrefNewTab ? '_blank' : ''" :to="to" color="transparent" flat>
        <!-- Default slot. -->
        <slot />
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VItem extends Vue {
    /**
     * If the item should change color when hovering.
     */
    @Prop({ default: false, type: Boolean })
    hover: boolean;

    /**
     * (Optional) URL to open.
     */
    @Prop()
    href: string;

    /**
     * (Optional) If the href URL should open in a new tab.
     */
    @Prop()
    hrefNewTab: boolean;

    /**
     * (Optional) Route to open.
     */
    @Prop()
    to: string;

    /**
     * CSS classes to apply to the element.
     */
    get classes() {
        return ["item", this.hover ? "hover" : ""].join(" ");
    }
}
</script>

<style lang="scss" scoped>
.item {
    padding-left: 12px;
    padding-right: 12px;
}
</style>

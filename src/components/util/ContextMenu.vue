<template>
    <div @contextmenu="handle">
        <slot />

        <!-- Context menu -->
        <v-menu class="menu" v-model="show" :position-x="x" :position-y="y" min-width="200">
            <v-list dense>
                <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContextMenuLink } from "@/types/ContextMenuLink";

@Component
export default class ContextMenu extends Vue {
    /**
     * Items to display inside the menu.
     */
    @Prop({ required: true })
    items: ContextMenuLink;

    /**
     * Should the context menu be shown.
     */
    show = false;

    /**
     * X coordinate.
     */
    x = 0;

    /**
     * Y coordinate.
     */
    y = 0;

    /**
     * Handle the context menu clicks.
     */
    handle(event: MouseEvent) {
        // Prevent the default context menu from opening.
        event.preventDefault();

        // If the context menu is open, close it.
        // This is also how browser context menus work.
        if (this.show) {
            this.show = false;
            return;
        }

        // Update the coordinates
        this.x = event.clientX;
        this.y = event.clientY;

        // Show the context menu.
        this.show = true;
    }
}
</script>

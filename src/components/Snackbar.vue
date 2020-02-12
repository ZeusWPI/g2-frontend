<template>
    <v-snackbar
        v-model="open"
        :bottom="data.y === 'bottom'"
        :left="data.x === 'left'"
        :multi-line="data.mode === 'multi-line'"
        :right="data.x === 'right'"
        :timeout="data.timeout"
        :top="data.y === 'top'"
        :vertical="data.mode === 'vertical'"
        :color="data.color"
    >
        {{ data.message }}

        <v-spacer />

        <v-btn text @click="close">
            x
        </v-btn>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "Snackbar",

    computed: {
        ...mapState("snackbar", ["data"]),

        open: {
            get() {
                return this.$store.state.snackbar.open;
            },

            set(value) {
                return this.$store.commit("snackbar/SET_OPEN", value);
            }
        }
    },

    methods: {
        ...mapActions("snackbar", ["close"])
    }
};
</script>

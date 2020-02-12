<template>
    <v-dialog v-model="open" persistent :max-width="data.width">
        <!-- Other -->
        <v-card>
            <!-- Title -->
            <v-card-title class="headline">{{ data.title }}</v-card-title>

            <!-- Content -->
            <v-card-text v-if="data.content">{{ data.content }}</v-card-text>

            <!-- Component -->
            <component
                :is="Object.assign({}, data.component)"
                v-if="data.component"
                :action="data.action"
            />
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Modal",

    computed: {
        data: {
            get() {
                return Object.assign({}, this.$store.state.modal.data);
            },

            set(value) {
                return this.$store.commit("modal/SET_DATA", value);
            }
        },

        open: {
            get() {
                return this.$store.state.modal.open;
            },

            set(value) {
                return this.$store.commit("modal/SET_OPEN", value);
            }
        }
    },

    methods: {
        ...mapActions("modal", ["close"])
    }
};
</script>

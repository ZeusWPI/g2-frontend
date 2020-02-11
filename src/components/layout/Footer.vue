<template>
    <v-footer absolute class="font-weight-medium">
        <v-col class="text-center" cols="12" md="2"></v-col>

        <!-- Zeus WPI -->
        <v-col class="text-center" cols="12" md="7">
            Made with
            <i class="fa fa-heart footer__heart" />
            by Zeus WPI
        </v-col>

        <!-- Dark theme toggle -->
        <v-col
            class="text-center d-flex"
            cols="12"
            md="2"
            style="justify-content: center;"
        >
            <v-switch v-model="dark" label="Dark mode" />
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
    computed: {
        dark: {
            get() {
                return this.$store.state.theme.dark;
            },
            set() {
                this.$store.dispatch("toggleDark");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    &__heart {
        color: #ff3860;
    }
}
</style>

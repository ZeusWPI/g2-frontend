<template>
  <v-footer class="footer">
    <v-layout wrap justify-space-between text-xs-center>
      <v-flex xs12 sm2 />
      <v-flex xs12 sm7>
        <p class="footer__zeus">
          Made with
          <i class="fa fa-heart footer_zeus_heart" /> by Zeus WPI
        </p>
      </v-flex>
      <v-flex xs12 sm2 justify-center>
        <v-switch v-model="toggleDark" label="Dark mode" />
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      toggleDark: this.$store.state.isDark
    };
  },
  watch: {
    toggleDark() {
      this.$store.state.isDark = !this.$store.state.isDark;
    }
  }
};
</script>

<style scoped>
.footer {
  min-height: 75px;
}

.footer__zeus {
  margin-top: 25px;
}

.footer_zeus_heart {
  color: #ff3860;
}
</style>

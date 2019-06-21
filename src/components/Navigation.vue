<template>
  <v-layout>
    <v-toolbar>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>G2</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.path"
          class="header__item"
          :to="link.path"
          flat
        >
          {{ link.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              G2
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider />

      <v-list dense class="pt-0">
        <v-list-tile
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          @click="true"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ link.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import Config from "../config";

export default {
  name: "Navigation",
  data: () => ({
    drawer: false,
    links: Config.links.filter(link => !link.disabled) // Filter out the links that are disabled.
  })
};
</script>

<style scoped>
.header__item {
  border-radius: 0;
}
</style>

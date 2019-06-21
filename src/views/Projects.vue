<template>
  <div>
    <v-btn @click="reloadRepositories">
      Reload repositories
    </v-btn>
    <v-layout wrap justify-center>
      <project
        v-for="project in projects"
        :key="project.name"
        :title="project.name"
        :subtitle="project.subtitle"
        :description="project.description"
        :image="project.image"
        :url="project.url"
      />
    </v-layout>
  </div>
</template>

<script>
import Config from "../config.js";
import axios from "axios";

import Project from "../components/Project.vue";

export default {
  name: "Projects",
  components: { Project },

  data() {
    return {
      projects: []
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      axios
        .get(`${Config.backend.url}${Config.backend.endpoints.projects}`)
        .then(response => {
          this.projects = response.data.repos;
        });
    },
    reloadRepositories: function() {
      axios
        .get(`${Config.backend.url}${Config.backend.endpoints.refreshUrl}`)
        .then(() => {
          this.loadData();
        });
    }
  }
};
</script>

<style>
.md-content {
  width: 100px;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

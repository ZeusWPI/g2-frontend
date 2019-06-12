<template>
    <div>
        <v-btn v-on:click="reloadRepositories">Reload repositories</v-btn>
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
        name: "projects",
        data: {
            projects: JSON
        },
        components: {
            Project
        },
        data() {
            return {
                projects: []
            };
        },
        created: function() {
            this.loadData();
        },
        methods: {
            loadData: function(viewerUserId, posterUserId) {
                axios
                    .get(`${Config.backend.url}${Config.backend.endpoints.projects}`)
                    .then(response => {
                        this.projects = response.data.repos;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            reloadRepositories: function () {
                axios.get(`${Config.backend.url}${Config.backend.endpoints.refreshUrl}`)
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


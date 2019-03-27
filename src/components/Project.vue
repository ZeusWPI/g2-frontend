<template>
    <v-flex xs12 md6 lg4>
        <v-card height="100%">
            <v-img class="project__image" :src="image"></v-img>

            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ title }}</div>
                    <span class="grey--text">{{ subtitle }}</span>
                </div>
            </v-card-title>

            <v-card-text>{{ description }}</v-card-text>

            <v-card-actions class="project__actions">
                <v-btn flat color="primary">Bekijk project</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        name: "Project",
        props: {
            image: String,
            title: String,
            subtitle: String,
            description: String
        },

        data() {
            return {
                loaded: false
            };
        },
        methods: {
            onLoaded() {
                this.loaded = true;
            }
        }
    };
</script>

<style>
    .project__image {
        height: 200px;
        object-fit: cover;
        object-position: 50% 50%;
    }

    .project__actions {
        justify-content: end;
        margin-top: auto;
    }
</style>


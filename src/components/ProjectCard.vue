<template>
    <div>
        <v-skeleton-loader type="image, article, actions" v-if="loading" />

        <!-- Data -->
        <v-card v-else-if="project">
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
            />

            <v-card-title>
                {{ project.name }}
            </v-card-title>

            <v-card-subtitle>
                {{ project.description }}
            </v-card-subtitle>

            <v-card-actions>
                <v-spacer />

                <v-btn text color="primary" :to="`project/${project.id}`">
                    Meer informatie
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ProjectCard",

    props: {
        project: {
            type: Object,
            default: () => {}
        },

        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

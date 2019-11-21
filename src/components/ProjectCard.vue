<template>
    <v-card>
        <v-img
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        />
    </v-card>
</template>

<script>
export default {
    name: "ProjectCard",

    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

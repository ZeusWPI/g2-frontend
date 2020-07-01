<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <login-card />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginCard from "@/components/login/LoginCard.vue";
@Component({
    components: { LoginCard }
})
export default class LoginView extends Vue {}
</script>

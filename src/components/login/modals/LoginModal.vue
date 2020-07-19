<template>
    <login-card :is-modal="true" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginCard from "@/components/login/LoginCard.vue";

@Component({
    components: { LoginCard }
})
export default class LoginModal extends Vue {}
</script>

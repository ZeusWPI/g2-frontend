<template>
    <!-- Hero -->
    <div class="hero pt-0 pt-sm-10">
        <v-container class="container--small">
            <!-- Title -->
            <div class="hero__title white--text">
                {{ t("home.hero.title") }}
            </div>

            <!-- Description -->
            <div class="hero__description white--text">
                {{ t("home.hero.desc") }}
            </div>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeHero extends Vue {}
</script>

<style lang="scss" scoped>
.hero {
    background: var(--v-primary-base);
    min-height: 300px;
    padding: 0 25px 60px 25px;

    &__title {
        font-size: 2em;
        font-weight: 500;
        line-height: 1.8;
    }

    &__description {
        font-size: 1em;
        font-weight: 400;
        line-height: 1.8;
    }
}
</style>

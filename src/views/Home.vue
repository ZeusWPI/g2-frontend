<template>
    <div :class="`home__${$vuetify.theme.dark ? 'dark' : 'light'}`">
        <!-- Hero -->
        <home-hero />

        <!-- Content -->
        <v-container class="hero__overlap container--small">
            <!-- Popular projects -->
            <home-projects />

            <!-- Recent issues -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>{{ t("home.issues") }}</v-card-title>

                        <v-skeleton-loader
                            v-for="index of 3"
                            :key="index"
                            type="list-item-avatar-three-line"
                            boilerplate
                        />
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>{{ t("home.pulls") }}</v-card-title>

                        <v-skeleton-loader
                            v-for="index of 3"
                            :key="index"
                            type="list-item-avatar-three-line"
                            boilerplate
                        />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeProjects from "@/components/home/HomeProjects.vue";

@Component({
    components: { HomeProjects, HomeHero }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
    &__light {
        background-color: #fafafa;
    }
}

.hero {
    &__overlap {
        margin-top: -100px;
    }
}
</style>

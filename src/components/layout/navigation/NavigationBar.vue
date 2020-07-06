<template>
    <v-toolbar class="navbar" color="primary" dark fixed>
        <!-- Open drawer icon -->
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="toggleDrawer" />

        <!-- Title -->
        <v-toolbar-title class="navbar__title" @click="$router.push('/')">
            <span>G2</span>
        </v-toolbar-title>

        <v-spacer />

        <!-- Items -->
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="(link, index) in links" :key="index" :to="link.to" exact text>
                {{ link.text }}
            </v-btn>

            <!-- Authentication -->
            <template>
                <!-- Loading -->
                <template v-if="user.isLoading()">
                    <v-btn text>
                        <v-skeleton-loader class="skeleton__user" width="100px" type="text" />
                    </v-btn>
                </template>

                <!-- Logged in -->
                <template v-else-if="user.isSuccess()">
                    <v-btn text>
                        {{ user.data.name }}
                    </v-btn>
                </template>

                <!-- Not logged in -->
                <template v-else-if="user.isError()">
                    <v-btn text @click="openLogin">
                        Login
                    </v-btn>
                </template>
            </template>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";
import { StoreGetter } from "@/store/decorators/StoreGetter";
import { User } from "@/api/models/User";
import { EchoPromise } from "echofetch";
import { ModalHandler } from "@/util/modal/ModalHandler";
import LoginModal from "@/components/login/modals/LoginModal.vue";

@Component
export default class NavigationBar extends Vue {
    /**
     * Should the drawer be open.
     */
    @PropSync("drawer")
    _drawer: boolean;

    /**
     * Links to display inside the navigation bar
     */
    @Prop()
    links: Array<NavigationLink>;

    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    user: EchoPromise<User>;

    /**
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer(): void {
        this._drawer = !this._drawer;
    }

    /**
     * Open the login modal.
     */
    openLogin() {
        ModalHandler.open({
            component: LoginModal
        });
    }
}
</script>

<style lang="scss">
.navbar {
    z-index: 100;

    &__title {
        cursor: pointer;
        padding: 10px;
        font-size: 1.2rem;
        width: 210px;
        color: white;

        img {
            max-height: 30px;
            margin-right: 15px;
            float: left;
        }
    }
}
</style>

<template>
    <v-toolbar class="navbar" color="primary" :flat="$route.name === 'Home'" dark fixed elevate-on-scroll>
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
        </v-toolbar-items>

        <!-- Authentication -->
        <div class="ml-3">
            <!-- Loading -->
            <template v-if="user.isLoading()">
                <v-btn text>
                    <user-avatar loading />
                </v-btn>
            </template>

            <!-- Logged in -->
            <template v-else-if="user.isSuccess()">
                <v-menu offset-y>
                    <!-- Button -->
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon rounded>
                            <user-avatar :user="user.data" />
                        </v-btn>
                    </template>

                    <!-- Menu -->
                    <v-list nav dense>
                        <v-list-item>
                            <!-- Avatar -->
                            <v-list-item-avatar>
                                <user-avatar :user="user.data" />
                            </v-list-item-avatar>

                            <!-- User information -->
                            <v-list-item-content>
                                <v-list-item-title>{{ user.data.name }}</v-list-item-title>
                                <v-list-item-subtitle>test@example.org</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider class="my-3" />

                        <!-- Account -->
                        <v-list-item to="/account">
                            <v-list-item-title>
                                My account
                            </v-list-item-title>
                        </v-list-item>

                        <!-- Settings -->
                        <v-list-item to="/account/settings">
                            <v-list-item-title>
                                Settings
                            </v-list-item-title>
                        </v-list-item>

                        <v-divider class="my-3" />

                        <!-- Logout -->
                        <v-list-item to="/account/logout">
                            <v-list-item-title>
                                Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <!-- Not logged in -->
            <template v-else-if="user.isError()">
                <v-btn text @click="openLogin">
                    Login
                </v-btn>
            </template>
        </div>
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
import UserAvatar from "@/components/user/UserAvatar.vue";

@Component({
    components: { UserAvatar }
})
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
            component: LoginModal,
            responsive: true
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

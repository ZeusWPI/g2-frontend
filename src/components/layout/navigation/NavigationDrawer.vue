<template>
    <v-navigation-drawer v-model="_drawer" absolute temporary>
        <v-list nav dense>
            <v-list-item v-for="(link, index) in links" :key="index" :to="link.to">
                <!-- Icon -->
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <!-- Text -->
                <v-list-item-content>
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- Authentication -->
            <template>
                <!-- Loading -->
                <template v-if="user.isLoading()">
                    <v-list-item>
                        <v-skeleton-loader class="skeleton__user" width="100px" type="text" />
                    </v-list-item>
                </template>

                <!-- Logged in -->
                <template v-else-if="user.isSuccess()">
                    <v-list-item>
                        <!-- Icon -->
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>

                        <!-- Text -->
                        <v-list-item-content>
                            <v-list-item-title>{{ user.data.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <!-- Not logged in -->
                <template v-else-if="user.isError()">
                    <v-list-item>
                        <!-- Icon -->
                        <v-list-item-icon>
                            <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>

                        <!-- Text -->
                        <v-list-item-content>
                            <v-list-item-title>Login</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";
import { StoreGetter } from "@/store/decorators/StoreGetter";
import { EchoPromise } from "echofetch";
import { User } from "@/api/models/User";

@Component
export default class NavigationDrawer extends Vue {
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
}
</script>

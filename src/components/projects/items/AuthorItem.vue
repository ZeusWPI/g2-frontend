<template>
    <div>
        <!-- Loading -->
        <template v-if="loading">
            <!-- Show Name -->
            <v-skeleton-loader class="transparent" v-if="showName" type="list-item-avatar" />

            <!-- Just avatar -->
            <v-skeleton-loader class="transparent mr-1" v-else type="avatar" />
        </template>

        <!-- Data -->
        <template v-else>
            <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-row v-on="on" v-bind="attrs" no-gutters>
                        <!-- Show Name -->
                        <template v-if="showName">
                            <v-list-item class="rounded" :href="author.username">
                                <!-- Avatar -->
                                <v-list-item-avatar cols="auto">
                                    <user-avatar :user="author" />
                                </v-list-item-avatar>

                                <!-- Name -->
                                <v-list-item-title cols="auto">
                                    {{ author.name }}
                                </v-list-item-title>
                            </v-list-item>
                        </template>

                        <!-- Otherwise -->
                        <template v-else>
                            <!-- Avatar -->
                            <v-col class="mr-1">
                                <a :href="author.url">
                                    <v-list-item-avatar cols="auto" class="ma-0">
                                        <user-avatar :user="author" />
                                    </v-list-item-avatar>
                                </a>
                            </v-col>
                        </template>
                    </v-row>
                </template>

                <v-card>
                    <v-card-text class="pt-0">
                        <v-row align="center" no-gutters>
                            <v-col cols="auto">
                                <user-avatar :user="author" />
                            </v-col>

                            <v-col>
                                <v-card-title>
                                    {{ author.name }}
                                </v-card-title>

                                <v-card-subtitle>
                                    {{ author.username }}
                                </v-card-subtitle>
                            </v-col>
                        </v-row>

                        {{ author.description }}
                    </v-card-text>
                </v-card>
            </v-menu>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Author } from "@/api/models/Author";
import UserAvatar from "@/components/user/UserAvatar.vue";

@Component({
    components: { UserAvatar }
})
export default class AuthorItem extends Vue {
    /**
     * Author to display.
     */
    @Prop()
    author: Author;

    /**
     * If the component is loading.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Should the name be displayed next to the users avatar.
     */
    @Prop({ default: false })
    showName: boolean;
}
</script>

<style lang="scss" scoped>
.author {
    &__name {
        font-size: 1.2em;
    }
}
</style>

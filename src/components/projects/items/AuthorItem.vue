<template>
    <div>
        <!-- Loading -->
        <template v-if="loading">
            <!-- Show Name -->
            <v-skeleton-loader class="transparent" v-if="showName" type="list-item-avatar" />

            <!-- Just avatar -->
            <v-skeleton-loader class="transparent" v-else type="avatar" />
        </template>

        <!-- Data -->
        <template v-else>
            <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-row align="center" v-on="on" v-bind="attrs">
                        <!-- Avatar -->
                        <v-col cols="auto">
                            <user-avatar :user="author" />
                        </v-col>

                        <!-- Name -->
                        <v-col cols="auto" v-if="showName">
                            <div class="author__name">{{ author.name }}</div>
                        </v-col>
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
                                    bertjen
                                </v-card-subtitle>
                            </v-col>
                        </v-row>

                        Student somewhere over the rainbow in a country far far away.
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

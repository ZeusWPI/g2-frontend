<template>
    <v-avatar :color="!avatarUrl && !loading ? 'red' : ''" :size="size">
        <!-- Loading -->
        <v-skeleton-loader v-if="loading" class="avatar__placeholder" type="avatar" :height="size" :width="size" />

        <!-- Image -->
        <v-img
            ref="avatarImage"
            v-else-if="user && avatarUrl"
            :src="avatarUrl"
            :alt="user.name"
            @error="invalidAvatar = true"
        >
            <template v-slot:placeholder>
                <span class="white--text headline">
                    {{ user.name.toUpperCase().charAt(0) }}
                </span>
            </template>
        </v-img>

        <!-- Default fallback -->
        <span v-else-if="user" class="white--text headline">
            {{ user.name.toUpperCase().charAt(0) }}
        </span>
    </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/api/models/User";

@Component
export default class UserAvatar extends Vue {
    /**
     * User to display.
     */
    @Prop({ default: null })
    user: User;

    /**
     * If the avatar is loading or not.
     */
    @Prop()
    loading: boolean;

    /**
     * If the provided avatar url is invalid.
     */
    invalidAvatar = false;

    /**
     * Size of the avatar.
     */
    @Prop({ default: 32 })
    size: number;

    /**
     * Get the url for the users avatar.
     */
    get avatarUrl(): string {
        // Make sure the avatar image is valid.
        return this.user ? (this.invalidAvatar ? "" : this.user.avatar) : "";
    }
}
</script>

<style lang="scss">
.avatar {
    &__placeholder {
        .v-skeleton-loader__avatar {
            height: 100%;
            width: 100%;
        }
    }
}
</style>

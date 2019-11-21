<template>
    <v-row>
        <!-- Header -->
        <v-col cols="12">
            <v-card>
                <div class="project__header">
                    <div class="project__header__img">
                        <img
                            src="https://zeus.gent//assets/images/Logos_Slotmachiin.svg"
                        />
                    </div>

                    <div class="project__header__content">
                        <h1 style="color: var(--v-primary-base)">G2</h1>
                        <p>
                            Dit is een beschrijving van G2. G2 is een project
                            dat super cool is en hopelijk werkt als we het
                            deployen.
                        </p>
                    </div>
                </div>
            </v-card>
        </v-col>

        <v-col
            class="pl-0 pt-0"
            cols="12"
            md="8"
            :order="$vuetify.breakpoint.smAndDown ? 2 : -1"
        >
            <!-- Issues -->
            <v-col cols="12">
                <v-card>
                    <v-card-title>Issues</v-card-title>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in 10"
                            :key="index"
                            @click="console.log('reee')"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    Dit is een issue
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    https://github.com/zeuswpi/g2-frontend
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-icon>
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-col>

        <v-col
            class="pl-0 pt-0"
            cols="12"
            md="4"
            :order="$vuetify.breakpoint.smAndDown ? 1 : -1"
        >
            <v-row>
                <!-- Information -->
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Information</v-card-title>

                        <v-card-text>
                            <div class="project__information">
                                <ul>
                                    <li><b>Project:</b> G2</li>
                                    <li><b>Repositories:</b> 2</li>
                                    <li><b>Open issues:</b> 2</li>
                                </ul>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <!-- Repositories -->
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Repositories</v-card-title>
                        <v-list>
                            <v-list-item @click="console.log('reee')">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        G2-frontend
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        https://github.com/zeuswpi/g2-frontend
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon>mdi-chevron-right</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.project {
    &__header {
        display: flex;

        &__img {
            height: 150px;

            img {
                height: 100%;
                border-radius: inherit;
            }
        }

        &__content {
            padding: 10px 15px;
        }
    }
}
</style>

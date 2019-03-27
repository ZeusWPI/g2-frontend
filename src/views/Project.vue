<template>
    <v-layout wrap>
        <v-flex xs12 sm8>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Project naam</div>
                        <span class="grey--text">Project subtitle</span>
                    </div>
                </v-card-title>

                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm4>
            <v-card>
                <v-card-title primary-title>
                    <div class="headline">Recente activiteit</div>
                </v-card-title>

                <v-list two-line>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Edited README.md</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">Maartenvn</v-list-tile-sub-title>
                            <v-list-tile-sub-title>Added some more information</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-action-text>15 min</v-list-tile-action-text>
                            <v-icon color="grey lighten-1"></v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Merged "master" and "development"</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">Maartenvn</v-list-tile-sub-title>
                            <v-list-tile-sub-title>More information</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-action-text>20 min</v-list-tile-action-text>
                            <v-icon color="grey lighten-1"></v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex xs12 sm8>
            <v-card>
                <v-card-title primary-title>
                    <div class="headline">Subprojecten</div>
                </v-card-title>

                <v-list two-line>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Subproject</v-list-tile-title>
                            <v-list-tile-sub-title>Added some more information</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon color="grey lighten-1">link</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Subproject</v-list-tile-title>
                            <v-list-tile-sub-title>Added some more information</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon color="grey lighten-1">link</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs12 sm4>
            <v-card>
                <v-card-title primary-title>
                    <div class="headline">Branches</div>
                </v-card-title>

                <v-list two-line>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Master</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon color="grey lighten-1">link</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Development</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon color="grey lighten-1">link</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs12 sm8>
            <v-card>
                <v-card-title primary-title>
                    <v-layout wrap>
                        <v-flex xs12 sm6>
                            <div class="headline">Issues</div>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                                class="project__search"
                                v-model="search"
                                prepend-icon="search"
                                label="Search"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-title>

                <v-list two-line>
                    <v-list-tile avatar ripple @click="true">
                        <v-list-tile-content>
                            <v-list-tile-title>Register gh hooks for simple project data that is always synced.</v-list-tile-title>
                            <v-list-tile-sub-title>sss</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-list-tile-action-text>#17</v-list-tile-action-text>
                            <v-icon color="grey lighten-1">link</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Project",
        data: () => ({
            project: {
                title: "Hello",
                subtitle: "Test"
            }
        })
    };
</script>

<style scoped>
    .project__search {
        margin-top: 0px;
        padding-top: 0px;
    }
</style>


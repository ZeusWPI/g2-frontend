<template>
    <v-layout wrap>
        <v-flex md12 lg8>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline">Welkom bij G2.</h3>
                    </div>
                </v-card-title>

                <v-card-text>
                    <h3>Wat is G2?</h3>
                    <p>
                        Een banaan is een langwerpige, licht gebogen vrucht, die afkomstig is van de bananenplant. In Suriname spreekt men van bacove als het om de vrucht gaat die rechtstreeks uit de schil gegeten kan worden en van banaan als het om groene bakbananen gaat. In Indische gerechten wordt de banaan meestal pisang genoemd, het Maleise woord voor de vrucht. Ook in het Afrikaans kent men dat woord, maar dan gespeld als piesang.
                        Een bananenplant of bananenboom is in werkelijkheid een kruid, 's werelds grootste kruid (kruidachtige). Volgens de tuinbouwkundige definitie wordt de banaan echter tot de groenten gerekend. Volgens de culinaire definitie is het echter een vrucht, omdat de banaan als nagerecht dan wel als tussendoortje wordt gegeten.
                    </p>

                    <h3>Wat is G2?</h3>

                    <p>
                        Een banaan is een langwerpige, licht gebogen vrucht, die afkomstig is van de bananenplant. In Suriname spreekt men van bacove als het om de vrucht gaat die rechtstreeks uit de schil gegeten kan worden en van banaan als het om groene bakbananen gaat. In Indische gerechten wordt de banaan meestal pisang genoemd, het Maleise woord voor de vrucht. Ook in het Afrikaans kent men dat woord, maar dan gespeld als piesang.
                        Een bananenplant of bananenboom is in werkelijkheid een kruid, 's werelds grootste kruid (kruidachtige). Volgens de tuinbouwkundige definitie wordt de banaan echter tot de groenten gerekend. Volgens de culinaire definitie is het echter een vrucht, omdat de banaan als nagerecht dan wel als tussendoortje wordt gegeten.
                    </p>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex md12 lg4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline">Recente projecten</h3>
                    </div>
                </v-card-title>

                <v-card-text>
                    <v-list two-line>
                        <template v-for="(item, index) in items">
                            <v-list-tile :key="index" avatar ripple>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn flat color="primary">Naar project</v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                        </template>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        "title": "Test",
                        "subtitle": "Testing"
                    },
                    {
                        "title": "Test 2",
                        "subtitle": "Testing"
                    }
                ]
            }
        }
    };
</script>


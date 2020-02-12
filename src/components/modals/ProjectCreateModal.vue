<template>
    <div>
        <v-progress-linear v-if="loading" indeterminate height="6" />

        <v-card-text>
            <v-form>
                <!-- Name -->
                <v-text-field
                    v-model="fields.name.value"
                    :rules="fields.name.rules"
                    :error-messages="fields.name.error"
                    label="Naam"
                    placeholder="Naam van het project"
                    outlined
                    required
                />

                <!-- Description -->
                <v-text-field
                    v-model="fields.description.value"
                    :rules="fields.description.rules"
                    :error-messages="fields.description.error"
                    label="Beschrijving"
                    placeholder="Beschrijving van het project"
                    outlined
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <v-btn @click="close" text color="red">Sluiten</v-btn>
            <v-btn @click="create" text color="primary">Aanmaken</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import Config from "@/config";
import { fetch } from "@/util/fetch";
import Project from "../../data/models/Project";
import { createProject } from "../../data/project";

export default {
    name: "ProjectCreateModal",

    data: function() {
        return {
            loading: false,
            fields: {
                name: {
                    value: "",
                    rules: [],
                    error: ""
                },

                description: {
                    value: "",
                    rules: [],
                    error: ""
                }
            }
        };
    },

    methods: {
        close() {
            this.$store.dispatch("modal/close");
        },

        create() {
            this.loading = true;

            createProject({
                name: this.fields.name.value,
                description: this.fields.description.value
            })
                .then(
                    response => {
                        this.$store.dispatch("modal/close");

                        this.$store.dispatch("snackbar/open", {
                            message: "Project is succesvol aangemaakt!",
                            color: "success"
                        });

                        this.$router.push(`/project/${response.id}`);
                    },

                    error => {
                        this.$store.dispatch("snackbar/open", {
                            message: error,
                            color: "error"
                        });
                    }
                )
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

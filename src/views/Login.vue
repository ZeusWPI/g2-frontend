<template>
    <v-layout wrap justify-center>
        <v-flex xs12 md6>
            <v-card>
                <v-toolbar color="primary" flat>
                    <v-toolbar-title class="login__title">Login</v-toolbar-title>
                </v-toolbar>

                <v-card-text>

                    <p class="login__explain">
                        Please login using your Zeus WPI credentials.
                    </p>

                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="username"
                            prepend-icon="person"
                            label="Username"
                            :rules="usernameRules"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            prepend-icon="lock"
                            label="Password"
                            :type="'password'"
                            :rules="passwordRules"
                            required
                        ></v-text-field>

                        <v-card-actions class="login__buttons">
                            <v-btn color="primary" @click="validate">Login</v-btn>
                            <v-btn>Registreer</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "login",
        data: () => ({
            valid: true,
            username: "",
            password: "",

            usernameRules: [v => !!v || "Username is required"],

            passwordRules: [v => !!v || "Password is required"]
        }),
        methods: {
            validate() {

                // Use internal validation before sending any requests to the server.
                // WARNING: do not see this as valid security, users can alter JS at any time.
                if(!this.$refs.form.validate()) {
                    return;
                }

                console.log("LOGGING IN...");
            }
        }
    };
</script>

<style scoped>

    .login__title {
        color: white;
    }

    .login__explain {
        text-align: center;
        color: #9e9e9e;
    }

    .login__buttons {
        margin-top: 20px;
    }
</style>


<template>
    <div>
        <v-card-title>
            Sub projects

            <v-chip class="ml-2" small>
                1
            </v-chip>
        </v-card-title>

        <v-list flat color="transparent">
            <v-list-item>
                <v-list-item-avatar>
                    <img src="https://zeus.gent/assets/images/Logos_Tab.svg" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>
                        Some subproject
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        Some description about a subproject
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { Project } from "@/api/models/Project";

@Component
export default class ProjectSubprojects extends Vue {
    /**
     * List with subprojects.
     */
    @Prop()
    subprojects: EchoPromise<Project[]>;
}
</script>

<template>
    <div>
        <!-- Actions -->
        <v-row justify="space-between">
            <v-col>
                <v-text-field v-model="tableSearch" label="Search for a repository" outlined dense />
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed @click="openEdit">
                    <v-icon left>
                        mdi-pencil
                    </v-icon>

                    Edit
                </v-btn>
            </v-col>
        </v-row>

        <!-- Repositories -->
        <v-card outlined>
            <v-data-table
                :items="repositories"
                :headers="tableHeaders"
                :search="tableSearch"
                :items-per-page="25"
                mobile-breakpoint="0"
                @click:row="openRepository"
            >
                <template v-slot:item.name="{ item }">
                    <div class="repository" v-ripple>
                        <!-- Title -->
                        <div class="repository__name">
                            {{ item.name }}
                        </div>

                        <!-- Description -->
                        <div class="text--secondary">
                            {{ item.description }}
                        </div>
                    </div>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/api/models/Project";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { Repository } from "@/api/models/Repository";

@Component
export default class ProjectRepositories extends Vue {
    /**
     * Project to display.
     */
    @Prop()
    project: Project;

    /**
     * Table search value.
     */
    tableSearch = "";

    /**
     * Table headers.
     */
    tableHeaders = [
        {
            text: "Repository",
            value: "name"
        }
    ];

    /**
     * Temporary fake data with repositories.
     */
    repositories = [
        {
            name: "Tab",
            description: ":moneybag: Yes. We have to drink. But we also have to pay. This does the paying part.",
            url: "https://github.com/zeuswpi/tab"
        },

        {
            name: "helios-server",
            description: "Helios server",
            url: "https://github.com/zeuswpi/helios-server"
        }
    ];

    /**
     * Edit the linked repositories of the project.
     */
    openEdit() {
        ModalHandler.open({
            component: () => import("./modals/ProjectRepositoriesModal.vue"),
            componentPayload: {
                project: this.project
            },
            fullscreen: true,
            transition: "dialog-bottom-transition"
        });
    }

    /**
     * Open the selected repository.
     * @param repository Repository to open.
     */
    openRepository(repository: Repository) {
        window.open(repository.url, "_blank");
    }
}
</script>

<style lang="scss" scoped>
.repository {
    padding: 12px 0;
    cursor: pointer;

    &__name {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0;
    }
}
</style>

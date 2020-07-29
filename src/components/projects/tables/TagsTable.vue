<template>
    <v-card outlined>
        <v-data-table :headers="tableHeaders" :items="tags">
            <!-- Tag -->
            <template v-slot:item.tag="{ item }">
                <project-tag :tag="item" :show-padding="false" />
            </template>

            <!-- Actions -->
            <template v-slot:item.actions="{ item }">
                <!-- Modify -->
                <v-btn color="info" icon>
                    <v-icon>
                        mdi-pencil
                    </v-icon>
                </v-btn>

                <!-- Delete -->
                <v-btn color="error" icon @click="deleteTag(item)">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>

            <!-- No Data -->
            <template v-slot:no-data>
                <v-icon class="my-3 text--secondary" size="70">mdi-tag</v-icon>

                <h2>{{ t("tags.empty.title") }}</h2>

                <p>{{ t("tags.empty.desc") }}</p>
            </template>

            <!-- No matched data -->
            <template v-slot:no-results>
                <v-icon class="my-3 text--secondary" size="70">mdi-tag</v-icon>

                <h2>{{ t("tags.unmatched.title") }}</h2>

                <p>{{ t("tags.unmatched.desc") }}</p>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { Tag } from "@/api/models/Tag";
import { ModalHandler } from "@/util/modal/ModalHandler";
import { ConfirmModalModifications } from "@/components/layout/modals/confirm/ConfirmModalModifications";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { ArrayUtil } from "@/util/ArrayUtil";
import Tags from "@/views/Tags.vue";
import ProjectTag from "@/components/projects/ProjectTag.vue";
import ConfirmModal from "@/components/layout/modals/confirm/ConfirmModal.vue";
import TagService from "@/api/services/TagService";

@Component({
    components: { ProjectTag }
})
export default class TagsTable extends Vue {
    /**
     * List with available tags.
     */
    @Prop({ required: true })
    tags: Tags[];

    /**
     * Table search value.
     */
    @PropSync("search")
    tableSearch: string;

    /**
     * Table headers.
     */
    tableHeaders = [
        {
            text: "Tag",
            value: "tag"
        },

        {
            value: "actions",
            align: "end"
        }
    ];

    /**
     * Delete a given tag.
     * @param tag Tag to delete.
     */
    deleteTag(tag: Tag) {
        ModalHandler.open({
            component: ConfirmModal,
            componentPayload: {
                message: this.t("tags.delete"),
                action: (mod: ConfirmModalModifications) => {
                    mod.loading = true;

                    TagService.delete(tag.id)
                        .then(() => {
                            ArrayUtil.delete(this.tags, tag);
                            ModalHandler.close();
                        })
                        .catch(error => {
                            ErrorHandler.handle(error, { style: "SNACKBAR" });
                        })
                        .finally(() => {
                            mod.loading = false;
                        });
                }
            }
        });
    }
}
</script>

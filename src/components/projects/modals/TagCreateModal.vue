<template>
    <tag-modify-modal />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TagModifyModal from "@/components/projects/modals/TagModifyModal.vue";

@Component({
    components: { TagModifyModal }
})
export default class TagCreateModal extends Vue {}
</script>

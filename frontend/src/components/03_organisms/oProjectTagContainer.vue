<template>
  <div class="project-tag-container" :class="addClass">
    <mProjectTag 
      v-for="element in projects" 
      :key="element.id"
      :project="element"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import mProjectTag from "@/components/02_molecules/mProjectTag.vue";

@Component({
  components: {
    mProjectTag
  }
})
export default class oProjectTagContainer extends Vue{
  @Prop() private projects!: object[];
  @Prop() private addClass?: string;
}
</script>

<style scoped>
.project-tag-container.library-content-btm {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 15px;
}

.project-tag-container.user-contributions {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 15px;
}
</style>
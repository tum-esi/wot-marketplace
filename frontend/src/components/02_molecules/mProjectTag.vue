<template>
  <aNavLink>
    <aLabel :addDesc="project.summary">{{ project.title }}</aLabel>
  </aNavLink>
  <div>
    <p>{{ project.platform }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aNavLink from "@/components/02_molecules/mProjectItem.vue";
import aLabel from "@/components/01_atoms/aLabel.vue";

@Component({
  components: {
    aNavLink,
    aLabel
  }
})
export default class aProjectItem extends Vue {
  @Prop() private project!: object;
  @Prop() private addClass?: string;
}
</script>

<style scoped>

</style>
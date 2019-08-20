<template>
  <aNavLink
    :to="{ name: 'Project', params: { name: project.title }}"
    addClass="project-tag"
    :class="project.projectType.toLowerCase()"
  >
    <aLabel :addDesc="project.summary" addClass="project-tag-top">{{ project.title }}</aLabel>
    <div class="project-tag-bottom" :class="project.projectType.toLowerCase()">
      <p class="project-tag">{{ project.projectType }}</p>
    </div>
  </aNavLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aNavLink from "@/components/01_atoms/aNavLink.vue";
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
.project-tag-bottom {
  height: 30%;
}

.project-tag p {
  margin: 0;
  padding: 8px 20px;
  color: white;
}

div.project-tag-bottom.code {
  background-color: #116b5e;
}

div.project-tag-bottom.td {
  background-color: #b85730;
}
</style>
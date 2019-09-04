<template>
  <aNavLink
    :to="{ path: `/library/${project.title}/general` }"
    addClass="project-tag"
    :class="project.type.toLowerCase()"
  >
    <aLabel :addDesc="project.summary" addClass="project-tag-top">{{ project.title }}</aLabel>
    <div class="project-tag-bottom" :class="project.type.toLowerCase()">
      <p class="project-tag">{{ project.type }}</p>
      <aInput 
        v-model="project.avg_rating"
        inputType="rating"
        :isDisabled="true"
        addClass="project-rating"
      />
    </div>
  </aNavLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aNavLink from "@/components/01_atoms/aNavLink.vue";
import aLabel from "@/components/01_atoms/aLabel.vue";
import aInput from "@/components/01_atoms/aInput.vue";

@Component({
  components: {
    aNavLink,
    aLabel,
    aInput
  }
})
export default class aProjectItem extends Vue {
  @Prop() private project!: object;
  @Prop() private addClass?: string;
}
</script>

<style scoped>
.project-tag-bottom {
  position: relative;
  height: 30%;
}

.project-tag p {
  margin: 0;
  padding: 8px 20px;
  color: white;
}

.project-rating {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.2vw 0.5vw;
}

div.project-tag-bottom.code {
  background-color: #116b5e;
}

div.project-tag-bottom.td {
  background-color: #b85730;
}
</style>
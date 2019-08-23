<template>
  <div class="page-navigator" :class="addClass">
    <aButton
      btnEvent="previous-page"
      @previous-page="getPage(currentPage-1)"
      :isDisabled="currentPage === 1"
      addClass="page-navigator"
    ><<</aButton>
    <p class="page-navigator">{{ currentPage }} of {{ totalPages }} pages</p>
    <aButton
      btnEvent="next-page"
      @next-page="getPage(currentPage+1)"
      :isDisabled="currentPage === totalPages"
      addClass="page-navigator"
    >>></aButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aButton from "@/components/01_atoms/aButton.vue";

@Component({
  components: {
    aButton
  }
})
export default class mPageNavigator extends Vue {
  @Prop() private currentPage!: number;
  @Prop() private totalPages!: number;
  @Prop() private getPage!: (page: number) => void;
  @Prop() private addClass?: string;
}
</script>

<style scoped>
p.page-navigator {
  display: inline-block;
  margin: 0 10px;
}

div.page-navigator {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 20px;
}
</style>
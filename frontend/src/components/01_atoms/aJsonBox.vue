<template>
  <div class="json-container">
    <VueJsonPretty
      :data="jsonContent"
      :showDoubleQuotes="true"
      :showLine="true"
      :showLength="true"
      :highlightMouseoverNode="true"
    ></VueJsonPretty>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueJsonPretty from "vue-json-pretty";

@Component({
  components: {
    VueJsonPretty
  }
})
export default class aJsonBox extends Vue {
  @Prop() private jsonContent!: Object;
}
</script>

<style scoped>
.code-container {
  word-wrap: normal;
  padding: 5px 10px;
  color: #222;
  background: #fff;
}
</style>
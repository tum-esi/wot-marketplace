<template>
  <div class="json-container">
    <VueJsonPretty
      :data="content"
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
  @Prop() private content!: Object;
}
</script>

<style scoped>
.json-container {
  word-wrap: normal;
  padding: 5px 10px;
  color: #222;
  background: #fff;
  border: none;
  border: 2px solid black;
  border-top: none;
}
</style>
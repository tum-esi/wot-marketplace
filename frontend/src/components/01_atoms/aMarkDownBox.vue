<template>
  <div class="markdown-container">
    <div v-html="compiledMarkdown" class="markdown-body"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Showdown from "showdown";

let md = new Showdown.Converter({
  simpleLineBreaks: true,
  ghCompatibleHeaderId: true
});

export default Vue.extend({
  el: "#editor",
  props: {
    input: {
      default: undefined,
      required: false
    }
  },
  computed: {
    compiledMarkdown: function () {
      let input = this.input || " ";
      let html = md.makeHtml(input);
      return html
    }
  }
})
</script>

<style scoped>
.markdown-container {
  padding: 5px 10px;
  background: #fff;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 15px;
}
</style>

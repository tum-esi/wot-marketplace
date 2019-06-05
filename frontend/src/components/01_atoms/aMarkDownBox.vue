<template>
  <div class="markdown-container">
  <div id="editor">
    <div v-html="compiledMarkdown"></div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Marked from "marked";
import Lodash from "lodash";

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
      return Marked(input, { 
        sanitize: true,
        breaks: true
      })
    }
  },
  watch: {
    input: function() {
      Lodash.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }
})
</script>

<style scoped>
.markdown-container {
  padding: 5px 10px;
  background: #fff;
}
</style>

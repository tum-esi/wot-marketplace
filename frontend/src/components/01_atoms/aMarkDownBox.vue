<template>
  <div class="markdown-container">
  <div>
    <markdown-it-vue class="md-body" :content="markDown"/>
  </div>
  </div>
</template>

<script lang="ts">
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import Vue from "vue";

export default Vue.extend({
  name: "aMarkDownBox",
  components: {
    MarkdownItVue
  },
  props: {
    markDown: {
      required: false,
      default: ""
    }
  }
});
</script>

<style scoped>
.markdown-container {
  padding: 5px 10px;
  background: #fff;
}
</style>

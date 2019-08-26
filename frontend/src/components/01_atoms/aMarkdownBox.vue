<template>
  <div class="markdown-container">
    <div v-html="compiledMarkdown" class="markdown-body"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import showdown from 'showdown';

let md = new showdown.Converter({
  simpleLineBreaks: true,
  ghCompatibleHeaderId: true
})

@Component
export default class aMarkdownBox extends Vue {
  @Prop() private content!: string;

  get compiledMarkdown() {
    return md.makeHtml(this.content);
  }
}
</script>

<style scoped>
.markdown-container {
  padding: 5px 10px;
  background: #fff;
  border: 2px solid black;
  border-top: none;
  border-radius: 0 0 10px 10px;
}

.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 15px;
}
</style>
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
  @Prop() private content!: Object;
}
</script>
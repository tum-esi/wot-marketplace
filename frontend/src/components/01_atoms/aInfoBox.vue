<template>
  <div class="infobox-container">
    <h3 class="infobox-header">{{ title }}</h3>
    <div v-for="element in content" :key="element.id" class="infobox-element">
      <label v-if="element.label" class="infobox-element-label">{{ element.label }}</label>
      <p v-if="element.type === 'text'" class="infobox-element-text">{{ element.content }}</p>
      <a
        v-else-if="element.type === 'link'"
        :href="element.content.url"
        target="_blank"
      >{{ element.content.label }}</a>
      <ul v-else-if="element.type === 'list'" class="infobox-element-list">
        <li
          v-for="tagElem in element.content"
          :key="tagElem.id"
          class="infobox-element-list-item"
        >{{ tagElem }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class aInfoBox extends Vue {
  @Prop() title!: string;
  @Prop() content!: any;
  @Prop() addClass?: string;
}
</script>

<style scoped>
.infobox-container {
  width: 100%;
  padding: 1vw;
  background: white;
  border: 1px solid lightgray;
}

.infobox-header {
  margin: 0;
}

.infobox-element {
  min-height: 2em;
}

.infobox-element-label {
  display: inline-block;
  margin: 0 10px;
}

.infobox-element-text {
  display: inline-block;
  margin: 0 10px;
}

.infobox-element-list {
  display: inline-block;
  list-style-type: none;
  margin: 0px;
  padding: 2px 4px;
}

.infobox-element-list-item {
  display: inline-block;
  padding: 0 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  margin: 3px 3px 3px 1px;
  cursor: default;
  font-size: 14px;
}
</style>
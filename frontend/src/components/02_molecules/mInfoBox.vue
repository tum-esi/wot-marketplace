<template>
  <div class="infobox-container">
    <h4 class="infobox-title">{{ title }}</h4>
    <div v-for="(element, index) in content" :key="index">
      <label v-if="element.title" class="info-el-label">{{ element.title }}</label>
      <label v-if="element.type === 'text'" class="info-el-content-text">{{ element.content }}</label>
      <a
        v-else-if="element.type === 'link'"
        class="info-el-content-link"
        target="_blank"
        :href="element.content.link"
      >{{ element.content.label}}</a>
      <div
        v-else-if="element.type === 'list'"
        class="info-el-content-list info-el-content-text"
        v-for="(listElement, listIndex) in element.content"
        v-bind:key="listIndex"
      >{{ listElement }}</div>
      <ul v-else-if="element.type === 'tag'" class="info-el-content-tags">
        <li
          v-for="(tagElement, tagIndex) in element.content"
          :key="tagIndex"
          class="tag"
        >{{ tagElement }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "mInfoBox",
  props: {
    /**
     * Title label for the info box.
     */
    title: {
      type: String,
      required: true,
      default: ""
    },
    /**
     * Content for the infobox.
     * Title: title label for the info element.
     * Type: can be either text | list | link | tag,
     * Content: can be string, list of strings, or Object for links.
     */
    content: {}
    // content: {
    //   type: Array as () => Array<{
    //     title?: string;
    //     type: string;
    //     content: string | Array<string> | { link: string; label: string };
    //   }>,
    //   required: true
    // }
  }
});
</script>

<style scoped>
.infobox-container {
  font-size: 0.9em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.infobox-title {
  margin: auto;
  font-size: 1.25em;
  font-weight: normal;
}

.info-el-label {
  margin-left: 10px;
  font-size: 14px;
}

.info-el-content-text {
  margin-left: 10px;
  font-size: 14px;
}

.info-el-content-link {
  display: inline-block;
  padding: 3px 5px 3px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  margin: 3px 3px 3px 1px;
  cursor: default;
  font-size: 14px;
}

.info-el-content-list {
  display: inline-block;
}

.info-el-content-tags {
  display: inline;
  list-style-type: none;
  margin: 0px;
  padding: 2px 4px;
}

.tag {
  display: inline-block;
  padding: 0 5px 0 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  margin: 3px 3px 3px 1px;
  cursor: default;
  font-size: 14px;
}
</style>

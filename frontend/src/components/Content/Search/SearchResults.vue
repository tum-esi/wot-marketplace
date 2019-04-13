<template>
  <div id="search-results">
    <div class="project-item" v-for="project in projects" v-bind:key="project.name">
      <ProjectItem
        v-bind:project="project"
        v-on:project-item-clicked="$emit('project-item-clicked', project)"
      />
    </div>
  </div>
</template>

<script>
import ProjectItem from "./ProjectItem.vue";

export default {
  name: "SearchResults",
  components: {
    ProjectItem
  },
  props: ["projects"]
};
</script>

<style scoped>
#search-results {
  padding: 10px 20px 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>



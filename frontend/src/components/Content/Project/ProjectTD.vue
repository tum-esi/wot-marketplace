<template>
  <div class="project-td-container">
    <code>{{projectTD}}</code>
  </div>
</template>

<script>
export default {
  name: "ProjectTD",
  props: ["projectTD"]
};
</script>

<style scoped>
.project-td-container {
  word-wrap: normal;
  padding: 5px 10px;
  color: #222;
}

.project-td-container code {
  overflow: auto;
  tab-size: 4;
}
</style>

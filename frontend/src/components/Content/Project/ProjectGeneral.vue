<template>
  <div class="project-general-container">{{projectGeneral}}</div>
</template>

<script>
export default {
  name: "ProjectGeneral",
  props: ["projectGeneral"]
};
</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

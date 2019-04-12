<template>
  <div>
    <div class="info-container">
      <h4>General Info</h4>
      <div class="info-el">Type: {{projectInfo.implementationType}}</div>
      <div class="info-el">Topic: {{projectInfo.topic}}</div>
      <div class="info-el">Platform: {{projectInfo.platform}}</div>
      <div class="info-el">Complexity: {{projectInfo.complexity}}</div>
      <div class="info-el">
        <a target="_blank" v-bind:href="`${projectInfo.github}`">View on Github</a>
      </div>
    </div>
    <div class="info-container">
      <h4>Keywords</h4>
      <ul class="info-tags">
        <li class="info-tag" v-for="tag in projectInfo.tags" v-bind:key="tag">{{tag}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectInfobox",
  props: ["projectInfo"]
};
</script>

<style scoped>
.info-container {
  font-size: 0.9em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.info-container h4 {
  margin: auto;
  font-size: 1.25em;
  font-weight: normal;
}

.info-el {
  margin-left: 10px;
  font-size: 14px;
}

.info-tags {
  list-style-type: none;
  margin: 0px;
  padding: 2px 4px;
}
.info-tag {
  display: inline-block;
  padding: 3px 5px 3px 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #f5f5f5;
  margin: 3px 3px 3px 1px;
  cursor: default;
  font-size: 14px;
}
</style>



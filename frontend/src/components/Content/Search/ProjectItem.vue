<template>
  <div class="project-item-container" @click="$emit('project-item-clicked', project.artistId)">
    <div class="project-item project-item-top">
      <p class="project-item-title">{{project.artistName}}</p>
      <p class="project-item-description">{{project.artistViewUrl}}</p>
    </div>
    <div>
      <p class="project-item project-item-bottom">{{project.artistId}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",
  props: ["project"],
  data() {
    return {
        color: ''
    };
  },
  created() {
    switch (this.project.platform) {
      case "raspberry":
        this.color = "red";
        break;
      case "arduino":
        this.color = "blue";
        break;
      case "esp":
        this, (color = "green");
        break;
      case "other":
      default:
        this.color = "grey";
    }
    console.log('color: ', this.color);
  }
};
</script>

<style scoped>
.project-item-container {
  color: black;
  margin: 10px;
  border-radius: 5px;
}

.project-item-container:hover {
  cursor: pointer;
}

.project-item {
  padding: 10px;
}

.project-item-top {
  border: 3px solid black;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}

.project-item-bottom {
  background-color: grey;
  border-radius: 0 0 5px 5px;
}

.project-item-title {
  font-weight: bold;
}

.project-item-description {
  color: grey;
}
</style>



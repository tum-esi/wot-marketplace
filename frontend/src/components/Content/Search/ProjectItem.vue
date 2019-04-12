<template>
  <div class="project-item-container" @click="$emit('project-item-clicked', project.artistId)">
    <div :class="`${color}-top`" class="project-item project-item-top">
      <p class="project-item-title">{{project.artistName}}</p>
      <p class="project-item-description">{{project.artistViewUrl}}</p>
    </div>
    <div>
      <p :class="`${color}-bottom`" class="project-item project-item-bottom">{{project.artistId}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",
  props: ["project"],
  data() {
    return {
      color: ""
    };
  },
  created() {
    switch (this.project.implementationType) {
      case "template":
        this.color = "colorOne";
        break;
      case "code":
        this.color = "colorTwo";
        break;
      default:
        this.color = "default";
        break;
    }

    //FIXME: Delete this when correct API is connected
    if (this.project.primaryGenreName === "Rock") this.color = "red";
    if (this.project.primaryGenreName === "K-Pop") this.color = "blue";
    // ====
  }
};
</script>

<style scoped>
.project-item-container {
  color: black;
  border-radius: 5px;
  height: 100%;
}

.project-item-container:hover {
  cursor: pointer;
}

.project-item {
  padding: 10px;
}

.project-item-top {
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  height: 60%;
}

.project-item-bottom {
  border-radius: 0 0 5px 5px;
  height: 100%;
}

.project-item-title {
  font-weight: bold;
}

.project-item-description {
  color: grey;
}

.default-top {
  border: 3px solid grey;
}

.default-bottom {
  background-color: grey;
}

.red-top {
  border: 3px solid red;
}

.red-bottom {
  background-color: red;
}

.blue-top {
  border: 3px solid blue;
}

.blue-bottom {
  background-color: blue;
}
</style>



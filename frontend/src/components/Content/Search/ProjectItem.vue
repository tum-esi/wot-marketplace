<template>
  <div class="project-item-container" @click="$emit('project-item-clicked', project.name)">
    <div :class="`${color}-top`" class="project-item project-item-top">
      <p class="project-item-title">{{project.name}}</p>
      <p class="project-item-description">{{project.shortDescription}}</p>
    </div>
    <div>
      <p :class="`${color}-bottom`" class="project-item project-item-bottom">{{project.platform}}</p>
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
  height: 70%;
}

.project-item-bottom {
  border-radius: 0 0 5px 5px;
  height: 30%;
  color: #fff;
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

.colorOne-top {
  border: 3px solid #B85730;
}

.colorOne-bottom {
  background-color: #B85730;
}

.colorTwo-top {
  border: 3px solid #116B5E;
}

.colorTwo-bottom {
  background-color: #116B5E;
}
</style>



<template>
  <div class="project-item-container" @click="onClick">
    <div class="project-item-top" :class="getColor('top')">
      <label class="project-item-title">{{ projectName }}</label>
      <p class="project-item-description">{{ projectShortDescription }}</p>
    </div>
    <div class="project-item-bottom" :class="getColor('bottom')">
      <label class="project-item-platform">{{ projectPlatform }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

/**
 * Search result boxes, show a title, the short descroption and a specific color.
 */

export default Vue.extend({
  name: "mProjectItem",
  props: {
    /**
     * Headline of the project box.
     */
    projectName: {
      type: String,
      required: true
    },
    /**
     * Will be shown below the project name if available.
     */
    projectShortDescription: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * Will be shown on the bottom.
     */
    projectPlatform: {
      type: String,
      required: true
      //   validator: (value: string) =>
      // ["arduino", "raspberry"].indexOf(value) !== -1
    },
    /**
     * Implementation type, needed for preview color.
     */
    projectImplementationType: {
      type: String,
      required: true
      //   validator: (value: string) => ["template", "code"].indexOf(value) !== -1
    }, 
    /**
     * 
     */
    projectOnClick: {
        type: String, 
        required: true
    }
  },
  computed: {

  },
  methods: {
     getColor(section) {
      let color = "";
      switch (this.projectImplementationType) {
        case "template":
          color = "colorOne";
          break;
        case "code":
          color = "colorTwo";
          break;
        default:
          color = "default";
          break;
      }
      return `${color}-${section}`;
    },
    onClick() {
      if (this.projectOnClick && this.projectName) {
        this.$emit(this.projectOnClick, this.projectName);
      }
    }
  }
});
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
  padding: 10px;
}

.project-item-bottom {
  border-radius: 0 0 5px 5px;
  height: 30%;
  color: #fff;
}

.project-item-title {
  font-weight: bold;
}

.project-item-title:hover {
  cursor: pointer;
}

.project-item-description {
  color: grey;
}

.project-item-platform {
    padding: 10px;
}

.default-top {
  border: 3px solid grey;
}

.default-bottom {
  background-color: grey;
}

.colorOne-top {
  border: 3px solid #b85730;
}

.colorOne-bottom {
  background-color: #b85730;
}

.colorTwo-top {
  border: 3px solid #116b5e;
}

.colorTwo-bottom {
  background-color: #116b5e;
}
</style>



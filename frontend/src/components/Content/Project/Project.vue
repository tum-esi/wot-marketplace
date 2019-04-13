<template>
  <div class="project">
    <div>
      <h1 class="project-title">{{prName}}</h1>
      <p class="project-short-description">{{prShortDescr}}</p>
      <div class="project-content-left">
        <div class="project-content-left-container">
          <ProjectGeneral
            :class="{invisible:buttons.btnG != selected}"
            v-bind:projectGeneral="prLongDescr"
          />
          <ProjectTD :class="{invisible:buttons.btnT != selected}" v-bind:projectTD="prTD"/>
        </div>
        <div class="project-content-left-btns">
          <a
            href="#"
            class="left"
            id="btn-general"
            :class="{active:buttons.btnG == selected}"
            @click="selected = buttons.btnG"
          >General</a>
          <a
            href="#"
            class="middle"
            id="btn-td"
            :class="{active:buttons.btnT == selected}"
            @click="selected = buttons.btnT"
          >Thing Description</a>
        </div>
      </div>
    </div>
    <div class="project-content-right">
      <ProjectInfobox v-bind:projectInfo="prInfo"/>
    </div>
  </div>
</template>

<script>
import ProjectInfobox from "./ProjectInfobox.vue";
import ProjectGeneral from "./ProjectGeneral.vue";
import ProjectTD from "./ProjectTD.vue";

export default {
  name: "Project",
  components: {
    ProjectInfobox,
    ProjectGeneral,
    ProjectTD
  },
  props: ["project"],
  data() {
    return {
      buttons: { btnG: "btn-general", btnT: "btn-td" },
      selected: undefined,

      // Project properties
      prName: "",
      prShortDescr: "",
      prLongDescr: "",
      prTD: "",
      prInfo: {
        implType: "",
        platform: "",
        complexity: "",
        topic: "",
        tags: "",
        url: ""
      }
    };
  },
  created() {
    this.selected = this.buttons.btnG;
    if(!this.project) return;
    //TODO: Get data from data store
    if (this.project.clickedProject) {
        this.prName = this.project.clickedProject.name;
        this.prShortDescr = this.project.clickedProject.shortDescription;
        this.prLongDescr = this.project.clickedProject.longDescription;
        this.prTD = this.project.clickedProject.td;
        this.prInfo.implType = this.project.clickedProject.implementationType;
        this.prInfo.platform = this.project.clickedProject.platform;
        this.prInfo.complexity = this.project.clickedProject.complexity;
        this.prInfo.topic = this.project.clickedProject.topic;
        this.prInfo.url = this.project.clickedProject.github;
        this.prInfo.tags = this.project.clickedProject.tags;
    }
    if (this.project.newProject) {
        this.prName = this.project.newProject.title;
        this.prShortDescr = this.project.newProject.shortDescription;
        this.prLongDescr = this.project.newProject.longDescription;
        this.prInfo.topic = this.project.newProject.topic;
        this.prInfo.tags =  this.project.newProject.tags;
    }
  }
};
</script>

<style scoped>
.project {
  width: 75%;
  margin: 0 auto;
}

.project-content-left {
  width: 75%;
  float: left;
  padding-top: 10px;
  position: relative;
}

.project-content-right {
  width: 25%;
  float: left;
  padding: 10px 0 10px 10px;
}

.project-content-left-container {
  width: 100%;
  min-height: 500px;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 3px;
  display: inline-block;
  padding: 40px 0 0 0;
  position: relative;
  /* display:none; */
}

.project-content-left-btns {
  position: absolute;
  top: 0;
  height: 40px;
  width: 100%;
  text-align: left;
  margin: 11px 2px 0 0;
  border-bottom: 1px solid #ccc;
}

.project-content-left-btns a.active {
  background: #ccc;
}

.project-content-left-btns a {
  background: #fff;
  padding: 10px;
  height: 100%;
  text-align: center;
  color: #000;
  font-size: 1.25em;
  display: inline-block;
}

.project-content-left-btns a:hover {
  background: #999;
  border-color: #999;
  outline: none;
}

.project-content-left-btns .left {
  border-top-left-radius: 3px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.project-content-left-btns .middle {
  border-right: 1px solid #ccc;
}

.project-content-right-btns .right {
  border-top-right-radius: 3px;
  border-right: 1px solid #ccc;
}

.project-title {
  border-bottom: 2px solid #000;
  font-weight: normal;
  padding-bottom: 10px;
  margin: 10px 0 10px 0;
}

.project-short-description {
  font-size: 20px;
  font-weight: normal;
}
</style>



<template>
  <div class="project">
    <div>
      <h1 class="project-title">{{name}}</h1>
      <p class="project-short-description">{{description}}</p>
      <div class="project-content-left">
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
        <div class="project-content-left-container">
          <aMarkDownBox :class="{invisible:buttons.btnG != selected}" :markDown="markdown"/>
          <aCodeBox :class="{invisible:buttons.btnT != selected}" :code="thingDescription"/>
        </div>
      </div>
    </div>
    <div class="project-content-right">
      <mInfoBox :title="'General Information'" :content="info"/>
      <mInfoBox v-if="keywords[0].content" :title="'Keywords'" :content="keywords"/>
    </div>
  </div>
</template>

<script>
import aCodeBox from "@/components/01_atoms/aCodeBox.vue";
import aMarkDownBox from "@/components/01_atoms/aMarkDownBox.vue";
import mInfoBox from "@/components/02_molecules/mInfoBox.vue";
import { mapActions } from "vuex";

export default {
  name: "Project",
  components: {
    aCodeBox,
    aMarkDownBox,
    mInfoBox
  },
  data() {
    return {
      buttons: { btnG: "btn-general", btnT: "btn-td" },
      selected: undefined,

      // Project properties
      name: "",
      description: "",
      markdown: "",
      thingDescription: "",
      keywords: [
        {
          type: "tag",
          content: ""
        }
      ],
      info: [
        {
          title: "Type: ",
          type: "text",
          content: ""
        },
        {
          title: "Platform: ",
          type: "text",
          content: ""
        },
        {
          title: "Complexity: ",
          type: "text",
          content: ""
        },
        {
          title: "Topic: ",
          type: "tag",
          content: ""
        },
        {
          type: "link",
          content: { link: "", label: "View on Github" }
        }
      ]
    };
  },
  created() {
    this.selected = this.buttons.btnG;
    this.getProject(this.projectId);
  },
  methods: {
    ...mapActions("project", ["loadProject"]),
    async getProject() {
      let project = await this.loadProject({
        projectId: this.$route.params.id
      });
      this.name = project.name;
      this.description = project.shortDescription;
      this.markdown = project.longDescription;
      this.thingDescription = project.td;
      this.info[0].content = project.implementationType;
      this.info[1].content = project.platform;
      this.info[2].content = project.complexity;
      this.info[3].content = project.topic;
      this.info[4].content.link = project.github;
      this.keywords[0].content = project.tags;
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
  margin-bottom: 10px;
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
  border-top: none;
  font-size: 14px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  background: #fff;
}

.project-content-left-btns {
  width: 100%;
  text-align: left;
  background: #fff;
  border: 1px solid #ccc;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  display: inline-flex;
  align-items: baseline;
}

.project-content-left-btns a.active {
  background: #1c1c1c;
  color: #fff;
  /* border-top: 1px solid #30b8a3;
  border-bottom: 1px solid #30b8a3; */
}

.project-content-left-btns a {
  background: #fff;
  height: 100%;
  text-align: center;
  color: #000;
  font-size: 20px;
  display: inline-block;
  padding: 15px 20px 15px 20px;
}

.project-content-left-btns a:hover {
  background: #30b8a3;
  border-color: #30b8a3;
  color: #fff;
  outline: none;
}

.project-content-left-btns a:active a:hover {
  background: #333;
  border-color: #333;
  color: #fff;
  outline: none;
}

.project-content-left-btns .left {
  border-top-left-radius: 3px;
  /* border-left: 1px solid #ccc;
  border-right: 1px solid #ccc; */
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
  padding: 10px 0 20px 0;
  margin: 10px 0 10px 0;
}

.project-short-description {
  font-size: 20px;
  font-weight: normal;
}
</style>



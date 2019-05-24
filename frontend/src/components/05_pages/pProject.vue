<template>
  <div class="project">
    <div>
      <h1 class="project-title">{{prName}}</h1>
      <p class="project-short-description">{{prShortDescr}}</p>
      <div class="project-content-left">
        <div class="project-content-left-container">
          <aMarkDownBox
            :class="{invisible:buttons.btnG != selected}"
            :markDown="prLongDescr"
          />
          <aCodeBox  :class="{invisible:buttons.btnT != selected}" :code="prTD"/>
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
      <mInfoBox :title="'General Information'" :content="projectInfo"/>
      <mInfoBox :title="'Keywords'" :content="keywords"/>
    </div>
  </div>
</template>

<script>
import aCodeBox from "@/components/01_atoms/aCodeBox.vue";
import aMarkDownBox from "@/components/01_atoms/aMarkDownBox.vue";
import mInfoBox from "@/components/02_molecules/mInfoBox.vue";

export default {
  name: "Project",
  components: {
    aCodeBox,
    aMarkDownBox,
    mInfoBox
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
      },
// Dummy data
      projectInfo: [
        {
          title: "Type: ",
          type: 'text',
          content: "asdasd"
        }, 
        {
          title: "Platform: ", 
          type: "list",
          content: ["a", "b"]
        }, 
        {
          title: "Complexity: ", 
          type: 'text', 
          content: "easy"
        }, 
        {
          title: "Topic: ", 
          type: "tag",
          content: ["a", "b"]
        }, 
        {
          type: "link", 
          content: { link: "https://api.github.com/repos", label: "View on Github" }
        }
      ], 
      keywords: [
        {
          type: "tag", 
          content: ["a", "b"]
        }
      ]
    };
  },
  created() {
    this.selected = this.buttons.btnG;
    if(!this.project) return;
    //TODO: Get data from data store
    if (this.project.clickedProject) {
        this.getReadme("something");

        this.prName = this.project.clickedProject.name;
        this.prShortDescr = this.project.clickedProject.shortDescription;
        this.prLongDescr = this.project.clickedProject.longDescription;
        this.prTD = this.project.clickedProject.td;
        this.prInfo.implType = "bla"; //this.project.clickedProject.implementationType;
        this.prInfo.platform = "a"; //this.project.clickedProject.platform;
        this.prInfo.complexity = "easy";// this.project.clickedProject.complexity;
        // this.prInfo.topic = this.project.clickedProject.topic;
        this.prInfo.topic = ["a", "b"];
        this.prInfo.url = this.project.clickedProject.github;
        this.prInfo.tags = ["a", "b", "c"];
    }
    if (this.project.newProject) {
        this.prName = this.project.newProject.title;
        this.prShortDescr = this.project.newProject.shortDescription;
        this.prLongDescr = this.project.newProject.longDescription;
        this.prInfo.topic = this.project.newProject.topic;
        this.prInfo.tags =  this.project.newProject.tags;
    }
  },
  methods: {
    getReadme(searchTerm) {
      // this.searchTerm = searchTerm;
      // so all GitHub API requests about repo information start at this url
      this.entryPoint = "https://api.github.com/repos";
      // then you have to provide the name of the org and repo
      this.searchTerm = "/w3c/wot-thing-description";
      // in the end you can put readme which will return a JSON object with the url for readme in different forms
      this.readmeEndPoint = "/readme";

      this.apiGetUrl = this.entryPoint+this.searchTerm+this.readmeEndPoint;

      this.download_url = "";

      fetch(this.apiGetUrl)
        .then(res => res.json())
        .then(json => {
          // console.log("resJSON is ", json)

          //html_url is what we click on as a user. To parse it you would need additional css from GitHub
          this.html_url = json.html_url;

          // download url returns raw.* files, so not rendered
          this.download_url = json.download_url;
          
          // console.log("urls are", this.html_url, this.download_url);
        })
        .then(
          // fetch(`${encodeURIComponent(this.download_url)}`)
          // fetch(this.download_url)
          fetch(`https://raw.githubusercontent.com/w3c/wot-thing-description/master/README.md`)
          .then(res => res.text())
          .then(
            text => {
              this.prLongDescr = text;
            }
          )
        )
        .catch(err => {
          this.status = "error";
          this.error = err;
        });
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
  background: #30B8A3;
  border-top: 1px solid #30B8A3;
  border-bottom: 1px solid #30B8A3;
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



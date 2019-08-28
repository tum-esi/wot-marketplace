<template>
  <div class="edit-container">
    <h1 class="edit-header">Edit your WoT project</h1>
    <p v-show="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
    <hr />
    <div class="edit-container" :class="addClass">
      <mFormElement
        v-for="element in editFormFields"
        :key="element.id"
        v-model="project[element.variable]"
        :labelContent="element.label"
        :labelDescription="element.desc"
        :inputType="element.type"
        :inputPlaceholder="element.placeholder"
        :radioOptions="element.radioOptions"
        :checkboxOptions="element.checkboxOptions"
        addClass="contribute-form"
      />
      <aButton
        addClass="contribute-form"
        :btnEvent="'confirm-btn-triggered'"
        @confirm-btn-triggered="editProject"
      >Confirm</aButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import mFormElement from "@/components/02_molecules/mFormElement.vue";
import aButton from "@/components/01_atoms/aButton.vue";

import { getProject, editProject } from "@/api";

const authModule = namespace("authentication");

@Component({
  components: {
    mFormElement,
    aButton
  }
})
export default class pEditProject extends Vue {
  @authModule.Getter("getToken") authToken!: string;
  @authModule.Getter("getUsername") username!: string;

  private errorMessage: string = "";

  private project: {
    [key: string]: any;
  } = {
    title: "",
    summary: "",
    repoUrl: null,
    description: "",
    thingDesc: "",
    topic: [],
    platform: [],
    type: "",
    complexity: "",
    tags: []
  };

  private editFormFields = [
    {
      type: "text",
      label: "Title *",
      desc: "Give your project a short and descriptive title of at least 5 characters.",
      variable: "title"
    },
    {
      type: "text",
      label: "Summary *",
      desc: "Briefly describe this project ( max 180 characters )",
      variable: "summary"
    },
    {
      type: "text",
      label: "Repository URL",
      desc: "Add the URL of your publicly accessible WoT project repository. The URL must contain the corresponding protocol.",
      variable: "repoUrl"
    },
    {
      type: "textarea",
      label: "Description / README *",
      desc: "Describe more thoroughly your project. Use MarkDown syntax.",
      variable: "description"
    },
    {
      type: "textarea",
      label: "Thing Description *",
      desc: "Paste the Thing Description of your Thing in JSON format",
      variable: "thingDesc"
    },
    {
      type: "checkbox",
      label: "Topic",
      desc: "Please select one topic",
      variable: "topic",
      checkboxOptions: ["Sensors", "Robotics", "Actuators", "Others"]
    },
    {
      type: "radio",
      label: "Platform *",
      desc: "Please choose the corresponding platform",
      variable: "platform",
      radioOptions: ["Raspberry Pi", "Arduino", "ESP", "Others"]
    },
    {
      type: "radio",
      label: "Project Type *",
      desc: "Select the type of content ( Thing Description or Source Code )",
      variable: "type",
      radioOptions: ["TD", "Code"]
    },
    {
      type: "radio",
      label: "Complexity",
      desc: "Select the complexity of this project",
      variable: "complexity",
      radioOptions: ["Beginner", "Medium", "Expert"]
    },
    {
      type: "tag",
      label: "Tags",
      desc: "Add some tags to help that will help others to find your project.",
      variable: "tags"  
    }
  ];

  resetMessage() {
    this.errorMessage = "";
  }

  async editProject() {
    let response = await editProject(
      this.$route.params.name,
      {
        _id: this.project._id,
        title: this.project.title,
        summary: this.project.summary,
        repoUrl: this.project.repoUrl,
        description: this.project.description,
        thingDesc: this.project.thingDesc,
        topic: this.project.topic,
        platform: this.project.platform,
        type: this.project.type,
        complexity: this.project.complexity,
        tags: this.project.tags
      },
      this.authToken   
    );

    if(response.status === 200){
      this.$router.push({ path: `/library/${this.project.title}/general` })
    }else{
      this.errorMessage = response.data.message;
      window.scrollTo(0, 0);
    }
  }

  async created() {
    let response = await getProject(this.$route.params.name);
    if (response.status === 200) {
      this.project = response.data;
      this.project.thingDesc = JSON.stringify(this.project.thingDesc, null, 4);
    } else if (response.status === 404) {
      this.$router.push({ name: "404" });
      //TODO: error handling
    }
  }
}
</script>

<style scoped>
hr {
  width: 1000px;
}

.edit-header {
  font-weight: 200;
}

.edit-container {
  display: grid;
  justify-items: center;
}
</style>
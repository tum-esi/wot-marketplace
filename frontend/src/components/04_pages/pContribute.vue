<template>
  <div class="contribute-content">
    <h1 class="contribute-header">Add a new WoT project</h1>
    <p v-show="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
    <hr />
    <oForm
      :formFields="projectFormFields"
      buttonLabel="Create Project"
      :submitFunction="attemptCreateProject"
      addClass="contribute-form"
      @keyup.native="resetMessage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import oForm from "@/components/03_organisms/oForm.vue";

import { createProject } from "@/api";

const authModule = namespace("authentication");

@Component({
  components: {
    oForm
  }
})
export default class pContribute extends Vue {
  @authModule.Getter("getToken") authToken!: string;

  private errorMessage: string = "";
  
  private projectFormFields = [
    {
      type: "text",
      label: "Title *",
      desc: "Give your project a short and descriptive title of at least 5 characters.",
      variable: "title"
    },
    {
      type: "text",
      label: "Summary *",
      desc: "Briefly describe this project",
      variable: "summary"
    },
    {
      type: "text",
      label: "Repository URL",
      desc: "Add the URL of your publicly accessible WoT project repository.",
      variable: "repoUrl"
    },
    {
      type: "textarea",
      label: "Description / README *",
      desc: "",
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
      label: "Platform",
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

  resetMessage(){
    this.errorMessage = "";
  }

  async attemptCreateProject(contributeForm: {[key: string]: string}){
    try {
      contributeForm.thingDesc = JSON.parse(contributeForm.thingDesc);
    } catch (error) {
      this.errorMessage = "Invalid JSON object in Thing Description field.";
      return;
    }

    let response = await createProject(contributeForm, this.authToken);
    if(response.status === 201){
      this.$router.push({
        name: 'Project General',
        params: {
          name: contributeForm.title
        }
      });
    } else {
      this.errorMessage = response.data.message;
      window.scrollTo(0,0);
    }
  }
}
</script>

<style scoped>
hr {
  width: 1000px;
}

.contribute-header {
  font-weight: 200;
}

.contribute-content {
  display: grid;
  justify-items: center;
}
</style>
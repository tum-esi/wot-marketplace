<template>
  <div class="bg">
    <div class="form-container">
      <h2 class="title">{{ formTitle }}</h2>
      <mFormElement
        v-for="(formElement, index) in formElements"
        :key="index"
        v-model="filledForm[formElement.formKey]"
        :formStyle="formStyle"
        :formKey="formElement.formKey"
        :formTitle="formElement.formTitle"
        :formDescription="formElement.formDescription"
        :formInputType="formElement.formInputType"
        :formInputPlaceholder="formElement.formInputPlaceholder"
        :formValue="formElement.formValue"
        :inputFormValues="formElement.inputFormValues"
        :formInputStyle="formElement.formInputStyle"
        :formOnClick="formElement.formOnClick"
        v-on:input-clicked="resetErrors"
      />
      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Topic</label>
          </h4>
          <p class="form-el-left-text">Please select one topic.</p>
        </div>
        <div class="form-el-right">
          <div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-1"
                value="sensor"
                v-model="form.topic"
              >
              <label class="form-el-right-radio-label" for="rad-1">Sensor</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-2"
                value="robotics"
                v-model="form.topic"
              >
              <label class="form-el-right-radio-label" for="rad-2">Robotics</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-3"
                value="actuator"
                v-model="form.topic"
              >
              <label class="form-el-right-radio-label" for="rad-3">Actuator</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-4"
                value="other"
                v-model="form.topic"
              >
              <label class="form-el-right-radio-label" for="rad-4">Other</label>
            </div>
          </div>
          <span
            style="padding-top: 5px;"
            :class="{'error-mgs' : form.topicErr, 'invisible' : !form.topicErr } "
          >Please select one option.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Platform</label>
          </h4>
          <p class="form-el-left-text">Pleace choose the according platform.</p>
        </div>
        <div class="form-el-right">
          <div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-plat-1"
                value="raspberry"
                v-model="form.platform"
              >
              <label class="form-el-right-radio-label" for="rad-plat-1">Raspberry</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-plat-2"
                value="arduino"
                v-model="form.platform"
              >
              <label class="form-el-right-radio-label" for="rad-plat-2">Arduino</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-plat-3"
                value="ESP"
                v-model="form.platform"
              >
              <label class="form-el-right-radio-label" for="rad-plat-3">ESP</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-plat-4"
                value="other"
                v-model="form.platform"
              >
              <label class="form-el-right-radio-label" for="rad-plat-4">Other</label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Implementation Type *</label>
          </h4>
          <p class="form-el-left-text">Is this project a Thing Description Template or source code.</p>
        </div>
        <div class="form-el-right">
          <div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-impl-1"
                value="template"
                v-model="form.implementationType"
              >
              <label class="form-el-right-radio-label" for="rad-impl-1">Template</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-impl-2"
                value="code"
                v-model="form.implementationType"
              >
              <label class="form-el-right-radio-label" for="rad-impl-2">Code</label>
            </div>
          </div>
          <span
            style="padding-top: 5px;"
            :class="{'error-mgs' : form.implErr, 'invisible' : !form.implErr } "
          >Please select one option.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Complexity *</label>
          </h4>
          <p class="form-el-left-text">Is this a beginner, an advanced or an expert project? Please select an appropriate complexity.</p>
        </div>
        <div class="form-el-right">
          <div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-com-1"
                value="simple"
                v-model="form.complexity"
              >
              <label class="form-el-right-radio-label" for="rad-com-1">Beginner</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-com-2"
                value="medium"
                v-model="form.complexity"
              >
              <label class="form-el-right-radio-label" for="rad-com-2">Medium</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="radio"
                id="rad-com-3"
                value="expert"
                v-model="form.complexity"
              >
              <label class="form-el-right-radio-label" for="rad-com-3">Expert</label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Tags</label>
          </h4>
          <p
            class="form-el-left-text"
          >Add some tags that will help others find your project. Comma or space separate the tags.</p>
        </div>
        <div class="form-el-right">
          <ul class="form-el-right-input" id="add-tags">
            <li v-for="tagEl in form.tags" v-bind:key="tagEl" class="tag">{{ tagEl }}</li>
            <li @click="focusInput" class="form-el-right-tag-list-input">
              <input
                ref="tagInput"
                @blur="addTag"
                @keydown.space="addTag"
                @keydown.delete="removeTag"
                v-model="tag"
                class="form-el-right-tag-input"
                type="text"
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="submit-btn-container">
        <span :class="{ 'invisible' : !hasErrors }" class="error-mgs">{{errorMessage}}</span>
        <aButton
          :btnLabel="'Create Project'"
          :btnOnClick="'form-btn-clicked'"
          :btnClass="'submit-btn'"
          v-on:form-btn-clicked="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "tForm",
  components: {
    aButton,
    mFormElement
  },
  data() {
    return {
      tag: "",
      errorMessage: "",
      hasErrors: false,
      filledForm: {
        name: undefined,
        shortDescription: undefined,
        longDescription: undefined,
        github: undefined,
        td: undefined,
        topic: "",
        implementationType: "code",
        platform: "other",
        tags: undefined,
        complexity: undefined
      },
      form: {
        topics: [],
        platform: "other",
        implementationType: "code",
        complexity: "medium",
        tags: []
      }
    };
  },
  computed: {
    ...mapGetters("formNewProject", [
      "getFormTitle",
      "getFormFields",
      "getFormStyle"
    ]),
    formElements() {
      return this.getFormFields;
    },
    formTitle() {
      return this.getFormTitle;
    },
    formStyle() {
      return this.getFormStyle;
    }
  },
  methods: {
    // Possible errors on form validation:
    // - missing required field
    // - td has the wrong format
    // - user is not logged in --> disable button maybe
    // - title not long enough, etc.

    ...mapActions("project", ["addNewProject", "loadProject"]),
    async submitForm() {
      this.resetErrors();
      if (this.filledForm.name && this.filledForm.name.split("").length < 5) {
        this.showErrors("The project's name should be at least 5 characters.");
      } else if (
        this.filledForm.shortDescription &&
        this.filledForm.shortDescription.split("").length < 5
      ) {
        this.showErrors(
          "The project's description should be at least 5 characters."
        );
      } else if (
        this.filledForm.longDescription &&
        this.filledForm.longDescription.split("").length < 5
      ) {
        this.showErrors(
          "The project's description should be at least 5 characters."
        );
      } else if (
        this.filledForm.name &&
        this.filledForm.shortDescription &&
        this.filledForm.longDescription &&
        this.filledForm.td &&
        this.filledForm.implementationType &&
        this.filledForm.platform
      ) {
        try {
          this.filledForm.td = JSON.parse(this.filledForm.td);
        } catch (error) {
          this.showErrors(
            "Please provide your Thing Description in valid JSON format."
          );
          return;
        }
        this.filledForm.topic = this.form.topic;
        this.filledForm.implementationType = this.form.implementationType;
        this.filledForm.complexity = this.form.complexity;
        this.filledForm.tags = this.form.tags;
        this.filledForm.platform = this.form.platform;
        let response = await this.addNewProject({
          newProject: this.filledForm
        });
        console.log("project new", response);
        if (!response) {
          this.showErrors(
            "This service is currently not available. Try again later"
          );
        } else if (response.error) {
          this.showErrors(response.error);
        } else {
          let newProject = await this.loadProject({
            projectId: this.filledForm.name
          });
          console.log("newProject", newProject);
          if (!newProject.error && newProject) {
            this.$router.push({
              name: "Project",
              params: { id: newProject.name }
            });
          } else {
            this.showErrors(newProject.error);
          }
        }
      } else {
        this.showErrors("Please fill out all required fields in this form.");
      }
    },
    showErrors(errMsg) {
      this.hasErrors = true;
      this.errorMessage = errMsg;
    },
    resetErrors() {
      this.hasErrors = false;
      this.errorMessage = "";
    },
    addTag() {
      if (
        this.tag !== "" &&
        this.tag !== " " &&
        !this.form.tags.includes(this.tag) &&
        this.form.tags.length <= 10
      ) {
        this.form.tags.push(this.tag);
      }
      this.tag = "";
    },
    removeTag() {
      if (this.form.tags.length && this.tag === "") this.form.tags.pop();
    },
    focusInput() {
      this.$refs.tagInput.focus();
    }
  },
  watch: {
    filledForm() {
      // eslint-disable-next-line
      // console.log("filledForm watch", this.filledForm);
    }
  }
});
</script>


<style scoped>
.form-container {
  width: 75%;
  margin: 0 auto;
  background: #fff;
}

.title {
  text-align: center;
  padding: 15px;
  border-bottom: 1px solid #999;
  margin-bottom: 5px;
}

.submit-btn-container {
  clear: both;
  width: 100%;
  display: flex;
  align-items: baseline;
  padding: 10px;
  border-top: 1px solid #999;
  margin-top: 10px;
}

.error-mgs {
  color: red;
}

.form-container {
  width: 75%;
  margin: 0 auto;
  background: #fff;
}
.form-el {
  width: 100%;
  clear: both;
}
.form-el-one {
  width: 30%;
  float: right;
  padding: 10px;
}
.form-el-left {
  width: 25%;
  display: box;
  box-sizing: border-box;
  float: left;
  padding: 10px 0 10px 10px;
}
.form-el-right {
  width: 75%;
  float: left;
  padding: 10px 10px 0 10px;
}
.form-el-right-input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #999;
  margin-bottom: 0;
  font-size: 20px;
  outline: none;
}
.form-el-right-input:focus {
  box-shadow: 0 0 5px #25e4d4;
}
.form-el-right textarea {
  resize: none;
  height: 250px;
}
.form-el-right-td-area {
  width: 75%;
  float: left;
  padding: 10px 10px 0 10px;
}
.form-el-right-td-area textarea {
  resize: none;
  height: 500px;
}
.form-el-right-tag-list-input {
  height: 100%;
  cursor: text;
}
.form-el-right-tag-input {
  outline: none;
  border: none;
  vertical-align: middle;
  height: 100%;
  padding: 0;
  margin-bottom: 0;
  display: inline-block;
  font-size: 14px;
}
.form-el-right-radio-container {
  width: 20%;
  float: left;
}
.form-el-right-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  position: relative;
  color: #666;
  top: 10px;
  height: 30px;
  width: 30px;
  border: 0;
  border-radius: 3px;
  border: 1px solid #999;
  cursor: pointer;
  margin-right: 7px;
  outline: none;
}
.form-el-right-radio:checked::before {
  position: absolute;
  font: 13px/1 "Open Sans", sans-serif;
  left: 11px;
  top: 7px;
  content: "\02143";
  transform: rotate(40deg);
}
.form-el-right-radio:hover {
  background-color: #f7f7f7;
}
.form-el-right-radio:checked {
  background-color: #f1f1f1;
}
.form-el-right-radio-label {
  cursor: pointer;
}
#add-tags {
  list-style-type: none;
  margin: 0px;
  padding: 2px 4px;
  min-height: 45px;
}
.tag {
  display: inline-block;
  padding: 3px 5px 3px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  margin: 3px 3px 3px 1px;
  cursor: default;
  font-size: 14px;
  float: left;
}
</style>

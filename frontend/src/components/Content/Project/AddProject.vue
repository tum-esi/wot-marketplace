<template>
  <div class="bg">
    <form @submit="addProject" class="form-container">
      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Title</label>
          </h4>
          <p class="form-el-left-text">Give your project a short, descriptive title.</p>
        </div>
        <div class="form-el-right">
          <input
            class="form-el-right-input"
            type="text"
            v-model="form.title"
            :class="{'input-error' : form.titleErr}"
            @focus="resetError(form.titleKey)"
            @blur="validateInput(form.titleKey)"
          >
          <span
            :class="{'error-mgs' : form.titleErr, 'invisible' : !form.titleErr}"
          >Please enter a title for your project.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Short Description</label>
          </h4>
          <p class="form-el-left-text">Describe this project in one sentence (max 180 characters).</p>
        </div>
        <div class="form-el-right">
          <input
            class="form-el-right-input"
            type="text"
            v-model="form.shortDescription"
            :class="{'input-error' : form.shortDescrErr}"
            @focus="resetError(form.descrKey)"
            @blur="validateInput(form.descrKey)"
          >
          <span
            :class="{'error-mgs' : form.shortDescrErr, 'invisible' : !form.shortDescrErr}"
          >Please enter a short description for your project.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Description</label>
          </h4>
          <p class="form-el-left-text">Describe this project and how it is used.</p>
        </div>
        <div class="form-el-right">
          <textarea class="form-el-right-input" type="text" v-model="form.longDescription"></textarea>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Repository Url</label>
          </h4>
          <p
            class="form-el-left-text"
          >Add the URL of the repository, where your WoT project is hosted. Make sure it is publiclly available.</p>
        </div>
        <div class="form-el-right">
          <input
            class="form-el-right-input"
            type="text"
            v-model="form.url"
            :class="{'input-error' : form.urlErr}"
            @focus="resetError(form.urlKey)"
            @blur="validateInput(form.urlKey)"
          >
          <span
            :class="{'error-mgs' : form.urlErr, 'invisible' : !form.urlErr } "
          >Please enter a valid URL.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Topic</label>
          </h4>
          <p class="form-el-left-text">Please select at least one topic for your project.</p>
        </div>
        <div class="form-el-right">
          <div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="checkbox"
                id="rad-1"
                value="sensor"
                v-model="form.topics"
              >
              <label class="form-el-right-radio-label" for="rad-1">Sensor</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="checkbox"
                id="rad-2"
                value="robotics"
                v-model="form.topics"
              >
              <label class="form-el-right-radio-label" for="rad-2">Robotics</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="checkbox"
                id="rad-3"
                value="actuator"
                v-model="form.topics"
              >
              <label class="form-el-right-radio-label" for="rad-3">Actuator</label>
            </div>
            <div class="form-el-right-radio-container">
              <input
                class="form-el-right-radio"
                type="checkbox"
                id="rad-4"
                value="other"
                v-model="form.topics"
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
          <span
            style="padding-top: 5px;"
            :class="{'error-mgs' : form.platformErr, 'invisible' : !form.platformErr } "
          >Please select one option.</span>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Implementation Type</label>
          </h4>
          <p
            class="form-el-left-text"
          >Is this project a Thing Description Template or source code.</p>
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

      <div class="form-el">
        <div class="form-el-one">
          <button class="btn submit-btn" type="submit">Create Project</button>
        </div>
      </div>
      <div class="form-el"></div>
    </form>
  </div>
</template>

<script>
// import Project from "@/classes/Project.js";

export default {
  name: "AddProject",
  data() {
    return {
      tag: "",
      form: {
        title: "",
        titleKey: "title",
        titleErr: false,
        descrKey: "description",
        shortDescription: "",
        shortDescrErr: false,
        longDescription: "",
        url: "",
        urlKey: "url",
        urlErr: false,
        topics: [],
        topicKey: "topic",
        topicErr: false,
        platform: "",
        platformKey: "platform",
        platformErr: false,
        implementationType: "",
        implKey: "implementation",
        implErr: false,
        tags: []
      }
    };
  },
  methods: {
    addProject(event) {
      event.preventDefault();
      let formKeys = [];
      let formErrors = [];
      const newProject = this.form;

      formKeys = [
        this.form.titleKey,
        this.form.descrKey,
        this.form.urlKey,
        this.form.topicKey,
        this.form.platformKey,
        this.form.implKey
      ];
      let formIsCorrect = true;
      for (let i = 0; i < formKeys.length; i++) {
        this.resetError(formKeys[i]);
        this.validateInput(formKeys[i]);
      }
      formErrors = [
        this.form.titleErr,
        this.form.urlErr,
        this.form.shortDescrErr,
        this.form.topicErr,
        this.form.platformErr,
        this.form.implErr
      ];
      for (let i = 0; i < formErrors.length; i++) {
        console.log(formErrors[i]);
        if (formErrors[i]) {
          formIsCorrect = false;
          break;
        }
      }
      if (formIsCorrect) {
        this.$router.push({
          name: "Project",
          params: { project: { newProject } }
        });
      } else {
        console.log("Form is not correct");
      }
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
    validateInput(el) {
      switch (el) {
        case this.form.titleKey:
          if (this.form.title === "") this.form.titleErr = true;
          console.log("formTitle", this.form.title, this.form.titleErr);
          break;
        case this.form.descrKey:
          if (this.form.shortDescription === "") this.form.shortDescrErr = true;
          break;
        case this.form.urlKey:
          if (this.form.url === "") this.form.urlErr = true;
          break;
        case this.form.topicKey:
          if (this.form.topic === "") this.form.topicErr = true;
          break;
        case this.form.platformKey:
          if (this.form.platform === "") this.form.platformErr = true;
          break;
        case this.form.implKey:
          if (this.form.implementationType === "") this.form.implErr = true;
          break;
      }
    },
    resetError(el) {
      switch (el) {
        case this.form.titleKey:
          this.form.titleErr = false;
          break;
        case this.form.descrKey:
          this.form.shortDescrErr = false;
          break;
        case this.form.urlKey:
          this.form.urlErr = false;
          break;
        case this.form.topicKey:
          this.form.topicErr = false;
          break;
        case this.form.platformKey:
          this.form.platformErr = false;
          break;
        case this.form.implKey:
          this.form.implErr = false;
          break;
      }
    },
    focusInput() {
      this.$refs.tagInput.focus();
    }
  }
};
</script>

<style scoped>
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

.submit-btn {
  padding: 15px;
  width: 100%;
}

.input-active {
  box-shadow: 0 0 5px #25e4d4;
}

.input-error {
  box-shadow: 0 0 5px red;
}

.error-mgs {
  color: red;
  padding: 5px 10px 10px 10px;
  display: block;
  clear: both;
}

.visible {
  display: inherit;
}
</style>



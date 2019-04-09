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
          <input class="form-el-right-input" type="text" v-model="form.title">
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
          <input class="form-el-right-input" type="text" v-model="form.shortDescription">
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
          <input class="form-el-right-input" type="text" v-model="form.url">
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Thing Description</label>
          </h4>
          <p class="form-el-left-text">Paste the Thing Description of your project</p>
        </div>
        <div class="form-el-right">
          <textarea class="form-el-right-input" type="text" placeholder="Your amazing Thing Description" v-model="form.thingDescription"></textarea>
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
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-1">
            <label class="form-el-right-radio-label" for="rad-1">Sensor</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-2">
            <label class="form-el-right-radio-label" for="rad-2">Robotics</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-3">
            <label class="form-el-right-radio-label" for="rad-3">Actuator</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-4">
            <label class="form-el-right-radio-label" for="rad-4">Other</label>
          </div>
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
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-plat-1">
            <label class="form-el-right-radio-label" for="rad-plat-1">Raspberry</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-plat-2">
            <label class="form-el-right-radio-label" for="rad-plat-2">Arduino</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-plat-3">
            <label class="form-el-right-radio-label" for="rad-plat-3">ESP</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-plat-4">
            <label class="form-el-right-radio-label" for="rad-plat-4">Other</label>
          </div>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-left">
          <h4 class="form-el-left-heading">
            <label>Implementation Type</label>
          </h4>
          <p
            class="form-el-left-text"
          >To distinguish between the TD templates and source code with Github.</p>
        </div>
        <div class="form-el-right">
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-impl-1">
            <label class="form-el-right-radio-label" for="rad-impl-1">Template</label>
          </div>
          <div class="form-el-right-radio-container">
            <input class="form-el-right-radio" type="radio" id="rad-impl-2">
            <label class="form-el-right-radio-label" for="rad-impl-2">Code</label>
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
            <li class="tag">Bla</li>
            <li class="form-el-right-tag-list-input">
              <input class="form-el-right-tag-input" type="text">
            </li>
          </ul>
        </div>
      </div>

      <div class="form-el">
        <div class="form-el-one">
          <button class="btn submit-btn" type="submit" @keyup.enter="addProject">Create Project</button>
        </div>
      </div>
      <div class="form-el"></div>
    </form>
  </div>
</template>

<script>

export default {
  name: "AddProject",
  data() {
    return {
      form: {
        title: '',
        shortDescription: '',
        longDescription: '',
        url: ''
      }
    };
  },
  methods: {
    addProject(event) {
      let formIsCorrect = false;
      event.preventDefault();
      const newProject = this.form;

      //TODO: form validation
      formIsCorrect = true;
      if (formIsCorrect) {
        this.$router.push({
          name: "Project",
          params: { project: { newProject } }
        });
      } else {
        console.log("Form is not correct");
      }
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
</style>



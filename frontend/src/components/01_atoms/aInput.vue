<template>
  <textarea
    v-if="inputType === 'textarea'"
    v-model="inputValue"
    :class="addClass"
    :placeholder="placeholder"
  />

  <div
    v-else-if="inputType === 'tag'"
    :class="addClass"
    class="tag-container"
    @click="$refs.tagInput.focus()"
  >
    <span
      v-for="(element, index) in tags"
      :key="element.id"
      @click="removeTag(index)"
      :class="addClass"
    >{{ element }}</span>
    <input
      type="text"
      @keyup.space="e => addTag(e.target)"
      :class="addClass"
      class="tag-input"
      ref="tagInput"
    />
  </div>

  <div v-else-if="inputType === 'radio'" :class="addClass" class="radio-container">
    <label
      v-for="element in radioOptions"
      :key="element.id"
      :class="addClass"
      class="radio-option-container"
    >
      <input type="radio" :class="addClass" class="radio" :value="element" v-model="inputValue" />
      {{ element }}
    </label>
  </div>

  <div v-else-if="inputType === 'checkbox'" :class="addClass" class="checkbox-container">
    <label
      v-for="element in checkboxOptions"
      :key="element.id"
      :class="addClass"
      class="checkbox-option-container"
    >
      <input
        type="checkbox"
        :class="addClass"
        class="checkbox"
        @change="e => onCheckboxChange(e.target.checked, element)"
        :checked="value ? value.includes(element) : false"
      />
      {{ element }}
    </label>
  </div>

  <input
    v-else
    v-model="inputValue"
    :class="addClass"
    :type="inputType"
    :placeholder="placeholder"
    :disabled="isDisabled"
  />
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class aInput extends Vue {
  @Prop() inputType!: string;
  @Prop() placeholder?: string;
  @Prop() addClass?: string;
  @Prop() radioOptions?: string[];
  @Prop() checkboxOptions?: string[];
  @Prop() checkboxInitialChecked?: boolean[];
  @Prop() isDisabled?: boolean;
  @Prop() value!: any;

  private topics!: string[];
  private tags!: string[];

  get inputValue() {
    return this.value;
  }

  set inputValue(inputValue) {
    this.$emit("input", inputValue);
  }

  @Watch("topics", { deep: true })
  onTopicsChanged(val: string[]) {
    this.$emit("input", val);
  }

  @Watch("tags", { deep: true })
  onTagsChanged(val: string[]) {
    this.$emit("input", val);
  }

  addTag(e: HTMLInputElement) {
    this.tags.push(e.value.replace(/[^0-9a-z$]/gi, ""));
    e.value = "";
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  onCheckboxChange(checked: boolean, topic: string) {
    if (checked) {
      this.topics.push(topic);
    } else {
      this.topics.splice(this.topics.indexOf(topic), 1);
    }
  }

  constructor() {
    super();
    this.topics =
      this.value && Array.isArray(this.value) && this.inputType === "checkbox"
        ? [...this.value]
        : [];
    this.tags = [];
  }
}
</script>

<style scoped>
.default input {
  padding: 10px 15px;
  font-size: 0.8em;
}

.login-form input {
  padding: 10px 15px;
  font-size: 1em;
}

.register-form input {
  padding: 10px 15px;
  font-size: 1em;
  width: 100%;
}

.contribute-form input {
  width: 100%;
  font-size: 20px;
  padding: 6px;
}

.contribute-form textarea {
  width: 100%;
  height: 250px;
  font-size: 15px;
  resize: none;
  padding: 5px;
}

.contribute-form.tag-container {
  width: 100%;
  min-height: 52px;
  background: white;
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: text;
}

.contribute-form span {
  font-size: 90%;
  display: inline-block;
  background: #30b8a3;
  color: white;
  cursor: pointer;
  padding: 0.4em 0.75em;
  margin: 5px;
  border-radius: 4px;
}

.contribute-form span:hover {
  opacity: 0.8;
}

.contribute-form.tag-input {
  border: 0;
  outline: 0;
  padding: 10px;
  font-size: 18px;
  background: none;
  width: auto;
}

.contribute-form.radio-container {
  display: grid;
  grid-auto-flow: column;
}

.contribute-form.radio-option-container {
  display: grid;
  grid-template-columns: 50px 100px;
  text-align: center;
  font-size: 15px;
}

.contribute-form.radio-container input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 30px;
  width: 30px;
  background: white;
  border: 1px solid lightgray;
  border-radius: 50%;
  padding: 0;
  margin: auto;
  outline: none;
}

.contribute-form.radio-container * {
  cursor: pointer;
}

.contribute-form.radio-container *:hover {
  opacity: 0.8;
}

.contribute-form.radio-container input:checked::before {
  content: "\2714";
  padding: 3.5px;
  color: white;
}

.contribute-form.radio-container input:checked {
  background: #30b8a3;
}

.contribute-form.checkbox-container {
  display: grid;
  grid-auto-flow: column;
}

.contribute-form.checkbox-option-container {
  display: grid;
  grid-template-columns: 50px 100px;
  text-align: center;
  font-size: 15px;
}

.contribute-form.checkbox-container input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 30px;
  width: 30px;
  background: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0;
  margin: auto;
  outline: none;
}

.contribute-form.checkbox-container * {
  cursor: pointer;
}

.contribute-form.checkbox-container *:hover {
  opacity: 0.8;
}

.contribute-form.checkbox-container input:checked::before {
  content: "\2714";
  padding: 3.5px;
  color: white;
}

.contribute-form.checkbox-container input:checked {
  background: #30b8a3;
}

.search-input {
  width: 54vw;
  font-size: 1vw;
  padding: 0.5vw;
  margin: 0.2vw 1vw;
  border: 2px solid black;
  border-radius: 5px;
}

.search-filter.checkbox-container {
  display: grid;
  grid-auto-flow: row;
  margin: 0 1vw;
}

.search-filter.checkbox-option-container {
  font-size: 0.8vw;
  margin: auto 0;
}

.password-change-form input {
  padding: 10px 15px;
  font-size: 1em;
  width: 100%;
}

.user-profile-input {
  width: 100%;
  font-size: 1em;
  padding: 0.2vw;
  text-align: left;
}

.user-profile-input:disabled{
  text-align: center;
  background: none;
  border: none;
  color: black;
}

</style>

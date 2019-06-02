<template>
  <!-- Checkboxes: multiple selection is possible -->
  <div v-if="inputType === 'checkbox'">
    <div
      class="checkbox-item"
      v-for="(inputFormValueElement, index) in inputFormValues"
      :key="index"
    >
      <input
        type="checkbox"
        class="checkbox-el"
        v-model="currentValue"
        :class="inputStyle"
        :value="inputFormValueElement"
        :id="`${inputFormValueElement}checkbox`"
      >
      <label class="checkbox-label" :for="`${inputFormValueElement}checkbox`">{{ inputFormValueElement }}</label>
    </div>
  </div>

  <!-- Radio elements: only single option -->
  <div v-else-if="inputType === 'radio'">
    <div
      class="checkbox-item"
      v-for="(inputFormValueElement, index) in inputFormValues"
      :key="index"
    >
      <input
        type="radio"
        class="checkbox-el"
        :v-model="currentValue"
        :class="inputStyle"
        :value="inputFormValueElement"
        :id="`${inputFormValueElement}radio`"
      >
      <label class="checkbox-label" :for="`${inputFormValueElement}radio`">{{ inputFormValueElement }}</label>
    </div>
  </div>
  <!-- <div v-else-if="inputType === 'radio'">
    <input
      type="radio"
      class="checkbox-el"
      v-model="currentValue"
      :class="inputStyle"
      :value="inputFormValues"
      :id="inputFormValues"
    >
    <label class="checkbox-label" :for="inputFormValues">{{ inputFormValues }}</label>
  </div>-->

  <!-- Tags -->
  <div v-else-if="inputType === 'tag'">
    <ul class="add-tags big-form-input">
      <li v-for="(tagElement, index) in tags" :key="index" class="tag">{{ tagElement }}</li>
      <li @click="focusInput" class="tag-list">
        <input
          class="big-form-tag-input"
          type="text"
          ref="tagInput"
          v-model="tag"
          @blur="addTag"
          @keydown.space="addTag"
          @keydown.delete="removeTag"
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

/**
 * An input type with several options. Can be checkbox, radiobutton or tag list.
 */

export default Vue.extend({
  name: "aInput",
  props: {
    /**
     * Type of input element.
     */
    inputType: {
      type: String,
      required: true,
      validator: value =>
        ["textarea", "checkbox", "radio", "text", "tag", "password"].indexOf(
          value
        ) !== -1
    },
    /**
     * Value for single form element. E.g. checkbox option.
     */
    inputFormValues: {
      //   type: [String, Number],
      required: false,
      default: null
    },
    /**
     * Optional css class for input field.
     */
    inputStyle: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      tag: "",
      tags: [],
      selection: [] // For checkboxes
    };
  },
  computed: {
    currentValue: {
      get() {
        // console.log(`==aInput== [${this.inputType}]get: ${this.inputValue}`);
        return this.inputValue;
      },
      set(val) {
        // console.log(
        // //   `==aInput== [${this.inputType}]set: ${val}, ${this.inputValue}`
        // );
        this.$emit("input", val);
      }
    }
  },
  methods: {
    addTag() {
      if (
        this.tag !== "" &&
        this.tag !== " " &&
        !this.tags.includes(this.tag) &&
        this.tags.length <= 10
      ) {
        this.tags.push(this.tag);
      }
      this.tag = "";
    },
    removeTag() {
      if (this.tags.length && this.tag === "") this.tags.pop();
    },
    focusInput() {
      this.$refs.tagInput.focus();
    }
  }
});
</script>

<style scoped>
.checkbox-item {
  width: 30%;
  float: left;
  text-overflow: hidden;
  display: flex;
  align-items: baseline;
}

.checkbox-el {
  -webkit-appearance: none;
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

.checkbox-el:checked::before {
  position: absolute;
  font: 13px/1 "Open Sans", sans-serif;
  left: 11px;
  top: 7px;
  content: "\02143";
  transform: rotate(40deg);
}

.checkbox-el:hover {
  background-color: #f7f7f7;
}

.checkbox-el:checked {
  background-color: #f1f1f1;
}

.checkbox-label {
  cursor: pointer;
}

.big-form-tag-input {
  outline: none;
  border: none;
  vertical-align: middle;
  height: 100%;
  padding: 0;
  margin-bottom: 0;
  display: inline-block;
  font-size: 14px;
}

.add-tags {
  list-style-type: none;
  margin: 0px;
  padding: 2px 4px;
  min-height: 45px;
}

.tag-list {
  height: 100%;
  cursor: text;
}

.tag {
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

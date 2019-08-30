<template>
  <textarea
    v-if="inputType === 'textarea'"
    v-model="inputValue"
    :class="addClass"
    :placeholder="placeholder"
  />

  <VueInputTag
    v-else-if="inputType === 'tag'"
    v-model="inputValue"
    :add-tag-on-blur="true"
    :limit="10"
    :add-tag-on-keys="[13, 188, 9, 32]"
  />

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
        :value="element"
        v-model="inputValue"
      />
      {{ element }}
    </label>
  </div>

  <div v-else-if="inputType ==='rating'" :class="addClass">
    <VueStarRating
      v-model="inputValue"
      :read-only="isDisabled"
      :increment="0.5"
      :star-size="20"
      :show-rating="false"
      @rating-selected="ratingSelectHandler"
    />
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

import VueInputTag from "vue-input-tag";
import VueStarRating from "vue-star-rating";

@Component({
  components: {
    VueInputTag,
    VueStarRating
  }
})
export default class aInput extends Vue {
  @Prop() inputType!: string;
  @Prop() placeholder?: string;
  @Prop() addClass?: string;
  @Prop() radioOptions?: string[];
  @Prop() checkboxOptions?: string[];
  @Prop() ratingSelectHandler?: Function;
  @Prop() isDisabled?: boolean;
  @Prop({ default: [] }) value!: any;

  get inputValue() {
    return this.value;
  }

  set inputValue(inputValue) {
    this.$emit("input", inputValue);
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

.user-profile-input:disabled {
  text-align: center;
  background: none;
  border: none;
  color: black;
}
</style>

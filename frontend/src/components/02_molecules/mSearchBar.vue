<template>
  <div class="search-container">
    <div class="search-bar-top">
      <aInput
        v-model="searchFilters['term ']"
        inputType="text"
        placeholder="Search WoTify library"
        addClass="search-input"
      />
      <aButton
        btnEvent="search-btn-clicked"
        @search-btn-clicked="attemptSearch"
        addClass="search-btn"
      >Search</aButton>
    </div>
    <div class="search-bar-btm">
      <mDropDown addClass="search-filter">
        <template #dropDownLabel>&#11167; Filters &#11167;</template>
        <template #dropDownOptions>
          <div class="filter-options">
            <mFormElement
              v-for="element in searchFilterInputs"
              v-model="searchFilters[element.label.toLowerCase()]"
              :inputType="element.type"
              :labelContent="element.label"
              :checkboxOptions="element.options"
              addClass="search-filter"
            />
          </div>
        </template>
      </mDropDown>
      <mFormElement
        v-model="searchFilters['sort']"
        addClass="search-sort"
        labelContent="Sort by : "
        inputType="radio"
        :radioOptions="['Date', 'Rating']"
      />
      <p class="search-indicator">0 of 0 things.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aInput from "@/components/01_atoms/aInput.vue";
import aButton from "@/components/01_atoms/aButton.vue";
import aLabel from "@/components/01_atoms/aLabel.vue";

import mFormElement from "@/components/02_molecules/mFormElement.vue";
import mDropDown from "@/components/02_molecules/mDropDown.vue";

@Component({
  components: {
    aInput,
    aButton,
    mFormElement,
    mDropDown
  }
})
export default class mSearchBar extends Vue {
  private searchFilters: {[key: string]: Array<string> | string } = {
    sort: 'Date'
  };

  private searchFilterInputs = [
    {
      type: "checkbox",
      label: "Topics",
      options: ["Sensors", "Robotics", "Actuators", "Others"]
    },
    {
      type: "checkbox",
      label: "Platform",
      options: ["Raspberry Pi", "Arduino", "ESP", "Others"]
    },
    {
      type: "checkbox",
      label: "Type",
      options: ["TD", "Code"]
    },
    {
      type: "checkbox",
      label: "Complexity",
      options: ["Beginner", "Medium", "Expert"]
    }
  ];

  attemptSearch() {
    this.$router.push({
      name: "Library",
      query: {
        ...this.searchFilters,
        page: "1"
      }
    });
  }
}
</script>

<style scoped>
.search-container {
  width: 100vw;
}

.search-bar-top {
  width: 55vw;
}

.search-bar-btm {
  width: 50vw;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
}

.filter-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.2vw;
  margin: 0 1vw;
}

.search-indicator {
  margin: 0;
  text-align: right;
}
</style>
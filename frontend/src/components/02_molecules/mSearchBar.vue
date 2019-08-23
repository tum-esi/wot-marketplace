<template>
  <div class="search-container">
    <div class="search-bar-top">
      <aInput
        v-model="searchFilters['term']"
        inputType="text"
        placeholder="Search WoTify library"
        addClass="search-input"
        @keypress.native.stop.enter="e => attemptSearch()"
      />
    </div>
    <div class="search-bar-btm">
      <mDropDown addClass="search-filter">
        <template #dropDownLabel> Filters </template>
        <template #dropDownOptions>
          <div class="filter-options">
            <mFormElement
              v-for="element in searchFilterInputs"
              v-model="searchFilters[element.label.toLowerCase()]"
              :key="element.id"
              :inputType="element.type"
              :labelContent="element.label"
              :checkboxOptions="element.options"
              :checkboxInitialChecked="element.options.map(arg => {
                if(searchFilters[element.label.toLowerCase()]){
                  return searchFilters[element.label.toLowerCase()].includes(arg);
                }
                return false;
              })"
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
      <p class="search-indicator">{{ totalResults }} of {{ totalDocs }} things.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import aInput from "@/components/01_atoms/aInput.vue";
import aButton from "@/components/01_atoms/aButton.vue";
import aLabel from "@/components/01_atoms/aLabel.vue";

import mFormElement from "@/components/02_molecules/mFormElement.vue";
import mDropDown from "@/components/02_molecules/mDropDown.vue";

const libModule = namespace("library");

@Component({
  components: {
    aInput,
    aButton,
    mFormElement,
    mDropDown
  }
})
export default class mSearchBar extends Vue {
  @libModule.Getter("getTotalResults") totalResults!: number;
  @libModule.Getter("getTotalDocs") totalDocs!: number;

  private searchFilters: { [key: string]: string | (string | null)[] } = {
    term: "",
    sort: "",
    topic: [],
    platform: [],
    type: [],
    complexity: [],
    page: ""
  };

  private searchFilterInputs = [
    {
      type: "checkbox",
      label: "Topic",
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

  created() {
    this.searchFilters.term = this.$route.query.term
      ? this.$route.query.term
      : "";
    this.searchFilters.sort = this.$route.query.sort
      ? this.$route.query.sort
      : "Date";
    this.searchFilters.page = this.$route.query.page
      ? this.$route.query.page
      : "1";

    ["topic", "platform", "type", "complexity"].forEach(arg => {
      if (this.$route.query[arg]) {
        if (Array.isArray(this.$route.query[arg])) {
          this.searchFilters[arg] = [...(this.$route.query[arg] as string[])];
        } else {
          this.searchFilters[arg] = [this.$route.query[arg] as string];
        }
      } else {
        this.searchFilters[arg] = [];
      }
    });

    this.attemptSearch();
  }

  @Watch('searchFilters', { immediate: false, deep: true })
  onFilterChange() {
    this.attemptSearch();
  }

  attemptSearch() {
    this.$router.push({
      name: "Library",
      query: {
        ...this.searchFilters
      }
    });
  }
}
</script>

<style scoped>
.search-container {
  display: inline-block;
  width: 80vw;
}

.search-bar-top {
  width: 55vw;
}

.search-bar-btm {
  margin-top: 5px;
  width: 55vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.2vw;
  margin: 0 1vw;
}

.search-indicator {
  margin: 0;
  text-align: right;
}
</style>
<template>
  <div>
    <p class="search-info">Browse the wotify collection to find WoT-enabled Things, WoT-implementations and Thing Descriptions.</p>
    <!-- Search bar & new project button -->
    <div class="search-header">
      <mSearchbar
        class="search-header-left"
        v-on:search-btn-clicked="searchBtnClicked"
        v-on:searchbar-clicked="resetErrors"
      />
      <div class="search-header-right">
        <!-- <aButton
          :btnLabel="'New Project'"
          :btnOnClick="'add-project-btn-clicked'"
          :btnClass="'search-btn btn-right'"
          v-on:add-project-btn-clicked="projectBtnClicked"
        /> -->
      </div>
    </div>
    <!-- Search status container -->
    <!-- <mStatus
      v-bind:class="{invisible: !loading && status != 'load'}"
      v-bind:status="status"
      v-bind:propSearchTerm="searchTerm"
    />-->
    <div class="status-container" :class="{'invisible': !hasErrors}">{{ errorMessage }}</div>
    <!-- Search results -->
    <div id="search-results">
      <mProjectItem
        v-for="(project, index) in projects"
        :key="index"
        :projectName="project.name"
        :projectShortDescription="project.shortDescription"
        :projectPlatform="project.platform"
        :projectImplementationType="project.implementationType"
        :projectOnClick="'project-item-clicked'"
        v-on:project-item-clicked="projectItemClicked"
      />
    </div>
  </div>
</template>

<script>
import aButton from "@/components/01_atoms/aButton.vue";
import mSearchbar from "@/components/02_molecules/mSearchbar.vue";
// import mStatus from "@/components/02_molecules/mStatus.vue";
import mProjectItem from "@/components/02_molecules/mProjectItem.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "oSearchContainer",
  components: {
    aButton,
    mProjectItem,
    mSearchbar
    // mStatus
  },
  data() {
    return {
      searchOptions: { count: 10, skip: 0 },
      projects: [],
      hasErrors: false,
      errorMessage: "",
      err: undefined
    };
  },
  methods: {
    ...mapActions("project", ["loadProjectItems"]),
    async searchBtnClicked(searchTerm) {
      this.projects = [];
      this.resetErrors();
      this.showError("Loading");
      let response = await this.loadProjectItems({
        searchTerm,
        searchOptions: this.searchOptions
      });
      console.log("SEARCH: ", response);
      if (response.error) {
        this.showError(response.error);
      } else if (!response.length) {
        this.showError(`There are no results for the search "${searchTerm}".`);
      } else {
        this.resetErrors();
        this.projects = response;
      }
    },
    showError(errMsg) {
      this.hasErrors = true;
      this.errorMessage = errMsg;
    },
    resetErrors() {
      this.hasErrors = false;
      this.errorMessage = "";
    },
    projectBtnClicked() {
      this.$router.push({
        name: "AddProject"
      });
    },
    projectItemClicked(clickedProject) {
      this.$router.push({
        name: "Project",
        params: { id: clickedProject }
      });
    }
  }
};
</script>

<style scoped>
.search-info {
  color: #1c1c1c;
  padding: 7px 20px 0 22px;
  font-size: 16px;
}

.search-header {
  width: 100%;
  padding: 7px 20px 10px 20px;
  box-sizing: border-box;
  display: inline-flex;
}

.search-header-left {
  flex-basis: 80%;
}

.search-header-right {
  flex-basis: 20%;
}

.status-container {
  padding: 20px 10px 10px 10px;
  text-align: center;
  color: #1c1c1c;
  font-size: 16px;
}

#search-results {
  padding: 10px 20px 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>



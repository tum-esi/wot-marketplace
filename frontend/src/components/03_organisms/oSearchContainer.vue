<template>
  <div>
    <!-- Search bar & new project button -->
    <div class="search-header">
      <mSearchbar class="search-header-left" v-on:search-btn-clicked="searchBtnClicked"/>
      <div class="search-header-right">
        <aButton
          :btnLabel="'New Project'"
          :btnOnClick="'add-project-btn-clicked'"
          :btnClass="'search-btn btn-right'"
          v-on:add-project-btn-clicked="projectBtnClicked"
        />
      </div>
    </div>
    <!-- Search status container -->
    <mStatus
      v-bind:class="{invisible: !loading && status != 'load'}"
      v-bind:status="status"
      v-bind:propSearchTerm="searchTerm"
    />
    <div
      class="status-container"
      v-bind:class="{invisible: status != 'noResult'}"
    >There are no projects for "{{ searchTerm }}"</div>
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
import mStatus from "@/components/02_molecules/mStatus.vue";
import mProjectItem from "@/components/02_molecules/mProjectItem.vue";

import fetch from "node-fetch";

export default {
  name: "oSearchContainer",
  components: {
    aButton,
    mProjectItem,
    mSearchbar,
    mStatus
  },
  data() {
    return {
      searchTerm: "",
      loading: false,
      status: "",
      projects: [],
      err: undefined
    };
  },
  methods: {
    searchBtnClicked(searchTerm) {
      this.searchTerm = searchTerm;
      this.status = "load";
      this.loading = true;
      this.projects = [
        {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {}
        }
      ];
      this.loading = false;
      this.status = "";
    },
    projectBtnClicked() {
      this.$router.push({
        name: "AddProject"
      });
    },
    projectItemClicked(clickedProject) {
      this.$router.push({
        name: "Project",
        params: { project: { clickedProject } }
      });
    }
  }
};
</script>

<style scoped>
.search-header {
  width: 100%;
  padding: 20px 20px 10px 20px;
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
  padding: 10px;
  text-align: center;
}

#search-results {
  padding: 10px 20px 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>



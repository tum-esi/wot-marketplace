<template>
  <div>
    <SearchBar
      v-on:search-btn-clicked="searchBtnClicked"
      v-on:add-project-btn-clicked="projectBtnClicked"
    />
    <Status
      v-bind:class="{invisible: !loading && status != 'load'}"
      v-bind:status="status"
      v-bind:propSearchTerm="searchTerm"
    />
    <div
      class="status-container"
      v-bind:class="{invisible: status != 'noResult'}"
    >There are no projects for "{{ searchTerm }}"</div>
    <SearchResults v-bind:projects="projects" v-on:project-item-clicked="projectItemClicked"/>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Status from "./Status.vue";
import SearchResults from "./SearchResults.vue";
import fetch from "node-fetch";
import ProjectItemVue from "./ProjectItem.vue";

export default {
  name: "SearchContainer",
  components: {
    SearchBar,
    Status,
    SearchResults
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
      this.projects = [];
      fetch(
        `../../api/search?q=${encodeURIComponent(
          this.searchTerm
        )}&count=10`
      )
        .then(res => res.json())
        .then(json => {
          this.loading = false;
          this.status = "";
          this.projects = json.results;
          if (this.projects.length === 0) {
            this.status = "noResult";
          }
          console.log("results", json.results);
        })
        .catch(err => {
          this.status = "error";
          this.error = err;
        });
    },
    projectBtnClicked() {
      this.$router.push({
        name: "AddProject"
      });
    },
    projectItemClicked(clickedProject) {
      //TODO: don't pass data with routes use data store instead
      this.$router.push({
        name: "Project",
        params: { project: { clickedProject } }
      });
    }
  }
};
</script>

<style scoped>
.status-container {
  padding: 10px;
  text-align: center;
}
</style>



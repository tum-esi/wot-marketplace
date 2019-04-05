<template>
  <div>
    <button>Add New Project + </button>
    <SearchBar v-on:search-btn-clicked="searchBtnClicked"/>
    <SearchResults v-bind:projects="projects" v-on:project-item-clicked="projectItemClicked"/>
  </div>
</template>

<script>
let fetch = require('node-fetch');
import SearchBar from "./SearchBar.vue";
import SearchResults from "./SearchResults.vue";

export default {
  name: "SearchContainer",
  components: {
    SearchBar,
    SearchResults
  },
  data() {
    return {
      searchTerm: '',
      searching: false,
      projects: [
        // {
        //   id: 1,
        //   name: "SenseHat",
        //   description: "randomDescription",
        //   platform: "platform-raspberry",
        //   tags: ["raspberry", "embedded"],
        //   easy: true
        // },
        // {
        //   id: 2,
        //   name: "MeArmPi",
        //   description: "randomDescription",
        //   platform: "platform-raspberry",
        //   tags: ["raspberry", "robotics"],
        //   easy: false
        // },
        // {
        //   id: 3,
        //   name: "SimpleSensor",
        //   description: "randomDescription",
        //   platform: "platform-raspberry",
        //   tags: ["sensor"],
        //   easy: true
        // }
      ]
    };
  },
  methods: {
      searchBtnClicked(searchTerm) {
          console.log('searchTerm: ', searchTerm);
          this.searchTerm = searchTerm;
          this.searching = true;
          fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.searchTerm)}&limit=10&media=music`)
          .then( res => res.json())
          .then( json => {
            this.searching = false;
            this.projects = json.results;
            console.log('results', json.results);
          })

          fetch('https://jsonplaceholder.typicode.com/todos')
          .then( res => res.json())
          .then( json => {
            console.log('result:', json);
          });
      },
      projectItemClicked(id) {
          console.log('no id:', id);
      }
  },
  created() {
    // https://jsonplaceholder.typicode.com/todos
  }
};
</script>

<style scoped>
</style>



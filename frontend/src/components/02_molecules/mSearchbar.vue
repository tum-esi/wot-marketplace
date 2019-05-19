<template>
  <div class="search-bar-container">
    <input
      v-model="searchTerm"
      type="search"
      id="search-bar"
      placeholder="Search WoTify library"
      @keyup.enter="searchBtnClicked"
    >
    <aButton
      :btnLabel="'Search'"
      :btnOnClick="'search-btn-clicked'"
      :btnClass="'search-btn'"
      v-on:search-btn-clicked="searchBtnClicked"
    />
  </div>
</template>

<script>
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";

export default Vue.extend({
  name: "mSearchbar",
  components: {
    aButton
  },
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    searchBtnClicked() {
      this.$emit("search-btn-clicked", this.searchTerm);
    }
  }
});
</script>

<style scoped>
#search-bar {
  width: 50%;
  height: 50px;
  border: 3px solid #000;
  padding: 10px;
  border-radius: 3px;
  outline: none;
  color: #000;
  vertical-align: top;
  margin-right: 10px;
  font-size: 20px;
}

#search-bar:focus {
  color: #30b8a3;
}

#search-bar::selection {
  background-color: #30b8a3 !important;
}

.search-btn a {
  color: #fff;
}
</style>



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
  border: 3px solid #1C1C1C;
  padding: 10px;
  border-radius: 3px;
  outline: none;
  color: #1C1C1C;
  vertical-align: top;
  margin-right: 10px;
  font-size: 20px;
}

#search-bar:focus {
    box-shadow: inset 0 0 3px #25e4d4;
}

#search-bar::selection {
   background: #949494;
}

.search-btn a {
  color: #fff;
}
</style>



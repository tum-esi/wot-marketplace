<template>
  <div id="search-bar-container">
    <input
      v-model="searchTerm"
      type="search"
      id="search-bar"
      placeholder="Search WoTify library"
      @keyup.enter="$emit('search-btn-clicked', searchTerm)"
    >
    <button class="btn search-btn" @click="$emit('search-btn-clicked', searchTerm)">Search</button>
    <button class="btn search-btn btn-right" @click="$emit('add-project-btn-clicked')">New Project</button>
  </div>
</template>

<script>
// TODO: Add data store to application

export default {
  name: "SearchBar",
  data() {
    return {
      searchTerm: ""
    };
  }
};
</script>

<style scoped>
#search-bar-container {
  width: 100%;
  position: relative;
  padding: 20px 20px 10px 20px;
  box-sizing: border-box;
}

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
  color: #00b4cc;
}

.search-btn {
  vertical-align: top;
  width: 15%;
  height: 50px;
  padding: 10px;
  border: none;
}

.btn-right {
  float: right;
}

.search-btn a {
  color: #fff;
}
</style>



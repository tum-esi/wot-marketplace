<template>
  <div id="header">
    <div id="header-logo"></div>
    <div id="header-title">WoTify</div>
    <div id="header-nav-elements">
      <div id="nav-search" @click="$emit('nav-clicked', 'search')">Search</div>
      <div id="nav-about" @click="$emit('nav-clicked', 'about')">About</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
#header {
  background: #333333;
  color: #ffffff;
  padding: 10px;
}

#header-title {
  text-align: center;
}
</style>


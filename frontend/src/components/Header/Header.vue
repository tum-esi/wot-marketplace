<template>
  <ul class="header">
    <li class="header-ci-element" id="header-logo"></li>
    <li class="header-ci-element" id="header-title">
      <router-link to="/">WoTify</router-link>
    </li>
    <li class="header-nav-element"  @click="current = item.about">
      <router-link to="/about" :class="{selected:current == item.about}">About</router-link>
    </li>
    <li class="header-nav-element"  @click="current = item.search">
      <router-link to="/" :class="{selected:current == item.search}">Search</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      current: undefined,
      item: { search: "search", about: "about"}
    }
  },
  created() {
    this.current = this.item.search;
  }
};
</script>

<style scoped>
.header {
  background: #333333;
  color: #ffffff;
  padding: 20px;
  overflow: hidden;
  width: 100%;
  font-size: 20px;
}

.header li {
  list-style-type: none;
}

.header li a {
  color: #fff;
  text-decoration: none;
}

.header-ci-element {
  float: left;
}

.header-nav-element {
  float: right;
  padding: 0 10px 0 10px;
}

.header-nav-element:hover {
  background: #222222;
}

#header-title {
  text-align: center;
}

.selected {
  padding-bottom: 7px;
  border-bottom: 3px solid #fff;
}
</style>


<template>
  <ul class="header-container">
    <li v-for="(element, index) in navElements" :key="index" :class="element.linkBtnStyle">
      <aLinkButton
        :linkBtnValue="element.linkBtnValue"
        :linkBtnIsActive="(isActive(element.linkBtnValue) && $route.name === element.linkBtnValue && element.linkBtnLabel !== 'wotify') || ($route.name === 'Login' && element.linkBtnValue === 'Account') || ($route.name === 'Registration' && element.linkBtnValue === 'Account')"
        :linkBtnLabel="element.linkBtnLabel"
        :linkBtnOnClick="'nav-link-clicked'"
        v-on:nav-link-clicked="navLinkClicked"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import aLinkButton from "@/components/01_atoms/aLinkButton.vue";

export default Vue.extend({
  name: "mHeader",
  components: {
    aLinkButton
  },
  updated() {
    this.setActive(this.$route.name);
  },
  data() {
    return {
      activeItem: "home",
      navElements: [
        {
          linkBtnStyle: "header-element header-title",
          linkBtnValue: "home",
          linkBtnLabel: "wotify"
        },
        {
          linkBtnStyle: "header-nav-element",
          linkBtnValue: "Account",
          linkBtnLabel: "Account"
        },
        {
          linkBtnStyle: "header-nav-element",
          linkBtnValue: "AddProject",
          linkBtnLabel: "New Project"
        },
        {
          linkBtnStyle: "header-nav-element",
          linkBtnValue: "home",
          linkBtnLabel: "Search"
        }
      ]
    };
  },
  methods: {
    navLinkClicked(clickedLink) {
      this.setActive(clickedLink);
      this.$router.push({
        name: clickedLink
      });
    },
    setActive(navItem) {
      if (navItem === "Login" || navItem === "Registration") {
        this.activeItem = "Account";
      } else {
        this.activeItem = navItem;
      }
    },
    isActive(navItem) {
      return this.activeItem === navItem;
    }
  }
});
</script>


<style scoped>
.header-container {
  background: #1c1c1c;
  color: #000;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  font-size: 20px;
  border-bottom: 5px solid #30b8a3;
}

.header-element {
  float: left;
}

.header-nav-element {
  float: right;
  padding: 0 10px 0 10px;
}

.header-container li {
  list-style-type: none;
}

.header-container li a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  text-align: center;
}
</style>

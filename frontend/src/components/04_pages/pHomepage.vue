<template>
  <div>
    <div class="homepage container">
      <h1 class="homepage header">WoTify every<span style="color: #30b8a3">Thing</span>!</h1>
      <p
        class="homepage desc"
      >Web of Things ( WoT ) brings IoT connectivity to your devices through Web technologies. With WoTify, you can discover and use existing WoT implementations and contribute to the community.</p>
      <div class="link-wrapper">
        <div class="link about">
          <aNavLink :to="{ name: 'About' }" addClass="homepage">About</aNavLink>
        </div>
        <div class="link discover">
          <aNavLink
            :to="{ 
              name: 'Library', 
              query: {
                term: '',
                sort: 'Date',
                page: '1'
              }}"
            addClass="homepage"
          >Discover</aNavLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import aNavLink from "@/components/01_atoms/aNavLink.vue";

@Component({
  components: {
    aNavLink
  }
})
export default class pHomepage extends Vue {}
</script>

<style scoped>
.homepage {
  text-align: center;
}

.container {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  margin: 10vw;
}

.header {
  font-size: 5vw;
  font-weight: bold;
}

.desc {
  width: 50%;
}

.about {
  background: black;
}

.discover {
  background: #30b8a3;
}

.link {
  display: flex;
  width: 10vw;
  height: 3vw;
  box-shadow: 8px 8px 0 rgb(129, 120, 120);
}

.link:hover {
  opacity: 0.8;
  box-shadow: 6px 6px 0 rgb(75, 73, 73);
}

.link-wrapper { 
  display: grid;
  grid-auto-flow: column;
  gap: 4vw;
  padding: 2vw 0;
}
</style>
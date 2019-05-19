<template>
  <div class="markdown-container">
    <VueShowdown
      class="project-general-container"
      markdown="This is a project that contains the source code, description, guides etc. of the WoT System that will be used by students of ESI.
.
## General
.- Clone this repo to get the code
.- All the devices are hard coded to connect the a TD Directory at 192.168.0.100. IF using another TD Directory please change the code accordingly. 
.- Once all devices are running, you can access all the available TD by visiting the TD directory at `192.168.0.100:8080`or `TD-Directory.local:8080`
.
## Postman
.
The collections with all interactions are found under Postman and also [here](https://www.getpostman.com/collections/ad2fa98aaf79b7d1a448)

The collection documentation is available [here](https://documenter.getpostman.com/view/2152549/S17wNS8o)
"
      flavor="github"
      :options="{ emoji: true }"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueShowdown } from "vue-showdown";

export default Vue.extend({
  name: "aMarkDownBox",
  components: {
    VueShowdown
  },
  props: {
    markDown: {
      required: true
    }
  }
});
</script>

<style scoped>
.markdown-container {
  padding: 5px 10px;
}
</style>

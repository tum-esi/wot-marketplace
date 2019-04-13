<template>
<div>

<div class="project-general-container">

<!-- Replace markdown value with the readme content to be used for screenshots -->

<VueShowdown
class="project-general-container"
  markdown="
**as projectGeneral** 
# wow
* asdas"
  flavor="github"
  :options="{ emoji: true }"/>

<div class="project-general-container">{{projectGeneral}}</div>
<!-- This should be rendered as markdown in the future -->

</div>

</div>
</template>

<script>

import {VueShowdown} from 'vue-showdown'

// this.readmetry = "";

export default {
  name: "ProjectGeneral",
  props: ["projectGeneral"],
  components: {
    VueShowdown
  }
};

</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

<template>
<div>
<div class="project-general-container">

<vue-markdown>
*first one*
</vue-markdown>

<VueShowdown
  markdown="`${projectGeneral}`"
  flavor="github"
  :options="{ emoji: true }"/>

<div class="project-general-container">{{projectGeneral}}</div>
<!-- <div class="project-general-container">{{projectGeneral}}</div> -->

</div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {VueShowdown} from 'vue-showdown' 

export default {
  name: "ProjectGeneral",
  props: ["projectGeneral"],
  components: {
    VueMarkdown,
    VueShowdown
  }
  // },
  // data(){
  //   return{
  //     html = "";
  //   }
  // },
  // created() {
  //   var converter = new showdown.Converter();
  //   var text      = '# hello, markdown!';
  //   var this.html      = converter.makeHtml(text);
  // }
};


</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

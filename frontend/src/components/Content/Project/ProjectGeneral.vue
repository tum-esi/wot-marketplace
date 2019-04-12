<template>
<div>
<div class="project-general-container">
<!--<vue-markdown>

  *wow* asds \n
  *asdasd
  *asdasd
</vue-markdown>
-->
</div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
// this.getReadme("some");

export default {
  name: "ProjectGeneral",
  props: ["projectGeneral"],
  components: {
    VueMarkdown
  },
  created(){
    this.getReadme();
  },
  data() {
    return {
      download_url: "",
      readmeMD: ""
    };
  }
};
</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

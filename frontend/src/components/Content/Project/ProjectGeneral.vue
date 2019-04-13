<template>
<div>
<div class="project-general-container">
<div v-html="htmlData"></div>
<vue-markdown>
*first one from vue markdown*
</vue-markdown>

<VueShowdown
  markdown="as projectGeneral"
  flavor="github"
  :options="{ emoji: true }"/>

<div class="project-general-container">{{projectGeneral}}</div>

</div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import VueShowdown, { showdown } from 'vue-showdown'

showdown.setFlavor('github')

// Vue.use(VueShowdown) 

export default {
  name: "ProjectGeneral",
  props: ["projectGeneral"],
  components: {
    VueMarkdown,
    VueShowdown
  },
  created(){
    convert();
  },
  data(){
    return{
      markdown: '# hello'
    }
  },
  methods: {
    convert() {
        let converter = new VueShowdown.Converter(),
            text = '# hello, markdown!';
            this.htmlData = converter.makeHtml(text);
    }
  }
};


</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

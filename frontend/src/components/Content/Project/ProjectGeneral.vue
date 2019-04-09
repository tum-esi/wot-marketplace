<template>
<div>
<div class="project-general-container">
<vue-markdown 
  :emoji=true>

  *wow* asds \n
  *asdasd
  *asdasd
</vue-markdown>
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
  methods: {
    getReadme(searchTerm) {
      // this.searchTerm = searchTerm;
      // so all GitHub API requests about repo information start at this url
      this.entryPoint = "https://api.github.com/repos";
      // then you have to provide the name of the org and repo
      this.searchTerm = "/tum-ei-esi/wot-marketplace/";
      // in the end you can put readme which will return a JSON object with the url for readme in different forms
      this.readmeEndPoint = "readme";
      // this.status = "load";
      // this.loading = true;
      fetch(
        this.entryPoint+this.searchTerm+this.readmeEndPoint
      )
        .then(res => res.json())
        .then(json => {
          //html_url is what we click on as a user. To parse it you would need additional css from GitHub
          this.html_url = json.html_url;
          // download url returns raw.* files, so not rendered
          this.download_url = json.download_url;
          
          console.log("urls are", this.html_url, download_url);
        })
        .catch(err => {
          this.status = "error";
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>
.project-general-container {
  padding: 5px 10px;
}
</style>

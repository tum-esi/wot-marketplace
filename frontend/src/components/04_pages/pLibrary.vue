<template>
  <div class="library-content">
    <div class="library-content-top">
      <p
        class="library-desc"
      >Browse the wotify collection to find W3C Web of Things compliant implementations and Thing Descriptions for your devices and experience the future of IoT.</p>
      <mSearchBar />
    </div> 
    <oProjectTagContainer :projects="loadedProjects" class="library-content-btm"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Route } from "vue-router";

import mSearchBar from "@/components/02_molecules/mSearchBar.vue";
import oProjectTagContainer from "@/components/03_organisms/oProjectTagContainer.vue";

const PAGE_SIZE = 12;
const libModule = namespace("library");

@Component({
  components: {
    mSearchBar,
    oProjectTagContainer
  }
})
export default class pLibrary extends Vue {
  @libModule.Getter("getCurrentPage") pageNum!: number;
  @libModule.Getter("getLoadedProjects") loadedProjects!: object[];

  @libModule.Action("searchProjects") searchProjects!: (filters: Object) => void;
  
  async created() {
    await this.searchProjects({ page: 1, pageSize: PAGE_SIZE });
  }

  @Watch('$route')
  async onRouteChanged(to: Route){
    await this.searchProjects(to.query);
  }
}
</script>

<style scoped>
.library-desc {
  font-size: 1em;
  margin: 0.5vw 1vw;
}

.library-content {
  display: grid;
  grid-template-rows: 1fr 4fr;
}
</style>
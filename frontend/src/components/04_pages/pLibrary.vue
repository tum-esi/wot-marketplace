<template>
  <div class="library-content">
    <div class="library-content-top">
      <p
        class="library-desc"
      >Browse the wotify collection to find W3C Web of Things compliant implementations and Thing Descriptions for your devices and experience the future of IoT.</p>
      <mSearchBar />
      <mPageNavigator
        v-if="loadedProjects.length"
        :currentPage="page"
        :totalPages="totalPages"
        :getPage="getPage"
      />
    </div>
    <oProjectTagContainer :projects="loadedProjects" class="library-content-btm" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Route } from "vue-router";

import mSearchBar from "@/components/02_molecules/mSearchBar.vue";
import mPageNavigator from "@/components/02_molecules/mPageNavigator.vue";
import oProjectTagContainer from "@/components/03_organisms/oProjectTagContainer.vue";

const PAGE_SIZE = 12;
const libModule = namespace("library");

@Component({
  components: {
    mSearchBar,
    mPageNavigator,
    oProjectTagContainer
  }
})
export default class pLibrary extends Vue {
  @libModule.Getter("getPage") page!: number;
  @libModule.Getter("getTotalPages") totalPages!: number;
  @libModule.Getter("getTotalResults") totalResults!: number;
  @libModule.Getter("getTotalDocs") totalDocs!: number;
  @libModule.Getter("getLoadedProjects") loadedProjects!: object[];

  @libModule.Action("searchProjects") searchProjects!: (
    filters: Object
  ) => void;

  @Watch("$route")
  async onRouteChanged(to: Route) {
    await this.searchProjects({
      ...this.$route.query,
      pageSize: PAGE_SIZE
    });
  }

  async getPage(page: number) {
    this.$router.push({
      name: "Library",
      query: {
        ...this.$route.query,
        page: page.toString()
      }
    });
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

div.library-content-top {
  position: relative;
}
</style>
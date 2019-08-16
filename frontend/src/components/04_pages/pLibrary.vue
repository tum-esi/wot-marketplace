<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import mSearchBar from "@/components/02_molecules/mSearchBar.vue";
import mProjectContainer from "@/components/02_molecules/mProjectContainer.vue";

const authModule = namespace("authentication");

@Component
export default class pLibrary extends Vue {
  
}
</script>

<style scoped>
</style>
<template>
    <div id="search-results">
        <div class="project-item" v-for="project in projects" v-bind:key="project.id">
            <ProjectItem  v-bind:project="project" v-on:project-item-clicked="$emit('project-item-clicked', project)"/>
        </div>
    </div>
</template>

<script>
import ProjectItem from './ProjectItem.vue';

export default {
    name: 'SearchResults',
    components: {
        ProjectItem
    },    
    props: ['projects']
}
</script>

<style scoped>
#search-results {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
}
</style>



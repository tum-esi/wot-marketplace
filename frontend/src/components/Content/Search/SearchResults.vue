<template>
    <div id="search-results">
        <div class="project-item" v-for="project in projects" v-bind:key="project.id">
            <ProjectItem  v-bind:project="project" v-on:project-item-clicked="$emit('project-item-clicked', project.artistId)"/>
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
    display:flex;
}

.project-item {
    flex: 10;
}
</style>



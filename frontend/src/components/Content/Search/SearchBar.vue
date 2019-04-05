<template>
    <div id="search-bar-container">
        <input v-model="searchTerm" type="search" id="search-bar">
        <button id="search-btn" class="btn" @click="$emit('search-btn-clicked', searchTerm)">Search</button>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchTerm: ''
        }
    }
}
</script>

<style scoped>

</style>



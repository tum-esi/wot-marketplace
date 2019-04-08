<template>
    <div class="status-container">
        <div id="loading" class="">Loading...</div>
        <div id="no-result" v-bind:class="{invisible: status != 'noResult'}">There are no projects for "{{ searchTerm }}"</div>
        <div id="error" class="invisible">There was an error: {{ error }}. Please check your connection.</div>
    </div>
</template>

<script>
export default {
    name: 'Status',
    props: ['status', 'loading', 'propSearchTerm'],
    data() {
        return {
            searchTerm:'',
            error: ''
        }
    },
    created() {
        this.searchTerm = this.propSearchTerm;
    }
}
</script>

<style scoped>
    .status-container {
        text-align: center;
        padding: 10px;
    }
</style>



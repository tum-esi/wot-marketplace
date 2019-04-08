import Vue from 'vue'
import Router from 'vue-router'
import SearchContainer from './components/Content/Search/SearchContainer.vue'
import AddProject from './components/Content/Project/AddProject.vue'
import Project from './components/Content/Project/Project.vue'
import About from './components/Content/About/About.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: SearchContainer
        },
        {
            path: '/new-project',
            name: 'AddProject',
            component: AddProject
        },
        {
            path: '/project',
            name: 'Project',
            component: Project,
            props: true
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
})
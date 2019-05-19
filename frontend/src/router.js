import Vue from 'vue'
import Router from 'vue-router'
import oSearchContainer from './components/03_organisms/oSearchContainer.vue'
import pNewProject from './components/05_pages/pNewProject.vue'
import pProject from './components/05_pages/pProject.vue'
import tAbout from './components/04_templates/tAbout.vue'
import tAccount from './components/04_templates/tAccount.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: oSearchContainer
        },
        {
            path: '/new-project',
            name: 'AddProject',
            component: pNewProject
        },
        {
            path: '/project',
            name: 'Project',
            component: pProject,
            props: true
        },
        {
            path: '/about',
            name: 'About',
            component: tAbout
        },
        {
            path: '/account',
            name: 'Account',
            component: tAccount
        }
    ]
})
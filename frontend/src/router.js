import Vue from 'vue'
import Router from 'vue-router'
import oSearchContainer from './components/03_organisms/oSearchContainer.vue'
import tFormNewProject from './components/04_templates/tFormNewProject.vue'
import pProject from './components/05_pages/pProject.vue'
import tAbout from './components/04_templates/tAbout.vue'
import tAccount from './components/04_templates/tAccount.vue'
import tLogin from './components/04_templates/tLogin.vue'
import tRegistration from './components/04_templates/tRegistration.vue'

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
            component: tFormNewProject
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
        }, 
        {
            path: '/login',
            name: 'Login',
            component: tLogin
        }, 
        {
            path: '/registration',
            name: 'Registration',
            component: tRegistration
        }
    ]
})
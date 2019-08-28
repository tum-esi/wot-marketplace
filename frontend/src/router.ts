import Vue from "vue";
import Router from "vue-router";

import pAbout from "@/components/04_pages/pAbout.vue";
import pContribute from "@/components/04_pages/pContribute.vue";
import pLibrary from "@/components/04_pages/pLibrary.vue";
import pLogin from "@/components/04_pages/pLogin.vue";
import pRegister from "@/components/04_pages/pRegister.vue";
import pProfile from "@/components/04_pages/pProfile.vue";
import pProject from "@/components/04_pages/pProject.vue";
import pUser from "@/components/04_pages/pUser.vue";
import p404 from "@/components/04_pages/p404.vue";
import pEditProject from "@/components/04_pages/pEditProject.vue";
import aJsonBox from "@/components/01_atoms/aJsonBox.vue";
import aMarkdownBox from "@/components/01_atoms/aMarkdownBox.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: {
        name: "Library"
      }
    },
    {
      path: "/library",
      name: "Library",
      component: pLibrary
    },
    {
      path: "/about",
      name: "About",
      component: pAbout
    },
    {
      path: "/login",
      name: "Login",
      component: pLogin
    },
    {
      path: "/register",
      name: "Register",
      component: pRegister
    },
    {
      path: "/contribute",
      name: "Contribute",
      component: pContribute
    },
    {
      path: "/profile",
      name: "Profile",
      component: pProfile
    },
    {
      path: "/users/:id",
      name: "Users",
      component: pUser
    },
    {
      path: "/library/:name",
      component: pProject,
      children: [
        {
          path: 'general',
          name: 'Project General',
          component: aMarkdownBox
        },
        {
          path: 'thingdescription',
          name: 'Project ThingDesc',
          component: aJsonBox
        }
      ]
    },
    {
      path: "/library/:name/edit",
      name: "Project Edit",
      component: pEditProject
    },
    {
      path: "*",
      name: "404",
      component: p404
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";

import pAbout from "@/components/04_pages/pAbout.vue";
import pContribute from "@/components/04_pages/pContribute.vue";
import pLibrary from "@/components/04_pages/pLibrary.vue";
import pLogin from "@/components/04_pages/pLogin.vue";
import pRegister from "@/components/04_pages/pRegister.vue";
import pProfile from "@/components/04_pages/pProfile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
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
      path: "/users/:id",
      name: "Profile",
      component: pProfile
    }
  ]
});

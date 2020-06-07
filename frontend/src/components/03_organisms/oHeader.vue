<template>
  <div class="header-container">
    <aNavLink :to="{ name: 'Homepage' }" class="header-logo">
      <img class="header-logo-image" src="../../assets/logo.png" />
    </aNavLink>
    <mDropDown v-if="isConnected" addClass="default header-element" :closeOnClick="true">
      <template #dropDownLabel>{{ getUsername }}</template>
      <template #dropDownOptions>
        <aNavLink
          :addClass="'dropDown-element'"
          :to="{ name: 'Profile', params: { id: getUsername }}"
        >Profile</aNavLink>
        <aButton
          :addClass="'dropDown-element'"
          btnEvent="btn-logout"
          @btn-logout="requestLogout"
        >Logout</aButton>
      </template>
    </mDropDown>
    <aNavLink
      v-for="element in navElements"
      :key="element.id"
      :to="element.route"
      :class="element.class"
      :activeClass="'active'"
    >{{ element.label }}</aNavLink>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import aButton from "@/components/01_atoms/aButton.vue";
import aNavLink from "@/components/01_atoms/aNavLink.vue";
import mDropDown from "@/components/02_molecules/mDropDown.vue";

const authModule = namespace("authentication");

@Component({
  components: {
    aButton,
    aNavLink,
    mDropDown
  }
})
export default class oHeader extends Vue {
  @authModule.Getter("isConnected") isConnected!: boolean;
  @authModule.Getter("getUsername") getUsername!: string;

  @authModule.Action("logout") logout!: () => Promise<void>;

  private elements = {
    login: {
      class: "header-element",
      label: "LOGIN",
      route: {
        name: "Login"
      }
    },
    about: {
      class: "header-element",
      label: "ABOUT US",
      route: {
        name: "About"
      }
    },
    contribute: {
      class: "header-element",
      label: "CONTRIBUTE",
      route: {
        name: "Contribute"
      }
    },
    library: {
      class: "header-element",
      label: "LIBRARY",
      route: {
        name: "Library",
        query: {
          term: "",
          sort: "Date",
          page: "1"
        }
      }
    }
  };

  get navElements() {
    if (this.isConnected) {
      return [
        this.elements.about,
        this.elements.contribute,
        this.elements.library
      ];
    }
    return [this.elements.login, this.elements.about, this.elements.library];
  }

  async requestLogout() {
    await this.logout();
    this.$router.push({
      name: "Library",
      query: {
        term: "",
        sort: "Date",
        page: "1"
      }
    });
  }
}
</script>

<style scoped>
.header-container {
  background: #1c1c1c;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  height: 75px;
  border-bottom: 5px solid #30b8a3;
  margin: 0;
}

.header-logo {
  float: left;
  outline: none;
}

.header-logo-image {
  height: 45px;
  padding: 0 20px;
}

.header-logo-image:hover {
  opacity: 0.8;
}

.header-element {
  float: right;
}

.active {
  padding-bottom: 7px;
  border-bottom: 3px solid #30b8a3;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}
</style>

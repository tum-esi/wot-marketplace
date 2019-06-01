<template>
  <div v-if="isUserLoggedIn" class="account-container">
    <div>
      <div class="project-content-left">
        <h2>Projects</h2>
        <div
          v-if="implementations.length === 0"
        >You haven't contributed any implementations to WoTify yet</div>
        <div id="search-results">
          <mProjectItem
            v-for="(implementation, index) in implementations"
            :key="index"
            :projectName="implementation.name"
            :projectShortDescription="implementation.shortDescription"
            :projectPlatform="implementation.platform"
            :projectImplementationType="implementation.implementationType"
            :projectOnClick="'project-item-clicked'"
            v-on:project-item-clicked="projectItemClicked"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="project-content-right">
        <mInfoBox :title="'User Information'" :content="userInfo"/>
      </div>
      <div class="project-content-right">
        <aButton
          class="submit-text"
          :btnLabel="'Logout'"
          :btnOnClick="'logout'"
          :btnClass="'logout-btn'"
          v-on:logout="logoutBtnClicked"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import aButton from "@/components/01_atoms/aButton.vue";
import mProjectItem from "@/components/02_molecules/mProjectItem.vue";
import mInfoBox from "@/components/02_molecules/mInfoBox.vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "tAccount",
  components: {
    mProjectItem,
    mInfoBox,
    aButton
  },
  created() {
    this.checkUserLoggedIn();
  },
  data() {
    return {
      isUserLoggedIn: false,
      implementations: [],
      userInfo: [
        {
          title: "Username: ",
          type: "text",
          content: ""
        },
        {
          title: "Email: ",
          type: "text",
          content: ""
        }
      ]
    };
  },
  mounted() {
    this.getUserData();
  },
  computed: {
    ...mapGetters("user", ["getUserLoggedIn", "getCurrenUser"])
  },
  methods: {
    ...mapActions("user", ["logout"]),
    async logoutBtnClicked() {
      // await this.logout();
      this.$router.push({ name: "Login" });
    },
    projectItemClicked(clickedProject) {
      this.$router.push({
        name: "Project",
        params: { id: clickedProject }
      });
    },
    async checkUserLoggedIn() {
      this.isUserLoggedIn = await this.getUserLoggedIn;
      if (!this.isUserLoggedIn) this.$router.push({ name: "Login" });
    },
    async getUserData() {
      let currentUser = await this.getCurrenUser;
      console.log('currentUser', currentUser);
      this.implementations = currentUser.implementations;
      this.userInfo[0].content = currentUser.name;
      this.userInfo[1].content = currentUser.email;
      if (currentUser.firstName) {
        this.userInfo.push({
          title: "First Name: ",
          type: "text",
          content: currentUser.firstName
        });
      }
      if (currentUser.lastName) {
        this.userInfo.push({
          title: "Last Name",
          type: "text",
          content: currentUser.lastName
        });
      }
    }
  }
});
</script>

<style scoped>
.project-content-left {
  width: 75%;
  float: left;
  padding-top: 10px;
  position: relative;
  margin-bottom: 10px;
}
.project-content-left h2 {
  padding-left: 20px;
}

.project-content-right {
  width: 25%;
  float: right;
  padding-right: 15px;
  padding-top: 46px;
}

#search-results {
  padding: 10px 20px 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>

<template>
    <div class="account-container">
        <div>
            <div class="project-content-left">
                <h2>Implementations</h2>
                <div v-if="implementations.length === 0">
                    You haven't contributed any implementations to WoTify yet
                </div>
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
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

import mProjectItem from "@/components/02_molecules/mProjectItem.vue";
import mInfoBox from "@/components/02_molecules/mInfoBox.vue";
export default Vue.extend({
    name: "tAccount",
    components: {
        mProjectItem,
        mInfoBox
  },
  data() {
    return {
        implementations : [
        {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {}
        },
                {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {}
        },
                {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {}
        },
                {
          topic: ["actuator", "other", "sensor", "robotics"],
          tags: ["python", "sensehat"],
          _id: "5cb1c65f1c9d440000eb922d",
          name: "SenseHAT_python",
          shortDescription: "senseHAT WoT implementation in python",
          longDescription: "sit ipsum exercitation",
          github: "https://github.com/DK<~LeZK3s",
          implementationType: "code",
          platform: "arduino",
          complexity: "expert",
          td: {}
        }
      ],
      status:"noResult",
      userInfo: [
        {
          title: "Username: ",
          type: 'text',
          content: "jackblack"
        }, 
        {
          title: "Email: ", 
          type: "link",
          content: { link: "mailto:jackblack@black.com", label: "jackblack@black.com" }
        }, 
        {
          title: "First Name: ", 
          type: 'text', 
          content: "Jack"
        }, 
        {
          title: "Last Name", 
          type: "text",
          content: "Black"
        }
      ], 
    };
  },
  methods:{
    projectItemClicked(clickedProject) {
      this.$router.push({
        name: "Project",
        params: { project: { clickedProject } }
      });
    }
  }
})
</script>

<style scoped>

.project-content-left {
  width: 75%;
  float: left;
  padding-top: 10px;
  position: relative;
  margin-bottom: 10px;
}
.project-content-left h2{
    padding-left: 20px;
}

.project-content-right {
  width: 25%;
  float: right;
  padding-right: 20px;
  padding-top: 46px;
}

#search-results {
  padding: 10px 20px 10px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

</style>

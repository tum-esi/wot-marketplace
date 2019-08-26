<template>
  <div class="profile-container">
    <div class="user-profile">
      <div>
        <h1 class="user-profile-header">Your Profile</h1>
        <aButton
          v-if="!editMode"
          btnEvent="edit-btn-clicked"
          @edit-btn-clicked="editMode = true"
          addClass="user-profile-edit"
        >Edit</aButton>
        <aButton
          v-else
          btnEvent="confirm-edit-clicked"
          @confirm-edit-clicked="confirmProfileEdit"
          addClass="user-profile-edit"
        >Confirm</aButton>
        <p v-if="errorMessage !== ''" class="error-message">{{ errorMessage }}</p>
        <p v-if="validationMessage !== ''" class="validation-message">{{ validationMessage }}</p>
        <div class="user-profile-fields">
          <aLabel class="user-input-label">Name :</aLabel>
          <div class="user-input-fields">
            <aInput
              inputType="text"
              placeholder="Last Name"
              v-model="profileFields.lastName"
              addClass="user-profile-input"
              :isDisabled="!editMode"
              @keyup.native="resetMessage"
            />
            <aInput
              inputType="text"
              placeholder="First Name"
              v-model="profileFields.firstName"
              addClass="user-profile-input"
              :isDisabled="!editMode"
              @keyup.native="resetMessage"
            />
          </div>
        </div>
        <div class="user-profile-fields">
          <aLabel class="user-input-label">Email :</aLabel>
          <div class="user-input-fields">
            <aInput
              inputType="text"
              placeholder="Email"
              v-model="profileFields.email"
              addClass="user-profile-input"
              :isDisabled="!editMode"
              @keyup.native="resetMessage"
            />
          </div>
        </div>
      </div>
      <div style="margin: auto">
        <aButton
          v-if="!passwordChange"
          btnEvent="password-change-clicked"
          @password-change-clicked="passwordChange = true"
          addClass="password-change-form"
        >Change Password</aButton>
        <oForm
          v-else
          :formFields="passwordFormFields"
          buttonLabel="Confirm"
          :submitFunction="confirmPasswordChange"
          addClass="password-change-form"
          @keyup.native="resetMessage"
        />
      </div>
    </div>
    <div class="user-contributions">
      <div style="position: relative">
        <h1 class="user-profile-header">Your Contributions</h1>
        <mPageNavigator
          v-if="loadedProjects.length"
          :currentPage="page"
          :totalPages="totalPages"
          :getPage="getPage"
        />
      </div>
      <oProjectTagContainer
        v-if="loadedProjects.length"
        :projects="loadedProjects"
        addClass="user-contributions"
      />
      <p v-else style="text-align: center">You have not yet contributed any projects to WoTify.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

import aButton from "@/components/01_atoms/aButton.vue";
import aLabel from "@/components/01_atoms/aLabel.vue";
import aInput from "@/components/01_atoms/aInput.vue";
import mFormElement from "@/components/02_molecules/mFormElement.vue";
import mPageNavigator from "@/components/02_molecules/mPageNavigator.vue";
import oProjectTagContainer from "@/components/03_organisms/oProjectTagContainer.vue";
import oForm from "@/components/03_organisms/oForm.vue";

import { getUser, editUser } from "@/api";

const PAGE_SIZE = 10;
const libModule = namespace("library");
const authModule = namespace("authentication");

@Component({
  components: {
    aLabel,
    aInput,
    aButton,
    mFormElement,
    mPageNavigator,
    oProjectTagContainer,
    oForm
  }
})
export default class pProfile extends Vue {
  @libModule.Getter("getPage") page!: number;
  @libModule.Getter("getTotalPages") totalPages!: number;
  @libModule.Getter("getLoadedProjects") loadedProjects!: object[];

  @libModule.Action("searchProjects") searchProjects!: (
    filters: Object
  ) => void;

  @authModule.Getter("getToken") userToken!: string;
  @authModule.Getter("getUsername") username!: string;

  private editMode: boolean = false;
  private passwordChange: boolean = false;

  private errorMessage: string = "";
  private validationMessage: string = "";

  private userId: string = "";

  private profileFields: { [key: string]: string } = {
    username: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  private passwordFormFields = [
    {
      type: "password",
      label: "Old Password",
      variable: "old"
    },
    {
      type: "password",
      label: "New Password",
      variable: "new"
    },
    {
      type: "password",
      label: "Confirm Password",
      variable: "confirm"
    }
  ];

  async confirmProfileEdit() {
    let response = await editUser(
      this.username,
      this.profileFields,
      this.userToken
    );
    if (response.status === 200) {
      this.validationMessage = "Changes are saved.";
      this.editMode = false;
      return;
    }
    this.errorMessage = response.data.message;
  }

  async confirmPasswordChange(formData: { [key: string]: string }) {
    if (!formData.new && !formData.old && !formData.confirm) {
      this.passwordChange = false;
      return;
    }
    if (formData.new === formData.confirm) {
      let response = await editUser(
        this.username,
        {
          password: {
            old: formData.old,
            new: formData.new
          }
        },
        this.userToken
      );
      if (response.status === 200) {
        this.validationMessage = "Password is succesfully changed.";
        this.passwordChange = false;
      } else {
        this.errorMessage = "Old password is incorrect.";
      }
    } else {
      this.errorMessage = "Passwords do not match.";
    }
  }

  resetMessage() {
    this.errorMessage = "";
    this.validationMessage = "";
  }

  async getPage(page: number) {
    this.searchProjects({
      author: this.userId,
      pageSize: PAGE_SIZE,
      sort: "Date",
      page: page.toString()
    });
  }

  async created() {
    let response = await getUser(this.username, this.userToken);
    if (response.status === 200) {
      let profile: {[key: string]: string} = response.data;
      this.userId = profile._id;
      for (var elem in this.profileFields) {
        this.profileFields[elem] = profile[elem];
      }
      this.getPage(1);
    } // TODO: error handling
  }
}
</script>

<style scoped>
div.profile-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
}

div.user-profile {
  background: white;
  display: grid;
  grid-template-rows: 60% 40%;
  position: relative;
  margin: 10px;
  border: 2px solid black;
  border-radius: 15px;
}

div.user-profile-fields {
  display: grid;
  grid-template-columns: 4vw 20vw;
  gap: 1vw;
  margin: 10px;
  font-size: 1.2em;
}

.user-profile-header {
  text-align: center;
}

.user-input-fields {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: 5px;
}

.user-profile-edit {
  position: absolute;
  top: 10px;
  right: 10px;
}

.user-input-label {
  margin: auto 0;
  text-align: right;
}
</style>
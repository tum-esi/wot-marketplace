<template>
  <div>
    <form @submit="addProject">
      <input type="text" v-model="name" placeholder="Name">
      <input type="submit" value="Submit" id="btn-add-new-project">
    </form>
  </div>
</template>

<script>
import uuid from "uuid";

export default {
  name: "AddProject",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    addProject(event) {
      event.preventDefault();
      const newProject = {
        id: uuid.v4(),
        name: this.name
      };
      this.$emit("add-project", newProject);
      // Clear form
      this.name = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

input[type="submit"] {
  flex: 2;
}
</style>



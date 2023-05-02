<template>
  <v-container>
    <v-row>
      <v-col v-for="user in users" :key="user._id">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: 'Home',
  data() {
    return {
      users: []
    }
  },
  async created() {
    this.users = await API.getAllUsers()
  }
}
</script>

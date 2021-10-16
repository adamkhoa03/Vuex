<template>
  <div class="navbar">
    <h1>My vuex App Todos</h1>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li v-if="auth.isAuthenticated">
        Total: {{ todos.length }} <button @click="loginLogout">Logout</button>
      </li>
      <li v-else><button @click="loginLogout">Login</button></li>
      <TodoAdd/>
      <li><button @click="refreshPage">ReNew</button></li>
      
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TodoAdd from "./TodoAdd.vue"

export default {
  name: "Navbar",
    components: {TodoAdd},
  computed: mapState(["todos", "auth"]),
  methods: {
    ...mapActions(["loginLogout"]),
    refreshPage: function() {
      window.location.reload();
    }
  }
};
</script>

<style>
.navbar {
  padding: 5px;
  text-align: center;
  background: rgb(240, 240, 240);
  color: black;
}

.navbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
}
</style>

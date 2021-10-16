<template>
  <p v-if="isAuthenticated">Progress: {{ progressTodos }}%</p>
</template>

<script>
export default {
  name: "ProgressBar",
  computed: {
    progressTodos: function() {
      return this.$store.getters.progress
    },
    isAuthenticated: function() {
      return this.$store.state.auth.isAuthenticated;
    }
  }
};
</script>

<style></style>

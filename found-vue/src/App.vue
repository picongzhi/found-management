<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwtDecode from "jwt-decode"

export default {
  name: "App",
  methods: {
    isEmpty(val) {
      return (
        val === undefined ||
        val === null ||
        (typeof val === "object" && Object.keys(val).length == 0) ||
        (typeof val === "string" && val.trim().length === 0)
      )
    }
  },
  created() {
    const token = localStorage.getItem("token")
    if (token) {
      const user = jwtDecode(token)
      this.$store.dispatch("setAuthenticated", !this.isEmpty(user))
      this.$store.dispatch("setUser", user)
    }
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>

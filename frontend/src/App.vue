<template>
  <div id="app">
    <Header />
    <Menu :hideUserDropdown="!user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

import { baseApiUrl, userKey } from "./global";

import Header from "./components/templates/Header.vue";
import Menu from "./components/templates/Menu.vue";
import Loading from "./components/templates/Loading.vue";
import Content from "./components/templates/Content.vue";
import Footer from "./components/templates/Footer.vue";

export default {
  name: "App",
  components: { Header, Menu, Loading, Content, Footer },
  computed: mapState(["user"]),
  data: function () {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 50px 50px 1fr 50px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu menu"
    "content content"
    "footer footer";
}

@media (max-width: 655px) {
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 70px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      "header header"
      "menu content"
      "menu footer";
  }
}
</style>

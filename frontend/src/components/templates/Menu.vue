<template>
  <aside class="menu">
    <nav class="menu-dropdown">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li>
          Tabela do Brasileirão
          <ul>
            <li><router-link to="/brserieateams">Série A</router-link></li>
            <li><router-link to="/brseriebteams">Série B</router-link></li>
          </ul>
        </li>
        <li><router-link to="/about">Sobre</router-link></li>
        <li v-if="!user && hideUserDropdown"><router-link to="/auth">Login</router-link></li>
      </ul>
    </nav>
    <UserDropdown v-if="!hideUserDropdown" />
  </aside>
</template>

<script>
import { mapState } from "vuex";

import UserDropdown from "./UserDropdown.vue";

export default {
  name: "Menu",
  components: { UserDropdown },
  props: {
    hideUserDropdown: Boolean,
  },
  computed: mapState(["user"]),
};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: #0a873a;

  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-dropdown {
  background-color: #0a873a;
  padding: 0 20px;
}

.menu-dropdown ul {
  list-style: none;
}

.menu-dropdown ul li {
  background-color: #0a873a;
  color: #fff;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  float: left;
  font-size: 16px;
  position: relative;
  text-transform: uppercase;
  font-weight: bold;
}

.menu-dropdown ul li:hover {
  cursor: pointer;
  opacity: 2;
  background: #065826;
  color: #000;
}

.menu-dropdown ul li a {
  text-decoration: none;
  color: #fff;
}

.menu-dropdown ul li a:hover {
  color: #000;
}

.menu-dropdown ul li ul {
  margin-left: -40px;
}

.menu-dropdown ul ul {
  display: none;
  margin: 0px;
}

.menu-dropdown ul li:hover > ul {
  display: block;
}
</style>
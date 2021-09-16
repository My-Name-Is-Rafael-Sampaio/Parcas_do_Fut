<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="../../assets/logos/logoII.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>
      <input type="text" name="name" v-if="showSignup" v-model="user.name" placeholder="Nome" />
      <input type="text" name="email" v-model="user.email" placeholder="E-mail" />
      <input type="password" name="password" v-model="user.password" placeholder="Senha" />
      <input type="password" name="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirme a Senha" />
      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>
      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { baseApiUrl, showError, userKey } from "../../global";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background: linear-gradient(
    0deg,
    rgba(13, 91, 43, 1) 24%,
    rgba(253, 187, 45, 1) 76%
  );
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid rgb(0, 0, 0);
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: center;
  background-color: #fff;
  color: #2460ae;
  padding: 5px 15px;
  border-radius: 5px;
  border-color: #2460ae;
}

.auth-modal button:hover {
  background-color: #2460ae;
  color: #fff;
}

.auth-modal a {
  margin-top: 35px;
  text-decoration: none;
  color: #fff;
}

.auth-modal a:hover {
  color: #fff;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-color: rgb(255, 255, 255);
}
</style>
<template>
  <div class="brseriebteam-admin">
    <b-form>
      <input id="brseriebteam-id" type="hidden" v-model="brseriebteam.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Posição:" label-for="brseriebteam-position">
            <b-form-input id="brseriebteam-position" type="number" v-model="brseriebteam.position" required :readonly="mode === 'remove'" placeholder="Informe a posição do time..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="brseriebteam-name">
            <b-form-input id="brseriebteam-name" type="text" v-model="brseriebteam.name" required :readonly="mode === 'remove'" placeholder="Informe o nome do time..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
         <b-col md="6" sm="12" v-show="mode === 'save'">
          <b-form-group label="Pontos:" label-for="brseriebteam-pts">
            <b-form-input id="brseriebteam-pts" type="number" v-model="brseriebteam.pts" required placeholder="Informe a pontuação do time..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Partida(s) Jogada(s):" label-for="brseriebteam-pj">
            <b-form-input id="brseriebteam-pj" type="number" v-model="brseriebteam.pj" required placeholder="Informe quanta(s) partida(s) o time jogou..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Vitória(s):" label-for="brseriebteam-vit">
            <b-form-input id="brseriebteam-vit" type="number" v-model="brseriebteam.vit" required placeholder="Informe quanta(s) partida(s) o time ganhou..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Empate(s):" label-for="brseriebteam-e">
            <b-form-input id="brseriebteam-e" type="number" v-model="brseriebteam.e" required placeholder="Informe quanta(s) partida(s) o time empatou..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Gol(s) a favor:" label-for="brseriebteam-gp">
            <b-form-input id="brseriebteam-gp" type="number" v-model="brseriebteam.gp" required placeholder="Informe quanto(s) gol(s) o time marcou..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Derrota(s):" label-for="brseriebteam-der">
            <b-form-input id="brseriebteam-der" type="number" v-model="brseriebteam.der" required placeholder="Informe quanta(s) partida(s) o time perdeu..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Gol(s) contra:" label-for="brseriebteam-gc">
            <b-form-input id="brseriebteam-gc" type="number" v-model="brseriebteam.gc" required placeholder="Informe quanto(s) gol(s) o time sofreu..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Saldo de gol:" label-for="brseriebteam-sg">
            <b-form-input id="brseriebteam-sg" type="number" v-model="brseriebteam.sg" required placeholder="Informe o saldo de gol do time..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button class="ml-2" variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="ml-2" @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="brseriebteams" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadBrseriebteam(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadBrseriebteam(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

import { baseApiUrl, showError } from "../../global";

export default {
  name: "BrSerieBTeamAdmin.vue",
  data: function () {
    return {
      mode: "save",
      brseriebteam: {},
      brseriebteams: [],
      fields: [
        { key: "position", label: "Posição", sortable: true },
        { key: "name", label: "Time" },
        { key: "pts", label: "Pts" },
        { key: "pj", label: "PJ" },
        { key: "vit", label: "VIT" },
        { key: "e", label: "E" },
        { key: "der", label: "DER" },
        { key: "gp", label: "GP" },
        { key: "gc", label: "GC" },
        { key: "sg", label: "SG" },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadBrseriebteams() {
      const url = `${baseApiUrl}/brseriebteams`;
      axios.get(url).then((res) => {
        this.brseriebteams = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.brseriebteam = {};
      this.loadBrseriebteams();
    },
    save() {
      const method = this.brseriebteam.id ? "put" : "post";
      const id = this.brseriebteam.id ? `/${this.brseriebteam.id}` : "";
      axios[method](`${baseApiUrl}/brseriebteams${id}`, this.brseriebteam)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.brseriebteam.id;
      axios.delete(`${baseApiUrl}/brseriebteams/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadBrseriebteam(brseriebteam, mode = "save") {
      this.mode = mode;
      this.brseriebteam = { ...brseriebteam };
    },
  },
  mounted() {
    this.loadBrseriebteams();
  }
};
</script>

<style>
</style>
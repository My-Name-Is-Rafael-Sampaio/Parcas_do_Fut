<template>
  <div class="brserieateam-admin">
    <b-form>
      <input id="brserieateam-id" type="hidden" v-model="brserieateam.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Posição:" label-for="brserieateam-position">
            <b-form-input id="brserieateam-position" type="number" v-model="brserieateam.position" required :readonly="mode === 'remove'" placeholder="Informe a posição do time..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="brserieateam-name">
            <b-form-input id="brserieateam-name" type="text" v-model="brserieateam.name" required :readonly="mode === 'remove'" placeholder="Informe o nome do time..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
         <b-col md="6" sm="12" v-show="mode === 'save'">
          <b-form-group label="Pontos:" label-for="brserieateam-pts">
            <b-form-input id="brserieateam-pts" type="number" v-model="brserieateam.pts" required placeholder="Informe a pontuação do time..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Partida(s) Jogada(s):" label-for="brserieateam-pj">
            <b-form-input id="brserieateam-pj" type="number" v-model="brserieateam.pj" required placeholder="Informe quanta(s) partida(s) o time jogou..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Vitória(s):" label-for="brserieateam-vit">
            <b-form-input id="brserieateam-vit" type="number" v-model="brserieateam.vit" required placeholder="Informe quanta(s) partida(s) o time ganhou..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Empate(s):" label-for="brserieateam-e">
            <b-form-input id="brserieateam-e" type="number" v-model="brserieateam.e" required placeholder="Informe quanta(s) partida(s) o time empatou..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Gol(s) a favor:" label-for="brserieateam-gp">
            <b-form-input id="brserieateam-gp" type="number" v-model="brserieateam.gp" required placeholder="Informe quanto(s) gol(s) o time marcou..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Derrota(s):" label-for="brserieateam-der">
            <b-form-input id="brserieateam-der" type="number" v-model="brserieateam.der" required placeholder="Informe quanta(s) partida(s) o time perdeu..." />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Gol(s) contra:" label-for="brserieateam-gc">
            <b-form-input id="brserieateam-gc" type="number" v-model="brserieateam.gc" required placeholder="Informe quanto(s) gol(s) o time sofreu..." />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Saldo de gol:" label-for="brserieateam-sg">
            <b-form-input id="brserieateam-sg" type="number" v-model="brserieateam.sg" required placeholder="Informe o saldo de gol do time..." />
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
    <b-table hover striped :items="brserieateams" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadBrserieateam(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadBrserieateam(data.item, 'remove')">
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
  name: "BrSerieATeamAdmin.vue",
  data: function () {
    return {
      mode: "save",
      brserieateam: {},
      brserieateams: [],
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
    loadBrserieateams() {
      const url = `${baseApiUrl}/brserieateams`;
      axios.get(url).then((res) => {
        this.brserieateams = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.brserieateam = {};
      this.loadBrserieateams();
    },
    save() {
      const method = this.brserieateam.id ? "put" : "post";
      const id = this.brserieateam.id ? `/${this.brserieateam.id}` : "";
      axios[method](`${baseApiUrl}/brserieateams${id}`, this.brserieateam)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.brserieateam.id;
      axios.delete(`${baseApiUrl}/brserieateams/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadBrserieateam(brserieateam, mode = "save") {
      this.mode = mode;
      this.brserieateam = { ...brserieateam };
    },
  },
  mounted() {
    this.loadBrserieateams();
  }
};
</script>

<style>
</style>
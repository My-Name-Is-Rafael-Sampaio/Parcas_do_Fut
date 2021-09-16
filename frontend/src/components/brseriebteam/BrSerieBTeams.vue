<template>
  <div class="brseriebteams">
    <PageTitle icon="fa fa-table" main="Tabela do Brasileirão Série B" sub="Oferecimento Pliqueres Blade" />
    <div class="teams-table">
      <b-table hover striped :items="brseriebteams" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { baseApiUrl } from "../../global";

import PageTitle from "../templates/PageTitle.vue";

export default {
  name: "BrSerieBTeam",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
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
      ],
    };
  },
  methods: {
    loadBrseriebteams() {
      const url = `${baseApiUrl}/brseriebteams`;
      axios(url).then((res) => {
        this.brseriebteams = res.data;
      });
    },
  },
  mounted() {
    this.loadBrseriebteams();
  },
};
</script>

<style>
</style>
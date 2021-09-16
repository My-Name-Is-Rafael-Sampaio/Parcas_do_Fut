<template>
  <div class="brserieateams">
    <PageTitle icon="fa fa-table" main="Tabela do Brasileirão Série A" sub="Oferecimento Pliqueres Blade" />
    <div class="teams-table">
      <b-table hover striped :items="brserieateams" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { baseApiUrl } from "../../global";

import PageTitle from "../templates/PageTitle.vue";

export default {
  name: "BrSerieATeam",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
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
      ],
    };
  },
  methods: {
    loadBrserieateams() {
      const url = `${baseApiUrl}/brserieateams`;
      axios(url).then((res) => {
        this.brserieateams = res.data;
      });
    },
  },
  mounted() {
    this.loadBrserieateams();
  },
};
</script>

<style>
.teams-table {
  background-color: #fff;
}
</style>
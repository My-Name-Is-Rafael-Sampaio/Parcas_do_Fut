<template>
  <div class="notice-admin">
    <b-form>
      <input id="notice-id" type="hidden" v-model="notice.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="notice-name">
            <b-form-input id="notice-name" type="text" v-model="notice.name" required :readonly="mode === 'remove'" placeholder="Informe o Nome da Notícia" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="aticle-description">
            <b-form-input id="notice-description" type="text" v-model="notice.description" required :readonly="mode === 'remove'" placeholder="Informe o Descrição da Notícia" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Imagem (URL):" label-for="notice-imageUrl">
            <b-form-input id="notice-imageUrl" type="text" v-model="notice.imageUrl" required placeholder="Informe a URL da Imagem" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Autor:" label-for="notice-userId">
            <b-form-select id="notice-userId" :options="users" v-model="notice.userId" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Conteúdo:" label-for="notice-content">
            <VueEditor id="notice-content" v-model="notice.content" required placeholder="Informe o Conteúdo da Notícia" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="ml-2" @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="notices" :fields="fields">
      <template slot="cell(actions)" slot-scope="data">
        <b-button variant="warning" @click="loadNotice(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadNotice(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";

import { baseApiUrl, showError } from "../../global";

export default {
  name: "NoticeAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      notice: {},
      notices: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome" },
        { key: "description", label: "Descrição" },
        { key: "userId", label: "Autor" },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadNotices() {
      const url = `${baseApiUrl}/notices?page=${this.page}`;
      axios.get(url).then((res) => {
        this.notices = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.notice = {};
      this.loadNotices();
    },
    save() {
      const method = this.notice.id ? "put" : "post";
      const id = this.notice.id ? `/${this.notice.id}` : "";
      axios[method](`${baseApiUrl}/notices${id}`, this.notice)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.notice.id;
      axios.delete(`${baseApiUrl}/notices/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadNotice(notice, mode = "save") {
      this.mode = mode;
      axios.get(`${baseApiUrl}/notices/${notice.id}`).then((res) => {
        this.notice = res.data;
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url)
        .then((res) => {
          this.users = res.data.data.map((user) => {
            return { value: user.id, text: `${user.name} - ${user.email}` };
          });
        });
    },
  },
  watch: {
    page() {
      this.loadNotices();
    },
  },
  mounted() {
    this.loadNotices();
    this.loadUsers();
  },
};
</script>

<style>
</style>
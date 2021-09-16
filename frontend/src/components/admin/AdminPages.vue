<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Br Série A" active>
            <BrSerieATeamAdmin />
          </b-tab>
           <b-tab title="Br Série B">
            <BrSerieBTeamAdmin />
          </b-tab>
           <b-tab title="Notícias">
            <NoticeAdmin />
          </b-tab>
           <b-tab title="Usuários">
            <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div class="admin-pages-tabs"></div>
  </div>
</template>

<script>
import BrSerieATeamAdmin from "./BrSerieATeamAdmin.vue";
import BrSerieBTeamAdmin from "./BrSerieBTeamAdmin.vue";
import NoticeAdmin from "./NoticeAdmin.vue";
import PageTitle from "../templates/PageTitle.vue";
import UserAdmin from "./UserAdmin.vue";

export default {
  name: "AdminPages",
  components: {
    BrSerieATeamAdmin,
    BrSerieBTeamAdmin,
    NoticeAdmin,
    PageTitle,
    UserAdmin,
  },
};
</script>

<style>
</style>
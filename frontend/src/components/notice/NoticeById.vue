<template>
  <div class="notice-by-id">
    <PageTitle icon="fa fa-file-o" :main="notice.name" :sub="notice.description" />
    <div class="notice-content" v-html="notice.content"></div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";

import PageTitle from "../templates/PageTitle.vue";

export default {
  name: "NoticeById",
  components: { PageTitle },
  data: function () {
    return {
      notice: {},
    };
  },
  mounted() {
    const url = `${baseApiUrl}/notices/${this.$route.params.id}`;
    axios.get(url).then((res) => (this.notice = res.data));
  },
};
</script>

<style>
.notice-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.notice-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #1e1e1e;
  color: #fff;
}

.notice-content img {
  max-width: 100%;
}

.notice-content :last-child {
  margin-bottom: 0px;
}
</style>
<template>
  <div class="notice-views">
    <ul>
      <li v-for="notice in notices" :key="notice.id">
        <NoticeItem :notice="notice" />
      </li>
    </ul>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" align="center" />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../global";

import NoticeItem from "./NoticeItem.vue";

export default {
  name: "NoticeViews",
  components: { NoticeItem },
  data: function () {
    return {
      notices: [],
      page: 1,
      limit: 0,
      count: 0,
    };
  },
  methods: {
    getNotices() {
      const url = `${baseApiUrl}/notices?page=${this.page}`;
      axios(url).then((res) => {
        this.notices = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
  },
  watch: {
    page() {
      this.getNotices();
    },
  },
  mounted() {
    this.getNotices();
  },
}
</script>

<style>
.notice-views ul {
  list-style-type: none;
  padding: 0px;
}

.notice-views .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>
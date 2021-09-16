<template>
  <div class="notice-item">
    <router-link :to="{ name: 'noticeById', params: { id: notice.id } }">
      <div class="notice-item-image d-none d-sm-block">
        <img v-if="notice.imageUrl" :src="notice.imageUrl" height="150" width="150" alt="notice" />
        <img v-else src="../../assets/defaults_images/notice.png" height="150" width="150" alt="notice" />
      </div>
      <div class="notice-item-info">
        <h2>{{ notice.name }}</h2>
        <p>{{ notice.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NoticeItem",
  props: ["notice"],
};
</script>

<style>
.notice-item {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.notice-item a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.notice-item-info h2 {
  font-size: 1.7rem;
}

.notice-item-image {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.notice-item-image img {
  border-radius: 5px;
}

.notice-item-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.notice-item-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
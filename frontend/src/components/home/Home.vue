<template>
  <div class="home">
    <div class="titulo">
      <h1>Últimas Notícias</h1>
    </div>
    <hr />
    <NoticeViews />
  </div>
</template>

<script>
import NoticeViews from "../notice/NoticeViews.vue";

export default {
  name: "Home",
  components: { NoticeViews }
};
</script>

<style>
.home {
  margin: 0;
  padding: 0;
}

.titulo {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3.5rem;
  color: rgb(0, 0, 0);
  font-weight: 100;
  flex-grow: 1;
  white-space: nowrap;
}

.titulo h1 {
  text-align: center;
}

.home hr {
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0);
}
</style>
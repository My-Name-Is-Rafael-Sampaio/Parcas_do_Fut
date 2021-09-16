<template>
  <div class="page-title">
    <h1><i v-if="icon" :class="icon"></i>{{ main }}</h1>
    <h2>{{ sub }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"],
};
</script>

<style>
.page-title h1 {
  color: rgb(0, 0, 0);
  margin: 0px;
}

.page-title h2 {
  color: rgb(0, 0, 0);
  margin-top: 5px;
  font-size: 1.3rem;
}

.page-title hr {
  width: 100%;
  height: 1px;
  background-color: rgb(0, 0, 0);
}
</style>
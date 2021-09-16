<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
.content {
  grid-area: content;
  padding: 20px;

  background-image: url(../../assets/backgrounds/backgroundI.jpg);
  background-position: center;
  background-size: cover;
}
</style>
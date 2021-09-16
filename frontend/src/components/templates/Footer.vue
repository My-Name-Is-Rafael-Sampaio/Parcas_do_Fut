<template>
  <footer class="footer">
    <span>© 2020 Copyright - Parças Do Fut</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #fbd91e;
  color: #333;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}
</style>
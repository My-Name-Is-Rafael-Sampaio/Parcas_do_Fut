<template>
  <header class="header">
    <MiniLogos />
  </header>
</template>

<script>
import MiniLogos from "./MiniLogos.vue";

export default {
  name: "Header",
  components: { MiniLogos },
};
</script>

<style>
.header {
  grid-area: header;
  background-color: #fbd91e;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
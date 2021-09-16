<template>
  <div class="about-content">
    <div class="about-modal">
      <div class="about-title">Site Parças do Fut</div>
      <p class="about-subtitle">
        Desenvolvido por Rafael Sampaio com fim estudantil, com objetivo de aprimorar o conhecimento diante essa tecnologia.
      </p>
      <img
        src="../../assets/defaults_images/acknowledgment.png"
        width="200"
        alt="Legal"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style>
.about-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-title {
  color: #000;
  font-size: 3.5rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.about-subtitle {
  color: #000;
  font-size: 1.6rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
}
</style>
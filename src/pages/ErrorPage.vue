<template>
  <section class="error">
    <h1 class="error__title">Oops, page not found!</h1>
  </section>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style lang="scss" scoped>
.error {
  &__title {
    font-size: 60px;
    text-align: center;
    margin-top: 40vh;
  }
}
</style>

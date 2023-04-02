<template>
  <header class="header">
    <ContainerWrap>
      <div class="header__content">
        <router-link to="/">
          <Logo />
        </router-link>
        <AccountActions v-if="isLoggedIn" />
        <AuthActions v-else />
      </div>
    </ContainerWrap>
  </header>
</template>

<script>
import ContainerWrap from "../shared/ContainerWrap.vue";
import Logo from "../Logo.vue";
import AuthActions from "./AuthActions.vue";
import AccountActions from "./AccountActions.vue";
import { mapGetters } from "vuex";

export default {
  name: "CustomHeader",
  components: {
    ContainerWrap,
    Logo,
    AuthActions,
    AccountActions,
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px 0;
  background: $secondary-color;
  z-index: 100;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

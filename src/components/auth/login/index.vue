<template>
  <AuthContainer class="login">
    <MainTitle class="login__title">Вхід</MainTitle>
    <CustomForm ref="form" @submit.prevent="handleSubmit" class="login__form">
      <CustomInput
        v-model="formData.email"
        :rules="emailRules"
        autocomplete="email"
        name="email"
        placeholder="Email"
        class="login__input"
      />
      <CustomInput
        v-model="formData.password"
        :rules="passwordRules"
        autocomplete="current-password"
        type="password"
        name="password"
        placeholder="Password"
        class="login__input"
      />
      <SubmitButton type="submit" class="login__btn" :loading="loading"
        >Увійти</SubmitButton
      >
    </CustomForm>
  </AuthContainer>
</template>

<script>
import CustomForm from "../../shared/form";
import CustomInput from "../../shared/CustomInput.vue";
import SubmitButton from "../../shared/SubmitButton.vue";
import AuthContainer from "../AuthContainer.vue";
import MainTitle from "../../shared/MainTitle.vue";
import {
  emailValidation,
  passwordValidation,
  isRequired,
} from "../../../utils/validationRules";
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  components: {
    CustomForm,
    CustomInput,
    SubmitButton,
    AuthContainer,
    MainTitle,
  },
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        emailValidation,
        passwordValidation,
        isRequired,
      };
    },
    emailRules() {
      return [this.rules.isRequired, this.rules.emailValidation];
    },
    passwordRules() {
      return [this.rules.isRequired];
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleSubmit() {
      const { form } = this.$refs;
      const isFormValid = form.validate();

      if (isFormValid) {
        try {
          this.loading = true;
          await this.login(this.formData);
          this.$router.push({ name: "homepage" });

          form.reset();
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Упс..Трапилась помилка",
            text: error.message,
          });
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__form {
    display: block;
    flex-direction: column;
  }

  &__title {
    text-align: center;
  }

  &__input {
    margin-bottom: 20px;
    width: 100%;
  }

  &__btn {
    margin-top: 15px;
    width: 100%;
  }
}
</style>

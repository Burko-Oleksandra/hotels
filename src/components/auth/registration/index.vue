<template>
  <AuthContainer class="registration">
    <MainTitle class="registration__title">Реєстрація</MainTitle>
    <CustomForm
      ref="form"
      @submit.prevent="handleSubmit"
      class="registration__form"
    >
      <CustomInput
        v-model="formData.name"
        :rules="nameRules"
        autocomplete="username"
        name="name"
        placeholder="Name"
        class="registration__input"
      />
      <CustomInput
        v-model="formData.email"
        :rules="emailRules"
        autocomplete="email"
        name="email"
        placeholder="Email"
        class="registration__input"
      />
      <CustomInput
        v-model="formData.password"
        :rules="passwordRules"
        autocomplete="current-password"
        type="password"
        name="password"
        placeholder="Password"
        class="registration__input"
      />
      <CustomInput
        v-model="formData.confirmPassword"
        :rules="confirmPassword"
        autocomplete="current-password"
        type="password"
        name="password"
        placeholder="Confirm password"
        class="registration__input"
      />
      <SubmitButton type="submit" class="registration__btn" :loading="loading"
        >Зареєструватись</SubmitButton
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
  name: "RegistrationForm",
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    nameRules() {
      return [this.rules.isRequired];
    },
    emailRules() {
      return [this.rules.isRequired, this.rules.emailValidation];
    },
    passwordRules() {
      return [this.rules.isRequired, this.rules.passwordValidation];
    },
    confirmPassword() {
      return [
        (val) => ({
          hasPassed: val === this.formData.password,
          message: "Паролі не співпадають",
        }),
      ];
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser"]),
    async handleSubmit() {
      const { form } = this.$refs;
      const isFormValid = form.validate();
      const { name, email, password } = this.formData;

      if (isFormValid) {
        try {
          this.loading = true;
          await this.registerUser({
            name,
            email,
            password,
          });
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
.registration {
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

<template>
  <div class="session-wrapper">
    <div class="session-left">
      <session-slider-widget></session-slider-widget>
    </div>
    <div class="session-right text-center">
      <app-section-loader :status="loader"></app-section-loader>
      <div class="session-table-cell" v-if="!loader">
        <div class="session-content">
          <img :src="appLogo" class="img-responsive mb-4" width="78" height="78" />
          <h2 class="mb-4">{{$t('message.resetPassword')}}</h2>
          <p class="fs-14">{{$t('message.pleaseEnterYourPasswordToReset')}}.</p>
          <p v-if="dataUser">Redefinir senha para o email <strong>{{ dataUser.email }}</strong>.</p>
          <v-form
            @submit.prevent="resetPassword"
            id="reset-password-form"
            class="5"
            v-if="tokenValid && !passwordReseted"
          >
            <v-text-field
              :label="$t('message.fieldNewPassword')"
              v-model="newPassword"
              type="password"
              :error-messages="submitted && $v.newPassword.$dirty && $v.newPassword.$error && !$v.newPassword.required ? $t('message.requiredField') : submitted && $v.newPassword.$dirty && $v.newPassword.$error && !$v.newPassword.minLength ? $t('message.minCharactersToPass') : ''"
            ></v-text-field>
            <v-text-field
              :label="$t('message.fieldConfirmPassword')"
              v-model="confirmPassword"
              type="password"
              :error-messages="submitted && $v.confirmPassword.$dirty && $v.confirmPassword.$error && !$v.confirmPassword.required ? $t('message.requiredField') : submitted && $v.confirmPassword.$dirty && $v.confirmPassword.$error && !$v.confirmPassword.semeAsPassword ? $t('message.passwordsMustMatch') : ''"
            ></v-text-field>
            <v-btn
              type="submit"
              large
              block
              color="primary"
              form="reset-password-form"
            >{{$t('message.resetPassword')}}</v-btn>
          </v-form>
          <v-alert type="error" v-else-if="!tokenValid && !passwordReseted">{{ $t('message.tokenResetPasswordExpired') }}</v-alert>
          <div v-else>
            <v-alert type="success">{{ $t('message.passwordResetedSuccessfull') }}</v-alert>
            <router-link to="/authentication/login">{{$t('message.backToSignIn')}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SessionSliderWidget from "Components/Widgets/SessionSlider";
import AppConfig from "Constants/AppConfig";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { AUTH_CONFIG } from "../../auth/auth-variables";

export default {
  components: {
    SessionSliderWidget
  },
  data() {
    return {
      submitted: false,
      newPassword: "",
      confirmPassword: "",
      loader: true,
      tokenValid: false,
      passwordReseted: false,
      resetPasswordError: false,
      dataUser: null,
      appLogo: AppConfig.appLogo2
    };
  },
  validations: {
    newPassword: { required, minLength: minLength(6) },
    confirmPassword: { required, semeAsPassword: sameAs("newPassword") }
  },
  mounted() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      /* eslint-disable */
      this.$http.get(`${AUTH_CONFIG.baseUrl}api/password/find/${this.$route.params.token}`)
        .then(res => {
          if (res.status === 200) {
            this.tokenValid = true
            this.dataUser = res.data
          }
          this.loader = false;
        })
        .catch(error => {
          this.loader = false
        });
      /* eslint-enable */
    },
    resetPassword() {
      this.submitted = true;
      this.loader = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loader = false
        return;
      }

      const data = {
        email: this.dataUser.email,
        password: this.newPassword,
        password_confirmation: this.confirmPassword,
        token: this.dataUser.token
      }

      /* eslint-disable */
      this.$http.post(`${AUTH_CONFIG.baseUrl}api/password/reset`, data)
        .then((res) => {
          this.submitted = false
          this.loader = false
          if (res) {
            this.dataUser = res.data
            this.passwordReseted = true
          }
        })
        .catch(err => {
          this.submitted = false
          this.loader = false
          this.tokenValid = false
        })
      /* eslint-enable */
    }
  }
};
</script>

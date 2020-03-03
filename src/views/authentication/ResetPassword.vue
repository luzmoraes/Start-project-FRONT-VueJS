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
          <p>{{ $route.params.token }}</p>
          <v-form
            @submit.prevent="resetPassword"
            id="reset-password-form"
            class="5"
            v-if="tokenValid"
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
          <v-alert type="error" v-else>{{ $t('message.tokenResetPasswordExpired') }}</v-alert>
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
		  console.log('RES:', res)
          if (res.status === 200) {
            this.tokenValid = true;
            this.dataUser = res.data;
          }
          this.loader = false;
        })
        .catch(error => {
          this.loader = false;
        });
      /* eslint-enable */
    },
    resetPassword() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log("Reset Password from token");
    }
  }
};
</script>

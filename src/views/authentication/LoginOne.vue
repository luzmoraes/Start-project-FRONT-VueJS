<template>
  <div class="session-wrapper">
    <div class="session-left">
      <session-slider-widget></session-slider-widget>
    </div>
    <div class="session-right text-center">
      <div class="session-table-cell">
        <div class="session-content">
          <img
            :src="appLogo"
            class="img-responsive mb-4"
            width="78"
            height="78"
          />
          <h2 class="mb-4">{{ $t("message.loginToAdmin") }}</h2>
          <p class="fs-14">
            {{ $t("message.enterUsernameAndPasswordToAccessControlPanelOf") }}
            {{ brand }}.
          </p>
          <v-form v-model="valid" class="mb-5">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              label="Senha"
              v-model="password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-checkbox
              color="primary"
              label="Lembre-me"
              v-model="checkbox"
            ></v-checkbox>
            <router-link class="mb-2" to="/authentication/forgot-password"
              >{{ $t("message.forgotPassword") }}?</router-link
            >
            <div>
              <v-btn large @click="submit" block color="primary" class="mb-2">{{
                $t("message.loginNow")
              }}</v-btn>
              
            </div>
            <p>{{ $t("message.bySigningUpYouAgreeTo") }} {{ brand }}</p>
            <router-link to="">{{ $t("message.termsOfService") }}</router-link>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SessionSliderWidget from "Components/Widgets/SessionSlider";
import AppConfig from "Constants/AppConfig";
import { CONFIG } from "../../common/config";

export default {
  components: {
    SessionSliderWidget
  },
  data() {	
    return {
      checkbox: false,
      valid: false,
      email: "anderson@ycloud.com.br",
      emailRules: [
        v => !!v || "Informe o email",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email inválido"
      ],
      password: "secret",
      passwordRules: [v => !!v || "Informe a senha"],
      appLogo: AppConfig.appLogo2,
      brand: AppConfig.brand,
      authInfo: CONFIG.authInfo
    };
  },
  methods: {
    submit() {
      this.authInfo.username = this.email
      this.authInfo.password = this.password
      this.$store.dispatch("signinUser", this.authInfo);
    }
  }
};
</script>

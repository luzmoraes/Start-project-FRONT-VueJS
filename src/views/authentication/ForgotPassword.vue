<template>
  <div class="session-wrapper">
    <div class="session-left">
      <session-slider-widget></session-slider-widget>
    </div>
    <div class="session-right text-center">
      <div class="session-table-cell">
        <div class="session-content">
          <img :src="appLogo" class="img-responsive mb-4" width="78" height="78" />
          <h2 class="mb-4">{{$t('message.forgotPassword')}}</h2>
          <p class="fs-14">{{$t('message.enterYourEmailToSendYouAResetLink')}}.</p>
          <v-form @submit.prevent="sendEmailToResetPass" id="send-email-form" class="mb-6" v-if="!sentEmail">
            <v-text-field
              :label="$t('message.fieldEmail')"
              v-model="email"
              id="email"
              name="email"
              :error-messages="submitted && $v.email.$dirty && $v.email.$error && !$v.email.required ? $t('message.requiredField') : submitted && $v.email.$dirty && $v.email.$error && !$v.email.email ? $t('message.invalidEmail') : ''"
            ></v-text-field>
            <!-- <v-btn color="primary" block to="/authentication/reset-password">Enviar</v-btn> -->
            <v-btn type="submit" color="primary" block form="send-email-form">Enviar</v-btn>
          </v-form>
          <v-alert type="success" v-else>
            {{$t('message.sentEmailSuccessfull')}}.
          </v-alert>
          <div>
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
import { required, email } from "vuelidate/lib/validators";
import Nprogress from 'nprogress'
import ApiService from '../../common/api.service'
import GlobalService from '../../common/global.services'

export default {
  components: {
    SessionSliderWidget
  },
  data() {
    return {
      email: "",
      submitted: false,
      sentEmail: false,
      appLogo: AppConfig.appLogo2
    };
  },
  validations: {
    email: { required, email }
  },
  methods: {
    sendEmailToResetPass() {
      this.submitted = true;

      //stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      Nprogress.start()
      /* eslint-disable */
      ApiService.post(`api/password/create`, {email: this.email})
        .then((res) => {
          Nprogress.done()
          this.submitted = false
          this.sentEmail = true
        })
        .catch(error => {
          Nprogress.done()
          GlobalService.showNotification('global', 'error', this.$t('message.emailNotFound'))
        })
      /* eslint-enable */
    }
  }
};
</script>

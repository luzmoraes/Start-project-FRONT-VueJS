<template>
  <div class="session-wrapper">
    <div class="session-right text-center">
        <div class="session-table-cell">
				<div class="session-content">
					<img 
						:src="appLogo"
						class="img-responsive mb-4" 
						width="78" 
						height="78" 
					/>
					<h2 class="mb-4">{{$t('message.forgotPassword')}}</h2>
					<p class="fs-14">{{$t('message.enterYourEmailToSendYouAResetLink')}}.</p>
					<v-form v-model="valid" class="mb-6">
							<v-text-field 
							label="E-mail" 
							v-model="email" 
							:rules="emailRules" 
							required
						></v-text-field>						
						<v-btn color="primary" block to="/reset-password"	>Enviar email</v-btn>
					</v-form>
					<div>
						<router-link to="/">{{$t('message.backToSignIn')}}</router-link>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>


<script>
import AppConfig from "Constants/AppConfig";

export default {
  data() {
    return {
			email: '',
      valid: false,
			emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      appLogo: AppConfig.appLogo
    };
  }
};
</script>

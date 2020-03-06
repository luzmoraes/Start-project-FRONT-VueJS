<template>
	<div>
		<page-title-bar></page-title-bar>
		<v-container fluid grid-list-xl py-0>
			<app-card>
                <v-alert :type="getIsError ? 'error' : 'success'" v-if="showMessage">
                    {{ getDynamicMessage }}
                </v-alert>
				<v-form
                    @submit.prevent="saveUser"
                    id="user-form"
                    ref="userform"
                >
					<v-text-field
						:label="$t('message.fieldName')"
						v-model="user.name"
						:counter="255"
                        :error-messages="getSubmitted && $v.user.name.$dirty && $v.user.name.$error && !$v.user.name.required ? $t('message.requiredField') : getSubmitted && $v.user.name.$dirty && $v.user.name.$error && !$v.user.name.maxLength ? $t('message.maxCharactersToinput') : ''"
					></v-text-field>
					<v-text-field
						:label="$t('message.fieldEmail')"
						v-model="user.email"
                        :counter="255"
                        :error-messages="getSubmitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.required ? $t('message.requiredField') : getSubmitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.email ? $t('message.invalidEmail') : getSubmitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.maxLength ? $t('message.maxCharactersToinput') : ''"
					></v-text-field>
                    <v-text-field
                        :label="$t('message.fieldPassword')"
                        v-model="user.password"
                        type="password"
                        :error-messages="getSubmitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.required ? $t('message.requiredField') : getSubmitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.minLength ? $t('message.minCharactersToPass') : ''"
                    ></v-text-field>
                    <v-text-field
                        :label="$t('message.fieldConfirmPassword')"
                        v-model="user.repassword"
                        type="password"
                        :error-messages="getSubmitted && $v.user.repassword.$dirty && $v.user.repassword.$error && !$v.user.repassword.required ? $t('message.requiredField') : getSubmitted && $v.user.repassword.$dirty && $v.user.repassword.$error && !$v.user.repassword.semeAsPassword ? $t('message.passwordsMustMatch') : ''"
                    ></v-text-field>
					<v-checkbox
						:label="$t('message.fieldUserActive')"
						v-model="user.active"
					></v-checkbox>
					<v-btn
                        type="submit"
						color="success"
						class="mr-3"
                        form="user-form"
                        :disabled="$v.$dirty && $v.$invalid"
					>
						{{$t("message.save")}}
					</v-btn>
				</v-form>
			</app-card>
		</v-container>
	</div>
</template>

<script>
import Vue from 'vue'
import Nprogress from 'nprogress';
import { mapGetters } from 'vuex'
import { required, email,  maxLength, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                repassword: "",
                active: true
            }
        };
    },
    computed: {
        ...mapGetters(['getSubmitted', 'getIsError', 'getDynamicMessage', 'showMessage'])
    },
    validations: {
        user: {
            name: { required, maxLength: maxLength(255) },
            email: { required, email, maxLength: maxLength(255) },
            password: { required, minLength: minLength(6) },
            repassword: { required, semeAsPassword: sameAs("password") },
        }
    },
    methods: {
        async saveUser() {
            this.$store.dispatch('setSubmited', true)

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            await this.$store.dispatch('insertUser', this.user).then(
                async (res) => {
                    this.$store.dispatch('setSubmited', false)
                    Nprogress.done()
                    if (res.data.success) {
                        Vue.notify({
                            group: 'loggedIn',
                            type: 'success',
                            text: this.$t('message.userSuccessfullyRegistered')
                        });
                        this.$store.commit('insertUserSuccess', res.data.user)
                        // this.$refs.userform.reset()
                        this.user = {
                            name: "",
                            email: "",
                            password: "",
                            repassword: "",
                            active: true
                        }

                    } else if (res.data.error.email) {
                        Vue.notify({
                            group: 'loggedIn',
                            type: 'error',
                            text: this.$t('message.emailAlreadyRegistered')
                        });
                    } else {
                        Vue.notify({
                            group: 'loggedIn',
                            type: 'error',
                            text: this.$t('message.errorRegistered')
                        });
                    }
                },
                async (err) => {
                    Vue.notify({
                        group: 'loggedIn',
                        type: 'error',
                        text: this.$t('message.errorRegistered')
                    });
                    console.error(err)
                }
            )


            
        }
    }
};
</script>

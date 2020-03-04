<template>
	<div>
		<page-title-bar></page-title-bar>
		<v-container fluid grid-list-xl py-0>
			<app-card>
				<v-form
                    @submit.prevent="saveUser"
                    id="user-form"
                >
					<v-text-field
						:label="$t('message.fieldName')"
						v-model="user.name"
						:counter="255"
                        :error-messages="submitted && $v.user.name.$dirty && $v.user.name.$error && !$v.user.name.required ? $t('message.requiredField') : submitted && $v.user.name.$dirty && $v.user.name.$error && !$v.user.name.maxLength ? $t('message.maxCharactersToinput') : ''"
					></v-text-field>
					<v-text-field
						:label="$t('message.fieldEmail')"
						v-model="user.email"
                        :counter="255"
                        :error-messages="submitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.required ? $t('message.requiredField') : submitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.email ? $t('message.invalidEmail') : submitted && $v.user.email.$dirty && $v.user.email.$error && !$v.user.email.maxLength ? $t('message.maxCharactersToinput') : ''"
					></v-text-field>
                    <v-text-field
                        :label="$t('message.fieldPassword')"
                        v-model="user.password"
                        type="password"
                        :error-messages="submitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.required ? $t('message.requiredField') : submitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.minLength ? $t('message.minCharactersToPass') : ''"
                    ></v-text-field>
                    <v-text-field
                        :label="$t('message.fieldConfirmPassword')"
                        v-model="user.repassword"
                        type="password"
                        :error-messages="submitted && $v.user.repassword.$dirty && $v.user.repassword.$error && !$v.user.repassword.required ? $t('message.requiredField') : submitted && $v.user.repassword.$dirty && $v.user.repassword.$error && !$v.user.repassword.semeAsPassword ? $t('message.passwordsMustMatch') : ''"
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
import axios from 'axios'
import { required, email,  maxLength, minLength, sameAs } from "vuelidate/lib/validators";
import { AUTH_CONFIG } from '../../auth/auth-variables';

export default {
    data() {
        return {
            submitted: false,
            user: {
                name: "",
                email: "",
                password: "",
                repassword: "",
                active: true
            }
        };
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
        saveUser() {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // this.$store.dispatch('insertUser', this.user)
            //     .then((res) => {
            //         console.log(res)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })

            console.log('User:::', this.user)

            /* eslint-disable */
            axios.post(`${AUTH_CONFIG.baseUrl}api/user/insert`, this.user)
                .then((res) => {
                    // Nprogress.done();
                    if (res.data.success) {
                        // context.commit('insertUserSuccess', res.data.user)
                        // return res.data
                        console.log('res success true:', res)
                    } else {
                        console.log('res success false:', res)
                        // return res.data
                    }
                })
                .catch(err => {
                    // Nprogress.done()
                    console.log('error catch:', err)
                    // return err
                    return
                })
            /* eslint-enable */

            
        }
    }
};
</script>

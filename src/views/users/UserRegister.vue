<template>
	<div>
		<page-title-bar></page-title-bar>
        <app-section-loader :status="getLoader"></app-section-loader>
		<v-container fluid grid-list-xl py-0>
			<app-card>
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
                        v-if="!user.id"
                        :error-messages="getSubmitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.required ? $t('message.requiredField') : getSubmitted && $v.user.password.$dirty && $v.user.password.$error && !$v.user.password.minLength ? $t('message.minCharactersToPass') : ''"
                    ></v-text-field>
                    <v-text-field
                        :label="$t('message.fieldConfirmPassword')"
                        v-model="user.repassword"
                        type="password"
                        v-if="!user.id"
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
import router from '../../router'
import { mapGetters } from 'vuex'
import { required, email,  maxLength, minLength, sameAs } from "vuelidate/lib/validators";
import ApiService from '../../common/api.service'
// import GlobalService from '../../common/global.services'

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
        ...mapGetters(['getSubmitted', 'getLoader', 'getSelectedUser']),
        rules() {
            if (this.getSelectedUser) {
                return {
                    name: { required, maxLength: maxLength(255) },
                    email: { required, email, maxLength: maxLength(255) }
                }
            } else {
                return {
                    name: { required, maxLength: maxLength(255) },
                    email: { required, email, maxLength: maxLength(255) },
                    password: { required, minLength: minLength(6) },
                    repassword: { required, semeAsPassword: sameAs("password") }
                }
            }
        }
    },
    mounted() {
        this.loadUser()
    },
    validations() {
        return {
            user: this.rules
        }
    },
    methods: {
        async saveUser() {
            this.$store.dispatch('setSubmited', true)
            Nprogress.start()

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                Nprogress.done()
                return;
            }

            /* USER UPDATE */
            if (this.getSelectedUser) {
                console.log('UPDATE')
            
            /* USER INSERT */
            } else {
                try {
                    const response = await ApiService.post('api/user/insert', this.user)
                    Nprogress.done()
                    this.$store.dispatch('setSubmited', false)
                    if (response.data.success) {
                        Vue.notify({
                            group: 'registerUser',
                            type: 'success',
                            text: this.$t('message.userSuccessfullyRegistered')
                        });
                        this.$store.commit('insertUserSuccess', response.data.user)
                        this.user = {
                            name: "",
                            email: "",
                            password: "",
                            repassword: "",
                            active: true
                        }

                    } else if (response.data.error.email) {
                        Vue.notify({
                            group: 'registerUser',
                            type: 'error',
                            text: this.$t('message.emailAlreadyRegistered')
                        });
                    } else {
                        Vue.notify({
                            group: 'registerUser',
                            type: 'error',
                            text: this.$t('message.errorRegistered')
                        });
                    }
                } catch (err) {
                    Nprogress.done()
                    this.$store.dispatch('setSubmited', false)
                    Vue.notify({
                        group: 'registerUser',
                        type: 'error',
                        text: this.$t('message.errorRegistered')
                    });
                    console.error(err)
                }

            }
        },
        show() {
            Vue.notify({
                group: 'editUser',
                type: 'error',
                text: 'hardcode'
            });
        },
        loadUser() {
            if (this.$route.params.id) {

                this.$store.commit('changeLoader', true)

                ApiService.get(`api/user/show/${this.$route.params.id}`).then(
                    (response) => {
                        this.$store.commit('changeLoader', false)
                        if (response.data.success) {
                            this.user = {
                                id: response.data.user.id,
                                name: response.data.user.name,
                                email: response.data.user.email,
                                active: response.data.user.active
                            }
                            this.$store.commit('setSelectedUser', response.data.user)
                        } else {
                            Vue.notify({
                                group: 'editUser',
                                type: 'error',
                                text: this.$t('message.userNotFound')
                            });
                            router.push("/users")
                        }
                    },
                    (err) => {
                        console.log(err)
                        Vue.notify({
                                group: 'editUser',
                                type: 'error',
                                text: this.$t('message.unexpectedError')
                            });
                        router.push("/users")
                    }
                )

            } else {
                this.user = {
                    name: "",
                    email: "",
                    password: "",
                    repassword: "",
                    active: true
                }
                this.$store.commit('setSelectedUser', null)
            }
        }
    }
};
</script>

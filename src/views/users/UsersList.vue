<template>
	<div>
		<page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
		<v-container fluid class="grid-list-xl pt-0 mt-n3">
			<v-row v-if="usersList !== null">
				<app-card colClasses="col-12 col-sm-6 col-md-4" v-for="(users, index) in usersList" :key="index">
					<!-- <div class="user-image text-sm-center mb-4">
						<img :src="users.profileImage" class="img-responsive rounded-circle" alt="user images" width="95" height="95" />
					</div> -->
					<div class="user-list-content">
						<div class="text-center">
							<h3 class="fw-bold">{{users.name}}</h3>
							<p>{{ users.email }}</p>
						</div>
						<a class="v-btn btn-success white--text ma-0 px-3 py-2 fs-14" href="javascript:void(0);" @click="users.status = !users.status" v-if="users.status">{{$t("message.follow")}}</a>
						<a class="v-btn btn-danger white--text ma-0 px-3 py-2 fs-14" href="javascript:void(0);" @click="users.status = !users.status" v-else>{{$t("message.unfollow")}}</a>
					</div>
				</app-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'
import { AUTH_CONFIG } from '../../auth/auth-variables';

export default {
  data() {
    return {
      loader: true,
      usersList: null,
      connectUsersList: null
    };
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      axios.get(`${AUTH_CONFIG.baseUrl}api/user/list`)
        .then(res => {
            this.loader = false;
            this.usersList = res.data;
            this.$store.commit('setUsers', res.data)
        })
    }
  }
};
</script>

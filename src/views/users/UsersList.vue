<template>
	<div>
		<page-title-bar></page-title-bar>
    <app-section-loader :status="getLoader"></app-section-loader>
		<v-container fluid class="grid-list-xl pt-0 mt-n3">
			<v-row v-if="getUsers !== null">
				<app-card colClasses="col-12 col-sm-6 col-md-4" v-for="(users, index) in getUsers" :key="index">
					<!-- <div class="user-image text-sm-center mb-4">
						<img :src="users.profileImage" class="img-responsive rounded-circle" alt="user images" width="95" height="95" />
					</div> -->
					<div class="user-list-content">
						<div class="text-center">
							<h3 class="fw-bold">{{users.name}}</h3>
							<p>{{ users.email }}</p>
						</div>
						<div class="text-right my-2">
							<v-btn color="primary" fab class="mr-3" small dark>
								<v-icon>mdi-eye</v-icon>
							</v-btn>
								<v-btn color="warning" class="mr-3" fab small dark>
							<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-btn color="red" class="mr-3" fab small dark>
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</div>
					</div>
				</app-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getUsers',
      'getLoader'
    ])
  },
  created() {
    this.$store.dispatch('loadUsers')
  }
};
</script>

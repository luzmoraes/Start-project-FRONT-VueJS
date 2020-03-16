<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="getLoader"></app-section-loader>
    <v-container fluid class="grid-list-xl pt-0 mt-n3">
      <v-row v-if="getUsers !== null">
        <app-card
          colClasses="col-12 col-sm-6 col-md-4"
          v-for="(users, index) in getUsers"
          :key="index"
        >
          <!-- <div class="user-image text-sm-center mb-4">
<img :src="users.profileImage" class="img-responsive rounded-circle" alt="user images" width="95" height="95" />
</div> -->
          <div class="user-list-content">
            <div class="text-center">
              <h3 class="fw-bold">{{ users.name }}</h3>
              <p>{{ users.email }}</p>
            </div>
            <div class="text-right my-2">
              <v-btn
                :disabled="getSubmitted"
                color="primary"
                fab
                class="mr-3"
                small
                dark
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn
                :to="`/users/edit/${users.id}`"
                :disabled="getSubmitted"
                color="warning"
                class="mr-3"
                fab
                small
                dark
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                @click="removeUser(users)"
                :disabled="getSubmitted"
                color="red"
                class="mr-3"
                fab
                small
                dark
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </app-card>
      </v-row>
    </v-container>
    <Confirm ref="confirm"></Confirm>
  </div>
  
</template>

<script>
import Nprogress from 'nprogress';
import { mapGetters } from "vuex";
import Confirm from '../../components/DialogConfirm/Confirm'
import ApiService from '../../common/api.service';
import GlobalService from '../../common/global.services';

export default {
  components: {
    Confirm
  },
  computed: {
    ...mapGetters(["getUsers", "getLoader", "getSubmitted"])
  },
  created() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    async removeUser(user) {
      this.$store.commit('changeSubmitted', true)
      Nprogress.start()
      if (await this.$refs.confirm.open('Atenção', `Deseja excluir o usuário <strong>${user.name}</strong>?`, { color: 'red' })) {
        const response = await ApiService.get(`api/user/delete/${user.id}`)
        this.$store.commit('changeSubmitted', false)
        Nprogress.done()
        if (response.data.success) {
          let users = this.getUsers.filter(u => u.id != user.id)
          this.$store.commit('setUsers', users)
          GlobalService.showNotification('global', 'success', this.$t('message.userSuccessfullyDeleted'))
        } else {
          GlobalService.showNotification('global', 'error', this.$t('message.errorDeletingTheUser'))
        }
      }
      else {
        this.$store.commit('changeSubmitted', false)
        Nprogress.done()
      }
    }
  }
};
</script>

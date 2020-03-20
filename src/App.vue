<template>
  <v-app>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md6
          >
            <v-speed-dial
              v-model="fab"
              top
              right
              absolute
              direction="bottom"
              open-on-hover
              transition="slide-y-transition"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="primary"
                  dark
                  fab
                >
                  <v-icon v-if="fab">mdi-close</v-icon>
                  <v-icon v-else>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                dark
                small
                color="secondary"
                @click="signOut"
              >
                <v-icon>backspace</v-icon>
              </v-btn>
            </v-speed-dial>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from './store';
import router from './router';

export default Vue.extend({
  name: 'LabMonitoring',

  components: {
  },

  data: () => ({
    fab: false
  }),

  methods: {
    signOut () {
      this.$cookies.remove('user');
      router.push('/login')
    }
  },

  created () {
    // this.$cookies.remove('user');
    const loggedUser = this.$cookies.get('user');

    if (loggedUser) {
      store.commit('user', loggedUser);
      router.push('survey');
    }
  }
})
</script>
<style lang="scss">
  .v-btn {
    margin: 5px;
  }
</style>

<template>
  <v-app>
    <v-app-bar
                absolute
                color="white"
                elevate-on-scroll
                scroll-target="#scrolling-techniques-7"
              >
                <img class="logo" src="./assets/logo.png" alt="">

                <v-toolbar-title>CityScienceLab Corona Routine Monitoring</v-toolbar-title>

                <v-spacer></v-spacer>

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
                      <v-icon v-else>mdi-dots-vertical</v-icon>
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
              </v-app-bar>
              <v-sheet
                id="scrolling-techniques-7"
                class="overflow-y-auto"
              >
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
              md8
            >
                <router-view />
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      </v-sheet>
      <simple-dialog></simple-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from './store';
import router from './router';
import SimpleDialog from './components/SimpleDialog.vue';
export default Vue.extend({
  name: 'LabMonitoring',

  components: {
    SimpleDialog
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
    const loggedUser = this.$cookies.get('user');
    const lastSubmission = this.$cookies.get('lastSubmission');

    if (lastSubmission) {
      store.commit('formData', lastSubmission);
    }

    if (loggedUser) {
      store.commit('user', loggedUser);
      router.push('survey');
    }
  },
})
</script>
<style lang="scss">
  html {
    overflow-y: auto;
  }
  .v-btn {
    margin: 5px;
  }
  .logo {
    height:80%;
    margin:5px 20px 5px 5px;
  }
  .overflow-y-auto {
    margin-top: 80px;
  }
</style>

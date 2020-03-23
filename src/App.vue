<template>
  <v-app>
    <v-app-bar
                absolute
                color="white"
                elevate-on-scroll
                scroll-target="#scrolling-techniques-7"
              >
                <img class="logo" src="./assets/logo.png" alt="" @click="openLink('/')">

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
                    color="red"
                    @click="signOut"
                  >
                    <v-icon>backspace</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="green darken-2"
                    @click="openInfo"
                  >
                    <v-icon>info</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="blue"
                    @click="openLink('imprint')"
                  >
                    <v-icon>alternate_email</v-icon>
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

  computed: {
    cookiesAllowed () {
      return store.state.cookies;
    }
  },

  watch: {
    cookiesAllowed (val) {
      this.$cookies.set('permission', val);
    }
  },

  methods: {
    signOut () {
      if (confirm('Do you really want to sign out?')) {
        this.$cookies.remove('user');
        this.$cookies.remove('permission');
        router.push('/login');
      }
    },
    openInfo () {
      store.dispatch('simpleDialog', {
        title: 'CSL Corona Routine Monitoring',
        msg: 'Info coming soon...'
      });
    },
    openLink (route) {
      router.push(route);
    }
  },

  created () {
    const loggedUser = this.$cookies.get('user');
    const lastSubmission = this.$cookies.get('lastSubmission');
    const permission = this.$cookies.get('permission');

    if (!permission) {
      store.dispatch('simpleDialog', {
        title: 'This Website uses Cookies',
        msg: '<p>We use cookies to keep you logged in and to store your latest submission for later, as a convenience service.</p>'+
          "<p><b>We don't track any personal information regarding you or your system! All information provided is anonymous and for scientific purposes only.<br/>"+
          "See imprint for further information.</b></p>"+
          "<h2>ツ</h2>",
        confirm: "cookies"
      });
    } else {
      store.commit("cookies", true);
    }

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
    cursor:pointer;
  }
  .overflow-y-auto {
    margin-top: 80px;
  }
</style>

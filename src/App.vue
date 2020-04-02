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
                    color="green darken-2"
                    @click="openLink('survey')"
                  >
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">feedback</v-icon>
                      </template>
                      <span>To the Survey</span>
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="red"
                    @click="signOut"
                  >
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">backspace</v-icon>
                      </template>
                      <span>Sign Out</span>
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="yellow darken-2"
                    @click="openInfo"
                  >
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">info</v-icon>
                      </template>
                      <span>About</span>
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="pink"
                    @click="openLink('generalinfo')"
                  >
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">person</v-icon>
                      </template>
                      <span>Change User Data</span>
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    fab
                    dark
                    small
                    color="blue"
                    @click="openLink('imprint')"
                  >
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">alternate_email</v-icon>
                      </template>
                      <span>Imprint</span>
                    </v-tooltip>
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
                <router-view @openFirstTimeInfo="openInfo" />
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      </v-sheet>
      <simple-dialog @cookies="cookiesAllowed" @readme="readme"></simple-dialog>
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
    cookiesAllowed (val) {
      this.$cookies.set('permission', val);
      store.commit("cookies", true);
    },
    readme (val) {
      if (store.state.cookies) {
        this.$cookies.set('readme', true);
      }
    },
    signOut () {
      if (confirm('Do you really want to sign out?')) {
        this.$cookies.remove('user');
        this.$cookies.remove('permission');
        this.$cookies.remove('lastSubmission');
        router.push('/login');
      }
    },
    openInfo () {
      store.dispatch('simpleDialog', {
        name: 'readme',
        title: 'CSL Corona Routine Monitoring',
        msg: '<h4><i>#CoRoMo</i></h4>'+
          '<h2>Welcome to the daily Corona Survey of CityScienceLab @ HafenCity Universität Hamburg</h2>'+
          '<h4>COVID-19 is changing life all around the globe drastically. All our well cultivated habits and everyday lives are turned upside-down.</h4>'+
          '<p>Some jobs, such as medical personnel, food retailers are heavily requested, some work a lot but remotely, others are afraid of losing their jobs. '+
          'We spent more time at home, travel less, spend more time with our families</p>'+
          '<p>At the <a target="_blank" href="">CityScienceLab</a> of <a target="_blank" href="https://hcu-hamburg.de">HCU Hamburg</a>, we want to find out how COVID-19 impacts society and affects our social lives.</p>'+
          '<h4>Daily Survey</h4>'+
          '<p>Therefor we created this daily survey, trying to establish a timeline of the pandemic. Every participant is asked to provide a self chosen username and some meta information one time. '+
          'Afterwards we hope you return every day and provide as much <i>anonymous</i> information as possible! <i>But all answers are optional!</i></p>'+
          '<p>We are working on adding <b>new questions</b> all the time and building a <b>dashboard</b> for you to view your personal results as well as the averaged statistics!</p>'+
          '<h4>A German Translation is also under development! Eine deutsche Übersetzung befindet sich zur Zeit in Entwicklung!</h4>'+
          '<h4>We are not tracking any personal information or using any online tracking software! All data provided is for scientific purposes only and strictly anonymous! '+
          'See the <a href="#/imprint">imprint</a> for any legal information!</h4>'
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
        name: 'cookies',
        title: 'This Website uses Cookies',
        msg: '<p>We use cookies to keep you logged in and to store your latest submission for later, as a convenience service.</p>'+
          "<p><b>We don't track any personal information regarding you or your system! All information provided is anonymous and for scientific purposes only.<br/>"+
          "See imprint for further information.</b></p>"+
          "<h2>ツ</h2>",
        confirm: true
      });
    } 
    else {
      store.commit("cookies", true);
    }

    if (!this.$cookies.get('readme')) {
      this.openInfo();
    }

    if (lastSubmission) {
      store.commit('formData', {...lastSubmission, ...{ yesterday: false }});
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
    overflow-y: hidden !important;

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
    height: 100vh;
    padding: 80px 0;
  }
</style>

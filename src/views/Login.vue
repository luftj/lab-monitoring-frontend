<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Anmelden</v-toolbar-title>
    </v-toolbar>
    <v-subheader>Please enter some general information about yourself. This meta information is saved as a cookie to your computer for convenience, so you don't have to re-enter it everytime.</v-subheader>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          name="username"
          hint="Please enter a name of your choosing. Remember to always use the same."
          prepend-icon="person"
          type="text"
          :rules="nameRules"
          v-model="user.username"
        ></v-text-field>

        <!-- <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
        ></v-text-field> -->

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" to="/sign-up" outlined v-on="on">Registrieren</v-btn>
        </template>
        <span>Es werden keine persönlichen Daten erhoben oder gespeichert.</span>
      </v-tooltip> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on" @click="submit">Anmelden</v-btn>
        </template>
        <span>Zur Umfrage</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Axios from 'axios'
import store from '../store'
import router from '../router'

export default Vue.extend({
  name: 'Login',
  data: () => ({
    user: {
      username: ''
    },
    nameRules: [
      v => !!v || 'Username is required'
    ],
    plzRules: [
      v => !!v || 'PLZ is required',
      v => (v && !isNaN(parseInt(v, 10)) && v.length === 5) || 'PLZ muss aus 5 Ziffern bestehen'
    ],
  }),
  computed: {
    defaults () {
      return store.state.defaults;
    }
  },
  methods: {
    submit () {
      Axios.post(process.env.VUE_APP_API_URL + '/login', this.user)
        .then(res => {
          const userid = res.data.id.toString();
          
          const user = {
            userid: userid,
            userdata: this.user
          }

          const userdata = res.data.userdata
          if( !userdata || Object.keys(userdata).length === 0 ) {
            console.log("not got userdata")

            router.push('generalinfo');
          }
          else {
            console.log("got userdata")
            user.userdata = userdata;
            user.userdata.username = this.user.username;
            store.commit('user', user);
            router.push('survey');
          }
          console.log(user);

          if (store.state.cookies) {
            this.$cookies.set('user', user);
          }
        })
    },
  }
})
</script>

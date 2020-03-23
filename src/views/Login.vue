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

        <v-col>
          <h3>About You</h3>
          <v-text-field
            v-model="user.plzHome"
            :rules="plzRules"
            :counter="5"
            label="PLZ Wohnort"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.age"
            type="number"
            label="Age"
          ></v-text-field>

          <v-radio-group
            row
            v-model="user.gender"
            label="Gender"
          >
            <v-radio
              key="F"
              label="F"
              value="F"
            ></v-radio>
            <v-radio
              key="M"
              label="M"
              value="M"
            ></v-radio>
            <v-radio
              key="D"
              label="D"
              value="D"
            ></v-radio>
          </v-radio-group>
        </v-col>
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
import HelloWorld from '@/components/HelloWorld.vue'
import Axios from 'axios'
import store from '../store'
import router from '../router'

export default Vue.extend({
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      plzHome: '',
      age: '',
      gender: ''
    },
    nameRules: [
      v => !!v || 'Username is required'
    ],
    plzRules: [
      v => !!v || 'ZIP Code is required',
      v => (v && !isNaN(parseInt(v, 10)) && v.length === 5) || 'PLZ muss aus 5 Ziffern bestehen'
    ],
  }),
  methods: {
    submit () {
      Axios.post('http://localhost:5000/login', this.user)
        .then(res => {
          const user = {
            userid: res.data,
            userdata: this.user
          }

          store.commit('user', user);
          this.$cookies.set('user', user);

          console.log(user);
          router.push('survey');
        })
    }
  }
})
</script>

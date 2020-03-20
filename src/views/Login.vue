<template>
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
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Anmelden</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="secondary" outlined="true" v-on="on">Registrieren</v-btn>
                  </template>
                  <span>Es werden keine persönlichen Daten erhoben oder gespeichert.</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">Anmelden</v-btn>
                  </template>
                  <span>Zur Umfrage</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default Vue.extend({
  name: 'Login',
  components: {
  }
})
</script>

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
            md6
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Umfrage</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="zipCodeHome"
                    :rules="zipCodeRules"
                    :counter="5"
                    label="PLZ Wohnort"
                    required
                  ></v-text-field>

                  <!-- <v-text-field
                    v-model="zipCodeWork"
                    :rules="zipCodeRules"
                    :counter="5"
                    label="PLZ Arbeitsplatz"
                    required
                  ></v-text-field> -->

                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                  ></v-select>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Stimmen Sie der Nutzung ihrer anoymisierten Daten für die Forschung zu?"
                    required
                  ></v-checkbox>

                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                  >
                    Submit
                  </v-btn>

                  <v-btn
                    color="secondary"
                    outlined="true"
                    class="mr-4"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>

                </v-form>
              </v-card-text>
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
  name: 'Survey',
  components: {
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Username is required'
    ],
    zipCodeHome: '',
    zipCodeWork: '',
    zipCodeRules: [
      v => !!v || 'ZIP Code is required',
      v => (v && !isNaN(parseInt(v, 10)) && v.length === 5) || 'PLZ muss aus 5 Ziffern bestehen'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false,
    lazy: false
  }),

  methods: {
    submit () {
      this.$refs.form.submit()
    },
    reset () {
      this.$refs.form.reset()
    }
  }
})
</script>

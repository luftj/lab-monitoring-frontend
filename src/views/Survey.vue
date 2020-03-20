<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Umfrage</v-toolbar-title>
    </v-toolbar>
    <v-subheader>You can always update your Submission for one day</v-subheader>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-col>
          <h3>About You</h3>
          <v-text-field
            v-model="user.username"
            label="Nickname"
            hint="Please always use the same nickname"
            required
            disabled
          ></v-text-field>

          <v-text-field
            v-model="user.plzHome"
            label="PLZ Wohnort"
            disabled
          ></v-text-field>

          <v-text-field
            v-model="user.age"
            type="number"
            label="Age"
            disabled
          ></v-text-field>

          <v-radio-group
            row
            v-model="user.gender"
            label="Gender"
            disabled
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

        <!-- <v-text-field
          v-model="formData.plzWork"
          :rules="plzRules"
          :counter="5"
          label="PLZ Arbeitsplatz"
          required
        ></v-text-field> -->

        <!-- <v-select
          v-model="formData.videoApp"
          :items="videoApps"
          :rules="[v => !!v || 'Item is required']"
          :value="videoApps[0]"
          label="What Video Call App have you used?"
          multiple
          hint="Multiple selections possible"
        ></v-select> -->

        <v-col>
          <h3>Video Calls / Screen Time</h3>
          <v-combobox
            v-model="formData.videoApp"
            :items="videoApps"
            label="What Video Call App have you used?"
            hint="Multiple selections possible"
            multiple
            chips
          ></v-combobox>

          <v-text-field
            v-model="formData.avgCallSize"
            type="number"
            label="Avg. Number of People in a Call"
          ></v-text-field>

          <v-text-field
            v-model="formData.maxCallSize"
            type="number"
            label="Max. Number of People in one Call"
          ></v-text-field>

          <v-text-field
            v-model="formData.screenHours"
            type="number"
            label="Screen Hours Today"
            suffix="h"
          ></v-text-field>
        </v-col>

        <v-col>
          <h3>Mood</h3>
          <v-radio-group
              row
              v-model="formData.mood"
              label="Today"
              hint="1: Miserable, 5: Awesome"
            >
              <v-radio
                v-for="n in 5"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>

            <v-text-field
              label="In One Word"
              v-model="formData.moodTag"
              :rules="moodRules"
              hint="Describe your mood in one word."
            ></v-text-field>
        </v-col>

        <v-col>
          <h3>Encounters</h3>
          <v-text-field
            type="number"
            v-model="formData.peopleMetRealWorld"
            label="People met in person"
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="formData.peopleMetOnline"
            label="People met online"
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="formData.familyHours"
            label="Time spend with your family"
          ></v-text-field>
        </v-col>

        <v-col>
          <h3>Movement</h3>
          <v-text-field
            type="number"
            v-model="formData.kmTravelled"
            suffix="km"
            label="Kilometer travelled"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="formData.outsideHours"
            suffix="h"
            label="Hours spent outside"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Stimmen Sie der Nutzung ihrer anoymisierten Daten für die Forschung zu?"
            required
          ></v-checkbox>
        </v-col>

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
          outlined
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import axios from 'axios'
import store from '../store';

export default Vue.extend({
  name: 'Survey',
  components: {
  },
  data: () => ({
    valid: true,
    moodRules: [
      v => (!v || !(v as string).includes(' ')) || 'Please enter only 1 word'
    ],
    videoApps: [
      'Skype',
      'WebEx',
      'Zoom',
      'Wire',
      'WhatsApp Video Call'
    ],
    checkbox: false,
    lazy: false,
    formData: {
      id: store.state.userid,
      plzHome: '',
      gender: '',
      mood: 3,
      moodTag: '',
      videoApp: null,
      maxCallSize: 0,
      avgCallSize: 0,
      peopleMetRealWorld: 0,
      peopleMetOnline: 0,
      kmTravelled: 0,
      outsideHours: 0,
      familyHours: 0,
      screenHours: 0,
    },
    errors: []
  }),

  computed: {
    user () {
      return store.state.userdata;
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:5000/submit', {
          id: store.state.userid,
          ...this.user,
          ...this.formData
        })
          .then(res => {
            console.log(res.data);
          })
          .catch(e => this.errors.push(e))
      } else {
        alert('Please fill in all required fields.')
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
})
</script>
<style lang="scss" scoped>
  .category {
    color: #778f9b;
    font-size: 1rem;
  }
</style>
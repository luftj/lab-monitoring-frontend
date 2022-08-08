<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Survey</v-toolbar-title>
    </v-toolbar>
    <v-card-title primary-title>
      How was your day today?
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="formData.yesterday"
        :label="`This is for yesterday ${formData.yesterday ? '(' + new Date(new Date().setHours(-24)).toLocaleDateString() + ')' : ''}`"
      ></v-checkbox>
    </v-card-title>
    <v-subheader>
      You can always update your Submission for  today until 12am!<br>
      But you feel you have forgotten something you can still submit a change for the previous day (see top right).<br>
      Your last submission will be saved as a cookie for convenience.
    </v-subheader>
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
            label="PLZ Home"
            disabled
          ></v-text-field>

          <v-text-field
            v-model="user.plzWork"
            label="PLZ Work"
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
          <v-combobox
            v-model="user.work"
            label="Line of Work / Profession"
            hint="Multiple selections possible. Add your own."
            multiple
            chips
            disabled
          ></v-combobox>
        </v-col>

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
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-combobox
                v-on="on"
                v-model="formData.videoApp"
                :items="defaults.videoApps"
                label="What Video Call App have you used?"
                hint="Multiple selections possible"
                multiple
                chips
              ></v-combobox>
            </template>
            <span>You can choose from the selection below or enter your own.</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="formData.avgCallSize"
                type="number"
                label="Avg. Number of People in a Call"
              ></v-text-field>
            </template>
            <span>With how many people do speak at once in general?</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="formData.maxCallSize"
                type="number"
                label="Max. Number of People in one Call"
              ></v-text-field>
            </template>
            <span>What was the maximum of people you spoke with at once?</span>
          </v-tooltip>
          
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="formData.numberCalls"
                type="number"
                label="Total number of calls"
              ></v-text-field>
            </template>
            <span>How many phone or video calls did you make today?</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                v-model="formData.screenHours"
                type="number"
                label="Screen Hours Today"
                suffix="h"
              ></v-text-field>
            </template>
            <span>For how many hours did you stare at a screen today?</span>
          </v-tooltip>
            <v-radio-group
              row
              v-model="formData.relScreenHours"
              label="Relative to normal times?"
            >
              <v-radio
                v-for="(str, i) in defaults.relValues"
                :key="i"
                :label="`${str}`"
                :value="i"
              ></v-radio>
            </v-radio-group>
        </v-col>

        <v-col>
          <h3>Mood</h3>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-radio-group
                  row
                  v-model="formData.mood"
                  label="Today"
                >
                  <v-radio
                    v-for="n in 5"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
              </div>
            </template>
            <span>How do you feel today? 1: Miserable - 5: Awesome</span>
          </v-tooltip>
          <v-text-field
            label="In One Word"
            v-model="formData.moodTag"
            :rules="moodRules"
            hint="Describe your mood in one word."
          ></v-text-field>
        </v-col>

        <v-col>
          <h3>Encounters</h3>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                type="number"
                v-model="formData.peopleMetRealWorld"
                label="People met in person"
              ></v-text-field>
            </template>
            <span>How many people have you met today actually face to face?</span>
          </v-tooltip>
          <v-radio-group
            row
            v-model="formData.relPeopleMetRealWorld"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                type="number"
                v-model="formData.peopleMetOnline"
                label="People met remotely"
              ></v-text-field>
            </template>
            <span>How many people did you talk to via internet or phone? Texting counts too.</span>
          </v-tooltip>
          <v-radio-group
            row
            v-model="formData.relPeopleMetOnline"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                type="number"
                v-model="formData.familyHours"
                label="Time spend with your family"
              ></v-text-field>
            </template>
            <span>How much time did you dedicate to your family? Kids, Parents, Relatives?</span>
          </v-tooltip>
          <v-radio-group
            row
            v-model="formData.relFamilyHours"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>
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
          <v-radio-group
            row
            v-model="formData.relOutsideHours"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>
          
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-select
                v-on="on"
                v-model="formData.meansOfTransport"
                :items="defaults.transports"
                label="Means of Transportation"
                chips
                multiple
              ></v-select>
            </template>
            <span>What means of transportation have you used today?</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-combobox
                v-on="on"
                v-model="formData.importantPlace"
                :items="defaults.places"
                label="Important Place visited"
                chips
              ></v-combobox>
            </template>
            <span>Was there a place that was especially important to you today? It can both be something personal or practial. Pick one or type in your own.</span>
          </v-tooltip>

        </v-col>

        <v-col>
          <h3>Sports</h3>
          <v-text-field
            type="number"
            v-model="formData.sportsHours"
            suffix="h"
            label="Hours of physical exercise"
          ></v-text-field>
          <v-radio-group
            row
            v-model="formData.relSportsHours"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-combobox
                v-on="on"
                v-model="formData.sportsType"
                :items="defaults.sporttypes"
                label="Type of exercise/activity"
                chips
                multiple
              ></v-combobox>
            </template>
            <span>Which type(s) of sport or physical activity did you participate in today?. Pick one or type in your own.</span>
          </v-tooltip>
        </v-col>

        <v-col>
          <h3>Work</h3>
          <v-text-field
            type="number"
            v-model="formData.workHours"
            suffix="h"
            label="Hours worked"
          ></v-text-field>
          <v-radio-group
            row
            v-model="formData.relWorkHours"
            label="Relative to normal times?"
          >
            <v-radio
              v-for="(str, i) in defaults.relValues"
              :key="i"
              :label="`${str}`"
              :value="i"
            ></v-radio>
          </v-radio-group>
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
import router from '../router';

export default Vue.extend({
  name: 'Survey',
  components: {
  },
  data: () => ({
    valid: true,
    moodRules: [
      v => (!v || !(v as string).includes(' ')) || 'Please enter only 1 word'
    ],
    checkbox: false,
    lazy: false,
    errors: []
  }),

  computed: {
    user () {
      return store.state.userdata;
    },
    formData () {
      return store.state.formData;
    },
    defaults () {
      return store.state.defaults;
    }
  },

  mounted () {
    if (!store.state.userid) {
      router.push('login');
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        store.dispatch('formData');

        if (store.state.cookies) {
          this.$cookies.set('lastSubmission', this.formData, new Date().setHours(24,0,0,0));
        }

        axios.post(process.env.VUE_APP_API_URL + '/submit', {
          id: store.state.userid,
          ...this.user,
          ...this.formData
        })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              store.dispatch('simpleDialog', {
                title: 'Thank you!',
                msg: '<p>Your entries have successfully been submitted!</p>'+
                  '<small>You can always come back and edit your submission until 12pm!</small>'
              });
            }
            else {
              this.alertError();
            }
          })
          .catch(e => {
            this.alertError();
          })
      } else {
        alert('Please fill in all required fields.')
      }
    },
    alertError() {
      store.dispatch('simpleDialog', {
        title: 'Oops...',
        msg: '<b>Something went wrong :/ </b><br />'+
          " We're probably working on it!</p>"+
          '<h4>Please come back and try again later!</h4>'
      });
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
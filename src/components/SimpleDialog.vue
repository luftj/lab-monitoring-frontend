<template>
    <v-dialog
      v-model="dialog.toggle"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{dialog.title}}</v-card-title>

        <v-card-text>
          <div v-html="dialog.msg"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dismiss"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import store from '../store'
export default Vue.extend({
    name: 'SimpleDialog',
    computed: {
        dialog () {
            return store.state.simpleDialog;
        }
    },
    methods: {
        dismiss () {
            store.commit('simpleDialogToggle', false);
        }
    }
})
</script>
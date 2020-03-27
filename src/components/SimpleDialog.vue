<template>
    <v-dialog
      v-model="dialog.toggle"
      max-width="560"
      scrollable
      :persistent="dialog.persistent"
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
            @click="dismiss(true)"
          >
            OK
          </v-btn>

          <v-btn
            v-if="dialog.confirm"
            color="red darken-1"
            text
            @click="dismiss(false)"
          >
            Deny
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
        dismiss (answer) {
            store.commit('simpleDialogToggle', false);
            this.$emit(this.dialog.name, answer);
        }
    }
})
</script>
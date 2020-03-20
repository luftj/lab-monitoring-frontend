<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LabMonitoring',

  components: {
  },

  data: () => ({
    //
  })
})
</script>
<style lang="scss">
  .v-btn {
    margin: 5px;
  }
</style>

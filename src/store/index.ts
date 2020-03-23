import Vue from 'vue'
import Vuex, { Mutation } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid: '',
    userdata: {
      username: '',
      plzHome: '',
      age: '',
      gender: '',
      work: null
    },
    formData: {
      mood: null,
      moodTag: '',
      videoApp: null,
      maxCallSize: null,
      avgCallSize: null,
      peopleMetRealWorld: null,
      relPeopleMetRealWorld: null,
      peopleMetOnline: null,
      relPeopleMetOnline: null,
      kmTravelled: null,
      outsideHours: null,
      familyHours: null,
      relFamilyHours: null,
      screenHours: null,
      relScreenHours: null,
      workHours: null,
      relWorkHours: null
    },
    defaults: {
      videoApps: [
        'Skype',
        'WebEx',
        'Zoom',
        'Wire',
        'WhatsApp Video Call'
      ],
      relValues: [
        "much less",
        "less",
        "same",
        "more",
        "much more"
      ],
      work: [
        'Service',
        'Catering',
        'Marketing',
        'IT',
        'Public Service',
        'Research',
        'Medical Service',
        'Craft',
        'Retail',
        'Agriculture'
      ],
    },
    simpleDialog: {
      toggle: false,
      title: '',
      msg: ''
    }
  },
  mutations: {
    user (state, data) {
      state.userid = data.userid;
      state.userdata = data.userdata;
    },
    formData (state, data) {
      state.formData = {...state.formData, ...data};
    },
    simpleDialogToggle (state, val) {
      state.simpleDialog.toggle = val;
    },
    simpleDialogData (state, data) {
      state.simpleDialog.title = data.title;
      state.simpleDialog.msg = data.msg;

      console.log(data);
    }
  },
  actions: {
    // workaround to update the state from within itself
    // trigger lifecycle events
    formData () {
      this.commit('formData', this.state.formData);
    },
    simpleDialog ({commit}, data) {
      this.commit('simpleDialogData', data);
      this.commit('simpleDialogToggle', true);
    }
  },
  modules: {
  }
})

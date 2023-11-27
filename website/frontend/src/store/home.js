import axios from 'axios';

const state = {
    homeData: {
        carousel: [],
        topCategories: [],
        topProducts: [],
      },
};
const mutations = {
    SET_HOME_DATA(state, newData) {
      state.homeData = newData;
    },
  };


const actions = {
  async fetchHomeData({ commit }) {
    try {
      // API call to get home data
      const response = await axios.get('http://localhost:8000');
      commit('SET_HOME_DATA', response.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },
};

const getters = {
  getHomeData: (state) => state.homeData,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
import axios from 'axios';

const state = {
    categoryData: [],
};
const mutations = {
    SET_CATEGORY_DATA(state, newData) {
      state.categoryData = newData;
    },
  };


const actions = {
  async fetchCategoryData({ commit }) {
    try {
      // API call to get categorys data
      console.log("hiii")
      const response = await axios.get('http://localhost:8000/getAllCategorys');
      commit('SET_CATEGORY_DATA', response.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },
};

const getters = {
  getCategoryData: (state) => state.categoryData,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
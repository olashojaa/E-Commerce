import axios from 'axios';

const state = {
  productData: [],
  productDetailsData: [],
  categoryData: [],
};
const mutations = {
    SET_PRODUCT_DATA(state, newData) {
      state.productData = newData;
    },
    SET_PRODUCT_DETAILS_DATA(state, newData) {
      state.productDetailsData = newData;
    },
    SET_CATEGORY_DATA(state, newData) {
        state.categoryData = newData;
      },
  };


const actions = {
  async fetchProductData({ commit }) {
    try {
      // API call to get products data
      const response = await axios.get('http://localhost:8000/getAllProducts');
      commit('SET_PRODUCT_DATA', response.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },
  async fetchProductDetailsData({ commit },params) {
    try {
    
      // API call to get products data
      const response = await axios.get('http://localhost:8000/getProductDetails',{params});
      commit('SET_PRODUCT_DETAILS_DATA', response.data[0]);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },
  async fetchFilterdProductData({ commit },params) {
    try {
     
      // API call to get products data
      const response = await axios.get('http://localhost:8000/getFilterProducts',{params});
      commit('SET_PRODUCT_DATA', response.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },

  async fetchCategoryData({ commit }) {
    try {
      // API call to get products data
      const response = await axios.get('http://localhost:8000/getAllCategories');
      commit('SET_CATEGORY_DATA', response.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  },
};

const getters = {
  getProductData: (state) => state.productData,
  getProductDetailsData: (state) => state.productDetailsData,
  getCategoryData: (state) => state.categoryData,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
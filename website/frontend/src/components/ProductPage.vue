<template>
    <div class=" row full-width">
      
      <ProductFilter class="col-3" :categoryData="categoryData"/>
      <ProductList class="col-9" :productData="productData"/>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import ProductFilter from '@/components/ProductFilter';
  import ProductList from '@/components/ProductList';
  
  export default {
    components: {
      ProductFilter,
      ProductList,
    },
    computed: {
      ...mapGetters('product', ['getProductData','getCategoryData']),
    productData() {
      return this.getProductData;
    },
    categoryData() {
      return this.getCategoryData;
    },
  },

  methods: {
    ...mapActions('product', ['fetchProductData','fetchCategoryData']),
  },
  mounted() {
    this.fetchProductData();
    this.fetchCategoryData();
  },
  };
  </script>
<template>
    <div class="sidenav" >
      <h1>Search:</h1>
      <input type="text" class="sidebar-input" v-model="params.searchQuery" placeholder="Search..">
<h1> 
  Price
</h1>
      <input type="text" class="sidebar-input" v-model="params.minPrice" placeholder="min price..">
      <input type="text" class="sidebar-input" v-model="params.maxPrice" placeholder="max price..">
<h1> Categories</h1>
<div v-for="category in categoryData" :key="category.id" >
<input  type="checkbox"  :id="category.id"  :value="category.id" v-model="params.checkedcategories" >
<label class="category_label"> {{category.name}}</label><br>
    </div>
    <h1>Sort by Name</h1>
    <input type="radio" id="ASC" name="sort" value="ASC" v-model="params.sortByName">
<label class="category_label">ASC</label><br>
<input type="radio" id="DESC" name="sort" value="DESC" v-model="params.sortByName">
<label class="category_label">DESC</label><br>

  <button class="btn"  @click="performFilter">send</button>

  </div>
  </template>
  
  <script>
  export default {
    props:{
      categoryData:Array
    },
    data() {
    return {
      params:
      {searchQuery: '',
      minPrice:null,
      maxPrice:null,
      checkedcategories:[],
      sortByName:''}
    };
  },
  methods:{
    performFilter(){
      this.$store.dispatch('product/fetchFilterdProductData', this.params);
    }
  }
  };
  </script>
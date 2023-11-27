<template>
    <div>
    <h2>Top Categories</h2>
    <ul>
      <div v-for="category in topCategoriesData" :key="category.id" >

        <h1>{{ category.name }}</h1>

    <div class="product-list">
      <div v-for="product in category.top_products" :key="product.id" class="product-item">
        <router-link :to="'product/'+product.id">
        <img :src="product.Img" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description" >{{ product.short_description }}</p>
          <p class="product-price">{{ product.price }} USD</p>
        </div>
      </router-link>
      </div>
    </div>

      </div>
    </ul>
  </div>
  </template>
  
  <script>
  export default {
    props:{
      topCategoriesData:Array,
  },
  };
  </script>
<template>
    <div class="container">
      <div class="product-list">
      <div v-for="product in productData" :key="product.id" class="product-item">
        <router-link :to="'product/'+product.id">
        <img :src="product.Img" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.short_description }}</p>
          <p class="product-price">{{ product.price }} USD</p>
        </div>
      </router-link>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    props:{
      productData:Array
    },
  };
  </script>
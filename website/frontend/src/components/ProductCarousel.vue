<template>

  <div class="carousel">
    <div class="slide" v-for="(item, index) in carouselData" :key="index" :class="{ active: index === currentIndex }">
      <router-link :to="'/product/' + item.product_id" >
         <img :src="item.Img" alt="Carousel Item" />
         </router-link>
    </div>

    <button @click="prevSlide" class="nav-button prev"><img  :src="require(`@/assets/img/arrow-left.png`)" ></button>
    <button @click="nextSlide" class="nav-button next"><img  :src="require(`@/assets/img/arrow-right.png`)" ></button>
  </div>
</template>

<script>

export default {
  props:{
    carouselData:Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
    },
  },
};
</script>


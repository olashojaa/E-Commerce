<template>
  <div>
    <div v-if="homeData">
      <ProductCarousel :carouselData="homeData.carousel" />
      <div class="container">
      <TopCategories :topCategoriesData="homeData.topCategories" />
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCarousel from '@/components/ProductCarousel';
import TopCategories from '@/components/TopCategories';

export default {
  components: {
    ProductCarousel,
    TopCategories,
  },
  computed: {
    ...mapGetters('home', ['getHomeData']),
    homeData() {
      return this.getHomeData;
    },
  },

  methods: {
    ...mapActions('home', ['fetchHomeData']),
  },
  mounted() {
    this.fetchHomeData();
  },
};
</script>


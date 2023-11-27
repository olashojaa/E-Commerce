<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <!-- This is where your views will be displayed -->
      <router-view></router-view>
    </main>
    <!-- <FooterComponent /> -->
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
// import FooterComponent from '@/components/FooterComponent';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    // FooterComponent,
  },
};
</script>
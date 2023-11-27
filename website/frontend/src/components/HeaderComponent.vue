<template>
   <Header>
   <div>
     <!-- mobile screen navbar -->
     <button class="menu-toggle-btn" :class="{ 'open': isMenuOpen }" @click="toggleMenu">
       <font-awesome-icon :icon="faBars" style="color: #55585e" />
     </button>
 
     <div class="navbar nav-mobile" :class="{ 'open': isMenuOpen }">
       <div class="logo">
         <img :src="require(`@/assets/img/logo.png`)" alt="Carousel Item"  width="100"/>
       </div>
 
       <nav class="topnav">
         <ul>
            <li>
             <router-link :class="{ 'active': activeItem === 'home' }" @click="handleItemClick('home')" :to="'/'">Home</router-link>
           </li>
           <li>
             <router-link :class="{ 'active': activeItem === 'products' }" @click="handleItemClick('products')" :to="'/products'">Products</router-link>
           </li>
        <li>
          <router-link :to="'/cart'"> 
      <font-awesome-icon :icon="faCartShopping" size="2xl"/>
      <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>

    </router-link>
        </li>
 
         </ul>
       </nav>
 
     </div>
 
     <!-- website big screen -->
     <div class="header-nav">
       <div class="logo col-3">
         <img :src="require(`@/assets/img/logo.png`)" alt="Carousel Item"  width="200"/>

       </div>
 
       <nav class="topnav col-8">
         <ul>
           <li>
            
             <router-link :class="{ 'active': activeItem === 'home' }" @click="handleItemClick('home')" :to="'/'">Home</router-link>
           </li>
           <li>
             <router-link :class="{ 'active': activeItem === 'products' }" @click="handleItemClick('products')" :to="'/products'">Products</router-link>
           </li>

 
         </ul>
       </nav>
       <router-link :to="'/cart'"> 
      <font-awesome-icon :icon="faCartShopping" size="2xl"/>
      <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
    </router-link>
  

     </div>
   </div>
</Header>
 </template>
 
 <script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faCircleUser, faGlobe ,faCartShopping} from '@fortawesome/free-solid-svg-icons';



 export default {
   name: 'HeaderComponent',
   components: {
     FontAwesomeIcon,
   },
   data() {
     return {
       isMenuOpen: false,
       activeItem:  'home',
       isCartOpen: false,
       cartCount:parseInt(localStorage.getItem('cartItemsCount')) || 0

     };
   },
   methods: {
     handleItemClick(itemName) {
       this.activeItem = itemName;
     },
   
     toggleMenu() {
       this.isMenuOpen = !this.isMenuOpen;
     },
   },
   mounted() {
    // Listen for the updateCartCount event
    this.emitter.on('updateCartCount', (newCount) => {
      // Update the cartCount
      this.cartCount = newCount;
    });
  },
   computed: {
     faBars() {
       return faBars;
     },
     faCircleUser() {
       return faCircleUser;
     },
     faGlobe() {
       return faGlobe;
     },
     faCartShopping() {
       return faCartShopping;
     },
   },
 };
 </script>

  
  <style src="@/assets/css/header.css" scoped></style>

  
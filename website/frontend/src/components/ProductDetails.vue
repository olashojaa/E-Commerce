<template>
    <div class="container row">
      <div class="col-4 col-sm-12" >
      <img :src="productDetailsData.Img ? productDetailsData.Img : ''" class="product_details_img" />
      </div>
      <div class="col-8 col-sm-12" >
    <h1>{{ productDetailsData.name }}</h1>
    <p v-html="productDetailsData.description "></p>
    <p>Price: {{ productDetailsData.price }}</p>
    <p>Stock: {{ productDetailsData.stock }}</p>
    <button class="btn" @click="addToCart(productDetailsData)">Add To Cart</button>

    </div>
  </div>
  </template>
  
  <script>
    import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters('product', ['getProductDetailsData']),
    productDetailsData() {
      return this.getProductDetailsData;
    },
   
  },

  methods: {
    ...mapActions('product', ['fetchProductDetailsData']),
    addToCart(product) {
      // Retrieve existing cart data from local storage
      const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      var count = parseInt(localStorage.getItem('cartItemsCount'))|| 0;

      // Check if the product is already in the cart
      const existingProduct = existingCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product is already in the cart, you might want to update the quantity or handle it as needed
        // For simplicity, this example just updates the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product is not in the cart, add it
        existingCart.push({ ...product, quantity: 1 });
      }
count+=1;
      // Save the updated cart data back to local storage
      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      this.emitter.emit('updateCartCount', count);
      localStorage.setItem('cartItemsCount', count.toString());

      // Optionally, you can show a notification or perform other actions to indicate that the product was added to the cart
      // alert('Product added to cart!');
    },
  },
  mounted() {
 
    this.fetchProductDetailsData(this.$route.params);
  },
  };
  </script>
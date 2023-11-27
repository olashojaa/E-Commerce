<template>
<div class="container ">
      <h2>Your Shopping Cart</h2>
    
      <div v-for="(item, index) in cartItems"  :key="index">
        <div class="row">
        <div class="col-3">
          <img :src="item.Img ? item.Img : ''" class="product_details_img" />

        </div>
        <div class="col-9" style="align-items: center;
    display: grid;">
        <h2>{{ item.name }}</h2>
         <h3> Quantity: {{ item.quantity }}</h3>
         <button class="btn" @click="removeFromCart(item.id)">Remove from Cart</button>

        </div>
        </div>
        <hr>
      </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: this.getCartItemsFromLocalStorage(), // Initialize with the items in the cart
    };
  },
  methods:{
    getCartItemsFromLocalStorage() {
      // Retrieve cart items from local storage
      const storedItems = localStorage.getItem('cartItems');
      return storedItems ? JSON.parse(storedItems) : [];
    },
    removeFromCart(itemId) {
    // Get the current cart from local storage
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find the index of the item in the cart array
    const index = cart.findIndex(item => item.id === itemId);
let       removedQuantity = 0;
    // If the item is found, remove it from the cart
    if (index !== -1) {
      removedQuantity = cart[index].quantity;
      cart.splice(index, 1);

      // Update the local storage with the modified cart
      localStorage.setItem('cartItems', JSON.stringify(cart));
this.cartItems=cart;
      // Update any other state or UI elements as needed
      this.updateCartState(removedQuantity);
    }
  },
  updateCartState(removedQuantity) {
    // Update cart count, total, or any other relevant information
    // This might include updating the cartCount and cartItemsCount
    // Also, consider emitting an event or using a global state management solution if needed
    var count = parseInt(localStorage.getItem('cartItemsCount'))|| 0;
count-=removedQuantity;
this.emitter.emit('updateCartCount', count);
      localStorage.setItem('cartItemsCount', count.toString());
  }
  }
};
</script>

<style scoped>
/* Add your cart styling here */
</style>
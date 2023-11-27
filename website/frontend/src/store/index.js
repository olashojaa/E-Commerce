import { createStore } from 'vuex';
import homeModule from './home';
import productModule from './product';
import categoryModule from './category';

const store = createStore({
  modules: {
    home: homeModule,
    category: categoryModule,
    product: productModule,
  },
});

export default store;
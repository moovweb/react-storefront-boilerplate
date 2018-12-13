import { types } from "mobx-state-tree"
import CartModelBase from 'react-storefront/model/CartModelBase'
import ProductModel from '../product/ProductModel'
import persist from 'react-storefront/persist'
import { addToCart } from 'react-storefront-extensions/shopify'

const CartModel = types.compose(CartModelBase, types
  .model("CartModel", {
    items: types.optional(types.array(ProductModel), [])
  })
  .views(self => ({
    get total() {
      return self.items.reduce((previous, item) => previous + (item.price * item.quantity), 0)
    },
    get empty() {
      return self.items.length === 0
    }
  }))
  .actions(self => ({
    afterCreate() {
      console.log('after create in cart was called');
      // persist cart to local storage
      persist('cart', self)
    },
    add(product) {
      addToCart(product)
    }
  }))
)

export default CartModel
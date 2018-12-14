import { types, clone, detach } from "mobx-state-tree"
import CartModelBase from 'react-storefront/model/CartModelBase'
import ProductModel from '../product/ProductModel'
import persist from 'react-storefront/persist'
import { addToCart, removeFromCart, updateCart } from 'react-storefront-extensions/shopify'

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
    setItems(items) {
      self.items = items
    },
    changeQuantity(product, quantity) {
      product.quantity = quantity
      updateCart(product)
    },
    afterCreate() {
      console.log('after create in cart was called');
      persist('cart', self)
    },
    add(product) {
      self.items.push(clone(product))
      addToCart(product)
    },
    remove(product) {
      removeFromCart(product)
      detach(product)
    }
  }))
)

export default CartModel
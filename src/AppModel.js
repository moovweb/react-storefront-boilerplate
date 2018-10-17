import { types } from "mobx-state-tree"
import AppModelBase from 'react-storefront/model/AppModelBase'
import CartModel from './cart/CartModel'
import CategoryModel from './category/CategoryModel'
import SubcategoryModel from './subcategory/SubcategoryModel'
import ProductModel from './product/ProductModel'

const AppModel = types.compose(AppModelBase, 
  types.model("AppModel", {
    welcomeMessage: types.maybe(types.string),
    cart: types.optional(CartModel, {}),
    category: types.maybe(CategoryModel),
    subcategory: types.maybe(SubcategoryModel),
    product: types.maybe(ProductModel)
  })
)

export default AppModel
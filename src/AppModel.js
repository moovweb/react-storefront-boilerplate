import { types } from "mobx-state-tree"
import AppModelBase from 'react-storefront/model/AppModelBase'
import CartModel from './cart/CartModel'
import CategoryModel from './category/CategoryModel'
import SubcategoryModel from './subcategory/SubcategoryModel'
import ProductModel from './product/ProductModel'

const AppModel = types.compose(AppModelBase, 
  types.model("AppModel", {
    welcomeMessage: types.maybeNull(types.string),
    cart: types.optional(CartModel, {}),
    category: types.maybeNull(CategoryModel),
    subcategory: types.maybeNull(SubcategoryModel),
    product: types.maybeNull(ProductModel)
  })
)

export default AppModel
import { types } from "mobx-state-tree"
import ProductModelBase from 'react-storefront/model/ProductModelBase'

const ProductModel = types.compose(ProductModelBase, 
  types.model("ProductModel", {
    // additional product fields go here
    specs: types.maybe(types.string),
    productType: types.maybe(types.string),
    reviews: types.optional(types.array(types.string), []),
    variantId: types.maybe(types.string),
    lineItemId: types.maybe(types.string)
  })
)

export default ProductModel
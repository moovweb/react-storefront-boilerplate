import { types, flow } from 'mobx-state-tree'
import ProductModelBase from 'react-storefront/model/ProductModelBase'

const ProductModel = types.compose(
  ProductModelBase,
  types
    .model('ProductModel', {
      // additional product fields go here
      specs: types.maybeNull(types.string),
      reviews: types.optional(types.array(types.string), []),
      recommendations: types.maybeNull(types.array(types.late(() => ProductModel)))
    })
    .actions(self => ({
      /**
       * Late loads personalization data from product/personalization-handler.js
       */
      loadPersonalization: flow(function*() {
        if (self.recommendations == null) {
          const { recommendations } = yield fetch(`/p/${self.id}/personalization.json`).then(res =>
            res.json()
          )
          self.recommendations = recommendations
        }
      })
    }))
)

export default ProductModel

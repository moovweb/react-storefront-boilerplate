import { types, flow } from 'mobx-state-tree'
import ProductModelBase from 'react-storefront/model/ProductModelBase'

const ProductModel = types.compose(
  ProductModelBase,
  types
    .model('ProductModel', {
      // additional product fields go here
      specs: types.maybeNull(types.string),
      reviews: types.optional(types.array(types.string), []),
      loadingRecommendations: false,
      recommendations: types.maybeNull(types.array(types.late(() => ProductModel)))
    })
    .actions(self => ({
      /**
       * Here's an example of how you can late load personalized data.  Doing
       * so allows your main product route to be cached on the server, which is
       * essential for achieving the best possible performance.  Any data that is not cacheable,
       * such as personalized product recommendations should be late loaded here.
       */
      loadPersonalization: flow(function*() {
        if (self.recommendations == null && !self.loadingRecommendations) {
          self.loadingRecommendations = true

          try {
            const { recommendations } = yield fetch(`/p/${self.id}/personalization.json`).then(
              res => res.json()
            )
            self.recommendations = recommendations
          } finally {
            self.loadingRecommendations = false
          }
        }
      })
    }))
)

export default ProductModel

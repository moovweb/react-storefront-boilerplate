import { createProducts } from '../subcategory/subcategory-handler'

export default function personalizationHandler(params, request, response) {
  return {
    recommendations: createProducts().items
  }
}

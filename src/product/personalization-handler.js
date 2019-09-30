import { createProducts } from '../subcategory/subcategory-handler'

export default function personalizationHandler({ id }, request, response) {
  return {
    recommendations: createProducts([], 0, { startId: parseInt(id) + 1 }).items
  }
}

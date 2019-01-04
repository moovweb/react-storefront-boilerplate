import { types } from "mobx-state-tree"
import SubcategoryModelBase from 'react-storefront/model/SubcategoryModelBase'

const SubcategoryModel = types.compose(SubcategoryModelBase, 
  types.model("SubcategoryModel", {
    description: types.maybeNull(types.string),
    image: types.maybeNull(types.string)
  })
)

export default SubcategoryModel
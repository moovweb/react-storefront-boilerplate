import React from 'react'
import { inject, observer } from 'mobx-react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'
import { withStyles } from '@material-ui/core'
import SlideshowGallery from '../shared/SlideshowGallery'
import SlideshowExampleContent from '../shared/SlideshowGallery/SlideshowExampleContent';
import ShareYourLook from '../shared/components/ShareYourLook';
import ProductSlideshow from '../shared/ProductSlideshow';

const styles = theme => {

}

const Home = inject('app')(observer(({ app }) => {
  return (
    <Container>
      <Row>
        <SlideshowGallery 
          elements={[
            {
              backgroundImage: 'bannerH.jpg',
              renderComponent: () => <SlideshowExampleContent />
            },
            {
              backgroundImage: 'bannerA.jpg',
              renderComponent: () => <SlideshowExampleContent align="right" />
            },
            {
              backgroundImage: 'bannerB.jpg',
              renderComponent: () => <SlideshowExampleContent />
            },
          ]}
          width={1240}
          height={584}
          backgroundColor="rgb(239, 235, 233)"
        />
        <ProductSlideshow title="Best Sellers" products={app.subcategory.items.filter((item, key) => key < 6)} />
        <ShareYourLook />
      </Row>
    </Container>
  )
}))

export default withStyles(styles)(Home);

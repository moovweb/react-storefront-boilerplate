import React from 'react'
import GridGallery from "../GridGallery";
import GridImage from "../GridGallery/GridImage";

export default () => (
  <GridGallery title="Share Your Look" description="#YOURLOOK" size={470}>
    <GridImage filename="imageA.jpg" description="katherina_trn" />
    <GridImage filename="imageB.jpg" description="katherina_trn" />
    <GridImage filename="imageC.jpg" description="katherina_trn" />
    <GridImage filename="imageD.jpg" description="katherina_trn" />
  </GridGallery>
)

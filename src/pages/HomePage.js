import { Container} from '@mui/material'
import React from 'react'
import Banner from '../components/banner/Banner'
import Cooperate from '../components/cooperate/Cooperate'
import Demo from '../components/demoPro/Demo'
import Poster from '../components/poster/Poster'
import SliderShow from '../components/sliderShow/SliderShow'
import ProductHot from '../features/product/ProductHot'
import ProductTopList from '../features/product/ProductTopList'
function HomePage() {
  return (
    <Container>
      <SliderShow/>
      <Poster/>

      <ProductTopList/>
      <ProductHot/>
      <Cooperate/>
    </Container>
  )
}

export default HomePage

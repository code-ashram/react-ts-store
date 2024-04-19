import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules'

import SliderImagesList from './assets/SliderImagesList'

import 'swiper/css/bundle'

import styles from '../../App.module.scss'

const StoreSlider: FC = () => {
  return (
    <Swiper
      className={styles.storeSlider}
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      effect={'fade'}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
    >
      {
        SliderImagesList.map((img) =>
          <SwiperSlide key={img.id} className={styles.sliderImg}>
            <img src={img.src} alt={img.alt} />
          </SwiperSlide>)
      }
    </Swiper>
  )
}

export default StoreSlider

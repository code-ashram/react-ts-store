import dellImg1 from './img/dell1.jpeg'
import dellImg2 from './img/dell2.jpeg'
import dellImg3 from './img/dell3.jpeg'
import dellImg4 from './img/dell4.jpeg'
import dellImg5 from './img/dell5.jpeg'
import dellImg6 from './img/dell6.jpeg'
import dellImg7 from './img/dell7.jpeg'


type SliderImg = {
  id: number
  src: string
  alt: string
}

const SliderImagesList: SliderImg[] = [
  {
    id: 1,
    src: dellImg1,
    alt: 'dell laptop image'
  },
   {
    id: 2,
    src: dellImg2,
    alt: 'dell laptop image'
  },
   {
    id: 3,
    src: dellImg3,
    alt: 'dell laptop image'
  },
   {
    id: 4,
    src: dellImg4,
    alt: 'dell laptop image'
  },
   {
    id: 5,
    src: dellImg5,
    alt: 'dell laptop image'
  },
   {
    id: 6,
    src: dellImg6,
    alt: 'dell laptop image'
  },
   {
    id: 7,
    src: dellImg7,
    alt: 'dell laptop image'
  },
]

export default SliderImagesList
